'use client';

import React from 'react';
import TableBuilder from '@/components/TableBuilder';
import projects from '@/data/projects.json';
import clients from '@/data/clients.json';
import PageHeader from '@/components/elements/PageHeader';

// Type Definitions
// ----------------------
type ProjectRow = {
  id: string;
  name: string;
  clientName: string;
  clientId: string;
  projectMaster: string;
  projectType: string;
  startDate: string;
  endDate: string;
  status: string;
  projectValue: number;
  dueInvoices: number;
  keyTasks: string[];
  description: string;
};

const ProjectsPage = () => {
  const projectList: ProjectRow[] = projects.projects.map((project) => {
    const client = clients.find((c) => c.id === project.clientId);
    return {
      ...project,
      clientName: client?.client_name || project.clientName,
    };
  });

  const projectColumns = [
    {
      key: 'name',
      label: 'Project Name',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'clientName',
      label: 'Client',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'projectMaster',
      label: 'Project Master',
      filterable: true,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'projectType',
      label: 'Type',
      filterable: true,
      render: (value: unknown) => <span className="capitalize">{value as string}</span>,
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
      key: 'startDate',
      label: 'Start Date',
      filterable: false,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'endDate',
      label: 'End Date',
      filterable: false,
      render: (value: unknown) => <span>{value as string}</span>,
    },
    {
      key: 'projectValue',
      label: 'Value',
      filterable: false,
      render: (value: unknown) => (
        <span>${(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'dueInvoices',
      label: 'Due Invoices',
      filterable: false,
      render: (value: unknown) => (
        <span className={Number(value) > 0 ? 'text-red-600' : 'text-green-600'}>
          ${(value as number).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'keyTasks',
      label: 'Tasks',
      filterable: false,
      render: (value: unknown) => (
        <span>{(value as string[]).length} tasks</span>
      ),
    },
  ];

  return (
    <div className='nt-page nt-projects'>
      <main>
        <PageHeader title="Projects" />
        <div className="nt-page-content">
          <div className="nt-page-content-body">
            <TableBuilder<ProjectRow> data={projectList} columns={projectColumns} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;