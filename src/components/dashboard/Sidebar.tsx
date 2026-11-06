import { useState, useEffect } from 'react';
import {
  Shield,
  Database,
  FileText,
  CheckCircle,
  BarChart,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react';
import { DashboardPage, NAV_ITEMS } from '../../utils/dashboard';
import { createClient } from '@/utils/supabase/client';
import { getWorkspaceStats, type WorkspaceStats } from '../../actions/workspace';

interface SidebarProps {
  activePage: DashboardPage;
  onSelectPage: (page: DashboardPage) => void;
  onOpenNewReview: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const ICON_MAP = {
  Shield,
  Database,
  FileText,
  CheckCircle,
  BarChart,
};

export function Sidebar({
  activePage,
  onSelectPage,
  onOpenNewReview,
  isMobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [stats, setStats] = useState<WorkspaceStats>({
    rulesCount: 0,
    factsCount: 0,
    pendingCount: 0,
    approvalsCount: 0,
  });

  const supabase = createClient();

  const loadStats = async () => {
    try {
      const data = await getWorkspaceStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load workspace stats:', err);
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setUserEmail(user.email);
      }
    });

    loadStats();
    window.addEventListener('workspace-changed', loadStats);
    return () => window.removeEventListener('workspace-changed', loadStats);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const displayName = userEmail ? userEmail.split('@')[0] : 'Brand Guardian';
  const displayEmail = userEmail || 'governance@markwise.ai';
  const displayInitials = displayName.slice(0, 2).toUpperCase();

  const getDynamicBadge = (id: DashboardPage): string | undefined => {
    switch (id) {
      case 'brand-brain':
        return `${stats.rulesCount} Rules`;
      case 'fact-vault':
        return `${stats.factsCount} Docs`;
      case 'review':
        return `${stats.pendingCount} Pending`;
      case 'approvals':
        return `${stats.approvalsCount} Sign-offs`;
      default:
        return undefined;
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 md:z-30 w-64 h-screen shrink-0 bg-[#123B2F] text-white flex flex-col justify-between select-none border-r border-[#123B2F]/80 shadow-2xl md:shadow-md transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        aria-label="Markwise Main Navigation"
      >
        {/* Top Brand Section */}
        <div>
          {/* Brand Logo & Name */}
          <div className="h-14 flex items-center justify-between px-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-xs">
                <Shield className="w-4 h-4 stroke-[2.2] text-[#F47745]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white font-inter">
                  Markwise
                </span>
                <span className="text-[9px] uppercase font-mono tracking-wider text-white/50 -mt-0.5">
                  Brand Governance
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 md:hidden cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Action Button */}
          <div className="p-3 pb-1">
            <button
              type="button"
              onClick={() => {
                onOpenNewReview();
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white flex items-center justify-between transition-colors shadow-2xs group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F47745]" />
                <span>Quick Audit Scan</span>
              </span>
              <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/70 group-hover:text-white">
                ⌘K
              </span>
            </button>
          </div>

          {/* Navigation Section */}
          <div className="px-2.5 py-2">
            <div className="px-2.5 pb-1.5 text-[9px] font-mono uppercase tracking-widest text-white/40 font-semibold">
              Governance Core
            </div>
            <nav className="space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const Icon = ICON_MAP[item.iconName];
                const isActive = activePage === item.id;
                const dynamicBadge = getDynamicBadge(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectPage(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer rounded-r-lg ${
                      isActive
                        ? 'bg-[#1b5343] text-white border-l-4 border-[#F47745] font-semibold pl-[8px] shadow-2xs'
                        : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#F47745]' : 'text-white/60'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {dynamicBadge && (
                      <span
                        className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-[#F47745]/20 text-[#F47745] border border-[#F47745]/30'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {dynamicBadge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-4 border-t border-white/10 bg-[#0e3025]/50">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#F47745] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ring-2 ring-white/15">
                {displayInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-white truncate font-inter">
                  {displayName}
                </div>
                <div className="text-xs text-white/50 truncate font-mono">
                  {displayEmail}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
