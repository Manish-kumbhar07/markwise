import { apiRequest } from '../lib/api-client';

export interface ApprovalContentItem {
  id: string;
  title: string;
  bodyText: string;
  originalText: string;
  status: string;
  creator: string;
  department: string;
  issuesCount: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

export function getApprovalQueue(): Promise<ApprovalContentItem[]> {
  return apiRequest<ApprovalContentItem[]>('/api/approvals');
}

export function updateContentStatus(
  contentId: string,
  status: 'APPROVED' | 'REJECTED' | 'IN_REVIEW'
): Promise<void> {
  return apiRequest('/api/approvals/status', {
    method: 'POST',
    body: JSON.stringify({ contentId, status }),
  });
}

