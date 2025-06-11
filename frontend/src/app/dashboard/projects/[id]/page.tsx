'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import projects from '@/data/projects.json';
import clients from '@/data/clients.json';
import services from '@/data/services.json';
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

const ProjectDetailsPage = () => {
  const params = useParams();
  const projectId = params?.id as string;

  const project = projects.projects.find(p => p.id === projectId);
  const client = project ? clients.find(c => c.id === project.client_id) : null;
  const projectServices = project ? project.services.map(serviceId => 
    services.services.find(s => s.id === serviceId)
  ).filter(Boolean) : [];

  if (!project) {
    return (
      <div className="nt-page">
        <main>
          <PageHeader title="Project Not Found" />
          <div className="nt-page-content">
            <div className="nt-page-content-body">
              <p>Project not found</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="nt-page nt-project-details">
      <main>
        <PageHeader title={project.name} />
        <div className="nt-page-content">
          <div className="nt-page-content-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Project Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Project Name</label>
                    <p className="font-medium">{project.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Description</label>
                    <p className="font-medium">{project.description}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Project Master</label>
                    <p className="font-medium">{project.project_master}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Project Type</label>
                    <p className="font-medium capitalize">{project.project_type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <p className={`inline-block px-2 py-1 rounded-full text-sm ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status.replace('_', ' ').toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Agreement Number</label>
                    <p className="font-medium">{project.agreement_number}</p>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Client Information</h2>
                {client ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Client Name</label>
                      <p className="font-medium">{client.client_name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{client.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">
                        {client.phone.country_code} {client.phone.number}
                        {client.phone.whatsapp && ' (WhatsApp)'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Address</label>
                      <p className="font-medium">{client.address}</p>
                    </div>
                  </div>
                ) : (
                  <p>Client information not available</p>
                )}
              </div>

              {/* Financial Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Financial Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Project Value</label>
                    <p className="font-medium">${project.project_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Payment Security</label>
                    <p className="font-medium capitalize">{project.payment_security}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Payment Methods</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.payment_methods.map((method, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm capitalize">
                          {method.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Timeline</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Start Date</label>
                    <p className="font-medium">{project.start_date}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">End Date</label>
                    <p className="font-medium">{project.end_date}</p>
                  </div>
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Key Deliverables</h2>
                <div className="space-y-2">
                  {project.key_deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <p>{deliverable}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectServices.map((service, index) => (
                    service && (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.shortDescription}</p>
                        <div className="mt-2">
                          <span className="text-sm font-medium">
                            ${service.pricing.unit_price.toLocaleString()}
                          </span>
                          {service.pricing.max_discount > 0 && (
                            <span className="ml-2 text-sm text-green-600">
                              (Up to {service.pricing.max_discount}% off)
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Milestones</h2>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <p>{milestone.name}</p>
                      </div>
                      <p className="font-medium">${milestone.release_amount.toLocaleString()}</p>
                    </div>
                  ))}
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