import React from 'react';
import { Squares2X2Icon, TableCellsIcon } from '@heroicons/react/24/outline';

interface PageHeaderProps {
  title: string;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  actions?: Array<{
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
  }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, viewMode, setViewMode, actions = [] }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center space-x-2 bg-white rounded-lg p-1">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-md ${
            viewMode === 'grid'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Squares2X2Icon className="h-5 w-5" />
        </button>
        <button
          onClick={() => setViewMode('table')}
          className={`p-2 rounded-md ${
            viewMode === 'table'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <TableCellsIcon className="h-5 w-5" />
        </button>
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700"
          >
            <action.icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
