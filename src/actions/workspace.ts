import { apiRequest } from '../lib/api-client';

export interface WorkspaceItem {
  id: string;
  name: string;
  isCurrent: boolean;
  rulesCount: number;
  factsCount: number;
}

export interface WorkspaceStats {
  rulesCount: number;
  factsCount: number;
  pendingCount: number;
  approvalsCount: number;
}

export function getWorkspaces(): Promise<WorkspaceItem[]> {
  return apiRequest<WorkspaceItem[]>('/api/workspaces');
}

export function createWorkspace(name: string): Promise<WorkspaceItem> {
  return apiRequest<WorkspaceItem>('/api/workspaces', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export function switchWorkspace(workspaceId: string): Promise<{ success: boolean; activeWorkspaceId: string }> {
  return apiRequest('/api/workspaces/switch', {
    method: 'POST',
    body: JSON.stringify({ workspaceId }),
  });
}

export function getWorkspaceStats(): Promise<WorkspaceStats> {
  return apiRequest<WorkspaceStats>('/api/workspace/stats');
}
