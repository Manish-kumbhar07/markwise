'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-brand-border dark:border-[#235A4A] bg-brand-cream dark:bg-brand-forest-dark relative z-10 text-xs text-brand-muted dark:text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5 text-brand-forest dark:text-brand-ivory text-left cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-brand-forest flex items-center justify-center text-white shadow-2xs">
                <Shield aria-hidden="true" className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-brand-forest dark:text-brand-ivory font-serif">
                Markwise
              </span>
            </Link>
            <p className="text-xs text-brand-muted dark:text-zinc-400 max-w-sm leading-relaxed">
              Enterprise AI brand-governance infrastructure. Review content before it goes live, explain every flag, link claims to approved evidence, and turn human corrections into living rules.
            </p>
            <div className="pt-1 text-[11px] text-brand-subtle dark:text-zinc-500">
              San Francisco · New York · London
            </div>
          </div>

          {/* Platform Column */}
          <div className="space-y-2.5">
            <span className="block font-bold uppercase tracking-wider text-brand-forest dark:text-brand-ivory text-[11px] font-mono">
              Platform
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="hover:text-brand-coral font-semibold text-brand-forest dark:text-brand-ivory transition-colors">
                  How it Works (10-Step Loop)
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-brand-coral transition-colors">
                  Living Rulebook
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-brand-coral transition-colors">
                  Live Fact Vault
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-brand-coral transition-colors">
                  Enterprise Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Developers */}
          <div className="space-y-2.5">
            <span className="block font-bold uppercase tracking-wider text-brand-forest dark:text-brand-ivory text-[11px] font-mono">
              Governance
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="hover:text-brand-coral transition-colors">
                  Architecture Docs
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-brand-coral transition-colors">
                  Rule YAML Syntax
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-brand-coral transition-colors">
                  Regulatory Rule Packs
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-brand-coral transition-colors">
                  Enterprise Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Compliance */}
          <div className="space-y-2.5">
            <span className="block font-bold uppercase tracking-wider text-brand-forest dark:text-brand-ivory text-[11px] font-mono">
              Compliance
            </span>
            <ul className="space-y-2 text-[11px] text-brand-subtle dark:text-zinc-400">
              <li>
                <Link href="/trust" className="font-semibold text-brand-forest dark:text-emerald-300 hover:text-brand-coral transition-colors block">
                  Markwise Trust Center &rarr;
                </Link>
              </li>
              <li>Designed for SOC 2 Compliance</li>
              <li>ISO 27001 Security Management</li>
              <li>Zero Data Retention (ZDR)</li>
              <li>Target 99.9% Availability (Pilot Phase)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-brand-border dark:border-[#235A4A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-subtle dark:text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Markwise Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/how-it-works" className="hover:text-brand-coral transition-colors">
              How It Works
            </Link>
            <Link href="/trust" className="hover:text-brand-coral transition-colors">
              Trust Center
            </Link>
            <Link href="/privacy" className="hover:text-brand-coral transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-coral transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
