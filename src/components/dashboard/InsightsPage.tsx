'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart as BarChartIcon,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Layers,
  BookOpen,
} from 'lucide-react';
import { getClientInsightsData, type InsightsData } from '@/actions/insights';
import { InsightsCharts } from './InsightsCharts';

interface InsightsPageProps {
  initialData?: InsightsData;
}

export function InsightsPage({ initialData }: InsightsPageProps) {
  const [data, setData] = useState<InsightsData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getClientInsightsData();
      setData(result);
    } catch (err: unknown) {
      console.error('Failed to load insights:', err);
      setError(err instanceof Error ? err.message : 'Failed to load insights data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      void fetchData();
    }
    const handleWsChanged = () => {
      void fetchData();
    };
    window.addEventListener('workspace-changed', handleWsChanged);
    return () => window.removeEventListener('workspace-changed', handleWsChanged);
  }, [initialData]);

  const handleNavigateToReview = () => {
    window.history.pushState({}, '', '/dashboard/review');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123B2F] mb-1">
            <BarChartIcon className="w-4 h-4 text-[#F47745]" />
            <span>Continuous Telemetry Engine</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#242820] font-inter">
            Governance Telemetry
          </h1>
          <p className="mt-1 text-sm text-[#545B4E]">
            Live aggregate telemetry on policy compliance, issue severity distribution, and brand rule velocity.
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl border border-[#E8DFD0] bg-[#FFFCF6] text-[#242820] hover:bg-[#F7F2E8] transition-colors self-start sm:self-auto cursor-pointer shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#123B2F] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchData}
            className="underline font-semibold hover:text-red-900 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

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
            {loading && !data ? (
              <span className="inline-block w-16 h-8 bg-[#E8DFD0]/40 rounded animate-pulse" />
            ) : (
              data?.totalRules ?? 0
            )}
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
            {loading && !data ? (
              <span className="inline-block w-16 h-8 bg-[#E8DFD0]/40 rounded animate-pulse" />
            ) : (
              data?.totalIssues ?? 0
            )}
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
              {loading && !data ? (
                <span className="inline-block w-16 h-8 bg-[#E8DFD0]/40 rounded animate-pulse" />
              ) : (
                `${data?.resolutionRate ?? 0}%`
              )}
            </span>
            <span className="text-xs text-[#7A8274] font-mono">
              ({data?.resolvedIssues ?? 0} resolved)
            </span>
          </div>
          <p className="text-xs text-[#545B4E]">
            Proportion of flagged issues accepted or codified into new rules.
          </p>
        </div>
      </div>

      {/* Main Charts or Empty State */}
      {data && data.totalIssues === 0 ? (
        /* Empty State */
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
            <button
              onClick={handleNavigateToReview}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#123B2F] text-[#F7F2E8] font-semibold text-sm hover:bg-[#1c5343] transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Run your first review</span>
              <ArrowRight className="w-4 h-4 text-[#F47745]" />
            </button>
          </div>
        </div>
      ) : data ? (
        <InsightsCharts data={data} />
      ) : (
        /* Loading skeleton */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 h-[340px] flex items-center justify-center">
            <div className="animate-pulse text-xs text-[#7A8274]">Loading telemetry charts...</div>
          </div>
          <div className="lg:col-span-5 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 h-[340px] flex items-center justify-center">
            <div className="animate-pulse text-xs text-[#7A8274]">Loading resolution distribution...</div>
          </div>
        </div>
      )}

      {/* Continuous Improvement Advisory Footer */}
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
          <button
            onClick={handleNavigateToReview}
            className="text-[#F47745] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            Review drafts <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InsightsPage;
