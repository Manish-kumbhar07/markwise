'use server';

import { prisma } from '@/lib/prisma';
import { requireUserWorkspace, DEMO_WORKSPACE_ID } from '@/lib/workspace';

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

export async function getInsightsData(): Promise<InsightsData> {
  let workspaceId: string;
  try {
    const context = await requireUserWorkspace();
    workspaceId = context.workspaceId;
  } catch {
    workspaceId = DEMO_WORKSPACE_ID;
  }

  // 1. Total Rules created in user's workspace
  const totalRules = await prisma.rule.count({
    where: { workspaceId },
  });

  // 2. Total Contents analyzed in user's workspace
  const totalContents = await prisma.content.count({
    where: { workspaceId },
  });

  // 3. Total Issues found in user's workspace contents
  const totalIssues = await prisma.issue.count({
    where: { content: { workspaceId } },
  });

  // 4. Severity breakdown for this workspace
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

  severityGroupResults.forEach((group) => {
    const key = group.severity.toUpperCase();
    if (key in severityCounts) {
      severityCounts[key] = group._count._all;
    }
  });

  const severityData: SeverityStat[] = [
    { severity: 'HIGH', label: 'High Risk', count: severityCounts['HIGH'] },
    { severity: 'MEDIUM', label: 'Medium Risk', count: severityCounts['MEDIUM'] },
    { severity: 'LOW', label: 'Low Risk', count: severityCounts['LOW'] },
  ];

  // 5. Status breakdown for this workspace
  const statusGroupResults = await prisma.issue.groupBy({
    by: ['status'],
    where: { content: { workspaceId } },
    _count: {
      _all: true,
    },
  });

  const statusCounts: Record<string, number> = {
    OPEN: 0,
    ACCEPTED: 0,
    RULE_CREATED: 0,
    OVERRIDDEN: 0,
  };

  statusGroupResults.forEach((group) => {
    const key = group.status.toUpperCase();
    if (key in statusCounts) {
      statusCounts[key] = group._count._all;
    } else {
      statusCounts['OPEN'] = (statusCounts['OPEN'] || 0) + group._count._all;
    }
  });

  const resolvedIssues = (statusCounts['ACCEPTED'] || 0) + (statusCounts['RULE_CREATED'] || 0);
  const resolutionRate =
    totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  const statusData: StatusStat[] = [
    {
      status: 'OPEN',
      label: 'Open',
      count: statusCounts['OPEN'],
      color: '#F47745',
    },
    {
      status: 'ACCEPTED',
      label: 'Accepted Fix',
      count: statusCounts['ACCEPTED'],
      color: '#123B2F',
    },
    {
      status: 'RULE_CREATED',
      label: 'Codified Rule',
      count: statusCounts['RULE_CREATED'],
      color: '#225A4A',
    },
    {
      status: 'OVERRIDDEN',
      label: 'Overridden',
      count: statusCounts['OVERRIDDEN'],
      color: '#9CA3AF',
    },
  ];

  return {
    totalRules,
    totalIssues,
    totalContents,
    resolvedIssues,
    resolutionRate,
    severityData,
    statusData,
  };
}
