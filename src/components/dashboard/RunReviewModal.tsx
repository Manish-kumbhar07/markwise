import { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { DashboardPage } from '../../utils/dashboard';
import { createDraft, runAIReview, type ReviewIssueResult } from '@/actions/review';

interface RunReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (page: DashboardPage) => void;
}

export function RunReviewModal({ isOpen, onClose, onComplete }: RunReviewModalProps) {
  const [draftText, setDraftText] = useState('');
  const [draftTitle, setDraftTitle] = useState('');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedIssues, setScannedIssues] = useState<ReviewIssueResult[] | null>(null);

  if (!isOpen) return null;

  const handleStartReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftText.trim()) {
      setError('Please paste or enter copy to scan.');
      return;
    }

    setError(null);
    setScanning(true);

    try {
      const title = draftTitle.trim() || 'Quick Audit Scan';
      const created = await createDraft(title, draftText.trim());
      const issues = await runAIReview(created.id, draftText.trim(), title);
      setScannedIssues(issues);
    } catch (err: unknown) {
      console.error('Quick Audit failed:', err);
      setError(
        err instanceof Error ? err.message : 'AI Audit failed. Please try again in a moment.'
      );
    } finally {
      setScanning(false);
    }
  };

  const handleOpenReviewPage = () => {
    onClose();
    onComplete('review');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="run-review-title"
    >
      <div className="bg-[#FFFCF6] border border-[#E8DFD0] rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#7A8274] hover:text-[#242820] hover:bg-[#E8DFD0]/40 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#123B2F] text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#F47745]" />
          </div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#123B2F]">
            Instant Governance Audit
          </span>
        </div>

        <h3 id="run-review-title" className="text-2xl font-bold text-[#242820] font-inter">
          Quick Audit Scan
        </h3>
        <p className="mt-1 text-xs text-[#545B4E]">
          Paste any proposed marketing copy to evaluate against your Brand Rules and Fact Vault evidence anchors using Google Gemini.
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {scannedIssues === null ? (
          <form onSubmit={handleStartReview} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#242820] mb-1">
                Campaign Title (Optional)
              </label>
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="e.g. Q3 Launch Announcement or LinkedIn Ad Copy"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-xs text-[#242820] focus:outline-none focus:border-[#123B2F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#242820] mb-1">
                Content Draft <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-xs leading-relaxed text-[#242820] focus:outline-none focus:border-[#123B2F] font-sans resize-none"
                placeholder="Paste campaign copy, headline, product description, or social post..."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={scanning}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#123B2F] hover:bg-[#0c2921] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] disabled:opacity-60"
              >
                {scanning ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#F47745] animate-spin" />
                    <span>Auditing with Google Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#F47745]" />
                    <span>Run Gemini AI Audit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-5 space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl border border-[#E8DFD0] bg-[#FAF6EF]">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0]/60 mb-2">
                <span className="text-xs font-bold text-[#123B2F] flex items-center gap-1.5">
                  {scannedIssues.length === 0 ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Compliant with Brand Guidelines</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-[#F47745]" />
                      <span>{scannedIssues.length} Governance Issues Identified</span>
                    </>
                  )}
                </span>
                <span className="text-[10px] font-mono text-[#7A8274]">
                  Gemini Verified
                </span>
              </div>

              {scannedIssues.length === 0 ? (
                <p className="text-xs text-[#545B4E]">
                  No violations or unsubstantiated claims were detected in your text.
                </p>
              ) : (
                <div className="space-y-2.5 max-h-56 overflow-y-auto">
                  {scannedIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-2.5 rounded-lg bg-white border border-[#E8DFD0] space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#242820]">
                          {issue.ruleTitle}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-[#545B4E] text-[11px] leading-relaxed">
                        {issue.why}
                      </p>
                      {issue.suggestedFix && (
                        <div className="text-[11px] bg-emerald-50 text-emerald-800 p-1.5 rounded border border-emerald-200 font-mono">
                          Suggested Fix: {issue.suggestedFix}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setScannedIssues(null);
                  setDraftText('');
                  setDraftTitle('');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#E8DFD0] text-xs font-semibold text-[#545B4E] hover:bg-[#F7F2E8] transition-colors"
              >
                Scan Another Draft
              </button>
              <button
                type="button"
                onClick={handleOpenReviewPage}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#123B2F] hover:bg-[#0c2921] transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Open in Editor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
