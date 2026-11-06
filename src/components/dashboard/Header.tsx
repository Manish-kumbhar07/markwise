import { useState, useRef, useEffect } from 'react';
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
} from 'lucide-react';

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
  const [selectedWorkspace, setSelectedWorkspace] = useState('Markwise Workspace');

  const workspaceRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const workspaces = [
    { id: '1', name: 'Markwise Workspace', tier: 'Enterprise Plan', org: 'Markwise Primary' },
    { id: '2', name: 'Global Consumer Brands', tier: 'Enterprise Plan', org: 'Acme Holding Corp' },
    { id: '3', name: 'Fintech & Lending Staging', tier: 'Strict Banking Policy', org: 'Apex Payments' },
  ];

  const notifications = [
    {
      id: 'n1',
      title: 'Claim Violation Flagged',
      desc: 'FDIC insurance claim without named partner bank in Q3 Launch Copy.',
      time: '12m ago',
      type: 'warning',
    },
    {
      id: 'n2',
      title: 'Living Rule v2.4 Approved',
      desc: 'Eleanor Vance committed Rule FIN-08 update across the enterprise.',
      time: '1h ago',
      type: 'success',
    },
    {
      id: 'n3',
      title: 'Legal Sign-off Required',
      desc: 'Clinical Diagnostic Copilot Whitepaper awaiting final cryptographic stamp.',
      time: '3h ago',
      type: 'info',
    },
  ];

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

  return (
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
        <div className="relative" ref={workspaceRef}>
          <button
            type="button"
            onClick={() => setWorkspaceOpen(!workspaceOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[#E8DFD0] bg-[#F7F2E8] hover:bg-[#FAF6EF] text-xs sm:text-sm font-semibold text-[#242820] transition-colors cursor-pointer shadow-2xs"
            aria-expanded={workspaceOpen}
            aria-haspopup="true"
          >
            <div className="w-5 h-5 rounded-md bg-[#123B2F] text-white flex items-center justify-center text-[10px] font-bold">
              M
            </div>
            <span className="font-inter tracking-tight">{selectedWorkspace}</span>
            <ChevronDown className="w-4 h-4 text-[#7A8274]" />
          </button>

          {/* Workspace Switcher Menu */}
          {workspaceOpen && (
            <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-[#FFFCF6] border border-[#E8DFD0] p-2 shadow-xl z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-[#7A8274] border-b border-[#E8DFD0]/60">
                Switch Enterprise Workspace
              </div>
              <div className="py-1 space-y-1">
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    type="button"
                    onClick={() => {
                      setSelectedWorkspace(ws.name);
                      setWorkspaceOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      selectedWorkspace === ws.name
                        ? 'bg-[#123B2F]/10 text-[#123B2F] font-semibold'
                        : 'text-[#242820] hover:bg-[#F7F2E8]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{ws.name}</div>
                      <div className="text-[10px] text-[#7A8274]">{ws.org}</div>
                    </div>
                    {selectedWorkspace === ws.name && (
                      <Check className="w-4 h-4 text-[#123B2F]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E8DFD0] flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setWorkspaceOpen(false);
                    alert('Create Workspace wizard (Prototype)');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#123B2F] hover:bg-[#123B2F]/5 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
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
                    <span>View Public Landing & The Loop</span>
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
            SOC 2 Live
          </span>
        </div>
      </div>

      {/* Right: Quick Action & Notifications */}
      <div className="flex items-center gap-3">
        {/* Run Review Quick Action Button in Forest Green */}
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
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F47745] ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown Popover */}
          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[#FFFCF6] border border-[#E8DFD0] p-3 shadow-xl z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8DFD0]">
                <span className="font-bold text-xs text-[#242820]">
                  Governance Activity
                </span>
                <span className="text-[10px] font-mono text-[#F47745] font-semibold">
                  3 New
                </span>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-[#F7F2E8] hover:bg-[#FAF6EF] border border-[#E8DFD0]/60 transition-colors cursor-pointer text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#242820] flex items-center gap-1.5">
                        {n.type === 'warning' ? (
                          <AlertTriangle className="w-3 h-3 text-[#F47745]" />
                        ) : (
                          <FileCheck2 className="w-3 h-3 text-[#123B2F]" />
                        )}
                        {n.title}
                      </span>
                      <span className="text-[10px] text-[#7A8274] font-mono">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#545B4E] leading-normal">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-[#E8DFD0] hidden sm:block" />

        {/* User Profile Avatar in Header */}
        <div
          className="flex items-center gap-2 pl-1 cursor-pointer group"
          title="Elena Rostova (e.rostova@markwise.ai)"
        >
          <div className="w-9 h-9 rounded-full bg-[#F47745] text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#E8DFD0] group-hover:ring-[#123B2F] transition-all shadow-2xs">
            ER
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#242820] leading-tight group-hover:text-[#123B2F] transition-colors">
              Elena Rostova
            </span>
            <span className="text-[10px] font-mono text-[#7A8274] leading-tight">
              VP Brand Governance
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
