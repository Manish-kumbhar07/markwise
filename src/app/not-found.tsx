'use client';

import Link from '../lib/next-link';
import { useRouter } from '../lib/next-navigation';
import { Shield, Home, LayoutDashboard, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] dark:bg-[#123B2F] text-[#242820] dark:text-[#F7F2E8] flex items-center justify-center p-4 selection:bg-[#F47745]/20 selection:text-[#174C3B] font-inter transition-colors duration-200">
      <div className="max-w-md w-full bg-[#FAF6EF] dark:bg-[#164336] border border-[#E8DFD0] dark:border-[#205243] rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Shield & 404 Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#E5EEDC] dark:bg-[#205243] border border-[#C5D6BB] dark:border-[#2B6856] flex items-center justify-center text-[#123B2F] dark:text-[#E5EEDC] shadow-xs">
              <Search className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#123B2F] dark:bg-[#F47745] text-white flex items-center justify-center border-2 border-[#FAF6EF] dark:border-[#164336]">
              <Shield className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* 404 Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EEDC] dark:bg-[#1D4A3C] border border-[#CCD7C3] dark:border-[#2B6856] text-[#123B2F] dark:text-[#D7E3CE] text-xs font-semibold tracking-wider uppercase">
          <span>404 Error</span>
          <span className="text-[#545B4E] dark:text-[#8E9B85]">·</span>
          <span>Resource Not Found</span>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#123B2F] dark:text-[#FFFCF6] font-serif">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#545B4E] dark:text-[#C5D3C1] leading-relaxed max-w-sm mx-auto">
            The page or resource you requested does not exist, has been relocated, or is protected by enterprise access controls.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
          <Link
            href="/dashboard/rules"
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#123B2F] dark:bg-[#F47745] hover:bg-[#1A4C3E] dark:hover:bg-[#E06432] rounded-xl transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-98 inline-flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>

          <Link
            href="/"
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#123B2F] dark:text-[#F7F2E8] border border-[#D5CDBD] dark:border-[#2B6856] bg-white/70 dark:bg-[#1A4C3E]/60 hover:bg-white dark:hover:bg-[#1A4C3E] rounded-xl transition-all shadow-2xs cursor-pointer active:scale-98 inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#545B4E] dark:text-[#A7B4A0] hover:text-[#123B2F] dark:hover:text-[#FFFCF6] transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Footer Meta */}
        <div className="pt-4 border-t border-[#E8DFD0] dark:border-[#205243] text-[11px] text-[#7A8274] dark:text-[#8E9B85]">
          Markwise Enterprise Brand Governance
        </div>
      </div>
    </div>
  );
}

