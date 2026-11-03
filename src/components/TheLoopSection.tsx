import { useState } from 'react';
import {
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
  ArrowRight,
  ChevronRight,
  RotateCw,
  Clock,
  Layers,
  UserCheck,
  Bot,
} from 'lucide-react';
import { LOOP_STEPS } from '../data/loopSteps';
import { LoopStep } from '../utils/governance';

const STEP_ICONS: Record<string, React.ElementType> = {
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

export function TheLoopSection() {
  const [activeStepId, setActiveStepId] = useState<string>('explain');
  const [filterMode, setFilterMode] = useState<'all' | 'ai' | 'human'>('all');

  const activeStep: LoopStep =
    LOOP_STEPS.find((s) => s.id === activeStepId) || LOOP_STEPS[2];

  const handleNextStep = () => {
    const currentIndex = LOOP_STEPS.findIndex((s) => s.id === activeStepId);
    const nextIndex = (currentIndex + 1) % LOOP_STEPS.length;
    setActiveStepId(LOOP_STEPS[nextIndex].id);
  };

  const handlePrevStep = () => {
    const currentIndex = LOOP_STEPS.findIndex((s) => s.id === activeStepId);
    const prevIndex = (currentIndex - 1 + LOOP_STEPS.length) % LOOP_STEPS.length;
    setActiveStepId(LOOP_STEPS[prevIndex].id);
  };

  return (
    <section id="loop" className="pt-2 pb-16 md:pt-4 md:pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-[#174C3B] mb-2">
              Closed-Loop Enterprise Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242820] font-inter">
              The 10-Step Markwise Loop
            </h2>
            <p className="mt-2 text-base text-[#545B4E] max-w-2xl">
              An intelligent, closed feedback cycle connecting automated AI detection with verified human policy evolution.
            </p>
          </div>

          {/* Actor Legend & Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 bg-[#FCFAF5] p-2 rounded-xl border border-[#E8DFD0] shrink-0">
            <div className="flex items-center gap-4 px-2 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#174C3B] ring-2 ring-[#174C3B]/20" />
                <span className="text-[#242820]">AI Steps (6)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#F47745] ring-2 ring-[#F47745]/20" />
                <span className="text-[#242820]">Human Steps (4)</span>
              </span>
            </div>

            <div className="h-4 w-px bg-[#E8DFD0] hidden sm:block" />

            {/* Filter buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-[#174C3B] text-white shadow-xs'
                    : 'text-[#545B4E] hover:text-[#174C3B] hover:bg-[#F7F2E8]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('ai')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterMode === 'ai'
                    ? 'bg-[#174C3B] text-white shadow-xs'
                    : 'text-[#545B4E] hover:text-[#174C3B] hover:bg-[#F7F2E8]'
                }`}
              >
                AI Only
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('human')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterMode === 'human'
                    ? 'bg-[#F47745] text-white shadow-xs'
                    : 'text-[#545B4E] hover:text-[#F47745] hover:bg-[#F7F2E8]'
                }`}
              >
                Human Only
              </button>
            </div>
          </div>
        </div>

        {/* The Loop Visual: Horizontal Connected Flexbox */}
        <div className="bg-[#FAF6EF] border border-[#E8DFD0] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          {/* Subtle loop indicator banner */}
          <div className="flex items-center justify-between text-xs text-[#7A8274] pb-4 mb-4 border-b border-[#E8DFD0]/80">
            <span className="font-semibold text-[#174C3B] flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5" />
              Continuous Closed-Loop Governance Pipeline
            </span>
            <span className="hidden sm:inline">Click any step to inspect payload, actors & citations</span>
          </div>

          {/* Horizontal Connected Track */}
          <div className="relative overflow-x-auto pb-4 pt-2 -mx-2 px-2 scrollbar-thin">
            {/* Horizontal Connecting Guideline */}
            <div
              className="absolute top-9 left-8 right-8 h-0.5 bg-[#E8DFD0] hidden lg:block -z-0"
              aria-hidden="true"
            />

            <div className="flex items-center justify-between min-w-[920px] gap-2 lg:gap-0 relative z-10">
              {LOOP_STEPS.map((step, index) => {
                const IconComponent = STEP_ICONS[step.iconName] || HelpCircle;
                const isSelected = activeStepId === step.id;
                const isAI = step.actor === 'AI';
                const isDimmed =
                  (filterMode === 'ai' && !isAI) ||
                  (filterMode === 'human' && isAI);

                // Circle color styling
                const circleBg = isAI ? 'bg-[#174C3B]' : 'bg-[#F47745]';
                const circleBorder = isAI
                  ? 'border-[#174C3B]'
                  : 'border-[#F47745]';
                const ringHighlight = isAI
                  ? 'ring-4 ring-[#174C3B]/20'
                  : 'ring-4 ring-[#F47745]/20';

                return (
                  <div
                    key={step.id}
                    className={`flex items-center shrink-0 ${
                      isDimmed ? 'opacity-30' : 'opacity-100'
                    } transition-opacity duration-200`}
                  >
                    {/* Node Step Item */}
                    <button
                      type="button"
                      onClick={() => setActiveStepId(step.id)}
                      className={`flex flex-col items-center group cursor-pointer focus:outline-none transition-all duration-200 ${
                        isSelected ? 'scale-105' : 'hover:scale-102'
                      }`}
                      aria-pressed={isSelected}
                      aria-label={`Step ${step.number}: ${step.name} (${step.actor})`}
                    >
                      {/* Subtle Colored Circle */}
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                          isSelected
                            ? `${circleBg} text-white shadow-md ${ringHighlight}`
                            : `bg-[#FCFAF5] ${circleBorder} text-[#242820] group-hover:bg-[#FAF6EF] group-hover:shadow-xs`
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-transform duration-150 ${
                            isSelected ? 'text-white scale-110' : isAI ? 'text-[#174C3B]' : 'text-[#F47745]'
                          }`}
                        />
                      </div>

                      {/* Step Number & Name */}
                      <div className="mt-2.5 text-center">
                        <span className="block text-[11px] font-mono font-medium text-[#7A8274]">
                          {String(step.number).padStart(2, '0')}
                        </span>
                        <span
                          className={`block text-xs font-bold tracking-tight whitespace-nowrap ${
                            isSelected
                              ? 'text-[#242820] underline decoration-[#174C3B] decoration-2 underline-offset-4'
                              : 'text-[#242820] group-hover:text-[#174C3B]'
                          }`}
                        >
                          {step.name}
                        </span>
                        <span
                          className={`mt-0.5 inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                            isAI
                              ? 'bg-[#174C3B]/10 text-[#174C3B]'
                              : 'bg-[#F47745]/10 text-[#F47745]'
                          }`}
                        >
                          {step.actor}
                        </span>
                      </div>
                    </button>

                    {/* Step Connector Arrow (except after last step) */}
                    {index < LOOP_STEPS.length - 1 && (
                      <div
                        className="mx-1 lg:mx-2 hidden lg:flex items-center text-[#E8DFD0] mb-8"
                        aria-hidden="true"
                      >
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Step Deep-Dive Inspector Panel */}
          <div className="mt-8 pt-6 border-t border-[#E8DFD0] bg-white rounded-xl p-5 sm:p-7 shadow-2xs transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Left Column: Step Description & Role */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      activeStep.actor === 'AI'
                        ? 'bg-[#174C3B]/10 text-[#174C3B] border border-[#174C3B]/20'
                        : 'bg-[#F47745]/10 text-[#F47745] border border-[#F47745]/20'
                    }`}
                  >
                    {activeStep.actor === 'AI' ? (
                      <Bot className="w-3.5 h-3.5" />
                    ) : (
                      <UserCheck className="w-3.5 h-3.5" />
                    )}
                    Step {activeStep.number} of 10 · {activeStep.actor} Execution
                  </span>

                  <span className="text-xs font-mono text-[#7A8274] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#174C3B]" />
                    {activeStep.latency}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#242820] font-inter">
                  {activeStep.name}: <span className="font-normal text-[#545B4E]">{activeStep.tagline}</span>
                </h3>

                <p className="text-sm sm:text-base text-[#545B4E] leading-relaxed max-w-3xl">
                  {activeStep.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs text-[#242820]">
                  <span className="font-semibold text-[#174C3B]">Primary Owner:</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF6EF] border border-[#E8DFD0] font-medium">
                    {activeStep.role}
                  </span>
                </div>
              </div>

              {/* Right Column: Input / Output Manifest */}
              <div className="w-full lg:w-96 bg-[#FAF6EF] p-4 rounded-xl border border-[#E8DFD0] space-y-3 shrink-0">
                <div className="flex items-center justify-between text-xs font-bold text-[#242820] border-b border-[#E8DFD0] pb-2">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#174C3B]" />
                    Governance Artifacts
                  </span>
                  <span className="text-[11px] font-mono text-[#7A8274]">
                    ID: {activeStep.id.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="block font-semibold text-[#7A8274] uppercase text-[10px] tracking-wider">
                      Input Payload
                    </span>
                    <p className="text-[#242820] font-mono text-[11px] mt-0.5 bg-white p-2 rounded border border-[#E8DFD0]/60">
                      {activeStep.input}
                    </p>
                  </div>
                  <div>
                    <span className="block font-semibold text-[#7A8274] uppercase text-[10px] tracking-wider">
                      Output Artifact
                    </span>
                    <p className="text-[#174C3B] font-mono text-[11px] mt-0.5 bg-[#edf4f1]/80 p-2 rounded border border-[#174C3B]/20 font-medium">
                      {activeStep.output}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#E8DFD0]/80">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="text-xs text-[#545B4E] hover:text-[#174C3B] font-medium px-2 py-1"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174C3B] hover:text-[#0e3025] bg-white px-3 py-1.5 rounded-lg border border-[#174C3B]/25 hover:border-[#174C3B] transition-colors"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
