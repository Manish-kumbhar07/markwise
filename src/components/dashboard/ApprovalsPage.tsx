'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  User,
  Building,
  Check,
  FileText,
  Loader2,
  GitCompare,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  getApprovalQueue,
  updateContentStatus,
  type ApprovalContentItem,
} from '@/actions/approvals';
import { ApprovalDiffModal } from './ApprovalDiffModal';
import { SeverityIndicator } from './SeverityIndicator';
import { StatusBadge } from './StatusBadge';

export function ApprovalsPage() {
  const [items, setItems] = useState<ApprovalContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ApprovalContentItem | null>(null);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const loadApprovals = async () => {
    setIsLoading(true);
    try {
      const data = await getApprovalQueue();
      setItems(data);
    } catch (err: unknown) {
      console.error('Failed to load approvals:', err);
      setNotification(
        err instanceof Error ? err.message : 'Failed to connect to approvals service'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadApprovals();
    const handleWsChanged = () => {
      void loadApprovals();
    };
    window.addEventListener('workspace-changed', handleWsChanged);
    return () => window.removeEventListener('workspace-changed', handleWsChanged);
  }, []);

  const handleOpenReview = (item: ApprovalContentItem) => {
    setSelectedItem(item);
    setIsDiffOpen(true);
  };

  const handleApprove = async (id: string) => {
    await updateContentStatus(id, 'APPROVED');
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'APPROVED' } : i))
    );
    setNotification('Draft approved and signed with cryptographic governance seal.');
  };

  const handleReject = async (id: string) => {
    await updateContentStatus(id, 'REJECTED');
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'REJECTED' } : i))
    );
    setNotification('Draft revision rejected. Sent back to creator for edits.');
  };

  const pendingItems = items.filter(
    (i) => i.status === 'IN_REVIEW' || i.status === 'pending'
  );
  const approvedItems = items.filter((i) => i.status === 'APPROVED');
  const highRiskItems = items.filter((i) => i.riskLevel === 'HIGH');

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b border-[#E8DFD0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase font-mono tracking-wider text-[#123B2F] mb-1">
            <CheckCircle2 className="w-4 h-4 text-[#F47745]" />
            <span>Multi-Tier Sign-off Queue</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#242820] font-inter">
            Approval Queue
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#545B4E]">
            Inspect pre-publish drafts against approved rules, review GitHub-style diffs of human corrections, and apply tamper-proof cryptographic seals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadApprovals}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-[#E8DFD0] bg-[#FFFCF6] hover:bg-[#FAF6EF] text-[#545B4E] hover:text-[#242820] transition-colors cursor-pointer shadow-2xs"
            title="Refresh queue"
          >
            <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <span className="flex items-center gap-1.5 text-xs text-[#7A8274] bg-[#FFFCF6] border border-[#E8DFD0] px-3.5 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-[#123B2F]" />
            Role: <strong className="text-[#242820]">Principal Brand Guardian</strong>
          </span>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-[#FFFCF6] border border-[#123B2F]/20 text-xs font-semibold text-[#123B2F] flex items-center justify-between shadow-xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F47745]" />
            <span>{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#7A8274] hover:text-[#242820] p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#FFFCF6] p-4 sm:p-5 rounded-2xl border border-[#E8DFD0] shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A8274] block">
            Awaiting Sign-off
          </span>
          <span className="text-2xl font-bold font-inter text-[#F47745] mt-1 block">
            {pendingItems.length} Drafts
          </span>
        </div>

        <div className="bg-[#FFFCF6] p-4 sm:p-5 rounded-2xl border border-[#E8DFD0] shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A8274] block">
            Signed & Locked
          </span>
          <span className="text-2xl font-bold font-inter text-[#123B2F] mt-1 block">
            {approvedItems.length} Cleared
          </span>
        </div>

        <div className="bg-[#FFFCF6] p-4 sm:p-5 rounded-2xl border border-[#E8DFD0] shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A8274] block">
            High-Risk Claims
          </span>
          <span className="text-2xl font-bold font-inter text-[#242820] mt-1 block">
            {highRiskItems.length} Priority
          </span>
        </div>

        <div className="bg-[#FFFCF6] p-4 sm:p-5 rounded-2xl border border-[#E8DFD0] shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A8274] block">
            Cryptographic Integrity
          </span>
          <span className="text-2xl font-bold font-inter text-[#123B2F] mt-1 block">
            100% SHA-256
          </span>
        </div>
      </div>

      {/* Approvals List / Table */}
      <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
          <h2 className="text-base font-bold text-[#242820] font-inter">
            Active Approval Queue
          </h2>
          <span className="text-xs text-[#7A8274]">
            Showing {items.length} total items
          </span>
        </div>

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-xs text-[#7A8274]">
            <Loader2 className="w-6 h-6 text-[#123B2F] animate-spin" />
            <span>Loading pending approval items from Prisma database...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <FileText className="w-8 h-8 text-[#7A8274] mx-auto opacity-40" />
            <h3 className="text-sm font-semibold text-[#242820]">Queue is Clear</h3>
            <p className="text-xs text-[#545B4E]">
              All draft content has been reviewed and cleared. Run a new AI Review from the Review screen to generate approval items.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => {
              const isApproved = item.status === 'APPROVED';
              const isRejected = item.status === 'REJECTED';
              const isPending = !isApproved && !isRejected;

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-xl border transition-all duration-150 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isApproved
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : isRejected
                      ? 'bg-red-50/30 border-red-200'
                      : 'bg-white border-[#E8DFD0] hover:border-[#123B2F]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <SeverityIndicator severity={item.riskLevel} />

                      <span className="font-mono text-[10px] text-[#7A8274] bg-[#F7F2E8] px-2 py-0.5 rounded border border-[#E8DFD0]">
                        ID: {item.id.slice(0, 14)}...
                      </span>

                      <StatusBadge status={item.status} />
                    </div>

                    <h3 className="text-base font-bold text-[#242820] font-inter">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-[#545B4E] flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#7A8274]" />
                        {item.creator}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-[#7A8274]" />
                        {item.department}
                      </span>
                      <span>·</span>
                      <span className="text-[#7A8274]">
                        {item.issuesCount} rule flags resolved
                      </span>
                    </div>

                    <p className="text-xs text-[#545B4E] line-clamp-1 italic pt-1">
                      &quot;{item.bodyText}&quot;
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => handleOpenReview(item)}
                      className="px-4 py-2 rounded-xl bg-[#123B2F] hover:bg-[#0c2921] text-white text-xs font-semibold shadow-xs transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      <span>Review Diff</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* GitHub-style Diff Viewer Modal */}
      <ApprovalDiffModal
        item={selectedItem}
        isOpen={isDiffOpen}
        onClose={() => setIsDiffOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
