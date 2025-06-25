"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  CheckCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

// Mock data for client profiles
const clientProfilesData = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    type: "Enterprise",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    monthlyRevenue: 8500,
    totalRevenue: 125000,
    lifetimeValue: 180000,
    services: ["SEO", "PPC", "Social Media", "Content Marketing"],
    lastContact: "2024-01-19",
    nextMeeting: "2024-01-25",
    contractEnd: "2024-12-31",
    assignedTo: "John Smith",
    website: "https://techstart.com",
    address: "123 Tech Street, San Francisco, CA 94105",
    notes: "High-value client interested in expanding services. Very responsive to communication.",
    industry: "Technology",
    companySize: "50-200 employees",
    founded: "2018",
    socialMedia: {
      linkedin: "linkedin.com/in/sarahjohnson",
      twitter: "@sarahjohnson",
      facebook: "facebook.com/techstart"
    },
    performance: {
      satisfaction: 4.8,
      responseTime: "2 hours",
      projectCompletion: 95,
      retentionRate: 98
    },
    recentActivity: [
      { date: "2024-01-19", type: "Meeting", description: "Quarterly review call" },
      { date: "2024-01-15", type: "Email", description: "Campaign performance update" },
      { date: "2024-01-12", type: "Project", description: "New landing page launched" },
      { date: "2024-01-08", type: "Payment", description: "Monthly invoice paid" }
    ],
    revenueHistory: [
      { month: "Jan 2024", revenue: 8500 },
      { month: "Dec 2023", revenue: 8200 },
      { month: "Nov 2023", revenue: 7800 },
      { month: "Oct 2023", revenue: 7500 },
      { month: "Sep 2023", revenue: 7200 },
      { month: "Aug 2023", revenue: 7000 }
    ],
    projects: [
      { id: 1, name: "Website Redesign", status: "Completed", value: 25000, completion: 100 },
      { id: 2, name: "SEO Campaign", status: "Active", value: 15000, completion: 75 },
      { id: 3, name: "PPC Management", status: "Active", value: 8000, completion: 60 }
    ]
  },
  {
    id: 2,
    name: "Mike Chen",
    company: "Digital Solutions",
    email: "mike@digitalsolutions.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    type: "Mid-Market",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    monthlyRevenue: 5200,
    totalRevenue: 78000,
    lifetimeValue: 95000,
    services: ["PPC", "Email Marketing", "Analytics"],
    lastContact: "2024-01-18",
    nextMeeting: "2024-01-30",
    contractEnd: "2024-06-30",
    assignedTo: "Jane Doe",
    website: "https://digitalsolutions.com",
    address: "456 Digital Ave, New York, NY 10001",
    notes: "Growing company with potential for additional services. Good relationship.",
    industry: "Digital Marketing",
    companySize: "20-50 employees",
    founded: "2020",
    socialMedia: {
      linkedin: "linkedin.com/in/mikechen",
      twitter: "@mikechen",
      facebook: "facebook.com/digitalsolutions"
    },
    performance: {
      satisfaction: 4.6,
      responseTime: "4 hours",
      projectCompletion: 88,
      retentionRate: 92
    },
    recentActivity: [
      { date: "2024-01-18", type: "Email", description: "Campaign optimization request" },
      { date: "2024-01-14", type: "Meeting", description: "Monthly performance review" },
      { date: "2024-01-10", type: "Project", description: "Email automation setup" },
      { date: "2024-01-05", type: "Payment", description: "Monthly invoice paid" }
    ],
    revenueHistory: [
      { month: "Jan 2024", revenue: 5200 },
      { month: "Dec 2023", revenue: 5000 },
      { month: "Nov 2023", revenue: 4800 },
      { month: "Oct 2023", revenue: 4500 },
      { month: "Sep 2023", revenue: 4200 },
      { month: "Aug 2023", revenue: 4000 }
    ],
    projects: [
      { id: 1, name: "PPC Campaign", status: "Active", value: 12000, completion: 80 },
      { id: 2, name: "Email Marketing", status: "Active", value: 6000, completion: 45 },
      { id: 3, name: "Analytics Setup", status: "Completed", value: 3000, completion: 100 }
    ]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Creative Agency",
    email: "emily@creativeagency.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    type: "Small Business",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    monthlyRevenue: 3200,
    totalRevenue: 45000,
    lifetimeValue: 55000,
    services: ["Social Media", "Content Marketing", "Branding"],
    lastContact: "2024-01-17",
    nextMeeting: "2024-02-05",
    contractEnd: "2024-03-31",
    assignedTo: "John Smith",
    website: "https://creativeagency.com",
    address: "789 Creative Blvd, Los Angeles, CA 90210",
    notes: "Creative agency with unique needs. Requires personalized approach.",
    industry: "Creative Services",
    companySize: "10-20 employees",
    founded: "2019",
    socialMedia: {
      linkedin: "linkedin.com/in/emilyrodriguez",
      twitter: "@emilyrodriguez",
      instagram: "@creativeagency"
    },
    performance: {
      satisfaction: 4.9,
      responseTime: "1 hour",
      projectCompletion: 92,
      retentionRate: 95
    },
    recentActivity: [
      { date: "2024-01-17", type: "Meeting", description: "Content strategy discussion" },
      { date: "2024-01-13", type: "Project", description: "Social media campaign launch" },
      { date: "2024-01-09", type: "Email", description: "Brand guidelines update" },
      { date: "2024-01-04", type: "Payment", description: "Monthly invoice paid" }
    ],
    revenueHistory: [
      { month: "Jan 2024", revenue: 3200 },
      { month: "Dec 2023", revenue: 3000 },
      { month: "Nov 2023", revenue: 2800 },
      { month: "Oct 2023", revenue: 2600 },
      { month: "Sep 2023", revenue: 2400 },
      { month: "Aug 2023", revenue: 2200 }
    ],
    projects: [
      { id: 1, name: "Brand Identity", status: "Completed", value: 8000, completion: 100 },
      { id: 2, name: "Social Media Management", status: "Active", value: 4000, completion: 70 },
      { id: 3, name: "Content Creation", status: "Active", value: 3000, completion: 50 }
    ]
  }
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

