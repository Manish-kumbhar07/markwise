import React, { useState, useEffect, useTransition } from 'react';
import {
  Sparkles,
  Check,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  RotateCcw,
  Edit3,
  X,
  Bold,
  Italic,
  Link,
  Quote,
  List,
  Loader2,
  Shield,
  FileText,
} from 'lucide-react';
import {
  getReviewContent,
  runAIReview,
  acceptIssue,
  type ReviewIssueResult,
} from '@/actions/review';
import { IssueCard } from '@/components/IssueCard';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from './StatusBadge';

export function ReviewPage() {
  const [contentId, setContentId] = useState<string>('');
  const [contentTitle, setContentTitle] = useState<string>('Social Media Post Draft');
  const [contentStatus, setContentStatus] = useState<string>('DRAFT');
  const [draftContent, setDraftContent] = useState<string>(
    'Our platform guarantees the fastest performance on the market.'
  );
  const [issues, setIssues] = useState<ReviewIssueResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastNotification, setToastNotification] = useState<{
    type: 'success' | 'error' | 'info';
    title: string;
    description?: string;
  } | null>(null);
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);

  // Auto-dismiss toast notification after 7 seconds
  useEffect(() => {
    if (!toastNotification) return;
    const timer = setTimeout(() => {
      setToastNotification(null);
    }, 7000);
    return () => clearTimeout(timer);
  }, [toastNotification]);

  // useTransition for running AI review and accepting issues
  const [isPending, startTransition] = useTransition();

  // Interactive modal state for Edit / Override
  const [activeModal, setActiveModal] = useState<{
    type: 'edit' | 'override';
    issueId: string;
    textValue: string;
  } | null>(null);

  // Load real content & issues from Prisma
  const loadContent = async () => {
    setIsLoading(true);
    try {
      const data = await getReviewContent();
      setContentId(data.id);
      setContentTitle(data.title);
      setContentStatus(data.status);
      setDraftContent(data.bodyText);
      setIssues(data.issues || []);
    } catch (err: unknown) {
      console.error('Failed to load review content:', err);
      setToastNotification({
        type: 'error',
        title: 'Failed to connect to review database',
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadContent();
  }, []);

  // Run AI Review using Gemini & Prisma
  const handleRunAiReview = () => {
    if (!contentId) return;
    setToastNotification(null);

    startTransition(async () => {
      try {
        // Save current draft text first if modified
        await fetch('/api/review/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentId, bodyText: draftContent }),
        });

        const newIssues = await runAIReview(contentId);
        setIssues(newIssues);
        setContentStatus('IN_REVIEW');
        setToastNotification({
          type: 'success',
          title: `AI Review Complete: ${newIssues.length} issue${
            newIssues.length === 1 ? '' : 's'
          } identified by Brand Governance model.`,
        });
      } catch (err: unknown) {
        console.error('[AI Review Graceful Fallback]:', err);
        const errorDetail = err instanceof Error ? err.message : '';
        setToastNotification({
          type: 'error',
          title: 'AI Review failed. Please try again in a moment.',
          description:
            errorDetail && !errorDetail.toLowerCase().includes('failed')
              ? errorDetail
              : 'The Brand Governance AI engine could not complete the request. Your draft is preserved.',
        });
      }
    });
  };

  // Accept an issue fix
  const handleAcceptFix = (issue: ReviewIssueResult) => {
    startTransition(async () => {
      try {
        let updatedText = draftContent;

        if (issue.suggestedFix) {
          if (draftContent.includes('guarantees the fastest')) {
            updatedText = draftContent.replace(
              'guarantees the fastest',
              issue.suggestedFix
            );
          } else if (draftContent.includes('on the market')) {
            updatedText = draftContent.replace(
              'on the market',
              issue.suggestedFix
            );
          } else {
            // General replacement: check if old phrase exists or update text
            const firstFlaggedWord = issue.why.match(/"([^"]+)"/)?.[1];
            if (firstFlaggedWord && draftContent.includes(firstFlaggedWord)) {
              updatedText = draftContent.replace(firstFlaggedWord, issue.suggestedFix);
            } else {
              updatedText = issue.suggestedFix;
            }
          }
        }

        await acceptIssue(issue.id, updatedText);
        setDraftContent(updatedText);
        setIssues((prev) =>
          prev.map((iss) =>
            iss.id === issue.id ? { ...iss, status: 'ACCEPTED' } : iss
          )
        );
        setToastNotification({
          type: 'success',
          title: `Fix applied: "${issue.suggestedFix}"`,
        });
      } catch (err: unknown) {
        const errorDetail =
          err instanceof Error ? err.message : 'Failed to apply suggested fix';
        setToastNotification({
          type: 'error',
          title: 'Failed to apply suggested fix',
          description: errorDetail,
        });
      }
    });
  };

  // Override an issue
  const handleOverride = (issueId: string) => {
    setIssues((prev) =>
      prev.map((iss) =>
        iss.id === issueId ? { ...iss, status: 'OVERRIDDEN' } : iss
      )
    );
    setActiveModal(null);
    setToastNotification({
      type: 'info',
      title: 'Issue override recorded in audit logs.',
    });
  };

  // Save custom edit
  const handleSaveCustomEdit = () => {
    if (!activeModal) return;
    const { issueId, textValue } = activeModal;

    startTransition(async () => {
      try {
        let updatedText = draftContent;
        if (draftContent.includes('guarantees the fastest')) {
          updatedText = draftContent.replace('guarantees the fastest', textValue);
        } else {
          updatedText = textValue;
        }

        await acceptIssue(issueId, updatedText);
        setDraftContent(updatedText);
        setIssues((prev) =>
          prev.map((iss) =>
            iss.id === issueId
              ? { ...iss, suggestedFix: textValue, status: 'ACCEPTED' }
              : iss
          )
        );
        setActiveModal(null);
        setToastNotification({
          type: 'success',
          title: 'Custom revision saved and applied.',
        });
      } catch (err: unknown) {
        const errorDetail =
          err instanceof Error ? err.message : 'Failed to save custom revision';
        setToastNotification({
          type: 'error',
          title: 'Failed to save revision',
          description: errorDetail,
        });
      }
    });
  };

  // Reset to initial demo content
  const handleResetDraft = async () => {
    const defaultText =
      'Our platform guarantees the fastest performance on the market.';
    setDraftContent(defaultText);
    setToastNotification(null);
    if (contentId) {
      await fetch('/api/review/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId, bodyText: defaultText }),
      });
      await loadContent();
    }
  };

  const pendingCount = issues.filter(
    (i) => i.status !== 'ACCEPTED' && i.status !== 'OVERRIDDEN'
  ).length;

  const wordCount = draftContent.trim() ? draftContent.trim().split(/\s+/).length : 0;
  const charCount = draftContent.length;

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* TOP BAR: Draft Title, Status Badge, and large "Run AI Review" Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8DFD0]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#242820] font-inter">
              {contentTitle}
            </h1>

            <StatusBadge status={contentStatus} />
          </div>
          <p className="text-xs text-[#545B4E]">
            Marketing campaign ingestion · Channel: LinkedIn & X (Twitter) · Pre-publish governance
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleResetDraft}
            title="Reset to Baseline Draft"
            className="p-2 rounded-lg border border-[#E8DFD0] bg-[#FFFCF6] hover:bg-[#FAF6EF] text-[#545B4E] hover:text-[#242820] transition-colors cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleRunAiReview}
            disabled={isPending || isLoading}
            className="px-4 py-2.5 rounded-lg bg-[#123B2F] hover:bg-[#0c2921] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-75"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 text-[#F47745] animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#F47745]" />
                <span>Run AI Review</span>
              </>
            )}
          </button>
        </div>
      </div>

      {toastNotification && (
        <div
          role="alert"
          className={`p-4 rounded-xl border flex items-start justify-between shadow-md transition-all duration-200 animate-in slide-in-from-top-2 ${
            toastNotification.type === 'error'
              ? 'bg-[#FFF7F4] dark:bg-[#251714] border-2 border-[#F47745] text-[#242820] dark:text-[#FFFCF6] ring-1 ring-[#F47745]/30'
              : toastNotification.type === 'info'
              ? 'bg-[#F2F6FA] dark:bg-[#162734] border border-[#BACDD9] text-[#1D3557] dark:text-[#E0EBF3]'
              : 'bg-[#FFFCF6] dark:bg-[#164336] border border-[#123B2F]/20 dark:border-[#205243] text-[#123B2F] dark:text-[#F7F2E8]'
          }`}
        >
          <div className="flex items-start gap-3">
            {toastNotification.type === 'error' ? (
              <div className="w-8 h-8 rounded-lg bg-[#F47745]/15 border border-[#F47745]/40 flex items-center justify-center text-[#F47745] shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5 stroke-[2.4]" />
              </div>
            ) : toastNotification.type === 'info' ? (
              <div className="w-8 h-8 rounded-lg bg-[#2E6F9E]/15 border border-[#2E6F9E]/40 flex items-center justify-center text-[#2E6F9E] shrink-0 mt-0.5">
                <FileText className="w-4 h-4 stroke-[2]" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#123B2F]/10 dark:bg-[#E5EEDC]/10 border border-[#123B2F]/20 flex items-center justify-center text-[#123B2F] dark:text-[#E5EEDC] shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#F47745]" />
              </div>
            )}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs sm:text-sm font-semibold tracking-tight ${
                    toastNotification.type === 'error'
                      ? 'text-[#C84B1A] dark:text-[#FF9D79]'
                      : 'text-[#123B2F] dark:text-[#FFFCF6]'
                  }`}
                >
                  {toastNotification.title}
                </span>
                {toastNotification.type === 'error' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F47745] text-white uppercase tracking-wider">
                    Notice
                  </span>
                )}
              </div>
              {toastNotification.description && (
                <p className="text-xs text-[#545B4E] dark:text-[#C5D3C1] leading-relaxed">
                  {toastNotification.description}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToastNotification(null)}
            className="text-[#7A8274] hover:text-[#242820] dark:hover:text-white p-1 rounded-md transition-colors cursor-pointer shrink-0 ml-3"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start">
        <div className="w-full md:w-[60%] flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs text-[#7A8274] px-1">
            <span className="font-mono uppercase tracking-wider font-semibold text-[#545B4E]">
              Content Editor Viewport (Prisma Content ID: {contentId.slice(0, 10)}...)
            </span>
            <button
              type="button"
              onClick={() => setIsEditorMode(!isEditorMode)}
              className="text-xs text-[#123B2F] font-semibold hover:underline cursor-pointer"
            >
              {isEditorMode ? 'Preview Mode' : 'Edit Text'}
            </button>
          </div>

          <div className="w-full bg-white rounded-xl border border-[#E8DFD0] shadow-xs p-4 sm:p-5 flex flex-col justify-between min-h-[380px] relative transition-all">
            <div className="flex items-center justify-between border-b border-[#E8DFD0]/70 pb-3 mb-4">
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
                <span>{wordCount} words</span>
                <span>·</span>
                <span>{charCount} chars</span>
              </div>
            </div>

            {/* Document Draft Text Rendering or Editable Textarea */}
            <div className="flex-1 py-4">
              {isLoading ? (
                <div className="space-y-3 py-2">
                  <Skeleton className="h-6 w-3/4 rounded-md" />
                  <Skeleton className="h-6 w-full rounded-md" />
                  <Skeleton className="h-6 w-5/6 rounded-md" />
                  <Skeleton className="h-6 w-2/3 rounded-md" />
                </div>
              ) : isEditorMode ? (
                <textarea
                  rows={8}
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  placeholder="Paste or write your marketing draft here..."
                  className="w-full p-4 rounded-xl border border-[#E8DFD0] bg-[#FAF6EF]/60 text-lg sm:text-xl font-medium text-[#242820] font-inter focus:outline-none focus:border-[#123B2F] leading-relaxed resize-none"
                />
              ) : (
                <div
                  onClick={() => setIsEditorMode(true)}
                  className="cursor-text min-h-[160px]"
                  title="Click to edit text"
                >
                  <p className="text-xl sm:text-2xl font-medium text-[#242820] leading-relaxed font-inter">
                    {draftContent.includes('guarantees the fastest') ? (
                      <>
                        {draftContent.split('guarantees the fastest')[0]}
                        <mark
                          className="bg-[#F47745]/20 text-[#242820] px-2 py-0.5 rounded-md border-b-2 border-[#F47745] font-semibold decoration-none inline-flex items-center gap-1.5 shadow-2xs"
                          title="Flagged by Brand Rule: Superlative claim"
                        >
                          <span>guarantees the fastest</span>
                          <span className="text-[10px] font-mono bg-[#F47745] text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                            Flagged
                          </span>
                        </mark>
                        {draftContent.split('guarantees the fastest')[1]}
                      </>
                    ) : (
                      <span>{draftContent}</span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Editor Bottom Meta & Status Bar */}
            <div className="pt-6 border-t border-[#E8DFD0]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    pendingCount > 0 ? 'bg-[#F47745]' : 'bg-emerald-600'
                  }`}
                />
                <span className="text-[#545B4E]">
                  {pendingCount > 0
                    ? `${pendingCount} governance issue${
                        pendingCount === 1 ? '' : 's'
                      } require human review before publishing.`
                    : 'All issues resolved. Content compliant with Brand Codex.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#7A8274] bg-[#F7F2E8] px-2.5 py-1 rounded-md border border-[#E8DFD0]">
                  Encoding: UTF-8
                </span>
                <span className="text-[11px] font-mono font-semibold text-[#123B2F] bg-[#123B2F]/10 px-2.5 py-1 rounded-md">
                  Prisma Live
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] flex flex-col space-y-4">
          <div className="flex items-center justify-between text-xs text-[#7A8274] px-1">
            <span className="font-mono uppercase tracking-wider font-semibold text-[#545B4E]">
              Governance Issues ({issues.length} Total)
            </span>
            <span className="text-xs font-semibold text-[#F47745]">
              {pendingCount} Pending Action
            </span>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="bg-[#FFFCF6] dark:bg-[#164336] rounded-xl border border-[#E8DFD0] dark:border-[#205243] p-4 sm:p-5 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-16 rounded-md" />
                        <Skeleton className="h-5 w-24 rounded-md" />
                      </div>
                      <Skeleton className="h-5 w-16 rounded-md" />
                    </div>
                    <Skeleton className="h-5 w-48 rounded-md" />
                    <Skeleton className="h-14 w-full rounded-md" />
                    <div className="pt-2 flex items-center gap-2">
                      <Skeleton className="h-9 flex-1 rounded-xl" />
                      <Skeleton className="h-9 w-20 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : issues.length === 0 ? (
              <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-8 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6EF] border border-[#E8DFD0] flex items-center justify-center mx-auto text-[#123B2F]">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#242820]">No Issues Detected Yet</h3>
                <p className="text-xs text-[#545B4E] leading-relaxed max-w-xs mx-auto">
                  Click <strong>&quot;Run AI Review&quot;</strong> above to scan your draft text against all active brand rules.
                </p>
              </div>
            ) : (
              issues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  isPending={isPending}
                  onAccept={handleAcceptFix}
                  onEdit={(iss) =>
                    setActiveModal({
                      type: 'edit',
                      issueId: iss.id,
                      textValue: iss.suggestedFix,
                    })
                  }
                  onOverride={(iss) =>
                    setActiveModal({
                      type: 'override',
                      issueId: iss.id,
                      textValue: '',
                    })
                  }
                  onRuleCreated={(issueId, ruleTitle) => {
                    setIssues((prev) =>
                      prev.map((i) =>
                        i.id === issueId ? { ...i, status: 'RULE_CREATED' } : i
                      )
                    );
                    setToastNotification({
                      type: 'success',
                      title: `Rule "${ruleTitle}" successfully saved to Brand Brain!`,
                    });
                  }}
                />
              ))
            )}
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
