'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  pricing: {
    basic: number;
    premium: number;
    enterprise: number;
  };
}

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch('/data/services.json');
        const data = await response.json();
        const serviceData = data.services.find((s: Service) => s.id === params.id);
        setService(serviceData);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
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

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16">
          <div className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
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
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-blue-600 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">
                    {getInitials(service.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
              <p className="text-gray-600 text-lg mb-8">{service.description}</p>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pricing Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(service.pricing).map(([plan, price]) => (
                    <div key={plan} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                        {plan} Plan
                      </h3>
                      <p className="text-3xl font-bold text-blue-600 mb-4">
                        ${price}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      </p>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Get Started
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 