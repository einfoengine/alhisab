'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import PageHeader from '@/components/elements/PageHeader';

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
  }
];

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchService = async () => {
      try {
        // In a real app, you would fetch from your API
        const foundService = sampleServices.find(s => s.id === params.id);
        setService(foundService || null);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/services/edit/${params.id}`);
  };

  const handleDelete = async () => {
    try {
      // Here you would typically make an API call to delete the service
      console.log('Deleting service:', params.id);
      router.push('/services');
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

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

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16">
          <div className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
              <p className="mt-2 text-gray-600">The service you're looking for doesn't exist.</p>
              <button
                onClick={() => router.push('/services')}
                className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Services
              </button>
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
            <button
              onClick={() => router.push('/services')}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Services
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Service Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
                    <p className="mt-2 text-gray-600">{service.shortDescription}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Service Master */}
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Service Master</h2>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {service.serviceMaster.charAt(0)}
                      </span>
                    </div>
                    <span className="ml-3 text-gray-700">{service.serviceMaster}</span>
                  </div>
                </div>

                {/* Pricing Plans */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Pricing Plans</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Basic Plan */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Basic</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-4">
                        ${service.pricing.basic}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Basic SEO optimization</li>
                        <li>• Monthly keyword research</li>
                        <li>• Basic content optimization</li>
                      </ul>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Premium</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-4">
                        ${service.pricing.premium}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Advanced SEO optimization</li>
                        <li>• Weekly keyword research</li>
                        <li>• Content strategy & creation</li>
                        <li>• Link building</li>
                      </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Enterprise</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-4">
                        ${service.pricing.enterprise}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Custom SEO strategy</li>
                        <li>• Daily keyword monitoring</li>
                        <li>• Dedicated SEO expert</li>
                        <li>• Advanced analytics</li>
                        <li>• Priority support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Service</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this service? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}