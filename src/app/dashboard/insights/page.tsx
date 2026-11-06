import Link from 'next/link';
import {
  BarChart as BarChartIcon,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
} from 'lucide-react';
import { getInsightsData, type InsightsData } from '@/app/actions/insights';
import { InsightsCharts } from '@/components/dashboard/InsightsCharts';

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  let data: InsightsData;
  try {
    data = await getInsightsData();
  } catch {
    data = {
      totalRules: 0,
      totalIssues: 0,
      totalContents: 0,
      resolvedIssues: 0,
      resolutionRate: 0,
      severityData: [
        { severity: 'HIGH', label: 'High Risk', count: 0 },
        { severity: 'MEDIUM', label: 'Medium Risk', count: 0 },
        { severity: 'LOW', label: 'Low Risk', count: 0 },
      ],
      statusData: [
        { status: 'OPEN', label: 'Open Issues', count: 0, color: '#F47745' },
        { status: 'ACCEPTED', label: 'Accepted Fixes', count: 0, color: '#123B2F' },
        { status: 'RULE_CREATED', label: 'Rules Created', count: 0, color: '#174C3B' },
        { status: 'OVERRIDDEN', label: 'Ignored / Overridden', count: 0, color: '#7A8274' },
      ],
    };
  }

  const isDataEmpty = (data.totalRules === 0 && data.totalIssues === 0) || data.totalIssues === 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123B2F] mb-1">
            <BarChartIcon className="w-4 h-4 text-[#F47745]" />
            <span>Continuous Governance Telemetry</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#242820] font-inter">
            Insights & Analytics
          </h1>
          <p className="mt-1 text-sm text-[#545B4E]">
            Live aggregate telemetry on policy compliance, issue severity distribution, and brand rule velocity.
          </p>
        </div>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Rules Created */}
        <div className="bg-[#FFFCF6] p-6 rounded-2xl border border-[#E8DFD0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A8274]">
            <span className="font-mono uppercase text-[11px] font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#123B2F]" />
              Brand Rules Active
            </span>
            <span className="text-[#123B2F] font-bold flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Living Policy
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-[#242820] font-inter">
            {data.totalRules}
          </div>
          <p className="text-xs text-[#545B4E]">
            Enforced across all draft contents and real-time AI reviews.
          </p>
        </div>

        {/* Card 2: Total Issues Found */}
        <div className="bg-[#FFFCF6] p-6 rounded-2xl border border-[#E8DFD0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A8274]">
            <span className="font-mono uppercase text-[11px] font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#F47745]" />
              Issues Identified
            </span>
            <span className="text-[#F47745] font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Continuous Scan
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-[#242820] font-inter">
            {data.totalIssues}
          </div>
          <p className="text-xs text-[#545B4E]">
            Aggregate policy flags evaluated via Google Gemini and Brand Brain.
          </p>
        </div>

        {/* Card 3: Resolution Rate */}
        <div className="bg-[#FFFCF6] p-6 rounded-2xl border border-[#E8DFD0] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A8274]">
            <span className="font-mono uppercase text-[11px] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#123B2F]" />
              Resolution Rate
            </span>
            <span className="text-[#123B2F] font-bold">1-Click Fixed</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-[#123B2F] font-inter">
              {data.resolutionRate}%
            </span>
            <span className="text-xs text-[#7A8274] font-mono">
              ({data.resolvedIssues} resolved)
            </span>
          </div>
          <p className="text-xs text-[#545B4E]">
            Proportion of flagged issues accepted or codified into new rules.
          </p>
        </div>
      </div>

      {/* Main Charts or Empty State */}
      {isDataEmpty ? (
        <div className="bg-[#FFFCF6] rounded-2xl border-2 border-dashed border-[#E8DFD0] p-12 text-center space-y-5 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#F7F2E8] border border-[#E8DFD0] flex items-center justify-center mx-auto text-[#123B2F]">
            <Sparkles className="w-8 h-8 text-[#F47745]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#242820] font-inter">
              No Issues Tracked Yet
            </h3>
            <p className="text-sm text-[#545B4E] max-w-md mx-auto">
              No data yet. Run your first review to see insights.
            </p>
          </div>
          <div>
            <Link
              href="/dashboard/review"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#123B2F] text-[#F7F2E8] font-semibold text-sm hover:bg-[#1c5343] transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Run your first review</span>
              <ArrowRight className="w-4 h-4 text-[#F47745]" />
            </Link>
          </div>
        </div>
      ) : (
        <InsightsCharts data={data} />
      )}

      {/* Advisory Footer */}
      <div className="p-5 rounded-2xl bg-[#FFFCF6] border border-[#E8DFD0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#545B4E]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#123B2F]/10 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-[#123B2F]" />
          </div>
          <div>
            <p className="font-semibold text-[#242820]">Real-Time Prisma Aggregates</p>
            <p className="text-[11px]">Synced with PostgreSQL database telemetry on each review completion.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="font-mono text-[#123B2F] font-semibold">Active Workspace</span>
          <Link
            href="/dashboard/review"
            className="text-[#F47745] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            Review drafts <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
