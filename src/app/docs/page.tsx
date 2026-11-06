'use client';

import Link from 'next/link';
import {
  Shield,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  FileCode2,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#F7F2E8] dark:bg-[#123B2F] text-[#242820] dark:text-[#F7F2E8] transition-colors duration-300 font-inter selection:bg-[#F47745]/20 selection:text-[#174C3B]">
      {/* Top Docs Header */}
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
                Markwise Documentation
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#123B2F] dark:bg-[#F47745] hover:bg-[#1A4C3E] dark:hover:bg-[#dc612e] rounded-full transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>Try Live Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Docs Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EEDC] dark:bg-white/10 text-[#123B2F] dark:text-[#E5EEDC] text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Developer & Governance Codex</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#123B2F] dark:text-[#F7F2E8] font-serif leading-[1.12]">
            Brand Governance Infrastructure & Documentation
          </h1>

          <p className="text-[#545B4E] dark:text-[#CBD5C0] text-base sm:text-lg max-w-3xl leading-relaxed">
            Markwise bridges creative marketing workflows and legal-regulatory codices. Learn how deterministic evidence anchors, AI-assisted rule enforcement, and versioned rule synthesis work.
          </p>
        </div>

        {/* Section 1: The Markwise Loop */}
        <section className="bg-[#FAF7F0] dark:bg-[#164638] rounded-2xl border border-[#E8DFD0] dark:border-[#235A4A] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#123B2F] dark:text-[#E5EEDC]">
            <Cpu className="w-5 h-5 text-[#F47745]" />
            <h2 className="text-xl font-bold font-serif">1. The Verification Architecture</h2>
          </div>
          <p className="text-sm text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
            Every submission undergoes multi-stage continuous governance before publication:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white dark:bg-[#123B2F] border border-[#E8DFD0] dark:border-[#235A4A] space-y-2">
              <span className="font-mono text-xs font-bold text-[#F47745]">PHASE 01</span>
              <h4 className="text-sm font-bold">Content Ingestion</h4>
              <p className="text-xs text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
                Raw marketing drafts, ad copy, or press releases are parsed and sanitized with strict length constraints (&le; 5,000 chars).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#123B2F] border border-[#E8DFD0] dark:border-[#235A4A] space-y-2">
              <span className="font-mono text-xs font-bold text-[#F47745]">PHASE 02</span>
              <h4 className="text-sm font-bold">AI Audit & Evidence Matching</h4>
              <p className="text-xs text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
                Gemini reviews statements against active organization rules, linking each claim directly to approved Fact Vault evidence anchors.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#123B2F] border border-[#E8DFD0] dark:border-[#235A4A] space-y-2">
              <span className="font-mono text-xs font-bold text-[#F47745]">PHASE 03</span>
              <h4 className="text-sm font-bold">One-Click Remediation</h4>
              <p className="text-xs text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
                Creators accept compliant rewrites or dismiss flags with auditable rationales that update the versioned brand rulebook.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Rule Engine */}
        <section className="bg-[#FAF7F0] dark:bg-[#164638] rounded-2xl border border-[#E8DFD0] dark:border-[#235A4A] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#123B2F] dark:text-[#E5EEDC]">
            <FileCode2 className="w-5 h-5 text-[#F47745]" />
            <h2 className="text-xl font-bold font-serif">2. Brand Brain: Rule Specifications</h2>
          </div>
          <p className="text-sm text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
            Rules are stored in PostgreSQL via Prisma with immutable version tracking. Each rule belongs to one of three primary classifications:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#545B4E] dark:text-[#CBD5C0]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Terminology Rules:</strong> Restricts unapproved jargon, forbidden superlatives (&quot;fastest&quot;, &quot;guaranteed&quot;), and trademark misspellings.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Compliance & Legal Rules:</strong> Enforces mandatory disclosures, FTC testimonial disclaimers, FDA medical device boundaries, and SOC 2 data privacy claims.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Voice & Tone Rules:</strong> Evaluates copy posture, clarity, sentiment, and reading comprehension levels for executive communication.</span>
            </li>
          </ul>
        </section>

        {/* Section 3: REST API & Webhooks */}
        <section className="bg-[#FAF7F0] dark:bg-[#164638] rounded-2xl border border-[#E8DFD0] dark:border-[#235A4A] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#123B2F] dark:text-[#E5EEDC]">
            <Layers className="w-5 h-5 text-[#F47745]" />
            <h2 className="text-xl font-bold font-serif">3. API Reference Endpoint Summary</h2>
          </div>
          <div className="overflow-x-auto text-xs font-mono">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#E8DFD0] dark:border-[#235A4A] text-left text-[#123B2F] dark:text-white">
                  <th className="py-2.5 pr-4">Method</th>
                  <th className="py-2.5 pr-4">Endpoint</th>
                  <th className="py-2.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFD0]/60 dark:divide-[#235A4A]/60">
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-emerald-700 dark:text-emerald-400">POST</td>
                  <td className="py-2.5 pr-4">/api/review/run</td>
                  <td className="py-2.5 text-[#545B4E] dark:text-[#CBD5C0]">Dispatches draft to Gemini engine and persists detected issues.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-blue-700 dark:text-blue-400">GET</td>
                  <td className="py-2.5 pr-4">/api/rules</td>
                  <td className="py-2.5 text-[#545B4E] dark:text-[#CBD5C0]">Retrieves active organization rules with version timestamps.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-emerald-700 dark:text-emerald-400">POST</td>
                  <td className="py-2.5 pr-4">/api/rules/from-issue</td>
                  <td className="py-2.5 text-[#545B4E] dark:text-[#CBD5C0]">Codifies a human correction into a newly versioned rule.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Card */}
        <div className="p-8 rounded-2xl bg-[#123B2F] dark:bg-[#0E3026] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl font-bold font-serif">Ready to test the live platform?</h3>
            <p className="text-xs sm:text-sm text-[#E5EEDC]">
              Access the live review studio, verify sample copy, and inspect the continuous governance telemetry.
            </p>
          </div>
          <Link
            href="/login"
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#123B2F] bg-[#F7F2E8] hover:bg-white rounded-full transition-all shrink-0 inline-flex items-center gap-2 shadow-sm"
          >
            <span>Launch Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

