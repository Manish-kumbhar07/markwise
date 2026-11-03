import { useState } from 'react';
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  User,
  Building,
  Check,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { ApprovalItem, calculateApprovalStats } from '../../utils/dashboard';

export function ApprovalsPage() {
  const [items, setItems] = useState<ApprovalItem[]>([
    {
      id: 'app-01',
      title: 'Q3 Fintech Borderless Card Press Release',
      author: 'Marcus Vance',
      department: 'Global Marketing',
      status: 'pending',
      riskLevel: 'high',
      claimsCount: 2,
    },
    {
      id: 'app-02',
      title: 'Clinical Diagnostic Decision Copilot Whitepaper',
      author: 'Dr. Aris Thorne',
      department: 'Medical Affairs',
      status: 'pending',
      riskLevel: 'medium',
      claimsCount: 2,
    },
    {
      id: 'app-03',
      title: 'Enterprise Zero-Trust SLA Announcement',
      author: 'Rachel Lin',
      department: 'Product Marketing',
      status: 'pending',
      riskLevel: 'low',
      claimsCount: 1,
    },
    {
      id: 'app-04',
      title: 'Annual Security & Transparency Report 2026',
      author: 'Devon Patel',
      department: 'Information Security',
      status: 'approved',
      riskLevel: 'low',
      claimsCount: 0,
    },
  ]);

  const stats = calculateApprovalStats(items);

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'approved' as const } : item
      )
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123B2F] mb-1">
            <CheckCircle className="w-4 h-4 text-[#F47745]" />
            <span>Multi-Tier Sign-off Queue</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#242820] font-inter">
            Approvals
          </h1>
          <p className="mt-1 text-sm text-[#545B4E]">
            Designated sign-off gates for Legal Counsel, Brand Directors, and Executive Guardians with tamper-proof cryptographic audit stamps.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#7A8274]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#123B2F]" />
            Role: <strong>Principal Brand Guardian</strong>
          </span>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#FFFCF6] p-4 rounded-2xl border border-[#E8DFD0] shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A8274] block">
            Pending Legal Review
          </span>
          <span className="text-2xl font-bold font-inter text-[#F47745] mt-1 block">
            {stats.pending} Items
          </span>
        </div>

        <div className="bg-[#FFFCF6] p-4 rounded-2xl border border-[#E8DFD0] shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A8274] block">
            Signed & Locked
          </span>
          <span className="text-2xl font-bold font-inter text-[#123B2F] mt-1 block">
            {stats.approved} Cleared
          </span>
        </div>

        <div className="bg-[#FFFCF6] p-4 rounded-2xl border border-[#E8DFD0] shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A8274] block">
            High-Risk Claims
          </span>
          <span className="text-2xl font-bold font-inter text-[#242820] mt-1 block">
            {stats.highRisk} High Priority
          </span>
        </div>

        <div className="bg-[#FFFCF6] p-4 rounded-2xl border border-[#E8DFD0] shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A8274] block">
            Cryptographic Seals
          </span>
          <span className="text-2xl font-bold font-inter text-[#123B2F] mt-1 block">
            100% Verified
          </span>
        </div>
      </div>

      {/* Approvals Table */}
      <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-3">
          <h2 className="text-base font-bold text-[#242820] font-inter">
            Active Approval Queue
          </h2>
          <span className="text-xs text-[#7A8274]">
            Showing {items.length} items
          </span>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD0] text-[#7A8274] uppercase text-[10px] font-mono tracking-wider">
                <th className="py-3 px-3">Asset Title</th>
                <th className="py-3 px-3">Author & Department</th>
                <th className="py-3 px-3">Risk Assessment</th>
                <th className="py-3 px-3">Claims Flagged</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Approval Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD0]/60">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#F7F2E8]/60 transition-colors"
                >
                  <td className="py-4 px-3 font-semibold text-[#242820] max-w-xs">
                    <div>{item.title}</div>
                    <div className="text-[10px] font-mono text-[#7A8274] mt-0.5">
                      ID: {item.id.toUpperCase()}
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    <div className="text-[#242820] font-medium">{item.author}</div>
                    <div className="text-[#7A8274] text-[11px]">{item.department}</div>
                  </td>

                  <td className="py-4 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        item.riskLevel === 'high'
                          ? 'bg-[#fef1ec] text-[#F47745] border border-[#F47745]/30'
                          : item.riskLevel === 'medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-[#edf4f1] text-[#123B2F] border border-[#123B2F]/20'
                      }`}
                    >
                      {item.riskLevel} Risk
                    </span>
                  </td>

                  <td className="py-4 px-3 font-mono text-[#545B4E]">
                    {item.claimsCount} claims checked
                  </td>

                  <td className="py-4 px-3">
                    {item.status === 'approved' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123B2F]">
                        <Check className="w-3.5 h-3.5" />
                        Signed & Sealed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F47745]">
                        <Clock className="w-3.5 h-3.5" />
                        Awaiting Sign-off
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-3 text-right">
                    {item.status === 'approved' ? (
                      <span className="text-[11px] font-mono text-[#7A8274]">
                        Hash: SHA-256 Valid
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApprove(item.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#123B2F] hover:bg-[#0c2921] text-white font-semibold text-xs transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Sign & Seal</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
