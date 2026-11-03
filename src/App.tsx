/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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
import { LoginModal } from './components/modals/LoginModal';
import { DocsModal } from './components/modals/DocsModal';
import { ActiveTab } from './utils/governance';
import { LayoutDashboard, Globe } from 'lucide-react';

export default function App() {
  // 'dashboard' is the active primary layout requested by user
  const [appMode, setAppMode] = useState<'dashboard' | 'landing'>('dashboard');
  const [activeLandingTab, setActiveLandingTab] = useState<ActiveTab>('loop');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#242820] font-inter">
      {/* View Mode Banner / Quick Switcher */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#123B2F] text-white shadow-xl border border-white/20 text-xs font-semibold backdrop-blur-md">
          <button
            type="button"
            onClick={() => setAppMode('dashboard')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
              appMode === 'dashboard'
                ? 'bg-[#F47745] text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Global Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => setAppMode('landing')}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
              appMode === 'landing'
                ? 'bg-[#F47745] text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Site & Loop</span>
          </button>
        </div>
      </div>

      {/* PRIMARY REQUESTED LAYOUT: Global Dashboard Layout */}
      {appMode === 'dashboard' ? (
        <GlobalDashboardLayout
          initialPage="brand-brain"
          onSelectPublicSite={() => setAppMode('landing')}
        />
      ) : (
        /* PUBLIC LANDING & THE LOOP VIEW */
        <div className="min-h-screen bg-[#F7F2E8] text-[#242820] relative flex flex-col font-inter selection:bg-[#F47745]/20 selection:text-[#174C3B]">
          <BackgroundDecoration />
          <Navbar
            activeTab={activeLandingTab}
            onSelectTab={setActiveLandingTab}
            onOpenLogin={() => setIsLoginOpen(true)}
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
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenGetStarted={() => setIsGetStartedOpen(true)}
            onOpenDocs={() => setIsDocsOpen(true)}
          />

          <GetStartedModal
            isOpen={isGetStartedOpen}
            onClose={() => setIsGetStartedOpen(false)}
          />
          <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
          <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
        </div>
      )}
    </div>
  );
}
