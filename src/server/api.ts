import { Buffer } from 'node:buffer';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { GoogleGenAI } from '@google/genai';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { prisma } from '../lib/prisma.ts';
import {
  DEMO_USER_ID,
  DEMO_WORKSPACE_ID,
  getOrCreateDemoWorkspace,
  getOrCreateUserWorkspace,
  checkRateLimit,
} from '../lib/workspace.ts';

class InvalidRequestError extends Error {}

const supabaseUrl = (
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txhwkaesmhntloiwiuzo.supabase.co'
)
  .replace(/^["']|["']$/g, '')
  .trim();

const supabaseAnonKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  ''
)
  .replace(/^["']|["']$/g, '')
  .trim();

const supabaseServer = createSupabaseClient(supabaseUrl, supabaseAnonKey);

async function resolveWorkspace(request: IncomingMessage): Promise<{ userId: string; workspaceId: string }> {
  const authHeader = request.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token) {
      const { data: { user }, error } = await supabaseServer.auth.getUser(token);
      if (!error && user && user.id) {
        const userWs = await getOrCreateUserWorkspace(user.id, user.email);
        return { userId: user.id, workspaceId: userWs.workspaceId };
      }
    }
  }

  // Fallback to demo workspace for public unauthenticated landing page previews
  await getOrCreateDemoWorkspace();
  return { userId: DEMO_USER_ID, workspaceId: DEMO_WORKSPACE_ID };
}

function isJsonRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: Record<string, unknown> | unknown[]
) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  let length = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    length += buffer.length;
    if (length > 1024 * 1024) {
      throw new InvalidRequestError('Request body is too large.');
    }
    chunks.push(buffer);
  }

  let body: unknown;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new InvalidRequestError('Request body must be valid JSON.');
  }
  if (!isJsonRecord(body)) {
    throw new InvalidRequestError('Request body must be a JSON object.');
  }
  return body;
}

function stringValue(body: Record<string, unknown>, key: string, fallback = ''): string {
  return typeof body[key] === 'string' ? body[key] : fallback;
}

