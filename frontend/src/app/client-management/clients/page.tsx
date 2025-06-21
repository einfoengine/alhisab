'use client';

import clientsData from '@/data/clients.json';
import PageHeader from '@/components/elements/PageHeader';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Client {
  id: string;
  client_name: string;
  company_names: string[];
  status: string;
  email: string;
  address?: string;
  phone: { country_code: string; number: string; whatsapp: boolean };
  preferred_contact_method: string;
  avatar: string;
  notes?: string;
}

interface RawClient {
  [key: string]: unknown;
}

export default function ClientsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  // Only include objects with required fields and map to Client type
  const clients: Client[] = (clientsData as RawClient[])
    .filter(
      (c) => c.id && c.client_name && c.company_names && c.email && c.phone && c.avatar !== undefined
    )
    .map((c) => ({
      id: c.id as string,
      client_name: c.client_name as string,
      company_names: c.company_names as string[],
      status: c.status as string,
      email: c.email as string,
      address: c.address as string | undefined,
      phone: c.phone as { country_code: string; number: string; whatsapp: boolean },
      preferred_contact_method: c.preferred_contact_method as string,
      avatar: c.avatar as string,
      notes: c.notes as string | undefined,
    }));

  // Table columns
  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (_: unknown, client: Client) => (
        <div className="flex items-center gap-3">
          {client.avatar ? (
            <img src={client.avatar} alt={client.client_name} className="h-8 w-8 rounded-full object-cover border-2 border-blue-400 shadow" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white font-bold text-base shadow">
              {client.client_name ? client.client_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2) : '?'}
            </div>
          )}
          <span className="font-semibold text-blue-700">{client.client_name}</span>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (_: unknown, client: Client) => client.phone?.number || '',
    },
    {
      key: 'company',
      label: 'Company',
      render: (_: unknown, client: Client) => client.company_names?.join(', '),
    },
  ];

  // Grid view
  const ClientCard = ({ client }: { client: Client }) => (
    <div
      className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
      onClick={() => router.push(`/client-management/clients/${client.id}`)}
    >
      {client.avatar ? (
        <img src={client.avatar} alt={client.client_name} className="h-16 w-16 rounded-full object-cover border-2 border-blue-400 shadow mb-2" />
      ) : (
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white font-bold text-xl shadow mb-2">
          {client.client_name ? client.client_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2) : '?'}
        </div>
      )}
      <div className="text-lg font-semibold text-blue-700 mb-1">{client.client_name}</div>
      <div className="text-gray-600 text-sm mb-1">{client.email}</div>
      <div className="text-gray-600 text-sm mb-1">{client.phone?.number}</div>
      <div className="text-gray-700 text-sm font-medium">{client.company_names?.join(', ')}</div>
    </div>
  );

  return (
    <div className="p-8">
      <PageHeader
        title="Clients"
        viewMode={viewMode}
        setViewMode={setViewMode}
        actions={[{
          name: 'Add New',
          icon: PlusIcon,
          onClick: () => router.push('/client-management/clients/new'),
        }]}
      />
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-blue-50 cursor-pointer transition"
                  onClick={() => router.push(`/client-management/clients/${client.id}`)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                      {(() => {
                        switch (col.key) {
                          case 'name':
                            return col.render ? col.render(client.client_name, client) : client.client_name;
                          case 'email':
                            return client.email;
                          case 'phone':
                            return client.phone?.number || '';
                          case 'company':
                            return client.company_names?.join(', ');
                          default:
                            return '';
                        }
                      })()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
