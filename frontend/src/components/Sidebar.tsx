'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
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
  ReceiptRefundIcon,
  CircleStackIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

type NavItem = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & RefAttributes<SVGSVGElement>>;
  isAction?: boolean;
};

type NavGroup = {
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & RefAttributes<SVGSVGElement>>;
  items: NavItem[];
};

const navigationGroups: Record<string, NavGroup> = {
  main: {
    icon: HomeIcon,
    items: [{ name: 'Dashboard', href: '/business-desk', icon: HomeIcon }],
  },
  apps: {
    icon: CircleStackIcon,
    items: [
      { name: 'Al-Hisab', href: '/al-hisab', icon: CircleStackIcon },
      { name: 'Chess', href: '/chess', icon: BeakerIcon },
      { name: 'Client Management', href: '/business-desk', icon: UserGroupIcon },
    ],
  },
  services: {
    icon: BriefcaseIcon,
    items: [
      { name: 'Services', href: '/business-desk/services', icon: BriefcaseIcon },
      { name: 'Packages', href: '/business-desk/packages', icon: CubeIcon },
      { name: 'Add New Service', href: '/business-desk/services/new', icon: PlusIcon, isAction: true },
    ],
  },
  clients: {
    icon: UserGroupIcon,
    items: [
      { name: 'Clients', href: '/business-desk/clients', icon: UserIcon },
      { name: 'Leads', href: '/business-desk/leads', icon: UserGroupIcon },
      { name: 'Agreements', href: '/business-desk/agreements', icon: ClipboardDocumentIcon },
    ],
  },
  projects: {
    icon: DocumentTextIcon,
    items: [
      { name: 'Projects', href: '/business-desk/projects', icon: DocumentTextIcon },
      { name: 'Tasks', href: '/business-desk/tasks', icon: CheckBadgeIcon },
      { name: 'Planning', href: '/business-desk/planning', icon: CheckBadgeIcon },
    ],
  },
  financial: {
    icon: CurrencyDollarIcon,
    items: [
      { name: 'Invoices', href: '/business-desk/invoices', icon: CurrencyDollarIcon },
      { name: 'Receipts', href: '/business-desk/receipts', icon: ReceiptRefundIcon },
      { name: 'Meetings', href: '/business-desk/meetings', icon: CalendarDaysIcon },
    ],
  },
  others: {
    icon: Cog6ToothIcon,
    items: [
      { name: 'Audit', href: '/business-desk/audit', icon: MagnifyingGlassIcon },
      { name: 'Strategy', href: '/business-desk/strategy', icon: LightBulbIcon },
      { name: 'Users', href: '/business-desk/users', icon: UserIcon },
      { name: 'Messages', href: '/business-desk/messages', icon: ChatBubbleLeftRightIcon },
      { name: 'Settings', href: '/business-desk/settings', icon: Cog6ToothIcon },
    ],
  },
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname() || '';
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [openSlidingMenu, setOpenSlidingMenu] = useState<string | null>(null);

  // Find the group with the longest matching child href
  function getActiveGroup(pathname: string) {
    let bestGroup: { name: string; icon: any; items: NavItem[] } | undefined = undefined;
    let bestLength = -1;
    for (const [groupName, groupData] of Object.entries(navigationGroups)) {
      for (const item of groupData.items) {
        if (pathname.startsWith(item.href) && item.href.length > bestLength) {
          bestGroup = { name: groupName, ...groupData };
          bestLength = item.href.length;
        }
      }
    }
    return bestGroup;
  }
  
  const groupWithActive = getActiveGroup(pathname);

  useEffect(() => {
    if (groupWithActive && !expandedGroups.includes(groupWithActive.name)) {
      setExpandedGroups(prev => [...prev, groupWithActive.name]);
    }
  }, [groupWithActive, expandedGroups]);

  const handleGroupClick = (groupName: string) => {
    if (collapsed) {
      setOpenSlidingMenu(prev => (prev === groupName ? null : groupName));
    } else {
      setExpandedGroups(prev =>
        prev.includes(groupName)
          ? prev.filter(name => name !== groupName)
          : [...prev, groupName]
      );
    }
  };
  
  return (
    <div className={`nt-sidebar fixed top-0 left-0 h-screen z-40 bg-white border-r border-gray-200/80 flex flex-col transition-all duration-200 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200/80">
        {!collapsed && <h1 className="text-xl font-bold text-gray-800">Al-Hisab</h1>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          {collapsed ? <ChevronRightIcon className="w-5 h-5 text-gray-600" /> : <ChevronDownIcon className="w-5 h-5 text-gray-600" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <nav className={`flex-1 px-2 space-y-2 ${!collapsed && 'overflow-y-auto'}`}>
         {Object.entries(navigationGroups).map(([groupName, groupData]) => {
           const GroupIcon = groupData.icon;
           const isGroupActive = groupWithActive?.name === groupName;
           const isSlidingMenuOpen = openSlidingMenu === groupName;

           return (
             <div key={groupName} className="relative">
               <button
                 onClick={() => handleGroupClick(groupName)}
                 className={`w-full flex items-center text-left p-2 text-sm font-medium rounded-lg transition-all duration-200 group
                   ${isGroupActive && !isSlidingMenuOpen ? 'text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                   ${collapsed && isGroupActive ? 'bg-blue-100' : ''}
                   ${collapsed ? 'justify-center' : 'justify-between'}
                 `}
               >
                 <div className="flex items-center">
                   <GroupIcon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                   {!collapsed && <span className="capitalize">{groupName}</span>}
                 </div>
                 {!collapsed && (
                   <ChevronDownIcon 
                     className={`w-4 h-4 transition-transform ${expandedGroups.includes(groupName) ? 'rotate-180' : ''}`} 
                   />
                 )}
               </button>
  
               {collapsed && isSlidingMenuOpen && (
                 <div 
                   className="absolute left-full top-0 ml-2 w-56 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-200/50 py-2 z-50 animate-slide-in"
                   onMouseLeave={() => setOpenSlidingMenu(null)}
                 >
                   <div className="px-3 py-2 border-b border-gray-100 mb-1">
                     <div className="text-sm font-semibold text-gray-800 capitalize">
                       {groupName}
                     </div>
                   </div>
                   <div className="space-y-1">
                     {groupData.items.map((item) => (
                       <Link
                         key={item.name}
                         href={item.href}
                         className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                           pathname === item.href
                             ? 'text-blue-700 bg-blue-50'
                             : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                         }`}
                       >
                         {item.name}
                       </Link>
                     ))}
                   </div>
                 </div>
               )}
  
               {!collapsed && expandedGroups.includes(groupName) && (
                 <div className="space-y-1 mt-1 ml-4 pl-2 border-l border-gray-200/80">
                   {groupData.items.map((item) => (
                     <Link
                       key={item.name}
                       href={item.href}
                       className={`flex items-center w-full text-left p-2 text-xs rounded-md transition-colors ${
                         pathname === item.href
                           ? 'text-blue-700 font-medium'
                           : 'text-gray-500 hover:text-gray-800'
                       }`}
                     >
                       <item.icon className="h-4 w-4 mr-2" />
                       {item.name}
                     </Link>
                   ))}
                 </div>
               )}
             </div>
           )
         })}
        </nav>
      </div>
    </div>
  );
}
