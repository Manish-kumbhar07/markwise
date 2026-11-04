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

  useEffect(() => {
    setActivePage(initialPage);
  }, [initialPage]);

  const handleSelectPage = (page: DashboardPage) => {
    setActivePage(page);
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
      {/* 1. Left Sidebar (Fixed width, full height, bg-sidebar: #123B2F) */}
      <Sidebar
        activePage={activePage}
        onSelectPage={handleSelectPage}
        onOpenNewReview={() => setIsRunReviewOpen(true)}
      />

      {/* Right Container: Header + Main Scrollable Content */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* 2. Top Header (Height 64px, bg-card: #FFFCF6, border-b: #E8DFD0) */}
        <Header
          onOpenRunReview={() => setIsRunReviewOpen(true)}
          onSelectPublicSite={onSelectPublicSite}
        />

        {/* 3. Main Content Area (Warm ivory background: #F7F2E8, padding 32px (p-8), scrollable) */}
        <main
          className="flex-1 overflow-y-auto bg-[#F7F2E8] p-8 scroll-smooth"
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

      {/* Global Interactive Scan / Review Modal */}
      <RunReviewModal
        isOpen={isRunReviewOpen}
        onClose={() => setIsRunReviewOpen(false)}
        onComplete={(page) => handleSelectPage(page)}
      />
    </div>
  );
}
