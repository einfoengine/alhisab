'use client'
import React from 'react';
import TableBuilder from '@/components/TableBuilder';
import clients from '@/data/clients.json';
// import { useRouter } from 'next/navigation';
import PageHeader from '@/components/elements/PageHeader';

const ClientsPage = () => {
  console.log("Clients: ", clients);
  const tableColumns = [
    {
      key: 'avatar',
      label: 'Avatar',
      // render: (value: unknown) => <span>{String(value)}</span>
    },
    {
      key: 'name',
      label: 'Name',
      // render: (value: unknown) => <span>{String(value)}</span>
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      // render: (value: unknown) => <span>{String(value)}</span>
    },
    {
      key: 'country',
      label: 'Country',
      filterable: true,
      // render: (value: unknown) => <span>{String(value)}</span>
    }
  ]
  const tableData = clients.map((client) => ({
    id: client.id,
    avatar: client.avatar,
    name: client.client_name,
    status: client.status,
    country: client.country.name,
    projects: client.projects.length,
    contact: client.phone.country_code + client.phone.number,
    email: client.email,
    address: client.address,
    createdAt: client.created,
  }));
  return (
    <div className='nt-page nt-clients'>
      <PageHeader title="Clients" />
      <TableBuilder columns={tableColumns} data={tableData} />
    </div>
  )
}

export default ClientsPage