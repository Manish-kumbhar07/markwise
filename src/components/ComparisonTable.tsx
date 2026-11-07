'use client';

import { Check, X, Shield, Sparkles } from 'lucide-react';

export function ComparisonTable() {
  const rows = [
    {
      feature: 'Flags Issues',
      genericAi: {
        supported: true,
        summary: 'Yes',
        detail: 'Basic keyword alerts & arbitrary confidence percentages',
      },
      markwise: {
        supported: true,
        summary: 'Yes',
        detail: 'Deterministic scans against 140+ active brand codex rules',
      },
    },
    {
      feature: 'Explains Why',
      genericAi: {
        supported: false,
        summary: 'No',
        detail: 'Black-box responses with no rule citations or statutory basis',
      },
      markwise: {
        supported: true,
        summary: 'Yes',
        detail: 'Causal reasoning citing exact rule clauses & legal standards (FTC, FDA)',
      },
    },
    {
      feature: 'Links Evidence',
      genericAi: {
        supported: false,
        summary: 'No',
        detail: 'Frequent hallucinations with zero verifiable proof anchors',
      },
      markwise: {
        supported: true,
        summary: 'Yes',
        detail: 'Fact Vault anchors every metric to unexpired audit reports & filings',
      },
    },
    {
      feature: 'Learns from Corrections',
      genericAi: {
        supported: false,
        summary: 'No',
        detail: 'Feedback is lost in session chat logs; zero organizational memory',
      },
      markwise: {
        supported: true,
        summary: 'Yes',
        detail: 'Human edits synthesize into versioned living rules (v1 → v2.4)',
      },
    },
    {
      feature: 'Audit Trail',
      genericAi: {
        supported: false,
        summary: 'No',
        detail: 'Untraceable prompts with no tamper protection or gatekeeping',
      },
      markwise: {
        supported: true,
        summary: 'Yes',
        detail: 'SHA-256 cryptographic seals, multi-tier approvals, and drift detection',
      },
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#174C3B]/10 dark:bg-white/10 text-[#174C3B] dark:text-[#E5EEDC] border border-[#174C3B]/20 dark:border-white/20">
          <Shield className="w-3.5 h-3.5 text-[#174C3B] dark:text-[#E5EEDC]" />
          <span>Competitive Differentiation</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#242820] dark:text-[#F7F2E8] font-inter">
          Markwise vs. Generic AI
        </h3>
        <p className="text-xs sm:text-sm text-[#545B4E] dark:text-[#CBD5C0] max-w-2xl mx-auto">
          Generic foundation models generate persuasive words. Markwise guarantees factual accuracy, legal defensibility, and continuous organizational learning.
        </p>
      </div>

      {/* Comparison Table Wrapper */}
      <div className="rounded-2xl border border-[#E8DFD0] dark:border-[#235A4A] bg-white dark:bg-[#164638] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-[#E8DFD0] dark:border-[#235A4A] bg-[#FAF8F5] dark:bg-[#103429]">
                <th className="py-4 px-5 text-xs font-bold text-[#545B4E] dark:text-[#CBD5C0] uppercase tracking-wider w-2/5">
                  Governance Capability
                </th>
                <th className="py-4 px-5 text-xs font-bold text-[#7A8274] dark:text-[#CBD5C0] uppercase tracking-wider w-3/10 text-center">
                  Generic AI
                  <span className="block text-[10px] font-normal text-[#8C9485] normal-case mt-0.5">
                    (ChatGPT, Copilot, Jasper)
                  </span>
                </th>
                <th className="py-4 px-5 text-xs font-bold text-[#123B2F] dark:text-emerald-300 uppercase tracking-wider w-3/10 text-center bg-[#E5EEDC]/40 dark:bg-[#123B2F]/60 border-l border-r border-[#C5D6BB] dark:border-[#235A4A] relative">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#F47745]" />
                    <span>Markwise</span>
                  </div>
                  <span className="block text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-semibold normal-case mt-0.5">
                    Brand Governance System
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD0]/80 dark:divide-[#235A4A]/60 text-xs sm:text-sm">
              {rows.map((row) => (
                <tr
                  key={row.feature}
                  className="hover:bg-[#FAF8F5]/60 dark:hover:bg-white/5 transition-colors"
                >
                  {/* Feature Name */}
                  <td className="py-4 px-5 font-semibold text-[#242820] dark:text-[#F7F2E8]">
                    <span className="block text-sm">{row.feature}</span>
                  </td>

                  {/* Generic AI Column */}
                  <td className="py-4 px-5 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      {row.genericAi.supported ? (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Yes</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-900">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>No</span>
                        </div>
                      )}
                      <span className="text-[11px] text-[#545B4E] dark:text-[#CBD5C0] max-w-[170px] leading-tight mt-0.5">
                        {row.genericAi.detail}
                      </span>
                    </div>
                  </td>

                  {/* Markwise Column (Subtle Forest Green Background) */}
                  <td className="py-4 px-5 text-center bg-[#E5EEDC]/40 dark:bg-[#123B2F]/60 border-l border-r border-[#C5D6BB] dark:border-[#235A4A]">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white font-bold text-xs shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Yes</span>
                      </div>
                      <span className="text-[11px] text-[#1F3D2A] dark:text-emerald-200 font-medium max-w-[200px] leading-tight mt-0.5">
                        {row.markwise.detail}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Banner */}
        <div className="p-4 bg-[#FAF8F5] dark:bg-[#103429] border-t border-[#E8DFD0] dark:border-[#235A4A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#545B4E] dark:text-[#CBD5C0]">
          <span className="font-medium text-center sm:text-left">
            Built for enterprise legal, communications, and brand stewardship teams.
          </span>
          <span className="text-emerald-700 dark:text-emerald-300 font-mono font-semibold text-[11px]">
            100% Causal Explainability
          </span>
        </div>
      </div>
    </div>
  );
}
