import React from 'react';
import type { RuleSeverity } from '../../utils/dashboard';

interface SeverityIndicatorProps {
  severity: RuleSeverity | string;
  showDot?: boolean;
  className?: string;
}

export function SeverityIndicator({
  severity,
  showDot = true,
  className = '',
}: SeverityIndicatorProps) {
  const normalized = (severity || 'HIGH').toUpperCase();

  const config = {
    HIGH: {
      bg: 'bg-red-50 dark:bg-red-950/40',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800/60',
      dot: 'bg-red-500',
    },
    MEDIUM: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-800 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800/60',
      dot: 'bg-amber-500',
    },
    LOW: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      dot: 'bg-emerald-500',
    },
  }[normalized] || {
    bg: 'bg-slate-50 dark:bg-slate-900',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700',
    dot: 'bg-slate-400',
  };

  return (
    <span
      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border inline-flex items-center gap-1.5 ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
      {normalized}
    </span>
  );
}

