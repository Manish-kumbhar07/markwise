import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidDashboardPage,
  getPageMetadata,
  calculateApprovalStats,
  filterEvidenceBySearch,
  NAV_ITEMS,
  getSeverityBorderClass,
  getSeverityBadgeColors,
  INITIAL_MOCK_RULES,
  INITIAL_MOCK_FACTS,
  INITIAL_MOCK_ISSUES,
  type ApprovalItem,
} from './dashboard';

test('isValidDashboardPage validates all 5 core dashboard routes', () => {
  assert.equal(isValidDashboardPage('brand-brain'), true);
  assert.equal(isValidDashboardPage('fact-vault'), true);
  assert.equal(isValidDashboardPage('review'), true);
  assert.equal(isValidDashboardPage('approvals'), true);
  assert.equal(isValidDashboardPage('insights'), true);
  assert.equal(isValidDashboardPage('settings'), false);
});

test('NAV_ITEMS contains all 5 required links with proper metadata', () => {
  assert.equal(NAV_ITEMS.length, 5);
  const labels = NAV_ITEMS.map((n) => n.label);
  assert.deepEqual(labels, [
    'Brand Rules',
    'Fact Vault',
    'Content Review',
    'Approval Queue',
    'Governance Telemetry',
  ]);
});

test('getPageMetadata returns valid config', () => {
  const meta = getPageMetadata('brand-brain');
  assert.equal(meta.label, 'Brand Rules');
  assert.equal(meta.iconName, 'Shield');
});

test('calculateApprovalStats summarizes queue state correctly', () => {
  const items: ApprovalItem[] = [
    { id: '1', title: 'Q3 PR', author: 'Anna', department: 'Marketing', status: 'pending', riskLevel: 'high', claimsCount: 4 },
    { id: '2', title: 'SLA Doc', author: 'Mark', department: 'Engineering', status: 'approved', riskLevel: 'low', claimsCount: 1 },
    { id: '3', title: 'Landing Copy', author: 'Jane', department: 'Growth', status: 'pending', riskLevel: 'medium', claimsCount: 2 },
  ];
  const stats = calculateApprovalStats(items);
  assert.equal(stats.total, 3);
  assert.equal(stats.pending, 2);
  assert.equal(stats.approved, 1);
  assert.equal(stats.highRisk, 1);
});

test('filterEvidenceBySearch matches by title or anchor', () => {
  const sample = [
    { title: 'Visa Regulations', category: 'Compliance', anchorId: 'DOC-VISA-01' },
    { title: 'FDA Guidance CDS', category: 'Medical', anchorId: 'FDA-SAMD-02' },
  ];
  const matched = filterEvidenceBySearch(sample, 'visa');
  assert.equal(matched.length, 1);
  assert.equal(matched[0].anchorId, 'DOC-VISA-01');

  const emptyMatch = filterEvidenceBySearch(sample, '');
  assert.equal(emptyMatch.length, 2);
});

test('getSeverityBorderClass returns correct color for HIGH, MEDIUM, LOW', () => {
  assert.equal(getSeverityBorderClass('HIGH'), 'border-l-red-500');
  assert.equal(getSeverityBorderClass('MEDIUM'), 'border-l-amber-500');
  assert.equal(getSeverityBorderClass('LOW'), 'border-l-gray-400');

  const highBadge = getSeverityBadgeColors('HIGH');
  assert.equal(highBadge.text, 'text-red-700');

  assert.equal(INITIAL_MOCK_RULES.length, 3);
  assert.equal(INITIAL_MOCK_FACTS.length, 3);
  const expired = INITIAL_MOCK_FACTS.find((f) => f.status === 'Expired');
  assert.ok(expired);
});

test('INITIAL_MOCK_ISSUES contains 2 mock cards with required keys and severity badges', () => {
  assert.equal(INITIAL_MOCK_ISSUES.length, 2);
  const highIssue = INITIAL_MOCK_ISSUES.find((i) => i.severity === 'HIGH');
  assert.ok(highIssue);
  assert.equal(highIssue.title, 'Unsupported performance claim');
  assert.equal(highIssue.why, 'Superlative claim with no linked evidence');
  assert.equal(highIssue.rule, 'BR-014 v1');
  assert.equal(
    highIssue.suggestedFix,
    'Designed for high-speed performance (no verified benchmark found).'
  );
  assert.equal(highIssue.aiAssisted, true);
});


