'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  PenTool,
  SearchCode,
  HelpCircle,
  Sparkles,
  CheckCheck,
  ShieldCheck,
  Send,
  Eye,
  Cpu,
  GitBranch,
  Bot,
  User,
  Layers,
  Check,
  FileCode2,
  Workflow,
  ExternalLink,
} from 'lucide-react';
import { LOOP_STEPS } from '@/data/loopSteps';

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>> = {
  PenTool,
  SearchCode,
  HelpCircle,
  Sparkles,
  CheckCheck,
  ShieldCheck,
  Send,
  Eye,
  Cpu,
  GitBranch,
};

// Rich simulated artifact mockups for every step
const STEP_MOCKUPS: Record<string, { label: string; code: string; highlight?: string }> = {
  create: {
    label: 'Campaign Draft Ingestion',
    code: `// Draft Ingested from Headless CMS / Google Docs
{
  "documentId": "doc_enterprise_q2_launch",
  "title": "Global Cloud Infrastructure Launch",
  "author": "growth-team@enterprise.com",
  "rawText": "Our ultra-secure platform provides 100% unbreakable data protection and 10x faster indexing than any competitor on the market.",
  "targetAudience": "Enterprise CTOs, CISO, IT Directors",
  "jurisdiction": "US-SEC / EU-GDPR"
}`,
  },
  check: {
    label: 'Multi-Layer AST Rule Evaluation',
    code: `// Evaluation Pipeline · 140+ Rules Evaluated in 1.2s
[SCAN] Tokenizing semantic sentences...
[SCAN] Analyzing claims against Policy Codices...
[FLAG] Sentence 1: "100% unbreakable data protection"
       -> Triggered: [BR-014: Absolute Security Claims] (Severity: HIGH)
[FLAG] Sentence 1: "10x faster indexing than any competitor"
       -> Triggered: [BR-089: Unsubstantiated Comparative Metric] (Severity: MEDIUM)`,
  },
  explain: {
    label: 'Causal Explainability Card',
    code: `// Causal Rationale Generated with Exact Citations
ISSUE CARD:
• WHY: Absolute claims of "100% unbreakable" violate FTC Section 5 & Enterprise Brand Guideline §3.2. No cryptographic system is mathematically infallible.
• RULE CITATION: BR-014 v2.3 ("Absolute Security & Privacy Assertions")
• REQUIRED PROOF: Fact Vault SOC 2 Type II Certification or ISO 27001 audit reference.
• RECOMMENDED REWRITE: "enterprise-grade encryption certified to SOC 2 Type II standards"`,
  },
  fix: {
    label: 'Human Review & Contextual Rewrite',
    code: `// Human Reviewer Interface · One-Click Contextual Fix
- "Our ultra-secure platform provides 100% unbreakable data protection..."
+ "Our cloud platform delivers enterprise-grade encryption certified to SOC 2 Type II standards..."

Reviewer Action: [ACCEPTED REVISION]
Reviewer Note: "Aligned with Q1 compliance guidelines approved by Legal."`,
  },
  verify: {
    label: 'Fact Vault Proof-of-Claim Anchor',
    code: `// Fact Vault Deterministic Cross-Verification
[QUERY] Match "SOC 2 Type II" -> Fact Vault Document Vault
[FOUND] Evidence ID: EV-2025-SOC2-REPORT
[STATUS] VALIDATED (Expires: 2026-12-31)
[PROOF ANCHOR] SOC 2 Type II Audit Report §4.2 (Deloitte & Touche, Nov 2025)
[CRYPTOGRAPHIC PROOF] SHA-256: 8a4c1f92e09b11d7e234801ca8b827cf4210d...`,
  },
  approve: {
    label: 'Multi-Tier Cryptographic Approval Seal',
    code: `// Cryptographic Audit Seal Generation
{
  "sealId": "SEAL-2026-04-89312",
  "approverRole": "Certified Brand Steward & Senior Legal Counsel",
  "approverEmail": "sarah.chen@enterprise.com",
  "approvedHash": "3f91b72a0883d6a4a15ef03212879c85771ea00d8a43f8e",
  "ruleVersionSnapshot": "BR-014 v2.3, BR-089 v1.8",
  "status": "APPROVED_FOR_PRODUCTION_RELEASE"
}`,
  },
  publish: {
    label: 'Automated Multi-Channel Dispatch',
    code: `// Dispatch Webhook Propagation · Zero Staging Drift
POST https://api.enterprise-cms.com/v1/publish
Headers: { "X-Markwise-Seal": "SEAL-2026-04-89312" }

[DISPATCH] Webflow Production: 200 OK (320ms)
[DISPATCH] HubSpot Marketing Hub: 200 OK (410ms)
[DISPATCH] Social Graph API: 200 OK (210ms)
[RESULT] Asset Live in Production across 3 endpoints.`,
  },
  monitor: {
    label: '24/7 Sentinel Live URL Prober',
    code: `// Sentinel Webhook & DOM Drift Detection
[PROBE] Target: https://enterprise.com/product/cloud
[STATUS] Checking DOM copy against Seal: SEAL-2026-04-89312...
[INTEGRITY] 100% Match (0 character drift detected)
[CADENCE] Polling frequency: Every 15 minutes
[ALERTS] Zero unauthorized post-publish modifications detected.`,
  },
  learn: {
    label: 'Meta-Learning Override Pattern Clustering',
    code: `// Meta-Learning Cluster Synthesis
[INPUT] 1,420 human editor decisions processed over last 30 days
[CLUSTER #48] Detected recurring friction on Rule BR-014:
              - 84 editors replaced "unbreakable" with "SOC 2 Type II certified"
              - 18 editors noted confusion around "bank-grade encryption"
[RECOMMENDATION] Update BR-014 to explicitly suggest SOC 2 phrasing and deprecate "bank-grade".`,
  },
  improve: {
    label: 'Living Rule Version Release (Git-like Changelog)',
    code: `// living-rules/BR-014.yaml (Updated to v2.4)
id: BR-014
version: "2.4" # Updated from 2.3 by Brand Policy Lead
title: "Absolute Security & Privacy Assertions"
severity: "HIGH"
changelog:
  - "v2.4: Added direct SOC 2 Type II replacement template based on 84 accepted editor corrections."
status: "DEPLOYED_COMPANY_WIDE"`,
  },
};

export default function HowItWorksPage() {
  const [filter, setFilter] = useState<'all' | 'ai' | 'human'>('all');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const filteredSteps = LOOP_STEPS.filter((step) => {
    if (filter === 'ai') return step.actor === 'AI';
    if (filter === 'human') return step.actor === 'Human';
    return true;
  });

  const activeStep = LOOP_STEPS[activeStepIndex] || LOOP_STEPS[0];
  const ActiveIcon = STEP_ICONS[activeStep.iconName] || Sparkles;
  const isActiveAI = activeStep.actor === 'AI';
  const activeMockup = STEP_MOCKUPS[activeStep.id] || STEP_MOCKUPS.explain;

  return (
    <div className="min-h-screen bg-brand-ivory dark:bg-brand-forest text-brand-ink dark:text-brand-ivory transition-colors duration-300 font-inter selection:bg-brand-coral/20 selection:text-brand-forest-light">
      {/* Top Header Bar */}
      <header className="border-b border-brand-border dark:border-[#235A4A] bg-brand-cream/90 dark:bg-brand-forest-dark/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted dark:text-zinc-300 hover:text-brand-forest dark:hover:text-white transition-colors"
            >
              <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-brand-border dark:text-[#235A4A]" aria-hidden="true">|</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-forest dark:bg-white text-white dark:text-brand-forest flex items-center justify-center text-xs shadow-2xs">
                <Workflow aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
              </div>
              <span className="font-serif font-bold text-sm tracking-tight text-brand-forest dark:text-brand-ivory">
                The 10-Step Markwise Loop
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/trust"
              className="text-xs font-semibold text-brand-muted dark:text-zinc-300 hover:text-brand-forest dark:hover:text-white transition-colors"
            >
              Trust Center
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark dark:hover:bg-brand-coral-hover rounded-full transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none"
            >
              <span>Test Sandbox</span>
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <div className="space-y-5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-brand-ivory text-xs font-semibold uppercase tracking-wider">
            <Workflow aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
            <span>Continuous Brand Governance Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-brand-forest dark:text-brand-ivory">
            The 10-Step Markwise Loop
          </h1>

          <p className="text-base sm:text-lg text-brand-muted dark:text-zinc-300 leading-relaxed">
            Enterprise brand governance cannot exist as a static PDF or a disconnected AI reviewer. Markwise operates as a continuous, closed-loop system where machine velocity executes scans and human judgment retains strategic governance:
          </p>

          {/* Color Legend Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-forest text-white text-xs font-semibold shadow-2xs">
              <Bot aria-hidden="true" className="w-3.5 h-3.5 text-emerald-300" />
              <span>Forest Green: 6 Autonomous AI Steps</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-coral text-white text-xs font-semibold shadow-2xs">
              <User aria-hidden="true" className="w-3.5 h-3.5" />
              <span>Coral Orange: 4 Human Strategic Gates</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cream dark:bg-white/5 border border-brand-border dark:border-[#235A4A] text-brand-subtle dark:text-zinc-400 text-xs font-mono">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Drift · 100% Cryptographic Audit</span>
            </div>
          </div>
        </div>

        {/* 1. Interactive Horizontal Loop Stepper */}
        <section aria-labelledby="loop-stepper-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="loop-stepper-heading" className="text-xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
              1. The End-to-End Loop Flow
            </h2>
            <span className="text-xs text-brand-subtle dark:text-zinc-400 font-mono hidden sm:inline">
              Click any step to inspect technical details
            </span>
          </div>

          <div className="bg-white dark:bg-brand-forest-dark/70 rounded-2xl border border-brand-border dark:border-[#235A4A] p-4 sm:p-6 shadow-xs overflow-x-auto">
            <div className="min-w-[840px] flex items-center justify-between">
              {LOOP_STEPS.map((step, idx) => {
                const isSelected = activeStepIndex === idx;
                const isAI = step.actor === 'AI';
                const StepIcon = STEP_ICONS[step.iconName] || Sparkles;

                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setActiveStepIndex(idx)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all cursor-pointer text-center group ${
                        isSelected
                          ? 'ring-2 ring-brand-coral bg-brand-cream/80 dark:bg-white/10 scale-105 shadow-xs'
                          : 'hover:bg-brand-cream/50 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                      }`}
                      aria-label={`Step ${step.number}: ${step.name} (${step.actor})`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-2xs transition-transform group-hover:scale-105 ${
                          isAI
                            ? 'bg-brand-forest dark:bg-emerald-600 text-white'
                            : 'bg-brand-coral text-white'
                        }`}
                      >
                        <StepIcon aria-hidden="true" className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-brand-ink dark:text-brand-ivory">
                        {step.number}. {step.name}
                      </span>
                      <span
                        className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded ${
                          isAI
                            ? 'bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-emerald-300'
                            : 'bg-brand-coral/10 text-brand-coral'
                        }`}
                      >
                        {step.actor}
                      </span>
                    </button>
                    {idx < LOOP_STEPS.length - 1 && (
                      <div className="w-4 sm:w-6 h-[2px] bg-brand-border dark:bg-[#235A4A] mx-1 shrink-0 self-center mb-6" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Step Spotlight Panel */}
          <div className="bg-brand-cream dark:bg-brand-forest-dark/80 rounded-2xl border-2 border-brand-border dark:border-[#235A4A] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border dark:border-[#235A4A]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0 ${
                    isActiveAI ? 'bg-brand-forest dark:bg-emerald-600' : 'bg-brand-coral'
                  }`}
                >
                  <ActiveIcon aria-hidden="true" className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-brand-subtle dark:text-zinc-400">
                    Step {activeStep.number} of 10 · {activeStep.role}
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                    {activeStep.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs uppercase font-mono font-bold px-3 py-1 rounded-full ${
                    isActiveAI
                      ? 'bg-brand-forest text-white dark:bg-emerald-600'
                      : 'bg-brand-coral text-white'
                  }`}
                >
                  {isActiveAI ? 'Autonomous AI Step' : 'Human Strategic Gate'}
                </span>
                <span className="text-xs text-brand-subtle dark:text-zinc-400 font-mono bg-white dark:bg-white/10 px-2.5 py-1 rounded-full border border-brand-border dark:border-[#235A4A]">
                  {activeStep.latency}
                </span>
              </div>
            </div>

            {/* Prominent Short Description Quote */}
            <div className={`p-4 rounded-xl border-l-4 shadow-2xs ${
              isActiveAI
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-brand-forest dark:border-emerald-500 text-brand-forest dark:text-emerald-200'
                : 'bg-orange-50 dark:bg-orange-950/30 border-brand-coral text-orange-950 dark:text-orange-200'
            }`}>
              <span className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-1 opacity-80">
                Core Step Function
              </span>
              <p className="text-sm sm:text-base font-semibold">
                {activeStep.name}: {activeStep.shortDescription || activeStep.description}
              </p>
            </div>

            <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
              {activeStep.description}
            </p>

            {/* Technical Payloads Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-brand-border dark:border-[#235A4A] space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-brand-subtle block">
                  Input Contract
                </span>
                <p className="text-xs text-brand-ink dark:text-zinc-200 font-medium">
                  {activeStep.input}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-brand-border dark:border-[#235A4A] space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-brand-subtle block">
                  Output Artifact
                </span>
                <p className="text-xs text-brand-ink dark:text-zinc-200 font-medium">
                  {activeStep.output}
                </p>
              </div>
            </div>

            {/* Code / Artifact Live Preview Mockup */}
            <div className="bg-zinc-900 rounded-xl p-4 sm:p-5 border border-zinc-800 text-zinc-100 font-mono text-xs space-y-2 overflow-x-auto shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-1 text-zinc-300 font-semibold">{activeMockup.label}</span>
                </div>
                <span className="text-[10px] text-zinc-500">Live Execution Payload</span>
              </div>
              <pre className="text-zinc-300 leading-relaxed text-[11px] whitespace-pre-wrap">
                {activeMockup.code}
              </pre>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : LOOP_STEPS.length - 1))}
                className="px-4 py-2 rounded-full border border-brand-border dark:border-[#235A4A] bg-white dark:bg-white/10 hover:bg-brand-cream text-xs font-semibold text-brand-ink dark:text-brand-ivory transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
              >
                <ChevronLeft aria-hidden="true" className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
              <span className="text-xs font-mono text-brand-subtle dark:text-zinc-400">
                {activeStep.number} / {LOOP_STEPS.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveStepIndex((prev) => (prev < LOOP_STEPS.length - 1 ? prev + 1 : 0))}
                className="px-4 py-2 rounded-full bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark text-xs font-semibold text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
              >
                <span>Next Step</span>
                <ChevronRight aria-hidden="true" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 2. Full Connected Vertical Timeline */}
        <section aria-labelledby="vertical-timeline-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-brand-border dark:border-[#235A4A]">
            <div>
              <h2 id="vertical-timeline-heading" className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                2. Detailed Vertical Timeline &amp; Descriptions
              </h2>
              <p className="text-xs text-brand-muted dark:text-zinc-400 mt-0.5">
                Every step documented with inputs, outputs, latency SLAs, and governance boundaries.
              </p>
            </div>

            {/* Filter Toggle Buttons */}
            <div className="flex items-center gap-1 bg-brand-cream dark:bg-brand-forest-dark p-1 rounded-xl border border-brand-border dark:border-[#235A4A] shrink-0">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-white dark:bg-white/20 text-brand-forest dark:text-white shadow-2xs font-bold'
                    : 'text-brand-subtle hover:text-brand-forest dark:text-zinc-400'
                }`}
              >
                All 10 Steps
              </button>
              <button
                type="button"
                onClick={() => setFilter('ai')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  filter === 'ai'
                    ? 'bg-brand-forest text-white shadow-2xs font-bold'
                    : 'text-brand-subtle hover:text-brand-forest dark:text-zinc-400'
                }`}
              >
                <Bot aria-hidden="true" className="w-3.5 h-3.5 text-emerald-300" />
                <span>AI Steps (6)</span>
              </button>
              <button
                type="button"
                onClick={() => setFilter('human')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  filter === 'human'
                    ? 'bg-brand-coral text-white shadow-2xs font-bold'
                    : 'text-brand-subtle hover:text-brand-forest dark:text-zinc-400'
                }`}
              >
                <User aria-hidden="true" className="w-3.5 h-3.5" />
                <span>Human Steps (4)</span>
              </button>
            </div>
          </div>

          {/* Connected Timeline Track */}
          <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-brand-border dark:before:bg-[#235A4A]">
            {filteredSteps.map((step) => {
              const Icon = STEP_ICONS[step.iconName] || Sparkles;
              const isAI = step.actor === 'AI';
              const mockup = STEP_MOCKUPS[step.id];

              return (
                <article
                  key={step.id}
                  id={`step-${step.id}`}
                  className="relative scroll-mt-28"
                >
                  {/* Timeline Circular Step Marker */}
                  <div
                    className={`absolute -left-6 sm:-left-10 top-5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-white dark:border-brand-forest ${
                      isAI
                        ? 'bg-brand-forest text-white dark:bg-emerald-600'
                        : 'bg-brand-coral text-white'
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs">{step.number}</span>
                  </div>

                  {/* Step Card */}
                  <div
                    className={`bg-white dark:bg-brand-forest-dark/60 rounded-2xl border p-6 sm:p-7 shadow-xs space-y-4 hover:shadow-md transition-shadow ${
                      isAI
                        ? 'border-brand-forest/20 dark:border-emerald-500/30'
                        : 'border-brand-coral/30 dark:border-brand-coral/40'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border dark:border-[#235A4A]">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs ${
                            isAI ? 'bg-brand-forest dark:bg-emerald-600' : 'bg-brand-coral'
                          }`}
                        >
                          <Icon aria-hidden="true" className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-brand-subtle dark:text-zinc-400">
                            Step {step.number} of 10 · {step.role}
                          </div>
                          <h3 className="text-xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                            {step.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-full ${
                            isAI
                              ? 'bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-emerald-300'
                              : 'bg-brand-coral/10 text-brand-coral'
                          }`}
                        >
                          {isAI ? 'Autonomous AI' : 'Human Strategic'}
                        </span>
                        <span className="text-xs text-brand-subtle dark:text-zinc-400 font-mono">
                          {step.latency}
                        </span>
                      </div>
                    </div>

                    {/* Short Description Quote Callout */}
                    <div
                      className={`p-3.5 rounded-xl border-l-4 text-xs sm:text-sm font-semibold ${
                        isAI
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-brand-forest dark:border-emerald-500 text-brand-forest dark:text-emerald-200'
                          : 'bg-orange-50 dark:bg-orange-950/20 border-brand-coral text-orange-950 dark:text-orange-200'
                      }`}
                    >
                      <span className="font-bold">{step.name}: </span>
                      <span className="font-medium">{step.shortDescription || step.description}</span>
                    </div>

                    {/* Detailed Body */}
                    <p className="text-xs sm:text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Technical Contracts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-brand-cream dark:bg-white/5 rounded-xl p-3 space-y-1 border border-brand-border dark:border-[#235A4A]">
                        <span className="text-[9px] uppercase font-mono font-bold text-brand-subtle block">
                          Input Contract
                        </span>
                        <p className="text-brand-ink dark:text-brand-ivory text-xs font-sans">
                          {step.input}
                        </p>
                      </div>
                      <div className="bg-brand-cream dark:bg-white/5 rounded-xl p-3 space-y-1 border border-brand-border dark:border-[#235A4A]">
                        <span className="text-[9px] uppercase font-mono font-bold text-brand-subtle block">
                          Output Artifact
                        </span>
                        <p className="text-brand-ink dark:text-brand-ivory text-xs font-sans">
                          {step.output}
                        </p>
                      </div>
                    </div>

                    {/* Artifact Snippet */}
                    {mockup && (
                      <div className="bg-zinc-900 rounded-xl p-3.5 border border-zinc-800 text-zinc-100 font-mono text-[11px] space-y-1.5 overflow-x-auto shadow-inner">
                        <div className="flex items-center justify-between text-[10px] text-zinc-400">
                          <span>{mockup.label}</span>
                          <span className="text-zinc-500">Payload Preview</span>
                        </div>
                        <pre className="text-zinc-300 whitespace-pre-wrap">
                          {mockup.code}
                        </pre>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 3. Old Way vs The Markwise Loop Comparison */}
        <section aria-labelledby="loop-comparison-heading" className="space-y-4">
          <h2 id="loop-comparison-heading" className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
            3. Why The Loop Matters: Broken PDF Guidelines vs. Living Loop
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="bg-red-50/60 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-red-700 dark:text-red-400">
                <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center font-bold">✕</span>
                <span>The Broken Old Way (Static PDFs)</span>
              </div>
              <h3 className="text-lg font-bold font-serif text-brand-ink dark:text-brand-ivory">
                Disconnected, Amnesiac &amp; Manual
              </h3>
              <ul className="space-y-2 text-xs text-brand-muted dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Static 80-page brand books</strong> that creators rarely open or memorize.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Zero causal explanation:</strong> Reviewers leave vague comments like &quot;doesn&apos;t sound right&quot;.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Zero memory:</strong> When legal corrects copy, the exact same mistake repeats next month.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Staging drift:</strong> Approved drafts get silently altered in CMS before publication.</span>
                </li>
              </ul>
            </div>

            {/* The Markwise Way */}
            <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border-2 border-emerald-300 dark:border-emerald-800/60 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center font-bold">✓</span>
                <span>The Markwise Closed-Loop (Continuous Intelligence)</span>
              </div>
              <h3 className="text-lg font-bold font-serif text-brand-ink dark:text-brand-ivory">
                Causal, Self-Improving &amp; Cryptographically Sealed
              </h3>
              <ul className="space-y-2 text-xs text-brand-muted dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Executable YAML codices:</strong> Rules run live in milliseconds against every sentence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Causal citations:</strong> Every flag links to the statute, guideline, and Fact Vault anchor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Correction Memory:</strong> Accepted reviews train versioned rule improvements (e.g. v2.4).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Immutable SHA-256 seals:</strong> Live CMS sentinel alerts within milliseconds if text drifts.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Bottom Action CTA */}
        <section className="bg-white dark:bg-brand-forest-dark/80 rounded-2xl border border-brand-border dark:border-[#235A4A] p-8 sm:p-10 text-center space-y-4 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-brand-forest dark:text-brand-ivory">
            Ready to Deploy the 10-Step Loop to Your Brand?
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Test the interactive review cockpit, inspect live causal explainability, and experience how machine scanning and human governance unite.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark dark:hover:bg-brand-coral-hover rounded-full transition-all inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>Test Interactive Sandbox</span>
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/trust"
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-brand-forest dark:text-brand-ivory border border-brand-border-dark dark:border-[#235A4A] bg-white dark:bg-white/10 rounded-full hover:bg-white/80 transition-all cursor-pointer"
            >
              <span>Security &amp; Trust Center</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
