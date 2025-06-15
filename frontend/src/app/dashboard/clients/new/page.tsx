'use client';

import PageHeader from '@/components/elements/PageHeader';
import ClientForm from '@/components/forms/ClientForm';

export default function NewClientPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Add New Client"
        actions={[]}
      />
      <div className="mt-8">
        <ClientForm />
      </div>
    </div>
  );
} 