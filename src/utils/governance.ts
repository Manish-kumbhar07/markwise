/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActiveTab = 'loop' | 'features' | 'pricing' | 'demo';

export const VALID_TABS: ActiveTab[] = ['loop', 'features', 'pricing', 'demo'];

export function isValidTab(tab: string): tab is ActiveTab {
  return VALID_TABS.includes(tab as ActiveTab);
}

export interface LoopStep {
  id: string;
  number: number;
  name: string;
  actor: 'AI' | 'Human';
  tagline: string;
  role: string;
  shortDescription?: string;
  description: string;
  input: string;
  output: string;
  latency: string;
  iconName: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPricePerMonth: number;
  seatsIncluded: number;
  costPerExtraSeat: number;
  description: string;
  badge?: string;
  features: string[];
}

export function getStepCategory(actor: 'AI' | 'Human'): {
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  label: string;
} {
  if (actor === 'AI') {
    return {
      color: '#174C3B',
      bgColor: '#edf4f1',
      borderColor: '#174C3B',
      textColor: '#174C3B',
      label: 'Autonomous AI Step',
    };
  }
  return {
    color: '#F47745',
    bgColor: '#fef1ec',
    borderColor: '#F47745',
    textColor: '#F47745',
    label: 'Human Governance Step',
  };
}

export function calculatePlanPrice(
  plan: PricingPlan,
  isAnnual: boolean,
  extraSeats: number = 0
): {
  baseMonthlyRate: number;
  totalMonthlyCharge: number;
  billedAnnuallyTotal: number;
  savingsYearly: number;
} {
  const effectiveMonthlyRate = isAnnual ? plan.annualPricePerMonth : plan.monthlyPrice;
  const extraSeatsCost = extraSeats * plan.costPerExtraSeat;
  const totalMonthlyCharge = effectiveMonthlyRate + extraSeatsCost;
  const billedAnnuallyTotal = isAnnual ? totalMonthlyCharge * 12 : totalMonthlyCharge;
  const standardMonthlyCost = (plan.monthlyPrice + extraSeatsCost) * 12;
  const savingsYearly = isAnnual ? Math.max(0, standardMonthlyCost - billedAnnuallyTotal) : 0;

  return {
    baseMonthlyRate: effectiveMonthlyRate,
    totalMonthlyCharge,
    billedAnnuallyTotal,
    savingsYearly,
  };
}

export function filterSteps(steps: LoopStep[], filter: 'all' | 'ai' | 'human'): LoopStep[] {
  if (filter === 'all') return steps;
  if (filter === 'ai') return steps.filter((s) => s.actor === 'AI');
  return steps.filter((s) => s.actor === 'Human');
}

export function calculateComplianceScore(issuesCount: number, fixedCount: number): number {
  if (issuesCount === 0) return 100;
  const resolvedRatio = fixedCount / issuesCount;
  return Math.min(100, Math.round(65 + resolvedRatio * 35));
}

export function formatRuleVersion(major: number, minor: number): string {
  return `v${major}.${minor}`;
}
