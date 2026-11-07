'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  EyeOff,
  Server,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Calendar,
  Check,
  ChevronRight,
  ShieldCheck,
  Download,
} from 'lucide-react';

const SECTIONS = [
  { id: 'data-privacy', title: 'Data Privacy & Isolation', icon: Lock },
  { id: 'zero-training', title: 'Zero LLM Training Guarantee', icon: EyeOff },
  { id: 'responsible-ai', title: 'Responsible AI & Explainability', icon: Sparkles },
  { id: 'soc2-roadmap', title: 'SOC 2 Compliance Roadmap', icon: ShieldCheck },
  { id: 'security-faq', title: 'Architecture FAQ & Covenants', icon: FileCheck2 },
];

export default function TrustCenterPage() {
  const [activeSection, setActiveSection] = useState('data-privacy');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-ivory dark:bg-brand-forest text-brand-ink dark:text-brand-ivory transition-colors duration-300 font-inter selection:bg-brand-coral/20 selection:text-brand-forest-light">
      {/* Top Header Bar */}
      <header className="border-b border-brand-border dark:border-[#235A4A] bg-brand-cream/90 dark:bg-brand-forest-dark/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted dark:text-zinc-300 hover:text-brand-forest dark:hover:text-white transition-colors"
            >
              <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-brand-border dark:text-[#235A4A]" aria-hidden="true">|</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-forest dark:bg-white text-white dark:text-brand-forest flex items-center justify-center text-xs shadow-2xs">
                <Shield aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
              </div>
              <span className="font-serif font-bold text-sm tracking-tight text-brand-forest dark:text-brand-ivory">
                Trust Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/how-it-works"
              className="text-xs font-semibold text-brand-muted dark:text-zinc-300 hover:text-brand-forest dark:hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark dark:hover:bg-brand-coral-hover rounded-full transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:outline-none"
            >
              <span>Explore Sandbox</span>
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Document Layout: Sidebar + Document Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Document Navigation Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white dark:bg-brand-forest-dark/70 rounded-2xl border border-brand-border dark:border-[#235A4A] p-5 shadow-xs space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-coral block">
                  Security Specification
                </span>
                <h2 className="text-base font-bold text-brand-ink dark:text-brand-ivory font-serif">
                  Document Navigation
                </h2>
                <p className="text-xs text-brand-muted dark:text-zinc-400">
                  Architectural principles, legal covenants, and certification roadmap.
                </p>
              </div>

              <nav aria-label="Trust Center Sections" className="space-y-1 pt-2 border-t border-brand-border dark:border-[#235A4A]/60">
                {SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-brand-forest text-white font-semibold shadow-xs'
                          : 'text-brand-muted dark:text-zinc-300 hover:bg-brand-cream dark:hover:bg-white/10 hover:text-brand-forest'
                      }`}
                    >
                      <Icon aria-hidden="true" className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-brand-coral' : ''}`} />
                      <span className="truncate">{sec.title}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="p-3 rounded-xl bg-brand-cream dark:bg-white/5 border border-brand-border dark:border-[#235A4A] space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-brand-forest dark:text-emerald-300 font-bold text-[11px]">
                  <ShieldCheck aria-hidden="true" className="w-4 h-4 text-emerald-600" />
                  <span>Enterprise Assurance</span>
                </div>
                <p className="text-[11px] text-brand-muted dark:text-zinc-400 leading-relaxed">
                  Need a custom Data Processing Agreement (DPA) or Business Associate Agreement (BAA)?
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-forest dark:text-emerald-300 hover:text-brand-coral"
                >
                  <span>Request Security Whitepaper</span>
                  <ChevronRight aria-hidden="true" className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Column: Editorial Document Content */}
          <main className="lg:col-span-8 space-y-12">
            {/* Header / Document Overview */}
            <div className="space-y-4 pb-8 border-b border-brand-border dark:border-[#235A4A]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest/10 dark:bg-white/10 text-brand-forest dark:text-brand-ivory text-xs font-semibold uppercase tracking-wider">
                <Shield aria-hidden="true" className="w-3.5 h-3.5 text-brand-coral" />
                <span>Enterprise Security &amp; Data Sovereignty</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-brand-forest dark:text-brand-ivory">
                Trust Center
              </h1>
              <p className="text-base sm:text-lg text-brand-muted dark:text-zinc-300 leading-relaxed">
                Enterprise content governance demands absolute transparency. Here are the architectural guarantees, data isolation covenants, and responsible AI safeguards that protect your brand.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-brand-subtle dark:text-zinc-400 pt-2 font-mono">
                <span>Version: 2026.4</span>
                <span aria-hidden="true">·</span>
                <span>Audience: Legal, Compliance, Infosec</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Live Audit Architecture</span>
              </div>
            </div>

            {/* Section 1: Data Privacy & Isolation */}
            <section id="data-privacy" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <Lock aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>01. Data Governance Architecture</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                Data Privacy &amp; Isolation
              </h2>
              <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                Enterprise draft copy is inspected exclusively in volatile, ephemeral worker memory and discarded immediately following analysis. Markwise does not store raw customer copy unless explicitly committed to a workspace draft record by an authenticated user.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-brand-forest-dark/50 p-4 rounded-xl border border-brand-border dark:border-[#235A4A] space-y-2">
                  <span className="font-bold text-xs text-brand-forest dark:text-brand-ivory block">
                    Volatile Memory Inspection
                  </span>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    Draft text analyzed in real-time is never cached to secondary storage or shared across service threads.
                  </p>
                </div>
                <div className="bg-white dark:bg-brand-forest-dark/50 p-4 rounded-xl border border-brand-border dark:border-[#235A4A] space-y-2">
                  <span className="font-bold text-xs text-brand-forest dark:text-brand-ivory block">
                    PostgreSQL Row-Level Security
                  </span>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    Every database query enforces workspace isolation at the engine level, guaranteeing zero cross-tenant leakage.
                  </p>
                </div>
                <div className="bg-white dark:bg-brand-forest-dark/50 p-4 rounded-xl border border-brand-border dark:border-[#235A4A] space-y-2">
                  <span className="font-bold text-xs text-brand-forest dark:text-brand-ivory block">
                    Encryption Standards
                  </span>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    TLS 1.3 encryption in transit with Perfect Forward Secrecy; AES-256 for all stored brand rules and evidence.
                  </p>
                </div>
                <div className="bg-white dark:bg-brand-forest-dark/50 p-4 rounded-xl border border-brand-border dark:border-[#235A4A] space-y-2">
                  <span className="font-bold text-xs text-brand-forest dark:text-brand-ivory block">
                    Role-Based Access Control
                  </span>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    Granular permissions separate Creator, Brand Policy Steward, Legal Counsel, and Workspace Administrator.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Zero LLM Training Guarantee */}
            <section id="zero-training" className="scroll-mt-24 space-y-6 pt-6 border-t border-brand-border dark:border-[#235A4A]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <EyeOff aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>02. Proprietary IP Protection</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                Zero LLM Training Guarantee
              </h2>
              <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                Your enterprise collateral, proprietary marketing guidelines, internal brand codices, and confidential disclosures are <strong>NEVER used to train, retune, or evaluate any foundation models</strong>.
              </p>

              <div className="bg-brand-cream dark:bg-brand-forest-dark/60 rounded-2xl border-2 border-emerald-600/30 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-emerald-600" />
                  <span>Contractual Non-Training Covenant</span>
                </div>
                <ul className="space-y-2 text-xs text-brand-muted dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>API agreements with model providers explicitly bar customer data usage for foundation model training.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Payloads are ephemeral: zero model fine-tuning, zero weight updates, zero public leakage.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check aria-hidden="true" className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>100% Customer IP Ownership: all rules, synthesized amendments, and evidence links remain your sole property.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: Responsible AI & Explainability */}
            <section id="responsible-ai" className="scroll-mt-24 space-y-6 pt-6 border-t border-brand-border dark:border-[#235A4A]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <Sparkles aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>03. Algorithmic Transparency</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                Responsible AI &amp; Causal Explainability
              </h2>
              <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                We reject &ldquo;black-box&rdquo; AI confidence scores. Every issue flagged by Markwise must cite an approved rule ID, quote the offending clause, and link to evidence in your Fact Vault.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-1">
                  <span className="font-bold text-brand-forest dark:text-brand-ivory block">Deterministic Attribution</span>
                  <p className="text-brand-muted dark:text-zinc-400">Flags specify exact rule ID, version number, and citation clause.</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-1">
                  <span className="font-bold text-brand-forest dark:text-brand-ivory block">Fact Vault Anchors</span>
                  <p className="text-brand-muted dark:text-zinc-400">All quantitative claims verify against unexpired audit reports and SEC filings.</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-1">
                  <span className="font-bold text-brand-forest dark:text-brand-ivory block">Human Gatekeeping</span>
                  <p className="text-brand-muted dark:text-zinc-400">AI assists and flags; certified human brand stewards hold final publishing power.</p>
                </div>
              </div>
            </section>

            {/* Section 4: SOC 2 Compliance Roadmap */}
            <section id="soc2-roadmap" className="scroll-mt-24 space-y-6 pt-6 border-t border-brand-border dark:border-[#235A4A]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <ShieldCheck aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>04. Compliance Roadmap</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                SOC 2 Compliance Roadmap
              </h2>
              <p className="text-sm text-brand-muted dark:text-zinc-300 leading-relaxed">
                Markwise is engineered from ground zero following the AICPA Trust Services Criteria (Security, Availability, Confidentiality). Here is our transparent compliance roadmap:
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-forest dark:text-emerald-300 font-mono">Phase 1: Architecture Alignment (Active)</span>
                    <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">COMPLETE</span>
                  </div>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    Infrastructure-as-Code with automated vulnerability scans, mandatory MFA, least-privilege IAM, and cryptographic audit logging.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-forest dark:text-emerald-300 font-mono">Phase 2: SOC 2 Type I Readiness (Q2 2026)</span>
                    <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded text-[10px]">IN PROGRESS</span>
                  </div>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    Independent third-party readiness audit of internal controls, policies, and tenant isolation boundaries.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-forest dark:text-emerald-300 font-mono">Phase 3: SOC 2 Type II Observation (Q4 2026)</span>
                    <span className="bg-brand-cream dark:bg-white/10 text-brand-muted dark:text-zinc-400 font-bold px-2 py-0.5 rounded text-[10px]">SCHEDULED</span>
                  </div>
                  <p className="text-xs text-brand-muted dark:text-zinc-400">
                    6-month observation period validating continuous operational effectiveness across production environments.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Security FAQ & CTA */}
            <section id="security-faq" className="scroll-mt-24 space-y-6 pt-6 border-t border-brand-border dark:border-[#235A4A]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-forest dark:text-emerald-300">
                <FileCheck2 aria-hidden="true" className="w-4 h-4 text-brand-coral" />
                <span>05. Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-ink dark:text-brand-ivory">
                Architecture FAQ &amp; Legal Covenants
              </h2>

              <div className="space-y-4 text-xs">
                <div className="p-5 rounded-xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-1.5">
                  <h3 className="font-bold text-sm text-brand-ink dark:text-brand-ivory">
                    Can Markwise be deployed on private cloud or on-premises?
                  </h3>
                  <p className="text-brand-muted dark:text-zinc-300 leading-relaxed">
                    Yes. Under our Global Sovereign tier, Markwise provides dedicated single-tenant VPC deployments on AWS, Google Cloud, or Microsoft Azure with customer-managed encryption keys (CMEK).
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-brand-forest-dark/50 border border-brand-border dark:border-[#235A4A] space-y-1.5">
                  <h3 className="font-bold text-sm text-brand-ink dark:text-brand-ivory">
                    How does Markwise detect staging drift after approval?
                  </h3>
                  <p className="text-brand-muted dark:text-zinc-300 leading-relaxed">
                    Every approved document generates a SHA-256 seal combining content, rule versions, and approver signature. CMS webhooks periodically check published endpoints against this seal to alert on unauthorized modifications.
                  </p>
                </div>
              </div>

              {/* Call to action */}
              <div className="bg-brand-cream dark:bg-brand-forest-dark rounded-2xl border border-brand-border dark:border-[#235A4A] p-8 text-center space-y-4">
                <h3 className="text-xl font-bold font-serif text-brand-forest dark:text-brand-ivory">
                  Ready to test our enterprise security?
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted dark:text-zinc-300 max-w-lg mx-auto">
                  Experience our isolated workspace sandbox and review how deterministic causal reasoning protects your organization.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Link
                    href="/login"
                    className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-forest dark:bg-brand-coral hover:bg-brand-forest-dark dark:hover:bg-brand-coral-hover rounded-full transition-all inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Launch Free Sandbox</span>
                    <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
