'use client';
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

export default function EditServicePage({ params }: { params: { id: string } }) {
  const service = (servicesData.services as Service[]).find((s) => s.id === params.id);
  if (!service) return <div className="p-8">Service not found.</div>;
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