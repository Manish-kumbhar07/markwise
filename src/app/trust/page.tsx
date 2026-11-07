'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  EyeOff,
  Server,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Check,
  ChevronRight,
  ShieldCheck,
  Database,
  UserCheck,
  Hash,
} from 'lucide-react';

const SECTIONS = [
  { id: 'data-privacy', title: 'Data Privacy & Supabase Isolation', icon: Database },
  { id: 'zero-training', title: 'Zero LLM Training Guarantee', icon: EyeOff },
  { id: 'responsible-ai', title: 'Responsible AI & Human Approval', icon: UserCheck },
  { id: 'audit-trails', title: 'SHA-256 Audit Trails & Seals', icon: Hash },
  { id: 'soc2-roadmap', title: 'SOC 2 Compliance Roadmap', icon: ShieldCheck },
];

export default function TrustCenterPage() {
  const [activeSection, setActiveSection] = useState('data-privacy');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                <Shield aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
              </div>
              <span className="font-serif font-bold text-sm tracking-tight text-brand-forest dark:text-brand-ivory">
                Trust Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/how-it-works"
              className="text-xs font-semibold text-brand-muted dark:text-zinc-300 hover:text-brand-forest dark:hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark dark:hover:bg-brand-coral-hover rounded-full transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none"
            >
              <span>Explore Sandbox</span>
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Document Layout: Left Sidebar + Document Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Document Navigation Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white dark:bg-brand-forest-dark/70 rounded-2xl border border-brand-border dark:border-[#235A4A] p-5 shadow-xs space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-coral block">
                  Security Architecture
                </span>
                <h2 className="text-base font-bold text-brand-ink dark:text-brand-ivory font-serif">
                  Document Navigation
                </h2>
                <p className="text-xs text-brand-muted dark:text-zinc-400">
                  Architectural guarantees, data privacy standards, and responsible AI safeguards.
                </p>
              </div>

              <nav aria-label="Trust Center Sections" className="space-y-1 pt-2 border-t border-brand-border dark:border-[#235A4A]/60">
                {SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-brand-forest text-white font-semibold shadow-xs'
                          : 'text-brand-muted dark:text-zinc-300 hover:bg-brand-cream dark:hover:bg-white/10 hover:text-brand-forest'
                      }`}
                    >
                      <Icon aria-hidden="true" className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-brand-coral' : ''}`} />
                      <span className="truncate">{sec.title}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="p-3.5 rounded-xl bg-brand-cream dark:bg-white/5 border border-brand-border dark:border-[#235A4A] space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-brand-forest dark:text-emerald-300 font-bold text-[11px]">
                  <ShieldCheck aria-hidden="true" className="w-4 h-4 text-emerald-600" />
                  <span>Enterprise Security Assurance</span>
                </div>
                <p className="text-[11px] text-brand-muted dark:text-zinc-400 leading-relaxed">
                  Need custom Data Processing Agreements (DPA), Business Associate Agreements (BAA), or private VPC isolation?
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-forest dark:text-emerald-300 hover:text-brand-coral"
                >
                  <span>Request Security Whitepaper</span>
                  <ChevronRight aria-hidden="true" className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Column: Editorial Document Content */}
          <main className="lg:col-span-8 space-y-12">
            {/* Header / Document Overview */}
            <div className="space-y-4 pb-8 border-b border-brand-border dark:border-[#235A4A]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-brand-ivory text-xs font-semibold uppercase tracking-wider">
                <Shield aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
                <span>Enterprise Security &amp; Data Sovereignty</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-brand-forest dark:text-brand-ivory">
                Trust Center
              </h1>
              <p className="text-base sm:text-lg text-brand-muted dark:text-zinc-300 leading-relaxed">
                Enterprise content governance demands absolute transparency. Here are the architectural guarantees, database isolation models, and responsible AI safeguards that protect your brand.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-brand-subtle dark:text-zinc-400 pt-2 font-mono">
                <span>Specification: 2026.4</span>
                <span aria-hidden="true">·</span>
                <span>Audience: Legal, Compliance, Infosec</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Production Verified</span>
              </div>
            </div>

            {/* Section 1: Data Privacy & Supabase Isolation */}
            <section id="data-privacy" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <Database aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>01. Multi-Tenant Architecture</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                Data Privacy &amp; Workspace Isolation via Supabase
              </h2>
              <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                Every organization operating on Markwise is partitioned into an isolated tenant container powered by <strong>Supabase and PostgreSQL Row-Level Security (RLS)</strong>. Under no circumstances can data from Workspace A bleed into, or be queried by, Workspace B.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-brand-forest-dark/50 p-4.5 rounded-xl border border-brand-border dark:border-[#235A4A] space-y-2">
                  <span className="font-bold text-xs text-brand-forest dark:text-brand-ivory block">
                    PostgreSQL Row-Level Security (RLS)
                  </span>
                  <p className="text-xs text-brand-muted dark:text-zinc-400 leading-relaxed">
                    Policies are enforced directly at the SQL database engine tier using authenticated JWT claims (`auth.uid()` and `workspace_id`). No API vulnerability or query bug can bypass RLS boundaries.
                  </p>
                </div>
                <div className="bg-white dark:bg-brand-forest-dark/50 p-4.5 rounded-xl border border-brand-border dark:border-[#235A4A] space-y-2">
                  <span className="font-bold text-xs text-brand-forest dark:text-brand-ivory block">
                    Ephemeral Volatile Memory Scans
                  </span>
                  <p className="text-xs text-brand-muted dark:text-zinc-400 leading-relaxed">
                    Interactive draft content is analyzed exclusively in volatile worker memory and discarded immediately following rule evaluation. Markwise never caches raw draft copy to secondary disk.
                  </p>
                </div>
                <div className="bg-white dark:bg-brand-forest-dark/50 p-4.5 rounded-xl border border-brand-border dark:border-[#235A4A] space-y-2">
                  <span className="font-bold text-xs text-brand-forest dark:text-brand-ivory block">
                    Encryption Standards
                  </span>
                  <p className="text-xs text-brand-muted dark:text-zinc-400 leading-relaxed">
                    All network traffic is enforced via TLS 1.3 with Perfect Forward Secrecy. Database records, Fact Vault documents, and rule embeddings are encrypted at rest with AES-256.
                  </p>
                </div>
                <div className="bg-white dark:bg-brand-forest-dark/50 p-4.5 rounded-xl border border-brand-border dark:border-[#235A4A] space-y-2">
                  <span className="font-bold text-xs text-brand-forest dark:text-brand-ivory block">
                    Workspace-Scoped Token Expiry
                  </span>
                  <p className="text-xs text-brand-muted dark:text-zinc-400 leading-relaxed">
                    Sessions auto-expire and enforce granular Role-Based Access Control (RBAC): separating Creators, Stewards, Legal Approvers, and Workspace Admins.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Zero LLM Training Guarantee */}
            <section id="zero-training" className="scroll-mt-24 space-y-6 pt-6 border-t border-brand-border dark:border-[#235A4A]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <EyeOff aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>02. Model Governance &amp; IP Protection</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                Zero LLM Training Guarantee
              </h2>
              <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                Markwise uses the <strong>Google Gemini API in strict stateless mode</strong>. Your enterprise collateral, internal policy guidelines, confidential disclosures, and reviewer corrections are <strong>NEVER used to train, retune, or evaluate any foundation models</strong>.
              </p>

              <div className="bg-brand-cream dark:bg-brand-forest-dark/60 rounded-2xl border-2 border-emerald-600/30 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-emerald-600" />
                  <span>Stateless Gemini API Inference Architecture</span>
                </div>
                <ul className="space-y-2 text-xs text-brand-muted dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Stateless Inference:</strong> Requests are processed in ephemeral memory. No prompts, candidate outputs, or embeddings are retained on Google servers after response completion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No Model Retraining:</strong> Enterprise data is legally and technically excluded from foundation model training datasets, weights modification, or global fine-tuning.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Customer IP Ownership:</strong> Your brand codices, Fact Vault benchmarks, and synthesized living rules remain 100% proprietary to your enterprise.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: Responsible AI & Human Approval */}
            <section id="responsible-ai" className="scroll-mt-24 space-y-6 pt-6 border-t border-brand-border dark:border-[#235A4A]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <UserCheck aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>03. Algorithmic Gatekeeping</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                Responsible AI &amp; Mandatory Human Approval
              </h2>
              <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                Markwise is architected on a fundamental principle: <strong>the AI assists and flags, but human approval is strictly enforced before publishing</strong>. Content cannot bypass human gatekeepers into public channels.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4.5 rounded-xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-1.5">
                  <span className="font-bold text-brand-forest dark:text-brand-ivory block">
                    Causal Reasoning
                  </span>
                  <p className="text-brand-muted dark:text-zinc-400">
                    No black-box probability scores. Every flag quotes the offending text, cites the exact Rule ID, and explains the statutory or brand rationale.
                  </p>
                </div>
                <div className="p-4.5 rounded-xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-1.5">
                  <span className="font-bold text-brand-forest dark:text-brand-ivory block">
                    Fact Vault Proof Anchors
                  </span>
                  <p className="text-brand-muted dark:text-zinc-400">
                    Numerical assertions and superlatives must anchor to unexpired evidence documents (e.g. SEC filings, clinical reports).
                  </p>
                </div>
                <div className="p-4.5 rounded-xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-1.5">
                  <span className="font-bold text-brand-forest dark:text-brand-ivory block">
                    Strict Publishing Gate
                  </span>
                  <p className="text-brand-muted dark:text-zinc-400">
                    High-stakes collateral requires multi-tier cryptographic sign-offs from certified Brand Stewards and Legal Counsel.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Audit Trails & SHA-256 Seals */}
            <section id="audit-trails" className="scroll-mt-24 space-y-6 pt-6 border-t border-brand-border dark:border-[#235A4A]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <Hash aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>04. Cryptographic Provenance</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                SHA-256 Cryptographic Seals &amp; Versioned Rules
              </h2>
              <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                When an asset clears review and receives final approval, Markwise generates an immutable <strong>SHA-256 cryptographic seal</strong> binding the approved copy, the active rule version, and the reviewer credentials into a tamper-evident audit record.
              </p>

              <div className="bg-white dark:bg-brand-forest-dark/60 rounded-2xl border border-brand-border dark:border-[#235A4A] p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-brand-coral font-bold uppercase tracking-wider">
                    How Cryptographic Proof Operates
                  </span>
                  <h3 className="text-base font-bold text-brand-ink dark:text-brand-ivory font-serif">
                    End-to-End Verification Pipeline
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-brand-cream dark:bg-white/5 border border-brand-border dark:border-[#235A4A] space-y-1">
                    <span className="font-bold text-brand-forest dark:text-emerald-300 block">
                      1. Rule Version Snapshot
                    </span>
                    <p className="text-brand-muted dark:text-zinc-400">
                      Rules are anchored to an exact Git-like version hash (e.g. `BR-014 v2.4`). Edits create a new semantic version.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-brand-cream dark:bg-white/5 border border-brand-border dark:border-[#235A4A] space-y-1">
                    <span className="font-bold text-brand-forest dark:text-emerald-300 block">
                      2. SHA-256 Digest
                    </span>
                    <p className="text-brand-muted dark:text-zinc-400">
                      Generates a cryptographic digest of text + cited evidence + rule set + approver token.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-brand-cream dark:bg-white/5 border border-brand-border dark:border-[#235A4A] space-y-1">
                    <span className="font-bold text-brand-forest dark:text-emerald-300 block">
                      3. Staging Drift Detection
                    </span>
                    <p className="text-brand-muted dark:text-zinc-400">
                      CMS webhooks verify live URLs against the cryptographic seal, alerting within milliseconds if copy is altered post-signoff.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: SOC 2 Compliance Roadmap */}
            <section id="soc2-roadmap" className="scroll-mt-24 space-y-6 pt-6 border-t border-brand-border dark:border-[#235A4A]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <ShieldCheck aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>05. Compliance Roadmap</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                SOC 2 Compliance Roadmap
              </h2>
              <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                Markwise is engineered from ground zero following the AICPA Trust Services Criteria (Security, Availability, Confidentiality). Here is our transparent roadmap:
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-forest dark:text-emerald-300 font-mono">Phase 1: Architecture Alignment &amp; Security Controls</span>
                    <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">COMPLETE</span>
                  </div>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    Infrastructure-as-Code with automated vulnerability scans, mandatory MFA, least-privilege IAM, and cryptographic audit logging.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-forest dark:text-emerald-300 font-mono">Phase 2: SOC 2 Type I Readiness (Q2 2026)</span>
                    <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded text-[10px]">IN PROGRESS</span>
                  </div>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    Independent third-party readiness audit of internal controls, policies, and tenant isolation boundaries.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-forest dark:text-emerald-300 font-mono">Phase 3: SOC 2 Type II Observation (Q4 2026)</span>
                    <span className="bg-brand-cream dark:bg-white/10 text-brand-muted dark:text-zinc-400 font-bold px-2 py-0.5 rounded text-[10px]">SCHEDULED</span>
                  </div>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    6-month observation period validating continuous operational effectiveness across production environments.
                  </p>
                </div>
              </div>
            </section>

            {/* Bottom CTA */}
            <div className="bg-brand-cream dark:bg-brand-forest-dark rounded-2xl border border-brand-border dark:border-[#235A4A] p-8 text-center space-y-4">
              <h3 className="text-xl font-bold font-serif text-brand-forest dark:text-brand-ivory">
                Experience Enterprise Brand Governance
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted dark:text-zinc-300 max-w-lg mx-auto">
                Test the isolated sandbox, explore the deterministic rule engine, and see how causal explainability protects your brand.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark dark:hover:bg-brand-coral-hover rounded-full transition-all inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Launch Free Sandbox</span>
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-brand-forest dark:text-brand-ivory border border-brand-border-dark dark:border-[#235A4A] bg-white dark:bg-white/10 rounded-full hover:bg-white/80 transition-all cursor-pointer"
                >
                  <span>The 10-Step Loop</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
