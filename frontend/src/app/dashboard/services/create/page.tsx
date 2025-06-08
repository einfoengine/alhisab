'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import PageHeader from '@/components/elements/PageHeader';

interface ServiceFormData {
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

const initialFormData: ServiceFormData = {
  id: '',
  name: '',
  shortDescription: '',
  serviceMaster: '',
  image: '',
  pricing: {
    basic: 0,
    premium: 0,
    enterprise: 0
  }
};

export default function CreateServicePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically make an API call to create the service
      console.log('Creating service:', formData);
      
      // For now, just redirect back to services page
      router.push('/services');
    } catch (error) {
      console.error('Error creating service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('pricing.')) {
      const pricingField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [pricingField]: Number(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16">
        <div className="p-6">
          <PageHeader title="Create Service" />

          <div className="mb-8">
            <button
              onClick={() => router.push('/services')}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Services
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Service</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Service ID */}
                  <div>
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                      Service ID
                    </label>
                    <input
                      type="text"
                      name="id"
                      id="id"
                      required
                      value={formData.id}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., seo, ppc, social"
                    />
                  </div>

                  {/* Service Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Service Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Search Engine Optimization"
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                      Short Description
                    </label>
                    <textarea
                      name="shortDescription"
                      id="shortDescription"
                      required
                      value={formData.shortDescription}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Brief description of the service"
                    />
                  </div>

                  {/* Service Master */}
                  <div>
                    <label htmlFor="serviceMaster" className="block text-sm font-medium text-gray-700">
                      Service Master
                    </label>
                    <input
                      type="text"
                      name="serviceMaster"
                      id="serviceMaster"
                      required
                      value={formData.serviceMaster}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., John Smith"
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      id="image"
                      required
                      value={formData.image}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Pricing Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Pricing Plans</h3>
                    
                    {/* Basic Plan */}
                    <div>
                      <label htmlFor="pricing.basic" className="block text-sm font-medium text-gray-700">
                        Basic Plan Price ($/month)
                      </label>
                      <input
                        type="number"
                        name="pricing.basic"
                        id="pricing.basic"
                        required
                        min="0"
                        value={formData.pricing.basic}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    {/* Premium Plan */}
                    <div>
                      <label htmlFor="pricing.premium" className="block text-sm font-medium text-gray-700">
                        Premium Plan Price ($/month)
                      </label>
                      <input
                        type="number"
                        name="pricing.premium"
                        id="pricing.premium"
                        required
                        min="0"
                        value={formData.pricing.premium}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    {/* Enterprise Plan */}
                    <div>
                      <label htmlFor="pricing.enterprise" className="block text-sm font-medium text-gray-700">
                        Enterprise Plan Price ($/month)
                      </label>
                      <input
                        type="number"
                        name="pricing.enterprise"
                        id="pricing.enterprise"
                        required
                        min="0"
                        value={formData.pricing.enterprise}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => router.push('/services')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}