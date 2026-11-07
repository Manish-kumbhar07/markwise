'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, ArrowRight, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = (cleanEmail: string, pass: string): boolean => {
    if (!cleanEmail) {
      setErrorMessage('Please enter your work email address.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. name@enterprise.com).');
      return false;
    }

    if (!pass) {
      setErrorMessage('Please enter your password.');
      return false;
    }

    if (pass.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Guard against double-submits

    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();
    if (!validateForm(cleanEmail, password)) {
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) {
          const detail = error.message || 'Invalid login credentials. Please check your email and password.';
          setErrorMessage(detail);
          setLoading(false);
          return;
        }

        if (data?.user) {
          router.push('/dashboard/rules');
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });

        if (error) {
          const detail = error.message || 'Failed to create account. Please try again.';
          setErrorMessage(detail);
          setLoading(false);
          return;
        }

        if (data?.session) {
          router.push('/dashboard/rules');
        } else if (data?.user) {
          setSuccessMessage(
            'Account created successfully! Please check your email inbox to confirm your account, or sign in.'
          );
        }
      }
    } catch (err: unknown) {
      let message = 'An unexpected authentication error occurred. Please try again.';
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        message = String((err as { message: unknown }).message);
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    if (loading) return;
    setErrorMessage(null);
    setSuccessMessage(null);
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] flex flex-col justify-center items-center p-4 selection:bg-[#F47745]/20 selection:text-[#174C3B] font-inter">
      {/* Return to Home link */}
      <div className="max-w-md w-full mb-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-xs text-[#545B4E] hover:text-[#174C3B] transition-colors cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Site</span>
        </button>
      </div>

      <div className="bg-[#FAF6EF] border border-[#E8DFD0] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
        {/* Brand Shield & Enterprise Badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#123B2F] text-white flex items-center justify-center shadow-xs">
            <Shield className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#123B2F]">
            Markwise Authentication
          </span>
        </div>

        <h3 id="login-title" className="text-2xl font-bold text-[#242820] font-serif">
          {mode === 'signin' ? 'Enterprise Sign In' : 'Create Enterprise Account'}
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
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@enterprise.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-xs text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#242820] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              disabled={loading}
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-white text-xs text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Error Message Display in Red Banner */}
          {errorMessage && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in duration-150"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Success / Confirmation Message Display */}
          {successMessage && (
            <div
              role="status"
              className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#123B2F] flex items-start gap-2 animate-in fade-in duration-150"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#123B2F]" />
              <span className="leading-relaxed">{successMessage}</span>
            </div>
          )}

          {/* Submit Button with Spinner & Disabled State */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#123B2F] hover:bg-[#1A4C3E] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{mode === 'signin' ? 'Signing In...' : 'Creating Account...'}</span>
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
            disabled={loading}
            className="text-xs text-[#123B2F] hover:underline font-medium cursor-pointer disabled:opacity-50"
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Security / Compliance Footer */}
        <div className="mt-5 pt-4 border-t border-[#E8DFD0] flex items-center justify-center gap-1.5 text-[11px] text-[#7A8274]">
          <Lock className="w-3.5 h-3.5 text-[#123B2F]" />
          <span>Encrypted with TLS 1.3 · Designed for SOC 2</span>
        </div>
      </div>
    </div>
  );
}
