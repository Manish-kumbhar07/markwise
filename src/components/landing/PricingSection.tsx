'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ShieldCheck } from 'lucide-react';
import { calculatePlanPrice } from '@/utils/governance';
import { PLANS } from './pricingData';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  return (
    <div className="py-20 md:py-28 bg-brand-ivory-light dark:bg-brand-forest-dark/40 border-t border-brand-border dark:border-[#235A4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-brand-ivory border border-brand-forest/20 dark:border-white/20 mb-3">
            <span>Enterprise-Grade Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-brand-ink dark:text-brand-ivory font-serif">
            Predictable brand protection.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted dark:text-zinc-300">
            One regulatory fine or brand PR crisis costs millions. Markwise provides continuous peace of mind starting at {isAnnual ? '$392' : '$490'}/month.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`text-sm font-semibold transition-colors cursor-pointer ${!isAnnual ? 'text-brand-ink dark:text-white font-bold' : 'text-brand-subtle hover:text-brand-ink'}`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-brand-forest dark:bg-brand-forest-light p-1 relative transition-colors focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none cursor-pointer"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle Annual or Monthly Billing"
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform duration-200 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer ${isAnnual ? 'text-brand-ink dark:text-white font-bold' : 'text-brand-subtle hover:text-brand-ink'}`}
            >
              <span>Annual Billing</span>
              <span className="text-xs font-bold text-brand-coral bg-brand-coral/10 px-2 py-0.5 rounded-full border border-brand-coral/20">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const pricing = calculatePlanPrice(plan, isAnnual, 0);
            const isFeatured = plan.id === 'enterprise';

            return (
              <div
                key={plan.id}
                className={`rounded-2xl border p-7 sm:p-9 flex flex-col justify-between transition-all duration-200 relative ${
                  isFeatured
                    ? 'bg-white dark:bg-brand-forest border-brand-forest shadow-lg ring-2 ring-brand-forest/10 lg:-translate-y-2'
                    : 'bg-brand-cream dark:bg-white/5 border-brand-border dark:border-[#235A4A] shadow-xs hover:bg-white dark:hover:bg-white/10'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-forest text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {plan.badge}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-brand-ink dark:text-brand-ivory font-serif">{plan.name}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-brand-muted dark:text-zinc-300 leading-relaxed min-h-[40px]">{plan.description}</p>
                  <div className="mt-6 pb-6 border-b border-brand-border dark:border-[#235A4A]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-brand-ink dark:text-brand-ivory tracking-tight font-serif">${pricing.baseMonthlyRate}</span>
                      <span className="text-xs sm:text-sm text-brand-subtle dark:text-zinc-300 font-medium">/ month</span>
                    </div>
                    <div className="mt-1 text-xs text-brand-subtle dark:text-zinc-300">
                      {isAnnual ? <span>Billed annually (${pricing.baseMonthlyRate * 12}/year)</span> : <span>Billed monthly</span>}
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <span className="text-[11px] font-bold text-brand-forest dark:text-emerald-300 uppercase tracking-wider block">Everything Included:</span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-ink dark:text-brand-ivory">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-brand-border dark:border-[#235A4A]">
                  <Link
                    href="/login"
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-xs focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none ${
                      isFeatured
                        ? 'bg-brand-coral hover:bg-brand-coral-hover text-white shadow-md'
                        : plan.id === 'custom'
                        ? 'bg-brand-forest hover:bg-brand-forest-dark text-white'
                        : 'border-2 border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white dark:border-brand-ivory dark:text-brand-ivory dark:hover:bg-brand-ivory dark:hover:text-brand-forest'
                    }`}
                  >
                    <span>{plan.id === 'custom' ? 'Book Enterprise Demo' : 'Start Free Pilot'} &rarr;</span>
                  </Link>
                  <p className="mt-2 text-center text-[11px] text-brand-subtle dark:text-zinc-400">
                    {plan.id === 'custom' ? 'Custom SLA & private deployment consultation' : 'No credit card required for pilot setup'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-brand-forest/30 border border-brand-border dark:border-[#235A4A] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-forest/10 text-brand-forest dark:text-brand-ivory flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-bold text-base text-brand-ink dark:text-brand-ivory font-serif">Need Custom Security & Data Retention Covenants?</h4>
              <p className="text-xs sm:text-sm text-brand-muted dark:text-zinc-300 mt-0.5">We sign Business Associate Agreements (BAA), custom DPAs, and provide dedicated single-tenant VPC options.</p>
            </div>
          </div>
          <Link
            href="/login"
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-brand-forest dark:text-brand-ivory border border-brand-forest/30 dark:border-white/30 hover:bg-brand-cream rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none"
          >
            Request Security Whitepaper
          </Link>
        </div>
      </div>
    </div>
  );
}
