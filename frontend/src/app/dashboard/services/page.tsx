'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import servicesData from '@/data/services.json';
import ProductsList from '@/components/ProductsList';
import TableBuilder from '@/components/TableBuilder';
import PageHeader from '@/components/elements/PageHeader';

interface Service {
  id: string;
  name: string;
  shortDescription?: string;
  serviceMaster?: string;
  description?: string;
  image?: string;
  features?: string[];
  pricing?: {
    unit_price: number;
    max_discount?: number;
  };
  minimum_time_required?: number;
  minimum_order_unit?: number;
  [key: string]: unknown;
}

type Column<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, item: T) => React.ReactNode;
};

const services: Service[] = servicesData.services;

const columns: Column<Service>[] = [
  {
    key: 'name',
    label: 'Service',
    render: (value, item) => (
      <span className="font-semibold text-blue-700">{item.name}</span>
    ),
    sortable: true,
    filterable: true,
  },
  {
    key: 'shortDescription',
    label: 'Description',
    render: (value, item) => (
      <span className="text-gray-600">{item.shortDescription}</span>
    ),
    filterable: true,
  },
  {
    key: 'serviceMaster',
    label: 'Service Master',
    render: (value, item) => (
      <span>{item.serviceMaster || '-'}</span>
    ),
    filterable: true,
  },
  {
    key: 'pricing',
    label: 'Unit Price',
    render: (value, item) => (
      <span>${item.pricing?.unit_price?.toLocaleString() || '-'}</span>
    ),
    sortable: true,
  },
  {
    key: 'minimum_time_required',
    label: 'Min. Time (days)',
    render: (value, item) => (
      <span>{item.minimum_time_required || '-'}</span>
    ),
    sortable: true,
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
      />
      {viewMode === 'grid' ? (
        <ProductsList
          services={services}
          onProductClick={(id: string) => router.push(`/dashboard/services/${id}`)}
        />
      ) : (
        <TableBuilder<Service>
          columns={columns}
          data={services}
          onRowClick={(item) => router.push(`/dashboard/services/${item.id}`)}
          itemsPerPage={8}
        />
      )}
    </div>
  );
}