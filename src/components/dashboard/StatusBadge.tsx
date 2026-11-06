import React from 'react';
import { Check, Clock, AlertTriangle, FileText } from 'lucide-react';

export type GovernanceStatus =
  | 'APPROVED'
  | 'REJECTED'
  | 'IN_REVIEW'
  | 'DRAFT'
  | 'PENDING'
  | string;

interface StatusBadgeProps {
  status: GovernanceStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalized = (status || 'DRAFT').toUpperCase();

  if (normalized === 'APPROVED' || normalized === 'SIGNED') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-300/50 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full ${className}`}
      >
        <Check className="w-3 h-3 stroke-[2.4]" />
        <span>Signed & Sealed</span>
      </span>
    );
  }

  if (normalized === 'REJECTED') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-700 dark:text-red-300 bg-red-100/70 dark:bg-red-950/40 border border-red-300/50 dark:border-red-800/60 px-2.5 py-0.5 rounded-full ${className}`}
      >
        <AlertTriangle className="w-3 h-3 stroke-[2.2]" />
        <span>Revision Required</span>
      </span>
    );
  }

  if (
    normalized === 'IN_REVIEW' ||
    normalized === 'PENDING' ||
    normalized === 'AWAITING_SIGN_OFF'
  ) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#F47745] bg-[#F47745]/10 border border-[#F47745]/30 px-2.5 py-0.5 rounded-full ${className}`}
      >
        <Clock className="w-3 h-3 stroke-[2.2] animate-pulse" />
        <span>Awaiting Sign-off</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#545B4E] dark:text-[#A7B4A0] bg-[#FAF6EF] dark:bg-[#1A4C3E]/50 border border-[#E8DFD0] dark:border-[#235A4A] px-2.5 py-0.5 rounded-full ${className}`}
    >
      <FileText className="w-3 h-3" />
      <span>Draft</span>
    </span>
  );
}

