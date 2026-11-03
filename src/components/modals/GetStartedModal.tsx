import { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    volume: '50,000 - 250,000 words/mo',
    industry: 'Financial Services & Fintech',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please provide a valid enterprise work email.');
      return;
    }
    if (!formData.name.trim() || !formData.company.trim()) {
      setError('Please complete all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="get-started-title"
    >
      <div className="bg-[#FAF6EF] border border-[#E8DFD0] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#7A8274] hover:text-[#242820] hover:bg-[#E8DFD0]/40 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#174C3B] text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase tracking-wider font-bold text-[#174C3B]">
                Enterprise Access
              </span>
            </div>

            <h3
              id="get-started-title"
              className="text-2xl font-bold text-[#242820] font-inter"
            >
              Start Your Markwise Pilot
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#545B4E]">
              Evaluate Markwise against your actual marketing drafts with full explainability and rule versioning.
            </p>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#242820] mb-1">
                  Full Name <span className="text-[#F47745]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-sm text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:ring-2 focus:ring-[#174C3B]/20 focus:border-[#174C3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242820] mb-1">
                  Enterprise Work Email <span className="text-[#F47745]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-sm text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:ring-2 focus:ring-[#174C3B]/20 focus:border-[#174C3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242820] mb-1">
                  Company / Organization <span className="text-[#F47745]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-sm text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:ring-2 focus:ring-[#174C3B]/20 focus:border-[#174C3B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#242820] mb-1">
                    Industry Sector
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-xs text-[#242820] focus:outline-none focus:border-[#174C3B]"
                  >
                    <option>Financial Services & Fintech</option>
                    <option>Healthcare & Life Sciences</option>
                    <option>Enterprise B2B Cloud / SaaS</option>
                    <option>Consumer Brand / Retail</option>
                    <option>Government / Defense</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#242820] mb-1">
                    Monthly Word Volume
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-xs text-[#242820] focus:outline-none focus:border-[#174C3B]"
                  >
                    <option>Under 50,000 words/mo</option>
                    <option>50,000 - 250,000 words/mo</option>
                    <option>250,000 - 1M words/mo</option>
                    <option>1M+ words/mo (Custom)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#F47745] hover:bg-[#dc612e] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Priority Pilot Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-[#7A8274]">
                Enterprise Zero Data Retention agreement included with all pilots.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#edf4f1] text-[#174C3B] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>

            <h3 className="text-2xl font-bold text-[#242820] font-inter">
              Pilot Request Received
            </h3>

            <p className="text-sm text-[#545B4E] leading-relaxed max-w-sm mx-auto">
              Thank you, <strong>{formData.name}</strong>. A dedicated Markwise Brand Governance Architect has been assigned to <strong>{formData.company}</strong>. We will contact you at <strong>{formData.email}</strong> within 2 business hours.
            </p>

            <div className="p-3 bg-white rounded-xl border border-[#E8DFD0] text-xs text-left space-y-1">
              <span className="font-semibold text-[#174C3B] block">Next Steps:</span>
              <p className="text-[#545B4E]">
                1. Dedicated sandbox environment provisioned with SOC 2 credentials.
              </p>
              <p className="text-[#545B4E]">
                2. Automated import of your first 20 living brand compliance rules.
              </p>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#174C3B] border border-[#174C3B]/30 hover:bg-[#FAF6EF] transition-colors"
              >
                Back to Landing Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
