import React from 'react';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import '../../styles/dashboard.scss';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  if (!children) {
    notFound();
  }

  return (
    <div className="nt-dashboard min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="nt-main-body">
        <Header />
        <main className="nt-contents">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
