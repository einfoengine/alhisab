'use client';
import { useState, useEffect } from 'react';
import servicesData from '@/data/services.json';
import FormServices from '@/components/FormServices';
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

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
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
  // Map features array to comma separated string for editing
  const initialValues = {
    ...service,
    features: service.features ? service.features.join(', ') : '',
    unit_price: service.pricing?.unit_price,
    max_discount: service.pricing?.max_discount,
  };
  return (
    <div className="p-8">
      <PageHeader title={`Edit Service: ${service.name}`} />
      <FormServices
        initialValues={initialValues}
        onSubmit={(values) => {
          // TODO: Implement actual update logic
          console.log('Edit service:', values);
        }}
        submitLabel="Update Service"
      />
    </div>
  );
} 