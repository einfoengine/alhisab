'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  DocumentTextIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

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

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16">
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
              <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart will be displayed here</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-medium">
                          {activity.type.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 