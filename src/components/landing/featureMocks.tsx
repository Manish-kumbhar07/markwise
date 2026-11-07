import React from 'react';
import { AlertTriangle, Check, CheckCircle2, Code2, Lock, Scale, Sparkles } from 'lucide-react';

export function FeatureMockRenderer({ activeTab }: { activeTab: number }) {
  if (activeTab === 0) {
    return (
      <div className="space-y-4 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-brand-border dark:border-[#235A4A]">
          <span className="text-xs font-bold text-brand-forest dark:text-brand-ivory">
            Fact Vault Verification Inspector
          </span>
          <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
            HASH ANCHORED
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-brand-ivory-light dark:bg-white/5 border border-brand-border dark:border-[#235A4A] space-y-3 text-xs">
          <div>
            <span className="text-[9px] font-mono font-bold text-brand-muted uppercase">Target Claim</span>
            <p className="text-sm font-bold text-brand-ink dark:text-brand-ivory mt-0.5">
              &ldquo;Target 99.9% Availability (Pilot Phase) across multi-tenant clusters&rdquo;
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-lg bg-white dark:bg-brand-forest border border-brand-border dark:border-[#235A4A]">
              <span className="text-[9px] font-mono text-brand-muted block">Evidence Document</span>
              <span className="font-semibold text-brand-forest dark:text-brand-ivory truncate block">Engineering_SLA_Attestation_2025.pdf</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-brand-forest border border-brand-border dark:border-[#235A4A]">
              <span className="text-[9px] font-mono text-brand-muted block">Citation Anchor</span>
              <span className="font-semibold text-brand-forest dark:text-brand-ivory block">Page 14, Section 3.2</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-900 dark:text-emerald-200 font-medium">Proof unexpired (Next audit: Oct 2026)</span>
            </div>
            <span className="font-mono text-[9px] text-emerald-700 dark:text-emerald-300">sha256:4a8b...99e1</span>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 1) {
    return (
      <div className="space-y-4 animate-in fade-in duration-200">
        <div className="p-3 rounded-xl bg-brand-cream dark:bg-white/5 border border-brand-border dark:border-[#235A4A] text-xs">
          <span className="text-brand-muted font-mono text-[10px] block mb-1 uppercase font-bold">Draft Content Under Evaluation</span>
          <p className="text-brand-ink dark:text-brand-ivory">
            &ldquo;Our enterprise platform <mark className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-300 font-semibold inline-flex items-center gap-1"><span>guarantees the fastest turnaround in the industry</span><AlertTriangle className="w-3 h-3 text-rose-600" /></mark> for cross-border communications.&rdquo;
          </p>
        </div>
        <div className="rounded-2xl border-2 border-brand-border dark:border-[#235A4A] bg-white dark:bg-brand-forest/40 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">HIGH SEVERITY</span>
            <span className="font-mono text-[10px] font-bold text-brand-forest dark:text-emerald-300 bg-brand-cream dark:bg-white/10 px-2 py-0.5 rounded border border-brand-border dark:border-[#235A4A]">RULE: BR-014 v1.2</span>
          </div>
          <h4 className="text-sm font-bold text-brand-ink dark:text-brand-ivory">Unsupported Superlative Performance Claim</h4>
          <div className="p-2.5 rounded-xl bg-brand-ivory-light dark:bg-white/5 border border-brand-border dark:border-[#235A4A] space-y-0.5 text-xs">
            <div className="text-[10px] font-mono font-bold text-brand-muted uppercase flex items-center gap-1">
              <Scale className="w-3 h-3 text-brand-coral" /><span>WHY IT WAS FLAGGED</span>
            </div>
            <p className="text-brand-muted dark:text-zinc-300 leading-snug">
              Absolute superlative assertion lacks linked Fact Vault evidence or accredited third-party benchmark study.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1 text-xs">
            <span className="text-[10px] font-mono font-bold text-emerald-900 dark:text-emerald-300 uppercase block">SUGGESTED DEFENSIVE REWRITE</span>
            <p className="text-emerald-950 dark:text-emerald-100 font-medium italic">&ldquo;Designed for high-speed enterprise turnaround across primary regions.&rdquo;</p>
          </div>
          <div className="pt-1 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 text-[10px] text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full font-medium">
              <Sparkles className="w-2.5 h-2.5" /><span>Gemini Causal Reasoning</span>
            </span>
            <button type="button" className="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-brand-forest hover:bg-brand-forest-dark transition-colors flex items-center gap-1 shadow-2xs focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none">
              <span>Apply Fix</span><Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 2) {
    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-brand-border dark:border-[#235A4A]">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-brand-forest dark:text-brand-ivory" />
            <span className="font-bold text-brand-forest dark:text-brand-ivory">Rule Git Diff: BR-014 (Performance Statements)</span>
          </div>
          <span className="font-mono text-[10px] bg-brand-cream dark:bg-white/10 px-2 py-0.5 rounded font-bold">v2.3 → v2.4 (Active)</span>
        </div>
        <div className="rounded-xl bg-[#242820] text-[#F7F2E8] p-4 font-mono text-xs space-y-2">
          <div className="text-[10px] text-zinc-400">@@ -14,6 +14,8 @@ rule_id: BR-014</div>
          <div className="text-rose-400 bg-rose-950/40 px-2 py-1 rounded">- clause: &quot;Prohibits any assertion of speed superiority.&quot;</div>
          <div className="text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded">+ clause: &quot;Permits speed claims ONLY with certified benchmark citations.&quot;</div>
        </div>
        <div className="p-3 rounded-xl bg-brand-ivory-light dark:bg-white/5 border border-brand-border dark:border-[#235A4A] flex items-center justify-between">
          <span className="font-semibold text-brand-forest dark:text-brand-ivory">Synthesized from 14 Reviewer Overrides</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-bold">100% Traceable</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-in fade-in duration-200 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-brand-border dark:border-[#235A4A]">
        <span className="font-bold text-brand-forest dark:text-brand-ivory">Automated Governance Approval Matrix</span>
        <span className="font-mono text-[10px] text-brand-coral font-bold bg-brand-coral/10 px-2 py-0.5 rounded">HIGH STAKES ROUTE</span>
      </div>
      <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-brand-border dark:border-[#235A4A] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-brand-ink dark:text-brand-ivory">Tier 1: AI Autonomous Rule Scan</span>
        </div>
        <span className="font-mono text-[9px] text-emerald-700 font-bold">PASSED (1.2s)</span>
      </div>
      <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-brand-border dark:border-[#235A4A] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-brand-ink dark:text-brand-ivory">Tier 2: Brand Policy Steward</span>
        </div>
        <span className="font-mono text-[9px] text-emerald-700 font-bold">APPROVED</span>
      </div>
      <div className="p-3 rounded-xl bg-brand-cream dark:bg-white/10 border-2 border-brand-forest dark:border-white/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-forest dark:text-brand-ivory" />
          <span className="font-bold text-brand-forest dark:text-brand-ivory">Tier 3: General Counsel Cryptographic Seal</span>
        </div>
        <span className="font-mono text-[9px] bg-brand-forest text-white px-2 py-0.5 rounded font-bold">SEALED</span>
      </div>
    </div>
  );
}
