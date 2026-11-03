export interface FlaggedClaim {
  id: string;
  originalText: string;
  suggestedText: string;
  severity: 'high' | 'medium' | 'low';
  ruleId: string;
  ruleTitle: string;
  category: 'Legal & FTC' | 'Regulatory Banking' | 'Claims Substantiation' | 'Brand Voice';
  whyFlagged: string;
  evidenceDoc: {
    title: string;
    section: string;
    anchorId: string;
    verifiedDate: string;
    fileType: 'PDF' | 'SEC Filing' | 'Audit Report' | 'Clinical Study';
  };
  ruleEvolution: {
    previousVersion: string;
    newVersion: string;
    evolutionNote: string;
  };
}

export interface InspectorCase {
  id: string;
  title: string;
  industry: string;
  sourceType: string;
  draftHeading: string;
  draftBody: string;
  flaggedClaims: FlaggedClaim[];
}

export const INSPECTOR_CASES: InspectorCase[] = [
  {
    id: 'fintech-card',
    title: 'Global Fintech Commercial Launch',
    industry: 'Financial Services & Banking',
    sourceType: 'Landing Page & Press Release',
    draftHeading: 'The Global Account for Borderless Teams',
    draftBody:
      'Our zero-fee card delivers guaranteed 100% fraud protection across all transactions, and all customer cash balances are automatically FDIC insured through our proprietary smart ledger.',
    flaggedClaims: [
      {
        id: 'claim-1',
        originalText: 'guaranteed 100% fraud protection',
        suggestedText: 'Visa Zero Liability protection against unauthorized transactions',
        severity: 'high',
        ruleId: 'FTC-B109',
        ruleTitle: 'Absolute Security & Guarantee Prohibition',
        category: 'Legal & FTC',
        whyFlagged:
          'Under FTC Enforcement Policy on Deceptive Claims (§5), no financial product may claim absolute zero-risk or "guaranteed 100%" protection without disclaiming statutory merchant dispute exceptions and gross negligence conditions.',
        evidenceDoc: {
          title: 'Visa Operating Regulations & Merchant Services Agreement',
          section: 'Section 4.1.2 - Zero Liability Coverage Scope',
          anchorId: 'DOC-VISA-2025-Q2',
          verifiedDate: 'Aug 14, 2025',
          fileType: 'Audit Report',
        },
        ruleEvolution: {
          previousVersion: 'Rule SEC-102 v2.1',
          newVersion: 'Rule SEC-102 v2.2',
          evolutionNote: 'Clarified network-backed zero-liability phrasing requirement for consumer marketing campaigns.',
        },
      },
      {
        id: 'claim-2',
        originalText: 'all customer cash balances are automatically FDIC insured through our proprietary smart ledger',
        suggestedText: 'funds are held at Evolve Bank & Trust, Member FDIC, eligible for pass-through insurance up to $250,000',
        severity: 'high',
        ruleId: 'FDIC-328',
        ruleTitle: 'FDIC Official Sign & Misrepresentation Rules (12 CFR Part 328)',
        category: 'Regulatory Banking',
        whyFlagged:
          'Non-bank fintech entities cannot state or imply that they are an FDIC member or that a software ledger itself provides FDIC insurance. Pass-through coverage must explicitly name the depositary partner institution.',
        evidenceDoc: {
          title: 'FDIC Pass-Through Deposit Placement Agreement',
          section: 'Schedule A - Partner Bank Custodial Agreement',
          anchorId: 'DOC-FDIC-EVOLVE-09',
          verifiedDate: 'Oct 02, 2025',
          fileType: 'SEC Filing',
        },
        ruleEvolution: {
          previousVersion: 'Rule FIN-08 v2.3',
          newVersion: 'Rule FIN-08 v2.4',
          evolutionNote: 'Strict check enforced: non-bank cards must qualify deposit insurance with named partner institution.',
        },
      },
    ],
  },
  {
    id: 'health-copilot',
    title: 'Clinical Diagnostic Decision Copilot',
    industry: 'Healthcare & Life Sciences',
    sourceType: 'B2B Medical Device Whitepaper',
    draftHeading: 'Empowering Radiologists with Autonomous Diagnostic AI',
    draftBody:
      'Markwise Health is the world\'s most accurate clinical diagnostic AI, preventing medical misdiagnosis across all clinical encounters and eliminating radiologist burnout permanently.',
    flaggedClaims: [
      {
        id: 'claim-3',
        originalText: 'the world\'s most accurate clinical diagnostic AI',
        suggestedText: 'a clinically evaluated diagnostic decision-support system demonstrated in multi-center validation',
        severity: 'high',
        ruleId: 'FDA-SAMD-860',
        ruleTitle: 'Substantiation of Comparative Superlative Medical Claims (21 CFR 860)',
        category: 'Claims Substantiation',
        whyFlagged:
          'Global superlative claims ("world\'s most accurate") require randomized head-to-head clinical trial data against every registered competitive device. Current evidence supports high sensitivity, not universal supremacy.',
        evidenceDoc: {
          title: 'Multi-Center Retrospective Clinical Validation Study (n=4,280)',
          section: 'Section 3.4 - ROC Area Under Curve (0.941 AUC)',
          anchorId: 'CLIN-NEJM-AI-441',
          verifiedDate: 'Jan 15, 2026',
          fileType: 'Clinical Study',
        },
        ruleEvolution: {
          previousVersion: 'Rule MED-14 v3.1',
          newVersion: 'Rule MED-14 v3.2',
          evolutionNote: 'Substantiation engine now requires head-to-head citation links before permitting comparative efficacy adjectives.',
        },
      },
      {
        id: 'claim-4',
        originalText: 'preventing medical misdiagnosis across all clinical encounters',
        suggestedText: 'assisting licensed clinicians in identifying early suspicious radiological patterns',
        severity: 'medium',
        ruleId: 'FDA-CDS-2022',
        ruleTitle: 'FDA Clinical Decision Support Software Guidance (CDS Scope)',
        category: 'Legal & FTC',
        whyFlagged:
          'Software claiming to "prevent misdiagnosis autonomously" risks classification as high-risk Class III autonomous diagnostic software rather than Class II decision support, requiring explicit clinician-in-the-loop language.',
        evidenceDoc: {
          title: 'FDA 510(k) Premarket Notification Clearance Package',
          section: 'Indications for Use Statement §2.1',
          anchorId: 'FDA-K240988',
          verifiedDate: 'Nov 12, 2025',
          fileType: 'PDF',
        },
        ruleEvolution: {
          previousVersion: 'Rule MED-09 v1.4',
          newVersion: 'Rule MED-09 v1.5',
          evolutionNote: 'Added automated regex flag for "autonomous prevention" in medical copy.',
        },
      },
    ],
  },
  {
    id: 'cyber-cloud',
    title: 'Enterprise Zero-Trust Infrastructure',
    industry: 'Enterprise Security & Cloud',
    sourceType: 'Product Architecture Brief',
    draftHeading: 'Next-Generation Resilient Enterprise Security',
    draftBody:
      'Our core cloud architecture delivers unbreakable zero-trust encryption with guaranteed 99.999% uptime across all public edge locations worldwide.',
    flaggedClaims: [
      {
        id: 'claim-5',
        originalText: 'unbreakable zero-trust encryption',
        suggestedText: 'NIST SP 800-207 compliant zero-trust architecture with AES-256 GCM encryption at rest and in transit',
        severity: 'medium',
        ruleId: 'NIST-800-207',
        ruleTitle: 'Cryptographic Exactitude & Security Marketing Standard',
        category: 'Brand Voice',
        whyFlagged:
          'Enterprise infosec buyers and auditors penalize marketing hyperbole ("unbreakable"). Accurate technical governance demands standard cipher declarations and architecture standards.',
        evidenceDoc: {
          title: 'SOC 2 Type II Security & Confidentiality Audit Report',
          section: 'Control CC6.1 - Cryptographic Key Management',
          anchorId: 'SOC2-EY-2025-10',
          verifiedDate: 'Sep 30, 2025',
          fileType: 'Audit Report',
        },
        ruleEvolution: {
          previousVersion: 'Rule SEC-402 v1.8',
          newVersion: 'Rule SEC-402 v1.9',
          evolutionNote: 'Shifted vocabulary from marketing adjectives to verifiable NIST/FIPS standard identifiers.',
        },
      },
      {
        id: 'claim-6',
        originalText: 'guaranteed 99.999% uptime across all public edge locations worldwide',
        suggestedText: 'contractually backed 99.99% service availability SLA across primary regions with credit tiers',
        severity: 'high',
        ruleId: 'SLA-LEGAL-01',
        ruleTitle: 'Master Service Agreement SLA Consistency',
        category: 'Legal & FTC',
        whyFlagged:
          'Five-nines (99.999% = 5.26 mins/year downtime) contradicts the standard Master Services Agreement which specifies four-nines (99.99%) for edge nodes. Discrepancies create immediate breach liability during outages.',
        evidenceDoc: {
          title: 'Markwise Enterprise Master Services Agreement (MSA)',
          section: 'Service Level Agreement Exhibit B, Paragraph 1.3',
          anchorId: 'MSA-LEGAL-2025',
          verifiedDate: 'Jul 20, 2025',
          fileType: 'PDF',
        },
        ruleEvolution: {
          previousVersion: 'Rule SLA-04 v2.0',
          newVersion: 'Rule SLA-04 v2.1',
          evolutionNote: 'Automated contract cross-check: flags SLA claims higher than standard legal addenda.',
        },
      },
    ],
  },
];
