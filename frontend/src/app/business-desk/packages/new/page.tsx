'use client';

import { useRouter } from 'next/navigation';
import FormPackages from '@/components/FormPackages';
import PageHeader from '@/components/elements/PageHeader';

interface PackageService {
  service_id: string;
  name: string;
  price: number;
}

interface PackageFormValues {
  id?: string;
  name: string;
  description: string;
  services: PackageService[];
  features: string[];
  total_price: number;
  created_at?: string;
}

export default function NewPackagePage() {
  const router = useRouter();

  const handleSubmit = async (values: PackageFormValues) => {
    // TODO: Implement actual package creation logic
    console.log('New package:', values);
    router.push('/business-desk/packages');
  };

  return (
    <div className="p-8">
      <PageHeader title="Add New Package" />
      <FormPackages
        onSubmit={handleSubmit}
        submitLabel="Create Package"
      />
    </div>
  );
} 