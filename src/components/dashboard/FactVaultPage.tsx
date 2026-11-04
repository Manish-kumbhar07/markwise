import React, { useState, useEffect } from 'react';
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
  Loader2,
  Trash2,
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';
import { type FactRecord } from '../../utils/dashboard';
import { getFacts, createFact, deleteFact, DEFAULT_WORKSPACE_ID } from '../../actions/facts';

export function FactVaultPage() {
  const [facts, setFacts] = useState<FactRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal Form State
  const [newClaim, setNewClaim] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newStatus, setNewStatus] = useState<'Valid' | 'Expired'>('Valid');
  const [modalError, setModalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load facts from database
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getFacts(DEFAULT_WORKSPACE_ID);
        if (mounted) {
          const mapped: FactRecord[] = data.map((f) => ({
            id: f.id,
            claim: f.claim,
            evidenceSource: f.evidenceSource,
            expiryDate: new Date(f.expiryDate).toISOString().split('T')[0],
            status: (f.status as 'Valid' | 'Expired') || 'Valid',
          }));
          setFacts(mapped);
        }
      } catch (err) {
        console.error('Failed to load facts:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddFact = async (e: React.FormEvent) => {
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

    try {
      setIsSubmitting(true);
      setModalError(null);

      const created = await createFact({
        claim: newClaim.trim(),
        evidenceSource: newSource.trim(),
        expiryDate: new Date(newExpiry),
        status: newStatus,
        workspaceId: DEFAULT_WORKSPACE_ID,
      });

      const newRecord: FactRecord = {
        id: created.id,
        claim: created.claim,
        evidenceSource: created.evidenceSource,
        expiryDate: new Date(created.expiryDate).toISOString().split('T')[0],
        status: (created.status as 'Valid' | 'Expired') || 'Valid',
      };

      setFacts((prev) => [newRecord, ...prev]);
      setNewClaim('');
      setNewSource('');
      setNewExpiry('');
      setNewStatus('Valid');
      setIsAddModalOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create fact';
      setModalError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFact = async (id: string) => {
    try {
      setFacts((prev) => prev.filter((f) => f.id !== id));
      await deleteFact(id);
    } catch (err) {
      console.error('Failed to delete fact:', err);
    }
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
          className="px-4 py-2.5 rounded-xl bg-[#123B2F] text-[#F7F2E8] text-xs font-semibold hover:bg-[#1b5343] active:bg-[#0c2921] transition-all duration-150 flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Fact</span>
        </button>
      </div>

      {/* Main Fact Table Card */}
      <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] p-6 shadow-xs space-y-4">
        {/* Table Top Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A8274]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search claims, evidence sources, or IDs..."
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:outline-hidden focus:ring-2 focus:ring-[#123B2F] placeholder:text-[#7A8274]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#545B4E]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{facts.filter((f) => f.status === 'Valid').length} of {facts.length} Verified Active</span>
          </div>
        </div>

        {/* Facts Table */}
        {isLoading ? (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-6 h-6 text-[#123B2F] animate-spin mx-auto" />
            <p className="text-xs text-[#7A8274]">Loading facts from Supabase database...</p>
          </div>
        ) : (
          <div className="rounded-xl border border-[#E8DFD0] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#F7F2E8]/70">
                <TableRow className="border-b border-[#E8DFD0]">
                  <TableHead className="w-[120px] text-xs font-mono font-bold text-[#123B2F]">ID</TableHead>
                  <TableHead className="text-xs font-mono font-bold text-[#123B2F]">Verified Claim</TableHead>
                  <TableHead className="text-xs font-mono font-bold text-[#123B2F]">Evidence Source</TableHead>
                  <TableHead className="w-[130px] text-xs font-mono font-bold text-[#123B2F]">Expiry Date</TableHead>
                  <TableHead className="w-[100px] text-xs font-mono font-bold text-[#123B2F]">Status</TableHead>
                  <TableHead className="w-[60px] text-xs font-mono font-bold text-[#123B2F]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFacts.map((fact) => {
                  const isValid = fact.status === 'Valid';
                  return (
                    <TableRow key={fact.id} className="border-b border-[#E8DFD0]/60 hover:bg-[#F7F2E8]/30">
                      <TableCell className="font-mono text-xs font-semibold text-[#123B2F]">
                        {fact.id}
                      </TableCell>
                      <TableCell className="text-xs font-medium text-[#242820] max-w-md">
                        {fact.claim}
                      </TableCell>
                      <TableCell className="text-xs text-[#545B4E] max-w-xs font-mono">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#F47745] shrink-0" />
                          <span className="truncate">{fact.evidenceSource}</span>
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-[#7A8274]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#7A8274]" />
                          {fact.expiryDate}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isValid
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-red-50 text-red-800 border-red-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isValid ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                          {fact.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          type="button"
                          onClick={() => handleDeleteFact(fact.id)}
                          title="Delete Fact"
                          className="p-1 rounded text-[#7A8274] hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filteredFacts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-xs text-[#7A8274]">
                      No facts matched your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Add Fact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFCF6] rounded-2xl border border-[#E8DFD0] shadow-xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#E8DFD0]/70 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#123B2F]" />
                <h3 className="text-base font-bold text-[#242820]">Add Verified Truth Anchor</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#7A8274] hover:text-[#242820] p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFact} className="space-y-4">
              <input type="hidden" name="workspaceId" value={DEFAULT_WORKSPACE_ID} />

              {modalError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#123B2F]">Claim Statement</label>
                <textarea
                  name="claim"
                  rows={3}
                  value={newClaim}
                  onChange={(e) => setNewClaim(e.target.value)}
                  placeholder="e.g. 99.99% platform uptime SLA guaranteed across enterprise tiers..."
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:ring-2 focus:ring-[#123B2F] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#123B2F]">Evidence Source Citation</label>
                <input
                  name="evidenceSource"
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="e.g. Enterprise Master Services Agreement Exhibit B (SLA)"
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:ring-2 focus:ring-[#123B2F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#123B2F]">Expiry Date</label>
                  <input
                    name="expiryDate"
                    type="date"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:ring-2 focus:ring-[#123B2F]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#123B2F]">Initial Status</label>
                  <select
                    name="status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as 'Valid' | 'Expired')}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:ring-2 focus:ring-[#123B2F]"
                  >
                    <option value="Valid">Valid</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8DFD0]/70">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8DFD0] text-xs font-semibold text-[#545B4E] hover:bg-[#F7F2E8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-[#123B2F] text-white text-xs font-semibold hover:bg-[#1b5343] flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <span>Add Fact to Vault</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
