'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  UserIcon,
  UserGroupIcon,
  CubeIcon,
  CheckBadgeIcon,
  ClipboardDocumentIcon,
  MagnifyingGlassCircleIcon,
  CalendarDaysIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  UsersIcon,
  FolderIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const menuGroups = [
  {
    name: 'Main',
    icon: HomeIcon,
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    ]
  },
  {
    name: 'Client Management',
    icon: UsersIcon,
    items: [
      { name: 'Clients', href: '/dashboard/clients', icon: UserIcon },
      { name: 'Leads', href: '/dashboard/leads', icon: UserGroupIcon },
      { name: 'Agreements', href: '/dashboard/agreements', icon: ClipboardDocumentIcon },
    ]
  },
  {
    name: 'Project Management',
    icon: FolderIcon,
    items: [
      { name: 'Projects', href: '/dashboard/projects', icon: DocumentTextIcon },
      { name: 'Tasks', href: '/dashboard/tasks', icon: CheckBadgeIcon },
      { name: 'Planning', href: '/dashboard/planning', icon: CheckBadgeIcon },
    ]
  },
  {
    name: 'Services & Packages',
    icon: BriefcaseIcon,
    items: [
      { name: 'Services', href: '/dashboard/services', icon: BriefcaseIcon },
      { name: 'Packages', href: '/dashboard/packages', icon: CubeIcon },
      { name: 'Add New Service', href: '/dashboard/services/new', icon: PlusIcon, isAction: true },
    ]
  },
  {
    name: 'Audit & Strategies',
    icon: ShieldCheckIcon,
    items: [
      { name: 'Audit', href: '/dashboard/audit', icon: MagnifyingGlassCircleIcon },
      { name: 'New Audit', href: '/dashboard/audit/new', icon: PlusIcon },
    ]
  },
  {
    name: 'Finance & Meetings',
    icon: BanknotesIcon,
    items: [
      { name: 'Invoices', href: '/dashboard/invoices', icon: CurrencyDollarIcon },
      { name: 'Accounting', href: '/dashboard/accounting', icon: Cog6ToothIcon },
      { name: 'Meetings', href: '/dashboard/meetings', icon: CalendarDaysIcon },
    ]
  },
  {
    name: 'System',
    icon: WrenchScrewdriverIcon,
    items: [
      { name: 'Users', href: '/dashboard/users', icon: UserIcon },
      { name: 'Messages', href: '/dashboard/messages', icon: UserGroupIcon },
      { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
    ]
  }
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const rawPathname = usePathname();
  const pathname = rawPathname || '';
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  useEffect(() => {
    const groupWithActive = menuGroups.find((group) =>
      group.items.some((item) => pathname.startsWith(item.href))
    );
    setExpandedGroups(groupWithActive ? [groupWithActive.name] : []);
  }, [pathname]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupName)
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  const handleCollapse = () => setCollapsed((prev: boolean) => !prev);

  return (
    <div
      className={`nt-component nt-sidebar fixed top-0 left-0 h-screen z-30 bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ${collapsed ? 'w-20' : 'w-64'}`}
    >
      <div className={`p-6 flex items-center ${collapsed ? 'justify-center' : ''}`}>
        <h1 className={`text-2xl font-bold text-gray-800 transition-all duration-200 ${collapsed ? 'hidden' : 'block'}`}>Alhisab</h1>
        <span className={`text-2xl font-bold text-blue-600 ${collapsed ? 'block' : 'hidden'}`}>A</span>
      </div>
      <nav className="mt-6 flex-1 overflow-y-auto">
        {menuGroups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <div key={group.name} className="mb-4 relative"
              onMouseEnter={() => collapsed && setHoveredGroup(group.name)}
              onMouseLeave={() => collapsed && setHoveredGroup(null)}
            >
              <button
                onClick={() => toggleGroup(group.name)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <span className="flex items-center">
                  <GroupIcon className="h-5 w-5 mr-0.5" />
                  <span className={`${collapsed ? 'hidden' : 'inline ml-2'}`}>{group.name}</span>
                </span>
                {!collapsed && (
                  expandedGroups.includes(group.name) ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )
                )}
              </button>
              {/* Sliding menu for collapsed view */}
              {collapsed && hoveredGroup === group.name && (
                <div className="absolute left-full top-0 mt-0 ml-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 animate-slide-in">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <ItemIcon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
              {/* Expanded view */}
              {expandedGroups.includes(group.name) && !collapsed && (
                <div className="mt-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const ItemIcon = item.icon;
                    if (item.isAction) {
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center px-8 py-2 text-sm font-bold rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-200 my-2"
                        >
                          <ItemIcon className="h-5 w-5 mr-3" />
                          {item.name}
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-8 py-2 text-sm font-medium rounded transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-600 text-white font-bold shadow focus:outline-none ring-2 ring-blue-300'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <ItemIcon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-100 flex justify-end">
        <button
          onClick={handleCollapse}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500"
        >
          {collapsed ? <ArrowRightOnRectangleIcon className="h-5 w-5" /> : <ArrowLeftOnRectangleIcon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
