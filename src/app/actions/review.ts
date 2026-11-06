'use server';

import { revalidatePath } from 'next/cache';
import { GoogleGenAI } from '@google/genai';
import { prisma } from '@/lib/prisma';
import { requireUserWorkspace, checkRateLimit } from '@/lib/workspace';

export interface ReviewIssueResult {
  id: string;
  contentId: string;
  ruleId: string | null;
  ruleTitle?: string;
  severity: string;
  why: string;
  suggestedFix: string;
  status: string;
  aiAssisted: boolean;
}

export interface ReviewContentResult {
  id: string;
  title: string;
  bodyText: string;
  status: string;
  issues: ReviewIssueResult[];
}

export async function getReviewContent(contentId?: string): Promise<ReviewContentResult> {
  const { workspaceId } = await requireUserWorkspace();

  let content = contentId
    ? await prisma.content.findFirst({
        where: { id: contentId, workspaceId },
        include: { issues: { include: { rule: true }, orderBy: { id: 'asc' } } },
      })
    : await prisma.content.findFirst({
        where: { workspaceId },
        include: { issues: { include: { rule: true }, orderBy: { id: 'asc' } } },
        orderBy: { id: 'desc' },
      });

  if (!content) {
    content = await prisma.content.create({
      data: {
        workspaceId,
        title: 'Campaign Draft — Q4 Product Launch',
        bodyText:
          "With our new update, we're proud to support teams worldwide. Our platform guarantees the fastest performance on the market, helping users achieve results in seconds.",
        status: 'DRAFT',
      },
      include: { issues: { include: { rule: true }, orderBy: { id: 'asc' } } },
    });
  }

  return {
    id: content.id,
    title: content.title,
    bodyText: content.bodyText,
    status: content.status,
    issues: content.issues.map((iss) => ({
      id: iss.id,
      contentId: iss.contentId,
      ruleId: iss.ruleId,
      ruleTitle: iss.rule?.title || 'Brand Rule',
      severity: iss.severity,
      why: iss.explanation,
      suggestedFix: iss.suggestedFix,
      status: iss.status,
      aiAssisted: iss.aiAssisted,
    })),
  };
}

export async function saveDraftContent(contentId: string, bodyText: string, title?: string) {
  const { workspaceId } = await requireUserWorkspace();

  if (bodyText.length > 5000) {
    throw new Error('Draft payload exceeds maximum allowed size of 5,000 characters.');
  }

  const content = await prisma.content.findFirst({
    where: { id: contentId, workspaceId },
  });

  if (!content) {
    throw new Error('Content not found or unauthorized.');
  }

  const updated = await prisma.content.update({
    where: { id: contentId },
    data: {
      bodyText,
      ...(title ? { title } : {}),
      status: 'DRAFT',
    },
  });

  revalidatePath('/dashboard/review');
  return updated;
}

