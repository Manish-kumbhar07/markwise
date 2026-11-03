import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileText,
  Sliders,
  Shield,
  HelpCircle,
  ExternalLink,
  Edit3,
  X,
  Send,
  Bold,
  Italic,
  Link,
  Quote,
  List,
} from 'lucide-react';
import {
  type ReviewIssue,
  INITIAL_MOCK_ISSUES,
} from '../../utils/dashboard';

export function ReviewPage() {
  const [issues, setIssues] = useState<ReviewIssue[]>(INITIAL_MOCK_ISSUES);
  const [isScanning, setIsScanning] = useState(false);
  const [scanNotification, setScanNotification] = useState<string | null>(null);

  // Draft text state
  const initialOriginalText =
    'Our platform guarantees the fastest performance on the market.';
  const [draftContent, setDraftContent] = useState(initialOriginalText);

  // Interactive modal state for Edit / Override
  const [activeModal, setActiveModal] = useState<{
    type: 'edit' | 'override';
    issueId: string;
    textValue: string;
  } | null>(null);

  // Accept an issue fix
  const handleAcceptFix = (issueId: string) => {
    setIssues((prev) =>
      prev.map((iss) =>
        iss.id === issueId ? { ...iss, status: 'accepted' } : iss
      )
    );

    if (issueId === 'issue-1') {
      // Replaces "guarantees the fastest" with compliant fix
      setDraftContent((current) =>
        current.replace(
          'guarantees the fastest',
          'is designed for high-speed performance'
        )
      );
    } else if (issueId === 'issue-2') {
      setDraftContent((current) =>
        current.replace(
          'on the market',
          'in peer enterprise benchmark evaluations'
        )
      );
    }
  };

  // Override an issue
  const handleOverride = (issueId: string) => {
    setIssues((prev) =>
      prev.map((iss) =>
        iss.id === issueId ? { ...iss, status: 'overridden' } : iss
      )
    );
    setActiveModal(null);
  };

  // Edit custom fix
  const handleSaveCustomEdit = () => {
    if (!activeModal) return;
    const { issueId, textValue } = activeModal;
    setIssues((prev) =>
      prev.map((iss) =>
        iss.id === issueId
          ? { ...iss, suggestedFix: textValue, status: 'accepted' }
          : iss
      )
    );
    if (issueId === 'issue-1') {
      setDraftContent((current) =>
        current.replace('guarantees the fastest', textValue)
      );
    }
    setActiveModal(null);
  };

  // Run AI Review Scan animation
  const handleRunAiReview = () => {
    setIsScanning(true);
    setScanNotification('Analyzing content against Brand Brain v2.4 & Fact Vault...');
    setTimeout(() => {
      setIsScanning(false);
      setScanNotification('AI Review Complete: 2 issues flagged against approved rules.');
      setTimeout(() => {
        setScanNotification(null);
      }, 3500);
    }, 1200);
  };

  // Reset demo state
  const handleResetDraft = () => {
    setDraftContent(initialOriginalText);
    setIssues(INITIAL_MOCK_ISSUES);
    setScanNotification(null);
  };

  const pendingCount = issues.filter((i) => i.status === 'pending').length;
  const isFlaggedHighlighted = draftContent.includes('guarantees the fastest');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* TOP BAR: Draft Title, Status Badge, and large "Run AI Review" Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DFD0]">
        <div className="space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#242820] font-inter">
              Social Media Post Draft
            </h1>

            {/* Status Badge: "In Review" */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#123B2F]/10 text-[#123B2F] border border-[#123B2F]/20 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#123B2F] animate-pulse" />
              In Review
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#545B4E]">
            Marketing campaign ingestion · Channel: LinkedIn & X (Twitter) · Pre-publish governance
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetDraft}
            title="Reset Draft and Issues"
            className="p-2.5 rounded-xl border border-[#E8DFD0] bg-[#FFFCF6] hover:bg-[#FAF6EF] text-[#545B4E] hover:text-[#242820] transition-colors cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Large "Run AI Review" Button (Forest Green with Sparkles icon) */}
          <button
            type="button"
            onClick={handleRunAiReview}
            disabled={isScanning}
            className="px-5 py-3 rounded-xl bg-[#123B2F] hover:bg-[#0c2921] active:scale-[0.98] text-white text-sm font-semibold flex items-center gap-2.5 shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-75"
          >
            <Sparkles
              className={`w-4 h-4 text-[#F47745] ${
                isScanning ? 'animate-spin' : ''
              }`}
            />
            <span>{isScanning ? 'Scanning AST Rules...' : 'Run AI Review'}</span>
          </button>
        </div>
      </div>

      {/* Temporary Scan Notification Toast */}
      {scanNotification && (
        <div className="p-3.5 rounded-xl bg-[#FFFCF6] border border-[#123B2F]/20 text-xs font-semibold text-[#123B2F] flex items-center justify-between shadow-xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F47745]" />
            <span>{scanNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setScanNotification(null)}
            className="text-[#7A8274] hover:text-[#242820] p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SPLIT SCREEN LAYOUT: Left (60%) Content Editor, Right (40%) Issue Panel */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT SIDE (60%): The Content Editor */}
        <div className="w-full lg:w-[60%] flex flex-col space-y-4">
          <div className="flex items-center justify-between text-xs text-[#7A8274] px-1">
            <span className="font-mono uppercase tracking-wider font-semibold text-[#545B4E]">
              Content Editor Viewport (Draft v1.2)
            </span>
            <span>Target: 280 Max Chars</span>
          </div>

          {/* Large White Card with Text Draft */}
          <div className="w-full bg-white rounded-2xl border border-[#E8DFD0] shadow-xs p-6 sm:p-8 flex flex-col justify-between min-h-[460px] relative transition-all">
            {/* Editor Toolbar Header */}
            <div className="flex items-center justify-between border-b border-[#E8DFD0]/70 pb-4 mb-6">
              <div className="flex items-center gap-1 text-[#545B4E]">
                <button
                  type="button"
                  className="p-1.5 rounded-lg hover:bg-[#F7F2E8] text-[#545B4E] hover:text-[#242820]"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg hover:bg-[#F7F2E8] text-[#545B4E] hover:text-[#242820]"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg hover:bg-[#F7F2E8] text-[#545B4E] hover:text-[#242820]"
                  title="Insert Link"
                >
                  <Link className="w-3.5 h-3.5" />
                </button>
                <span className="text-[#E8DFD0] mx-1">|</span>
                <button
                  type="button"
                  className="p-1.5 rounded-lg hover:bg-[#F7F2E8] text-[#545B4E] hover:text-[#242820]"
                  title="Quote"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg hover:bg-[#F7F2E8] text-[#545B4E] hover:text-[#242820]"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#7A8274] font-mono">
                <span>9 words</span>
                <span>·</span>
                <span>65 chars</span>
              </div>
            </div>

            {/* Document Draft Text Rendering */}
            <div className="flex-1 py-4">
              <p className="text-xl sm:text-2xl font-medium text-[#242820] leading-relaxed font-inter">
                Our platform{' '}
                {isFlaggedHighlighted ? (
                  /* Highlighted phrase with subtle coral/orange background */
                  <mark
                    className="bg-[#F47745]/20 text-[#242820] px-2 py-0.5 rounded-md border-b-2 border-[#F47745] font-semibold decoration-none inline-flex items-center gap-1.5 cursor-pointer hover:bg-[#F47745]/30 transition-colors shadow-2xs"
                    title="Flagged by Rule BR-014 v1: Superlative claim with no linked evidence"
                  >
                    <span>guarantees the fastest</span>
                    <span className="text-[10px] font-mono bg-[#F47745] text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                      Flagged
                    </span>
                  </mark>
                ) : (
                  <span className="bg-[#E5EEDC] text-[#123B2F] px-2 py-0.5 rounded-md border-b-2 border-[#123B2F] font-semibold inline-flex items-center gap-1.5 transition-all">
                    <CheckCircle2 className="w-4 h-4 text-[#123B2F]" />
                    <span>is designed for high-speed</span>
                  </span>
                )}{' '}
                performance on the market.
              </p>
            </div>

            {/* Editor Bottom Meta & Status Bar */}
            <div className="pt-6 border-t border-[#E8DFD0]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F47745]" />
                <span className="text-[#545B4E]">
                  {pendingCount > 0
                    ? `${pendingCount} governance issue requires human review before export.`
                    : 'All issues resolved. Draft ready for Sign & Seal approval.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#7A8274] bg-[#F7F2E8] px-2.5 py-1 rounded-md border border-[#E8DFD0]">
                  Encoding: UTF-8
                </span>
                <span className="text-[11px] font-mono font-semibold text-[#123B2F] bg-[#123B2F]/10 px-2.5 py-1 rounded-md">
                  AST Validated
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (40%): The Issue Panel */}
        <div className="w-full lg:w-[40%] flex flex-col space-y-4">
          <div className="flex items-center justify-between text-xs text-[#7A8274] px-1">
            <span className="font-mono uppercase tracking-wider font-semibold text-[#545B4E]">
              Issue Panel (2 Flagged)
            </span>
            <span className="text-xs font-semibold text-[#F47745]">
              {pendingCount} Pending Action
            </span>
          </div>

          {/* Render 2 Mock Issue Cards */}
          <div className="space-y-4">
            {issues.map((issue) => {
              const isHigh = issue.severity === 'HIGH';
              const isAccepted = issue.status === 'accepted';
              const isOverridden = issue.status === 'overridden';

              return (
                <div
                  key={issue.id}
                  className={`bg-[#FFFCF6] rounded-2xl border transition-all duration-200 p-6 shadow-xs space-y-4 ${
                    isAccepted
                      ? 'border-emerald-300 ring-1 ring-emerald-200'
                      : isOverridden
                      ? 'border-stone-300 opacity-75'
                      : 'border-[#E8DFD0] hover:border-[#123B2F]/40'
                  }`}
                >
                  {/* Top: Severity Badge ("HIGH" Red / "MEDIUM" Amber) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border tracking-wider uppercase ${
                          isHigh
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isHigh ? 'bg-red-500' : 'bg-amber-500'
                          }`}
                        />
                        {issue.severity}
                      </span>

                      {/* Rule ID in JetBrains Mono */}
                      <span className="font-mono text-xs font-semibold text-[#123B2F] bg-[#123B2F]/10 px-2 py-0.5 rounded border border-[#123B2F]/15">
                        {issue.rule}
                      </span>
                    </div>

                    {/* Status indicator if modified */}
                    {isAccepted && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3" />
                        Accepted
                      </span>
                    )}
                    {isOverridden && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                        Overridden
                      </span>
                    )}
                  </div>

                  {/* Title (Bold) */}
                  <h3 className="text-base font-bold text-[#242820] font-inter">
                    {issue.title}
                  </h3>

                  {/* WHY & RULE Metadata Grid */}
                  <div className="space-y-2 text-xs">
                    {/* WHY */}
                    <div className="bg-[#F7F2E8]/80 rounded-xl p-3 border border-[#E8DFD0]/70">
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#7A8274] block mb-0.5">
                        WHY:
                      </span>
                      <p className="text-[#545B4E] leading-relaxed">
                        {issue.why}
                      </p>
                    </div>

                    {/* RULE */}
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#7A8274]">
                        RULE:
                      </span>
                      <span className="font-mono text-xs font-bold text-[#123B2F]">
                        {issue.rule}
                      </span>
                    </div>
                  </div>

                  {/* SUGGESTED FIX BOX: Pale sage-green background (#E5EEDC) */}
                  <div className="bg-[#E5EEDC] rounded-xl p-3.5 border border-[#d0dfc4] space-y-1.5 shadow-2xs">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#123B2F] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#123B2F]" />
                      Suggested Compliant Fix
                    </span>
                    <p className="text-xs text-[#242820] font-medium leading-relaxed">
                      &ldquo;{issue.suggestedFix}&rdquo;
                    </p>
                  </div>

                  {/* BOTTOM ROW: "Accept" (Solid Forest Green), "Edit" (Ghost), "Override" (Outline) + AI-assisted badge */}
                  <div className="pt-2 border-t border-[#E8DFD0]/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {/* Accept (Solid Forest Green) */}
                      <button
                        type="button"
                        onClick={() => handleAcceptFix(issue.id)}
                        disabled={isAccepted}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer shadow-2xs flex items-center gap-1.5 ${
                          isAccepted
                            ? 'bg-emerald-700 text-white cursor-default'
                            : 'bg-[#123B2F] hover:bg-[#0c2921] active:scale-[0.97] text-white'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isAccepted ? 'Applied' : 'Accept'}</span>
                      </button>

                      {/* Edit (Ghost) */}
                      <button
                        type="button"
                        onClick={() =>
                          setActiveModal({
                            type: 'edit',
                            issueId: issue.id,
                            textValue: issue.suggestedFix,
                          })
                        }
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#545B4E] hover:text-[#123B2F] hover:bg-[#123B2F]/10 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>

                      {/* Override (Outline) */}
                      <button
                        type="button"
                        onClick={() =>
                          setActiveModal({
                            type: 'override',
                            issueId: issue.id,
                            textValue: '',
                          })
                        }
                        disabled={isOverridden}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#E8DFD0] hover:border-[#123B2F] text-[#545B4E] hover:text-[#123B2F] bg-transparent transition-colors cursor-pointer"
                      >
                        Override
                      </button>
                    </div>

                    {/* Small Pill Badge: "✨ AI-assisted" with Soft Purple background (#EDE5F7) */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#EDE5F7] text-[#5B21B6] border border-[#DDD0F0] shadow-2xs shrink-0 font-inter">
                      <span>✨</span>
                      <span>AI-assisted</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for Edit or Override */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FFFCF6] border border-[#E8DFD0] rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD0]">
              <h3 className="text-base font-bold text-[#242820] font-inter flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#123B2F]" />
                <span>
                  {activeModal.type === 'edit'
                    ? 'Edit Suggested Revision'
                    : 'Record Executive Override'}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#7A8274] hover:text-[#242820] p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeModal.type === 'edit' ? (
              <div className="space-y-3">
                <p className="text-xs text-[#545B4E]">
                  Modify the proposed wording before accepting and substituting it into the draft text.
                </p>
                <textarea
                  rows={3}
                  value={activeModal.textValue}
                  onChange={(e) =>
                    setActiveModal({ ...activeModal, textValue: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] focus:outline-none focus:border-[#123B2F]"
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#545B4E] hover:bg-[#F7F2E8] rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCustomEdit}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#123B2F] hover:bg-[#0c2921] rounded-xl shadow-xs"
                  >
                    Save & Apply
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#545B4E]">
                  Provide a compliance rationale to bypass this rule check. Overrides are cryptographically logged in the audit ledger.
                </p>
                <textarea
                  rows={3}
                  placeholder="e.g. Legal exception approved by Chief Compliance Officer under Section 4.2..."
                  className="w-full p-3 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] focus:outline-none focus:border-[#123B2F]"
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#545B4E] hover:bg-[#F7F2E8] rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOverride(activeModal.issueId)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#F47745] hover:bg-[#dc612e] rounded-xl shadow-xs"
                  >
                    Confirm Override
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
