'use client';

import { useEffect } from 'react';
import { Brain, X, Sparkles } from 'lucide-react';

export interface ToastNotificationProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  tag?: string;
  duration?: number;
}

export function ToastNotification({
  show,
  onClose,
  title = 'Correction Saved to Brand Brain',
  description = 'Markwise will learn from this human review to flag similar issues automatically.',
  tag = 'Step 09 · Continuous Learning',
  duration = 6000,
}: ToastNotificationProps) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      <div className="bg-white dark:bg-[#164638] border-2 border-brand-forest/20 dark:border-emerald-500/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(18,59,47,0.25)] flex items-start gap-3.5 relative overflow-hidden text-left">
        {/* Subtle decorative accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-forest via-emerald-500 to-brand-coral" />

        {/* Brain icon with subtle pulse */}
        <div className="w-10 h-10 rounded-xl bg-brand-forest/10 dark:bg-emerald-500/20 text-brand-forest dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 border border-brand-forest/10 dark:border-emerald-500/30">
          <Brain aria-hidden="true" className="w-5 h-5 text-brand-forest dark:text-emerald-300 animate-pulse" />
        </div>

        {/* Notification details */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300 bg-brand-forest/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Sparkles aria-hidden="true" className="w-2.5 h-2.5 text-brand-coral" />
              <span>{tag}</span>
            </span>
          </div>
          <h4 className="text-sm font-bold text-brand-ink dark:text-brand-ivory leading-snug font-serif">
            {title}
          </h4>
          <p className="text-xs text-brand-muted dark:text-zinc-300 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Accessible dismiss button */}
        <button
          type="button"
          onClick={onClose}
          className="text-brand-subtle dark:text-zinc-400 hover:text-brand-ink dark:hover:text-white p-1 rounded-lg hover:bg-brand-cream dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none"
          aria-label="Dismiss notification"
        >
          <X aria-hidden="true" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
