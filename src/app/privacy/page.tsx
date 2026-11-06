'use client';

import Link from '@/lib/next-link';
import { Shield, ArrowLeft, Lock, Database, EyeOff, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <Shield className="w-3.5 h-3.5 text-[#F47745]" />
            Privacy & Trust Architecture
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-[#E8DFD0] dark:border-[#205243] pb-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#174C3B] dark:text-[#F7F2E8]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#545B4E] dark:text-[#C5CEBC]">
            Effective Date: November 2026 · Markwise Brand Governance Platform
          </p>
        </div>

        {/* Hackathon Disclaimer Card */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
          <p className="font-semibold flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Project & Demonstration Notice
          </p>
          <p>
            Markwise is an AI-assisted brand governance demonstration system. While built with enterprise security controls, multi-tenant isolation, and encryption in transit, this instance operates under prototype terms.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-[#FFFCF6] dark:bg-[#164336] border border-[#E8DFD0] dark:border-[#205243] rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#545B4E] dark:text-[#D1D9CB] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#242820] dark:text-[#F7F2E8] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#F47745]" />
              1. Information We Collect
            </h2>
            <p>
              We collect information necessary to deliver automated brand governance and content compliance services:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account Credentials:</strong> Email address and authentication tokens via Supabase Auth.</li>
              <li><strong>Content Drafts:</strong> Text submissions uploaded or pasted into the Review interface for compliance verification.</li>
              <li><strong>Brand Policies & Evidence:</strong> Custom brand rules, guidelines, and Fact Vault claims stored in your tenant workspace.</li>
              <li><strong>Telemetry & Usage Logs:</strong> Aggregate metric counts (issue severities, resolution rates) stored in PostgreSQL via Prisma.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#242820] dark:text-[#F7F2E8] flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-[#F47745]" />
              2. How Your Data is Used
            </h2>
            <p>
              Data submitted to Markwise is processed solely to perform policy evaluation:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Draft text and active policy rules are transmitted via encrypted server-side channels to Google Gemini API models for reasoning and suggestion extraction.</li>
              <li>Customer content is <strong>not</strong> used to train foundational AI models.</li>
              <li>Workspace data is isolated using tenant ID constraints at the database row level.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#242820] dark:text-[#F7F2E8] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#F47745]" />
              3. Data Security & Storage
            </h2>
            <p>
              All communication between your browser, the application server, and Supabase / Google Gemini APIs uses HTTPS with TLS 1.3 encryption. Secret keys and credentials are strictly isolated to server runtimes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#242820] dark:text-[#F7F2E8] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F47745]" />
              4. Contact
            </h2>
            <p>
              For security or data privacy inquiries regarding Markwise, contact our compliance engineering team at <span className="font-mono text-[#174C3B] dark:text-[#F47745]">compliance@markwise.ai</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
