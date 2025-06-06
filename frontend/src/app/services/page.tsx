'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlusIcon, Squares2X2Icon, TableCellsIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TableBuilder from '@/components/TableBuilder';

interface Service {
  id: string;
  name: string;
  shortDescription: string;
  serviceMaster: string;
  image: string;
  pricing: {
    basic: number;
    premium: number;
    enterprise: number;
  };
}

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render: (value: any, item: Service) => React.ReactNode;
}

// Sample data - replace with actual API call
const sampleServices: Service[] = [
  {
    id: 'seo',
    name: 'Search Engine Optimization',
    shortDescription: 'Improve your website\'s visibility in search engine results and drive organic traffic.',
    serviceMaster: 'John Smith',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=60',
    pricing: {
      basic: 999,
      premium: 1999,
      enterprise: 4999
    }
  },
  {
    id: 'ppc',
    name: 'Pay-Per-Click Advertising',
    shortDescription: 'Drive targeted traffic and leads through strategic PPC campaigns.',
    serviceMaster: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    pricing: {
      basic: 799,
      premium: 1499,
      enterprise: 2999
    }
  },
  {
    id: 'social',
    name: 'Social Media Marketing',
    shortDescription: 'Build your brand presence and engage with your audience on social platforms.',
    serviceMaster: 'Mike Wilson',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
    pricing: {
      basic: 699,
      premium: 1299,
      enterprise: 2499
    }
  },
  {
    id: 'content',
    name: 'Content Marketing',
    shortDescription: 'Create and distribute valuable content to attract and retain customers.',
    serviceMaster: 'Emily Brown',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60',
    pricing: {
      basic: 899,
      premium: 1699,
      enterprise: 3499
    }
  },
  {
    id: 'email',
    name: 'Email Marketing',
    shortDescription: 'Nurture leads and drive conversions through targeted email campaigns.',
    serviceMaster: 'David Lee',
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop&q=60',
    pricing: {
      basic: 599,
      premium: 1199,
      enterprise: 2299
    }
  }
];

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchServices = async () => {
      try {
        // In a real app, you would fetch from your API
        setServices(sampleServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
  };

  const handleCreateService = () => {
    router.push('/services/create');
  };

  const columns: Column[] = [
    {
      key: 'name',
      label: 'Service',
      sortable: true,
      filterable: true,
      render: (value: string, item: Service) => (
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{item.shortDescription}</p>
          </div>
        </div>
      )
    },
    {
      key: 'serviceMaster',
      label: 'Service Master',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {value.charAt(0)}
            </span>
          </div>
          <span className="ml-2 text-gray-700">{value}</span>
        </div>
      )
    },
    {
      key: 'pricing',
      label: 'Pricing',
      sortable: true,
      filterable: true,
      render: (value: Service['pricing']) => (
        <div className="space-y-1">
          <p className="text-sm text-gray-900">Basic: ${value.basic}/mo</p>
          <p className="text-sm text-gray-900">Premium: ${value.premium}/mo</p>
          <p className="text-sm text-gray-900">Enterprise: ${value.enterprise}/mo</p>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Services</h1>
            <div className="flex items-center space-x-4">
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
              </div>
              <button
                onClick={handleCreateService}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Service
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {service.serviceMaster.charAt(0)}
                          </span>
                        </div>
                        <span className="ml-2 text-sm text-gray-700">
                          {service.serviceMaster}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          From ${service.pricing.basic}/mo
                        </p>
                        <p className="text-xs text-gray-500">Starting price</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm">
              <TableBuilder
                data={services}
                columns={columns}
                onRowClick={handleServiceClick}
                selectable
                onSelectionChange={setSelectedServices}
                selectedRows={selectedServices}
                searchable
                sortable
                pagination
                itemsPerPage={5}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 