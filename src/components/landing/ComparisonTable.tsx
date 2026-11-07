'use client';

import { Check, X, Shield, Sparkles } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  generic: { ok: boolean; note: string };
  markwise: { ok: boolean; note: string };
}

const ROWS: ComparisonRow[] = [
  {
    feature: 'Flags Issues',
    generic: { ok: true, note: 'Basic keyword alerts & arbitrary confidence percentages' },
    markwise: { ok: true, note: 'Deterministic scans against 140+ active brand codex rules' },
  },
  {
    feature: 'Explains Why',
    generic: { ok: false, note: 'Black-box responses with no rule citations or statutory basis' },
    markwise: { ok: true, note: 'Causal reasoning citing exact rule clauses & legal standards (FTC, FDA)' },
  },
  {
    feature: 'Links Evidence',
    generic: { ok: false, note: 'Frequent hallucinations with zero verifiable proof anchors' },
    markwise: { ok: true, note: 'Fact Vault anchors every metric to unexpired audit reports & filings' },
  },
  {
    feature: 'Learns from Corrections',
    generic: { ok: false, note: 'Feedback lost in chat logs; zero organizational memory' },
    markwise: { ok: true, note: 'Human edits synthesize into versioned living rules (v1 → v2.4)' },
  },
  {
    feature: 'Audit Trail',
    generic: { ok: false, note: 'Untraceable prompts with no tamper protection or gatekeeping' },
    markwise: { ok: true, note: 'SHA-256 cryptographic seals, multi-tier approvals, and drift detection' },
  },
];

export function ComparisonTable() {
  return (
    <div className="w-full space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-brand-ivory border border-brand-forest/20 dark:border-white/20">
          <Shield aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
          <span>Competitive Differentiation</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-brand-ink dark:text-brand-ivory font-serif">
          Markwise vs. Generic AI
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-zinc-300 max-w-2xl mx-auto">
          Generic foundation models generate persuasive words. Markwise guarantees factual accuracy, legal defensibility, and continuous organizational learning.
        </p>
      </div>

      <div className="rounded-2xl border border-brand-border dark:border-[#235A4A] bg-white dark:bg-brand-forest/40 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-brand-border dark:border-[#235A4A] bg-brand-cream dark:bg-brand-forest-dark">
                <th className="py-4 px-5 text-xs font-bold text-brand-muted dark:text-zinc-300 uppercase tracking-wider w-2/5">
                  Governance Capability
                </th>
                <th className="py-4 px-5 text-xs font-bold text-brand-subtle dark:text-zinc-300 uppercase tracking-wider w-3/10 text-center">
                  Generic AI
                  <span className="block text-[10px] font-normal text-brand-subtle normal-case mt-0.5">
                    (ChatGPT, Copilot, Jasper)
                  </span>
                </th>
                <th className="py-4 px-5 text-xs font-bold text-brand-forest dark:text-emerald-300 uppercase tracking-wider w-3/10 text-center bg-brand-forest/10 dark:bg-brand-forest/70 border-l border-r border-brand-border-dark dark:border-[#235A4A]">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
                    <span>Markwise</span>
                  </div>
                  <span className="block text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-semibold normal-case mt-0.5">
                    Brand Governance System
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/80 dark:divide-[#235A4A]/60 text-xs sm:text-sm">
              {ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-brand-cream/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5 font-semibold text-brand-ink dark:text-brand-ivory">
                    <span className="block text-sm">{row.feature}</span>
                  </td>

                  <td className="py-4 px-5 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      {row.generic.ok ? (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800">
                          <Check aria-hidden="true" className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Yes</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-900">
                          <X aria-hidden="true" className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>No</span>
                        </div>
                      )}
                      <span className="text-[11px] text-brand-muted dark:text-zinc-300 max-w-[170px] leading-tight mt-0.5">
                        {row.generic.note}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-5 text-center bg-brand-forest/5 dark:bg-brand-forest/70 border-l border-r border-brand-border-dark dark:border-[#235A4A]">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-brand-forest-light dark:bg-emerald-600 text-white font-bold text-xs shadow-2xs">
                        <Check aria-hidden="true" className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Yes</span>
                      </div>
                      <span className="text-[11px] text-brand-forest-dark dark:text-emerald-200 font-medium max-w-[200px] leading-tight mt-0.5">
                        {row.markwise.note}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-brand-cream dark:bg-brand-forest-dark border-t border-brand-border dark:border-[#235A4A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted dark:text-zinc-300">
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
