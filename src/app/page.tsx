'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/landing/Hero';
import { CreatorQuote } from '@/components/landing/CreatorQuote';
import { FeatureTabs } from '@/components/landing/FeatureTabs';
import { ComparisonTable } from '@/components/landing/ComparisonTable';
import { PricingSection } from '@/components/landing/PricingSection';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <div className="bg-brand-ivory dark:bg-brand-forest min-h-screen text-brand-ink dark:text-brand-ivory selection:bg-brand-coral/20 selection:text-brand-forest-light overflow-x-hidden font-inter transition-colors duration-300">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="space-y-20 md:space-y-28 focus:outline-none">
        <Hero />

        <CreatorQuote />

        <section id="features" aria-label="Core Capabilities" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureTabs />
        </section>

        <section id="comparison" aria-label="Competitive Differentiation" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ComparisonTable />
        </section>

        <section id="pricing" aria-label="Enterprise Pricing" className="scroll-mt-24">
          <PricingSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