const getPerformanceColor = (value: number, type: 'satisfaction' | 'completion' | 'retention') => {
  if (type === 'satisfaction') {
    if (value >= 4.5) return "text-green-600";
    if (value >= 4.0) return "text-yellow-600";
    return "text-red-600";
  } else {
    if (value >= 90) return "text-green-600";
    if (value >= 75) return "text-yellow-600";
    return "text-red-600";
  }
};

export default function ClientProfilesPage() {
  const [clients, setClients] = useState(clientProfilesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");
  const [selectedClient, setSelectedClient] = useState<typeof clientProfilesData[0] | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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
  const avgSatisfaction = filteredClients.reduce((sum, client) => sum + client.performance.satisfaction, 0) / filteredClients.length;

  const handleClientClick = (client: typeof clientProfilesData[0]) => {
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
            <h1 className="text-3xl font-bold text-gray-900">Client Profiles</h1>
            <p className="text-gray-600 mt-2">Detailed client analytics and performance insights</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="h-5 w-5" />
            Add New Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Profiles</p>
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
              <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{avgSatisfaction.toFixed(1)}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <StarIcon className="w-6 h-6 text-orange-600" />
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
                placeholder="Search client profiles..."
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

      {/* Client Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div 
            key={client.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleClientClick(client)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <Image 
                    src={client.avatar} 
                    alt={client.name}
                    fill
                    className="rounded-lg object-cover"
                  />
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

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500">Satisfaction</p>
                <div className="flex items-center gap-1">
                  <p className={`text-lg font-bold ${getPerformanceColor(client.performance.satisfaction, 'satisfaction')}`}>
                    {client.performance.satisfaction}
                  </p>
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500">Retention</p>
                <p className={`text-lg font-bold ${getPerformanceColor(client.performance.retentionRate, 'retention')}`}>
                  {client.performance.retentionRate}%
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-lg font-bold text-gray-900">${client.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500">Lifetime Value</p>
                <p className="text-lg font-bold text-gray-900">${client.lifetimeValue.toLocaleString()}</p>
              </div>
            </div>

            {/* Services */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Services:</p>
              <div className="flex flex-wrap gap-1">
                {client.services.slice(0, 3).map((service, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {service}
                  </span>
                ))}
                {client.services.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{client.services.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Recent Activity:</p>
              <div className="space-y-1">
                {client.recentActivity.slice(0, 2).map((activity, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{activity.type}: {activity.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>Last contact: {new Date(client.lastContact).toLocaleDateString()}</span>
                {client.nextMeeting && (
                  <span>Next: {new Date(client.nextMeeting).toLocaleDateString()}</span>
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

      {/* Client Profile Detail Modal */}
      {showClientModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Client Profile</h2>
              <button
                onClick={() => setShowClientModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {["overview", "performance", "projects", "activity"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <Image 
                      src={selectedClient.avatar} 
                      alt={selectedClient.name}
                      fill
                      className="rounded-xl object-cover"
                    />
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

                {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Industry</label>
                        <p className="text-sm text-gray-900">{selectedClient.industry}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Company Size</label>
                        <p className="text-sm text-gray-900">{selectedClient.companySize}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Founded</label>
                        <p className="text-sm text-gray-900">{selectedClient.founded}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Website</label>
                        <p className="text-sm text-gray-900">{selectedClient.website}</p>
                      </div>
                    </div>
                  </div>

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
                        <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedClient.address}</span>
                      </div>
                    </div>
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
              </div>
            )}

            {activeTab === "performance" && (
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-500">Satisfaction Score</p>
                    <div className="flex items-center gap-1">
                      <p className={`text-2xl font-bold ${getPerformanceColor(selectedClient.performance.satisfaction, 'satisfaction')}`}>
                        {selectedClient.performance.satisfaction}
                      </p>
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-500">Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedClient.performance.responseTime}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-500">Project Completion</p>
                    <p className={`text-2xl font-bold ${getPerformanceColor(selectedClient.performance.projectCompletion, 'completion')}`}>
                      {selectedClient.performance.projectCompletion}%
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-500">Retention Rate</p>
                    <p className={`text-2xl font-bold ${getPerformanceColor(selectedClient.performance.retentionRate, 'retention')}`}>
                      {selectedClient.performance.retentionRate}%
                    </p>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                  <div className="space-y-3">
                    {selectedClient.revenueHistory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.month}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(item.revenue / Math.max(...selectedClient.revenueHistory.map(r => r.revenue))) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">${item.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedClient.projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Value:</span>
                          <span className="font-medium">${project.value.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Completion:</span>
                          <span className="font-medium">{project.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${project.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-4">
                {selectedClient.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.type}</p>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}

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
      )}
    </div>
  );
}
