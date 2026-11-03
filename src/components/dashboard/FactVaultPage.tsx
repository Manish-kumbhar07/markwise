import React, { useState } from 'react';
import {
  Database,
  Plus,
  Search,
  Calendar,
  FileCheck2,
  AlertCircle,
  X,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';
import {
  type FactRecord,
  INITIAL_MOCK_FACTS,
} from '../../utils/dashboard';

export function FactVaultPage() {
  const [facts, setFacts] = useState<FactRecord[]>(INITIAL_MOCK_FACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal Form State
  const [newClaim, setNewClaim] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newStatus, setNewStatus] = useState<'Valid' | 'Expired'>('Valid');
  const [modalError, setModalError] = useState<string | null>(null);

  const handleAddFact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClaim.trim()) {
      setModalError('Please enter the Claim statement.');
      return;
    }
    if (!newSource.trim()) {
      setModalError('Please enter an Evidence Source reference.');
      return;
    }
    if (!newExpiry) {
      setModalError('Please specify an Expiry Date.');
      return;
    }

    const nextId = `FV-80${facts.length + 1}`;
    const newRecord: FactRecord = {
      id: nextId,
      claim: newClaim.trim(),
      evidenceSource: newSource.trim(),
      expiryDate: newExpiry,
      status: newStatus,
    };

    setFacts([newRecord, ...facts]);
    setNewClaim('');
    setNewSource('');
    setNewExpiry('');
    setNewStatus('Valid');
    setModalError(null);
    setIsAddModalOpen(false);
  };

  const filteredFacts = facts.filter((f) => {
    const q = searchQuery.toLowerCase();
    return (
      f.claim.toLowerCase().includes(q) ||
      f.evidenceSource.toLowerCase().includes(q) ||
      f.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header with Forest Green "Add Fact" Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8DFD0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123B2F] mb-1">
            <Database className="w-4 h-4 text-[#F47745]" />
            <span>Deterministic Truth Anchors</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#242820] font-inter">
            Fact Vault
          </h1>
          <p className="mt-1 text-sm text-[#545B4E]">
            Immutable evidence repository anchoring marketing and product claims to verified legal and technical sources.
          </p>
        </div>

        {/* "Add Fact" Button (Forest Green) */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#123B2F] hover:bg-[#0c2921] active:bg-[#081f18] text-white text-sm font-semibold flex items-center gap-2 shadow-xs cursor-pointer transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Fact</span>
        </button>
      </div>

      {/* Filter and Metrics Summary Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFFCF6] p-4 rounded-2xl border border-[#E8DFD0] shadow-2xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-[#7A8274] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search claim, statutory authority, or evidence source..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-xs sm:text-sm text-[#242820] placeholder-[#7A8274]/70 focus:outline-none focus:border-[#123B2F]"
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-[#545B4E]">
            Total Facts: <strong className="text-[#242820]">{facts.length}</strong>
          </span>
          <span className="text-[#7A8274]">·</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            {facts.filter((f) => f.status === 'Valid').length} Valid
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {facts.filter((f) => f.status === 'Expired').length} Expired
          </span>
        </div>
      </div>

      {/* shadcn Data Table */}
      <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#E8DFD0] bg-[#F7F2E8]/60">
              <TableHead className="w-[45%] py-3.5 px-6 font-mono text-[11px] uppercase tracking-wider text-[#545B4E]">
                Claim
              </TableHead>
              <TableHead className="w-[30%] py-3.5 px-6 font-mono text-[11px] uppercase tracking-wider text-[#545B4E]">
                Evidence Source
              </TableHead>
              <TableHead className="w-[12%] py-3.5 px-6 font-mono text-[11px] uppercase tracking-wider text-[#545B4E]">
                Expiry Date
              </TableHead>
              <TableHead className="w-[13%] py-3.5 px-6 font-mono text-[11px] uppercase tracking-wider text-[#545B4E] text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFacts.map((fact) => {
              const isExpired = fact.status === 'Expired';

              return (
                <TableRow
                  key={fact.id}
                  className={`border-b border-[#E8DFD0]/60 transition-colors ${
                    isExpired
                      ? 'bg-[#FDECE4] hover:bg-[#fadfd4]'
                      : 'hover:bg-[#F7F2E8]/50'
                  }`}
                >
                  {/* Claim Column */}
                  <TableCell className="py-4 px-6 align-top">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold text-[#123B2F] bg-[#123B2F]/10 px-2 py-0.5 rounded">
                          {fact.id}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#242820] leading-snug">
                        &ldquo;{fact.claim}&rdquo;
                      </p>
                    </div>
                  </TableCell>

                  {/* Evidence Source Column */}
                  <TableCell className="py-4 px-6 align-top">
                    <div className="flex items-start gap-2 text-xs text-[#545B4E]">
                      <FileText className="w-3.5 h-3.5 text-[#123B2F] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#242820]">
                        {fact.evidenceSource}
                      </span>
                    </div>
                  </TableCell>

                  {/* Expiry Date Column */}
                  <TableCell className="py-4 px-6 align-top">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#545B4E]">
                      <Calendar className="w-3.5 h-3.5 text-[#7A8274]" />
                      <span>{fact.expiryDate}</span>
                    </div>
                  </TableCell>

                  {/* Status Column */}
                  <TableCell className="py-4 px-6 align-top text-right">
                    {isExpired ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Expired
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Valid
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {filteredFacts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-12 text-center text-sm text-[#7A8274]"
                >
                  No facts found matching &ldquo;{searchQuery}&rdquo;.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Evidence Integrity Notice */}
      <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A8274]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#123B2F]" />
          <span>
            Expired facts trigger automatic blocking alerts across active drafts in Review Content.
          </span>
        </div>
        <div className="font-mono text-[#123B2F] font-semibold">
          SHA-256 Ledger Synchronized
        </div>
      </div>

      {/* Add Fact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FFFCF6] border border-[#E8DFD0] rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#123B2F] text-white flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#242820] font-inter">
                    Add Fact to Vault
                  </h3>
                  <p className="text-xs text-[#7A8274]">
                    Anchor approved marketing statements to proof
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#7A8274] hover:text-[#242820] p-1.5 rounded-lg hover:bg-[#F7F2E8] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modalError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleAddFact} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="fact-claim"
                  className="block text-xs font-semibold text-[#242820] uppercase font-mono tracking-wider"
                >
                  Claim Statement
                </label>
                <textarea
                  id="fact-claim"
                  rows={3}
                  value={newClaim}
                  onChange={(e) => setNewClaim(e.target.value)}
                  placeholder="e.g. 99.99% platform uptime guaranteed across all enterprise tier SLAs."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="fact-source"
                  className="block text-xs font-semibold text-[#242820] uppercase font-mono tracking-wider"
                >
                  Evidence Source
                </label>
                <input
                  id="fact-source"
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="e.g. Master Services Agreement §1.3 (SLA Exhibit B)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] placeholder-[#7A8274]/60 focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="fact-expiry"
                    className="block text-xs font-semibold text-[#242820] uppercase font-mono tracking-wider"
                  >
                    Expiry Date
                  </label>
                  <input
                    id="fact-expiry"
                    type="date"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="fact-status"
                    className="block text-xs font-semibold text-[#242820] uppercase font-mono tracking-wider"
                  >
                    Status
                  </label>
                  <select
                    id="fact-status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as 'Valid' | 'Expired')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] text-sm text-[#242820] font-medium focus:outline-none focus:border-[#123B2F] focus:ring-1 focus:ring-[#123B2F]"
                  >
                    <option value="Valid">Valid</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8DFD0] text-sm font-semibold text-[#545B4E] hover:bg-[#F7F2E8] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#123B2F] hover:bg-[#0c2921] text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Fact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
