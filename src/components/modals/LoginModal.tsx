import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Shield, Lock, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error.message || 'Invalid login credentials');
          setLoading(false);
          return;
        }

        if (data.user) {
          onClose();
          router.push('/dashboard/rules');
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error.message || 'Failed to create account.');
          setLoading(false);
          return;
        }

        if (data.session) {
          onClose();
          router.push('/dashboard/rules');
        } else if (data.user) {
          setSuccessMessage(
            'Account created successfully! Please check your email to confirm your account, or sign in.'
          );
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected authentication error occurred.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
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
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#7A8274] hover:text-[#242820] hover:bg-[#E8DFD0]/40 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#174C3B] text-white flex items-center justify-center shadow-xs">
            <Shield className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#174C3B]">
            Markwise Authentication
          </span>
        </div>

        <h3 id="login-title" className="text-2xl font-bold text-[#242820] font-inter">
          Enterprise Sign In
        </h3>
        <p className="mt-1 text-xs text-[#545B4E]">
          Access your organization&apos;s brand governance rules & approval queues.
        </p>

        {/* Email & Password Authentication Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#242820] mb-1">
              Work Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@enterprise.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-xs text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:border-[#174C3B] focus:ring-1 focus:ring-[#174C3B] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#242820] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-xs text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:border-[#174C3B] focus:ring-1 focus:ring-[#174C3B] transition-colors"
            />
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-start gap-2 animate-in fade-in duration-150"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success / Confirmation Message Display */}
          {successMessage && (
            <div
              role="status"
              className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#174C3B] flex items-start gap-2 animate-in fade-in duration-150"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#174C3B]" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Submit Button (Forest Green) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#174C3B] hover:bg-[#0e3025] disabled:opacity-70 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{mode === 'signin' ? 'Signing In...' : 'Signing Up...'}</span>
              </>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Toggle between Sign In and Sign Up */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-xs text-[#174C3B] hover:underline font-medium cursor-pointer"
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Security / Compliance Footer */}
        <div className="mt-5 pt-4 border-t border-[#E8DFD0] flex items-center justify-center gap-1.5 text-[11px] text-[#7A8274]">
          <Lock className="w-3.5 h-3.5 text-[#174C3B]" />
          <span>Encrypted with TLS 1.3 · Designed for SOC 2</span>
        </div>
      </div>
    </div>
  );
}
