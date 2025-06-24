"use client";

import React, { useState } from "react";
import {
  UserIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Mock data for clients
const clientsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    type: "Enterprise",
    monthlyRevenue: 8500,
    totalRevenue: 125000,
    services: ["SEO", "PPC", "Social Media"],
    lastContact: "2024-01-19",
    nextMeeting: "2024-01-25",
    contractEnd: "2024-12-31",
    assignedTo: "John Smith",
    website: "https://techstart.com",
    address: "123 Tech Street, San Francisco, CA 94105",
    notes: "High-value client interested in expanding services. Very responsive to communication.",
  },
  {
    id: 2,
    name: "Mike Chen",
    company: "Digital Solutions",
    email: "mike@digitalsolutions.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    type: "Mid-Market",
    monthlyRevenue: 5200,
    totalRevenue: 78000,
    services: ["PPC", "Email Marketing"],
    lastContact: "2024-01-18",
    nextMeeting: "2024-01-30",
    contractEnd: "2024-06-30",
    assignedTo: "Jane Doe",
    website: "https://digitalsolutions.com",
    address: "456 Digital Ave, New York, NY 10001",
    notes: "Growing company with potential for additional services. Good relationship.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Creative Agency",
    email: "emily@creativeagency.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    type: "Small Business",
    monthlyRevenue: 3200,
    totalRevenue: 45000,
    services: ["Social Media", "Content Marketing"],
    lastContact: "2024-01-17",
    nextMeeting: "2024-02-05",
    contractEnd: "2024-03-31",
    assignedTo: "John Smith",
    website: "https://creativeagency.com",
    address: "789 Creative Blvd, Los Angeles, CA 90210",
    notes: "Creative agency with unique needs. Requires personalized approach.",
  },
  {
    id: 4,
    name: "David Wilson",
    company: "E-commerce Store",
    email: "david@ecommercestore.com",
    phone: "+1 (555) 321-6540",
    status: "Inactive",
    type: "Small Business",
    monthlyRevenue: 0,
    totalRevenue: 28000,
    services: ["PPC", "Conversion Optimization"],
    lastContact: "2024-01-10",
    nextMeeting: null,
    contractEnd: "2024-01-15",
    assignedTo: "Jane Doe",
    website: "https://ecommercestore.com",
    address: "321 Commerce St, Chicago, IL 60601",
    notes: "Contract ended. Follow up needed for renewal discussions.",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    company: "Local Restaurant",
    email: "lisa@localrestaurant.com",
    phone: "+1 (555) 789-0123",
    status: "Active",
    type: "Small Business",
    monthlyRevenue: 1800,
    totalRevenue: 22000,
    services: ["Local SEO", "Social Media"],
    lastContact: "2024-01-16",
    nextMeeting: "2024-01-28",
    contractEnd: "2024-08-31",
    assignedTo: "Mike Johnson",
    website: "https://localrestaurant.com",
    address: "654 Local Rd, Miami, FL 33101",
    notes: "Local business with seasonal fluctuations. Good for referrals.",
  },
  {
    id: 6,
    name: "Robert Kim",
    company: "Healthcare Solutions",
    email: "robert@healthcaresolutions.com",
    phone: "+1 (555) 147-2580",
    status: "Prospect",
    type: "Enterprise",
    monthlyRevenue: 0,
    totalRevenue: 0,
    services: ["SEO", "Content Marketing"],
    lastContact: "2024-01-15",
    nextMeeting: "2024-01-22",
    contractEnd: null,
    assignedTo: "Sarah Wilson",
    website: "https://healthcaresolutions.com",
    address: "987 Health Way, Boston, MA 02101",
    notes: "Prospective client in final negotiation phase. High potential value.",
  },
];

