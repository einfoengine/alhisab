'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import servicesData from '@/data/services.json';
import PageHeader from '@/components/elements/PageHeader';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

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

export default function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [service, setService] = useState<Service | undefined>(undefined);
  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      const foundService = (servicesData.services as Service[]).find((s) => s.id === resolvedId);
      setService(foundService);
    });
  }, [params]);
  if (!id || !service) return <div className="p-8">Loading...</div>;
  const handleDelete = () => {
    // TODO: Implement delete logic
    alert('Delete service (not implemented)');
  };
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <PageHeader
        title={service.name}
        actions={[
          {
            name: 'Edit',
            icon: PencilIcon,
            onClick: () => router.push(`/business-desk/services/${service.id}/edit`),
          },
          {
            name: 'Delete',
            icon: TrashIcon,
            onClick: handleDelete,
          },
        ]}
      />
      {service.image && (
        <Image 
          src={service.image} 
          alt={service.name} 
          width={800}
          height={256}
          className="w-full h-64 object-cover rounded-lg mb-6" 
        />
      )}
      {service.shortDescription && (
        <p className="text-lg text-gray-600 mb-4">{service.shortDescription}</p>
      )}
      {service.description && (
        <p className="mb-6 text-gray-800">{service.description}</p>
      )}
      {service.features && service.features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700">
            {service.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      {service.pricing && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Pricing</h2>
          <div className="text-blue-600 font-bold text-lg">
            ${service.pricing.unit_price.toLocaleString()}
            {service.pricing.max_discount && (
              <span className="ml-2 text-green-600 text-base">Max Discount: ${service.pricing.max_discount}</span>
            )}
          </div>
        </div>
      )}
      {service.serviceMaster && (
        <div className="mb-2">
          <span className="font-semibold">Service Master:</span> {service.serviceMaster}
        </div>
      )}
      {service.minimum_time_required && (
        <div className="mb-2">
          <span className="font-semibold">Minimum Time Required:</span> {service.minimum_time_required} days
        </div>
      )}
      {service.minimum_order_unit && (
        <div className="mb-2">
          <span className="font-semibold">Minimum Order Unit:</span> {service.minimum_order_unit}
        </div>
      )}
    </div>
  );
}