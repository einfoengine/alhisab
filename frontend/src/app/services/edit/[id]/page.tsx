'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

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

interface FormErrors {
  id?: string;
  name?: string;
  shortDescription?: string;
  serviceMaster?: string;
  image?: string;
  pricing?: {
    basic?: string;
    premium?: string;
    enterprise?: string;
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

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulate API call
    const fetchService = async () => {
      try {
        // In a real app, you would fetch from your API
        const foundService = sampleServices.find(s => s.id === params.id);
        if (foundService) {
          setFormData(foundService);
          setImagePreview(foundService.image);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData) return false;

    // ID validation
    if (!formData.id.trim()) {
      newErrors.id = 'Service ID is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.id)) {
      newErrors.id = 'Service ID can only contain lowercase letters, numbers, and hyphens';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Service name must be at least 3 characters long';
    }

    // Description validation
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Description is required';
    } else if (formData.shortDescription.length < 10) {
      newErrors.shortDescription = 'Description must be at least 10 characters long';
    }

    // Service Master validation
    if (!formData.serviceMaster.trim()) {
      newErrors.serviceMaster = 'Service master is required';
    }

    // Image validation
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }

    // Pricing validation
    newErrors.pricing = {};
    if (formData.pricing.basic < 0) {
      newErrors.pricing.basic = 'Basic price cannot be negative';
    }
    if (formData.pricing.premium < formData.pricing.basic) {
      newErrors.pricing.premium = 'Premium price must be higher than basic price';
    }
    if (formData.pricing.enterprise < formData.pricing.premium) {
      newErrors.pricing.enterprise = 'Enterprise price must be higher than premium price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      // Here you would typically make an API call to update the service
      console.log('Updating service:', formData);
      
      // For now, just redirect back to services page
      router.push('/services');
    } catch (error) {
      console.error('Error updating service:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;

    const { name, value } = e.target;
    
    if (name.startsWith('pricing.')) {
      const pricingField = name.split('.')[1];
      setFormData(prev => ({
        ...prev!,
        pricing: {
          ...prev!.pricing,
          [pricingField]: Number(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev!,
        [name]: value
      }));
    }

    // Clear error when field is modified
    if (name.startsWith('pricing.')) {
      const pricingField = name.split('.')[1];
      setErrors(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [pricingField]: undefined
        }
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically upload the file to your server/storage
    // For now, we'll just create a local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      if (formData) {
        setFormData(prev => ({
          ...prev!,
          image: result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
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

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16">
          <div className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
              <p className="mt-2 text-gray-600">The service you're trying to edit doesn't exist.</p>
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

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Service</h1>

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
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.id ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., seo, ppc, social"
                    />
                    {errors.id && (
                      <p className="mt-1 text-sm text-red-600">{errors.id}</p>
                    )}
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
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Search Engine Optimization"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
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
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.shortDescription ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Brief description of the service"
                    />
                    {errors.shortDescription && (
                      <p className="mt-1 text-sm text-red-600">{errors.shortDescription}</p>
                    )}
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
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.serviceMaster ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., John Smith"
                    />
                    {errors.serviceMaster && (
                      <p className="mt-1 text-sm text-red-600">{errors.serviceMaster}</p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Image
                    </label>
                    <div
                      onClick={handleImageClick}
                      className="relative h-48 w-full rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer transition-colors duration-200"
                    >
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Service preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <PhotoIcon className="h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Click to upload an image
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                    )}
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
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                          errors.pricing?.basic ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.pricing?.basic && (
                        <p className="mt-1 text-sm text-red-600">{errors.pricing.basic}</p>
                      )}
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
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                          errors.pricing?.premium ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.pricing?.premium && (
                        <p className="mt-1 text-sm text-red-600">{errors.pricing.premium}</p>
                      )}
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
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                          errors.pricing?.enterprise ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.pricing?.enterprise && (
                        <p className="mt-1 text-sm text-red-600">{errors.pricing.enterprise}</p>
                      )}
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
                    disabled={saving}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
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