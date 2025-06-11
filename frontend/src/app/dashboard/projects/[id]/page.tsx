'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import projects from '@/data/projects.json';
import clients from '@/data/clients.json';
import services from '@/data/services.json';
import packages from '@/data/packages.json';
import invoices from '@/data/invoices.json';
import PageHeader from '@/components/elements/PageHeader';

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

const ProjectDetailsPage = () => {
  const params = useParams();
  const projectId = params?.id as string;
  const project = projects.projects.find(p => p.id === projectId);
  const client = project ? clients.find(c => c.id === project.client_id) : null;
  const projectInvoices = invoices.filter(inv => inv.project_id === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const servicesTotal = project.services.reduce((total, service) => {
    return total + calculateServicePrice(service.id, service.discount);
  }, 0);

  const packagesTotal = project.packages.reduce((total, pkg) => {
    return total + calculatePackagePrice(pkg.id, pkg.discount);
  }, 0);

  const finalValue = Math.min(servicesTotal, packagesTotal);
  const totalSaved = project.project_value - finalValue;

  return (
    <div className="nt-page nt-project-details">
      <main>
        <PageHeader title={project.name} />
        <div className="nt-page-content">
          <div className="nt-page-content-body">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Overview */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Client</p>
                      <p className="font-medium">{client?.client_name}</p>
                      <p className="text-sm text-gray-500">{client?.company_names?.[0]}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Project Master</p>
                      <p className="font-medium">{project.project_master}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-medium">{new Date(project.start_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">End Date</p>
                      <p className="font-medium">{new Date(project.end_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Project Type</p>
                      <p className="font-medium capitalize">{project.project_type.replace('_', ' ')}</p>
                    </div>
                  </div>
                </div>

                {/* Services & Packages */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Services & Packages</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Services ({project.services.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.services.map(service => {
                          const serviceInfo = services.services.find(s => s.id === service.id);
                          return serviceInfo ? (
                            <div key={service.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{serviceInfo.name}</h4>
                                  <p className="text-sm text-gray-600">{serviceInfo.description}</p>
                                </div>
                                <span className="text-green-600 font-medium">-{service.discount}%</span>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Original Price: ${serviceInfo.pricing.unit_price}</p>
                                <p className="text-sm text-gray-600">Discounted Price: ${calculateServicePrice(service.id, service.discount)}</p>
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Packages ({project.packages.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.packages.map(pkg => {
                          const packageInfo = packages.packages.find(p => p.id === pkg.id);
                          return packageInfo ? (
                            <div key={pkg.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{packageInfo.name}</h4>
                                  <p className="text-sm text-gray-600">{packageInfo.description}</p>
                                </div>
                                <span className="text-green-600 font-medium">-{pkg.discount}%</span>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Original Price: ${packageInfo.pricing.unit_price}</p>
                                <p className="text-sm text-gray-600">Discounted Price: ${calculatePackagePrice(pkg.id, pkg.discount)}</p>
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Deliverables */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Key Deliverables</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {project.key_deliverables.map((deliverable, index) => (
                      <li key={index} className="text-gray-700">{deliverable}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Financial Summary */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Original Value</p>
                      <p className="text-2xl font-semibold">${project.project_value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Final Value</p>
                      <p className="text-2xl font-semibold text-green-600">${finalValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Saved</p>
                      <p className="text-xl font-semibold text-green-600">${totalSaved.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Milestones</h2>
                  <div className="space-y-4">
                    {project.milestones.map((milestone, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <p className="font-medium">{milestone.name}</p>
                        <p className="text-sm text-gray-600">${milestone.release_amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Invoices */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Invoices</h2>
                  <div className="space-y-4">
                    {projectInvoices.map(invoice => (
                      <div key={invoice.invoice_id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Invoice #{invoice.invoice_id}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(invoice.issue_date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {invoice.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Amount: {invoice.currency} {invoice.total_amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Due: {invoice.currency} {invoice.due_amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agreement */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Agreement</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Agreement Number</p>
                      <p className="font-medium">{project.agreement_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Methods</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.payment_methods.map(method => (
                          <span key={method} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                            {method.replace('_', ' ').toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Security</p>
                      <p className="font-medium capitalize">{project.payment_security}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailsPage;