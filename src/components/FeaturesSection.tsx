'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  GitBranch,
  Scale,
  Workflow,
  X,
  Check,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Clock,
  Lock,
  ExternalLink,
  Code2,
} from 'lucide-react';

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<number>(1); // Default to Tab 1 (02. Causal Explainability) or 0

  const features = [
    {
      id: 0,
      icon: FileCheck2,
      tag: '01. Evidence-Backed Claims Engine',
      tabTitle: 'Evidence-Backed Claims',
      title: 'Every assertion anchored to verified proof',
      description:
        'Never publish an unsubstantiated claim. Markwise connects numerical assertions, clinical statistics, and performance SLAs directly to your enterprise repository of audit reports, SEC filings, and clinical trial outcomes.',
      highlights: [
        'Deterministic citation anchors with page & section resolution',
        'Automatic staleness detection for expiring certifications',
        'Direct integration with Box, Google Drive, and Notion databases',
      ],
      badgeColor: 'border-[#174C3B]/20 text-[#174C3B] bg-[#174C3B]/5 dark:text-[#E5EEDC]',
    },
    {
      id: 1,
      icon: Scale,
      tag: '02. Causal Explainability',
      tabTitle: 'Causal Explainability',
      title: 'Clear clause citations, not black-box scores',
      description:
        'Generic AI tools give arbitrary percentages. Markwise breaks down every flagged issue using transparent legal reasoning, citing exact FTC guidelines, FDA SaMD rules, banking regulations, and your internal brand codex.',
      highlights: [
        'Plain-language risk justifications for creators and legal counsel',
        'Precise statutory & internal guideline citations',
        'Eliminates ambiguity in cross-functional creative debates',
      ],
      badgeColor: 'border-[#F47745]/20 text-[#F47745] bg-[#F47745]/5',
    },
    {
      id: 2,
      icon: GitBranch,
      tag: '03. Living, Versioned Rulebook',
      tabTitle: 'Living, Versioned Rulebook',
      title: 'Every human correction trains a better rule',
      description:
        'Brand guidelines are no longer static 80-page PDFs that collect dust. When legal or brand guardians edit a draft, Markwise synthesizes the correction into a versioned rule update (e.g. Rule v2.4) distributed across the org.',
      highlights: [
        'Git-style branch, merge, and rollback for company brand rules',
        'Changelog diffs showing the exact rationale behind every rule update',
        'Custom jurisdiction rules for EU AI Act, FTC, SEC, and HIPAA',
      ],
      badgeColor: 'border-[#174C3B]/20 text-[#174C3B] bg-[#174C3B]/5 dark:text-[#E5EEDC]',
    },
    {
      id: 3,
      icon: Workflow,
      tag: '04. Multi-Tier Enterprise Triage',
      tabTitle: 'Enterprise Triage',
      title: 'Automated routing for high-stakes approvals',
      description:
        'Low-risk copy clears autonomously in seconds. High-stakes claims (financial projections, health claims, global press releases) automatically trigger triage workflows routing to legal counsel and brand directors.',
      highlights: [
        'Role-based approval gates with cryptographic audit logs',
        'Direct CMS & social publishing integrations (Webflow, HubSpot, X)',
        'Tamper-proof signature verification preventing staging drift',
      ],
      badgeColor: 'border-[#F47745]/20 text-[#F47745] bg-[#F47745]/5',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#174C3B] dark:text-[#E5EEDC] mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#174C3B] dark:bg-[#E5EEDC]" />
            <span>Engineered for High-Stakes Enterprises</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#242820] dark:text-[#F7F2E8] font-inter">
            Guardrails that empower creative velocity.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#545B4E] dark:text-[#CBD5C0]">
            Brand compliance should never be an editorial bottleneck. Markwise gives marketing teams instant confidence and legal departments total traceability.
          </p>
        </div>

        {/* 1. Problem vs Solution Comparison Strip */}
        <div className="bg-[#FAF7F0] dark:bg-[#164638]/70 rounded-3xl border border-[#E8DFD0] dark:border-[#235A4A] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-[#C85A32] dark:text-[#F47745]">
              The Governance Paradigm Shift
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#123B2F] dark:text-[#F7F2E8] font-inter">
              Stop relying on static PDF guidelines that nobody reads.
            </h3>
            <p className="text-xs sm:text-sm text-[#545B4E] dark:text-[#CBD5C0]">
              Marketing moves at generative speed. Your brand rules need to be executable, observable, and linked to evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* The Old Way */}
            <div className="bg-white/80 dark:bg-black/20 rounded-2xl border border-rose-200 dark:border-rose-900/50 p-6 space-y-4 shadow-2xs">
              <div className="flex items-center gap-3 pb-3 border-b border-rose-100 dark:border-rose-950/60">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <X className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-rose-600 dark:text-rose-400 tracking-wider">
                    The Fragile Old Way
                  </span>
                  <h4 className="text-base font-bold text-[#242820] dark:text-[#F7F2E8]">
                    Static Brand PDFs &amp; Manual Email Chains
                  </h4>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#545B4E] dark:text-[#CBD5C0]">
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✕
                  </span>
                  <span><strong>80-page static PDFs</strong> gathering dust on intranet folders while creators guess</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✕
                  </span>
                  <span><strong>11-day legal review queues</strong> causing launch delays and missed market opportunities</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✕
                  </span>
                  <span><strong>Subjective &ldquo;gut feeling&rdquo; feedback</strong> without exact statutory or policy citations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✕
                  </span>
                  <span><strong>Stale claims &amp; unverified stats</strong> leaking into production marketing materials</span>
                </li>
              </ul>
            </div>

            {/* The Markwise Way */}
            <div className="bg-white/90 dark:bg-[#123B2F]/60 rounded-2xl border-2 border-emerald-500/40 dark:border-emerald-500/50 p-6 space-y-4 shadow-2xs relative">
              <span className="absolute -top-3 right-5 bg-emerald-700 text-white text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full shadow-2xs">
                Modern Standard
              </span>

              <div className="flex items-center gap-3 pb-3 border-b border-emerald-100 dark:border-emerald-950/60">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                    The Markwise Way
                  </span>
                  <h4 className="text-base font-bold text-[#123B2F] dark:text-[#F7F2E8]">
                    Living, Executable Brand Rulebook
                  </h4>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#242820] dark:text-[#E5EEDC]">
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✓
                  </span>
                  <span><strong>Sub-second automated scans</strong> checking draft copy in real time right in the editor</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✓
                  </span>
                  <span><strong>Causal explainability</strong>: transparent WHY, exact Rule ID, and regulatory clauses</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✓
                  </span>
                  <span><strong>Verified Fact Vault</strong> linking every metric to unexpired, certified audit evidence</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✓
                  </span>
                  <span><strong>Continuous learning</strong>: human edits automatically version company rules (v1 → v2.4)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2 & 3. Interactive Tabbed Interface with Live UI Mockup */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#174C3B] dark:text-[#E5EEDC]">
                Interactive Architecture Explorer
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#242820] dark:text-[#F7F2E8] font-inter">
                Explore the Four Pillars of Markwise
              </h3>
            </div>

            {/* Quick tab switcher pills */}
            <div className="flex items-center gap-1.5 bg-[#FAF7F0] dark:bg-[#164638] p-1 rounded-xl border border-[#E8DFD0] dark:border-[#235A4A] overflow-x-auto max-w-full">
              {features.map((feat) => (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => setActiveTab(feat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none ${
                    activeTab === feat.id
                      ? 'bg-[#123B2F] text-white dark:bg-white dark:text-[#123B2F] shadow-xs'
                      : 'text-[#545B4E] dark:text-[#CBD5C0] hover:text-[#123B2F] dark:hover:text-white'
                  }`}
                >
                  {feat.tag.split('.')[0]}. {feat.tabTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Split: Feature Info (Left) + Interactive UI Mockup (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Tab Selectors & Detailed Feature Context */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {features.map((feat) => {
                  const Icon = feat.icon;
                  const isActive = activeTab === feat.id;

                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => setActiveTab(feat.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none ${
                        isActive
                          ? 'bg-white dark:bg-[#164638] border-[#174C3B] dark:border-[#CBD5C0] shadow-md ring-2 ring-[#174C3B]/10 -translate-y-0.5'
                          : 'bg-[#FAF6EF]/60 dark:bg-white/5 border-[#E8DFD0] dark:border-[#235A4A] hover:bg-white hover:border-[#D5CDBD]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                              isActive
                                ? 'bg-[#123B2F] text-white dark:bg-white dark:text-[#123B2F]'
                                : 'bg-[#EAE5DA] text-[#545B4E] dark:bg-white/10 dark:text-[#CBD5C0]'
                            }`}
                          >
                            <Icon className="w-4 h-4 stroke-[2]" />
                          </div>
                          <span
                            className={`text-xs font-bold font-inter ${
                              isActive ? 'text-[#123B2F] dark:text-[#F7F2E8]' : 'text-[#545B4E] dark:text-[#CBD5C0]'
                            }`}
                          >
                            {feat.tag}
                          </span>
                        </div>

                        {isActive && (
                          <span className="text-[10px] font-mono text-[#F47745] font-bold">
                            Active Tab
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-[#242820] dark:text-[#F7F2E8] mb-1">
                        {feat.title}
                      </h4>

                      <p className="text-xs text-[#545B4E] dark:text-[#CBD5C0] line-clamp-2 leading-relaxed">
                        {feat.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Highlights Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#164638] border border-[#E8DFD0] dark:border-[#235A4A] space-y-2.5 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#174C3B] dark:text-[#E5EEDC] block">
                  Key Capabilities ({features[activeTab].tabTitle}):
                </span>
                <ul className="space-y-2">
                  {features[activeTab].highlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-[#242820] dark:text-[#E5EEDC]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Dynamic Live UI Mockup (Requirement 3: Causal Explainability Issue Card) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#164638] rounded-3xl border border-[#D5CDBD] dark:border-[#235A4A] shadow-xl overflow-hidden flex flex-col justify-between">
              {/* Window Title Bar */}
              <div className="bg-[#EFE9DE] dark:bg-[#103429] border-b border-[#D8CFC0] dark:border-[#235A4A] px-5 py-3 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ED6A5E] border border-[#D04E42]/60 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F] border border-[#D3A02C]/60 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#61C554] border border-[#48A33E]/60 inline-block" />
                  <span className="ml-2 text-xs font-mono font-medium text-[#5A6355] dark:text-[#CBD5C0]">
                    {activeTab === 0 && 'markwise://fact-vault/evidence-link'}
                    {activeTab === 1 && 'markwise://inspector/issue-explainability'}
                    {activeTab === 2 && 'markwise://rules/git-diff-v2.4'}
                    {activeTab === 3 && 'markwise://approval-matrix/cryptographic-lock'}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#123B2F] dark:text-[#E5EEDC] font-semibold bg-[#123B2F]/10 dark:bg-white/10 px-2 py-0.5 rounded">
                  Live UI Simulator
                </div>
              </div>

              {/* Dynamic Viewport according to active tab */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                {/* ============================================================== */}
                {/* TAB 1: 02. CAUSAL EXPLAINABILITY ISSUE CARD (SPECIFIC REQUIREMENT) */}
                {/* ============================================================== */}
                {activeTab === 1 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    {/* Simulated Editor Selection */}
                    <div className="p-3.5 rounded-xl bg-[#FAF7F0] dark:bg-white/5 border border-[#E8DFD0] dark:border-[#235A4A] text-xs leading-relaxed">
                      <span className="text-[#7A8274] font-mono text-[10px] block mb-1 uppercase font-bold">
                        Draft Content Under Evaluation
                      </span>
                      <p className="text-[#242820] dark:text-[#F7F2E8]">
                        &ldquo;With our enterprise release, our platform{' '}
                        <mark className="bg-[#FDE8E8] text-[#9B1C1C] px-1.5 py-0.5 rounded border border-[#F98080]/60 font-semibold inline-flex items-center gap-1">
                          <span>guarantees the fastest turnaround in the industry</span>
                          <AlertTriangle className="w-3 h-3 text-[#C53030]" />
                        </mark>{' '}
                        for all cross-border communications.&rdquo;
                      </p>
                    </div>

                    {/* The Explainable Issue Card */}
                    <div className="rounded-2xl border-2 border-[#E8DFD0] dark:border-[#235A4A] bg-white dark:bg-[#103429] p-5 shadow-sm space-y-4">
                      {/* Header with Severity & Rule */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#C53030] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            HIGH SEVERITY
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#7A8274] dark:text-[#CBD5C0]">
                            Score Impact: -15 pts
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-[#FAF6EF] dark:bg-white/10 px-2 py-0.5 rounded border border-[#E8DFD0] dark:border-[#235A4A]">
                          <span className="text-[9px] font-mono uppercase text-[#4B5563] dark:text-gray-300 font-bold">
                            RULE ID:
                          </span>
                          <span className="font-mono text-[10px] font-bold text-[#123B2F] dark:text-emerald-400">
                            BR-014 v1.2
                          </span>
                        </div>
                      </div>

                      {/* Issue Title */}
                      <h4 className="text-sm sm:text-base font-bold text-[#242820] dark:text-[#F7F2E8]">
                        Unsupported Superlative Performance Claim
                      </h4>

                      {/* WHY: Causal Reasoning Breakdown */}
                      <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E8DFD0] dark:border-[#235A4A] space-y-1">
                        <div className="text-[10px] font-mono font-bold text-[#4B5563] dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">
                          <Scale className="w-3 h-3 text-[#F47745]" />
                          <span>WHY IT WAS FLAGGED</span>
                        </div>
                        <p className="text-xs text-[#242820] dark:text-[#CBD5C0] leading-snug">
                          The phrase <em>&ldquo;guarantees the fastest&rdquo;</em> constitutes an absolute superlative claim with no linked evidence in the Fact Vault or accredited third-party benchmark study.
                        </p>
                      </div>

                      {/* STATUTORY & POLICY CITATION */}
                      <div className="flex items-center gap-2 text-[11px] text-[#242820] dark:text-[#CBD5C0]">
                        <span className="text-[9px] font-mono font-bold uppercase text-[#4B5563] dark:text-gray-300">
                          LEGAL CITATION:
                        </span>
                        <span className="font-mono text-[10px] bg-[#EAE5DA] dark:bg-white/10 px-2 py-0.5 rounded font-medium text-[#123B2F] dark:text-[#E5EEDC]">
                          FTC Act § 5 (Unsubstantiated Performance Claims) &amp; Brand Codex § 4.2
                        </span>
                      </div>

                      {/* SUGGESTED CONTEXT-AWARE FIX */}
                      <div className="p-3.5 rounded-xl bg-[#E5EEDC] dark:bg-emerald-950/40 border border-[#C5D6BB] dark:border-emerald-800 space-y-1.5">
                        <div className="text-[10px] font-mono font-bold text-[#1F3D2A] dark:text-emerald-300 uppercase flex items-center justify-between">
                          <span>SUGGESTED DEFENSIVE REWRITE</span>
                          <span className="text-[9px] text-[#3E5A44] dark:text-emerald-400">1-Click Apply</span>
                        </div>
                        <p className="text-xs text-[#1F3D2A] dark:text-emerald-200 font-semibold italic">
                          &ldquo;Designed for high-speed enterprise turnaround across primary regions.&rdquo;
                        </p>
                        <p className="text-[10px] text-[#3E5A44] dark:text-emerald-400/80">
                          Eliminates legal exposure while maintaining crisp commercial punch.
                        </p>
                      </div>

                      {/* Bottom Action Triggers */}
                      <div className="pt-1 flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#6B46C1] dark:text-purple-300 bg-[#EDE5F7] dark:bg-purple-950/60 px-2 py-0.5 rounded-full font-medium">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Gemini Multi-Layer Reasoning</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#123B2F] hover:bg-[#1A4C3E] dark:bg-[#F47745] dark:hover:bg-[#dc612e] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none"
                          >
                            <span>Apply Fix</span>
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* TAB 0: 01. EVIDENCE-BACKED CLAIMS ENGINE MOCKUP */}
                {/* ============================================================== */}
                {activeTab === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0] dark:border-[#235A4A]">
                      <span className="text-xs font-bold text-[#123B2F] dark:text-[#F7F2E8]">
                        Fact Vault Verification Inspector
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                        HASH ANCHORED
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E8DFD0] dark:border-[#235A4A] space-y-3">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-[#7A8274] uppercase">
                          Target Corporate Claim
                        </span>
                        <p className="text-sm font-bold text-[#242820] dark:text-[#F7F2E8] mt-0.5">
                          &ldquo;Target 99.9% Availability (Pilot Phase) across multi-tenant clusters&rdquo;
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-white dark:bg-[#103429] border border-[#E8DFD0] dark:border-[#235A4A] space-y-0.5">
                          <span className="text-[9px] font-mono text-[#7A8274] block">Evidence Document</span>
                          <span className="font-semibold text-[#123B2F] dark:text-[#E5EEDC] truncate block">
                            Engineering_SLA_Attestation_2025.pdf
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-[#103429] border border-[#E8DFD0] dark:border-[#235A4A] space-y-0.5">
                          <span className="text-[9px] font-mono text-[#7A8274] block">Citation Anchor</span>
                          <span className="font-semibold text-[#123B2F] dark:text-[#E5EEDC] block">
                            Page 14, Section 3.2
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-900 dark:text-emerald-200 font-medium">
                            Proof unexpired (Next audit: Oct 2026)
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-emerald-700 dark:text-emerald-300">
                          sha256:4a8b...99e1
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* TAB 2: 03. LIVING, VERSIONED RULEBOOK MOCKUP */}
                {/* ============================================================== */}
                {activeTab === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0] dark:border-[#235A4A]">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#123B2F] dark:text-[#E5EEDC]" />
                        <span className="text-xs font-bold text-[#123B2F] dark:text-[#F7F2E8]">
                          Rule Git Diff: BR-014 (Performance Statements)
                        </span>
                      </div>
                      <span className="font-mono text-[10px] bg-[#EAE5DA] dark:bg-white/10 text-[#123B2F] dark:text-white px-2 py-0.5 rounded font-bold">
                        v2.3 &rarr; v2.4 (Active)
                      </span>
                    </div>

                    <div className="rounded-xl bg-[#242820] text-[#F7F2E8] p-4 font-mono text-xs space-y-2 overflow-x-auto">
                      <div className="text-[10px] text-zinc-400">
                        @@ -14,6 +14,8 @@ rule_id: BR-014
                      </div>
                      <div className="text-rose-400 bg-rose-950/40 px-2 py-1 rounded">
                        - clause: &quot;Prohibits any assertion of speed superiority.&quot;
                      </div>
                      <div className="text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded">
                        + clause: &quot;Permits speed claims ONLY when accompanied by certified third-party benchmark citations.&quot;
                      </div>
                      <div className="text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded">
                        + required_evidence_tags: [&quot;audit_report&quot;, &quot;bench_v1&quot;]
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E8DFD0] dark:border-[#235A4A] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#123B2F] dark:text-[#F7F2E8] block">
                          Synthesized from 14 Reviewer Overrides
                        </span>
                        <span className="text-[10px] text-[#7A8274] dark:text-[#CBD5C0]">
                          Approved by Legal Counsel · Distributed across 8 Workspaces
                        </span>
                      </div>
                      <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-bold">
                        100% Traceable
                      </span>
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* TAB 3: 04. MULTI-TIER ENTERPRISE TRIAGE MOCKUP */}
                {/* ============================================================== */}
                {activeTab === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0] dark:border-[#235A4A]">
                      <span className="text-xs font-bold text-[#123B2F] dark:text-[#F7F2E8]">
                        Automated Governance Approval Matrix
                      </span>
                      <span className="text-[10px] font-mono text-[#F47745] font-bold bg-[#F47745]/10 px-2 py-0.5 rounded">
                        HIGH STAKES ROUTE
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-[#E8DFD0] dark:border-[#235A4A] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <div>
                            <span className="font-bold text-[#242820] dark:text-[#F7F2E8] block">
                              Tier 1: AI Autonomous Rule Scan
                            </span>
                            <span className="text-[10px] text-[#7A8274]">0 Violations Detected (1.2s)</span>
                          </div>
                        </div>
                        <span className="font-mono text-[9px] text-emerald-700 font-bold">PASSED</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-[#E8DFD0] dark:border-[#235A4A] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <div>
                            <span className="font-bold text-[#242820] dark:text-[#F7F2E8] block">
                              Tier 2: Brand Policy Steward
                            </span>
                            <span className="text-[10px] text-[#7A8274]">Editorial Voice &amp; Tone Signed Off</span>
                          </div>
                        </div>
                        <span className="font-mono text-[9px] text-emerald-700 font-bold">APPROVED</span>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF7F0] dark:bg-white/10 border-2 border-[#123B2F] dark:border-white/30 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <Lock className="w-4 h-4 text-[#123B2F] dark:text-[#E5EEDC]" />
                          <div>
                            <span className="font-bold text-[#123B2F] dark:text-[#F7F2E8] block">
                              Tier 3: General Counsel Cryptographic Seal
                            </span>
                            <span className="text-[10px] text-[#545B4E] dark:text-[#CBD5C0]">Immutable Token Issued</span>
                          </div>
                        </div>
                        <span className="font-mono text-[9px] bg-[#123B2F] text-white px-2 py-0.5 rounded font-bold">
                          SEALED
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mockup Footer Bar */}
              <div className="bg-[#FAF7F0] dark:bg-[#103429] border-t border-[#E8DFD0] dark:border-[#235A4A] px-6 py-3 flex items-center justify-between text-xs text-[#7A8274] dark:text-[#CBD5C0]">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Markwise Enterprise Verification Core</span>
                </span>
                <Link
                  href="/login"
                  className="font-semibold text-[#123B2F] dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Test with your copy &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
