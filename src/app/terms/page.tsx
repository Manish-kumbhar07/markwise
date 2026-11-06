'use client';

import Link from '@/lib/next-link';
import { Shield, ArrowLeft, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F7F2E8] dark:bg-[#123B2F] text-[#242820] dark:text-[#F7F2E8] py-12 px-4 sm:px-6 lg:px-8 font-inter transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#174C3B] dark:text-[#F47745] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#174C3B]/10 dark:bg-[#174C3B]/30 text-[#174C3B] dark:text-[#F7F2E8]">
            <Scale className="w-3.5 h-3.5 text-[#F47745]" />
            Enterprise Terms & Conditions
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-[#E8DFD0] dark:border-[#205243] pb-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#174C3B] dark:text-[#F7F2E8]">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-[#545B4E] dark:text-[#C5CEBC]">
            Effective Date: November 2026 · Markwise Brand Governance Platform
          </p>
        </div>

        {/* AI Disclaimer Box */}
        <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-xs text-orange-900 dark:text-orange-200 space-y-1">
          <p className="font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#F47745]" />
            AI-Assisted Guidance — Not Legal Advice
          </p>
          <p>
            Markwise provides automated brand guideline analysis and compliance suggestions powered by artificial intelligence. Output does not constitute formal legal counsel or statutory legal certification. Organizations remain solely responsible for published statements.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-[#FFFCF6] dark:bg-[#164336] border border-[#E8DFD0] dark:border-[#205243] rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#545B4E] dark:text-[#D1D9CB] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#242820] dark:text-[#F7F2E8] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#174C3B] dark:text-[#F47745]" />
              1. Platform Purpose & Scope
            </h2>
            <p>
              Markwise is designed to assist corporate communication, marketing, and legal teams in reviewing marketing materials against pre-configured rules and verified factual evidence before external distribution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#242820] dark:text-[#F7F2E8] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#174C3B] dark:text-[#F47745]" />
              2. Acceptable Use Policy
            </h2>
            <p>
              Users agree not to input classified national security materials, malicious payloads, or unlawful content into the service. Submissions must adhere to applicable regulatory frameworks and enterprise acceptable use standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#242820] dark:text-[#F7F2E8] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#174C3B] dark:text-[#F47745]" />
              3. Limitation of Liability
            </h2>
            <p>
              In no event shall Markwise Technologies Inc. or its maintainers be liable for any indirect, punitive, or consequential damages resulting from marketing publications, regulatory fines, or reliance upon automated suggestions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
