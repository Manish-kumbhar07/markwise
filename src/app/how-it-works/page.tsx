'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  PenTool,
  SearchCode,
  HelpCircle,
  Sparkles,
  CheckCheck,
  ShieldCheck,
  Send,
  Eye,
  Cpu,
  GitBranch,
  Bot,
  User,
  Clock,
  Layers,
  Check,
} from 'lucide-react';
import { LOOP_STEPS } from '@/data/loopSteps';

const STEP_ICONS: Record<string, any> = {
  PenTool,
  SearchCode,
  HelpCircle,
  Sparkles,
  CheckCheck,
  ShieldCheck,
  Send,
  Eye,
  Cpu,
  GitBranch,
};

export default function HowItWorksPage() {
  const [filter, setFilter] = useState<'all' | 'ai' | 'human'>('all');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const filteredSteps = LOOP_STEPS.filter((step) => {
    if (filter === 'ai') return step.actor === 'AI';
    if (filter === 'human') return step.actor === 'Human';
    return true;
  });

  return (
    <div className="min-h-screen bg-brand-ivory dark:bg-brand-forest text-brand-ink dark:text-brand-ivory transition-colors duration-300 font-inter selection:bg-brand-coral/20 selection:text-brand-forest-light">
      {/* Top Header Bar */}
      <header className="border-b border-brand-border dark:border-[#235A4A] bg-brand-cream/90 dark:bg-brand-forest-dark/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted dark:text-zinc-300 hover:text-brand-forest dark:hover:text-white transition-colors"
            >
              <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-brand-border dark:text-[#235A4A]" aria-hidden="true">|</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-forest dark:bg-white text-white dark:text-brand-forest flex items-center justify-center text-xs shadow-2xs">
                <Layers aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
              </div>
              <span className="font-serif font-bold text-sm tracking-tight text-brand-forest dark:text-brand-ivory">
                The 10-Step Markwise Loop
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/trust"
              className="text-xs font-semibold text-brand-muted dark:text-zinc-300 hover:text-brand-forest dark:hover:text-white transition-colors"
            >
              Trust Center
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark dark:hover:bg-brand-coral-hover rounded-full transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none"
            >
              <span>Test Sandbox</span>
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-brand-ivory text-xs font-semibold uppercase tracking-wider">
            <Layers aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
            <span>Continuous Governance Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-brand-forest dark:text-brand-ivory">
            The 10-Step Markwise Loop
          </h1>
          <p className="text-base sm:text-lg text-brand-muted dark:text-zinc-300 leading-relaxed">
            Enterprise content doesn&apos;t end at generation. Markwise unifies autonomous AI scanning with human strategic sign-off in a continuous, closed-loop system:
            <span className="block mt-1 font-mono text-xs text-brand-forest dark:text-emerald-300 font-bold">
              Create &rarr; Check &rarr; Explain &rarr; Fix &rarr; Verify &rarr; Approve &rarr; Publish &rarr; Monitor &rarr; Learn &rarr; Improve
            </span>
          </p>
        </div>

        {/* 1. Horizontal Stepper Overview */}
        <div className="bg-white dark:bg-brand-forest-dark/70 rounded-2xl border border-brand-border dark:border-[#235A4A] p-5 shadow-xs overflow-x-auto">
          <div className="min-w-[720px] flex items-center justify-between text-xs">
            {LOOP_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveStepIndex(idx);
                      const el = document.getElementById(`step-${step.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`flex flex-col items-center gap-1 text-center cursor-pointer p-1 rounded-lg transition-transform hover:scale-105 ${
                      isSelected ? 'ring-2 ring-brand-coral ring-offset-2' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-2xs ${
                        step.actor === 'AI'
                          ? 'bg-brand-forest text-white dark:bg-emerald-500 dark:text-white'
                          : 'bg-brand-coral text-white'
                      }`}
                    >
                      {step.number}
                    </div>
                    <span className="text-[11px] font-bold text-brand-ink dark:text-brand-ivory">
                      {step.name}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-mono px-1 rounded ${
                        step.actor === 'AI'
                          ? 'bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-zinc-300'
                          : 'bg-brand-coral/10 text-brand-coral'
                      }`}
                    >
                      {step.actor}
                    </span>
                  </button>
                  {idx < LOOP_STEPS.length - 1 && (
                    <div className="w-4 sm:w-6 h-[2px] bg-brand-border dark:bg-[#235A4A] mx-1 self-center mb-6" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <h2 className="text-xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
            Interactive Vertical Timeline
          </h2>

          <div className="flex items-center gap-1.5 bg-brand-cream dark:bg-brand-forest-dark p-1 rounded-xl border border-brand-border dark:border-[#235A4A]">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white dark:bg-white/20 text-brand-forest dark:text-white shadow-2xs font-bold'
                  : 'text-brand-subtle hover:text-brand-forest dark:text-zinc-400'
              }`}
            >
              All 10 Steps
            </button>
            <button
              type="button"
              onClick={() => setFilter('ai')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                filter === 'ai'
                  ? 'bg-brand-forest text-white shadow-2xs font-bold'
                  : 'text-brand-subtle hover:text-brand-forest dark:text-zinc-400'
              }`}
            >
              <Bot aria-hidden="true" className="w-3 h-3" />
              <span>AI Autonomous (6)</span>
            </button>
            <button
              type="button"
              onClick={() => setFilter('human')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                filter === 'human'
                  ? 'bg-brand-coral text-white shadow-2xs font-bold'
                  : 'text-brand-subtle hover:text-brand-forest dark:text-zinc-400'
              }`}
            >
              <User aria-hidden="true" className="w-3 h-3" />
              <span>Human Strategic (4)</span>
            </button>
          </div>
        </div>

        {/* 2. Connected Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-brand-border dark:before:bg-[#235A4A]">
          {filteredSteps.map((step) => {
            const Icon = STEP_ICONS[step.iconName] || Sparkles;
            const isAI = step.actor === 'AI';

            return (
              <div
                key={step.id}
                id={`step-${step.id}`}
                className="relative scroll-mt-28"
              >
                {/* Timeline Node Marker */}
                <div
                  className={`absolute -left-6 sm:-left-10 top-5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-white dark:border-brand-forest ${
                    isAI
                      ? 'bg-brand-forest text-white dark:bg-emerald-500'
                      : 'bg-brand-coral text-white'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs">{step.number}</span>
                </div>

                {/* Step Card */}
                <div className="bg-white dark:bg-brand-forest-dark/60 rounded-2xl border border-brand-border dark:border-[#235A4A] p-6 sm:p-7 shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border dark:border-[#235A4A]">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs ${
                          isAI ? 'bg-brand-forest dark:bg-emerald-600' : 'bg-brand-coral'
                        }`}
                      >
                        <Icon aria-hidden="true" className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-brand-subtle dark:text-zinc-400">
                          Step {step.number} of 10
                        </div>
                        <h3 className="text-lg font-bold font-serif text-brand-ink dark:text-brand-ivory">
                          {step.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                          isAI
                            ? 'bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-emerald-300'
                            : 'bg-brand-coral/10 text-brand-coral'
                        }`}
                      >
                        {isAI ? 'Autonomous AI' : 'Human Strategic'}
                      </span>
                      <span className="text-xs text-brand-subtle dark:text-zinc-400 font-mono">
                        {step.latency}
                      </span>
                    </div>
                  </div>

                  {/* Role & Description */}
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-brand-forest dark:text-emerald-300">
                      {step.role} · <span className="font-normal italic text-brand-muted dark:text-zinc-300">{step.tagline}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* I/O Technical Payloads */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                    <div className="bg-brand-cream dark:bg-white/5 rounded-xl p-3 space-y-1 border border-brand-border dark:border-[#235A4A]">
                      <span className="text-[9px] uppercase font-bold text-brand-subtle block">
                        Input Payload
                      </span>
                      <p className="text-brand-ink dark:text-brand-ivory text-xs font-sans">
                        {step.input}
                      </p>
                    </div>
                    <div className="bg-brand-cream dark:bg-white/5 rounded-xl p-3 space-y-1 border border-brand-border dark:border-[#235A4A]">
                      <span className="text-[9px] uppercase font-bold text-brand-subtle block">
                        Output Artifact
                      </span>
                      <p className="text-brand-ink dark:text-brand-ivory text-xs font-sans">
                        {step.output}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy & CTA */}
        <div className="bg-white dark:bg-brand-forest-dark/70 rounded-2xl border border-brand-border dark:border-[#235A4A] p-7 sm:p-9 space-y-4 shadow-xs text-center sm:text-left">
          <h3 className="text-xl font-bold font-serif text-brand-forest dark:text-brand-ivory">
            Why 10 Steps? Velocity Meets Human Accountability.
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-zinc-300 leading-relaxed max-w-3xl">
            Generic AI tools stop at generation or produce arbitrary scores. Markwise completes the enterprise governance loop: every human correction trains a better living rule, creating an auditable, self-improving brand intelligence system.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <Link
              href="/login"
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark rounded-full transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Try The Review Cockpit</span>
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/trust"
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-brand-forest dark:text-brand-ivory border border-brand-border-dark dark:border-[#235A4A] bg-white dark:bg-white/10 rounded-full hover:bg-white/80 transition-all cursor-pointer"
            >
              <span>Security &amp; Trust Center</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
