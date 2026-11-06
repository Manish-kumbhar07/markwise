'use client';

import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PricingSection } from '@/components/PricingSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="bg-[#F7F2E8] dark:bg-[#123B2F] min-h-screen text-[#242820] dark:text-[#F7F2E8] selection:bg-[#F47745]/20 selection:text-[#174C3B] overflow-x-hidden font-inter transition-colors duration-300">
      <Navbar />

      <main>
        <HeroSection />

        <section id="features" aria-label="Core Capabilities" className="scroll-mt-24">
          <FeaturesSection />
        </section>

        <section id="pricing" aria-label="Enterprise Pricing" className="scroll-mt-24">
          <PricingSection onOpenGetStarted={() => { window.location.href = '/login'; }} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
