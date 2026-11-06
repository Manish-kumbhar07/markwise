'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, ArrowRight, Sun, Moon, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenLogin?: () => void;
  onOpenGetStarted?: () => void;
}

export function Navbar({}: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const isDark = resolvedTheme === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="w-full bg-[#F7F2E8]/90 dark:bg-[#123B2F]/90 backdrop-blur-md sticky top-0 z-50 transition-all border-b border-[#E8DFD0]/60 dark:border-[#235A4A]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        {/* Floating Pill Header */}
        <div className="bg-[#FAF7F0]/90 dark:bg-[#164638]/90 rounded-full border border-[#DFD8CB] dark:border-[#235A4A] px-4 sm:px-6 py-2 flex items-center justify-between shadow-xs transition-colors">
          {/* Left: Markwise Logo with Star Emblem */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#123B2F] dark:text-[#F7F2E8] group cursor-pointer text-left focus:outline-none"
            aria-label="Markwise Home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#123B2F] dark:bg-white text-white dark:text-[#123B2F] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              {/* 8-pointed star / compass emblem */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#123B2F] dark:text-[#F7F2E8] font-serif">
              Markwise
            </span>
          </Link>

          {/* Center: Main Nav Links (The Loop, Features, Pricing) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            <a
              href="#loop"
              className="text-xs sm:text-sm font-medium text-[#545B4E] dark:text-[#CBD5C0] hover:text-[#123B2F] dark:hover:text-white transition-colors cursor-pointer"
            >
              The Loop
            </a>

            {/* Features with "New" Badge */}
            <div className="relative">
              <span className="absolute -top-3.5 right-1 bg-[#123B2F] dark:bg-[#F47745] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-2xs">
                New
              </span>
              <a
                href="#features"
                className="text-xs sm:text-sm font-medium text-[#545B4E] dark:text-[#CBD5C0] hover:text-[#123B2F] dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <span>Features</span>
                <ChevronDown className="w-3 h-3 text-[#7A8274] dark:text-[#CBD5C0]" />
              </a>
            </div>

            <a
              href="#pricing"
              className="text-xs sm:text-sm font-medium text-[#545B4E] dark:text-[#CBD5C0] hover:text-[#123B2F] dark:hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </a>
          </nav>

          {/* Right: Sun/Moon Theme Toggle, Login Pill, Book Demo Pill */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Theme Toggle (44x44px touch target) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-11 h-11 rounded-full border border-[#D5CDBD] dark:border-[#235A4A] flex items-center justify-center text-[#545B4E] dark:text-[#CBD5C0] hover:text-[#123B2F] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer shadow-2xs"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-[#545B4E] transition-transform duration-200" />
              )}
            </button>

            {/* Login button (at least 44px touch height) */}
            <Link
              href="/login"
              className="min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-medium text-[#123B2F] dark:text-[#F7F2E8] border border-[#D5CDBD] dark:border-[#235A4A] bg-white/50 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 rounded-full transition-all shadow-2xs cursor-pointer active:scale-98 flex items-center justify-center"
            >
              Login
            </Link>

            {/* Book Demo → button (at least 44px touch height) */}
            <Link
              href="/login"
              className="min-h-[44px] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#123B2F] dark:bg-[#F47745] hover:bg-[#1A4C3E] dark:hover:bg-[#dc612e] rounded-full transition-all shadow-xs hover:shadow-sm cursor-pointer inline-flex items-center gap-2 active:scale-98"
            >
              <span>Book Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-11 h-11 rounded-full border border-[#D5CDBD] dark:border-[#235A4A] flex items-center justify-center text-[#545B4E] dark:text-[#CBD5C0] bg-white/60 dark:bg-white/10"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#545B4E]" />
              )}
            </button>
            <Link
              href="/login"
              className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[#123B2F] dark:text-[#F7F2E8] border border-[#D5CDBD] dark:border-[#235A4A] rounded-full bg-white/60 dark:bg-white/10 flex items-center justify-center"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 text-[#123B2F] dark:text-[#F7F2E8] hover:text-[#C85A32] rounded-full border border-[#D5CDBD] dark:border-[#235A4A] bg-white/60 dark:bg-white/10 flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8DFD0] dark:border-[#235A4A] bg-[#FAF7F0] dark:bg-[#164638] px-6 pt-3 pb-5 space-y-3">
          <div className="flex flex-col gap-2 font-medium text-xs sm:text-sm text-[#545B4E] dark:text-[#CBD5C0]">
            <a
              href="#loop"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-1.5 hover:text-[#123B2F] dark:hover:text-white transition-colors cursor-pointer"
            >
              The Loop
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-1.5 hover:text-[#123B2F] dark:hover:text-white transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>Features</span>
              <span className="bg-[#123B2F] dark:bg-[#F47745] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                New
              </span>
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-1.5 hover:text-[#123B2F] dark:hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </a>
          </div>
          <div className="pt-2 border-t border-[#E8DFD0] dark:border-[#235A4A] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#123B2F] dark:bg-[#F47745] hover:bg-[#1A4C3E] rounded-full transition-colors text-center inline-flex items-center justify-center gap-1.5"
            >
              <span>Book Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
