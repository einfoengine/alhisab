'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import projects from '@/data/projects.json';
import clients from '@/data/clients.json';
import services from '@/data/services.json';
import packages from '@/data/packages.json';
import invoices from '@/data/invoices.json';
import PageHeader from '@/components/elements/PageHeader';
import ProjectOverview from '@/components/ProjectOverview';
import AuditStrategy from '@/components/AuditStrategy';
import ActionPlan from '@/components/ActionPlan';
import ProjectTasks from '@/components/ProjectTasks';
import ProjectMeetings from '@/components/ProjectMeetings';
import ProjectInvoicesTab from '@/components/ProjectInvoicesTab';
import FinancialSummary from '@/components/FinancialSummary';
import ProjectMilestones from '@/components/ProjectMilestones';
import ProjectInvoices from '@/components/ProjectInvoices';
import ProjectAgreements from '@/components/ProjectAgreements';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  VideoCameraIcon
} from '@heroicons/react/24/outline';

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

const tabs = [
  { id: 'overview', name: 'Project Overview', icon: ChartBarIcon },
  { id: 'audit', name: 'Audit & Strategy', icon: DocumentTextIcon },
  { id: 'action-plan', name: 'Action Plan', icon: CalendarIcon },
  { id: 'tasks', name: 'Tasks', icon: CheckCircleIcon },
  { id: 'meetings', name: 'Meetings', icon: VideoCameraIcon },
  { id: 'invoices', name: 'Invoices', icon: DocumentTextIcon },
];

const ProjectDetailsPage = () => {
  const params = useParams();
  const projectId = params?.id as string;
  const project = projects.projects.find(p => p.id === projectId);
  const client = project ? clients.find(c => c.id === project.client_id) : null;
  const projectInvoices = invoices.filter(inv => inv.project_id === projectId);

  const [activeTab, setActiveTab] = useState('overview');

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverview project={project} client={client || null} />;
      case 'audit':
        return <AuditStrategy project={project} />;
      case 'action-plan':
        return <ActionPlan project={project} />;
      case 'tasks':
        return <ProjectTasks project={project} />;
      case 'meetings':
        return <ProjectMeetings project={project} />;
      case 'invoices':
        return <ProjectInvoicesTab project={project} />;
      default:
        return <ProjectOverview project={project} client={client || null} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title={project.name} />
        
        <div className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                            activeTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {tab.name}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              <FinancialSummary 
                project={project}
                servicesTotal={servicesTotal}
                packagesTotal={packagesTotal}
                finalValue={finalValue}
                totalSaved={totalSaved}
              />
              
              <ProjectMilestones milestones={project.milestones} />
              
              <ProjectInvoices invoices={projectInvoices} />
              
              <ProjectAgreements project={project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;