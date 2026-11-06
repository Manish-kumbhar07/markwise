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
  saveDraftContent,
  type ReviewIssueResult,
} from '@/actions/review';
import { IssueCard } from '@/components/IssueCard';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from './StatusBadge';

export function ReviewPage() {
  const [contentId, setContentId] = useState<string>('');
  const [contentTitle, setContentTitle] = useState<string>('Untitled Draft');
  const [contentStatus, setContentStatus] = useState<string>('DRAFT');
  const [draftContent, setDraftContent] = useState<string>('');
  const [issues, setIssues] = useState<ReviewIssueResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastNotification, setToastNotification] = useState<{
    type: 'success' | 'error' | 'info';
    title: string;
    description?: string;
  } | null>(null);
  const [isEditorMode, setIsEditorMode] = useState<boolean>(true);

  useEffect(() => {
    if (!toastNotification) return;
    const timer = setTimeout(() => {
      setToastNotification(null);
    }, 7000);
    return () => clearTimeout(timer);
  }, [toastNotification]);

  const [isPending, startTransition] = useTransition();

  const [activeModal, setActiveModal] = useState<{
    type: 'edit' | 'override';
    issueId: string;
    textValue: string;
  } | null>(null);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const data = await getReviewContent();
      setContentId(data.id);
      setContentTitle(data.title || 'Untitled Draft');
      setContentStatus(data.status || 'DRAFT');
      setDraftContent(data.bodyText || '');
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
    const handleWsChanged = () => {
      void loadContent();
    };
    window.addEventListener('workspace-changed', handleWsChanged);
    return () => window.removeEventListener('workspace-changed', handleWsChanged);
  }, []);

  const handleRunAiReview = () => {
    if (!contentId) return;

    if (!draftContent.trim()) {
      setToastNotification({
        type: 'info',
        title: 'Empty Draft',
        description: 'Please paste or write your marketing copy before running the AI review.',
      });
      return;
    }

    setToastNotification(null);

    startTransition(async () => {
      try {
        const newIssues = await runAIReview(contentId, draftContent, contentTitle);
        setIssues(newIssues);
        setContentStatus('IN_REVIEW');
        setToastNotification({
          type: 'success',
          title: `AI Review Complete: ${newIssues.length} issue${
            newIssues.length === 1 ? '' : 's'
          } identified by Brand Governance model.`,
        });
      } catch (err: unknown) {
        console.error('[AI Review Error]:', err);
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

  const handleAcceptFix = (issue: ReviewIssueResult) => {
    startTransition(async () => {
      try {
        let updatedText = draftContent;

        if (issue.suggestedFix) {
          updatedText = issue.suggestedFix;
        }

        await acceptIssue(issue.id, updatedText);
        setDraftContent(updatedText);
        setIssues((prev) =>
          prev.map((iss) => (iss.id === issue.id ? { ...iss, status: 'ACCEPTED' } : iss))
        );
        setToastNotification({
          type: 'success',
          title: 'Revision Accepted: Draft updated with compliant language.',
        });
      } catch (err: unknown) {
        const errorDetail =
          err instanceof Error ? err.message : 'Failed to accept revision';
        setToastNotification({
          type: 'error',
          title: 'Could not apply fix',
          description: errorDetail,
        });
      }
    });
  };

  const handleOverrideIssue = () => {
    if (!activeModal) return;
    const { issueId, textValue } = activeModal;

    startTransition(async () => {
      try {
        const reason = textValue.trim() || 'Pre-authorized compliance exception';
        await acceptIssue(issueId, undefined);

        setIssues((prev) =>
          prev.map((iss) =>
            iss.id === issueId
              ? {
                  ...iss,
                  status: 'OVERRIDDEN',
                  why: `${iss.why} [Human Override: ${reason}]`,
                }
              : iss
          )
        );
        setActiveModal(null);
        setToastNotification({
          type: 'info',
          title: 'Issue Override Recorded',
          description: 'Logged to audit trail with cryptographic timestamp.',
        });
      } catch (err: unknown) {
        const errorDetail =
          err instanceof Error ? err.message : 'Failed to override issue';
        setToastNotification({
          type: 'error',
          title: 'Override Failed',
          description: errorDetail,
        });
      }
    });
  };

  const handleSaveCustomEdit = () => {
    if (!activeModal) return;
    const { issueId, textValue } = activeModal;

    startTransition(async () => {
      try {
        const updatedText = textValue;

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

  const handleResetDraft = async () => {
    setDraftContent('');
    setToastNotification(null);
    if (contentId) {
      await saveDraftContent(contentId, '', contentTitle);
      await loadContent();
    }
  };

  const wordCount = draftContent.trim()
    ? draftContent.trim().split(/\s+/).length
    : 0;
  const charCount = draftContent.length;
  const pendingCount = issues.filter((iss) => iss.status === 'OPEN').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DFD0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123B2F] mb-1">
            <Shield className="w-4 h-4 text-[#F47745]" />
            <span>Pre-Publication Review</span>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <input
              type="text"
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
              onBlur={() => {
                if (contentId) {
                  void saveDraftContent(contentId, draftContent, contentTitle);
                }
              }}
              placeholder="Untitled Draft"
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#242820] font-inter bg-transparent border-b border-transparent hover:border-[#E8DFD0] focus:border-[#123B2F] focus:outline-none transition-colors"
            />
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
            title="Clear Draft"
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
                <span>Analyzing with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#F47745]" />
                <span>Run AI Review</span>
              </>
            )}
          </button>
        </div>
      </header>

      {toastNotification && (
        <div
          role="alert"
          className={`p-4 rounded-xl border flex items-start justify-between shadow-md transition-all duration-200 animate-in slide-in-from-top-2 ${
            toastNotification.type === 'error'
              ? 'bg-[#FFF7F4] border-2 border-[#F47745] text-[#242820] ring-1 ring-[#F47745]/30'
              : toastNotification.type === 'success'
              ? 'bg-[#F2F7F4] border-2 border-[#123B2F] text-[#123B2F]'
              : 'bg-[#F7F2E8] border border-[#E8DFD0] text-[#242820]'
          }`}
        >
          <div className="flex items-start gap-3">
            {toastNotification.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-[#F47745] shrink-0 mt-0.5" />
            ) : toastNotification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#123B2F] shrink-0 mt-0.5" />
            ) : (
              <Shield className="w-5 h-5 text-[#123B2F] shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold font-inter">
                  {toastNotification.title}
                </span>
                {toastNotification.type === 'error' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F47745] text-white uppercase tracking-wider">
                    Notice
                  </span>
                )}
              </div>
              {toastNotification.description && (
                <p className="text-xs text-[#545B4E] leading-relaxed">
                  {toastNotification.description}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToastNotification(null)}
            className="text-[#7A8274] hover:text-[#242820] p-1 rounded-md transition-colors cursor-pointer shrink-0 ml-3"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start">
        <section aria-label="Draft Content Editor" className="w-full md:w-[60%] flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs text-[#7A8274] px-1">
            <span className="font-mono uppercase tracking-wider font-semibold text-[#545B4E]">
              Content Editor Viewport {contentId ? `(ID: ${contentId.slice(0, 10)}...)` : ''}
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
                  className="w-full p-4 rounded-xl border border-[#E8DFD0] bg-[#FAF6EF]/60 text-base sm:text-lg font-medium text-[#242820] font-inter focus:outline-none focus:border-[#123B2F] leading-relaxed resize-none min-h-[220px]"
                />
              ) : (
                <div
                  onClick={() => setIsEditorMode(true)}
                  className="cursor-text min-h-[160px]"
                  title="Click to edit text"
                >
                  <p className="text-base sm:text-lg font-medium text-[#242820] leading-relaxed font-inter whitespace-pre-wrap">
                    {draftContent ? (
                      <span>{draftContent}</span>
                    ) : (
                      <span className="text-[#7A8274] italic">
                        Draft is currently empty. Click here or switch to Edit mode to paste or write copy.
                      </span>
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
        </section>

        <aside aria-label="Governance Issues" className="w-full md:w-[40%] flex flex-col space-y-4">
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
                    className="bg-[#FFFCF6] rounded-xl border border-[#E8DFD0] p-4 sm:p-5 shadow-xs space-y-3"
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
                      title: `New Living Brand Rule Created: "${ruleTitle}"`,
                      description: 'Added to your brand rulebook in Prisma.',
                    });
                  }}
                />
              ))
            )}
          </div>
        </aside>
      </div>

      {/* Edit Fix Modal */}
      {activeModal?.type === 'edit' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#E8DFD0]/70 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#123B2F]" />
                <h3 className="text-base font-bold text-[#242820]">Customize Suggested Fix</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#7A8274] hover:text-[#242820] p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#545B4E]">
              Modify the proposed phrasing before applying it to your live document draft.
            </p>

            <textarea
              rows={4}
              value={activeModal.textValue}
              onChange={(e) =>
                setActiveModal({ ...activeModal, textValue: e.target.value })
              }
              className="w-full text-xs p-3 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:ring-2 focus:ring-[#123B2F] resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DFD0]/70">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DFD0] text-xs font-semibold text-[#545B4E] hover:bg-[#F7F2E8]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomEdit}
                disabled={isPending}
                className="px-4 py-2 rounded-xl bg-[#123B2F] text-white text-xs font-semibold hover:bg-[#1b5343] flex items-center gap-2 disabled:opacity-50"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Apply to Draft</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Override Rule Modal */}
      {activeModal?.type === 'override' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#E8DFD0]/70 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#F47745]" />
                <h3 className="text-base font-bold text-[#242820]">Document Governance Override</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#7A8274] hover:text-[#242820] p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#545B4E]">
              Provide justification for bypassing this brand rule constraint. This rationale will be permanently recorded in the immutable compliance audit log.
            </p>

            <textarea
              rows={3}
              placeholder="e.g. Legal counsel approved exception for Q4 campaign launch via Ticket #LG-8941..."
              value={activeModal.textValue}
              onChange={(e) =>
                setActiveModal({ ...activeModal, textValue: e.target.value })
              }
              className="w-full text-xs p-3 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:ring-2 focus:ring-[#123B2F] resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DFD0]/70">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DFD0] text-xs font-semibold text-[#545B4E] hover:bg-[#F7F2E8]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleOverrideIssue}
                disabled={isPending}
                className="px-4 py-2 rounded-xl bg-[#F47745] text-white text-xs font-semibold hover:bg-[#e06636] flex items-center gap-2 disabled:opacity-50"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Override</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
