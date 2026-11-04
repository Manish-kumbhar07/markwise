'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'loop' | 'demo' | 'features' | 'pricing'>('loop');
  const router = useRouter();

  const handleSelectTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === 'features') {
      const el = document.getElementById('features');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToGetStarted = () => {
    router.push('/login');
  };

  const navigateToDocs = () => {
    router.push('/docs');
  };

  return (
    <main className="bg-[#F7F2E8] min-h-screen text-[#242820] selection:bg-[#F47745]/20 selection:text-[#174C3B]">
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenLogin={navigateToLogin}
        onOpenGetStarted={navigateToGetStarted}
      />

      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <HeroSection onOpenGetStarted={navigateToGetStarted} onOpenDocs={navigateToDocs} />
          <div className="flex justify-center">
            <img
              src="/hero-mockup.png"
              alt="Markwise Dashboard mockup"
              width={800}
              height={600}
              className="w-full h-auto drop-shadow-2xl rounded-xl"
            />
          </div>
        </div>
      </section>

      <div className="bg-[#FAF6EF] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Verify Claims', 'Understand Issues', 'Track Progress', 'Stay Compliant'].map((title) => (
            <div
              key={title}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E8DFD0] hover:shadow-md transition-shadow"
            >
              <span className="text-sm font-medium text-[#242820]">{title}</span>
              <span className="text-[#174C3B]">→</span>
            </div>
          ))}
        </div>
      </div>

      <FeaturesSection />
      <Footer />
    </main>
  );
}

