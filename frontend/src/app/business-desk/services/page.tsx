'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import servicesData from '@/data/services.json';
import ProductsList from '@/components/ProductsList';
import TableBuilder from '@/components/TableBuilder';
import PageHeader from '@/components/elements/PageHeader';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Service {
  id: string;
  name: string;
  serviceShortName: string;
  serviceCategory: string;
  serviceTasks: string[];
  shortDescription: string;
  serviceMaster: string;
  description: string;
  image: string;
  features: string[];
  pricing: {
    unit_price: number;
    max_discount: number;
  };
  minimum_time_required: number;
  minimum_order_unit: number;
  service_type: string;
  [key: string]: unknown;
}

type Column<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, item: T) => React.ReactNode;
};

const services: Service[] = servicesData.services as Service[];

const columns: Column<Service>[] = [
  {
    key: 'name',
    label: 'Service Name',
    render: (value, item) => (
      <div className="flex items-center space-x-3">
        <Image 
          src={item.image} 
          alt={item.name} 
          width={40}
          height={40}
          className="w-10 h-10 rounded-lg object-cover" 
        />
        <div>
          <div className="font-semibold text-blue-700">{item.name}</div>
          <div className="text-xs text-gray-500">{item.serviceShortName}</div>
        </div>
      </div>
    ),
    sortable: true,
    filterable: true,
  },
  {
    key: 'shortDescription',
    label: 'Short Description',
    render: (value, item) => (
      <span className="text-gray-600 text-sm">{item.shortDescription}</span>
    ),
    filterable: true,
  },
  {
    key: 'serviceMaster',
    label: 'Service Master',
    render: (value, item) => (
      <span className="font-medium">{item.serviceMaster}</span>
    ),
    filterable: true,
  },
  {
    key: 'pricing',
    label: 'Unit Price',
    render: (value, item) => (
      <div>
        <div className="font-semibold text-green-600">${item.pricing.unit_price.toLocaleString()}</div>
        <div className="text-xs text-gray-500">Max discount: ${item.pricing.max_discount}</div>
      </div>
    ),
    sortable: true,
  },
  {
    key: 'minimum_time_required',
    label: 'Production Time',
    render: (value, item) => (
      <span className="font-medium">{item.minimum_time_required} days</span>
    ),
    sortable: true,
  },
  {
    key: 'serviceCategory',
    label: 'Category',
    render: (value, item) => (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
        {item.serviceCategory.replace('_', ' ')}
      </span>
    ),
    filterable: true,
  },
  {
    key: 'serviceTasks',
    label: 'Action Items',
    render: (value, item) => (
      <div className="max-w-xs">
        <div className="text-xs text-gray-600 mb-1">
          {item.serviceTasks.length} tasks
        </div>
        <div className="text-xs text-gray-500 line-clamp-2">
          {item.serviceTasks.slice(0, 3).join(', ')}
          {item.serviceTasks.length > 3 && '...'}
        </div>
      </div>
    ),
  },
  {
    key: 'service_type',
    label: 'Service Type',
    render: (value, item) => (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        item.service_type === 'repeatable' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-purple-100 text-purple-800'
      }`}>
        {item.service_type}
      </span>
    ),
    filterable: true,
  },
];

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const router = useRouter();

  return (
    <div className="p-8">
      <PageHeader
        title="Services"
        viewMode={viewMode}
        setViewMode={setViewMode}
        actions={[{
          name: 'Add New',
          icon: PlusIcon,
          onClick: () => router.push('/business-desk/services/new'),
        }]}
      />
      {viewMode === 'grid' ? (
        <ProductsList
          services={services}
          onProductClick={(id: string) => router.push(`/business-desk/services/${id}`)}
        />
      ) : (
        <TableBuilder<Service>
          columns={columns}
          data={services}
          onRowClick={(item) => router.push(`/business-desk/services/${item.id}`)}
          itemsPerPage={8}
        />
      )}
    </div>
  );
}