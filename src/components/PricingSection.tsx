import { useState } from 'react';
import { Check, ShieldCheck, ArrowRight, Sparkles, Building, Lock } from 'lucide-react';
import { calculatePlanPrice, PricingPlan } from '../utils/governance';

interface PricingSectionProps {
  onOpenGetStarted: () => void;
}

const PLANS: PricingPlan[] = [
  {
    id: 'growth',
    name: 'Growth Governance',
    monthlyPrice: 590,
    annualPricePerMonth: 490,
    seatsIncluded: 10,
    costPerExtraSeat: 35,
    description: 'For growing marketing, content, and communications teams establishing rigorous brand safety.',
    features: [
      'Up to 10 Brand Guardians included',
      '50,000 reviewed words / month',
      'Full 10-Step Markwise Loop access',
      'Live Explainability & Causal Reasoning',
      'Up to 50 Versioned Living Brand Rules',
      'Evidence linking (Google Drive & Box)',
      'CMS Webhooks (Webflow & WordPress)',
      'Standard 24-hour support SLA',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Governance',
    monthlyPrice: 1490,
    annualPricePerMonth: 1250,
    seatsIncluded: 25,
    costPerExtraSeat: 30,
    badge: 'Most Popular for Enterprise',
    description: 'For regulated industries, global brands, and multi-tier legal and communications organizations.',
    features: [
      '25 Brand Guardians included (expandable)',
      '250,000 reviewed words / month',
      'Unlimited Versioned Living Rules & Diffs',
      'Regulatory Rule Packs (FTC, FDIC, FDA, SEC)',
      'Full Cryptographic Audit Trail & Seals',
      'Okta, Azure AD & Google SAML SSO',
      'Tamper-proof Staging Drift Prevention',
      'Dedicated Brand Policy Architect',
      'Target 99.9% Availability (Pilot Phase)',
    ],
  },
  {
    id: 'custom',
    name: 'Global Sovereign',
    monthlyPrice: 3200,
    annualPricePerMonth: 2750,
    seatsIncluded: 100,
    costPerExtraSeat: 25,
    description: 'For global conglomerates, defense, and multinational health systems requiring sovereign cloud isolation.',
    features: [
      'Unlimited Enterprise Seats & Workspaces',
      'Custom Volume (1M+ words/month)',
      'Private Cloud VPC or On-Premise Deployment',
      'Custom LLM Fine-Tuning on Internal Policies',
      'Zero Data Retention (ZDR) Legal Covenant',
      'Custom Jurisdiction Rules (EU AI Act, APAC)',
      '24/7 Dedicated Legal Response Desk',
      'Quarterly Executive Governance Audits',
    ],
  },
];

export function PricingSection({ onOpenGetStarted }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [extraSeats, setExtraSeats] = useState<number>(0);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#FCFAF5] border-t border-[#E8DFD0] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#174C3B]/10 text-[#174C3B] border border-[#174C3B]/20 mb-3">
            <span>Enterprise-Grade Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#242820] font-inter">
            Predictable brand protection.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#545B4E]">
            One regulatory fine or brand PR crisis costs millions. Markwise provides continuous peace of mind starting at $490/month.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-semibold transition-colors ${
                !isAnnual ? 'text-[#242820]' : 'text-[#7A8274]'
              }`}
            >
              Monthly Billing
            </span>

            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-[#174C3B] p-1 relative transition-colors focus-visible:outline-2 focus-visible:outline-[#174C3B] cursor-pointer"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle Annual or Monthly Billing"
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>

            <span
              className={`text-sm font-semibold transition-colors flex items-center gap-2 ${
                isAnnual ? 'text-[#242820]' : 'text-[#7A8274]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-xs font-bold text-[#F47745] bg-[#F47745]/10 px-2 py-0.5 rounded-full border border-[#F47745]/20">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const pricing = calculatePlanPrice(plan, isAnnual, extraSeats);
            const isFeatured = plan.id === 'enterprise';

            return (
              <div
                key={plan.id}
                className={`rounded-2xl border p-7 sm:p-9 flex flex-col justify-between transition-all duration-200 relative ${
                  isFeatured
                    ? 'bg-white border-[#174C3B] shadow-lg ring-2 ring-[#174C3B]/10 lg:-translate-y-2'
                    : 'bg-[#FAF6EF] border-[#E8DFD0] shadow-xs hover:bg-white'
                }`}
              >
                {/* Badge for featured plan */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#174C3B] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-[#242820] font-inter">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#545B4E] leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>

                  {/* Price display */}
                  <div className="mt-6 pb-6 border-b border-[#E8DFD0]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-[#242820] tracking-tight font-inter">
                        ${pricing.baseMonthlyRate}
                      </span>
                      <span className="text-xs sm:text-sm text-[#7A8274] font-medium">
                        / month
                      </span>
                    </div>

                    <div className="mt-1 text-xs text-[#7A8274]">
                      {isAnnual ? (
                        <span>Billed annually (${pricing.baseMonthlyRate * 12}/year)</span>
                      ) : (
                        <span>Billed monthly</span>
                      )}
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="mt-6 space-y-3">
                    <span className="text-[11px] font-bold text-[#174C3B] uppercase tracking-wider block">
                      Everything Included:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#242820]"
                        >
                          <Check className="w-4 h-4 text-[#174C3B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-6 border-t border-[#E8DFD0]">
                  <button
                    type="button"
                    onClick={onOpenGetStarted}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer ${
                      isFeatured
                        ? 'bg-[#F47745] hover:bg-[#dc612e] text-white shadow-xs active:scale-[0.98]'
                        : 'bg-[#174C3B] hover:bg-[#0e3025] text-white active:scale-[0.98]'
                    }`}
                  >
                    <span>{plan.id === 'custom' ? 'Contact Enterprise Sales' : 'Start 14-Day Pilot'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="mt-2 text-center text-[11px] text-[#7A8274]">
                    No credit card required for pilot setup
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Regulatory Compliance Banner */}
        <div className="mt-16 bg-white border border-[#E8DFD0] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#edf4f1] text-[#174C3B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#242820] font-inter">
                Need Custom Security & Data Retention Covenants?
              </h4>
              <p className="text-xs sm:text-sm text-[#545B4E] mt-0.5">
                We sign Business Associate Agreements (BAA), custom Data Processing Agreements (DPA), and provide dedicated single-tenant VPC options.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenGetStarted}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#174C3B] border border-[#174C3B]/30 hover:bg-[#FAF6EF] rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Request Security Whitepaper
          </button>
        </div>
      </div>
    </section>
  );
}
