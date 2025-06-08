'use client';

import React from 'react';
import { 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  DocumentTextIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import RevenueOverview from '@/components/RevenueOverview';
import RecentActivities from '@/components/RecentActivities';
import StatsGrid from '@/components/StatsGrid';
import PageHeader from '@/components/elements/PageHeader';

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Active Clients',
    value: '2,338',
    change: '+15.3%',
    icon: UserGroupIcon,
  },
  {
    name: 'Active Projects',
    value: '12',
    change: '+4.75%',
    icon: DocumentTextIcon,
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '+1.1%',
    icon: ChartBarIcon,
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'New Client',
    description: 'John Doe signed up for a new project',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'Payment Received',
    description: 'Payment of $2,500 received from Client XYZ',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'Project Update',
    description: 'Project "Website Redesign" status updated to In Progress',
    time: '1 day ago',
  },
];

const DashboardPage = () => {
  return (
    <div className="nt-page nt-dashboard min-h-screen">
      <PageHeader title="Dashboard" />
      <div className="p-6">
        {/* Stats Grid */}
        <StatsGrid stats={stats} />
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueOverview />
          <RecentActivities activities={recentActivity} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;