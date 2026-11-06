import { useState, useRef, useEffect, useTransition } from 'react';
import {
  ChevronDown,
  Play,
  Bell,
  Check,
  Building,
  Plus,
  Shield,
  AlertTriangle,
  FileCheck2,
  ExternalLink,
  Menu,
  Loader2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import {
  getWorkspaces,
  createWorkspace,
  switchWorkspace,
  type WorkspaceItem,
} from '../../actions/workspace';
import { createClient } from '@/utils/supabase/client';

interface HeaderProps {
  onOpenRunReview: () => void;
  onSelectPublicSite?: () => void;
  onToggleMobileSidebar?: () => void;
}

export function Header({
  onOpenRunReview,
  onSelectPublicSite,
  onToggleMobileSidebar,
}: HeaderProps) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceItem | null>(null);
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(true);

  // Create Workspace Dialog state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // User auth state
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const workspaceRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Load user and real workspaces
  const loadWorkspacesData = async () => {
    try {
      setIsLoadingWorkspaces(true);
      const list = await getWorkspaces();
      setWorkspaces(list);

      const savedWsId = typeof window !== 'undefined'
        ? window.localStorage.getItem('markwise_active_workspace_id')
        : null;

      const active =
        list.find((w) => w.id === savedWsId) ||
        list.find((w) => w.isCurrent) ||
        list[0] ||
        null;

      if (active) {
        setSelectedWorkspace(active);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('markwise_active_workspace_id', active.id);
        }
      }
    } catch (err) {
      console.error('Failed to load workspaces:', err);
    } finally {
      setIsLoadingWorkspaces(false);
    }
  };

  useEffect(() => {
    loadWorkspacesData();

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setUserEmail(user.email);
      }
    });

    const handleWsChanged = () => {
      loadWorkspacesData();
    };

    window.addEventListener('workspace-changed', handleWsChanged);
    return () => window.removeEventListener('workspace-changed', handleWsChanged);
  }, []);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setWorkspaceOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectWorkspace = async (ws: WorkspaceItem) => {
    try {
      setSelectedWorkspace(ws);
      setWorkspaceOpen(false);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('markwise_active_workspace_id', ws.id);
      }
      await switchWorkspace(ws.id);
      window.dispatchEvent(new CustomEvent('workspace-changed'));
    } catch (err) {
      console.error('Failed to switch workspace:', err);
    }
  };

  const handleCreateWorkspaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) {
      setCreateError('Workspace name cannot be empty.');
      return;
    }

    setCreateError(null);
    startTransition(async () => {
      try {
        const created = await createWorkspace(newWorkspaceName.trim());
        setWorkspaces((prev) => [...prev, created]);
        setSelectedWorkspace(created);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('markwise_active_workspace_id', created.id);
        }
        setNewWorkspaceName('');
        setIsCreateOpen(false);
        window.dispatchEvent(new CustomEvent('workspace-changed'));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to create workspace';
        setCreateError(message);
      }
    });
  };

  const displayName = userEmail ? userEmail.split('@')[0] : 'Brand Guardian';
  const displayEmail = userEmail || 'governance@markwise.ai';
  const displayInitials = displayName.slice(0, 2).toUpperCase();

  return (
    <>
      <header className="h-14 bg-[#FFFCF6] border-b border-[#E8DFD0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        {/* Left: Mobile Menu Button & Workspace Switcher */}
        <div className="flex items-center gap-2 sm:gap-4">
          {onToggleMobileSidebar && (
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              className="p-1.5 rounded-lg border border-[#E8DFD0] bg-[#F7F2E8] hover:bg-[#FAF6EF] text-[#123B2F] md:hidden cursor-pointer shadow-2xs"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Database-driven Workspace Switcher */}
          <div className="relative" ref={workspaceRef}>
            <button
              type="button"
              onClick={() => setWorkspaceOpen(!workspaceOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] hover:bg-[#FAF6EF] text-xs sm:text-sm font-semibold text-[#242820] transition-colors cursor-pointer shadow-2xs"
              aria-expanded={workspaceOpen}
              aria-haspopup="true"
            >
              <div className="w-5 h-5 rounded-md bg-[#123B2F] text-white flex items-center justify-center text-[10px] font-bold">
                <Building className="w-3 h-3 text-[#F47745]" />
              </div>
              <span className="font-inter tracking-tight">
                {selectedWorkspace?.name || (isLoadingWorkspaces ? 'Loading...' : 'My Workspace')}
              </span>
              <ChevronDown className="w-4 h-4 text-[#7A8274]" />
            </button>

            {/* Workspace Switcher Menu */}
            {workspaceOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-[#FFFCF6] border border-[#E8DFD0] p-2 shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-[#7A8274] border-b border-[#E8DFD0]/60 flex items-center justify-between">
                  <span>Switch Workspace</span>
                  <span className="text-[#123B2F] font-semibold">{workspaces.length} Total</span>
                </div>

                <div className="py-1 space-y-1 max-h-60 overflow-y-auto">
                  {workspaces.map((ws) => (
                    <button
                      key={ws.id}
                      type="button"
                      onClick={() => handleSelectWorkspace(ws)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        selectedWorkspace?.id === ws.id
                          ? 'bg-[#123B2F]/10 text-[#123B2F] font-semibold'
                          : 'text-[#242820] hover:bg-[#F7F2E8]'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold truncate">{ws.name}</div>
                        <div className="text-[10px] text-[#7A8274] font-mono">
                          {ws.rulesCount} Rules · {ws.factsCount} Docs
                        </div>
                      </div>
                      {selectedWorkspace?.id === ws.id && (
                        <Check className="w-4 h-4 text-[#123B2F] shrink-0" />
                      )}
                    </button>
                  ))}

                  {workspaces.length === 0 && !isLoadingWorkspaces && (
                    <div className="p-3 text-center text-xs text-[#7A8274]">
                      No workspaces found. Click below to create one.
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#E8DFD0] flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setWorkspaceOpen(false);
                      setIsCreateOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#123B2F] hover:bg-[#123B2F]/10 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F47745]" />
                    <span>Create Workspace</span>
                  </button>

                  {onSelectPublicSite && (
                    <button
                      type="button"
                      onClick={() => {
                        setWorkspaceOpen(false);
                        onSelectPublicSite();
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-[#7A8274] hover:text-[#123B2F] hover:bg-[#F7F2E8] rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Public Landing & The Loop</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quiet Breadcrumb / Environment Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs text-[#7A8274]">
            <span>/</span>
            <span className="font-semibold text-[#123B2F]">Overview</span>
            <span>/</span>
            <span className="font-medium text-[#242820]">Production Environment</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#123B2F]/10 text-[#123B2F] font-semibold">
              Database Live
            </span>
          </div>
        </div>

        {/* Right: Quick Action & User Profile */}
        <div className="flex items-center gap-3">
          {/* Run Review Quick Action Button */}
          <button
            type="button"
            onClick={onOpenRunReview}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#123B2F] hover:bg-[#0c2921] transition-all duration-150 shadow-xs flex items-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Run Review</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="w-10 h-10 rounded-xl border border-[#E8DFD0] bg-[#FFFCF6] hover:bg-[#FAF6EF] flex items-center justify-center text-[#242820] transition-colors relative cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[#FFFCF6] border border-[#E8DFD0] p-3 shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8DFD0]">
                  <span className="font-bold text-xs text-[#242820]">Governance Telemetry</span>
                  <span className="text-[10px] font-mono text-[#123B2F] font-semibold">Active</span>
                </div>
                <div className="p-4 text-center text-xs text-[#7A8274]">
                  All current rules and fact anchors are synced with the live database.
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-[#E8DFD0] hidden sm:block" />

          {/* User Profile Avatar in Header */}
          <div
            className="flex items-center gap-2 pl-1 cursor-pointer group"
            title={displayEmail}
          >
            <div className="w-9 h-9 rounded-full bg-[#F47745] text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#E8DFD0] group-hover:ring-[#123B2F] transition-all shadow-2xs">
              {displayInitials}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#242820] leading-tight group-hover:text-[#123B2F] transition-colors">
                {displayName}
              </span>
              <span className="text-[10px] font-mono text-[#7A8274] leading-tight truncate max-w-[120px]">
                {displayEmail}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Real shadcn/ui Dialog for Creating a Workspace */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-[#123B2F] text-white">
                <Building className="w-4 h-4 text-[#F47745]" />
              </div>
              <DialogTitle>Create New Workspace</DialogTitle>
            </div>
            <DialogDescription>
              Create an isolated brand governance partition with its own versioned rules, fact vault, and approval workflows.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateWorkspaceSubmit} className="space-y-4 pt-2">
            {createError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{createError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="workspaceName" className="block text-xs font-semibold text-[#123B2F]">
                Workspace Name
              </label>
              <input
                id="workspaceName"
                name="name"
                type="text"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                placeholder="e.g. Enterprise Fintech Division or North America Marketing"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8]/40 text-[#242820] focus:ring-2 focus:ring-[#123B2F] focus:outline-none"
                autoFocus
                disabled={isPending}
              />
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                disabled={isPending}
                className="px-4 py-2 rounded-xl border border-[#E8DFD0] text-xs font-semibold text-[#545B4E] hover:bg-[#F7F2E8] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 rounded-xl bg-[#123B2F] text-white text-xs font-semibold hover:bg-[#1b5343] transition-colors flex items-center gap-2 disabled:opacity-50 shadow-xs cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Creating Workspace...</span>
                  </>
                ) : (
                  <span>Create Workspace</span>
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
