'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Squares2X2Icon, 
  TableCellsIcon
} from '@heroicons/react/24/outline';
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

// Sample data for testing
const sampleServices: Service[] = [
  {
    id: "seo",
    name: "Search Engine Optimization",
    shortDescription: "Improve your website's visibility in search engines",
    serviceMaster: "John Smith",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    pricing: {
      basic: 499,
      premium: 999,
      enterprise: 1999
    }
  },
  {
    id: "ppc",
    name: "Pay-Per-Click Advertising",
    shortDescription: "Drive targeted traffic through paid advertising",
    serviceMaster: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    pricing: {
      basic: 299,
      premium: 799,
      enterprise: 1499
    }
  },
  {
    id: "social",
    name: "Social Media Marketing",
    shortDescription: "Build your brand presence on social platforms",
    serviceMaster: "Michael Brown",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60",
    pricing: {
      basic: 399,
      premium: 899,
      enterprise: 1799
    }
  },
  {
    id: "content",
    name: "Content Marketing",
    shortDescription: "Create engaging content that converts",
    serviceMaster: "Emily Davis",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60",
    pricing: {
      basic: 599,
      premium: 1299,
      enterprise: 2499
    }
  },
  {
    id: "email",
    name: "Email Marketing",
    shortDescription: "Nurture leads and drive conversions",
    serviceMaster: "David Wilson",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop&q=60",
    pricing: {
      basic: 199,
      premium: 499,
      enterprise: 999
    }
  }
];

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    // For now, we'll use the sample data directly
    // Once the JSON file is properly set up, we can switch back to fetching
    setServices(sampleServices);
    setLoading(false);

    // Commented out the fetch for now
    /*
    const fetchServices = async () => {
      try {
        const response = await fetch('/data/services.json');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    */
  }, []);

  const handleServiceClick = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
  };

  const columns = [
    {
      key: 'name',
      label: 'Service Name',
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
            <span className="font-medium text-gray-900">{value}</span>
            <p className="text-sm text-gray-500">{item.shortDescription}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'pricing',
      label: 'Pricing',
      sortable: true,
      filterable: true,
      render: (value: Service['pricing']) => (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Basic:</span>
            <span className="font-medium text-gray-900">${value.basic}/month</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Premium:</span>
            <span className="font-medium text-gray-900">${value.premium}/month</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Enterprise:</span>
            <span className="font-medium text-gray-900">${value.enterprise}/month</span>
          </div>
        </div>
      ),
    },
    {
      key: 'serviceMaster',
      label: 'Service Master',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-blue-100">
            <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-semibold">
              {value.split(' ').map(name => name[0]).join('')}
            </div>
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
  ];

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

  if (services.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">No services found</h3>
                <p className="mt-1 text-sm text-gray-500">Try refreshing the page or check your connection.</p>
              </div>
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Services</h1>
              <p className="mt-2 text-gray-600">Explore our digital marketing services</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <TableCellsIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden"
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden bg-blue-100">
                        <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-semibold text-sm">
                          {service.serviceMaster.split(' ').map(name => name[0]).join('')}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {service.serviceMaster}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Basic:</span>
                        <span className="font-medium text-gray-900">${service.pricing.basic}/month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Premium:</span>
                        <span className="font-medium text-gray-900">${service.pricing.premium}/month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Enterprise:</span>
                        <span className="font-medium text-gray-900">${service.pricing.enterprise}/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <TableBuilder
              columns={columns}
              data={services}
              itemsPerPage={5}
              onRowClick={(service) => handleServiceClick(service.id)}
              searchable={true}
              selectable={true}
            />
          )}
        </div>
      </main>
    </div>
  );
} 