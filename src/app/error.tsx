'use client';

import { useEffect } from 'react';
import { useRouter } from '../lib/next-navigation';
import { AlertTriangle, RefreshCw, Home, LayoutDashboard, Shield } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Structured client telemetry logging
    console.error('[Markwise App Error Boundary Captured]:', {
      message: error?.message || 'Unknown error',
      name: error?.name,
      digest: error?.digest,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'SSR',
    });
  }, [error]);

  const handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    } else {
      router.push('/');
    }
  };

  const handleGoDashboard = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard/rules';
    } else {
      router.push('/dashboard/rules');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] dark:bg-[#123B2F] text-[#242820] dark:text-[#F7F2E8] flex items-center justify-center p-4 selection:bg-[#F47745]/20 selection:text-[#174C3B] font-inter transition-colors duration-200">
      <div className="max-w-lg w-full bg-[#FAF6EF] dark:bg-[#164336] border border-[#E8DFD0] dark:border-[#205243] rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Shield & Error Indicator */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/60 flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-xs">
              <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#123B2F] dark:bg-[#F47745] text-white flex items-center justify-center border-2 border-[#FAF6EF] dark:border-[#164336]">
              <Shield className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/50 text-amber-900 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <span>Application Error</span>
          {error.digest && <span className="font-mono text-[10px] text-amber-800 dark:text-amber-400">· #{error.digest.slice(0, 8)}</span>}
        </div>

        {/* Heading & Details */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#123B2F] dark:text-[#FFFCF6] font-serif">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-[#545B4E] dark:text-[#C5D3C1] leading-relaxed max-w-md mx-auto">
            An unexpected error occurred while rendering this view. Our observability instrumentation has recorded the diagnostics.
          </p>
        </div>

        {/* Error Detail Snippet */}
        {error.message && (
          <div className="p-3 rounded-xl bg-white/80 dark:bg-[#123B2F]/60 border border-[#E8DFD0] dark:border-[#205243] text-left text-xs font-mono text-[#545B4E] dark:text-[#D5DECE] overflow-x-auto shadow-2xs max-h-32">
            <span className="font-bold text-red-700 dark:text-red-400 block text-[11px] mb-1">Diagnostic Reason:</span>
            <span className="break-words">{error.message}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#123B2F] dark:bg-[#F47745] hover:bg-[#1A4C3E] dark:hover:bg-[#E06432] rounded-xl transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-98 inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <button
            type="button"
            onClick={handleGoDashboard}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#123B2F] dark:text-[#F7F2E8] border border-[#D5CDBD] dark:border-[#2B6856] bg-white/70 dark:bg-[#1A4C3E]/60 hover:bg-white dark:hover:bg-[#1A4C3E] rounded-xl transition-all shadow-2xs cursor-pointer active:scale-98 inline-flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Overview</span>
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#545B4E] dark:text-[#A7B4A0] hover:text-[#123B2F] dark:hover:text-[#FFFCF6] transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}