async function handleApiRequest(request: IncomingMessage, response: ServerResponse) {
  const method = request.method ?? 'GET';
  const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
  const { userId, workspaceId } = await resolveWorkspace(request);

  if (method === 'GET' && pathname === '/api/review') {
    const url = new URL(request.url ?? '/', 'http://localhost');
    const contentId = url.searchParams.get('contentId');

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

    sendJson(response, 200, {
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
    });
    return;
  }

  if (method === 'POST' && pathname === '/api/review/run') {
    // API Rate Limiting: Max 5 reviews per minute per user
    const rateLimit = checkRateLimit(`review:${userId}`);
    if (!rateLimit.allowed) {
      sendJson(response, 429, {
        success: false,
        error: `Rate limit exceeded: You can only run AI Review 5 times per minute. Please try again in ${rateLimit.retryAfterSeconds}s.`,
      });
      return;
    }

    const body = await readJsonBody(request);
    const contentId = stringValue(body, 'contentId');

    const content = await prisma.content.findFirst({
      where: { id: contentId, workspaceId },
    });

    if (!content) {
      sendJson(response, 404, { success: false, error: 'Content not found or unauthorized.' });
      return;
    }

    if (content.bodyText.length > 5000) {
      sendJson(response, 400, { success: false, error: 'Draft payload exceeds maximum allowed size of 5,000 characters.' });
      return;
    }

    const [rules, facts] = await Promise.all([
      prisma.rule.findMany({
        where: { workspaceId },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.fact.findMany({
        where: { workspaceId, status: 'ACTIVE' },
      }),
    ]);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      sendJson(response, 500, {
        success: false,
        error: 'GEMINI_API_KEY is not configured in server environment.',
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
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

    try {
      let geminiResponse;
      try {
        geminiResponse = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' },
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
            config: { responseMimeType: 'application/json' },
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

      await prisma.issue.deleteMany({
        where: {
          contentId,
          status: 'OPEN',
        },
      });

      const createdIssues = [];

      for (const item of parsedIssues) {
        const matchedRule = rules.find(
          (r) => r.id === item.rule_id || r.title.toLowerCase() === item.issue_title?.toLowerCase()
        );

        const issue = await prisma.issue.create({
          data: {
            contentId,
            ruleId: matchedRule ? matchedRule.id : null,
            severity:
              item.severity?.toUpperCase() === 'HIGH'
                ? 'HIGH'
                : item.severity?.toUpperCase() === 'LOW'
                ? 'LOW'
                : 'MEDIUM',
            explanation: item.why || 'Flagged by AI brand governance review',
            suggestedFix: item.suggested_fix || '',
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

      await prisma.content.update({
        where: { id: contentId },
        data: { status: 'IN_REVIEW' },
      });

      sendJson(response, 200, { success: true, issues: createdIssues });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error during AI review call';
      sendJson(response, 500, { success: false, error: errorMessage });
    }
    return;
  }

  if (method === 'POST' && pathname === '/api/review/accept') {
    const body = await readJsonBody(request);
    const issueId = stringValue(body, 'issueId');
    const newText = stringValue(body, 'newText');

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
      include: { content: true },
    });

    if (!issue || !issue.content) {
      sendJson(response, 404, { success: false, error: 'Issue not found' });
      return;
    }

    if (issue.content.workspaceId !== workspaceId) {
      sendJson(response, 403, { success: false, error: 'Unauthorized: Cross-tenant access denied.' });
      return;
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

    sendJson(response, 200, { success: true });
    return;
  }

  if (method === 'POST' && pathname === '/api/review/save-draft') {
    const body = await readJsonBody(request);
    const contentId = stringValue(body, 'contentId');
    const bodyText = stringValue(body, 'bodyText');
    const title = stringValue(body, 'title');

    if (bodyText.length > 5000) {
      sendJson(response, 400, { error: 'Draft exceeds maximum limit of 5,000 characters.' });
      return;
    }

    const content = await prisma.content.findFirst({
      where: { id: contentId, workspaceId },
    });

    if (!content) {
      sendJson(response, 404, { error: 'Content not found or unauthorized.' });
      return;
    }

    const updated = await prisma.content.update({
      where: { id: contentId },
      data: {
        bodyText,
        ...(title ? { title } : {}),
        status: 'DRAFT',
      },
    });

    sendJson(response, 200, updated);
    return;
  }

  if (method === 'POST' && pathname === '/api/rules/from-issue') {
    const body = await readJsonBody(request);
    const issueId = stringValue(body, 'issueId');

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
      include: { content: true, rule: true },
    });

    if (!issue || !issue.content) {
      sendJson(response, 404, { success: false, error: 'Issue not found' });
      return;
    }

    if (issue.content.workspaceId !== workspaceId) {
      sendJson(response, 403, { success: false, error: 'Unauthorized: Cross-tenant access denied.' });
      return;
    }

    const title =
      stringValue(body, 'title').trim() ||
      issue.rule?.title ||
      `Brand Rule: ${issue.explanation.slice(0, 40)}`;
    const definition =
      stringValue(body, 'definition').trim() ||
      issue.suggestedFix ||
      issue.explanation;
    const rawSeverity = stringValue(body, 'severity', issue.severity || 'MEDIUM').toUpperCase();
    const severity = rawSeverity === 'HIGH' ? 'HIGH' : rawSeverity === 'LOW' ? 'LOW' : 'MEDIUM';
    const type = stringValue(body, 'type', issue.rule?.type || 'TERMINOLOGY');

    const newRule = await prisma.rule.create({
      data: {
        workspaceId,
        title,
        definition,
        severity,
        type,
        version: 1,
      },
    });

    await prisma.issue.update({
      where: { id: issueId },
      data: {
        status: 'RULE_CREATED',
        ruleId: newRule.id,
      },
    });

    sendJson(response, 201, { success: true, rule: newRule });
    return;
  }

  if (method === 'GET' && pathname === '/api/approvals') {
    const contents = await prisma.content.findMany({
      where: {
        workspaceId,
        status: 'IN_REVIEW',
      },
      include: {
        issues: true,
      },
      orderBy: { id: 'desc' },
    });

    sendJson(
      response,
      200,
      contents.map((c, index) => {
        const hasHighIssue = c.issues.some((i) => i.severity === 'HIGH');
        const hasMediumIssue = c.issues.some((i) => i.severity === 'MEDIUM');

        let original = 'Our platform guarantees the fastest performance on the market.';
        if (c.bodyText.includes('is designed for high-speed')) {
          original = c.bodyText.replace('is designed for high-speed', 'guarantees the fastest');
        }

        return {
          id: c.id,
          title: c.title,
          bodyText: c.bodyText,
          originalText: original,
          status: c.status,
          creator: index === 0 ? 'Enterprise Creator' : 'Compliance Reviewer',
          department: index === 0 ? 'Product Marketing' : 'Global Communications',
          issuesCount: c.issues.length,
          riskLevel: hasHighIssue ? 'HIGH' : hasMediumIssue ? 'MEDIUM' : 'LOW',
        };
      })
    );
    return;
  }

  if (method === 'POST' && pathname === '/api/approvals/status') {
    const body = await readJsonBody(request);
    const contentId = stringValue(body, 'contentId');
    const status = stringValue(body, 'status');

    if (status !== 'APPROVED' && status !== 'REJECTED' && status !== 'IN_REVIEW') {
      throw new InvalidRequestError('Status must be APPROVED, REJECTED, or IN_REVIEW');
    }

    const content = await prisma.content.findFirst({
      where: { id: contentId, workspaceId },
    });

    if (!content) {
      sendJson(response, 404, { error: 'Content not found or unauthorized.' });
      return;
    }

    await prisma.content.update({
      where: { id: contentId },
      data: { status },
    });

    sendJson(response, 200, { success: true });
    return;
  }

  if (method === 'GET' && pathname === '/api/rules') {
    const rules = await prisma.rule.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
    });
    sendJson(response, 200, rules);
    return;
  }

  if (method === 'POST' && pathname === '/api/rules') {
    const body = await readJsonBody(request);
    const title = stringValue(body, 'title').trim();
    const definition = stringValue(body, 'definition').trim();
    if (!title || !definition) {
      throw new InvalidRequestError('Rule title and definition are required.');
    }

    const rule = await prisma.rule.create({
      data: {
        title,
        definition,
        type: stringValue(body, 'type', 'TERMINOLOGY'),
        severity: stringValue(body, 'severity', 'HIGH'),
        workspaceId,
      },
    });
    sendJson(response, 201, rule);
    return;
  }

  const ruleIdMatch = pathname.match(/^\/api\/rules\/([^/]+)$/);
  if (method === 'DELETE' && ruleIdMatch) {
    const id = decodeURIComponent(ruleIdMatch[1]);
    const result = await prisma.rule.deleteMany({
      where: { id, workspaceId },
    });
    if (result.count === 0) {
      sendJson(response, 404, { error: 'Rule not found or unauthorized.' });
      return;
    }
    sendJson(response, 200, { deleted: true });
    return;
  }

  if (method === 'GET' && pathname === '/api/facts') {
    const facts = await prisma.fact.findMany({
      where: { workspaceId },
      orderBy: { expiryDate: 'asc' },
    });
    sendJson(response, 200, facts);
    return;
  }

  if (method === 'POST' && pathname === '/api/facts') {
    const body = await readJsonBody(request);
    const claim = stringValue(body, 'claim').trim();
    const evidenceSource = stringValue(body, 'evidenceSource').trim();
    const expiryDateValue = stringValue(body, 'expiryDate');
    const expiryDate = new Date(expiryDateValue);
    if (!claim || !evidenceSource || Number.isNaN(expiryDate.getTime())) {
      throw new InvalidRequestError(
        'Claim, evidence source, and a valid expiry date are required.'
      );
    }

    const fact = await prisma.fact.create({
      data: {
        claim,
        evidenceSource,
        expiryDate,
        status: stringValue(body, 'status', 'ACTIVE'),
        workspaceId,
      },
    });
    sendJson(response, 201, fact);
    return;
  }

  const factIdMatch = pathname.match(/^\/api\/facts\/([^/]+)$/);
  if (method === 'DELETE' && factIdMatch) {
    const id = decodeURIComponent(factIdMatch[1]);
    const result = await prisma.fact.deleteMany({
      where: { id, workspaceId },
    });
    if (result.count === 0) {
      sendJson(response, 404, { error: 'Fact not found or unauthorized.' });
      return;
    }
    sendJson(response, 200, { deleted: true });
    return;
  }

  if (method === 'GET' && pathname === '/api/content') {
    const content = await prisma.content.findMany({
      where: { workspaceId },
      orderBy: { title: 'asc' },
    });
    sendJson(response, 200, content);
    return;
  }

  if (method === 'GET' && pathname === '/api/insights') {
    const totalRules = await prisma.rule.count({
      where: { workspaceId },
    });

    const totalContents = await prisma.content.count({
      where: { workspaceId },
    });

    const totalIssues = await prisma.issue.count({
      where: { content: { workspaceId } },
    });

    const severityGroupResults = await prisma.issue.groupBy({
      by: ['severity'],
      where: { content: { workspaceId } },
      _count: {
        _all: true,
      },
    });

    const severityCounts: Record<string, number> = {
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
    };

    for (const item of severityGroupResults) {
      const sev = (item.severity || 'MEDIUM').toUpperCase();
      severityCounts[sev] = (severityCounts[sev] || 0) + item._count._all;
    }

    const severityData = [
      { severity: 'HIGH', label: 'High Severity', count: severityCounts.HIGH || 0 },
      { severity: 'MEDIUM', label: 'Medium Severity', count: severityCounts.MEDIUM || 0 },
      { severity: 'LOW', label: 'Low Severity', count: severityCounts.LOW || 0 },
    ];

    const statusGroupResults = await prisma.issue.groupBy({
      by: ['status'],
      where: { content: { workspaceId } },
      _count: {
        _all: true,
      },
    });

    const statusColors: Record<string, string> = {
      ACCEPTED: '#123B2F', // Forest Green
      OPEN: '#F47745', // Coral Orange
      OVERRIDDEN: '#7A8274', // Gray
      RULE_CREATED: '#1c5343', // Deep Forest Green
    };

    const statusLabels: Record<string, string> = {
      ACCEPTED: 'Accepted Fixes',
      OPEN: 'Open Issues',
      OVERRIDDEN: 'Overridden',
      RULE_CREATED: 'Saved as Rule',
    };

    const statusData = statusGroupResults.map((item) => {
      const rawStatus = (item.status || 'OPEN').toUpperCase();
      return {
        status: rawStatus,
        label: statusLabels[rawStatus] || rawStatus,
        count: item._count._all,
        color: statusColors[rawStatus] || '#7A8274',
      };
    });

    const acceptedCount =
      statusGroupResults.find((s) => s.status.toUpperCase() === 'ACCEPTED')?._count._all || 0;
    const ruleCreatedCount =
      statusGroupResults.find((s) => s.status.toUpperCase() === 'RULE_CREATED')?._count._all || 0;
    const resolvedIssues = acceptedCount + ruleCreatedCount;
    const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

    sendJson(response, 200, {
      totalRules,
      totalIssues,
      totalContents: totalContents > 0 ? totalContents : 1,
      resolvedIssues,
      resolutionRate,
      severityData,
      statusData,
    });
    return;
  }

  sendJson(response, 404, { error: 'API route not found.' });
}

export function apiHandler(
  request: IncomingMessage,
  response: ServerResponse,
  next: (error?: Error) => void
) {
  if (!request.url?.startsWith('/api/')) {
    next();
    return;
  }

  void handleApiRequest(request, response).catch((error: unknown) => {
    if (error instanceof InvalidRequestError) {
      sendJson(response, 400, { error: error.message });
      return;
    }
    console.error('[API] Database request failed:', error);
    sendJson(response, 500, {
      error: 'The database request failed. Check the server logs.',
    });
  });
}
