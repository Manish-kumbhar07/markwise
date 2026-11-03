import { useState } from 'react';
import { X, Play, Sparkles, Shield, ArrowRight, FileText } from 'lucide-react';
import { DashboardPage } from '../../utils/dashboard';

interface RunReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (page: DashboardPage) => void;
}

export function RunReviewModal({ isOpen, onClose, onComplete }: RunReviewModalProps) {
  const [draftText, setDraftText] = useState(
    'Our zero-fee card delivers guaranteed 100% fraud protection across all transactions, and all customer cash balances are automatically FDIC insured through our proprietary smart ledger.'
  );
  const [jurisdiction, setJurisdiction] = useState('US Banking & FTC Standards');
  const [channel, setChannel] = useState('Landing Page & Press Release');
  const [scanning, setScanning] = useState(false);

  if (!isOpen) return null;

  const handleStartReview = (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onClose();
      onComplete('review');
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="run-review-title"
    >
      <div className="bg-[#FFFCF6] border border-[#E8DFD0] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#7A8274] hover:text-[#242820] hover:bg-[#E8DFD0]/40 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#123B2F] text-white flex items-center justify-center">
            <Play className="w-4 h-4 fill-white" />
          </div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#123B2F]">
            Pre-Publish Audit Scanner
          </span>
        </div>

        <h3 id="run-review-title" className="text-2xl font-bold text-[#242820] font-inter">
          Run Content Governance Review
        </h3>
        <p className="mt-1 text-xs text-[#545B4E]">
          Paste proposed campaign copy to evaluate against your Brand Brain rules and Fact Vault evidence anchors.
        </p>

        <form onSubmit={handleStartReview} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#242820] mb-1">
              Content Draft
            </label>
            <textarea
              rows={4}
              required
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-xs leading-relaxed text-[#242820] focus:outline-none focus:border-[#123B2F] focus:ring-2 focus:ring-[#123B2F]/10 font-sans"
              placeholder="Paste campaign copy, headline, or disclosure..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#242820] mb-1">
                Target Policy Pack
              </label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-xs text-[#242820] focus:outline-none focus:border-[#123B2F]"
              >
                <option>US Banking & FTC Standards</option>
                <option>FDA Medical SaMD Guidance</option>
                <option>Enterprise NIST & SOC 2 Cloud</option>
                <option>EU AI Act Compliance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#242820] mb-1">
                Publishing Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-xs text-[#242820] focus:outline-none focus:border-[#123B2F]"
              >
                <option>Landing Page & Press Release</option>
                <option>Product Feature Whitepaper</option>
                <option>Social & Ad Creative</option>
                <option>Investor Deck & 8-K Filing</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={scanning}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#123B2F] hover:bg-[#0c2921] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
            >
              {scanning ? (
                <span>Executing 10-Step Scan...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#F47745]" />
                  <span>Scan & Open Review Cockpit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
