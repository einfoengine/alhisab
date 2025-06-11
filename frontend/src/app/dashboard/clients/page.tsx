'use client';

import React from 'react';
import PageHeader from '@/components/elements/PageHeader';
import TableBuilder from '@/components/TableBuilder';
import clients from '@/data/clients.json';
import Image from 'next/image';

// ----------------------
// Type Definitions
// ----------------------

type ClientRow = {
  id: string;
  avatar: string;
  name: string;
  status: string;
  email: string;
  phone: string;
  preferred_contact_method: string;
  address: string;
  projects: string[];
  created: string;
  last_payment: string;
  dues: string;
  notes: string;
};

type Project = {
  id: string;
  name: string;
};

// ----------------------
// Component
// ----------------------

const ClientsPage = () => {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const renderAvatar = (avatar: string, name: string) => {
    if (!avatar || avatar === '') {
      return (
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
          {getInitials(name)}
        </div>
      );
    }
    return (
      <div className="relative w-8 h-8">
        <Image
          src={avatar}
          alt={name}
          width={32}
          height={32}
          className="rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = "w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center";
            fallback.textContent = getInitials(name);
            target.parentElement?.appendChild(fallback);
          }}
        />
      </div>
    );
  };

  const clientList: ClientRow[] = clients.map((client) => ({
    id: client.id,
    name: client.client_name,
    status: client.status,
    email: client.email,
    phone: `${client.phone.country_code} ${client.phone.number}`,
    preferred_contact_method: client.preferred_contact_method,
    address: client.address || '',
    projects: client.projects.map((p: Project) => p.id),
    created: client.created,
    avatar: client.avatar,
    contact: `${client.phone.country_code} ${client.phone.number}`,
    last_payment: client.last_payment || 'N/A',
    dues: String(client.dues || 0),
    notes: client.notes || '',
  }));

  const clientColumns = [
    {
      key: 'avatar',
      label: 'Avatar',
      filterable: false,
      render: (value: unknown, item: ClientRow) => renderAvatar(value as string, item.name),
    },
    {
      key: 'name',
      label: 'Name',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'phone',
      label: 'Phone',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'preferred_contact_method',
      label: 'Preferred Contact Method',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'address',
      label: 'Address',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'projects',
      label: 'Projects',
      filterable: false,
      render: (value: unknown) => <span>{(value as string[]).length}</span>,
    },
    {
      key: 'created',
      label: 'Created',
      filterable: false,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'last_payment',
      label: 'Last Payment',
      filterable: false,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'dues',
      label: 'Dues',
      filterable: false,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'notes',
      label: 'Notes',
      filterable: false,
      render: (value: unknown) => <span>{value as string}</span>,
    },
  ];

  return (
    <div className="nt-page nt-clients">
      <main>
        <PageHeader title="Clients" />
        <div className="nt-page-content">
          <div className="nt-page-content-header">
            <h1 className="nt-page-content-header-title">Clients</h1>
          </div>
          <div className="nt-page-content-body">
            <TableBuilder<ClientRow> data={clientList} columns={clientColumns} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientsPage;
