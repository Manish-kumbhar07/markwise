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
import type { SeverityStat, StatusStat } from '@/actions/insights';

interface InsightsClientChartsProps {
  severityData: SeverityStat[];
  statusData: StatusStat[];
}

export function InsightsClientCharts({
  severityData,
  statusData,
}: InsightsClientChartsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 h-[340px] flex items-center justify-center">
          <div className="animate-pulse text-xs text-[#7A8274]">Loading severity chart...</div>
        </div>
        <div className="lg:col-span-5 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 h-[340px] flex items-center justify-center">
          <div className="animate-pulse text-xs text-[#7A8274]">Loading status chart...</div>
        </div>
      </div>
    );
  }

  // Format data for Recharts
  const barChartData = severityData.map((item) => ({
    name: item.label,
    count: item.count,
    severity: item.severity,
  }));

  const pieChartData =
    statusData.length > 0
      ? statusData.map((item) => ({
          name: item.label,
          value: item.count,
          color: item.color,
        }))
      : [{ name: 'No Issues', value: 1, color: '#E8DFD0' }];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* 1. Bar Chart: Issues by Severity (Coral Orange) */}
      <div className="lg:col-span-7 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#242820] font-inter">
              Issues by Severity
            </h2>
            <p className="text-xs text-[#545B4E] mt-0.5">
              Live count of policy violations flagged by AI Review
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-[#F47745] bg-[#F47745]/10 px-2 py-0.5 rounded">
            Coral Chart
          </span>
        </div>

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
                    const data = payload[0].payload as { name: string; count: number };
                    return (
                      <div className="bg-[#123B2F] text-[#F7F2E8] text-xs px-3 py-2 rounded-lg shadow-md border border-[#1c5343]">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-[#F47745] font-mono mt-0.5">
                          {data.count} {data.count === 1 ? 'issue' : 'issues'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {/* Mandatory requirement: Bar chart uses Coral Orange */}
              <Bar dataKey="count" fill="#F47745" radius={[6, 6, 0, 0]} maxBarSize={55} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-2 text-xs text-[#7A8274] flex items-center justify-between border-t border-[#E8DFD0]/60">
          <span>Prioritized by severity impact</span>
          <span className="font-semibold text-[#123B2F]">
            {barChartData.reduce((acc, curr) => acc + curr.count, 0)} Total Violations
          </span>
        </div>
      </div>

      {/* 2. Pie Chart: Issues by Status (Forest Green, Coral Orange, Gray) */}
      <div className="lg:col-span-5 bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 sm:p-7 shadow-xs space-y-4">
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
                    const data = payload[0].payload as { name: string; value: number };
                    return (
                      <div className="bg-[#123B2F] text-[#F7F2E8] text-xs px-3 py-2 rounded-lg shadow-md border border-[#1c5343]">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-[#F47745] font-mono mt-0.5">
                          {data.value} {data.value === 1 ? 'issue' : 'issues'}
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

        <div className="pt-2 text-xs text-[#7A8274] flex items-center justify-between border-t border-[#E8DFD0]/60">
          <span>Palette: Forest Green, Coral, Gray</span>
          <span className="font-semibold text-[#123B2F]">
            {pieChartData.reduce((acc, curr) => acc + (curr.name !== 'No Issues' ? curr.value : 0), 0)} Tracked
          </span>
        </div>
      </div>
    </div>
  );
}

