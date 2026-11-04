import { useState, useEffect } from 'react';
import {
  Shield,
  Database,
  FileText,
  CheckCircle,
  BarChart,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { DashboardPage, NAV_ITEMS } from '../../utils/dashboard';
import { createClient } from '@/utils/supabase/client';

interface SidebarProps {
  activePage: DashboardPage;
  onSelectPage: (page: DashboardPage) => void;
  onOpenNewReview: () => void;
}

const ICON_MAP = {
  Shield,
  Database,
  FileText,
  CheckCircle,
  BarChart,
};

export function Sidebar({ activePage, onSelectPage, onOpenNewReview }: SidebarProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setUserEmail(user.email);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const displayName = userEmail ? userEmail.split('@')[0] : 'Sarah Jenkins';
  const displayEmail = userEmail || 's.jenkins@markwise.com';
  const displayInitials = displayName.slice(0, 2).toUpperCase();

  return (
    <aside
      className="w-64 h-screen shrink-0 bg-[#123B2F] text-white flex flex-col justify-between sticky top-0 z-30 select-none border-r border-[#123B2F]/80 shadow-md"
      aria-label="Markwise Main Navigation"
    >
      {/* Top Brand Section */}
      <div>
        {/* Brand Logo & Name */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-xs">
            <Shield className="w-5 h-5 stroke-[2.2] text-[#F47745]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-inter">
              Markwise
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 -mt-0.5">
              Brand Governance
            </span>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="p-4 pb-2">
          <button
            type="button"
            onClick={onOpenNewReview}
            className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white flex items-center justify-between transition-colors shadow-2xs group cursor-pointer"
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
        <div className="px-3 py-3">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold">
            Governance Core
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = ICON_MAP[item.iconName];
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectPage(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 text-sm font-medium transition-all duration-150 cursor-pointer rounded-r-xl ${
                    isActive
                      ? 'bg-[#1b5343] text-white border-l-4 border-[#F47745] font-semibold pl-[10px] shadow-2xs'
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

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#F47745]/20 text-[#F47745] border border-[#F47745]/30'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {item.badge}
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
            {/* Circular Avatar with initials */}
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
  );
}
