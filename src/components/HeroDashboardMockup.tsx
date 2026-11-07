import { useState } from 'react';
import {
  LayoutDashboard,
  BarChart2,
  FileCode2,
  Network,
  Database,
  Settings,
  AlertTriangle,
  Check,
  Sparkles,
  Loader2,
  RotateCcw,
} from 'lucide-react';

interface HeroDashboardMockupProps {
  onAcceptFix?: () => void;
  priority?: boolean;
}

const DEFAULT_DEMO_TEXT = 'Our platform guarantees the fastest results in the world.';
const FIXED_DEMO_TEXT = 'Designed for high-speed performance.';

export function HeroDashboardMockup({ onAcceptFix }: HeroDashboardMockupProps) {
  const [inputText, setInputText] = useState(DEFAULT_DEMO_TEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRunReview, setHasRunReview] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleRunReview = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasRunReview(true);
      setIsAccepted(false);
    }, 1500);
  };

  const handleApplyFix = () => {
    setIsAccepted(true);
    setInputText(FIXED_DEMO_TEXT);
    if (onAcceptFix) {
      onAcceptFix();
    }
  };

  const handleReset = () => {
    setInputText(DEFAULT_DEMO_TEXT);
    setHasRunReview(false);
    setIsAccepted(false);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  return (
    <div className="w-full relative">
      {/* Outer macOS Window Frame */}
      <div className="rounded-2xl border border-[#D5CDBD] shadow-[0_20px_50px_-10px_rgba(18,59,47,0.2)] bg-white overflow-hidden text-left transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(18,59,47,0.25)]">
        {/* macOS Window Title Bar */}
        <div className="bg-[#EFE9DE] border-b border-[#D8CFC0] px-4 py-2.5 flex items-center justify-between select-none">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ED6A5E] border border-[#D04E42]/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F] border border-[#D3A02C]/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#61C554] border border-[#48A33E]/60 inline-block" />
          </div>

          {/* Window Center Title */}
          <div className="text-[11px] font-medium text-[#5A6355] font-sans tracking-tight">
            Markwise — Interactive Governance Sandbox
          </div>

          {/* Window Version / Tag */}
          <div className="text-[10px] font-mono text-[#123B2F] font-semibold bg-[#123B2F]/10 px-1.5 py-0.5 rounded">
            Live Demo
          </div>
        </div>

        {/* 3-Column Dashboard Body (Responsive on mobile: Column 1 & 2 hide below md) */}
        <div className="overflow-x-auto min-w-0 w-full">
          <div className="grid grid-cols-12 w-full md:min-w-[580px] lg:min-w-0 min-h-[380px] text-xs">
            {/* Column 1: Left Mini Sidebar (Dark Forest Green - hidden on mobile) */}
            <div className="hidden md:flex md:col-span-3 bg-[#123B2F] text-white p-3 flex-col justify-between border-r border-[#103429] select-none">
              <div>
                {/* Brand Header */}
                <div className="flex items-center gap-1.5 pb-3 border-b border-white/10">
                  <div className="w-5 h-5 rounded-md bg-white/15 flex items-center justify-center">
                    <span className="text-[11px]">✦</span>
                  </div>
                  <span className="font-serif font-bold text-xs tracking-tight text-white">
                    Markwise
                  </span>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-1 mt-3">
                  <div className="bg-white/15 text-white font-medium px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] shadow-2xs">
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#F47745]" />
                    <span>Review Cockpit</span>
                  </div>
                  <div className="text-[#A2B8AB] hover:text-white px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] transition-colors cursor-pointer">
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>Telemetry</span>
                  </div>
                  <div className="text-[#A2B8AB] hover:text-white px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] transition-colors cursor-pointer">
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>Brand Rules</span>
                  </div>
                  <div className="text-[#A2B8AB] hover:text-white px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] transition-colors cursor-pointer">
                    <Database className="w-3.5 h-3.5" />
                    <span>Fact Vault</span>
                  </div>
                  <div className="text-[#A2B8AB] hover:text-white px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] transition-colors cursor-pointer">
                    <Network className="w-3.5 h-3.5" />
                    <span>Approval Matrix</span>
                  </div>
                  <div className="text-[#A2B8AB] hover:text-white px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] transition-colors cursor-pointer">
                    <Settings className="w-3.5 h-3.5" />
                    <span>Settings</span>
                  </div>
                </nav>
              </div>

              {/* Bottom User Profile */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#E5EEDC] text-[#123B2F] flex items-center justify-center font-bold text-[9px] shrink-0">
                  M
                </div>
                <div className="truncate text-[10px] text-[#A2B8AB]">
                  Enterprise Sandbox
                </div>
              </div>
            </div>

            {/* Column 2: Center Editor Pane (Hidden on screens < md to prioritize Issue Card readability) */}
            <div className="hidden md:flex md:col-span-5 bg-[#FAF7F2] p-3 flex-col justify-between border-r border-[#E8DFD0]">
              <div>
                {/* Draft Header & Run Review Button */}
                <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0]">
                  <div className="text-xs font-semibold text-[#123B2F] truncate">
                    Draft Content Editor
                  </div>
                  <button
                    type="button"
                    onClick={handleRunReview}
                    disabled={isLoading}
                    className="px-2.5 py-1 text-[10px] font-semibold text-white bg-[#123B2F] hover:bg-[#0c2921] active:scale-95 rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-2xs disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-[#F47745]" />
                        <span>Auditing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-[#F47745]" />
                        <span>Run Review</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Editor Workspace Box with interactive Textarea */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-white border border-[#E8DFD0] text-[12px] text-[#242820] leading-relaxed shadow-2xs min-h-[190px] flex flex-col justify-between">
                  <div>
                    <label htmlFor="hero-demo-textarea" className="sr-only">
                      Draft Copy for Review
                    </label>
                    <textarea
                      id="hero-demo-textarea"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={5}
                      placeholder="Type or paste draft copy here to test the review loop..."
                      className="w-full text-[12px] font-medium text-[#242820] bg-transparent resize-none focus:outline-none leading-relaxed p-1 border-0"
                    />
                  </div>

                  {/* Dynamic Status Bar inside editor */}
                  <div className="pt-2 border-t border-[#F0EAE1] flex items-center justify-between text-[10px]">
                    <span className="font-mono">
                      {isAccepted ? (
                        <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          <span>Compliant Phrasing</span>
                        </span>
                      ) : hasRunReview ? (
                        <span className="text-[#C85A32] font-semibold inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>1 Issue Flagged</span>
                        </span>
                      ) : (
                        <span className="text-[#7A8274]">
                          Awaiting Audit Scan
                        </span>
                      )}
                    </span>
                    <span className="text-[#123B2F] text-[9px] font-mono font-semibold bg-[#123B2F]/5 px-1.5 py-0.5 rounded">
                      Editable Sandbox
                    </span>
                  </div>
                </div>
              </div>

              {/* Editor Footer Status */}
              <div className="pt-2 border-t border-[#E8DFD0] flex items-center justify-between text-[10px] text-[#7A8274] select-none">
                <span>Words: {wordCount}</span>
                <span className="flex items-center gap-1 text-[#3B4D3C] font-medium">
                  <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                  <span>Interactive Loop</span>
                </span>
              </div>
            </div>

            {/* Column 3: Right Audit & Compliance Panel (Full width col-span-12 on mobile, col-span-4 on md+) */}
            <div className="col-span-12 md:col-span-4 bg-[#FAF8F5] p-3 flex flex-col justify-between space-y-2">
              <div>
                {/* Mobile-only Draft Copy Context Banner */}
                <div className="md:hidden mb-2.5 p-2 rounded-lg bg-white border border-[#E8DFD0] text-[11px] space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono font-bold uppercase text-[#4B5563]">
                      Draft Claim Under Audit:
                    </span>
                    <span className="text-[9px] font-mono text-[#123B2F] font-semibold bg-[#123B2F]/10 px-1.5 py-0.5 rounded">
                      Demo Copy
                    </span>
                  </div>
                  <p className="font-medium text-[#123B2F] italic text-xs leading-snug">
                    &ldquo;{inputText}&rdquo;
                  </p>
                </div>

                {/* Panel Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0]">
                  <span className="text-xs font-bold text-[#123B2F]">
                    Audit &amp; Compliance
                  </span>
                  {isLoading ? (
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-semibold px-1.5 py-0.5 rounded animate-pulse">
                      Analyzing (1.5s)...
                    </span>
                  ) : hasRunReview && !isAccepted ? (
                    <span className="bg-[#FDE8E8] text-[#9B1C1C] text-[9px] font-semibold px-1.5 py-0.5 rounded">
                      1 Flagged issue
                    </span>
                  ) : isAccepted ? (
                    <span className="bg-[#DEF7EC] text-[#03543F] text-[9px] font-semibold px-1.5 py-0.5 rounded">
                      0 Flagged issues
                    </span>
                  ) : (
                    <span className="bg-[#EAE5DA] text-[#5A6355] text-[9px] font-semibold px-1.5 py-0.5 rounded">
                      Ready to Scan
                    </span>
                  )}
                </div>

                {/* State 1: Simulating AI Thinking (Loading 1.5s) */}
                {isLoading && (
                  <div className="mt-2.5 p-3 rounded-xl bg-white border border-[#E8DFD0] space-y-2.5 shadow-2xs text-center min-h-[200px] flex flex-col items-center justify-center animate-in fade-in">
                    <Loader2 className="w-6 h-6 animate-spin text-[#123B2F]" />
                    <div className="text-[11px] font-bold text-[#123B2F]">
                      Simulating AI Reasoning...
                    </div>
                    <p className="text-[10px] text-[#545B4E] max-w-[170px] leading-relaxed">
                      Cross-referencing claims against active Brand Codex &amp; Fact Vault evidence.
                    </p>
                  </div>
                )}

                {/* State 2: Initial Prompt (Before clicking Run Review) */}
                {!isLoading && !hasRunReview && !isAccepted && (
                  <div className="mt-2.5 p-3 rounded-xl bg-white border border-dashed border-[#D5CDBD] space-y-2 shadow-2xs text-center min-h-[200px] flex flex-col items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-[#123B2F]/10 text-[#123B2F] flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-[#F47745]" />
                    </div>
                    <div className="text-[11px] font-bold text-[#123B2F]">
                      Pre-Publish Audit
                    </div>
                    <p className="text-[10px] text-[#545B4E] leading-relaxed max-w-[170px]">
                      Click <strong>&ldquo;Run Review&rdquo;</strong> to scan the pre-filled claim against active brand rules.
                    </p>
                    <button
                      type="button"
                      onClick={handleRunReview}
                      className="px-2.5 py-1 text-[9px] font-semibold text-white bg-[#123B2F] hover:bg-[#1A4C3E] rounded-md transition-all shadow-2xs cursor-pointer flex items-center gap-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-[#F47745]" />
                      <span>Run Review</span>
                    </button>
                  </div>
                )}

                {/* State 3: Explainable Issue Card (After Review Runs) */}
                {!isLoading && hasRunReview && !isAccepted && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-white border border-[#E8DFD0] space-y-2 shadow-2xs text-left animate-in fade-in zoom-in-95 duration-150">
                    {/* High Severity Badge + Score Impact */}
                    <div className="flex items-center justify-between">
                      <span className="bg-[#C53030] text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                        HIGH
                      </span>
                      <span className="text-[9px] text-[#4B5563] flex items-center gap-0.5 font-medium">
                        <span>Score impact</span>
                        <AlertTriangle className="w-2.5 h-2.5 text-[#C53030]" />
                      </span>
                    </div>

                    {/* Issue Title */}
                    <h4 className="text-[11px] font-bold text-[#242820] leading-tight">
                      Unsupported performance claim
                    </h4>

                    {/* WHY Details with WCAG AA compliant #4B5563 contrast */}
                    <div className="text-[10px] space-y-0.5">
                      <div className="text-[8px] font-mono font-bold text-[#4B5563] uppercase tracking-wider">
                        WHY
                      </div>
                      <p className="text-[#242820] leading-snug">
                        Superlative claim with no linked evidence
                      </p>
                    </div>

                    {/* RULE Row with WCAG AA compliant #4B5563 contrast */}
                    <div className="flex items-center gap-1 text-[10px]">
                      <span className="text-[8px] font-mono font-bold text-[#4B5563] uppercase tracking-wider">
                        RULE
                      </span>
                      <span className="font-mono text-[9px] font-semibold text-[#123B2F] bg-[#EAE5DA] px-1.5 py-0.2 rounded">
                        BR-014 v1
                      </span>
                    </div>

                    {/* SUGGESTED FIX Box */}
                    <div className="p-2 rounded-lg bg-[#E5EEDC] border border-[#C5D6BB] space-y-0.5">
                      <div className="text-[8px] font-mono font-bold text-[#1F3D2A] uppercase tracking-wider">
                        SUGGESTED FIX
                      </div>
                      <p className="text-[10px] text-[#1F3D2A] leading-snug font-medium italic">
                        &ldquo;Designed for high-speed performance&rdquo; <span className="not-italic text-[9px] text-[#3E5A44]">(no verified benchmark found)</span>.
                      </p>
                    </div>

                    {/* AI Badge & Apply Fix Button */}
                    <div className="pt-1 flex items-center justify-between gap-1.5">
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#EDE5F7] text-[#6B46C1] border border-[#6B46C1]/20 text-[8px] font-medium">
                        <Sparkles className="w-2 h-2" />
                        <span>AI-assisted</span>
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handleApplyFix}
                          className="px-2.5 py-1 text-[9px] font-semibold text-white bg-[#123B2F] hover:bg-[#1A4C3E] rounded transition-colors shadow-2xs cursor-pointer flex items-center gap-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none"
                        >
                          <span>Apply Fix</span>
                          <Check className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* State 4: Issue Resolved State (After Clicking Apply Fix) */}
                {!isLoading && isAccepted && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#E5EEDC]/60 border border-emerald-300 space-y-2 text-center animate-in fade-in duration-200">
                    <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div className="text-xs font-bold text-[#123B2F]">
                      Issue Resolved
                    </div>
                    <p className="text-[10px] text-[#3A4E3D]">
                      Text updated to compliant phrasing: &ldquo;Designed for high-speed performance.&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-[9px] font-mono text-[#123B2F] underline hover:text-[#C85A32] cursor-pointer pt-1 flex items-center justify-center gap-1 mx-auto focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none rounded"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Reset demo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Compliance Footer Status */}
              <div className="pt-2 border-t border-[#E8DFD0] text-[9px] text-[#7A8274] flex items-center justify-between select-none">
                <span>Policy: Marketing Codex</span>
                <span className="text-emerald-700 font-medium">100% Traceable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
