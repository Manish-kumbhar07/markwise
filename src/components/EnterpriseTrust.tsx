import { ShieldCheck, Lock, KeyRound, Database, FileCheck } from 'lucide-react';

export function EnterpriseTrust() {
  const trustCards = [
    {
      icon: ShieldCheck,
      title: 'SOC 2 Type II Certified',
      description: 'Annual independent third-party audits verifying our security, availability, and confidential data processing practices.',
    },
    {
      icon: Database,
      title: 'Zero LLM Training Guarantee',
      description: 'Your enterprise marketing copy, brand codices, and confidential disclosures are never utilized to train foundation models.',
    },
    {
      icon: KeyRound,
      title: 'Enterprise SSO & SCIM',
      description: 'Seamless integration with Okta, Microsoft Entra ID / Azure AD, and Google Workspace SAML 2.0 with auto-provisioning.',
    },
    {
      icon: FileCheck,
      title: 'Immutable Cryptographic Seals',
      description: 'Every approved piece of collateral receives an immutable verification token ensuring zero unauthorized post-signoff tampering.',
    },
  ];

  return (
    <section className="py-16 md:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#174C3B] mb-2">
            Enterprise Security & Sovereignty
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242820] font-inter">
            Trusted by the most cautious legal teams.
          </h2>
          <p className="mt-3 text-base text-[#545B4E]">
            Built from the ground up for strict regulatory environments where content accuracy and data sovereignty cannot be compromised.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-[#E8DFD0] p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#edf4f1] text-[#174C3B] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-bold text-[#242820] font-inter mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#545B4E] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Testimonial / Proof Quote */}
        <div className="mt-12 bg-[#FCFAF5] border border-[#E8DFD0] rounded-2xl p-7 sm:p-10 max-w-4xl mx-auto">
          <blockquote className="text-base sm:text-lg text-[#242820] font-normal leading-relaxed text-center italic">
            &ldquo;Before Markwise, our legal review queue for product launches took 11 business days, and brand copywriters felt constantly second-guessed. Markwise replaced endless email threads with clear evidence-backed explanations. Our approval cycle dropped to 4 hours.&rdquo;
          </blockquote>
          <div className="mt-6 flex flex-col items-center justify-center text-center">
            <span className="font-bold text-sm text-[#242820]">
              Eleanor Vance
            </span>
            <span className="text-xs text-[#545B4E] mt-0.5">
              VP of Global Communications & Brand Protection, Apex Health Technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
