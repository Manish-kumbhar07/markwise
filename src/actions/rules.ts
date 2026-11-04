import { apiRequest } from '../lib/api-client';
import { DEMO_WORKSPACE_ID } from '../lib/workspace-constants';

export const DEFAULT_WORKSPACE_ID = DEMO_WORKSPACE_ID;

export interface RuleRecord {
  id: string;
  title: string;
  type: string;
  severity: string;
  definition: string;
  version: number;
  createdAt: string;
}

export function getRules(): Promise<RuleRecord[]> {
  return apiRequest('/api/rules');
}

export function createRule(input: {
  title: string;
  type: string;
  severity: string;
  definition: string;
}): Promise<RuleRecord> {
  return apiRequest('/api/rules', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function deleteRule(id: string): Promise<void> {
  return apiRequest(`/api/rules/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
