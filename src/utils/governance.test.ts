import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getStepCategory,
  calculatePlanPrice,
  filterSteps,
  calculateComplianceScore,
  formatRuleVersion,
  isValidTab,
  type LoopStep,
  type PricingPlan,
} from './governance';

test('isValidTab checks allowed navigation tabs', () => {
  assert.equal(isValidTab('loop'), true);
  assert.equal(isValidTab('features'), true);
  assert.equal(isValidTab('pricing'), true);
  assert.equal(isValidTab('demo'), true);
  assert.equal(isValidTab('unknown'), false);
});

test('getStepCategory returns forest green tokens for AI and coral for Human', () => {
  const aiTokens = getStepCategory('AI');
  assert.equal(aiTokens.color, '#174C3B');
  assert.equal(aiTokens.label, 'Autonomous AI Step');

  const humanTokens = getStepCategory('Human');
  assert.equal(humanTokens.color, '#F47745');
  assert.equal(humanTokens.label, 'Human Governance Step');
});

test('calculatePlanPrice handles monthly vs annual discount correctly', () => {
  const mockPlan: PricingPlan = {
    id: 'team',
    name: 'Team Brand Governance',
    monthlyPrice: 500,
    annualPricePerMonth: 400,
    seatsIncluded: 5,
    costPerExtraSeat: 50,
    description: 'Enterprise brand protection',
    features: ['100k words', 'Custom Rules'],
  };

  const monthlyCalc = calculatePlanPrice(mockPlan, false, 2);
  assert.equal(monthlyCalc.baseMonthlyRate, 500);
  assert.equal(monthlyCalc.totalMonthlyCharge, 600); // 500 + 2*50
  assert.equal(monthlyCalc.savingsYearly, 0);

  const annualCalc = calculatePlanPrice(mockPlan, true, 2);
  assert.equal(annualCalc.baseMonthlyRate, 400);
  assert.equal(annualCalc.totalMonthlyCharge, 500); // 400 + 2*50
  assert.equal(annualCalc.billedAnnuallyTotal, 6000); // 500 * 12
  // standard yearly = (500 + 100) * 12 = 7200. Savings = 1200
  assert.equal(annualCalc.savingsYearly, 1200);
});

test('filterSteps filters steps by actor correctly', () => {
  const steps: LoopStep[] = [
    { id: '1', number: 1, name: 'Create', actor: 'Human', tagline: '', role: '', description: '', input: '', output: '', latency: '', iconName: '' },
    { id: '2', number: 2, name: 'Check', actor: 'AI', tagline: '', role: '', description: '', input: '', output: '', latency: '', iconName: '' },
    { id: '3', number: 3, name: 'Explain', actor: 'AI', tagline: '', role: '', description: '', input: '', output: '', latency: '', iconName: '' },
  ];

  assert.equal(filterSteps(steps, 'all').length, 3);
  assert.equal(filterSteps(steps, 'ai').length, 2);
  assert.equal(filterSteps(steps, 'human').length, 1);
});

test('calculateComplianceScore scales dynamically', () => {
  assert.equal(calculateComplianceScore(0, 0), 100);
  assert.equal(calculateComplianceScore(4, 0), 65);
  assert.equal(calculateComplianceScore(4, 4), 100);
  assert.equal(calculateComplianceScore(4, 2), 83);
});

test('formatRuleVersion formats major and minor correctly', () => {
  assert.equal(formatRuleVersion(2, 4), 'v2.4');
});
