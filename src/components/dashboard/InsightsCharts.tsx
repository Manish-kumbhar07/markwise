'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { FileText, Sparkles } from 'lucide-react';
import type { InsightsData } from '@/actions/insights';

interface InsightsChartsProps {
  data: InsightsData;
}

export function InsightsCharts({ data }: InsightsChartsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const severityData = data?.severityData || [];
  const statusData = data?.statusData || [];
  const totalViolations = severityData.reduce((acc, curr) => acc + (curr.count || 0), 0);
  const totalStatusIssues = statusData.reduce((acc, curr) => acc + (curr.count || 0), 0);
  const isDataEmpty = (data?.totalIssues || 0) === 0 && totalViolations === 0 && totalStatusIssues === 0;

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 h-[340px] flex items-center justify-center">
          <div className="animate-pulse text-xs text-[#7A8274]">Loading severity metrics...</div>
        </div>
        <div className="lg:col-span-5 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 h-[340px] flex items-center justify-center">
          <div className="animate-pulse text-xs text-[#7A8274]">Loading resolution distribution...</div>
        </div>
      </div>
    );
  }

  const barChartData = severityData.map((item) => ({
    name: item.label,
    count: item.count || 0,
    severity: item.severity,
  }));

  const pieChartData =
    statusData.length > 0 && !isDataEmpty
      ? statusData.map((item) => ({
          name: item.label,
          value: item.count || 0,
          color: item.color || '#123B2F',
        }))
      : [{ name: 'No Issues', value: 1, color: '#E8DFD0' }];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* 1. Bar Chart: Issues by Severity (Coral Orange) */}
      <div className="lg:col-span-7 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#242820] font-inter">
              Issues by Severity
            </h2>
            <p className="text-xs text-[#545B4E] mt-0.5">
              Policy violations categorized by business and compliance risk
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-[#F47745] bg-[#F47745]/10 px-2.5 py-0.5 rounded-md border border-[#F47745]/20">
            Severity Impact
          </span>
        </div>

        {isDataEmpty || totalViolations === 0 ? (
          <div className="h-[280px] w-full flex flex-col items-center justify-center text-center p-6 bg-[#FAF6EF]/60 rounded-xl border border-dashed border-[#E8DFD0] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6EF] border border-[#E8DFD0] flex items-center justify-center text-[#7A8274]">
              <FileText className="w-5 h-5 text-[#123B2F]" />
            </div>
            <p className="text-xs font-semibold text-[#242820]">
              No data yet. Run your first review to see insights.
            </p>
            <p className="text-[11px] text-[#7A8274] max-w-xs">
              When content is reviewed against brand guidelines, flagged severity trends will plot here in real time.
            </p>
          </div>
        ) : (
          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#545B4E', fontSize: 12 }}
                  axisLine={{ stroke: '#E8DFD0' }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: '#7A8274', fontSize: 11 }}
                  axisLine={{ stroke: '#E8DFD0' }}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#F7F2E8', opacity: 0.7 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const itemData = payload[0].payload as { name: string; count: number };
                      return (
                        <div className="bg-[#123B2F] text-[#F7F2E8] text-xs px-3 py-2 rounded-lg shadow-md border border-[#1c5343]">
                          <p className="font-semibold">{itemData.name}</p>
                          <p className="text-[#F47745] font-mono mt-0.5">
                            {itemData.count} {itemData.count === 1 ? 'issue' : 'issues'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#F47745" radius={[6, 6, 0, 0]} maxBarSize={55} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="pt-2 text-xs text-[#7A8274] flex items-center justify-between border-t border-[#E8DFD0]/60">
          <span>Categorized by severity weight</span>
          <span className="font-semibold text-[#123B2F]">
            {totalViolations} Total Violations
          </span>
        </div>
      </div>

      {/* 2. Pie Chart: Resolution Distribution */}
      <div className="lg:col-span-5 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#242820] font-inter">
              Resolution Distribution
            </h2>
            <p className="text-xs text-[#545B4E] mt-0.5">
              Breakdown by current review state
            </p>
          </div>
          <span className="text-[11px] font-mono font-semibold text-[#123B2F] bg-[#123B2F]/10 px-2 py-0.5 rounded">
            Live Status
          </span>
        </div>

        {isDataEmpty || totalStatusIssues === 0 ? (
          <div className="h-[280px] w-full flex flex-col items-center justify-center text-center p-6 bg-[#FAF6EF]/60 rounded-xl border border-dashed border-[#E8DFD0] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6EF] border border-[#E8DFD0] flex items-center justify-center text-[#7A8274]">
              <Sparkles className="w-5 h-5 text-[#F47745]" />
            </div>
            <p className="text-xs font-semibold text-[#242820]">
              No data yet. Run your first review to see insights.
            </p>
            <p className="text-[11px] text-[#7A8274] max-w-xs">
              Status resolutions (Accepted fixes, rules created, overrides) will visualize here automatically.
            </p>
          </div>
        ) : (
          <div className="h-[280px] w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const itemData = payload[0].payload as { name: string; value: number };
                      return (
                        <div className="bg-[#123B2F] text-[#F7F2E8] text-xs px-3 py-2 rounded-lg shadow-md border border-[#1c5343]">
                          <p className="font-semibold">{itemData.name}</p>
                          <p className="text-[#F47745] font-mono mt-0.5">
                            {itemData.value} {itemData.value === 1 ? 'issue' : 'issues'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', color: '#545B4E' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="pt-2 text-xs text-[#7A8274] flex items-center justify-between border-t border-[#E8DFD0]/60">
          <span>Palette: Forest Green, Coral, Slate</span>
          <span className="font-semibold text-[#123B2F]">
            {totalStatusIssues} Tracked
          </span>
        </div>
      </div>
    </div>
  );
}

export default InsightsCharts;

