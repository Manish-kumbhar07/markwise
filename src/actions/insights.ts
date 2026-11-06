import { apiRequest } from '../lib/api-client';

export interface SeverityStat {
  severity: string;
  label: string;
  count: number;
}

export interface StatusStat {
  status: string;
  label: string;
  count: number;
  color: string;
}

export interface InsightsData {
  totalRules: number;
  totalIssues: number;
  totalContents: number;
  resolvedIssues: number;
  resolutionRate: number;
  severityData: SeverityStat[];
  statusData: StatusStat[];
}

export function getClientInsightsData(): Promise<InsightsData> {
  return apiRequest<InsightsData>('/api/insights');
}

