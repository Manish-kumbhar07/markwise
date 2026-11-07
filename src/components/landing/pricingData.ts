import { PricingPlan } from '@/utils/governance';

export const PRICING_DATA = {
  growth: { monthly: 490, annual: 392 },
  enterprise: { monthly: 1250, annual: 1000 },
  custom: { monthly: 3200, annual: 2560 },
};

export const PLANS: PricingPlan[] = [
  {
    id: 'growth',
    name: 'Growth Governance',
    monthlyPrice: PRICING_DATA.growth.monthly,
    annualPricePerMonth: PRICING_DATA.growth.annual,
    seatsIncluded: 10,
    costPerExtraSeat: 35,
    description: 'For growing marketing, content, and communications teams establishing brand safety.',
    features: [
      'Up to 10 Brand Guardians included',
      '50,000 reviewed words / month',
      'Full 10-Step Markwise Loop access',
      'Live Explainability & Causal Reasoning',
      'Up to 50 Versioned Living Brand Rules',
      'Evidence linking (Google Drive & Box)',
      'CMS Webhooks (Webflow & WordPress)',
      'Standard 24-hour support SLA',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Governance',
    monthlyPrice: PRICING_DATA.enterprise.monthly,
    annualPricePerMonth: PRICING_DATA.enterprise.annual,
    seatsIncluded: 25,
    costPerExtraSeat: 30,
    badge: 'Most Popular for Enterprise',
    description: 'For regulated industries, global brands, and multi-tier legal and communications organizations.',
    features: [
      '25 Brand Guardians included (expandable)',
      '250,000 reviewed words / month',
      'Unlimited Versioned Living Rules & Diffs',
      'Regulatory Rule Packs (FTC, FDIC, FDA, SEC)',
      'Full Cryptographic Audit Trail & Seals',
      'Okta, Azure AD & Google SAML SSO',
      'Tamper-proof Staging Drift Prevention',
      'Dedicated Brand Policy Architect',
      'Target 99.9% Availability (Pilot Phase)',
    ],
  },
  {
    id: 'custom',
    name: 'Global Sovereign',
    monthlyPrice: PRICING_DATA.custom.monthly,
    annualPricePerMonth: PRICING_DATA.custom.annual,
    seatsIncluded: 100,
    costPerExtraSeat: 25,
    description: 'For global conglomerates, defense, and multinational health systems requiring sovereign cloud isolation.',
    features: [
      'Unlimited Enterprise Seats & Workspaces',
      'Custom Volume (1M+ words/month)',
      'Private Cloud VPC or On-Premise Deployment',
      'Custom LLM Fine-Tuning on Internal Policies',
      'Zero Data Retention (ZDR) Legal Covenant',
      'Custom Jurisdiction Rules (EU AI Act, APAC)',
      '24/7 Dedicated Legal Response Desk',
      'Quarterly Executive Governance Audits',
    ],
  },
];