export async function runAIReview(contentId: string): Promise<ReviewIssueResult[]> {
  const { userId, workspaceId } = await requireUserWorkspace();

  // API Rate Limiting: Max 5 requests per minute per user
  const rateLimit = checkRateLimit(`review:${userId}`);
  if (!rateLimit.allowed) {
    throw new Error(
      `Rate limit exceeded: You can only run AI Review 5 times per minute. Please try again in ${rateLimit.retryAfterSeconds} seconds.`
    );
  }

  // Step A: Fetch Content body strictly within this user's workspace
  const content = await prisma.content.findFirst({
    where: { id: contentId, workspaceId },
  });

  if (!content) {
    throw new Error(`Content with ID ${contentId} not found or unauthorized.`);
  }

  if (content.bodyText.length > 5000) {
    throw new Error('Draft payload exceeds maximum allowed size of 5,000 characters.');
  }

  // Step B: Fetch active Rule and Fact objects strictly for this workspace
  const [rules, facts] = await Promise.all([
    prisma.rule.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.fact.findMany({
      where: { workspaceId, status: 'ACTIVE' },
    }),
  ]);

  const rulesContext = rules.map((r) => ({
    id: r.id,
    title: r.title,
    severity: r.severity,
    type: r.type,
    definition: r.definition,
  }));

  const factsContext = facts.map((f) => ({
    id: f.id,
    claim: f.claim,
    evidenceSource: f.evidenceSource,
  }));

  // Step C: Initialize the Google Gemini client
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }

  const ai = new GoogleGenAI({ apiKey });

  // Step D: Call Gemini API with strict JSON mode
  const prompt = `You are Markwise, an expert AI brand reviewer. Review this draft: "${content.bodyText}".
Brand Rules: ${JSON.stringify(rulesContext)}.
Evidence Anchors: ${JSON.stringify(factsContext)}.
Return a JSON object with an 'issues' array. Each issue must have:
- rule_id (string or null)
- issue_title (string)
- why (string explaining the violation and citing evidence or lack thereof)
- severity (HIGH, MEDIUM, or LOW)
- suggested_fix (string containing compliant alternative phrasing)
If no issues are found, return { "issues": [] }.`;

  let geminiResponse;
  try {
    geminiResponse = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });
  } catch (err: unknown) {
    const isNotFound =
      err instanceof Error &&
      (err.message.includes('404') ||
        err.message.includes('not found') ||
        err.message.includes('no longer available'));
    if (isNotFound) {
      geminiResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    } else {
      throw err;
    }
  }

  const rawJson = geminiResponse.text || '{"issues":[]}';
  const parsed = JSON.parse(rawJson) as {
    issues?: Array<{
      rule_id?: string;
      issue_title?: string;
      why?: string;
      severity?: string;
      suggested_fix?: string;
    }>;
  };

  const parsedIssues = Array.isArray(parsed.issues) ? parsed.issues : [];

  // Step E: Parse JSON. Save each issue linked to contentId
  await prisma.issue.deleteMany({
    where: {
      contentId,
      status: 'OPEN',
    },
  });

  const createdIssues: ReviewIssueResult[] = [];

  for (const item of parsedIssues) {
    const matchedRuleId = rules.some((r) => r.id === item.rule_id) ? item.rule_id : null;
    const severityRaw = (item.severity || 'MEDIUM').toUpperCase();
    const cleanSeverity =
      severityRaw === 'HIGH' ? 'HIGH' : severityRaw === 'LOW' ? 'LOW' : 'MEDIUM';

    const issue = await prisma.issue.create({
      data: {
        contentId,
        ruleId: matchedRuleId,
        severity: cleanSeverity,
        explanation: item.why || 'Potential violation of brand compliance standards.',
        suggestedFix: item.suggested_fix || 'Review wording to ensure brand alignment.',
        status: 'OPEN',
        aiAssisted: true,
      },
      include: { rule: true },
    });

    createdIssues.push({
      id: issue.id,
      contentId: issue.contentId,
      ruleId: issue.ruleId,
      ruleTitle: item.issue_title || issue.rule?.title || 'Brand Rule',
      severity: issue.severity,
      why: issue.explanation,
      suggestedFix: issue.suggestedFix,
      status: issue.status,
      aiAssisted: issue.aiAssisted,
    });
  }

  // Step F: Update Content status to "IN_REVIEW"
  await prisma.content.update({
    where: { id: contentId },
    data: { status: 'IN_REVIEW' },
  });

  revalidatePath('/dashboard/review');
  revalidatePath('/dashboard/approvals');
  revalidatePath('/dashboard/insights');

  return createdIssues;
}

export async function acceptIssue(issueId: string, newText: string): Promise<void> {
  const { workspaceId } = await requireUserWorkspace();

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
    include: { content: true },
  });

  if (!issue || !issue.content) {
    throw new Error(`Issue with ID ${issueId} not found.`);
  }

  if (issue.content.workspaceId !== workspaceId) {
    throw new Error('Unauthorized: Issue belongs to another workspace.');
  }

  if (newText) {
    await prisma.content.update({
      where: { id: issue.contentId },
      data: { bodyText: newText },
    });
  }

  await prisma.issue.update({
    where: { id: issueId },
    data: { status: 'ACCEPTED' },
  });

  revalidatePath('/dashboard/review');
  revalidatePath('/dashboard/approvals');
  revalidatePath('/dashboard/insights');
}
