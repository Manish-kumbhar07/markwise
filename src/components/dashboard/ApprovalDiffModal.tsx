'use client';

import React, { useState } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import {
  X,
  CheckCircle2,
  XCircle,
  Shield,
  Columns,
  AlignLeft,
  Loader2,
  User,
  Building,
  FileText,
} from 'lucide-react';
import type { ApprovalContentItem } from '@/actions/approvals';

interface ApprovalDiffModalProps {
  item: ApprovalContentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
}

export function ApprovalDiffModal({
  item,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: ApprovalDiffModalProps) {
  const [splitView, setSplitView] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  if (!isOpen || !item) return null;

  const handleAction = async (type: 'approve' | 'reject') => {
    setIsSubmitting(true);
    setActionType(type);
    try {
      if (type === 'approve') {
        await onApprove(item.id);
      } else {
        await onReject(item.id);
      }
      onClose();
    } catch (err) {
      console.error(`Failed to ${type} content:`, err);
    } finally {
      setIsSubmitting(false);
      setActionType(null);
    }
  };

  const customDiffStyles = {
    variables: {
      light: {
        diffViewerBackground: '#FFFCF6',
        diffViewerColor: '#242820',
        addedBackground: '#e6f4ea',
        addedColor: '#123B2F',
        removedBackground: '#fde8e8',
        removedColor: '#c53030',
        wordAddedBackground: '#c3e6cb',
        wordRemovedBackground: '#f8b4b4',
        addedGutterBackground: '#d4edda',
        removedGutterBackground: '#f8d7da',
        gutterBackground: '#FAF6EF',
        gutterBackgroundDark: '#FAF6EF',
        gutterColor: '#7A8274',
        codeFoldGutterBackground: '#FAF6EF',
        codeFoldBackground: '#FAF6EF',
      },
    },
    line: {
      padding: '8px 12px',
      fontSize: '13px',
      lineHeight: '1.6',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    wordDiff: {
      padding: '2px 4px',
      borderRadius: '4px',
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 bg-[#FFFCF6] border border-[#E8DFD0] rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-150 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E8DFD0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF]/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#123B2F] text-white flex items-center justify-center shadow-2xs">
                <Shield className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B2F]">
                Governance Diff Review
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  item.riskLevel === 'HIGH'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : item.riskLevel === 'MEDIUM'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-[#edf4f1] text-[#123B2F] border border-[#123B2F]/20'
                }`}
              >
                {item.riskLevel} Risk
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#242820] font-inter">
              {item.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-[#545B4E] pt-0.5">
              <span className="inline-flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#7A8274]" />
                Creator: <strong>{item.creator}</strong>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#7A8274]" />
                {item.department}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Split / Unified Toggle */}
            <div className="inline-flex rounded-xl p-1 bg-[#F7F2E8] border border-[#E8DFD0] text-xs font-medium text-[#545B4E]">
              <button
                type="button"
                onClick={() => setSplitView(true)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  splitView
                    ? 'bg-white text-[#123B2F] shadow-2xs font-semibold'
                    : 'hover:text-[#242820]'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Split</span>
              </button>
              <button
                type="button"
                onClick={() => setSplitView(false)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  !splitView
                    ? 'bg-white text-[#123B2F] shadow-2xs font-semibold'
                    : 'hover:text-[#242820]'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Unified</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#7A8274] hover:text-[#242820] hover:bg-[#E8DFD0]/40 transition-colors cursor-pointer"
              aria-label="Close diff review"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Diff Content Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF6EF]/30">
          <div className="rounded-xl border border-[#E8DFD0] overflow-hidden shadow-xs bg-[#FFFCF6]">
            <div className="bg-[#FAF6EF] px-4 py-2 border-b border-[#E8DFD0] flex items-center justify-between text-xs font-mono text-[#545B4E]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span>Original Un-reviewed Draft</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Compliant Revision (Ready for Sign & Seal)</span>
              </div>
            </div>
            <ReactDiffViewer
              oldValue={item.originalText}
              newValue={item.bodyText}
              splitView={splitView}
              useDarkTheme={false}
              leftTitle="Original Draft"
              rightTitle="Compliant Revision"
              compareMethod={DiffMethod.WORDS}
              styles={customDiffStyles}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#E8DFD0] bg-[#FAF6EF]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#545B4E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#123B2F]" />
            <span>Cryptographic approval stamp will be recorded upon confirmation.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Reject Button (Coral Outline) */}
            <button
              type="button"
              onClick={() => handleAction('reject')}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border-2 border-[#F47745] text-[#F47745] hover:bg-[#F47745] hover:text-white text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting && actionType === 'reject' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Rejecting...</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Reject Revision</span>
                </>
              )}
            </button>

            {/* Approve Button (Solid Forest Green) */}
            <button
              type="button"
              onClick={() => handleAction('approve')}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#123B2F] hover:bg-[#0c2921] text-white text-xs font-semibold shadow-xs transition-all duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting && actionType === 'approve' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sealing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Sign</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

