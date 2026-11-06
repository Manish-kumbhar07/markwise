import { apiRequest } from '../lib/api-client';

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

export function createDraft(title?: string, bodyText?: string): Promise<ReviewContentResult> {
  return apiRequest<ReviewContentResult>('/api/review/draft', {
    method: 'POST',
    body: JSON.stringify({ title, bodyText }),
  });
}

export function getReviewContent(contentId?: string): Promise<ReviewContentResult> {
  const query = contentId ? `?contentId=${encodeURIComponent(contentId)}` : '';
  return apiRequest<ReviewContentResult>(`/api/review${query}`);
}

export function saveDraftContent(
  contentId: string,
  bodyText: string,
  title?: string
): Promise<{ success: boolean }> {
  return apiRequest('/api/review/save-draft', {
    method: 'POST',
    body: JSON.stringify({ contentId, bodyText, title }),
  });
}

export async function runAIReview(
  contentId: string,
  bodyText?: string,
  title?: string
): Promise<ReviewIssueResult[]> {
  const result = await apiRequest<{ success: boolean; issues: ReviewIssueResult[]; error?: string }>(
    '/api/review/run',
    {
      method: 'POST',
      body: JSON.stringify({ contentId, bodyText, title }),
    }
  );
  if (!result.success) {
    throw new Error(result.error || 'Failed to run AI review');
  }
  return result.issues;
}

export function acceptIssue(issueId: string, updatedText?: string): Promise<void> {
  return apiRequest('/api/review/accept', {
    method: 'POST',
    body: JSON.stringify({ issueId, newText: updatedText }),
  });
}
