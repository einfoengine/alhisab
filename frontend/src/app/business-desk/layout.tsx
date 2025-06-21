import React from 'react';
import { notFound } from 'next/navigation';
import DashboardShell from './DashboardShell';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  if (!children) {
    notFound();
  }

  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;
