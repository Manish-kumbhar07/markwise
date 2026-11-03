import React, { useState } from 'react';
import {
  Shield,
  Plus,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
  Info,
  Trash2,
} from 'lucide-react';
import {
  type RuleCard,
  type RuleType,
  type RuleSeverity,
  INITIAL_MOCK_RULES,
  getSeverityBorderClass,
  getSeverityBadgeColors,
} from '../../utils/dashboard';

export function BrandBrainPage() {
  const [rules, setRules] = useState<RuleCard[]>(INITIAL_MOCK_RULES);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<RuleType>('CLAIM');
  const [severity, setSeverity] = useState<RuleSeverity>('HIGH');
  const [definition, setDefinition] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormError('Please enter a descriptive Rule Title.');
      return;
    }
    if (!definition.trim()) {
      setFormError('Please provide a Definition and enforcement scope.');
      return;
    }

    const nextIndex = rules.length + 15;
    const formattedId = `BR-0${nextIndex} v1`;

    const newRule: RuleCard = {
      id: formattedId,
      title: title.trim(),
      type,
      severity,
      definition: definition.trim(),
      createdAt: 'Just now · v1.0',
    };

    setRules([newRule, ...rules]);
    setTitle('');
    setType('CLAIM');
    setSeverity('HIGH');
    setDefinition('');
    setFormError(null);
    setSuccessMessage(`Rule ${formattedId} committed to Brand Brain!`);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8DFD0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123B2F] mb-1">
            <Shield className="w-4 h-4 text-[#F47745]" />
            <span>Living Enterprise Codex</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#242820] font-inter">
            Brand Brain
          </h1>
          <p className="mt-1 text-sm text-[#545B4E]">
            Define version-controlled brand guidelines, legal invariants, and voice constraints that govern enterprise content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#FFFCF6] border border-[#E8DFD0] text-[#123B2F] font-semibold flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {rules.length} Active Rules Live
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN (1/3 width): Create Rule Form */}
        <div className="lg:col-span-1">
          <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]/60 mb-5">
              <div>
                <h2 className="text-lg font-bold text-[#242820] font-inter">
                  Create New Rule
                </h2>
                <p className="text-xs text-[#7A8274] mt-0.5">
                  Codify a new invariant for review pipelines
                </p>
              </div>
              <span className="w-7 h-7 rounded-lg bg-[#123B2F]/10 text-[#123B2F] flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </span>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{formError}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleCreateRule} className="space-y-4">
              {/* Title Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="rule-title"
                  className="block text-xs font-semibold text-[#242820] uppercase tracking-wider font-mono"
                >
                  Title
                </label>
                <input
                  id="rule-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Unqualified Zero-Fee Guarantee"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F] transition-all"
                />
              </div>

              {/* Type Select */}
              <div className="space-y-1.5">
                <label
                  htmlFor="rule-type"
                  className="block text-xs font-semibold text-[#242820] uppercase tracking-wider font-mono"
                >
                  Type
                </label>
                <div className="relative">
                  <select
                    id="rule-type"
                    value={type}
                    onChange={(e) => setType(e.target.value as RuleType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] font-medium appearance-none focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F] cursor-pointer"
                  >
                    <option value="BANNED_WORD">BANNED_WORD</option>
                    <option value="TONE">TONE</option>
                    <option value="CLAIM">CLAIM</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#545B4E]">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Severity Select */}
              <div className="space-y-1.5">
                <label
                  htmlFor="rule-severity"
                  className="block text-xs font-semibold text-[#242820] uppercase tracking-wider font-mono"
                >
                  Severity
                </label>
                <div className="relative">
                  <select
                    id="rule-severity"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as RuleSeverity)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] font-medium appearance-none focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F] cursor-pointer"
                  >
                    <option value="HIGH">HIGH (Blocking)</option>
                    <option value="MEDIUM">MEDIUM (Warning)</option>
                    <option value="LOW">LOW (Advisory)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#545B4E]">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        severity === 'HIGH'
                          ? 'bg-red-500'
                          : severity === 'MEDIUM'
                          ? 'bg-amber-500'
                          : 'bg-stone-400'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Definition Textarea */}
              <div className="space-y-1.5">
                <label
                  htmlFor="rule-definition"
                  className="block text-xs font-semibold text-[#242820] uppercase tracking-wider font-mono"
                >
                  Definition
                </label>
                <textarea
                  id="rule-definition"
                  rows={4}
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  placeholder="Specify the exact enforcement condition, banned phrases, or required substantiation criteria..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F] transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button (Coral Orange, Full Width) */}
              <button
                type="submit"
                className="w-full bg-[#F47745] hover:bg-[#e06634] active:bg-[#c85527] text-white font-semibold py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Rule</span>
              </button>
            </form>

            {/* Helper note */}
            <div className="mt-5 pt-4 border-t border-[#E8DFD0]/60 flex items-start gap-2 text-[11px] text-[#7A8274]">
              <Info className="w-3.5 h-3.5 shrink-0 text-[#123B2F] mt-0.5" />
              <span>
                New rules automatically compile to AST patterns and sync across the active review queue.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (2/3 width): Active Rules List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#242820] font-inter">
                Active Rules
              </h2>
              <p className="text-xs text-[#7A8274] mt-0.5">
                Enforcing corporate tone, regulatory compliance, and factual proof
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#7A8274]">
                Legend:
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-red-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                High
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Medium
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-stone-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-stone-400" />
                Low
              </span>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {rules.map((rule) => {
              const borderClass = getSeverityBorderClass(rule.severity);
              const badgeColors = getSeverityBadgeColors(rule.severity);

              return (
                <div
                  key={rule.id}
                  className={`bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] ${borderClass} border-l-4 p-6 shadow-xs hover:shadow-sm transition-all duration-150 space-y-3.5 group`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {/* Rule ID in JetBrains Mono */}
                        <span className="font-mono text-xs font-bold text-[#123B2F] bg-[#123B2F]/10 px-2.5 py-0.5 rounded-md border border-[#123B2F]/15">
                          {rule.id}
                        </span>

                        {/* Severity Badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeColors.bg} ${badgeColors.text} ${badgeColors.border}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badgeColors.dot}`} />
                          {rule.severity}
                        </span>

                        {/* Type Tag */}
                        <span className="font-mono text-[11px] font-semibold text-[#7A8274] uppercase tracking-wider bg-[#F7F2E8] px-2 py-0.5 rounded border border-[#E8DFD0]">
                          {rule.type}
                        </span>
                      </div>

                      {/* Rule Title */}
                      <h3 className="text-base font-bold text-[#242820] font-inter pt-1">
                        {rule.title}
                      </h3>
                    </div>

                    {/* Delete action */}
                    <button
                      type="button"
                      onClick={() => handleDeleteRule(rule.id)}
                      title="Archive Rule"
                      className="text-[#7A8274] hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors opacity-60 group-hover:opacity-100 self-end sm:self-auto cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Definition Box */}
                  <div className="bg-[#F7F2E8]/70 rounded-xl p-4 border border-[#E8DFD0]/70 text-xs text-[#545B4E] leading-relaxed">
                    <span className="font-mono font-semibold text-[#123B2F] block mb-1 text-[11px] uppercase tracking-wider">
                      Definition & Scope:
                    </span>
                    <p className="text-sm font-normal text-[#242820]">
                      {rule.definition}
                    </p>
                  </div>

                  {/* Card Meta Footer */}
                  <div className="flex items-center justify-between pt-1 text-[11px] text-[#7A8274] font-mono">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#F47745]" />
                      Auto-evaluates against live content
                    </span>
                    <span>{rule.createdAt || 'Active · v1.0'}</span>
                  </div>
                </div>
              );
            })}

            {rules.length === 0 && (
              <div className="bg-[#FFFCF6] rounded-2xl border border-dashed border-[#E8DFD0] p-12 text-center space-y-3">
                <Shield className="w-8 h-8 text-[#7A8274] mx-auto" />
                <h4 className="text-sm font-bold text-[#242820]">No Active Rules</h4>
                <p className="text-xs text-[#7A8274]">
                  Use the form on the left to create your first brand governance rule.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
