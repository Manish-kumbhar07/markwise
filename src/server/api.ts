import { Buffer } from 'node:buffer';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { GoogleGenAI } from '@google/genai';
import { prisma } from '../lib/prisma.ts';
import { DEMO_WORKSPACE_ID, getOrCreateDemoWorkspace } from '../lib/workspace.ts';

class InvalidRequestError extends Error {}

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

  if (method === 'GET' && pathname === '/api/review') {
    await getOrCreateDemoWorkspace();
    const url = new URL(request.url ?? '/', 'http://localhost');
    const contentId = url.searchParams.get('contentId');

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
    await getOrCreateDemoWorkspace();
    const body = await readJsonBody(request);
    const contentId = stringValue(body, 'contentId');

    const content = await prisma.content.findUnique({
      where: { id: contentId },
    });

    if (!content) {
      sendJson(response, 404, { success: false, error: 'Content not found' });
      return;
    }

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      sendJson(response, 500, {
        success: false,
        error: 'GEMINI_API_KEY is missing in environment variables (.env.local)',
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
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
            severity: item.severity?.toUpperCase() === 'HIGH' ? 'HIGH' : item.severity?.toUpperCase() === 'LOW' ? 'LOW' : 'MEDIUM',
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
    await getOrCreateDemoWorkspace();
    const body = await readJsonBody(request);
    const issueId = stringValue(body, 'issueId');
    const newText = stringValue(body, 'newText');

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      sendJson(response, 404, { success: false, error: 'Issue not found' });
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

  if (method === 'POST' && pathname === '/api/review/content') {
    await getOrCreateDemoWorkspace();
    const body = await readJsonBody(request);
    const contentId = stringValue(body, 'contentId');
    const bodyText = stringValue(body, 'bodyText');

    await prisma.content.update({
      where: { id: contentId },
      data: { bodyText },
    });

    sendJson(response, 200, { success: true });
    return;
  }

  if (method === 'GET' && pathname === '/api/rules') {
    await getOrCreateDemoWorkspace();
    const rules = await prisma.rule.findMany({
      where: { workspaceId: DEMO_WORKSPACE_ID },
      orderBy: { createdAt: 'desc' },
    });
    sendJson(response, 200, rules);
    return;
  }

  if (method === 'POST' && pathname === '/api/rules') {
    await getOrCreateDemoWorkspace();
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
        type: stringValue(body, 'type', 'CLAIM'),
        severity: stringValue(body, 'severity', 'HIGH'),
        workspaceId: DEMO_WORKSPACE_ID,
      },
    });
    sendJson(response, 201, rule);
    return;
  }

  const ruleIdMatch = pathname.match(/^\/api\/rules\/([^/]+)$/);
  if (method === 'DELETE' && ruleIdMatch) {
    await getOrCreateDemoWorkspace();
    const id = decodeURIComponent(ruleIdMatch[1]);
    const result = await prisma.rule.deleteMany({
      where: { id, workspaceId: DEMO_WORKSPACE_ID },
    });
    if (result.count === 0) {
      sendJson(response, 404, { error: 'Rule not found.' });
      return;
    }
    sendJson(response, 200, { deleted: true });
    return;
  }

  if (method === 'GET' && pathname === '/api/facts') {
    await getOrCreateDemoWorkspace();
    const facts = await prisma.fact.findMany({
      where: { workspaceId: DEMO_WORKSPACE_ID },
      orderBy: { expiryDate: 'asc' },
    });
    sendJson(response, 200, facts);
    return;
  }

  if (method === 'POST' && pathname === '/api/facts') {
    await getOrCreateDemoWorkspace();
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
        status: stringValue(body, 'status', 'Valid'),
        workspaceId: DEMO_WORKSPACE_ID,
      },
    });
    sendJson(response, 201, fact);
    return;
  }

  const factIdMatch = pathname.match(/^\/api\/facts\/([^/]+)$/);
  if (method === 'DELETE' && factIdMatch) {
    await getOrCreateDemoWorkspace();
    const id = decodeURIComponent(factIdMatch[1]);
    const result = await prisma.fact.deleteMany({
      where: { id, workspaceId: DEMO_WORKSPACE_ID },
    });
    if (result.count === 0) {
      sendJson(response, 404, { error: 'Fact not found.' });
      return;
    }
    sendJson(response, 200, { deleted: true });
    return;
  }

  if (method === 'GET' && pathname === '/api/content') {
    await getOrCreateDemoWorkspace();
    const content = await prisma.content.findMany({
      where: { workspaceId: DEMO_WORKSPACE_ID },
      orderBy: { title: 'asc' },
    });
    sendJson(response, 200, content);
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