const clientTypes = ["All", "Small Business", "Mid-Market", "Enterprise"];
const clientStatuses = ["All", "Active", "Inactive", "Prospect"];
const assignedOptions = ["All", "John Smith", "Jane Doe", "Mike Johnson", "Sarah Wilson", "Unassigned"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Inactive":
      return "bg-red-100 text-red-800 border-red-200";
    case "Prospect":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Enterprise":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Mid-Market":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Small Business":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function ClientsPage() {
  const [clients, setClients] = useState(clientsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");
  const [selectedClient, setSelectedClient] = useState<typeof clientsData[0] | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);

  // Filter clients based on search and filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "All" || client.type === typeFilter;
    const matchesStatus = statusFilter === "All" || client.status === statusFilter;
    const matchesAssigned = assignedFilter === "All" || client.assignedTo === assignedFilter;

    return matchesSearch && matchesType && matchesStatus && matchesAssigned;
  });

  // Calculate totals
  const totalClients = filteredClients.length;
  const activeClients = filteredClients.filter(client => client.status === "Active").length;
  const totalMonthlyRevenue = filteredClients.reduce((sum, client) => sum + client.monthlyRevenue, 0);
  const totalRevenue = filteredClients.reduce((sum, client) => sum + client.totalRevenue, 0);

  const handleClientClick = (client: typeof clientsData[0]) => {
    setSelectedClient(client);
    setShowClientModal(true);
  };

  const handleStatusChange = (clientId: number, newStatus: string) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, status: newStatus } : client
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-2">Manage and track your client relationships</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="h-5 w-5" />
            Add New Client
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <UserIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Clients</p>
              <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalMonthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <CurrencyDollarIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="lg:w-48">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {clientTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {clientStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Assigned Filter */}
          <div className="lg:w-48">
            <select
              value={assignedFilter}
              onChange={(e) => setAssignedFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {assignedOptions.map((assigned) => (
                <option key={assigned} value={assigned}>{assigned}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div 
            key={client.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleClientClick(client)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.company}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <select
                  value={client.status}
                  onChange={(e) => handleStatusChange(client.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(client.status)}`}
                >
                  {clientStatuses.slice(1).map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(client.type)}`}>
                  {client.type}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <EnvelopeIcon className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <PhoneIcon className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GlobeAltIcon className="w-4 h-4" />
                <span>{client.website}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-lg font-semibold text-gray-900">${client.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Total Revenue</p>
                <p className="text-lg font-semibold text-gray-900">${client.totalRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Services</p>
                <p className="text-sm text-gray-900">{client.services.length}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Assigned To</p>
                <p className="text-sm text-gray-900">{client.assignedTo}</p>
              </div>
            </div>

            {/* Services */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Services:</p>
              <div className="flex flex-wrap gap-1">
                {client.services.map((service, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>Last contact: {new Date(client.lastContact).toLocaleDateString()}</span>
                {client.nextMeeting && (
                  <span>Next meeting: {new Date(client.nextMeeting).toLocaleDateString()}</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClientClick(client);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Client Detail Modal */}
      {showClientModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Client Details</h2>
              <button
                onClick={() => setShowClientModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedClient.name}</h3>
                  <p className="text-gray-500">{selectedClient.company}</p>
                  <div className="flex gap-2 mt-2">
                    <select
                      value={selectedClient.status}
                      onChange={(e) => handleStatusChange(selectedClient.id, e.target.value)}
                      className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedClient.status)}`}
                    >
                      {clientStatuses.slice(1).map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getTypeColor(selectedClient.type)}`}>
                      {selectedClient.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedClient.website}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedClient.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Assigned To</label>
                      <p className="text-sm text-gray-900">{selectedClient.assignedTo}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Contact</label>
                      <p className="text-sm text-gray-900">{new Date(selectedClient.lastContact).toLocaleDateString()}</p>
                    </div>
                    {selectedClient.nextMeeting && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Next Meeting</label>
                        <p className="text-sm text-gray-900">{new Date(selectedClient.nextMeeting).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedClient.contractEnd && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Contract End</label>
                        <p className="text-sm text-gray-900">{new Date(selectedClient.contractEnd).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${selectedClient.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${selectedClient.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Services Count</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedClient.services.length}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Client Since</p>
                  <p className="text-2xl font-bold text-gray-900">2023</p>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.services.map((service, index) => (
                    <span key={index} className="px-3 py-2 bg-blue-100 text-blue-800 text-sm rounded-lg">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                <textarea
                  value={selectedClient.notes}
                  onChange={(e) => {
                    setClients(clients.map(client => 
                      client.id === selectedClient.id ? { ...client, notes: e.target.value } : client
                    ));
                    setSelectedClient({ ...selectedClient, notes: e.target.value });
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add notes about this client..."
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowClientModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 