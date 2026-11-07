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

  const filteredSteps = LOOP_STEPS.filter((step) => {
    if (filter === 'ai') return step.actor === 'AI';
    if (filter === 'human') return step.actor === 'Human';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F2E8] dark:bg-[#123B2F] text-[#242820] dark:text-[#F7F2E8] transition-colors duration-300 font-inter selection:bg-[#F47745]/20 selection:text-[#174C3B]">
      {/* Top Header Bar */}
      <header className="border-b border-[#E8DFD0] dark:border-[#235A4A] bg-[#FAF7F0]/80 dark:bg-[#164638]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#545B4E] dark:text-[#CBD5C0] hover:text-[#123B2F] dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-[#D5CDBD] dark:text-[#235A4A]">|</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#123B2F] dark:bg-white text-white dark:text-[#123B2F] flex items-center justify-center text-xs">
                ✦
              </div>
              <span className="font-serif font-bold text-sm tracking-tight text-[#123B2F] dark:text-[#F7F2E8]">
                How Markwise Works
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/trust"
              className="text-xs font-semibold text-[#545B4E] dark:text-[#CBD5C0] hover:text-[#123B2F] dark:hover:text-white transition-colors"
            >
              Trust Center
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#123B2F] dark:bg-[#F47745] hover:bg-[#1A4C3E] dark:hover:bg-[#dc612e] rounded-full transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>Test The Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EEDC] dark:bg-white/10 text-[#123B2F] dark:text-[#E5EEDC] text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Continuous Governance Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-inter tracking-tight text-[#123B2F] dark:text-[#F7F2E8]">
            The 10-Step Markwise Loop
          </h1>
          <p className="text-base sm:text-lg text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
            Enterprise content doesn&apos;t end at generation. Markwise unifies autonomous AI scanning with human strategic sign-off in a continuous, self-improving loop.
          </p>
        </div>

        {/* Core Loop Flow Pill Banner */}
        <div className="bg-white dark:bg-[#164638] rounded-2xl border border-[#E8DFD0] dark:border-[#235A4A] p-4 sm:p-6 shadow-xs overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between text-xs font-semibold">
            {LOOP_STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center gap-1 text-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shadow-2xs ${
                      step.actor === 'AI'
                        ? 'bg-[#123B2F] text-white dark:bg-white dark:text-[#123B2F]'
                        : 'bg-[#F47745] text-white'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className="text-[11px] font-bold text-[#242820] dark:text-[#F7F2E8]">
                    {step.name}
                  </span>
                  <span
                    className={`text-[9px] uppercase font-mono px-1 rounded ${
                      step.actor === 'AI'
                        ? 'bg-[#123B2F]/10 dark:bg-white/10 text-[#123B2F] dark:text-[#CBD5C0]'
                        : 'bg-[#F47745]/10 text-[#C85A32] dark:text-[#F47745]'
                    }`}
                  >
                    {step.actor}
                  </span>
                </div>
                {idx < LOOP_STEPS.length - 1 && (
                  <div className="w-6 sm:w-8 h-[2px] bg-[#E8DFD0] dark:bg-[#235A4A] mx-1 sm:mx-1.5 self-center mb-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="text-sm font-semibold text-[#123B2F] dark:text-[#F7F2E8]">
            Detailed Step Breakdown
          </div>

          <div className="flex items-center gap-1.5 bg-[#FAF7F0] dark:bg-[#164638] p-1 rounded-xl border border-[#E8DFD0] dark:border-[#235A4A]">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white dark:bg-white/20 text-[#123B2F] dark:text-white shadow-2xs'
                  : 'text-[#7A8274] hover:text-[#123B2F]'
              }`}
            >
              All 10 Steps
            </button>
            <button
              type="button"
              onClick={() => setFilter('ai')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                filter === 'ai'
                  ? 'bg-[#123B2F] text-white shadow-2xs'
                  : 'text-[#7A8274] hover:text-[#123B2F]'
              }`}
            >
              <Bot className="w-3 h-3" />
              <span>AI Autonomous (6)</span>
            </button>
            <button
              type="button"
              onClick={() => setFilter('human')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                filter === 'human'
                  ? 'bg-[#F47745] text-white shadow-2xs'
                  : 'text-[#7A8274] hover:text-[#123B2F]'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Human Strategic (4)</span>
            </button>
          </div>
        </div>

        {/* 10-Step Timeline / Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSteps.map((step) => {
            const Icon = STEP_ICONS[step.iconName] || Sparkles;
            const isAI = step.actor === 'AI';

            return (
              <div
                key={step.id}
                className="bg-white dark:bg-[#164638] rounded-2xl border border-[#E8DFD0] dark:border-[#235A4A] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-2xs ${
                          isAI
                            ? 'bg-[#123B2F] text-white dark:bg-white dark:text-[#123B2F]'
                            : 'bg-[#F47745] text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#7A8274] dark:text-[#CBD5C0]">
                          Step {step.number} of 10
                        </div>
                        <h2 className="text-base font-bold text-[#242820] dark:text-[#F7F2E8]">
                          {step.name}
                        </h2>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                        isAI
                          ? 'bg-[#123B2F]/10 dark:bg-white/10 text-[#123B2F] dark:text-[#CBD5C0]'
                          : 'bg-[#F47745]/15 text-[#C85A32] dark:text-[#F47745]'
                      }`}
                    >
                      {step.actor === 'AI' ? 'Autonomous AI' : 'Human Strategic'}
                    </span>
                  </div>

                  {/* Role & Tagline */}
                  <div className="text-xs font-semibold text-[#174C3B] dark:text-[#CBD5C0]">
                    {step.role} · <span className="font-normal italic text-[#7A8274]">{step.tagline}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Technical I/O Specs */}
                <div className="pt-3 border-t border-[#E8DFD0] dark:border-[#235A4A]/50 space-y-2 text-xs">
                  <div className="bg-[#FAF8F5] dark:bg-white/5 rounded-lg p-2 space-y-1">
                    <div className="text-[10px] font-mono uppercase font-bold text-[#7A8274] dark:text-[#CBD5C0]">
                      Input Payload
                    </div>
                    <div className="text-[#242820] dark:text-[#F7F2E8] font-medium">
                      {step.input}
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] dark:bg-white/5 rounded-lg p-2 space-y-1">
                    <div className="text-[10px] font-mono uppercase font-bold text-[#7A8274] dark:text-[#CBD5C0]">
                      Output Artifact
                    </div>
                    <div className="text-[#242820] dark:text-[#F7F2E8] font-medium">
                      {step.output}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#7A8274] dark:text-[#CBD5C0] pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F47745]" />
                      <span>Performance Target</span>
                    </span>
                    <span className="font-mono font-semibold text-[#123B2F] dark:text-[#F7F2E8]">
                      {step.latency}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy Callout */}
        <div className="bg-white dark:bg-[#164638] rounded-2xl border border-[#E8DFD0] dark:border-[#235A4A] p-7 sm:p-9 space-y-4 shadow-xs">
          <h3 className="text-xl font-bold text-[#242820] dark:text-[#F7F2E8]">
            Why 10 Steps? AI Velocity Meets Human Accountability.
          </h3>
          <p className="text-sm text-[#545B4E] dark:text-[#CBD5C0] leading-relaxed">
            Many enterprise AI tools only implement Step 2 (&ldquo;Check&rdquo;), returning arbitrary percentage scores that creators ignore. Markwise completes the full loop: transforming every human decision into versioned brand intelligence so compliance becomes faster and more precise over time.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#123B2F] dark:bg-[#F47745] hover:bg-[#1A4C3E] rounded-full transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Try The Review Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/trust"
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#123B2F] dark:text-[#F7F2E8] border border-[#D5CDBD] dark:border-[#235A4A] bg-white dark:bg-white/10 rounded-full hover:bg-white/80 transition-all cursor-pointer"
            >
              <span>Security &amp; Trust Center</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
