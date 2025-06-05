'use client';

import { BellIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
            <BellIcon className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              SW
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">Shane Wazal</p>
              <p className="text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 