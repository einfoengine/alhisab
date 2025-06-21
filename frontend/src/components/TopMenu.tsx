'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalculatorIcon,
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  BellIcon,
  Bars3Icon,
  MagnifyingGlassCircleIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import OffCanvasMenu from './OffCanvasMenu';

const tools = [
  { name: 'Accounting', href: '/accounting', icon: CalculatorIcon },
  { name: 'Project Management', href: '/tasks', icon: UserGroupIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Planner', href: '/planner', icon: ClipboardDocumentCheckIcon },
  { name: 'Audit', href: '/dashboard/audit', icon: MagnifyingGlassCircleIcon },
  { name: 'Strategy', href: '/dashboard/strategy', icon: LightBulbIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Documents', href: '/documents', icon: DocumentTextIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function TopMenu() {
  const pathname = usePathname() || '';
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <>
      <div className="nt-component nt-top-menu bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-20">
        <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="w-64 flex-shrink-0 flex items-center justify-center px-4 lg:px-6">
                <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
                    Alhisab
                </Link>
            </div>

            <div className="flex-1 flex justify-between items-center overflow-hidden">
              {/* Left: Tools */}
              <div className="flex overflow-x-auto whitespace-nowrap">
                {tools.map((tool) => {
                  const isActive = pathname.startsWith(tool.href);
                  return (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 ${
                        isActive
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tool.icon className="h-5 w-5 mr-2" />
                      {tool.name}
                    </Link>
                  );
                })}
              </div>

              {/* Right: Notification, menu, user info */}
              <div className="flex items-center space-x-4 pr-4 sm:pr-6 lg:pr-8 flex-shrink-0">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                  <BellIcon className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => setIsOffCanvasOpen(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      SW
                    </div>
                    <div className="text-sm text-left">
                      <p className="font-medium text-gray-900">Shane Wazal</p>
                      <p className="text-gray-500">Admin</p>
                    </div>
                  </button>
                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </a>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>
      </div>
      <OffCanvasMenu isOpen={isOffCanvasOpen} onClose={() => setIsOffCanvasOpen(false)} />
    </>
  );
} 