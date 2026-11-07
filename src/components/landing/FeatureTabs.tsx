'use client';

import { useState } from 'react';
import { FileCheck2, Scale, GitBranch, Workflow, Check, X, ShieldCheck } from 'lucide-react';
import { FeatureMockRenderer } from './featureMocks';

const FEATURES = [
  { id: 0, icon: FileCheck2, tag: '01. Evidence-Backed', title: 'Every assertion anchored to verified proof', desc: 'Connects metrics directly to audit reports, SEC filings, and clinical trial outcomes.' },
  { id: 1, icon: Scale, tag: '02. Causal Explainability', title: 'Clear clause citations, not black-box scores', desc: 'Breaks down flagged issues with transparent reasoning citing FTC and brand rules.' },
  { id: 2, icon: GitBranch, tag: '03. Living Rulebook', title: 'Every human correction trains a better rule', desc: 'Synthesizes editor corrections into versioned guideline updates across the org.' },
  { id: 3, icon: Workflow, tag: '04. Multi-Tier Triage', title: 'Automated routing for high-stakes approvals', desc: 'Low-risk copy clears in seconds; high-stakes copy triggers legal gates with audit logs.' },
];

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div className="space-y-12">
      {/* 1. Problem vs Solution Comparison Strip */}
      <div className="bg-brand-cream dark:bg-brand-forest/60 rounded-3xl border border-brand-border dark:border-[#235A4A] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-brand-coral">The Governance Shift</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest dark:text-brand-ivory font-serif">Stop relying on static PDF guidelines that nobody reads.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-white/90 dark:bg-black/20 rounded-2xl border border-rose-200 dark:border-rose-900/40 p-5 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-400">
              <span className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-xs"><X aria-hidden="true" className="w-3.5 h-3.5 stroke-[3]" /></span>
              <span>The Old Way: Static Brand PDFs</span>
            </div>
            <p className="text-brand-muted dark:text-zinc-400">80-page PDFs gather dust on intranet folders. Legal reviews take 11 days, stalling launches and letting unverified claims leak into production.</p>
          </div>
          <div className="bg-white/90 dark:bg-black/20 rounded-2xl border-2 border-emerald-500/50 p-5 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs"><Check aria-hidden="true" className="w-3.5 h-3.5 stroke-[3]" /></span>
              <span>The Markwise Way: Living Executable Codex</span>
            </div>
            <p className="text-brand-ink dark:text-zinc-200">Sub-second scans check copy against active rules with causal explanations, Fact Vault evidence, and continuous learning from editor decisions.</p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Feature Tabs with Right-Side Live Mock */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-brand-forest dark:text-emerald-300">Architecture Explorer</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink dark:text-brand-ivory font-serif">The Four Pillars of Brand Governance</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-brand-cream dark:bg-brand-forest/60 p-1 rounded-xl border border-brand-border dark:border-[#235A4A] overflow-x-auto max-w-full">
            {FEATURES.map((feat) => (
              <button
                key={feat.id}
                type="button"
                onClick={() => setActiveTab(feat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none ${
                  activeTab === feat.id ? 'bg-brand-forest text-white shadow-xs' : 'text-brand-muted hover:text-brand-forest dark:text-zinc-300'
                }`}
              >
                {feat.tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Feature Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeTab === feat.id;
              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => setActiveTab(feat.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none ${
                    isActive
                      ? 'bg-white dark:bg-brand-forest border-brand-forest dark:border-emerald-400 shadow-md ring-2 ring-brand-forest/10'
                      : 'bg-brand-ivory-light/60 dark:bg-white/5 border-brand-border dark:border-[#235A4A] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 text-xs font-bold text-brand-forest dark:text-emerald-300">
                    <Icon aria-hidden="true" className="w-4 h-4 stroke-[2]" />
                    <span>{feat.tag}</span>
                  </div>
                  <h3 className="text-sm font-bold text-brand-ink dark:text-brand-ivory">{feat.title}</h3>
                  <p className="text-xs text-brand-muted dark:text-zinc-400 mt-1 line-clamp-2">{feat.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live UI Simulator Window */}
          <div className="lg:col-span-7 bg-white dark:bg-brand-forest/40 rounded-3xl border border-brand-border-dark dark:border-[#235A4A] shadow-lg overflow-hidden flex flex-col justify-between">
            <div className="bg-brand-border/40 dark:bg-brand-forest-dark border-b border-brand-border dark:border-[#235A4A] px-4 py-2.5 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-2 text-[11px] font-mono text-brand-muted dark:text-zinc-400">markwise://inspector/interactive-view</span>
              </div>
              <span className="text-[9px] font-mono font-semibold bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-emerald-300 px-2 py-0.5 rounded">Live UI Simulator</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <FeatureMockRenderer activeTab={activeTab} />
            </div>
            <div className="bg-brand-cream dark:bg-brand-forest-dark border-t border-brand-border dark:border-[#235A4A] px-5 py-2.5 flex items-center justify-between text-xs text-brand-muted dark:text-zinc-400">
              <span className="flex items-center gap-1.5"><ShieldCheck aria-hidden="true" className="w-3.5 h-3.5 text-emerald-600" /><span>Enterprise Governance Core</span></span>
              <span className="font-semibold text-brand-forest dark:text-emerald-300">100% Causal Explainability</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
