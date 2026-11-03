import {
  BarChart,
  TrendingUp,
  Clock,
  ShieldCheck,
  GitCommit,
  ArrowUpRight,
  PieChart,
} from 'lucide-react';

export function InsightsPage() {
  const categories = [
    { name: 'Regulatory Misrepresentation (Banking/FDA)', percentage: 41, count: 58, color: 'bg-[#123B2F]' },
    { name: 'Unsubstantiated Performance Claims', percentage: 29, count: 42, color: 'bg-[#F47745]' },
    { name: 'Absolute Guarantee Prohibitions (FTC)', percentage: 18, count: 26, color: 'bg-[#1c5343]' },
    { name: 'Brand Voice & Superlative Clichés', percentage: 12, count: 16, color: 'bg-[#7A8274]' },
  ];

  const recentEvolutions = [
    {
      rule: 'Rule FIN-08',
      version: 'v2.3 → v2.4',
      author: 'Eleanor Vance (Legal)',
      date: 'Today, 2:15 PM',
      note: 'Pass-through deposit insurance language must explicitly name partner bank per FDIC 12 CFR Part 328.',
    },
    {
      rule: 'Rule MED-14',
      version: 'v3.1 → v3.2',
      author: 'Dr. Aris Thorne (Medical Affairs)',
      date: 'Yesterday, 11:40 AM',
      note: 'Comparative medical device efficacy requires multi-center retrospective validation citation anchor.',
    },
    {
      rule: 'Rule SEC-402',
      version: 'v1.8 → v1.9',
      author: 'Devon Patel (InfoSec)',
      date: 'Oct 28, 2026',
      note: 'Replaced emotional marketing adjectives ("unbreakable") with NIST SP 800-207 cipher identifiers.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123B2F] mb-1">
          <BarChart className="w-4 h-4 text-[#F47745]" />
          <span>Continuous Governance Telemetry</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#242820] font-inter">
          Insights & Analytics
        </h1>
        <p className="mt-1 text-sm text-[#545B4E]">
          Real-time metrics on content throughput, review cycle acceleration, and policy evolution patterns across your enterprise.
        </p>
      </div>

      {/* Top 3 High-Impact Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFFCF6] p-6 rounded-2xl border border-[#E8DFD0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A8274]">
            <span className="font-mono uppercase text-[11px] font-semibold">Content Analyzed</span>
            <span className="text-[#123B2F] font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              +24% vs last mo
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-[#242820] font-inter">
            142,850
          </div>
          <p className="text-xs text-[#545B4E]">
            Total published words continuously governed across 6 enterprise channels.
          </p>
        </div>

        <div className="bg-[#FFFCF6] p-6 rounded-2xl border border-[#E8DFD0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A8274]">
            <span className="font-mono uppercase text-[11px] font-semibold">Speed to Publish</span>
            <span className="text-[#123B2F] font-bold flex items-center gap-0.5">
              96% Reduction
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-[#123B2F] font-inter">
              4.2 hrs
            </span>
            <span className="text-xs text-[#7A8274] line-through font-mono">
              11 business days
            </span>
          </div>
          <p className="text-xs text-[#545B4E]">
            Average legal review turnaround from draft ingestion to verified sign-off.
          </p>
        </div>

        <div className="bg-[#FFFCF6] p-6 rounded-2xl border border-[#E8DFD0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A8274]">
            <span className="font-mono uppercase text-[11px] font-semibold">Zero-Drift Invariants</span>
            <span className="text-[#123B2F] font-bold">100% Guaranteed</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-[#242820] font-inter">
            0
          </div>
          <p className="text-xs text-[#545B4E]">
            Unsubstantiated or unapproved claims reaching live production environments.
          </p>
        </div>
      </div>

      {/* Two Column Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Flagged Claims by Category (Col 7) */}
        <div className="lg:col-span-7 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
            <h2 className="text-base font-bold text-[#242820] font-inter">
              Violation Breakdown by Category
            </h2>
            <span className="text-xs font-mono text-[#7A8274]">
              Last 90 Days
            </span>
          </div>

          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#242820]">{cat.name}</span>
                  <span className="font-mono font-bold text-[#123B2F]">
                    {cat.count} flags ({cat.percentage}%)
                  </span>
                </div>
                {/* Horizontal Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-[#F7F2E8] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-[#7A8274] flex items-center justify-between border-t border-[#E8DFD0]/60">
            <span>Aggregated across 84 reviewed collateral pieces</span>
            <span className="font-semibold text-[#123B2F]">74% Resolved in 1 Click</span>
          </div>
        </div>

        {/* Right: Living Rule Git-Like Commits (Col 5) */}
        <div className="lg:col-span-5 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
            <h2 className="text-base font-bold text-[#242820] font-inter flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[#F47745]" />
              <span>Living Rule Evolution Log</span>
            </h2>
            <span className="text-[11px] font-mono text-[#123B2F] font-semibold">
              Git Synced
            </span>
          </div>

          <div className="space-y-3.5">
            {recentEvolutions.map((item) => (
              <div
                key={item.rule}
                className="p-3 bg-[#F7F2E8] rounded-xl border border-[#E8DFD0] text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-mono font-bold">
                  <span className="text-[#123B2F]">{item.rule}</span>
                  <span className="text-[11px] text-[#F47745] bg-[#F47745]/10 px-1.5 py-0.2 rounded">
                    {item.version}
                  </span>
                </div>
                <p className="text-[11px] text-[#545B4E] leading-relaxed">
                  {item.note}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-[#7A8274]">
                  <span>{item.author}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
