import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F7F2E8] text-[#242820] font-inter">
      {/* 1. Left Sidebar only */}
      <Sidebar
        activePage="brand-brain"
        onSelectPage={() => {}}
        onOpenNewReview={() => {}}
      />

      {/* 2. Top Header and main content area (No public landing page navbar) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        <Header onOpenRunReview={() => {}} />
        <main
          className="flex-1 overflow-y-auto bg-[#F7F2E8] p-8 scroll-smooth"
          id="main-content"
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

