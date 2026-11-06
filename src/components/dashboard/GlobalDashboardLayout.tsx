import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BrandBrainPage } from './BrandBrainPage';
import { FactVaultPage } from './FactVaultPage';
import { ReviewPage } from './ReviewPage';
import { ApprovalsPage } from './ApprovalsPage';
import { InsightsPage } from './InsightsPage';
import { RunReviewModal } from './RunReviewModal';
import { DashboardPage } from '../../utils/dashboard';

interface GlobalDashboardLayoutProps {
  initialPage?: DashboardPage;
  onSelectPublicSite?: () => void;
}

export function GlobalDashboardLayout({
  initialPage = 'brand-brain',
  onSelectPublicSite,
}: GlobalDashboardLayoutProps) {
  const [activePage, setActivePage] = useState<DashboardPage>(initialPage);
  const [isRunReviewOpen, setIsRunReviewOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setActivePage(initialPage);
  }, [initialPage]);

  const handleSelectPage = (page: DashboardPage) => {
    setActivePage(page);
    setIsMobileSidebarOpen(false);
    const targetPath =
      page === 'brand-brain'
        ? '/dashboard/rules'
        : page === 'fact-vault'
        ? '/dashboard/facts'
        : `/dashboard/${page}`;
    window.history.pushState({}, '', targetPath);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F7F2E8] text-[#242820] font-inter">
      <Sidebar
        activePage={activePage}
        onSelectPage={handleSelectPage}
        onOpenNewReview={() => {
          setIsRunReviewOpen(true);
          setIsMobileSidebarOpen(false);
        }}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        <Header
          onOpenRunReview={() => setIsRunReviewOpen(true)}
          onSelectPublicSite={onSelectPublicSite}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main
          className="flex-1 overflow-y-auto bg-[#F7F2E8] p-4 sm:p-6 scroll-smooth"
          id="main-content"
        >
          <div className="max-w-7xl mx-auto">
            {activePage === 'brand-brain' && <BrandBrainPage />}
            {activePage === 'fact-vault' && <FactVaultPage />}
            {activePage === 'review' && <ReviewPage />}
            {activePage === 'approvals' && <ApprovalsPage />}
            {activePage === 'insights' && <InsightsPage />}
          </div>
        </main>
      </div>

      <RunReviewModal
        isOpen={isRunReviewOpen}
        onClose={() => setIsRunReviewOpen(false)}
        onComplete={(page) => handleSelectPage(page)}
      />
    </div>
  );
}
