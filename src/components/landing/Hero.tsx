'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Shield } from 'lucide-react';
import { HeroDashboardMockup } from '../HeroDashboardMockup';

export function Hero() {
  const targetIndustries = ['FINANCE', 'HEALTHCARE', 'ENTERPRISE SAAS', 'TECH'];

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-brand-ivory border border-brand-forest/20 dark:border-white/20 shadow-2xs">
              <Shield aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral stroke-[2.5]" />
              <span>Enterprise AI Brand Governance</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-ink dark:text-brand-ivory font-serif leading-[1.08]">
              Brand-safe content, <span className="italic font-normal font-serif text-brand-forest dark:text-emerald-300">explained.</span>
            </h1>

            <p className="text-base sm:text-lg text-brand-muted dark:text-zinc-300 leading-relaxed font-normal">
              Markwise reviews marketing and corporate copy before it goes live, flags hallucinations and compliance risks, cites exact brand rules, and turns human corrections into versioned brand intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/login"
                className="px-7 py-3.5 text-xs sm:text-sm font-semibold text-white bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark dark:hover:bg-brand-coral-hover rounded-full transition-all duration-150 cursor-pointer active:scale-[0.98] inline-flex items-center justify-center gap-2 shadow-xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none"
              >
                <span>Launch Free Sandbox</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>

              <Link
                href="/docs"
                className="px-7 py-3.5 text-xs sm:text-sm font-semibold text-brand-forest dark:text-brand-ivory border border-brand-border-dark dark:border-white/20 bg-white/70 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 rounded-full transition-all duration-150 cursor-pointer active:scale-[0.98] inline-flex items-center justify-center gap-2 shadow-2xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none"
              >
                <BookOpen aria-hidden="true" className="w-4 h-4 text-brand-forest dark:text-brand-ivory" />
                <span>Read the Docs</span>
              </Link>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold tracking-widest text-brand-subtle dark:text-zinc-400 uppercase block font-mono">
                BUILT FOR TEAMS IN FINANCE, HEALTHCARE, AND TECH
              </span>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                {targetIndustries.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded text-[10px] font-semibold text-brand-muted dark:text-brand-ivory bg-brand-border/60 dark:bg-white/10 tracking-wider uppercase shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Sandbox Mockup */}
          <div className="lg:col-span-7 relative">
            <HeroDashboardMockup priority={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
