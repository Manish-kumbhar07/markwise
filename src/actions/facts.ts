import { apiRequest } from '../lib/api-client';
import { DEMO_WORKSPACE_ID } from '../lib/workspace-constants';

export const DEFAULT_WORKSPACE_ID = DEMO_WORKSPACE_ID;

export interface FactRecord {
  id: string;
  claim: string;
  evidenceSource: string;
  expiryDate: string;
  status: string;
}

export function getFacts(): Promise<FactRecord[]> {
  return apiRequest('/api/facts');
}

export function createFact(input: {
  claim: string;
  evidenceSource: string;
  expiryDate: string | Date;
  status?: string;
}): Promise<FactRecord> {
  return apiRequest('/api/facts', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function deleteFact(id: string): Promise<void> {
  return apiRequest(`/api/facts/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
