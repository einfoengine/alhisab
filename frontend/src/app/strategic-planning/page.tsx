"use client";

import React, { useState } from "react";
import {
  ClipboardDocumentCheckIcon,
  MagnifyingGlassCircleIcon,
  LightBulbIcon,
  PlusIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Mock data for the different sections
const planningData = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Redesign the company website for better UX",
    status: "planning",
    type: "monthly",
    startDate: "2024-07-01",
    endDate: "2024-07-15",
    cost: 5000,
    progress: 25,
  },
  {
    id: "2",
    title: "Mobile App Launch",
    description: "Plan and launch the new mobile app",
    status: "designing",
    type: "audit",
    startDate: "2024-07-10",
    endDate: "2024-07-30",
    cost: 12000,
    progress: 60,
  },
];

const auditData = [
  {
    id: "1",
    title: "Q1 Performance Audit",
    date: "2024-01-15",
    auditor: "John Smith",
    status: "completed",
    platforms: ["Facebook", "Instagram", "LinkedIn"],
    score: 8.5,
  },
  {
    id: "2",
    title: "Marketing Strategy Audit",
    date: "2024-01-08",
    auditor: "Sarah Johnson",
    status: "in_progress",
    platforms: ["YouTube", "TikTok"],
    score: 7.2,
  },
];

const strategyData = [
  {
    id: "1",
    title: "Digital Marketing Strategy",
    phase: "Phase 1: Planning & Setup",
    status: "completed",
    items: [
      "Project scope definition",
      "Team assembly and roles assignment",
      "Timeline and milestone creation",
    ],
  },
  {
    id: "2",
    title: "Content Strategy",
    phase: "Phase 2: Development",
    status: "in_progress",
    items: [
      "Core development work",
      "Regular client check-ins",
      "Quality assurance testing",
    ],
  },
];

const tabs = [
  { id: "planning", name: "Planning", icon: ClipboardDocumentCheckIcon },
  { id: "audit", name: "Audit", icon: MagnifyingGlassCircleIcon },
  { id: "strategy", name: "Strategy", icon: LightBulbIcon },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in_progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "planning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "designing":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function StrategicPlanningPage() {
  const [activeTab, setActiveTab] = useState("planning");

  const renderPlanningTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Project Planning</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Plan
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planningData.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">{plan.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`}>
                {plan.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{plan.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${plan.progress}%` }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cost</span>
                <span className="font-medium">${plan.cost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Timeline</span>
                <span className="font-medium">{plan.startDate} - {plan.endDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAuditTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Performance Audits</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Audit
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auditData.map((audit) => (
          <div key={audit.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">{audit.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(audit.status)}`}>
                {audit.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{new Date(audit.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Auditor</span>
                <span className="font-medium">{audit.auditor}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Score</span>
                <span className="font-medium">{audit.score}/10</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platforms</span>
                <span className="font-medium">{audit.platforms.join(", ")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStrategyTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Strategic Plans</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Strategy
        </button>
      </div>
      
      <div className="space-y-6">
        {strategyData.map((strategy) => (
          <div key={strategy.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">{strategy.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(strategy.status)}`}>
                {strategy.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">{strategy.phase}</h4>
              <div className="space-y-2">
                {strategy.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Strategic Planning</h1>
          <p className="text-gray-600 mt-2">Plan, audit, and strategize your business initiatives</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          {activeTab === "planning" && renderPlanningTab()}
          {activeTab === "audit" && renderAuditTab()}
          {activeTab === "strategy" && renderStrategyTab()}
        </div>
      </div>
    </div>
  );
} 