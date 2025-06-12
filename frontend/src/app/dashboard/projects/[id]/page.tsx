'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import projects from '@/data/projects.json';
import clients from '@/data/clients.json';
import services from '@/data/services.json';
import packages from '@/data/packages.json';
import invoices from '@/data/invoices.json';
import PageHeader from '@/components/elements/PageHeader';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// type ServiceWithDiscount = {
//   id: string;
//   discount: number;
// };

// type PackageWithDiscount = {
//   id: string;
//   discount: number;
// };

// type Project = {
//   id: string;
//   name: string;
//   description: string;
//   client_id: string;
//   project_master: string;
//   project_type: string;
//   start_date: string;
//   end_date: string;
//   status: string;
//   key_deliverables: string[];
//   services: ServiceWithDiscount[];
//   packages: PackageWithDiscount[];
//   payment_methods: string[];
//   payment_security: string;
//   agreement_number: string;
//   project_value: number;
//   milestones: {
//     name: string;
//     release_amount: number;
//   }[];
// };

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

function AccordionBox({ title, children, isOpen, onClick }: { title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <button
        className="w-full flex items-center justify-between p-6 focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-xl font-semibold">{title}</span>
        {isOpen ? (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[2000px] p-6 pt-0' : 'max-h-0 p-0'}`}
        style={{ willChange: 'max-height' }}
      >
        {isOpen && children}
      </div>
    </div>
  );
}

const ProjectDetailsPage = () => {
  const params = useParams();
  const projectId = params?.id as string;
  const project = projects.projects.find(p => p.id === projectId);
  const client = project ? clients.find(c => c.id === project.client_id) : null;
  const projectInvoices = invoices.filter(inv => inv.project_id === projectId);

  // Allow multiple boxes to be open
  const [openStates, setOpenStates] = useState([true, false, false, false, false, false, false]);
  const handleAccordion = (idx: number) => {
    setOpenStates(prev => {
      const newStates = [...prev];
      newStates[idx] = !newStates[idx];
      return newStates;
    });
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title={project.name} />
        
        <div className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Overview, Services & Packages, Key Deliverables */}
            <div className="lg:col-span-2 space-y-6">
              <AccordionBox title="Project Overview" isOpen={openStates[0]} onClick={() => handleAccordion(0)}>
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
              </AccordionBox>
              <AccordionBox title="Services & Packages" isOpen={openStates[1]} onClick={() => handleAccordion(1)}>
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
              </AccordionBox>
              <AccordionBox title="Key Deliverables" isOpen={openStates[2]} onClick={() => handleAccordion(2)}>
                <ul className="list-disc list-inside space-y-2">
                  {project.key_deliverables.map((deliverable, index) => (
                    <li key={index} className="text-gray-700">{deliverable}</li>
                  ))}
                </ul>
              </AccordionBox>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AccordionBox title="Financial Summary" isOpen={openStates[3]} onClick={() => handleAccordion(3)}>
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
              </AccordionBox>
              <AccordionBox title="Milestones" isOpen={openStates[4]} onClick={() => handleAccordion(4)}>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <p className="font-medium">{milestone.name}</p>
                      <p className="text-sm text-gray-600">${milestone.release_amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </AccordionBox>
              <AccordionBox title="Invoices" isOpen={openStates[5]} onClick={() => handleAccordion(5)}>
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
              </AccordionBox>
              <AccordionBox title="Agreement" isOpen={openStates[6]} onClick={() => handleAccordion(6)}>
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
              </AccordionBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;