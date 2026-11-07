import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  FileText,
  BarChart3,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { HeroAtmosphere } from './HeroAtmosphere';
import { HeroDashboardMockup } from './HeroDashboardMockup';

interface HeroSectionProps {
  onOpenGetStarted?: () => void;
  onOpenDocs?: () => void;
}

export function HeroSection({}: HeroSectionProps = {}) {
  const featureCards = [
    {
      title: 'Verify Claims',
      subtitle: 'Back every claim with trusted sources',
      icon: ShieldCheck,
      iconBg: 'bg-[#E5EEDC] text-[#123B2F] dark:bg-white/10 dark:text-[#E5EEDC]',
    },
    {
      title: 'Understand Issues',
      subtitle: 'See clear explanations',
      icon: FileText,
      iconBg: 'bg-[#EFEAE0] text-[#123B2F] dark:bg-white/10 dark:text-[#E5EEDC]',
    },
    {
      title: 'Track Progress',
      subtitle: 'Build confidence over time',
      icon: BarChart3,
      iconBg: 'bg-[#EFEAE0] text-[#123B2F] dark:bg-white/10 dark:text-[#E5EEDC]',
    },
    {
      title: 'Stay Compliant',
      subtitle: 'Follow brand & policy guidelines',
      icon: CheckCircle2,
      iconBg: 'bg-[#EFEAE0] text-[#123B2F] dark:bg-white/10 dark:text-[#E5EEDC]',
    },
  ];

  return (
    <section id="hero" aria-label="Product Overview" className="w-full relative overflow-hidden bg-[#F7F2E8] dark:bg-[#123B2F] transition-colors duration-300 pt-6 sm:pt-10 pb-12 sm:pb-16">
      <HeroAtmosphere />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-5 text-left space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#7C8875]/30 dark:border-white/20 bg-[#E5EEDC]/70 dark:bg-white/10 text-[#2B3B28] dark:text-[#E5EEDC] text-xs font-medium shadow-2xs cursor-default">
              <span>✦</span>
              <span>AI-assisted brand governance</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-[#123B2F] dark:text-[#F7F2E8] font-serif leading-[1.08]">
              Brand-safe <br />
              content,{' '}
              <span className="text-[#C85A32] dark:text-[#F47745] italic font-serif">
                explained.
              </span>
            </h1>

            <p className="text-[#4D5547] dark:text-[#CBD5C0] text-sm sm:text-base leading-relaxed font-normal max-w-lg">
              Markwise reviews content before it goes live, shows why each issue was flagged,
              links claims to approved evidence, and turns every human correction into a better,
              versioned rule.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/login"
                className="px-7 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#123B2F] hover:bg-[#1A4C3E] dark:bg-[#F47745] dark:hover:bg-[#dc612e] rounded-full transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98] inline-flex items-center justify-center gap-2 group min-h-[44px]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/docs"
                className="px-7 py-3.5 text-xs sm:text-sm font-semibold text-[#123B2F] dark:text-[#F7F2E8] border border-[#D5CDBD] dark:border-[#235A4A] bg-white/70 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 rounded-full transition-all duration-150 cursor-pointer active:scale-[0.98] inline-flex items-center justify-center gap-2 shadow-2xs min-h-[44px]"
              >
                <BookOpen className="w-4 h-4 text-[#123B2F] dark:text-[#F7F2E8]" />
                <span>Read the Docs</span>
              </Link>
            </div>

            <div className="pt-4">
              <span className="text-[10px] font-bold tracking-widest text-[#7C8875] dark:text-[#CBD5C0] uppercase block">
                BUILT FOR TEAMS IN FINANCE, HEALTHCARE, AND TECH
              </span>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                {['FINANCE', 'HEALTHCARE', 'ENTERPRISE SAAS', 'TECH'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded text-[10px] font-semibold text-[#545F50] dark:text-[#E5EEDC] bg-[#DFDACD]/80 dark:bg-white/10 tracking-wider uppercase shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <HeroDashboardMockup priority={true} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 relative z-10 scroll-mt-24">
        <div className="bg-[#FAF7F0]/90 dark:bg-[#164638]/90 backdrop-blur-md rounded-2xl border border-[#D8D0C2] dark:border-[#235A4A] p-2.5 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.title}
                href="/login"
                className="p-3.5 rounded-xl flex items-center justify-between gap-3 text-left transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg bg-white/90 dark:bg-[#123B2F] border border-[#D8D0C2] dark:border-[#235A4A] group min-h-[58px]"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${feat.iconBg}`}
                  >
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  {/* Flexbox text container with clean wrapping (no ellipsis truncating) */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-bold text-[#123B2F] dark:text-[#F7F2E8] leading-snug">
                      {feat.title}
                    </span>
                    <span className="text-[11px] text-[#545B4E] dark:text-[#CBD5C0] leading-snug mt-0.5">
                      {feat.subtitle}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  className="w-4 h-4 shrink-0 text-[#8C9485] dark:text-[#CBD5C0] group-hover:text-[#123B2F] dark:group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Sub-banner Center Tag with Flanked Horizontal Dividers */}
      <div className="max-w-4xl mx-auto px-6 mt-10 flex items-center justify-center gap-4 relative z-10">
        <div className="h-px flex-1 bg-[#D8D0C2] dark:bg-[#235A4A]" />
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#7A8274] dark:text-[#CBD5C0] uppercase shrink-0">
          <span>✦</span>
          <span>A SMARTER WAY TO KEEP CONTENT ON-BRAND</span>
        </div>
        <div className="h-px flex-1 bg-[#D8D0C2] dark:bg-[#235A4A]" />
      </div>
    </section>
  );
}

export default HeroSection;
