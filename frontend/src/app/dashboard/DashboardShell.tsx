'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopMenu from '@/components/TopMenu';

const SIDEBAR_WIDTH = 256; // w-64
const SIDEBAR_COLLAPSED_WIDTH = 80; // w-20

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="nt-dashboard min-h-screen bg-gray-50">
      <TopMenu />
      <div className="flex pt-16">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          className="nt-main-body grow transition-all duration-200"
          style={{ marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
        >
          <main className="nt-contents p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 