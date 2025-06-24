"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import projects from "@/data/projects.json";
import clients from "@/data/clients.json";
import Image from "next/image";
import { PlusIcon, Squares2X2Icon, TableCellsIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import TableBuilder from '@/components/TableBuilder';

const getClient = (client_id: string) => clients.find((c) => c.id === client_id);
const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "active":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "in_progress":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function ProjectsPage() {
  const router = useRouter();
  const [view, setView] = useState<'table' | 'card'>("table");
  const filteredProjects = projects.projects;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 w-full">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <span className="cursor-pointer hover:text-blue-600" onClick={() => router.push("/business-desk")}>Business-desk</span>
              <ChevronRightIcon className="w-4 h-4" />
              <span className="text-blue-600 font-medium">Projects</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <div className="text-gray-500 text-sm mt-1">All your business projects in one place. Search, filter, and manage easily.</div>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              className={`inline-flex items-center px-3 py-2 rounded-lg border ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition-colors`}
              onClick={() => setView('table')}
              title="Table View"
            >
              <TableCellsIcon className="h-5 w-5" />
            </button>
            <button
              className={`inline-flex items-center px-3 py-2 rounded-lg border ${view === 'card' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition-colors`}
              onClick={() => setView('card')}
              title="Card View"
            >
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              onClick={() => router.push('/business-desk/projects/new')}
            >
              <PlusIcon className="h-5 w-5" /> New Project
            </button>
          </div>
        </div>

        {/* Table or Card View */}
        {view === "table" ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-none">
            <TableBuilder
              columns={[
                {
                  key: 'name',
                  label: 'Project Name',
                  sortable: true,
                  filterable: true,
                  render: (_value, item) => (
                    <div>
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{item.description}</div>
                    </div>
                  ),
                },
                {
                  key: 'client',
                  label: 'Client',
                  sortable: true,
                  filterable: true,
                  render: (_value, item) => {
                    const client = getClient(item.client_id);
                    return (
                      <div className="flex items-center gap-2">
                        {client?.avatar ? (
                          <Image src={client.avatar} alt={client.client_name} width={32} height={32} className="rounded-full border" />
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border text-gray-400 font-bold">{client?.client_name?.[0] || '?'}</div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{client?.client_name || 'Unknown Client'}</div>
                          {client?.company_names?.[0] && (
                            <div className="text-xs text-gray-500">{client.company_names[0]}</div>
                          )}
                        </div>
                      </div>
                    );
                  },
                },
                {
                  key: 'services',
                  label: 'Services',
                  render: (_value, item) => (
                    <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{item.services?.length || 0} Services</span>
                  ),
                },
                {
                  key: 'project_value',
                  label: 'Project Value',
                  sortable: true,
                  render: (_value, item) => (
                    <span className="font-semibold text-gray-900">{item.project_value ? `$${item.project_value.toLocaleString()}` : '-'}</span>
                  ),
                },
                {
                  key: 'status',
                  label: 'Status',
                  sortable: true,
                  filterable: true,
                  render: (value) => (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(value as string)}`}>{String(value).replace('_', ' ').toUpperCase()}</span>
                  ),
                },
                {
                  key: 'timeline',
                  label: 'Timeline',
                  render: (_value, item) => (
                    <div className="text-xs text-gray-700">
                      {new Date(item.start_date).toLocaleDateString()} - {new Date(item.end_date).toLocaleDateString()}
                    </div>
                  ),
                },
              ]}
              data={filteredProjects}
              itemsPerPage={10}
              onRowClick={item => router.push(`/business-desk/projects/${item.id}`)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((item) => {
              const client = getClient(item.client_id);
              return (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/business-desk/projects/${item.id}`)}>
                  <div className="font-semibold text-lg text-gray-900 mb-1">{item.name}</div>
                  <div className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-shrink-0">
                      {client?.avatar ? (
                        <Image src={client.avatar} alt={client.client_name} width={32} height={32} className="rounded-full border" />
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border text-gray-400 font-bold">{client?.client_name?.[0] || '?'}</div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{client?.client_name || 'Unknown Client'}</div>
                      {client?.company_names?.[0] && (
                        <div className="text-xs text-gray-500">{client.company_names[0]}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>{item.status.replace('_', ' ').toUpperCase()}</span>
                  </div>
                </div>
              );
            })}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-8">No projects found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
