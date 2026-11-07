/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { GlobalDashboardLayout } from './components/dashboard/GlobalDashboardLayout';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TheLoopSection } from './components/TheLoopSection';
import { LiveInspector } from './components/LiveInspector';
import { FeaturesSection } from './components/FeaturesSection';
import { PricingSection } from './components/PricingSection';
import { EnterpriseTrust } from './components/EnterpriseTrust';
import { Footer } from './components/Footer';
import { BackgroundDecoration } from './components/BackgroundDecoration';
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
import { ActiveTab } from './utils/governance';
import { DashboardPage } from './utils/dashboard';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [activeLandingTab, setActiveLandingTab] = useState<ActiveTab>('loop');
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
        <div className="min-h-screen bg-[#F7F2E8] dark:bg-[#123B2F] text-[#242820] dark:text-[#F7F2E8] relative flex flex-col font-inter selection:bg-[#F47745]/20 selection:text-[#174C3B] overflow-x-hidden transition-colors duration-300">
          <BackgroundDecoration />
          <Navbar
            onOpenLogin={() => navigate('/login')}
            onOpenGetStarted={() => navigate('/login')}
          />

          <main className="flex-1">
            <HeroSection />

            <section id="features" aria-label="Core Capabilities" className="scroll-mt-24">
              <FeaturesSection />
              <EnterpriseTrust />
            </section>

            <section id="pricing" aria-label="Enterprise Pricing" className="scroll-mt-24">
              <PricingSection onOpenGetStarted={() => navigate('/login')} />
            </section>
          </main>

          <Footer
            onSelectTab={setActiveLandingTab}
            onOpenLogin={() => navigate('/login')}
            onOpenGetStarted={() => navigate('/login')}
            onOpenDocs={() => navigate('/docs')}
          />

          <GetStartedModal
            isOpen={isGetStartedOpen}
            onClose={() => setIsGetStartedOpen(false)}
          />
          <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
