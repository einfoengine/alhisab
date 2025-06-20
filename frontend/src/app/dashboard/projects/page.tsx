'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TableBuilder from '@/components/TableBuilder';
import projects from '@/data/projects.json';
import clients from '@/data/clients.json';
import services from '@/data/services.json';
import packages from '@/data/packages.json';
import PageHeader from '@/components/elements/PageHeader';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/24/outline';

type ServiceWithDiscount = {
  id: string;
  discount: number;
};

type PackageWithDiscount = {
  id: string;
  discount: number;
};

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
  services: ServiceWithDiscount[];
  packages: PackageWithDiscount[];
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

  const calculateServicePrice = (serviceId: string, discount: number) => {
    const service = services.services.find(s => s.id === serviceId);
    if (!service) return 0;
    const price = service.pricing.unit_price;
    return price - (price * (discount / 100));
  };

  const calculatePackagePrice = (packageId: string, discount: number) => {
    const pkg = packages.packages.find(p => p.id === packageId);
    if (!pkg) return 0;
    const servicesPrice = pkg.services.reduce((total, serviceId) => {
      const service = services.services.find(s => s.id === serviceId);
      return total + (service?.pricing.unit_price || 0);
    }, 0);
    return servicesPrice - (servicesPrice * (discount / 100));
  };

  const handleRowClick = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`);
  };

  const columns = [
    {
      key: 'name',
      label: 'Project Name',
      sortable: true,
      render: (_value: unknown, item: Project) => (
        <div 
          className="font-medium text-blue-600 cursor-pointer hover:text-blue-800"
          onClick={() => handleRowClick(item.id)}
        >
          {item.name}
        </div>
      ),
    },
    {
      key: 'client',
      label: 'Client',
      sortable: true,
      render: (_value: unknown, item: Project) => {
        const client = clients.find(c => c.id === item.client_id);
        return (
          <div className="flex items-center gap-2">
            {client?.avatar ? (
              <Image
                src={client.avatar}
                alt={client.client_name}
                width={48}
                height={48}
                className="rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            <span
              style={{
                display: client?.avatar ? 'none' : 'flex',
                width: 48,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e5e7eb',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: 20,
                color: '#374151',
              }}
              className="avatar-fallback"
            >
              {client?.client_name?.[0] || '?'}
            </span>
            <div>
              <div className="font-medium">{client?.client_name || 'Unknown Client'}</div>
              {client?.company_names?.[0] && (
                <div className="text-sm text-gray-500">{client.company_names[0]}</div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      key: 'services',
      label: 'Services',
      render: (_value: unknown, item: Project) => (
        <div>
          <div className="mb-1">
            <span className="text-sm font-medium text-gray-600">
              Total Services: {item.services.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {item.services.map(service => {
              const serviceInfo = services.services.find(s => s.id === service.id);
              return serviceInfo ? (
                <span 
                  key={service.id}
                  className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                  title={`${serviceInfo.name} (${service.discount}% off)`}
                >
                  {serviceInfo.name} (-{service.discount}%)
                </span>
              ) : null;
            })}
          </div>
        </div>
      ),
    },
    {
      key: 'packages',
      label: 'Packages',
      render: (_value: unknown, item: Project) => (
        <div className="flex flex-wrap gap-1">
          {item.packages.map(pkg => {
            const packageInfo = packages.packages.find(p => p.id === pkg.id);
            return packageInfo ? (
              <span 
                key={pkg.id}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                title={`${packageInfo.name} (${pkg.discount}% off)`}
              >
                {packageInfo.name} (-{pkg.discount}%)
              </span>
            ) : null;
          })}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: unknown) => (
        <span className={`inline-block px-2 py-1 rounded-full text-sm ${
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
      key: 'project_value',
      label: 'Original Value',
      sortable: true,
      render: (value: unknown) => (
        <span>${(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'final_value',
      label: 'Final Value',
      sortable: true,
      render: (_value: unknown, item: Project) => {
        const servicesTotal = item.services.reduce((total, service) => {
          return total + calculateServicePrice(service.id, service.discount);
        }, 0);
        
        const packagesTotal = item.packages.reduce((total, pkg) => {
          return total + calculatePackagePrice(pkg.id, pkg.discount);
        }, 0);
        
        const finalValue = Math.min(servicesTotal, packagesTotal);
        
        return (
          <div className="font-semibold">
            ${finalValue.toLocaleString()}
            <span className="text-sm text-green-600 ml-1">
              (Save ${(item.project_value - finalValue).toLocaleString()})
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <PageHeader title="Projects" />
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push('/dashboard/projects/new')}
          >
            <PlusIcon className="h-5 w-5" /> New Project
          </button>
        </div>
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm">
            <TableBuilder<Project>
              columns={columns}
              data={projects.projects}
              onRowClick={(item) => handleRowClick(item.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;