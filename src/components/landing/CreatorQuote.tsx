'use client';

import { Sparkles, Terminal } from 'lucide-react';

export function CreatorQuote() {
  return (
    <section aria-label="Founder Architecture Note" className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-brand-cream/80 dark:bg-brand-forest-dark/60 rounded-3xl border border-brand-border dark:border-[#235A4A] p-7 sm:p-10 shadow-xs relative overflow-hidden text-center space-y-6">
        {/* Subtle decorative quote mark accent */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-brand-ivory border border-brand-forest/20 dark:border-white/20">
          <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
          <span>Creator Note &amp; Architecture Proof</span>
        </div>

        <blockquote className="text-base sm:text-xl text-brand-ink dark:text-brand-ivory font-serif leading-relaxed italic max-w-2xl mx-auto">
          &ldquo;Markwise was built to solve a real enterprise problem: moving brand governance from static PDFs to living, executable code. The interactive sandbox you see above is the exact workflow we deployed to production.&rdquo;
        </blockquote>

        <div className="pt-2 flex flex-col items-center justify-center">
          {/* Avatar with MK initials and brand border */}
          <div className="w-12 h-12 rounded-full bg-brand-forest dark:bg-brand-coral text-white font-serif font-bold text-base flex items-center justify-center shadow-xs border-2 border-brand-coral/40 dark:border-white/40 mb-2">
            MK
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base text-brand-ink dark:text-brand-ivory font-serif">
              Manish Kumbhar
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-emerald-300 px-2 py-0.5 rounded border border-brand-forest/20 dark:border-white/20">
              Builder
            </span>
          </div>

          <span className="text-xs text-brand-muted dark:text-zinc-400 mt-0.5 font-mono">
            Creator of Markwise
          </span>
        </div>
      </div>
    </section>
  );
}
