import React, { useState, useEffect } from 'react';
import {
  Shield,
  Plus,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
  Info,
  Trash2,
  Loader2,
} from 'lucide-react';
import {
  type RuleCard,
  type RuleType,
  type RuleSeverity,
  getSeverityBorderClass,
  getSeverityBadgeColors,
} from '../../utils/dashboard';
import { getRules, createRule, deleteRule } from '../../actions/rules';
import { Skeleton } from '../ui/skeleton';
import { SeverityIndicator } from './SeverityIndicator';

export function BrandBrainPage() {
  const [rules, setRules] = useState<RuleCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<RuleType>('CLAIM');
  const [severity, setSeverity] = useState<RuleSeverity>('HIGH');
  const [definition, setDefinition] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load rules from database
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getRules();
        if (mounted) {
          const mapped: RuleCard[] = data.map((r) => ({
            id: r.id,
            title: r.title,
            type: (r.type as RuleType) || 'CLAIM',
            severity: (r.severity as RuleSeverity) || 'HIGH',
            definition: r.definition,
            createdAt: `Active · v${r.version}`,
          }));
          setRules(mapped);
        }
      } catch (err) {
        console.error('Failed to load rules:', err);
        if (mounted) {
          setLoadError(err instanceof Error ? err.message : 'Failed to load rules.');
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormError('Please enter a descriptive Rule Title.');
      return;
    }
    if (!definition.trim()) {
      setFormError('Please provide a Definition and enforcement scope.');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);

      const created = await createRule({
        title: title.trim(),
        type,
        severity,
        definition: definition.trim(),
      });

      const newCard: RuleCard = {
        id: created.id,
        title: created.title,
        type: (created.type as RuleType) || type,
        severity: (created.severity as RuleSeverity) || severity,
        definition: created.definition,
        createdAt: `Active · v${created.version}`,
      };

      setRules((prev) => [newCard, ...prev]);
      setTitle('');
      setType('CLAIM');
      setSeverity('HIGH');
      setDefinition('');
      setSuccessMessage(`Rule "${created.title}" successfully committed to database!`);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create rule';
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRule = async (id: string) => {
    try {
      await deleteRule(id);
      setRules((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete rule:', err);
      setFormError(err instanceof Error ? err.message : 'Failed to delete rule.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8DFD0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123B2F] mb-1">
            <Shield className="w-4 h-4 text-[#F47745]" />
            <span>Enterprise Policy Engine</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#242820] font-inter">
            Active Brand Rules
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
        <div className="lg:col-span-1 bg-[#FFFCF6] rounded-xl border border-[#E8DFD0] p-4 sm:p-5 shadow-xs sticky top-20">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E8DFD0]/70 mb-4">
            <div className="p-1.5 rounded-lg bg-[#123B2F] text-[#F7F2E8]">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#242820] font-inter">
                Create Governance Rule
              </h2>
              <p className="text-xs text-[#545B4E]">Commit a constraint to live enforcement</p>
            </div>
          </div>

          <form onSubmit={handleCreateRule} className="space-y-4">
            {formError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="rule-title" className="block text-xs font-semibold text-[#123B2F]">
                Rule Title
              </label>
              <input
                id="rule-title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Absolute Security & Guarantee Claims"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:outline-hidden focus:ring-2 focus:ring-[#123B2F] focus:border-transparent transition-all placeholder:text-[#7A8274]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="rule-type" className="block text-xs font-semibold text-[#123B2F]">
                  Rule Type
                </label>
                <select
                  id="rule-type"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as RuleType)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:outline-hidden focus:ring-2 focus:ring-[#123B2F] focus:border-transparent transition-all cursor-pointer font-medium"
                >
                  <option value="CLAIM">Claim Invariant</option>
                  <option value="TONE">Tone / Voice</option>
                  <option value="BANNED_WORD">Banned Word</option>
                </select>
              </div>

              {/* Severity Level */}
              <div className="space-y-1.5">
                <label htmlFor="rule-severity" className="block text-xs font-semibold text-[#123B2F]">
                  Severity
                </label>
                <select
                  id="rule-severity"
                  name="severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as RuleSeverity)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:outline-hidden focus:ring-2 focus:ring-[#123B2F] focus:border-transparent transition-all cursor-pointer font-medium"
                >
                  <option value="HIGH">High (Hard Gate)</option>
                  <option value="MEDIUM">Medium (Warn)</option>
                  <option value="LOW">Low (Advisory)</option>
                </select>
              </div>
            </div>

            {/* Definition */}
            <div className="space-y-1.5">
              <label htmlFor="rule-definition" className="block text-xs font-semibold text-[#123B2F]">
                Definition & Enforcement Scope
              </label>
              <textarea
                id="rule-definition"
                name="definition"
                rows={4}
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Explicitly define what is prohibited or mandated, exceptions, and required citations..."
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:outline-hidden focus:ring-2 focus:ring-[#123B2F] focus:border-transparent transition-all placeholder:text-[#7A8274] resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#123B2F] text-[#F7F2E8] font-inter font-semibold text-xs hover:bg-[#1b5343] active:bg-[#0c2921] transition-all duration-150 flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Commit Rule to Codex</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN (2/3 width): Rules List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-[#123B2F] uppercase tracking-wider font-mono">
              Enforced Codex Registry
            </h3>
            <span className="text-xs text-[#7A8274] flex items-center gap-1 font-mono">
              <SlidersHorizontal className="w-3 h-3" />
              Showing all active rules
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-[#FFFCF6] dark:bg-[#164336] rounded-xl border border-[#E8DFD0] dark:border-[#205243] p-4 shadow-xs border-l-4 border-l-[#D5CDBD] space-y-3"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#E8DFD0]/40">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-16 rounded-md" />
                        <Skeleton className="h-5 w-20 rounded-md" />
                      </div>
                      <Skeleton className="h-5 w-48 sm:w-64 rounded-md" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-md" />
                  <div className="flex items-center justify-between pt-1">
                    <Skeleton className="h-3 w-28 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : loadError ? (
            <div role="alert" className="bg-red-50 rounded-2xl border border-red-200 p-6 text-sm text-red-800">
              Could not load rules: {loadError}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {rules.map((rule) => {
                const borderClass = getSeverityBorderClass(rule.severity);
                const badgeColors = getSeverityBadgeColors(rule.severity);

                return (
                  <div
                    key={rule.id}
                    className={`bg-[#FFFCF6] rounded-xl border border-[#E8DFD0] p-4 shadow-xs border-l-4 ${borderClass} space-y-3 hover:border-[#123B2F]/30 transition-all duration-200 group`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-[#E8DFD0]/40 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <SeverityIndicator severity={rule.severity} />
                          <span className="font-mono text-[10px] font-semibold text-[#7A8274] uppercase tracking-wider bg-[#F7F2E8] px-2 py-0.5 rounded border border-[#E8DFD0]">
                            {rule.type}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-[#242820] font-inter pt-1">
                          {rule.title}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteRule(rule.id)}
                        title="Archive Rule"
                        className="text-[#7A8274] hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors opacity-60 group-hover:opacity-100 self-end sm:self-auto cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="bg-[#F7F2E8]/70 rounded-lg p-3 border border-[#E8DFD0]/70 text-xs text-[#545B4E] leading-snug">
                      <span className="font-mono font-semibold text-[#123B2F] block mb-1 text-[10px] uppercase tracking-wider">
                        Definition & Scope:
                      </span>
                      <p className="text-xs font-normal text-[#242820] leading-snug">
                        {rule.definition}
                      </p>
                    </div>

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
          )}
        </div>
      </div>
    </div>
  );
}
