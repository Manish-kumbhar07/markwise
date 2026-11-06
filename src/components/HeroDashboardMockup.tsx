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
} from 'lucide-react';

interface HeroDashboardMockupProps {
  onAcceptFix?: () => void;
  priority?: boolean;
}

export function HeroDashboardMockup({ onAcceptFix, priority = true }: HeroDashboardMockupProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
    if (onAcceptFix) {
      onAcceptFix();
    }
  };

  const handleReset = () => {
    setIsAccepted(false);
  };

  return (
    <div className="w-full relative select-none">
      {/* Outer macOS Window Frame */}
      <div className="rounded-2xl border border-[#D5CDBD] shadow-[0_20px_50px_-10px_rgba(18,59,47,0.2)] bg-white overflow-hidden text-left transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(18,59,47,0.25)]">
        {/* macOS Window Title Bar */}
        <div className="bg-[#EFE9DE] border-b border-[#D8CFC0] px-4 py-2.5 flex items-center justify-between">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ED6A5E] border border-[#D04E42]/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F] border border-[#D3A02C]/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#61C554] border border-[#48A33E]/60 inline-block" />
          </div>

          {/* Window Center Title */}
          <div className="text-[11px] font-medium text-[#5A6355] font-sans tracking-tight">
            Markwise — Content Review Dashboard
          </div>

          {/* Window Version */}
          <div className="text-[10px] font-mono text-[#8C9485]">
            v2.1.0
          </div>
        </div>

        {/* 3-Column Dashboard Body (Responsive scroll wrapper for mobile) */}
        <div className="overflow-x-auto min-w-0">
          <div className="grid grid-cols-12 min-w-[580px] lg:min-w-0 min-h-[380px] text-xs">
            {/* Column 1: Left Mini Sidebar (Dark Forest Green) */}
            <div className="col-span-3 bg-[#123B2F] text-white p-3 flex flex-col justify-between border-r border-[#103429]">
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
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </div>
                <div className="text-[#A2B8AB] hover:text-white px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] transition-colors cursor-pointer">
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Analytics</span>
                </div>
                <div className="text-[#A2B8AB] hover:text-white px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] transition-colors cursor-pointer">
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Rules</span>
                </div>
                <div className="text-[#A2B8AB] hover:text-white px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] transition-colors cursor-pointer">
                  <Network className="w-3.5 h-3.5" />
                  <span>Integrations</span>
                </div>
                <div className="text-[#A2B8AB] hover:text-white px-2 py-1.5 rounded-md flex items-center gap-2 text-[11px] transition-colors cursor-pointer">
                  <Database className="w-3.5 h-3.5" />
                  <span>Sources</span>
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
                E
              </div>
              <div className="truncate text-[10px] text-[#A2B8AB]">
                Enterprise Account
              </div>
            </div>
          </div>

          {/* Column 2: Center Editor Pane */}
          <div className="col-span-5 bg-[#FAF7F2] p-3 flex flex-col justify-between border-r border-[#E8DFD0]">
            <div>
              {/* Draft Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0]">
                <div className="text-xs font-semibold text-[#123B2F] truncate">
                  Enterprise Copy Review
                </div>
                <span className="text-[9px] font-medium bg-[#E5EEDC] text-[#2F4734] px-1.5 py-0.5 rounded-full shrink-0">
                  Editing Draft
                </span>
              </div>

              {/* Editor Workspace Box */}
              <div className="mt-2.5 p-3 rounded-xl bg-white border border-[#E8DFD0] text-[12px] text-[#242820] leading-relaxed shadow-2xs min-h-[190px]">
                <p>
                  Deploy high-velocity marketing copy with verified brand compliance.{' '}
                  {!isAccepted ? (
                    <span className="bg-[#FCE8DF] text-[#C85A32] font-semibold px-1.5 py-0.5 rounded border border-[#F6C6B3] inline-flex items-center gap-1 shadow-2xs transition-all">
                      <AlertTriangle className="w-3 h-3 text-[#C85A32] shrink-0" />
                      <span>Unverified superlative assertion</span>
                    </span>
                  ) : (
                    <span className="bg-[#E5EEDC] text-[#123B2F] font-semibold px-1.5 py-0.5 rounded border border-[#C5D6BB] inline-flex items-center gap-1 shadow-2xs transition-all">
                      <Check className="w-3 h-3 text-emerald-700 shrink-0 stroke-[2.5]" />
                      <span>Verified against active brand codex</span>
                    </span>
                  )}{' '}
                  with complete auditability and proof citations.
                </p>
              </div>
            </div>

            {/* Editor Footer Status */}
            <div className="pt-2 border-t border-[#E8DFD0] flex items-center justify-between text-[10px] text-[#7A8274]">
              <span>Word Count: 24</span>
              <span className="flex items-center gap-1 text-[#3B4D3C] font-medium">
                <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                <span>Draft Auto-saved</span>
              </span>
            </div>
          </div>

          {/* Column 3: Right Audit & Compliance Panel */}
          <div className="col-span-4 bg-[#FAF8F5] p-3 flex flex-col justify-between space-y-2">
            <div>
              {/* Panel Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0]">
                <span className="text-xs font-bold text-[#123B2F]">
                  Audit & Compliance
                </span>
                {!isAccepted ? (
                  <span className="bg-[#FDE8E8] text-[#9B1C1C] text-[9px] font-semibold px-1.5 py-0.5 rounded">
                    1 Flagged issue
                  </span>
                ) : (
                  <span className="bg-[#DEF7EC] text-[#03543F] text-[9px] font-semibold px-1.5 py-0.5 rounded">
                    0 Flagged issues
                  </span>
                )}
              </div>

              {/* The Flagged Issue Card */}
              {!isAccepted ? (
                <div className="mt-2.5 p-2.5 rounded-xl bg-white border border-[#E8DFD0] space-y-2 shadow-2xs text-left">
                  {/* High Severity Badge + Score Impact */}
                  <div className="flex items-center justify-between">
                    <span className="bg-[#C53030] text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                      HIGH
                    </span>
                    <span className="text-[9px] text-[#7A8274] flex items-center gap-0.5">
                      <span>Score impact</span>
                      <AlertTriangle className="w-2.5 h-2.5 text-[#C53030]" />
                    </span>
                  </div>

                  {/* Issue Title */}
                  <h4 className="text-[11px] font-bold text-[#242820] leading-tight">
                    Unsupported performance claim
                  </h4>

                  {/* WHY Details */}
                  <div className="text-[10px] space-y-0.5">
                    <div className="text-[8px] font-mono font-bold text-[#8C9485] uppercase">
                      WHY
                    </div>
                    <p className="text-[#4A5245] leading-snug">
                      Superlative claim with no linked evidence
                    </p>
                  </div>

                  {/* RULE Row */}
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="text-[8px] font-mono font-bold text-[#8C9485]">
                      RULE
                    </span>
                    <span className="font-mono text-[9px] font-semibold text-[#123B2F] bg-[#EAE5DA] px-1.5 py-0.2 rounded">
                      BR-014 v1
                    </span>
                  </div>

                  {/* SUGGESTED FIX Box */}
                  <div className="p-2 rounded-lg bg-[#E5EEDC] border border-[#C5D6BB] space-y-0.5">
                    <div className="text-[8px] font-mono font-bold text-[#1F3D2A] uppercase">
                      SUGGESTED FIX
                    </div>
                    <p className="text-[10px] text-[#1F3D2A] leading-snug font-medium italic">
                      &ldquo;Designed for high-speed performance&rdquo; <span className="not-italic text-[9px] text-[#3E5A44]">(no verified benchmark found)</span>.
                    </p>
                  </div>

                  {/* AI Badge & Action Buttons */}
                  <div className="pt-1 flex items-center justify-between gap-1.5">
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#EDE5F7] text-[#6B46C1] border border-[#6B46C1]/20 text-[8px] font-medium">
                      <Sparkles className="w-2 h-2" />
                      <span>AI-assisted</span>
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handleAccept}
                        className="px-2.5 py-1 text-[9px] font-semibold text-white bg-[#123B2F] hover:bg-[#1A4C3E] rounded transition-colors shadow-2xs cursor-pointer flex items-center gap-0.5 active:scale-95"
                      >
                        <span>Accept</span>
                        <Check className="w-2.5 h-2.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleAccept}
                        className="px-2 py-1 text-[9px] font-medium text-[#5A6355] border border-[#D8D2C5] bg-white hover:bg-gray-50 rounded transition-colors cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2.5 p-3 rounded-xl bg-[#E5EEDC]/60 border border-emerald-300 space-y-2 text-center animate-in fade-in duration-200">
                  <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="text-xs font-bold text-[#123B2F]">
                    Issue Resolved
                  </div>
                  <p className="text-[10px] text-[#3A4E3D]">
                    Draft updated to compliant terminology. Audit score improved.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[9px] font-mono text-[#123B2F] underline hover:text-[#C85A32] cursor-pointer pt-1"
                  >
                    Reset demo
                  </button>
                </div>
              )}
            </div>

            {/* Compliance Footer Status */}
            <div className="pt-2 border-t border-[#E8DFD0] text-[9px] text-[#7A8274] flex items-center justify-between">
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

