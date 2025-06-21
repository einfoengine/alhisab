'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TableBuilder from '@/components/TableBuilder';
import projects from '@/data/projects.json';
import clients from '@/data/clients.json';
import services from '@/data/services.json';
import packages from '@/data/packages.json';
import PageHeader from '@/components/elements/PageHeader';
import Image from 'next/image';
import { PlusIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

type ServiceWithDiscount = {
  id: string;
  discount: number;
  category?: string;
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
    services?: string[];
  }[];
  project_highlights?: string[];
  expected_outcomes?: string[];
};

const ProjectsPage = () => {
  const router = useRouter();
  const [openServicesDropdown, setOpenServicesDropdown] = useState<string | null>(null);

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
    router.push(`/business-desk/projects/${projectId}`);
  };

  const toggleServicesDropdown = (projectId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenServicesDropdown(openServicesDropdown === projectId ? null : projectId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Project Name',
      sortable: true,
      render: (_value: unknown, item: Project) => (
        <div className="space-y-1">
          <div 
            className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => handleRowClick(item.id)}
          >
            {item.name}
          </div>
          <div className="text-sm text-gray-500 line-clamp-2">
            {item.description}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Master: {item.project_master}</span>
            <span>•</span>
            <span>{item.project_type.replace('_', ' ')}</span>
          </div>
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
          <div className="flex items-center gap-3">
            <div className="relative">
              {client?.avatar ? (
                <Image
                  src={client.avatar}
                  alt={client.client_name}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                style={{
                  display: client?.avatar ? 'none' : 'flex',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: 16,
                  color: '#6b7280',
                  border: '2px solid #e5e7eb',
                }}
                className="avatar-fallback"
              >
                {client?.client_name?.[0] || '?'}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-gray-900 truncate">{client?.client_name || 'Unknown Client'}</div>
              {client?.company_names?.[0] && (
                <div className="text-sm text-gray-500 truncate">{client.company_names[0]}</div>
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
        <div className="relative">
          <button
            onClick={(e) => toggleServicesDropdown(item.id, e)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            <InformationCircleIcon className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {item.services.length} {item.services.length === 1 ? 'Service' : 'Services'}
            </span>
            <ChevronDownIcon className={`w-4 h-4 text-gray-600 transition-transform ${
              openServicesDropdown === item.id ? 'rotate-180' : ''
            }`} />
          </button>
          
          {openServicesDropdown === item.id && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
              <div className="p-3 border-b border-gray-100">
                <h4 className="font-medium text-gray-900">Project Services</h4>
                <p className="text-sm text-gray-500">Click on a service to view details</p>
              </div>
              <div className="p-3 space-y-2">
                {item.services.map(service => {
                  const serviceInfo = services.services.find(s => s.id === service.id);
                  return serviceInfo ? (
                    <div 
                      key={service.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                      onClick={() => router.push(`/business-desk/services/${service.id}`)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{serviceInfo.name}</div>
                        <div className="text-sm text-gray-500 truncate">{serviceInfo.shortDescription}</div>
                      </div>
                      <div className="text-right ml-2">
                        <div className="text-sm font-medium text-green-600">
                          -{service.discount}%
                        </div>
                        <div className="text-xs text-gray-500">
                          ${serviceInfo.pricing.unit_price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'packages',
      label: 'Packages',
      render: (_value: unknown, item: Project) => (
        <div className="space-y-2">
          {item.packages.map(pkg => {
            const packageInfo = packages.packages.find(p => p.id === pkg.id);
            return packageInfo ? (
              <div 
                key={pkg.id}
                className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-blue-900 truncate">{packageInfo.name}</div>
                  <div className="text-sm text-blue-700">
                    {packageInfo.services.length} services included
                  </div>
                </div>
                <div className="text-right ml-2">
                  <div className="text-sm font-medium text-blue-600">
                    -{pkg.discount}%
                  </div>
                </div>
              </div>
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
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
          getStatusColor(value as string)
        }`}>
          {(value as string).replace('_', ' ').toUpperCase()}
        </span>
      ),
    },
    {
      key: 'project_value',
      label: 'Project Value',
      sortable: true,
      render: (_value: unknown, item: Project) => {
        const servicesTotal = item.services.reduce((total, service) => {
          return total + calculateServicePrice(service.id, service.discount);
        }, 0);
        
        const packagesTotal = item.packages.reduce((total, pkg) => {
          return total + calculatePackagePrice(pkg.id, pkg.discount);
        }, 0);
        
        const finalValue = Math.min(servicesTotal, packagesTotal);
        const savings = item.project_value - finalValue;
        
        return (
          <div className="space-y-1">
            <div className="font-semibold text-gray-900">
              ${finalValue.toLocaleString()}
            </div>
            <div className="text-sm text-green-600">
              Save ${savings.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              Original: ${item.project_value.toLocaleString()}
            </div>
          </div>
        );
      },
    },
    {
      key: 'timeline',
      label: 'Timeline',
      sortable: true,
      render: (_value: unknown, item: Project) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900">
            {new Date(item.start_date).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">to</div>
          <div className="text-sm font-medium text-gray-900">
            {new Date(item.end_date).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {Math.ceil((new Date(item.end_date).getTime() - new Date(item.start_date).getTime()) / (1000 * 60 * 60 * 24))} days
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <PageHeader title="Projects" />
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            onClick={() => router.push('/business-desk/projects/new')}
          >
            <PlusIcon className="h-5 w-5" /> New Project
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <TableBuilder<Project>
            columns={columns}
            data={projects.projects}
            onRowClick={(item) => handleRowClick(item.id)}
            itemsPerPage={10}
          />
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {openServicesDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpenServicesDropdown(null)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;