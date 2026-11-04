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
import LoginPage from './app/login/page';
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
    // 1. Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthChecked(true);
    });

    // 2. Real-time auth state subscription
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthChecked(true);
    });

    // 3. Browser location popstate listener
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Strict route protection & redirection (matching src/middleware.ts)
  useEffect(() => {
    if (!authChecked) return;

    // 1. If unauthenticated and accessing protected /dashboard routes -> redirect to /login
    if (!session && (currentPath === '/dashboard' || currentPath.startsWith('/dashboard/'))) {
      window.history.replaceState({}, '', '/login');
      setCurrentPath('/login');
    }

    // 2. If authenticated and visiting /login or / -> redirect to /dashboard/rules
    if (session && (currentPath === '/login' || currentPath === '/')) {
      window.history.replaceState({}, '', '/dashboard/rules');
      setCurrentPath('/dashboard/rules');
    }
  }, [authChecked, session, currentPath]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Determine initial dashboard tab based on URL path
  const getDashboardInitialPage = (): DashboardPage => {
    if (currentPath === '/dashboard/facts') return 'fact-vault';
    if (currentPath === '/dashboard/rules') return 'brand-brain';
    if (currentPath === '/dashboard/review') return 'review';
    return 'brand-brain';
  };

  // Dedicated Login Route
  if (currentPath === '/login') {
    return <LoginPage />;
  }

  // Protected Dashboard Route
  if (currentPath.startsWith('/dashboard')) {
    return (
      <GlobalDashboardLayout
        initialPage={getDashboardInitialPage()}
        onSelectPublicSite={() => navigate('/')}
      />
    );
  }

  // Public Landing Page (/)
  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#242820] relative flex flex-col font-inter selection:bg-[#F47745]/20 selection:text-[#174C3B]">
      <BackgroundDecoration />
      <Navbar
        activeTab={activeLandingTab}
        onSelectTab={setActiveLandingTab}
        onOpenLogin={() => navigate('/login')}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />

      <main className="flex-1">
        {activeLandingTab === 'loop' && (
          <div className="animate-in fade-in duration-200">
            <HeroSection
              onOpenGetStarted={() => setIsGetStartedOpen(true)}
              onOpenDocs={() => setIsDocsOpen(true)}
            />
            <TheLoopSection />
          </div>
        )}

        {activeLandingTab === 'demo' && (
          <div className="animate-in fade-in duration-200">
            <LiveInspector />
          </div>
        )}

        {activeLandingTab === 'features' && (
          <div className="animate-in fade-in duration-200">
            <FeaturesSection />
            <EnterpriseTrust />
          </div>
        )}

        {activeLandingTab === 'pricing' && (
          <div className="animate-in fade-in duration-200">
            <PricingSection onOpenGetStarted={() => setIsGetStartedOpen(true)} />
          </div>
        )}
      </main>

      <Footer
        onSelectTab={setActiveLandingTab}
        onOpenLogin={() => navigate('/login')}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
}
