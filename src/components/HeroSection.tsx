import { Sparkles, ArrowRight, BookOpen, ShieldCheck, FileCheck2, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onOpenGetStarted: () => void;
  onOpenDocs: () => void;
}

export function HeroSection({ onOpenGetStarted, onOpenDocs }: HeroSectionProps) {
  return (
    <section className="relative pt-10 pb-10 md:pt-14 md:pb-12 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Pill Badge at the top */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#174C3B]/20 bg-[#174C3B]/5 text-[#174C3B] text-xs sm:text-sm font-medium mb-8 shadow-2xs hover:bg-[#174C3B]/10 transition-colors cursor-default">
          <Sparkles className="w-3.5 h-3.5 text-[#F47745]" />
          <span>AI-assisted brand governance</span>
        </div>

        {/* Huge Heading: Inter, Bold, text-primary */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#242820] font-inter leading-[1.08] max-w-4xl mx-auto text-balance">
          Brand-safe content, <span className="text-[#174C3B]">explained.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-[#545B4E] max-w-3xl mx-auto font-normal leading-relaxed text-balance">
          Markwise reviews content before it goes live, shows why each issue was flagged, links claims to approved evidence, and turns every human correction into a better, versioned rule.
        </p>

        {/* Two Call to Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={onOpenGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-[#F47745] hover:bg-[#dc612e] rounded-xl transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98] inline-flex items-center justify-center gap-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onOpenDocs}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-[#174C3B] border-2 border-[#174C3B] hover:bg-[#174C3B] hover:text-white rounded-xl transition-all duration-150 cursor-pointer active:scale-[0.98] inline-flex items-center justify-center gap-2 group bg-transparent"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read the Docs</span>
          </button>
        </div>

        {/* Enterprise Governance Trust Row */}
        <div className="mt-14 pt-8 border-t border-[#E8DFD0]/80 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs sm:text-sm text-[#7A8274] font-medium">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#174C3B]" />
              SOC 2 Type II Certified
            </span>
            <span className="text-[#E8DFD0] hidden sm:inline" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-[#174C3B]" />
              Auditable Evidence Anchors
            </span>
            <span className="text-[#E8DFD0] hidden sm:inline" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#174C3B]" />
              Zero Model Training Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
