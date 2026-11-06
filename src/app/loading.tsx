import { Shield } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F7F2E8] p-6 sm:p-8 flex flex-col font-inter">
      {/* Top Header Skeleton */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between pb-6 border-b border-[#E8DFD0]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#123B2F]/15 flex items-center justify-center animate-pulse">
            <Shield className="w-4 h-4 text-[#123B2F]/40" />
          </div>
          <div className="space-y-1.5">
            <div className="h-4 w-32 bg-[#E8DFD0] rounded-md animate-pulse" />
            <div className="h-3 w-48 bg-[#E8DFD0]/60 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-[#E8DFD0] rounded-xl animate-pulse" />
          <div className="h-8 w-28 bg-[#123B2F]/20 rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Main Content Skeleton Grid */}
      <div className="max-w-7xl w-full mx-auto mt-8 space-y-6 flex-1">
        {/* Metric Cards Skeleton Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`metric-skel-${i}`}
              className="p-5 rounded-2xl bg-[#FAF6EF] border border-[#E8DFD0] space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 bg-[#E8DFD0] rounded animate-pulse" />
                <div className="w-6 h-6 rounded-md bg-[#E8DFD0]/60 animate-pulse" />
              </div>
              <div className="h-7 w-28 bg-[#123B2F]/15 rounded-md animate-pulse" />
              <div className="h-2.5 w-36 bg-[#E8DFD0]/50 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Big Table / Canvas Skeleton */}
        <div className="p-6 rounded-2xl bg-[#FAF6EF] border border-[#E8DFD0] space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]">
            <div className="h-5 w-44 bg-[#123B2F]/20 rounded-md animate-pulse" />
            <div className="h-8 w-32 bg-[#E8DFD0] rounded-lg animate-pulse" />
          </div>

          <div className="space-y-3 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`row-skel-${i}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/60 border border-[#E8DFD0]/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E8DFD0] animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-56 bg-[#123B2F]/15 rounded animate-pulse" />
                    <div className="h-2.5 w-32 bg-[#E8DFD0]/70 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-6 w-20 bg-[#E8DFD0]/60 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

