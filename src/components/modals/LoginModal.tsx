import { useState } from 'react';
import { X, Shield, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [ssoRedirecting, setSsoRedirecting] = useState<string | null>(null);
  const [magicSent, setMagicSent] = useState(false);

  if (!isOpen) return null;

  const handleSsoClick = (provider: string) => {
    setSsoRedirecting(provider);
    setTimeout(() => {
      setSsoRedirecting(null);
      alert(`SSO handoff to ${provider} initiated. (Prototype mode)`);
    }, 1200);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setMagicSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <div className="bg-[#FAF6EF] border border-[#E8DFD0] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#7A8274] hover:text-[#242820] hover:bg-[#E8DFD0]/40 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#174C3B] text-white flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#174C3B]">
            Markwise Single Sign-On
          </span>
        </div>

        <h3 id="login-title" className="text-2xl font-bold text-[#242820] font-inter">
          Enterprise Sign In
        </h3>
        <p className="mt-1 text-xs text-[#545B4E]">
          Access your organization&apos;s brand governance rules & approval queues.
        </p>

        {/* SSO Providers */}
        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={() => handleSsoClick('Okta')}
            disabled={!!ssoRedirecting}
            className="w-full py-2.5 px-4 rounded-xl border border-[#E8DFD0] bg-white hover:bg-[#FAF6EF] text-xs font-semibold text-[#242820] flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#174C3B]" />
              Continue with Okta SAML 2.0
            </span>
            <span className="text-[11px] text-[#7A8274]">
              {ssoRedirecting === 'Okta' ? 'Redirecting...' : 'SSO'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSsoClick('Microsoft Entra ID')}
            disabled={!!ssoRedirecting}
            className="w-full py-2.5 px-4 rounded-xl border border-[#E8DFD0] bg-white hover:bg-[#FAF6EF] text-xs font-semibold text-[#242820] flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0078D4]" />
              Microsoft Entra / Azure AD
            </span>
            <span className="text-[11px] text-[#7A8274]">
              {ssoRedirecting === 'Microsoft Entra ID' ? 'Redirecting...' : 'SSO'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSsoClick('Google Workspace')}
            disabled={!!ssoRedirecting}
            className="w-full py-2.5 px-4 rounded-xl border border-[#E8DFD0] bg-white hover:bg-[#FAF6EF] text-xs font-semibold text-[#242820] flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
              Google Workspace SAML
            </span>
            <span className="text-[11px] text-[#7A8274]">
              {ssoRedirecting === 'Google Workspace' ? 'Redirecting...' : 'SSO'}
            </span>
          </button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px bg-[#E8DFD0] flex-1" />
          <span className="text-[11px] uppercase tracking-wider text-[#7A8274] font-medium">
            or work email
          </span>
          <div className="h-px bg-[#E8DFD0] flex-1" />
        </div>

        {!magicSent ? (
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#242820] mb-1">
                Company Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@enterprise.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-xs text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:border-[#174C3B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#174C3B] hover:bg-[#0e3025] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Magic Sign-In Link</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="text-center p-4 bg-white rounded-xl border border-[#E8DFD0] space-y-2">
            <CheckCircle2 className="w-6 h-6 text-[#174C3B] mx-auto" />
            <p className="text-xs font-semibold text-[#242820]">
              Sign-in link sent to {email}
            </p>
            <p className="text-[11px] text-[#7A8274]">
              Check your inbox to authenticate securely.
            </p>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-[#E8DFD0] flex items-center justify-center gap-1.5 text-[11px] text-[#7A8274]">
          <Lock className="w-3.5 h-3.5 text-[#174C3B]" />
          <span>Encrypted with TLS 1.3 · SOC 2 Type II Audited</span>
        </div>
      </div>
    </div>
  );
}
