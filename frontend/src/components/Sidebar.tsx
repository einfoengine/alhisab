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
  CalendarDaysIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  UsersIcon,
  FolderIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  ReceiptRefundIcon
} from '@heroicons/react/24/outline';

const menuGroups = [
  {
    name: 'Main',
    icon: HomeIcon,
    items: [
      { name: 'Dashboard', href: '/client-management', icon: HomeIcon },
    ]
  },
  {
    name: 'Services & Packages',
    icon: BriefcaseIcon,
    items: [
      { name: 'Services', href: '/client-management/services', icon: BriefcaseIcon },
      { name: 'Packages', href: '/client-management/packages', icon: CubeIcon },
      { name: 'Add New Service', href: '/client-management/services/new', icon: PlusIcon, isAction: true },
    ]
  },
  {
    name: 'Client Management',
    icon: UsersIcon,
    items: [
      { name: 'Clients', href: '/client-management/clients', icon: UserIcon },
      { name: 'Leads', href: '/client-management/leads', icon: UserGroupIcon },
      { name: 'Agreements', href: '/client-management/agreements', icon: ClipboardDocumentIcon },
    ]
  },
  {
    name: 'Project Management',
    icon: FolderIcon,
    items: [
      { name: 'Projects', href: '/client-management/projects', icon: DocumentTextIcon },
      { name: 'Tasks', href: '/client-management/tasks', icon: CheckBadgeIcon },
      { name: 'Planning', href: '/client-management/planning', icon: CheckBadgeIcon },
    ]
  },
  {
    name: 'Finance & Meetings',
    icon: BanknotesIcon,
    items: [
      { name: 'Invoices', href: '/client-management/invoices', icon: CurrencyDollarIcon },
      { name: 'Receipts', href: '/client-management/receipts', icon: ReceiptRefundIcon },
      { name: 'Meetings', href: '/client-management/meetings', icon: CalendarDaysIcon },
    ]
  },
  {
    name: 'System',
    icon: WrenchScrewdriverIcon,
    items: [
      { name: 'Audit', href: '/client-management/audit', icon: MagnifyingGlassIcon },
      { name: 'Strategy', href: '/client-management/strategy', icon: LightBulbIcon },
      { name: 'Users', href: '/client-management/users', icon: UserIcon },
      { name: 'Messages', href: '/client-management/messages', icon: ChatBubbleLeftRightIcon },
      { name: 'Settings', href: '/client-management/settings', icon: Cog6ToothIcon },
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

  // Find the group with the longest matching child href
  function getActiveGroup(pathname: string) {
    let bestGroup: typeof menuGroups[0] | undefined = undefined;
    let bestLength = -1;
    for (const group of menuGroups) {
      for (const item of group.items) {
        if (pathname.startsWith(item.href) && item.href.length > bestLength) {
          bestGroup = group;
          bestLength = item.href.length;
        }
      }
    }
    return bestGroup;
  }

  const groupWithActive = getActiveGroup(pathname);

  // When the active group changes, collapse all others and only expand the active group
  useEffect(() => {
    if (groupWithActive) {
      setExpandedGroups([groupWithActive.name]);
    }
  }, [pathname, groupWithActive]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupName)
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  // Use expandedGroups (with active group always included)
  const forcedExpandedGroups = groupWithActive
    ? Array.from(new Set([...expandedGroups, groupWithActive.name]))
    : expandedGroups;

  const handleCollapse = () => setCollapsed((prev: boolean) => !prev);

  return (
    <div
      className={`nt-component nt-sidebar fixed top-0 left-0 h-screen z-30 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Header */}
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Alhisab</h1>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        )}
        <button
          onClick={handleCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2">
        {menuGroups.map((group) => {
          const GroupIcon = group.icon;
          const isGroupActive = groupWithActive?.name === group.name;
          
          return (
            <div key={group.name} className="mb-4 relative"
              onMouseEnter={() => collapsed && setHoveredGroup(group.name)}
              onMouseLeave={() => collapsed && setHoveredGroup(null)}
            >
              {/* Group Header */}
              <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${collapsed ? 'hidden' : 'block'}`}>
                {group.name}
              </div>
              
              {/* Group Toggle Button */}
              <button
                onClick={() => toggleGroup(group.name)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isGroupActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                } ${collapsed ? 'justify-center px-2' : ''}`}
              >
                <span className="flex items-center">
                  <GroupIcon className="h-4 w-4" />
                  <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>{group.name}</span>
                </span>
                {!collapsed && (
                  forcedExpandedGroups.includes(group.name) ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )
                )}
              </button>

              {/* Sliding menu for collapsed view */}
              {collapsed && hoveredGroup === group.name && (
                <div className="absolute left-full top-0 mt-0 ml-2 w-56 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-200/50 py-3 z-50 animate-slide-in">
                  <div className="px-3 py-2 border-b border-gray-100 mb-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {group.name}
                    </div>
                  </div>
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 mx-2 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <ItemIcon className="h-4 w-4 mr-3" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Expanded view */}
              {forcedExpandedGroups.includes(group.name) && !collapsed && (
                <div className="space-y-1 ml-2">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const ItemIcon = item.icon;
                    
                    if (item.isAction) {
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200/50"
                        >
                          <ItemIcon className="h-4 w-4 mr-3" />
                          {item.name}
                        </Link>
                      );
                    }
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <ItemIcon className="h-4 w-4 mr-3" />
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

      {/* Footer */}
      <div className="p-4 border-t border-gray-100/50">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="text-xs text-gray-500">
              v2.1.0
            </div>
          )}
          <button
            onClick={handleCollapse}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
            ) : (
              <ArrowLeftOnRectangleIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
