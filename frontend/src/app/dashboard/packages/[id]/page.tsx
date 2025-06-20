'use client';

import { useParams } from 'next/navigation';
import packagesData from '@/data/packages.json';
import PageHeader from '@/components/elements/PageHeader';

interface PackageService {
  service_id: string;
  name: string;
  price: number;
}

interface Package {
  id: string;
  name: string;
  description: string;
  services: PackageService[];
  features: string[];
  total_price: number;
  created_at: string;
}

export default function PackageDetailsPage() {
  const params = useParams();
  const packageId = params?.id as string;
  
  if (!packageId) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Invalid Package ID</h2>
          <p className="mt-2 text-gray-600">Please provide a valid package ID.</p>
        </div>
      </div>
    );
  }
  
  const pkg = packagesData.packages.find((p) => p.id === packageId) as Package | undefined;
  
  if (!pkg) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Package not found</h2>
          <p className="mt-2 text-gray-600">The package you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader title={pkg.name} />
      
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Package Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="mt-1 text-gray-600">{pkg.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Total Price</h4>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">${pkg.total_price}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created At</h4>
                  <p className="mt-1 text-gray-600">{pkg.created_at}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Services Included</h3>
              <div className="space-y-3">
                {pkg.services.map((service, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span className="text-gray-900">{service.name}</span>
                    <span className="text-gray-600">${service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pkg.features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-900">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 