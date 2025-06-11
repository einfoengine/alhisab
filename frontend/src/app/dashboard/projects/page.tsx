'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TableBuilder from '@/components/TableBuilder';
import projects from '@/data/projects.json';
import clients from '@/data/clients.json';
import PageHeader from '@/components/elements/PageHeader';

type Project = {
  id: string;
  name: string;
  description: string;
  client_id: string;
  project_master: string;
  project_type: string;
  start_date: string;
  end_date: string;
  status: string;
  key_deliverables: string[];
  services: string[];
  payment_methods: string[];
  payment_security: string;
  agreement_number: string;
  project_value: number;
  milestones: {
    name: string;
    release_amount: number;
  }[];
};

const ProjectsPage = () => {
  const router = useRouter();

  const projectList = projects.projects.map(project => {
    const client = clients.find(c => c.id === project.client_id);
    return {
      ...project,
      client_name: client?.client_name || 'Unknown Client'
    };
  });

  const handleRowClick = (project: Project) => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  const columns = [
    {
      key: 'name',
      label: 'Project Name',
      filterable: true,
      render: (value: unknown) => (
        <span className="cursor-pointer hover:text-blue-600">{value as string}</span>
      ),
    },
    {
      key: 'client_name',
      label: 'Client',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'project_master',
      label: 'Project Master',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'project_type',
      label: 'Type',
      filterable: true,
      render: (value: unknown) => (
        <span className="capitalize">{value as string}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      render: (value: unknown) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          value === 'completed' ? 'bg-green-100 text-green-800' :
          value === 'active' ? 'bg-blue-100 text-blue-800' :
          value === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {(value as string).replace('_', ' ').toUpperCase()}
        </span>
      ),
    },
    {
      key: 'start_date',
      label: 'Start Date',
      filterable: false,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'end_date',
      label: 'End Date',
      filterable: false,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'project_value',
      label: 'Value',
      filterable: false,
      render: (value: unknown) => (
        <span>${(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'key_deliverables',
      label: 'Deliverables',
      filterable: false,
      render: (value: unknown) => (
        <span>{(value as string[]).length} items</span>
      ),
    },
  ];

  return (
    <div className="nt-page nt-projects">
      <main>
        <PageHeader title="Projects" />
        <div className="nt-page-content">
          <div className="nt-page-content-body">
            <TableBuilder<Project>
              data={projectList}
              columns={columns}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;