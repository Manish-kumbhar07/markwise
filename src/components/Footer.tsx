import { Shield } from 'lucide-react';
import { ActiveTab } from '../utils/governance';

interface FooterProps {
  onSelectTab?: (tab: ActiveTab) => void;
  onOpenLogin?: () => void;
  onOpenGetStarted?: () => void;
  onOpenDocs?: () => void;
}


export function Footer({
  onSelectTab,
  onOpenLogin,
  onOpenGetStarted,
  onOpenDocs,
}: FooterProps) {
  return (
    <footer className="border-t border-[#E8DFD0] bg-[#FAF6EF] relative z-10 text-xs text-[#545B4E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <button
              type="button"
              onClick={() => onSelectTab?.('loop')}
              className="flex items-center gap-2.5 text-[#174C3B] text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#174C3B] flex items-center justify-center text-white">
                <Shield className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#174C3B] font-inter">
                Markwise
              </span>
            </button>
            <p className="text-xs text-[#545B4E] max-w-sm leading-relaxed">
              Enterprise AI brand-governance infrastructure. Review content before it goes live, explain every flag, link claims to approved evidence, and turn human corrections into living rules.
            </p>
            <div className="pt-1 text-[11px] text-[#7A8274]">
              San Francisco · New York · London
            </div>
          </div>

          {/* Product Views */}
          <div className="space-y-2.5">
            <span className="block font-bold uppercase tracking-wider text-[#174C3B] text-[11px]">
              Platform
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('loop')}
                  className="hover:text-[#174C3B] transition-colors cursor-pointer text-left"
                >
                  The 10-Step Loop
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('demo')}
                  className="hover:text-[#174C3B] transition-colors cursor-pointer text-left"
                >
                  Live Governance Inspector
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('features')}
                  className="hover:text-[#174C3B] transition-colors cursor-pointer text-left"
                >
                  Enterprise Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab?.('pricing')}
                  className="hover:text-[#174C3B] transition-colors cursor-pointer text-left"
                >
                  Enterprise Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Developers */}
          <div className="space-y-2.5">
            <span className="block font-bold uppercase tracking-wider text-[#174C3B] text-[11px]">
              Governance
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onOpenDocs}
                  className="hover:text-[#174C3B] transition-colors cursor-pointer text-left"
                >
                  Architecture Docs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDocs}
                  className="hover:text-[#174C3B] transition-colors cursor-pointer text-left"
                >
                  Living Rule YAML Syntax
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenGetStarted}
                  className="hover:text-[#174C3B] transition-colors cursor-pointer text-left"
                >
                  Regulatory Rule Packs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="hover:text-[#174C3B] transition-colors cursor-pointer text-left"
                >
                  Enterprise Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Compliance */}
          <div className="space-y-2.5">
            <span className="block font-bold uppercase tracking-wider text-[#174C3B] text-[11px]">
              Compliance
            </span>
            <ul className="space-y-2 text-[11px] text-[#7A8274]">
              <li>SOC 2 Type II Certified</li>
              <li>ISO 27001 Security Management</li>
              <li>Zero Data Retention (ZDR)</li>
              <li>GDPR / CCPA / HIPAA Ready</li>
              <li>99.99% Enterprise SLA</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#E8DFD0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A8274]">
          <div>
            &copy; {new Date().getFullYear()} Markwise Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#7A8274]">Privacy Policy</span>
            <span className="text-[#7A8274]">Terms of Service</span>
            <span className="text-[#7A8274]">Security Trust Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
