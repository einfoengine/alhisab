'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TableBuilder from '@/components/TableBuilder';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Image from 'next/image';

interface Service {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  pricing: {
    basic: number;
    premium: number;
    enterprise: number;
  };
}

export default function ServicesTablePage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/data/services.json');
        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleExport = () => {
    const csvContent = [
      ['Service Name', 'Description', 'Basic Price', 'Premium Price', 'Enterprise Price'],
      ...services.map(service => [
        service.name,
        service.shortDescription,
        service.pricing.basic,
        service.pricing.premium,
        service.pricing.enterprise
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'services.csv';
    link.click();
  };

  const columns = [
    {
      key: 'image',
      label: 'Service',
      sortable: false,
      filterable: true,
      render: (value: string, item: Service) => (
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden">
            {value ? (
              <Image
                src={value}
                alt={item.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {item.name.split(' ').map(word => word[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <span className="font-medium">{item.name}</span>
        </div>
      ),
    },
    {
      key: 'shortDescription',
      label: 'Description',
      sortable: true,
      filterable: true,
    },
    {
      key: 'pricing',
      label: 'Basic Price',
      sortable: true,
      filterable: true,
      render: (value: Service['pricing']) => (
        <span className="font-medium">${value.basic}/month</span>
      ),
    },
    {
      key: 'pricing',
      label: 'Premium Price',
      sortable: true,
      filterable: true,
      render: (value: Service['pricing']) => (
        <span className="font-medium">${value.premium}/month</span>
      ),
    },
    {
      key: 'pricing',
      label: 'Enterprise Price',
      sortable: true,
      filterable: true,
      render: (value: Service['pricing']) => (
        <span className="font-medium">${value.enterprise}/month</span>
      ),
    },
  ];

  const handleRowClick = (service: Service) => {
    router.push(`/services/${service.id}`);
  };

  const handleSelectionChange = (selected: Service[]) => {
    setSelectedServices(selected);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <p className="mt-2 text-gray-600">Manage and view all your digital marketing services</p>
          </div>

          <TableBuilder
            columns={columns}
            data={services}
            itemsPerPage={5}
            onRowClick={handleRowClick}
            searchable={true}
            selectable={true}
            onSelectionChange={handleSelectionChange}
            onExport={handleExport}
          />
        </div>
      </main>
    </div>
  );
} 