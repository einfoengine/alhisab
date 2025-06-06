'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  BriefcaseIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon,
  CurrencyDollarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: DocumentTextIcon },
  { name: 'Services', href: '/dashboard/services', icon: BriefcaseIcon },
  { name: 'Clients', href: '/dashboard/clients', icon: UserIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: CurrencyDollarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Alhisab</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
