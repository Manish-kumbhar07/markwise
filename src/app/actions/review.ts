'use server';

import { revalidatePath } from 'next/cache';
import { GoogleGenAI } from '@google/genai';
import { prisma } from '@/lib/prisma';
import { DEMO_WORKSPACE_ID, getOrCreateDemoWorkspace } from '@/lib/workspace';

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
  if (typeof window !== 'undefined') {
    const res = await fetch(`/api/review${contentId ? `?contentId=${encodeURIComponent(contentId)}` : ''}`);
    if (!res.ok) {
      throw new Error('Failed to fetch review content');
    }
    return res.json();
  }

  await getOrCreateDemoWorkspace();

  let content = contentId
    ? await prisma.content.findUnique({
        where: { id: contentId },
        include: { issues: { include: { rule: true }, orderBy: { id: 'asc' } } },
      })
    : await prisma.content.findFirst({
        where: { workspaceId: DEMO_WORKSPACE_ID },
        include: { issues: { include: { rule: true }, orderBy: { id: 'asc' } } },
      });

  if (!content) {
    content = await prisma.content.create({
      data: {
        workspaceId: DEMO_WORKSPACE_ID,
        title: 'Social Media Post Draft',
        bodyText: 'Our platform guarantees the fastest performance on the market.',
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

export async function runAIReview(contentId: string): Promise<ReviewIssueResult[]> {
  if (typeof window !== 'undefined') {
    const res = await fetch('/api/review/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentId }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to run AI Review');
    }
    return data.issues;
  }

  await getOrCreateDemoWorkspace();

  // Step A: Fetch Content body from Prisma
  const content = await prisma.content.findUnique({
    where: { id: contentId },
  });

  if (!content) {
    throw new Error(`Content with ID ${contentId} not found.`);
  }

  // Step B: Fetch all active Rule objects for this workspace from Prisma
  const rules = await prisma.rule.findMany({
    where: { workspaceId: content.workspaceId },
    orderBy: { createdAt: 'desc' },
  });

  const rulesContext = rules.map((r) => ({
    id: r.id,
    title: r.title,
    severity: r.severity,
    type: r.type,
    definition: r.definition,
  }));

  // Step C: Initialize the Google Gemini client with process.env.GEMINI_API_KEY
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }

  const ai = new GoogleGenAI({ apiKey });

  // Step D: Call Gemini API with strict JSON mode
  const prompt = `You are Markwise, an expert AI brand reviewer. Review this text: "${content.bodyText}". Check it against these rules: ${JSON.stringify(rulesContext)}. Return a JSON object with an 'issues' array. Each issue must have: rule_id, issue_title, why, severity (HIGH, MEDIUM, LOW), suggested_fix. If no issues, return { issues: [] }.`;

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

  // Step E: Parse JSON. Save each issue to the Prisma Issue table linked to contentId
  // Clear any existing OPEN issues for this content to prevent duplicates
  await prisma.issue.deleteMany({
    where: {
      contentId,
      status: 'OPEN',
    },
  });

  const createdIssues: ReviewIssueResult[] = [];

  for (const item of parsedIssues) {
    const matchedRule = rules.find(
      (r) => r.id === item.rule_id || r.title.toLowerCase() === item.issue_title?.toLowerCase()
    );

    const issue = await prisma.issue.create({
      data: {
        contentId,
        ruleId: matchedRule ? matchedRule.id : null,
        severity: item.severity?.toUpperCase() === 'HIGH' ? 'HIGH' : item.severity?.toUpperCase() === 'LOW' ? 'LOW' : 'MEDIUM',
        explanation: item.why || 'Flagged by AI brand governance review',
        suggestedFix: item.suggested_fix || '',
        status: 'OPEN',
        aiAssisted: true,
      },
      include: {
        rule: true,
      },
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

  // Step G: Call revalidatePath('/dashboard/review')
  revalidatePath('/dashboard/review');

  return createdIssues;
}

export async function acceptIssue(issueId: string, newText: string): Promise<void> {
  if (typeof window !== 'undefined') {
    const res = await fetch('/api/review/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issueId, newText }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to accept issue');
    }
    return;
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    throw new Error(`Issue with ID ${issueId} not found.`);
  }

  // Update Content bodyText with new text
  if (newText) {
    await prisma.content.update({
      where: { id: issue.contentId },
      data: { bodyText: newText },
    });
  }

  // Update Issue status to ACCEPTED
  await prisma.issue.update({
    where: { id: issueId },
    data: { status: 'ACCEPTED' },
  });

  revalidatePath('/dashboard/review');
}
