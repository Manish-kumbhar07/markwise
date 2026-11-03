import {
  FileCheck2,
  GitBranch,
  ShieldCheck,
  Scale,
  Cpu,
  History,
  Lock,
  Workflow,
  Sparkles,
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: FileCheck2,
      tag: '01. Evidence-Backed Claims Engine',
      title: 'Every assertion anchored to verified proof',
      description:
        'Never publish an unsubstantiated claim. Markwise connects numerical assertions, clinical statistics, and performance SLAs directly to your enterprise repository of audit reports, SEC filings, and clinical trial outcomes.',
      highlights: [
        'Deterministic citation anchors with page & section resolution',
        'Automatic staleness detection for expired certifications',
        'Direct integration with Box, Google Drive, and Notion databases',
      ],
      badgeColor: 'border-[#174C3B]/20 text-[#174C3B] bg-[#174C3B]/5',
    },
    {
      icon: Scale,
      tag: '02. Causal Explainability',
      title: 'Clear clause citations, not black-box scores',
      description:
        'Generic AI tools give arbitrary percentages. Markwise breaks down every flagged issue using transparent legal reasoning, citing exact FTC guidelines, FDA SaMD rules, banking regulations, and your internal brand codex.',
      highlights: [
        'Plain-language risk justifications for creators and legal counsel',
        'Precise statutory & internal guideline citations',
        'Eliminates ambiguity in cross-functional creative debates',
      ],
      badgeColor: 'border-[#F47745]/20 text-[#F47745] bg-[#F47745]/5',
    },
    {
      icon: GitBranch,
      tag: '03. Living, Versioned Rulebook',
      title: 'Every human correction trains a better rule',
      description:
        'Brand guidelines are no longer static 80-page PDFs that collect dust. When legal or brand guardians edit a draft, Markwise synthesizes the correction into a versioned rule update (e.g. Rule v2.4) distributed across the org.',
      highlights: [
        'Git-style branch, merge, and rollback for company brand rules',
        'Changelog diffs showing the exact rationale behind every rule update',
        'Custom jurisdiction rules for EU AI Act, FTC, SEC, and HIPAA',
      ],
      badgeColor: 'border-[#174C3B]/20 text-[#174C3B] bg-[#174C3B]/5',
    },
    {
      icon: Workflow,
      tag: '04. Multi-Tier Enterprise Triage',
      title: 'Automated routing for high-stakes approvals',
      description:
        'Low-risk copy clears autonomously in seconds. High-stakes claims (financial projections, health claims, global press releases) automatically trigger triage workflows routing to legal counsel and brand directors.',
      highlights: [
        'Role-based approval gates with cryptographic audit logs',
        'Direct CMS & social publishing integrations (Webflow, HubSpot, X)',
        'Tamper-proof signature verification preventing staging drift',
      ],
      badgeColor: 'border-[#F47745]/20 text-[#F47745] bg-[#F47745]/5',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#174C3B] mb-2">
            Engineered for High-Stakes Enterprises
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#242820] font-inter">
            Guardrails that empower creative velocity.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#545B4E]">
            Brand compliance should never be an editorial bottleneck. Markwise gives marketing teams instant confidence and legal departments total traceability.
          </p>
        </div>

        {/* Asymmetric 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.tag}
                className="bg-white rounded-2xl border border-[#E8DFD0] p-7 sm:p-9 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF6EF] border border-[#E8DFD0] flex items-center justify-center text-[#174C3B]">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${feat.badgeColor}`}>
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#242820] font-inter mb-3">
                    {feat.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#545B4E] leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E8DFD0]/80">
                  <ul className="space-y-2.5">
                    {feat.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#242820]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#174C3B] mt-1.5 shrink-0" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
