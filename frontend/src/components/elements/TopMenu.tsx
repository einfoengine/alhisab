import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalculatorIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  MagnifyingGlassCircleIcon,
  LightBulbIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const tools = [
  { name: 'Accounting', href: '/accounting', icon: CalculatorIcon },
  { name: 'Business Desk', href: '/business-desk', icon: UserGroupIcon },
  { name: 'Chess', href: '/chess', icon: Squares2X2Icon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Planner', href: '/planner', icon: ClipboardDocumentCheckIcon },
  { name: 'Audit', href: '/business-desk/audit', icon: MagnifyingGlassCircleIcon },
  { name: 'Strategy', href: '/business-desk/strategy', icon: LightBulbIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Documents', href: '/documents', icon: DocumentTextIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function TopMenu() {
  const pathname = usePathname() || '';
  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      {tools.map((tool) => {
        const isActive = pathname.startsWith(tool.href);
        return (
          <Link
            key={tool.name}
            href={tool.href}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <tool.icon className="h-4 w-4" />
            <span className="hidden sm:block">{tool.name}</span>
          </Link>
        );
      })}
    </div>
  );
} 