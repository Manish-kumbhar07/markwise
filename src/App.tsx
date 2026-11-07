/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { GlobalDashboardLayout } from './components/dashboard/GlobalDashboardLayout';
import HomePage from './app/page';
import { GetStartedModal } from './components/modals/GetStartedModal';
import { DocsModal } from './components/modals/DocsModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';
import LoginPage from './app/login/page';
import DocsPage from './app/docs/page';
import PrivacyPolicyPage from './app/privacy/page';
import TermsOfServicePage from './app/terms/page';
import TrustCenterPage from './app/trust/page';
import HowItWorksPage from './app/how-it-works/page';
import NotFoundPage from './app/not-found';
import { createClient } from '@/utils/supabase/client';
import { DashboardPage } from './utils/dashboard';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthChecked(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthChecked(true);
    });

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (!authChecked) return;

    if (!session && (currentPath === '/dashboard' || currentPath.startsWith('/dashboard/'))) {
      window.history.replaceState({}, '', '/login');
      setCurrentPath('/login');
    }

    if (session && (currentPath === '/login' || currentPath === '/')) {
      window.history.replaceState({}, '', '/dashboard/rules');
      setCurrentPath('/dashboard/rules');
    }
  }, [authChecked, session, currentPath]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const getDashboardInitialPage = (): DashboardPage => {
    if (currentPath === '/dashboard/facts') return 'fact-vault';
    if (currentPath === '/dashboard/rules') return 'brand-brain';
    if (currentPath === '/dashboard/review') return 'review';
    if (currentPath === '/dashboard/approvals') return 'approvals';
    if (currentPath === '/dashboard/insights') return 'insights';
    return 'brand-brain';
  };

  if (currentPath === '/login') {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <LoginPage />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  if (currentPath === '/docs') {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <DocsPage />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  if (currentPath === '/privacy') {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <PrivacyPolicyPage />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  if (currentPath === '/terms') {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <TermsOfServicePage />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  if (currentPath === '/trust') {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <TrustCenterPage />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  if (currentPath === '/how-it-works') {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <HowItWorksPage />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  if (currentPath.startsWith('/dashboard')) {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <GlobalDashboardLayout
            initialPage={getDashboardInitialPage()}
            onSelectPublicSite={() => navigate('/')}
          />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  if (currentPath !== '/' && currentPath !== '') {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <NotFoundPage />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#F47745] focus:text-white focus:font-semibold focus:text-sm focus:rounded-lg focus:shadow-xl focus:ring-2 focus:ring-[#123B2F] focus:outline-none transition-all"
        >
          Skip to main content
        </a>
        <HomePage />
        <GetStartedModal
          isOpen={isGetStartedOpen}
          onClose={() => setIsGetStartedOpen(false)}
        />
        <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
