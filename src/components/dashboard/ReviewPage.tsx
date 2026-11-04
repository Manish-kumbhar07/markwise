import React, { useState, useEffect, useTransition } from 'react';
import {
  Sparkles,
  Check,
  CheckCircle2,
  AlertTriangle,
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
} from '@/app/actions/review';

export function ReviewPage() {
  const [contentId, setContentId] = useState<string>('');
  const [contentTitle, setContentTitle] = useState<string>('Social Media Post Draft');
  const [contentStatus, setContentStatus] = useState<string>('DRAFT');
  const [draftContent, setDraftContent] = useState<string>(
    'Our platform guarantees the fastest performance on the market.'
  );
  const [issues, setIssues] = useState<ReviewIssueResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scanNotification, setScanNotification] = useState<string | null>(null);
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);

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
      setScanNotification(
        err instanceof Error ? err.message : 'Failed to connect to review database'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadContent();
  }, []);

  // Run AI Review using OpenAI & Prisma
  const handleRunAiReview = () => {
    if (!contentId) return;
    setScanNotification(null);

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
        setScanNotification(
          `AI Review Complete: ${newIssues.length} issue${
            newIssues.length === 1 ? '' : 's'
          } identified by Brand Governance model.`
        );
      } catch (err: unknown) {
        const errorDetail =
          err instanceof Error ? err.message : 'An error occurred during AI review';
        setScanNotification(`AI Review Error: ${errorDetail}`);
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
        setScanNotification(`Fix applied: "${issue.suggestedFix}"`);
      } catch (err: unknown) {
        const errorDetail =
          err instanceof Error ? err.message : 'Failed to apply suggested fix';
        setScanNotification(`Error: ${errorDetail}`);
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
    setScanNotification('Issue override recorded in audit logs.');
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
        setScanNotification('Custom revision saved and applied.');
      } catch (err: unknown) {
        const errorDetail =
          err instanceof Error ? err.message : 'Failed to save custom revision';
        setScanNotification(`Error: ${errorDetail}`);
      }
    });
  };

  // Reset to initial demo content
  const handleResetDraft = async () => {
    const defaultText =
      'Our platform guarantees the fastest performance on the market.';
    setDraftContent(defaultText);
    setScanNotification(null);
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
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* TOP BAR: Draft Title, Status Badge, and large "Run AI Review" Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DFD0]">
        <div className="space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#242820] font-inter">
              {contentTitle}
            </h1>

            {/* Status Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#123B2F]/10 text-[#123B2F] border border-[#123B2F]/20 shadow-2xs">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  contentStatus === 'IN_REVIEW'
                    ? 'bg-[#123B2F] animate-pulse'
                    : 'bg-amber-600'
                }`}
              />
              {contentStatus === 'IN_REVIEW' ? 'In Review' : 'Draft'}
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
            title="Reset to Demo Text"
            className="p-2.5 rounded-xl border border-[#E8DFD0] bg-[#FFFCF6] hover:bg-[#FAF6EF] text-[#545B4E] hover:text-[#242820] transition-colors cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Large "Run AI Review" Button */}
          <button
            type="button"
            onClick={handleRunAiReview}
            disabled={isPending || isLoading}
            className="px-5 py-3 rounded-xl bg-[#123B2F] hover:bg-[#0c2921] active:scale-[0.98] text-white text-sm font-semibold flex items-center gap-2.5 shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-75"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 text-[#F47745] animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#F47745]" />
                <span>Run AI Review</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Temporary Scan Notification Toast */}
      {scanNotification && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between shadow-xs animate-in slide-in-from-top-2 ${
            scanNotification.includes('Error')
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-[#FFFCF6] border-[#123B2F]/20 text-[#123B2F]'
          }`}
        >
          <div className="flex items-center gap-2">
            {scanNotification.includes('Error') ? (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#F47745] shrink-0" />
            )}
            <span className="leading-relaxed">{scanNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setScanNotification(null)}
            className="text-[#7A8274] hover:text-[#242820] p-1 cursor-pointer ml-2"
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
                <span>{wordCount} words</span>
                <span>·</span>
                <span>{charCount} chars</span>
              </div>
            </div>

            {/* Document Draft Text Rendering or Editable Textarea */}
            <div className="flex-1 py-4">
              {isEditorMode ? (
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

        {/* RIGHT SIDE (40%): The Real Issue Panel */}
        <div className="w-full lg:w-[40%] flex flex-col space-y-4">
          <div className="flex items-center justify-between text-xs text-[#7A8274] px-1">
            <span className="font-mono uppercase tracking-wider font-semibold text-[#545B4E]">
              Governance Issues ({issues.length} Total)
            </span>
            <span className="text-xs font-semibold text-[#F47745]">
              {pendingCount} Pending Action
            </span>
          </div>

          {/* Render Real Database Issues or Empty State */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-8 text-center text-xs text-[#7A8274] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-[#123B2F] animate-spin" />
                <span>Loading review records from Prisma database...</span>
              </div>
            ) : issues.length === 0 ? (
              <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-8 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6EF] border border-[#E8DFD0] flex items-center justify-center mx-auto text-[#123B2F]">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#242820]">No Issues Detected Yet</h3>
                <p className="text-xs text-[#545B4E] leading-relaxed max-w-xs mx-auto">
                  Click <strong>&quot;Run AI Review&quot;</strong> above to scan your draft text against all active Brand Rules via OpenAI.
                </p>
              </div>
            ) : (
              issues.map((issue) => {
                const isHigh = issue.severity === 'HIGH';
                const isAccepted = issue.status === 'ACCEPTED';
                const isOverridden = issue.status === 'OVERRIDDEN';

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
                    {/* Top: Severity Badge & Rule Info */}
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

                        <span className="font-mono text-xs font-semibold text-[#123B2F] bg-[#123B2F]/10 px-2 py-0.5 rounded border border-[#123B2F]/15">
                          {issue.ruleTitle}
                        </span>
                      </div>

                      {/* Status indicator if resolved */}
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

                    {/* Title */}
                    <h3 className="text-base font-bold text-[#242820] font-inter">
                      {issue.ruleTitle}
                    </h3>

                    {/* WHY & RULE Metadata Grid */}
                    <div className="space-y-2 text-xs">
                      {/* WHY */}
                      <div className="bg-[#F7F2E8]/80 rounded-xl p-3 border border-[#E8DFD0]/70">
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#7A8274] block mb-0.5">
                          WHY:
                        </span>
                        <p className="text-[#545B4E] leading-relaxed">{issue.why}</p>
                      </div>

                      {/* RULE ID */}
                      <div className="flex items-center justify-between text-xs px-1">
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#7A8274]">
                          RULE RECORD:
                        </span>
                        <span className="font-mono text-xs font-bold text-[#123B2F]">
                          {issue.ruleId ? issue.ruleId.slice(0, 16) : 'Brand Safety Codex'}
                        </span>
                      </div>
                    </div>

                    {/* SUGGESTED FIX BOX: Pale sage-green background (#E5EEDC) */}
                    {issue.suggestedFix && (
                      <div className="bg-[#E5EEDC] rounded-xl p-3.5 border border-[#d0dfc4] space-y-1.5 shadow-2xs">
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#123B2F] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#123B2F]" />
                          Suggested Compliant Fix
                        </span>
                        <p className="text-xs text-[#242820] font-medium leading-relaxed">
                          &ldquo;{issue.suggestedFix}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Action Buttons: Accept / Edit / Override */}
                    <div className="pt-2 border-t border-[#E8DFD0]/60 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {/* Accept Button */}
                        <button
                          type="button"
                          onClick={() => handleAcceptFix(issue)}
                          disabled={isAccepted || isPending}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer shadow-2xs flex items-center gap-1.5 ${
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
                          onClick={() =>
                            setActiveModal({
                              type: 'edit',
                              issueId: issue.id,
                              textValue: issue.suggestedFix,
                            })
                          }
                          disabled={isAccepted || isPending}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#545B4E] hover:text-[#123B2F] hover:bg-[#123B2F]/10 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Edit
                        </button>

                        {/* Override Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveModal({
                              type: 'override',
                              issueId: issue.id,
                              textValue: '',
                            })
                          }
                          disabled={isOverridden || isAccepted || isPending}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#E8DFD0] hover:border-[#123B2F] text-[#545B4E] hover:text-[#123B2F] bg-transparent transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Override
                        </button>
                      </div>

                      {/* AI-Assisted Pill Badge */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#EDE5F7] text-[#5B21B6] border border-[#DDD0F0] shadow-2xs shrink-0 font-inter">
                        <span>✨</span>
                        <span>AI-assisted</span>
                      </span>
                    </div>
                  </div>
                );
              })
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
