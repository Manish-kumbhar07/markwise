'use client';

import Link from 'next/link';
import {
  Shield,
  Lock,
  Database,
  Layers,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  EyeOff,
  Server,
  UserCheck,
} from 'lucide-react';

export default function TrustCenterPage() {
  const trustPillars = [
    {
      id: 'privacy',
      icon: Lock,
      title: 'Data Privacy',
      badge: 'Zero Persistent Copy',
      description:
        'Enterprise draft copy is inspected in volatile memory and discarded immediately following analysis. Markwise does not store raw customer copy unless explicitly committed to a workspace draft record by an authorized user.',
      points: [
        'TLS 1.3 encryption in transit with Perfect Forward Secrecy',
        'AES-256 encryption at rest for all database records and vault evidence',
        'Zero Data Retention (ZDR) architecture for all LLM inspection pipelines',
        'Role-Based Access Control (RBAC) governing workspace privileges',
      ],
    },
    {
      id: 'zero-training',
      icon: EyeOff,
      title: 'Zero LLM Training Guarantee',
      badge: 'Contractually Bound',
      description:
        'Your enterprise collateral, proprietary marketing guidelines, internal brand codices, and confidential disclosures are NEVER used to train, retune, or evaluate any artificial intelligence or foundation models.',
      points: [
        'API agreements with foundation model providers explicitly prohibit customer data usage for training',
        'Payloads are ephemeral: zero model fine-tuning, zero weight updates, zero public leakage',
        'Internal brand rules remain strictly isolated to your organization’s private workspace',
        'Clear data ownership: all brand rules and generated explanations belong 100% to your company',
      ],
    },
    {
      id: 'isolation',
      icon: Server,
      title: 'Workspace Isolation',
      badge: 'Tenant Multi-Tenancy',
      description:
        'Every workspace operates inside a logically and cryptographically partitioned container. Row-Level Security (RLS) is strictly enforced at the database tier, preventing any possibility of cross-tenant data access.',
      points: [
        'PostgreSQL Row-Level Security (RLS) enforcing tenant separation on every query',
        'Isolated rule namespaces: Rule BR-014 in Company A cannot intersect with Company B',
        'Audit-logged workspace switching with session validation and token expiry',
        'Dedicated team member provisioning with role-specific visibility',
      ],
    },
    {
      id: 'responsible-ai',
      icon: Sparkles,
      title: 'Responsible AI & Explainability',
      badge: 'Causal Reasoning',
      description:
        'We reject "black-box" AI confidence scores. Every issue flagged by Markwise must cite an approved rule ID, quote the offending clause, and link to evidence in your Fact Vault.',
      points: [
        'Deterministic rule attribution: every flag specifies Rule ID, version, and cited reason',
        'Human-in-the-loop requirement: AI flags and suggests, but only certified brand guardians can approve',
        'Hallucination prevention: numerical metrics must match active Fact Vault citations',
        'Immutable cryptographic audit trail for all approved and published assets',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F2E8] dark:bg-[#123B2F] text-[#242820] dark:text-[#F7F2E8] transition-colors duration-300 font-inter selection:bg-[#F47745]/20 selection:text-[#174C3B]">
      {/* Top Header Bar */}
      <header className="border-b border-[#E8DFD0] dark:border-[#235A4A] bg-[#FAF7F0]/80 dark:bg-[#164638]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#545B4E] dark:text-[#CBD5C0] hover:text-[#123B2F] dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-[#D5CDBD] dark:text-[#235A4A]">|</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#123B2F] dark:bg-white text-white dark:text-[#123B2F] flex items-center justify-center text-xs">
                ✦
              </div>
              <span className="font-serif font-bold text-sm tracking-tight text-[#123B2F] dark:text-[#F7F2E8]">
                Markwise Trust Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/how-it-works"
              className="text-xs font-semibold text-[#545B4E] dark:text-[#CBD5C0] hover:text-[#123B2F] dark:hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#123B2F] dark:bg-[#F47745] hover:bg-[#1A4C3E] dark:hover:bg-[#dc612e] rounded-full transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>Explore Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EEDC] dark:bg-white/10 text-[#123B2F] dark:text-[#E5EEDC] text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Enterprise Security &amp; Data Sovereignty</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-inter tracking-tight text-[#123B2F] dark:text-[#F7F2E8]">
            Markwise Trust Center
          </h1>
          <p className="text-base sm:text-lg text-[#545B4E] dark:text-[#CBD5C0] max-w-3xl leading-relaxed">
            Enterprise content governance demands absolute transparency. Here are the architectural guarantees, data privacy standards, and responsible AI safeguards that protect your brand.
          </p>
        </div>

        {/* Architectural Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white dark:bg-[#164638] rounded-2xl border border-[#E8DFD0] dark:border-[#235A4A] p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#edf4f1] dark:bg-white/10 text-[#174C3B] dark:text-[#E5EEDC] flex items-center justify-center">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#EAE5DA] dark:bg-white/10 text-[#5A6355] dark:text-[#CBD5C0] px-2 py-0.5 rounded">
                      {pillar.badge}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-[#242820] dark:text-[#F7F2E8]">
                    {pillar.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DFD0] dark:border-[#235A4A]/50 space-y-2">
                  {pillar.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2 text-xs text-[#242820] dark:text-[#E5EEDC]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Architecture Deep Dive */}
        <div className="bg-white dark:bg-[#164638] rounded-2xl border border-[#E8DFD0] dark:border-[#235A4A] p-7 sm:p-9 space-y-6 shadow-xs">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#242820] dark:text-[#F7F2E8]">
              Cryptographic Audit Trails &amp; Tamper Resistance
            </h3>
            <p className="text-sm text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
              When content receives final sign-off, Markwise issues a deterministic SHA-256 verification hash encoding the approved copy, the versioned rule snapshot, and the approver identity. Any post-publish staging drift is detected within milliseconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E8DFD0] dark:border-[#235A4A] space-y-1">
              <span className="font-bold text-[#123B2F] dark:text-[#F7F2E8] block">
                1. Rule Hash Locking
              </span>
              <p className="text-[#545B4E] dark:text-[#CBD5C0]">
                Rules are anchored to an exact Git-like version hash (e.g. `BR-014 v1.2`).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E8DFD0] dark:border-[#235A4A] space-y-1">
              <span className="font-bold text-[#123B2F] dark:text-[#F7F2E8] block">
                2. Evidence Verification
              </span>
              <p className="text-[#545B4E] dark:text-[#CBD5C0]">
                Metrics cross-check against unexpired Fact Vault entries with verified citations.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E8DFD0] dark:border-[#235A4A] space-y-1">
              <span className="font-bold text-[#123B2F] dark:text-[#F7F2E8] block">
                3. Immutable Sign-Off
              </span>
              <p className="text-[#545B4E] dark:text-[#CBD5C0]">
                Every approval event logs timestamp, user ID, and sign-off rationale.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Footer Box */}
        <div className="bg-[#FAF7F0] dark:bg-[#123B2F]/60 rounded-2xl border border-[#D5CDBD] dark:border-[#235A4A] p-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#123B2F] dark:text-[#F7F2E8]">
            Ready to test our security architecture?
          </h3>
          <p className="text-sm text-[#545B4E] dark:text-[#CBD5C0] max-w-xl mx-auto">
            Experience our isolated workspace sandbox, review the living rule engine, and see how causal explainability protects your enterprise.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#123B2F] dark:bg-[#F47745] hover:bg-[#1A4C3E] dark:hover:bg-[#dc612e] rounded-full transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Launch Free Pilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/docs"
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#123B2F] dark:text-[#F7F2E8] border border-[#D5CDBD] dark:border-[#235A4A] bg-white dark:bg-white/10 rounded-full hover:bg-white/80 transition-all cursor-pointer"
            >
              <span>Architecture Docs</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
