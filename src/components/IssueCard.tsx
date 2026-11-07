import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Bookmark,
  BookmarkCheck,
  Shield,
  Edit3,
  Loader2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { createRuleFromIssue } from '@/actions/rules';
import type { ReviewIssueResult } from '@/actions/review';
import { SeverityIndicator } from './dashboard/SeverityIndicator';

interface IssueCardProps {
  issue: ReviewIssueResult;
  isPending?: boolean;
  onAccept: (issue: ReviewIssueResult) => void;
  onEdit: (issue: ReviewIssueResult) => void;
  onOverride: (issue: ReviewIssueResult) => void;
  onRuleCreated?: (issueId: string, ruleTitle: string) => void;
}

export function IssueCard({
  issue,
  isPending = false,
  onAccept,
  onEdit,
  onOverride,
  onRuleCreated,
}: IssueCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ruleTitle, setRuleTitle] = useState(issue.ruleTitle || 'Brand Governance Rule');
  const [ruleDefinition, setRuleDefinition] = useState(
    issue.suggestedFix || issue.why || 'Enforce compliance with enterprise brand guidelines.'
  );
  const [ruleSeverity, setRuleSeverity] = useState(issue.severity || 'MEDIUM');
  const [isSavingRule, setIsSavingRule] = useState(false);
  const [ruleSaveError, setRuleSaveError] = useState<string | null>(null);

  const isHigh = issue.severity === 'HIGH';
  const isAccepted = issue.status === 'ACCEPTED';
  const isOverridden = issue.status === 'OVERRIDDEN';
  const isRuleCreated = issue.status === 'RULE_CREATED';

  const handleOpenRuleDialog = () => {
    setRuleTitle(issue.ruleTitle || `Enforce: ${issue.why.slice(0, 45)}`);
    setRuleDefinition(issue.suggestedFix || issue.why);
    setRuleSeverity(issue.severity || 'MEDIUM');
    setRuleSaveError(null);
    setIsDialogOpen(true);
  };

  const handleConfirmSaveRule = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingRule(true);
    setRuleSaveError(null);

    try {
      await createRuleFromIssue(issue.id, {
        title: ruleTitle,
        definition: ruleDefinition,
        severity: ruleSeverity,
        type: 'CLAIM',
      });

      setIsDialogOpen(false);
      onRuleCreated?.(issue.id, ruleTitle);
    } catch (err: unknown) {
      setRuleSaveError(
        err instanceof Error ? err.message : 'Failed to save rule to database'
      );
    } finally {
      setIsSavingRule(false);
    }
  };

  return (
    <>
      <article
        aria-label={issue.ruleTitle || 'Brand Governance Issue'}
        className={`bg-[#FFFCF6] rounded-xl border transition-all duration-200 p-4 shadow-xs space-y-3 ${
          isRuleCreated
            ? 'border-[#123B2F]/60 ring-1 ring-[#123B2F]/20'
            : isAccepted
            ? 'border-emerald-300 ring-1 ring-emerald-200'
            : isOverridden
            ? 'border-stone-300 opacity-75'
            : 'border-[#E8DFD0] hover:border-[#123B2F]/40'
        }`}
      >
        {/* Top: Severity Badge & Rule Metadata */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <SeverityIndicator severity={issue.severity} />

            <span className="font-mono text-[11px] font-semibold text-[#123B2F] bg-[#123B2F]/10 px-2 py-0.5 rounded border border-[#123B2F]/15">
              {issue.ruleTitle}
            </span>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-1">
            {isRuleCreated && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#123B2F] bg-[#123B2F]/10 px-2 py-0.5 rounded-full border border-[#123B2F]/20">
                <BookmarkCheck className="w-3 h-3 text-[#123B2F]" />
                Rule Created
              </span>
            )}
            {isAccepted && !isRuleCreated && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Check className="w-3 h-3" />
                Accepted
              </span>
            )}
            {isOverridden && !isRuleCreated && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                Overridden
              </span>
            )}
          </div>
        </div>

        {/* Issue Title */}
        <h3 className="text-sm font-bold text-[#242820] font-inter">
          {issue.ruleTitle}
        </h3>

        {/* WHY & RULE Metadata Grid */}
        <div className="space-y-1.5 text-xs">
          {/* WHY */}
          <div className="bg-[#F7F2E8]/80 rounded-lg p-2.5 border border-[#E8DFD0]/70">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#4B5563] block mb-0.5">
              WHY:
            </span>
            <p className="text-[#242820] text-xs leading-snug">{issue.why}</p>
          </div>

          {/* RULE RECORD */}
          <div className="flex items-center justify-between text-xs px-0.5 pt-0.5">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#4B5563]">
              RULE:
            </span>
            <span className="font-mono text-[11px] font-bold text-[#123B2F]">
              {issue.ruleId ? issue.ruleId.slice(0, 16) : 'Brand Safety Codex'}
            </span>
          </div>

          {/* EVIDENCE RECORD (if available) */}
          {issue.evidenceSource && (
            <div className="flex items-center justify-between text-xs px-0.5 pt-0.5">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#4B5563]">
                EVIDENCE:
              </span>
              <span className="font-mono text-[11px] font-medium text-[#123B2F] truncate max-w-[200px]">
                {issue.evidenceSource}
              </span>
            </div>
          )}
        </div>

        {/* SUGGESTED FIX BOX */}
        {issue.suggestedFix && (
          <div className="bg-[#E5EEDC] rounded-lg p-2.5 border border-[#d0dfc4] space-y-1 shadow-2xs">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#1F3D2A] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#123B2F]" />
              Suggested Compliant Fix
            </span>
            <p className="text-xs text-[#123B2F] font-medium leading-snug">
              &ldquo;{issue.suggestedFix}&rdquo;
            </p>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="pt-2 border-t border-[#E8DFD0]/60 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Accept Button */}
            <button
              type="button"
              onClick={() => onAccept(issue)}
              disabled={isAccepted || isPending}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer shadow-2xs flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none ${
                isAccepted
                  ? 'bg-emerald-700 text-white cursor-default'
                  : 'bg-[#123B2F] hover:bg-[#0c2921] active:scale-[0.97] text-white disabled:opacity-70'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isAccepted ? 'Applied' : 'Accept'}</span>
            </button>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => onEdit(issue)}
              disabled={isAccepted || isPending}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#545B4E] hover:text-[#123B2F] hover:bg-[#123B2F]/10 transition-colors cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none"
            >
              Edit
            </button>

            {/* Override Button */}
            <button
              type="button"
              onClick={() => onOverride(issue)}
              disabled={isOverridden || isAccepted || isPending}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#E8DFD0] hover:border-[#123B2F] text-[#545B4E] hover:text-[#123B2F] bg-transparent transition-colors cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none"
            >
              Override
            </button>

            {/* Save as Brand Rule Button */}
            <button
              type="button"
              onClick={handleOpenRuleDialog}
              disabled={isRuleCreated || isPending}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 cursor-pointer shadow-2xs flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none ${
                isRuleCreated
                  ? 'bg-[#123B2F]/10 border-[#123B2F]/30 text-[#123B2F] cursor-default'
                  : 'bg-[#FAF6EF] hover:bg-[#FAF6EF]/90 border-[#123B2F]/30 text-[#123B2F] hover:border-[#123B2F]'
              }`}
              title="Add this issue and fix to your company's permanent Brand Rules"
            >
              {isRuleCreated ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#123B2F]" />
                  <span>Rule Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-[#123B2F]" />
                  <span>Save as Brand Rule</span>
                </>
              )}
            </button>
          </div>

          {/* AI-Assisted Pill Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#EDE5F7] text-[#5B21B6] border border-[#DDD0F0] shadow-2xs shrink-0 font-inter">
            <span>✨</span>
            <span>AI-assisted</span>
          </span>
        </div>
      </article>

      {/* Dialog: "Create Brand Rule from this issue?" */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleConfirmSaveRule} className="space-y-4">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-[#123B2F] text-white flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-[#123B2F]">
                  Correction Memory
                </span>
              </div>
              <DialogTitle>Create Brand Rule from this issue?</DialogTitle>
              <DialogDescription>
                Convert this human review decision into a versioned Brand Rule stored in the Brand Brain to prevent future occurrences org-wide.
              </DialogDescription>
            </DialogHeader>

            {ruleSaveError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {ruleSaveError}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#242820] mb-1">
                  Rule Title
                </label>
                <input
                  type="text"
                  required
                  value={ruleTitle}
                  onChange={(e) => setRuleTitle(e.target.value)}
                  placeholder="e.g. Unsubstantiated Performance Claims"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF6EF]/60 text-xs text-[#242820] focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242820] mb-1">
                  Rule Definition & Constraints
                </label>
                <textarea
                  rows={3}
                  required
                  value={ruleDefinition}
                  onChange={(e) => setRuleDefinition(e.target.value)}
                  placeholder="Explain what is restricted and the compliant alternative wording..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF6EF]/60 text-xs text-[#242820] focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F] leading-relaxed resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242820] mb-1">
                  Enforcement Severity
                </label>
                <select
                  value={ruleSeverity}
                  onChange={(e) => setRuleSeverity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF6EF]/60 text-xs text-[#242820] focus:outline-none focus:border-[#123B2F]"
                >
                  <option value="HIGH">HIGH (Blocks publishing until resolved)</option>
                  <option value="MEDIUM">MEDIUM (Requires creator acknowledgement)</option>
                  <option value="LOW">LOW (Advisory recommendation)</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSavingRule}
                className="px-4 py-2 text-xs font-semibold text-[#545B4E] hover:bg-[#F7F2E8] rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSavingRule}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#123B2F] hover:bg-[#0c2921] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-75 focus-visible:ring-2 focus-visible:ring-[#F47745] focus-visible:outline-none"
              >
                {isSavingRule ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to Codex...</span>
                  </>
                ) : (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5" />
                    <span>Confirm & Create Rule</span>
                  </>
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

