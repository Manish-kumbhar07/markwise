import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  GitCommit,
  ExternalLink,
  Shield,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  Building2,
  ChevronRight,
  Info,
} from 'lucide-react';
import { INSPECTOR_CASES, FlaggedClaim } from '../data/inspectorData';
import { calculateComplianceScore } from '../utils/governance';

export function LiveInspector() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('fintech-card');
  const [fixedClaimIds, setFixedClaimIds] = useState<Record<string, boolean>>({});
  const [activeClaimId, setActiveClaimId] = useState<string>('claim-1');
  const [showEvidenceModal, setShowEvidenceModal] = useState<boolean>(false);

  const currentCase =
    INSPECTOR_CASES.find((c) => c.id === selectedCaseId) || INSPECTOR_CASES[0];

  const activeClaim: FlaggedClaim =
    currentCase.flaggedClaims.find((c) => c.id === activeClaimId) ||
    currentCase.flaggedClaims[0];

  const totalClaims = currentCase.flaggedClaims.length;
  const fixedCount = currentCase.flaggedClaims.filter((c) => fixedClaimIds[c.id]).length;
  const complianceScore = calculateComplianceScore(totalClaims, fixedCount);

  const handleApplyFix = (claimId: string) => {
    setFixedClaimIds((prev) => ({
      ...prev,
      [claimId]: true,
    }));
  };

  const handleResetCase = () => {
    setFixedClaimIds({});
  };

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
    setFixedClaimIds({});
    const nextCase = INSPECTOR_CASES.find((c) => c.id === id);
    if (nextCase && nextCase.flaggedClaims.length > 0) {
      setActiveClaimId(nextCase.flaggedClaims[0].id);
    }
  };

  return (
    <section id="inspector" className="py-16 md:py-24 bg-[#FCFAF5] border-y border-[#E8DFD0] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#174C3B]/10 text-[#174C3B] border border-[#174C3B]/20 mb-3">
            <Shield className="w-3.5 h-3.5 text-[#174C3B]" />
            <span>Interactive Governance Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242820] font-inter">
            See Markwise in Action
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#545B4E]">
            Inspect live enterprise drafts, review causal explanations, verify evidence trails, and watch rules version automatically when humans approve fixes.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#FAF6EF] rounded-xl border border-[#E8DFD0]">
            {INSPECTOR_CASES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectCase(item.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                  selectedCaseId === item.id
                    ? 'bg-[#174C3B] text-white shadow-xs'
                    : 'text-[#545B4E] hover:text-[#174C3B] hover:bg-white/60'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-[#E8DFD0] text-xs font-medium">
              <span className="text-[#7A8274]">Compliance Score:</span>
              <span
                className={`font-mono font-bold text-sm ${
                  complianceScore === 100 ? 'text-[#174C3B]' : 'text-[#F47745]'
                }`}
              >
                {complianceScore}%
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetCase}
              className="p-2 text-[#7A8274] hover:text-[#242820] hover:bg-[#FAF6EF] rounded-lg border border-[#E8DFD0] transition-colors"
              title="Reset sandbox state"
              aria-label="Reset sandbox state"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Inspector Split Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: The Content Document Viewer (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8DFD0] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              {/* Document Header Bar */}
              <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs text-[#7A8274]">
                  <Building2 className="w-4 h-4 text-[#174C3B]" />
                  <span className="font-medium text-[#242820]">{currentCase.industry}</span>
                  <span>·</span>
                  <span>{currentCase.sourceType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF6EF] border border-[#E8DFD0] text-[#7A8274]">
                    Pre-Publish Staging
                  </span>
                </div>
              </div>

              {/* Document Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#242820] font-inter mb-4">
                {currentCase.draftHeading}
              </h3>

              {/* Document Body with Interactive Flagged Claims */}
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#242820] bg-[#FCFAF5] p-5 sm:p-6 rounded-xl border border-[#E8DFD0]">
                <p>
                  Welcome to our global business ecosystem.{' '}
                  {/* First Claim */}
                  {fixedClaimIds['claim-1'] || fixedClaimIds['claim-3'] || fixedClaimIds['claim-5'] ? (
                    <span className="bg-[#edf4f1] text-[#174C3B] font-medium px-1.5 py-0.5 rounded border border-[#174C3B]/30 transition-all inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 inline text-[#174C3B]" />
                      {currentCase.flaggedClaims[0].suggestedText}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveClaimId(currentCase.flaggedClaims[0].id)}
                      className={`text-left underline decoration-2 underline-offset-4 font-medium transition-all rounded px-1 cursor-pointer ${
                        activeClaimId === currentCase.flaggedClaims[0].id
                          ? 'bg-[#F47745]/20 text-[#242820] decoration-[#F47745]'
                          : 'bg-[#F47745]/10 text-[#242820] decoration-[#F47745]/60 hover:bg-[#F47745]/25'
                      }`}
                    >
                      {currentCase.flaggedClaims[0].originalText}
                    </button>
                  )}
                  , and{' '}
                  {/* Second Claim */}
                  {currentCase.flaggedClaims[1] && (
                    fixedClaimIds[currentCase.flaggedClaims[1].id] ? (
                      <span className="bg-[#edf4f1] text-[#174C3B] font-medium px-1.5 py-0.5 rounded border border-[#174C3B]/30 transition-all inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 inline text-[#174C3B]" />
                        {currentCase.flaggedClaims[1].suggestedText}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveClaimId(currentCase.flaggedClaims[1].id)}
                        className={`text-left underline decoration-2 underline-offset-4 font-medium transition-all rounded px-1 cursor-pointer ${
                          activeClaimId === currentCase.flaggedClaims[1].id
                            ? 'bg-[#F47745]/20 text-[#242820] decoration-[#F47745]'
                            : 'bg-[#F47745]/10 text-[#242820] decoration-[#F47745]/60 hover:bg-[#F47745]/25'
                        }`}
                      >
                        {currentCase.flaggedClaims[1].originalText}
                      </button>
                    )
                  )}
                  . Experience uninterrupted enterprise acceleration today.
                </p>
              </div>

              {/* Instructions */}
              <div className="mt-4 flex items-center gap-2 text-xs text-[#7A8274]">
                <Info className="w-3.5 h-3.5 text-[#174C3B] shrink-0" />
                <span>
                  Click highlighted passages above to inspect why they were flagged, verify approved evidence, or click &ldquo;Apply Compliant Fix&rdquo;.
                </span>
              </div>
            </div>

            {/* Document Footer: Status Summary */}
            <div className="mt-8 pt-4 border-t border-[#E8DFD0] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#242820]">Issues Flagged:</span>
                <span className="px-2 py-0.5 rounded-full bg-[#F47745]/15 text-[#F47745] font-bold">
                  {totalClaims - fixedCount} Pending
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#174C3B]/10 text-[#174C3B] font-bold">
                  {fixedCount} Resolved
                </span>
              </div>
              <span className="text-[#7A8274] font-mono">
                Audit Hash: SHA256:7a92c..4f0
              </span>
            </div>
          </div>

          {/* Right: The Markwise Explainability & Evidence Card (Col 5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8DFD0] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F47745]" />
                  <span className="text-xs font-bold text-[#174C3B] uppercase tracking-wider">
                    Markwise Explainability Engine
                  </span>
                </div>
                <span className="text-xs font-mono font-medium text-[#7A8274]">
                  Rule: {activeClaim.ruleId}
                </span>
              </div>

              {/* Flagged Claim Statement */}
              <div>
                <span className="text-[11px] font-semibold text-[#7A8274] uppercase tracking-wider block mb-1">
                  Flagged Statement
                </span>
                <div className="p-3 bg-[#fef1ec] rounded-lg border border-[#F47745]/30 text-xs sm:text-sm font-medium text-[#242820] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#F47745] shrink-0 mt-0.5" />
                  <span>&ldquo;{activeClaim.originalText}&rdquo;</span>
                </div>
              </div>

              {/* Why Flagged (Causal Explainability) */}
              <div>
                <span className="text-[11px] font-semibold text-[#174C3B] uppercase tracking-wider block mb-1">
                  Why It Was Flagged (Explainable AI)
                </span>
                <p className="text-xs sm:text-sm text-[#545B4E] leading-relaxed bg-[#FAF6EF] p-3 rounded-lg border border-[#E8DFD0]">
                  {activeClaim.whyFlagged}
                </p>
              </div>

              {/* Approved Evidence Anchor */}
              <div>
                <span className="text-[11px] font-semibold text-[#174C3B] uppercase tracking-wider block mb-1">
                  Linked Approved Evidence Document
                </span>
                <div className="p-3 rounded-lg border border-[#174C3B]/25 bg-[#edf4f1]/60 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#174C3B] flex items-center gap-1.5">
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#174C3B]" />
                      {activeClaim.evidenceDoc.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-[#174C3B] border border-[#174C3B]/20">
                      {activeClaim.evidenceDoc.fileType}
                    </span>
                  </div>
                  <div className="text-[#545B4E] flex items-center justify-between text-[11px] pt-1">
                    <span>{activeClaim.evidenceDoc.section}</span>
                    <span className="font-mono text-[10px] text-[#7A8274]">
                      Verified: {activeClaim.evidenceDoc.verifiedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Suggested Compliant Phrasing */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-[#174C3B] uppercase tracking-wider">
                    Suggested Compliant Revision
                  </span>
                  {fixedClaimIds[activeClaim.id] && (
                    <span className="text-xs font-semibold text-[#174C3B] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Applied to Draft
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-lg border border-[#174C3B]/30 bg-white text-xs sm:text-sm font-medium text-[#174C3B]">
                  &ldquo;{activeClaim.suggestedText}&rdquo;
                </div>
              </div>

              {/* The Living Rule Evolution Diff */}
              <div className="p-3 bg-[#FCFAF5] rounded-lg border border-[#E8DFD0] text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#7A8274] mb-1">
                  <span className="flex items-center gap-1 font-semibold text-[#174C3B]">
                    <GitCommit className="w-3.5 h-3.5" />
                    Living Rule Evolution
                  </span>
                  <span>
                    {activeClaim.ruleEvolution.previousVersion} →{' '}
                    <strong className="text-[#174C3B]">
                      {activeClaim.ruleEvolution.newVersion}
                    </strong>
                  </span>
                </div>
                <p className="text-[11px] text-[#545B4E] leading-normal">
                  {activeClaim.ruleEvolution.evolutionNote}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-[#E8DFD0] flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleApplyFix(activeClaim.id)}
                disabled={fixedClaimIds[activeClaim.id]}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer ${
                  fixedClaimIds[activeClaim.id]
                    ? 'bg-[#174C3B]/10 text-[#174C3B] border border-[#174C3B]/20 cursor-default'
                    : 'bg-[#F47745] hover:bg-[#dc612e] text-white shadow-xs active:scale-[0.98]'
                }`}
              >
                {fixedClaimIds[activeClaim.id] ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#174C3B]" />
                    <span>Correction Applied</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Apply Compliant Fix</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowEvidenceModal(true)}
                className="px-3.5 py-2.5 text-xs font-semibold text-[#174C3B] border border-[#E8DFD0] hover:bg-[#FAF6EF] rounded-xl transition-colors inline-flex items-center gap-1.5"
                title="View linked audit evidence"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Evidence</span>
              </button>
            </div>
          </div>
        </div>

        {/* Evidence Drawer / Modal Preview */}
        {showEvidenceModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-[#FAF6EF] border border-[#E8DFD0] rounded-2xl max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="w-5 h-5 text-[#174C3B]" />
                  <h4 className="font-bold text-base text-[#242820]">
                    Verified Evidence Document
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEvidenceModal(false)}
                  className="text-xs font-semibold text-[#7A8274] hover:text-[#242820] px-2 py-1"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#545B4E]">
                <div className="bg-white p-3 rounded-lg border border-[#E8DFD0]">
                  <span className="block font-semibold text-[#242820] text-sm">
                    {activeClaim.evidenceDoc.title}
                  </span>
                  <span className="block text-[#7A8274] mt-0.5">
                    {activeClaim.evidenceDoc.section}
                  </span>
                </div>

                <div className="p-3 bg-[#edf4f1] rounded-lg border border-[#174C3B]/20 text-[#174C3B] font-mono text-[11px] leading-relaxed">
                  &ldquo;Certified extract: Verified that claims regarding coverage and liability boundaries are governed exclusively by Section 4.1.2. Any public consumer-facing statement must acknowledge third-party regulatory covenants.&rdquo;
                </div>

                <div className="flex justify-between items-center text-[11px] text-[#7A8274] pt-2">
                  <span>Anchor ID: {activeClaim.evidenceDoc.anchorId}</span>
                  <span>Cryptographic Seal: Validated</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E8DFD0] flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEvidenceModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#174C3B] hover:bg-[#0e3025] rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
