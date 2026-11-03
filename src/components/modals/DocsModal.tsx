import { useState } from 'react';
import { X, BookOpen, Code2, Shield, GitBranch, Terminal } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocsModal({ isOpen, onClose }: DocsModalProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'rules' | 'api'>('architecture');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="docs-title"
    >
      <div className="bg-[#FAF6EF] border border-[#E8DFD0] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#174C3B] text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 id="docs-title" className="text-xl font-bold text-[#242820] font-inter">
                Markwise Enterprise Documentation
              </h3>
              <p className="text-xs text-[#545B4E]">
                Architecture, Living Rule Schemas, and CI/CD Integrations
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7A8274] hover:text-[#242820] hover:bg-[#E8DFD0]/40 transition-colors"
            aria-label="Close documentation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-4 border-b border-[#E8DFD0] shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-[#174C3B] text-[#174C3B]'
                : 'border-transparent text-[#7A8274] hover:text-[#242820]'
            }`}
          >
            The 10-Step Loop
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rules')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'rules'
                ? 'border-[#174C3B] text-[#174C3B]'
                : 'border-transparent text-[#7A8274] hover:text-[#242820]'
            }`}
          >
            Living Rule Syntax
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('api')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'api'
                ? 'border-[#174C3B] text-[#174C3B]'
                : 'border-transparent text-[#7A8274] hover:text-[#242820]'
            }`}
          >
            API & CI/CD
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-5 space-y-4 text-xs sm:text-sm text-[#545B4E] leading-relaxed pr-1">
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="font-bold text-[#242820] text-base">
                How Markwise Unifies AI Verification & Human Judgment
              </h4>
              <p>
                Traditional brand guidelines fail because they are static documents disconnected from production workflows. Markwise implements a closed-loop pipeline where:
              </p>
              <div className="bg-white p-4 rounded-xl border border-[#E8DFD0] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#174C3B]">
                  <span className="w-2 h-2 rounded-full bg-[#174C3B]" />
                  <span>Autonomous AI Processing (Steps 2, 3, 5, 7, 8, 9)</span>
                </div>
                <p className="text-xs text-[#545B4E]">
                  Handles high-throughput semantic evaluation, cross-referencing claims against evidence indices, generating causal explanations, and monitoring live digital footprints.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E8DFD0] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#F47745]">
                  <span className="w-2 h-2 rounded-full bg-[#F47745]" />
                  <span>Human Strategic Governance (Steps 1, 4, 6, 10)</span>
                </div>
                <p className="text-xs text-[#545B4E]">
                  Creators author content, brand editors approve nuanced phrasing, legal sign-offs apply cryptographic locks, and policy leads version company-wide standards.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-3">
              <h4 className="font-bold text-[#242820] text-base">
                Living Rule Definition (YAML Specification)
              </h4>
              <p>
                Rules are stored in version control (Git-compatible) and evolve as brand stewards approve or reject edge cases:
              </p>
              <pre className="p-4 bg-[#242820] text-[#F7F2E8] rounded-xl font-mono text-xs overflow-x-auto leading-normal">
{`rule_id: FIN-08
version: 2.4
title: "Deposit Insurance & Partner Bank Pass-Through"
jurisdiction: "US-FDIC-12CFR328"
severity: high

triggers:
  - patterns: ["FDIC insured", "insured deposits", "guaranteed balances"]
  - claim_type: "financial_protection"

requirements:
  evidence_anchor: "DOC-FDIC-EVOLVE-09"
  mandatory_qualifier: "held at [Named Member FDIC Partner Bank]"
  forbidden_superlatives: ["100% guaranteed", "proprietary insurance"]

evolution_log:
  - v2.3: "Permitted generic partner bank disclaimer."
  - v2.4: "Mandated exact legal institution name per FDIC 2025 bulletin."`}
              </pre>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-3">
              <h4 className="font-bold text-[#242820] text-base">
                CI/CD Webhook & Pre-Publish Verification
              </h4>
              <p>
                Block unverified content before it hits production with the Markwise CLI or REST API:
              </p>
              <pre className="p-4 bg-[#242820] text-[#F7F2E8] rounded-xl font-mono text-xs overflow-x-auto leading-normal">
{`# Pre-publish GitHub Action check
curl -X POST https://api.markwise.com/v1/verify \\
  -H "Authorization: Bearer $MARKWISE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Our zero-fee card delivers guaranteed fraud protection...",
    "jurisdiction": "US",
    "channel": "landing_page",
    "enforce_level": "strict"
  }'

# Response: HTTP 422 Unprocessable Content (Violations Detected)`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E8DFD0] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#7A8274]">
            Markwise SDK v3.8.2 · Enterprise OpenAPI Spec
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#174C3B] hover:bg-[#0e3025] rounded-lg transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
