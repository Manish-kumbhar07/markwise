/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DashboardPage =
  | 'brand-brain'
  | 'fact-vault'
  | 'review'
  | 'approvals'
  | 'insights';

export const DASHBOARD_PAGES: DashboardPage[] = [
  'brand-brain',
  'fact-vault',
  'review',
  'approvals',
  'insights',
];

export function isValidDashboardPage(page: string): page is DashboardPage {
  return DASHBOARD_PAGES.includes(page as DashboardPage);
}

export interface NavItemConfig {
  id: DashboardPage;
  label: string;
  iconName: 'Shield' | 'Database' | 'FileText' | 'CheckCircle' | 'BarChart';
  badge?: string;
  description: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'brand-brain',
    label: 'Brand Rules',
    iconName: 'Shield',
    description: 'Living brand guidelines, tone constraints, and versioned rules',
  },
  {
    id: 'fact-vault',
    label: 'Fact Vault',
    iconName: 'Database',
    description: 'Enterprise evidence repository and verified proof anchors',
  },
  {
    id: 'review',
    label: 'Content Review',
    iconName: 'FileText',
    description: 'Pre-publish claim scanner, explainability analysis, and suggested fixes',
  },
  {
    id: 'approvals',
    label: 'Approval Queue',
    iconName: 'CheckCircle',
    description: 'Role-based legal and brand guardian sign-off matrix',
  },
  {
    id: 'insights',
    label: 'Governance Telemetry',
    iconName: 'BarChart',
    description: 'Compliance telemetry, latency SLAs, and living rule evolution',
  },
];

export function getPageMetadata(pageId: DashboardPage): NavItemConfig {
  const item = NAV_ITEMS.find((n) => n.id === pageId);
  return (
    item || {
      id: 'brand-brain',
      label: 'Brand Rules',
      iconName: 'Shield',
      description: 'Living brand guidelines and versioned rules',
    }
  );
}

export interface ApprovalItem {
  id: string;
  title: string;
  author: string;
  department: string;
  status: 'pending' | 'approved' | 'rejected';
  riskLevel: 'low' | 'medium' | 'high';
  claimsCount: number;
}

export function calculateApprovalStats(items: ApprovalItem[]) {
  const pending = items.filter((i) => i.status === 'pending').length;
  const approved = items.filter((i) => i.status === 'approved').length;
  const rejected = items.filter((i) => i.status === 'rejected').length;
  const highRisk = items.filter((i) => i.riskLevel === 'high').length;
  return {
    total: items.length,
    pending,
    approved,
    rejected,
    highRisk,
  };
}

export function filterEvidenceBySearch(
  evidence: Array<{ title: string; category: string; anchorId: string }>,
  query: string
) {
  if (!query.trim()) return evidence;
  const q = query.toLowerCase();
  return evidence.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.anchorId.toLowerCase().includes(q)
  );
}

export type RuleType = 'BANNED_WORD' | 'TONE' | 'CLAIM' | 'COMPLIANCE' | 'VOICE_TONE';
export type RuleSeverity = 'HIGH' | 'MEDIUM' | 'LOW';

export interface RuleCard {
  id: string; // e.g. "BR-014 v1"
  title: string;
  type: RuleType;
  severity: RuleSeverity;
  definition: string;
  createdAt?: string;
}

export interface FactRecord {
  id: string;
  claim: string;
  evidenceSource: string;
  expiryDate: string;
  status: 'Valid' | 'Expired';
}

export function getSeverityBorderClass(severity: RuleSeverity): string {
  switch (severity) {
    case 'HIGH':
      return 'border-l-red-500';
    case 'MEDIUM':
      return 'border-l-amber-500';
    case 'LOW':
      return 'border-l-gray-400';
    default:
      return 'border-l-gray-400';
  }
}

export function getSeverityBadgeColors(severity: RuleSeverity): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  switch (severity) {
    case 'HIGH':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        dot: 'bg-red-500',
      };
    case 'MEDIUM':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'LOW':
      return {
        bg: 'bg-stone-100',
        text: 'text-stone-700',
        border: 'border-stone-300',
        dot: 'bg-stone-400',
      };
  }
}

export const INITIAL_MOCK_RULES: RuleCard[] = [
  {
    id: 'BR-014 v1',
    title: 'Unsupported Superlatives',
    type: 'CLAIM',
    severity: 'HIGH',
    definition:
      'Prohibits unqualified guarantees of immunity, fastest performance, or absolute superlatives without auditable benchmark evidence.',
    createdAt: 'Active · v1.4',
  },
  {
    id: 'BR-021 v2',
    title: 'Tone: Professional & Direct',
    type: 'VOICE_TONE',
    severity: 'MEDIUM',
    definition:
      'Avoid hyperbolic marketing colloquialisms and speculative buzzwords. Replace with measured, defensible enterprise language.',
    createdAt: 'Active · v2.1',
  },
  {
    id: 'BR-009 v1',
    title: 'Data Privacy Compliance',
    type: 'COMPLIANCE',
    severity: 'HIGH',
    definition:
      'Prohibits claims regarding user data retention, security compliance, or encryption without citing active SOC 2 Type II or ISO 27001 certifications.',
    createdAt: 'Active · v1.0',
  },
];

export const INITIAL_MOCK_FACTS: FactRecord[] = [
  {
    id: 'FV-801',
    claim: 'SOC 2 Type II Certification with Zero Data Retention architecture.',
    evidenceSource: 'AICPA SOC 2 Type II Attestation Report 2025',
    expiryDate: '2027-12-31',
    status: 'Valid',
  },
  {
    id: 'FV-802',
    claim: '99.9% Uptime SLA guaranteed across all enterprise tier production clusters.',
    evidenceSource: 'Enterprise Master Services Agreement §1.3 (SLA Exhibit B)',
    expiryDate: '2026-12-31',
    status: 'Valid',
  },
  {
    id: 'FV-803',
    claim: 'End-to-end AES-256 encryption for data at rest and TLS 1.3 in transit.',
    evidenceSource: 'NIST Cryptographic Standards Attestation (Superseded)',
    expiryDate: '2024-12-31',
    status: 'Expired',
  },
];

export interface ReviewIssue {
  id: string;
  severity: 'HIGH' | 'MEDIUM';
  title: string;
  why: string;
  rule: string;
  suggestedFix: string;
  status?: 'pending' | 'accepted' | 'overridden';
  aiAssisted?: boolean;
}

export const INITIAL_MOCK_ISSUES: ReviewIssue[] = [
  {
    id: 'issue-1',
    severity: 'HIGH',
    title: 'Unsupported performance claim',
    why: 'Superlative claim with no linked evidence',
    rule: 'BR-014 v1',
    suggestedFix: 'Designed for high-speed performance (no verified benchmark found).',
    status: 'pending',
    aiAssisted: true,
  },
  {
    id: 'issue-2',
    severity: 'MEDIUM',
    title: 'Unsubstantiated market scope assertion',
    why: "Superlative scope 'on the market' requires independent multi-vendor benchmark or third-party study in Fact Vault",
    rule: 'BR-021 v2',
    suggestedFix: 'across internal benchmark workloads (requires linking to industry study).',
    status: 'pending',
    aiAssisted: true,
  },
];
