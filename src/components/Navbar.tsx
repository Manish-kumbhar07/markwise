import { useState } from 'react';
import { Shield, Menu, X, ArrowUpRight } from 'lucide-react';
import { ActiveTab } from '../utils/governance';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenLogin: () => void;
  onOpenGetStarted: () => void;
}

export function Navbar({
  activeTab,
  onSelectTab,
  onOpenLogin,
  onOpenGetStarted,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'loop', label: 'The Loop' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F2E8]/95 backdrop-blur-md border-b border-[#E8DFD0] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Left: Brand Logo (Shield icon + Markwise) */}
          <button
            type="button"
            onClick={() => handleTabClick('loop')}
            className="flex items-center gap-2.5 text-[#174C3B] group focus-visible:outline-2 focus-visible:outline-[#174C3B] rounded-md py-1 cursor-pointer text-left"
            aria-label="Markwise Home - The Loop"
          >
            <div className="w-10 h-10 rounded-xl bg-[#174C3B] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#174C3B] font-inter">
                Markwise
              </span>
            </div>
          </button>

          {/* Center: Primary Navigation Buttons (Tab/View Switcher, No Scroll) */}
          <nav
            aria-label="View Selection Navigation"
            className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF6EF] border border-[#E8DFD0]"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#174C3B] ${
                    isActive
                      ? 'bg-[#174C3B] text-white shadow-xs'
                      : 'text-[#545B4E] hover:text-[#174C3B] hover:bg-white/60'
                  }`}
                  aria-pressed={isActive}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#174C3B] hover:bg-[#0e3025] rounded-lg transition-colors duration-150 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174C3B] whitespace-nowrap cursor-pointer active:scale-[0.98]"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onOpenGetStarted}
              className="px-4 py-2.5 text-sm font-semibold text-[#174C3B] hover:bg-[#174C3B]/5 border border-[#174C3B]/25 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Book Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#174C3B] rounded-lg"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#242820] hover:text-[#174C3B] rounded-lg border border-[#E8DFD0] bg-[#FAF6EF]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8DFD0] bg-[#FAF6EF] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1.5 font-medium text-sm text-[#242820]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-2.5 text-left rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#174C3B] text-white shadow-xs'
                      : 'text-[#545B4E] hover:bg-[#E8DFD0]/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-[#E8DFD0] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-[#F47745] hover:bg-[#dc612e] rounded-lg transition-colors text-center"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
