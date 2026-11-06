'use client';

import { useEffect } from 'react';
import { AlertOctagon, RefreshCw, Shield } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('[Markwise Global Error Boundary Caught]:', {
      message: error?.message || 'Critical Global Error',
      name: error?.name,
      digest: error?.digest,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7F2E8] text-[#242820] flex items-center justify-center p-4 font-sans antialiased">
        <div className="max-w-md w-full bg-[#FAF6EF] border border-[#E8DFD0] rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
          {/* Critical Error Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-xs">
                <AlertOctagon className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#123B2F] text-white flex items-center justify-center border-2 border-[#FAF6EF]">
                <Shield className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#123B2F]">
              Critical System Error
            </h1>
            <p className="text-xs text-[#545B4E] leading-relaxed">
              A root layout failure occurred. Our engineering telemetry has captured the runtime stack trace.
            </p>
          </div>

          {/* Error Digest */}
          {error.digest && (
            <div className="p-2.5 rounded-lg bg-white border border-[#E8DFD0] text-[11px] font-mono text-[#7A8274]">
              Crash Digest ID: {error.digest}
            </div>
          )}

          {/* Reset / Recover Action */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#123B2F] hover:bg-[#1A4C3E] rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restart Application</span>
            </button>

            <a
              href="/"
              className="text-xs text-[#545B4E] hover:text-[#123B2F] underline pt-1 block"
            >
              Return to landing page
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

