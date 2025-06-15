'use client';

import { useRouter } from 'next/navigation';
import PageHeader from '@/components/elements/PageHeader';
import ClientForm from '@/components/ClientForm';
import clientsData from '@/data/clients.json';

interface RawClient {
  [key: string]: unknown;
}

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const client = (clientsData as RawClient[]).find(c => c.id === params.id);

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Edit Client"
        actions={[]}
      />
      <div className="mt-8">
        <ClientForm
          initialData={client as any}
          isEditing={true}
        />
      </div>
    </div>
  );
} 