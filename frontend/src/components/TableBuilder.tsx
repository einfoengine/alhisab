'use client';

import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon, FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, item: TableRow) => React.ReactNode;
}

export interface TableRow {
  id: number;
  sender?: string;
  subject?: string;
  date?: string;
  type?: string;
  tags?: string;
  actions?: string;
  [key: string]: string | number | undefined; // Add index signature for dynamic access
}

interface TableBuilderProps {
  columns: Column[];
  data: TableRow[];
  itemsPerPage?: number;
  onRowClick?: (item: TableRow) => void;
  searchable?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedItems: TableRow[]) => void;
  onExport?: () => void;
}

export default function TableBuilder({
  columns,
  data,
  itemsPerPage = 10,
  onRowClick,
  searchable = true,
  selectable = false,
  onSelectionChange,
  onExport,
}: TableBuilderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<TableRow[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  // Filter data based on search term and filters
  const filteredData = data.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      String(value || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(item[key] || '').toLowerCase().includes(value.toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    const aValue = a[key] ?? '';
    const bValue = b[key] ?? '';

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Handle sort
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? paginatedData : [];
    setSelectedItems(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectItem = (item: TableRow, checked: boolean) => {
    const newSelection = checked
      ? [...selectedItems, item]
      : selectedItems.filter((i) => i.id !== item.id);
    setSelectedItems(newSelection);
    onSelectionChange?.(newSelection);
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const renderTags = (tags: string) => {
    return tags.split(', ').map((tag, index) => (
      <span
        key={index}
        className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
      >
        {tag}
      </span>
    ));
  };

  const renderActions = () => (
    <div className="flex items-center space-x-2">
      <button className="text-blue-500 hover:text-blue-700">
        <EyeIcon className="w-5 h-5" />
      </button>
      <button className="text-red-500 hover:text-red-700">
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="table-builder">
      <div className="table-controls flex items-center justify-between mb-4">
        <div className="left-controls flex items-center gap-2">
          {selectable && selectedItems.length > 0 && (
            <button
              className="trash-icon-button text-red-500 hover:text-red-700"
              onClick={() => setSelectedItems([])}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          {searchable && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          )}
        </div>
        <div className="right-controls flex items-center gap-2">
          {onExport && (
            <button
              className="export-button"
              onClick={onExport}
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
          )}
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FunnelIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns
            .filter((col) => col.filterable)
            .map((column) => (
              <div key={column.key}>
                <input
                  type="text"
                  placeholder={`Filter ${column.label}...`}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={filters[column.key] || ''}
                  onChange={(e) => handleFilterChange(column.key, e.target.value)}
                />
              </div>
            ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedItems.length === paginatedData.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortConfig?.key === column.key && (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => !selectable && onRowClick?.(item)}
              >
                {selectable && (
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedItems.some((i) => i.id === item.id)}
                      onChange={(e) => handleSelectItem(item, e.target.checked)}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.key === 'tags'
                      ? renderTags(item[column.key] as string)
                      : column.key === 'actions'
                      ? renderActions()
                      : column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of{' '}
              {sortedData.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}