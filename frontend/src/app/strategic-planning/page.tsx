"use client";

import React, { useState } from "react";
import {
  MagnifyingGlassCircleIcon,
  LightBulbIcon,
  PlusIcon,
  CheckCircleIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  RocketLaunchIcon,
  PresentationChartLineIcon,
  EyeIcon,
  PencilIcon,
  ArrowUpIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Mock data for digital marketing planning
const marketingPlans = [
  {
    id: "1",
    title: "Q4 Social Media Campaign",
    description: "Comprehensive social media campaign across all platforms",
    status: "active",
    type: "campaign",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    budget: 25000,
    spent: 18500,
    progress: 74,
    platforms: ["Facebook", "Instagram", "LinkedIn", "TikTok"],
    team: ["John Smith", "Sarah Johnson", "Mike Chen"],
  },
  {
    id: "2",
    title: "Website SEO Optimization",
    description: "Improve search engine rankings and organic traffic",
    status: "planning",
    type: "seo",
    startDate: "2024-11-01",
    endDate: "2024-12-15",
    budget: 8000,
    spent: 0,
    progress: 15,
    platforms: ["Google", "Bing", "Organic Search"],
    team: ["Alex Rodriguez", "Lisa Wang"],
  },
  {
    id: "3",
    title: "Email Marketing Automation",
    description: "Set up automated email sequences for lead nurturing",
    status: "completed",
    type: "email",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    budget: 5000,
    spent: 4800,
    progress: 100,
    platforms: ["Mailchimp", "HubSpot"],
    team: ["Emma Davis", "David Wilson"],
  }
];

const tabs = [
  { id: "dashboard", name: "Dashboard", icon: PresentationChartLineIcon },
  { id: "campaigns", name: "Campaigns", icon: RocketLaunchIcon },
  { id: "audit", name: "Audit", icon: MagnifyingGlassCircleIcon },
  { id: "strategy", name: "Strategy", icon: LightBulbIcon },
  { id: "team", name: "Team", icon: UserGroupIcon },
  { id: "budget", name: "Budget", icon: CurrencyDollarIcon },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "active":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "planning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "in_progress":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "campaign":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "seo":
      return "bg-green-50 text-green-700 border-green-200";
    case "email":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export default function StrategicPlanningPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <RocketLaunchIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">$125K</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+2 new members</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Performance</p>
              <p className="text-2xl font-bold text-gray-900">8.7/10</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+0.3 from last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
          <div className="space-y-4">
            {marketingPlans.slice(0, 3).map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{plan.title}</p>
                    <p className="text-sm text-gray-600">{plan.platforms.join(", ")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{plan.progress}%</p>
                  <p className="text-sm text-gray-600">${plan.spent.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {marketingPlans.filter(plan => plan.status === "planning").map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">{plan.title}</p>
                    <p className="text-sm text-gray-600">Starts {new Date(plan.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`}>
                  {plan.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Marketing Campaigns</h2>
          <p className="text-gray-600 mt-1">Manage and track your digital marketing campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Campaign
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {marketingPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{plan.title}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(plan.type)}`}>
                  {plan.type.toUpperCase()}
                </span>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`}>
                {plan.status.toUpperCase()}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{plan.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${plan.progress}%` }}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Budget</span>
                <span className="font-medium">${plan.spent.toLocaleString()} / ${plan.budget.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Timeline</span>
                <span className="font-medium">{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Platforms</span>
                <span className="text-xs text-gray-500">{plan.platforms.length} platforms</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {plan.platforms.slice(0, 3).map((platform, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                    {platform}
                  </span>
                ))}
                {plan.platforms.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                    +{plan.platforms.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex -space-x-2">
                {plan.team.slice(0, 3).map((member, index) => (
                  <div key={index} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">{member.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                ))}
                {plan.team.length > 3 && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">+{plan.team.length - 3}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Performance Audits</h2>
          <p className="text-gray-600 mt-1">Review and analyze marketing performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Audit
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-gray-900">Q3 Marketing Performance Audit</h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor("completed")}`}>
              COMPLETED
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">10/15/2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Auditor</span>
              <span className="font-medium">Marketing Analytics Team</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Score</span>
              <span className="font-medium">8.7/10</span>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-700 mb-2">Key Insights</h4>
              <ul className="space-y-1">
                <li className="text-sm text-gray-600 flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Social media engagement increased by 35%
                </li>
                <li className="text-sm text-gray-600 flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Email campaigns performing above industry average
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-gray-900">Competitor Analysis Report</h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor("in_progress")}`}>
              IN PROGRESS
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">10/10/2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Auditor</span>
              <span className="font-medium">Competitive Intelligence</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Score</span>
              <span className="font-medium">7.2/10</span>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-700 mb-2">Key Insights</h4>
              <ul className="space-y-1">
                <li className="text-sm text-gray-600 flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Competitors are investing heavily in video content
                </li>
                <li className="text-sm text-gray-600 flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Gap identified in influencer marketing strategy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStrategy = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Strategic Goals</h2>
          <p className="text-gray-600 mt-1">Track progress towards strategic objectives</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Goal
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Brand Awareness Campaign</h3>
              <p className="text-gray-600 mt-1">Phase 1: Foundation • Q1 2024</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor("completed")}`}>
              COMPLETED
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">KPIs & Progress</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Brand Mentions</span>
                    <span className="font-medium">450 / 500 mentions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Social Reach</span>
                    <span className="font-medium">85,000 / 100,000 reach</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Tasks & Budget</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-medium">$15,000</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Brand guidelines development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Social media presence establishment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Content calendar creation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Lead Generation Strategy</h3>
              <p className="text-gray-600 mt-1">Phase 2: Growth • Q2-Q3 2024</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor("active")}`}>
              ACTIVE
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">KPIs & Progress</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Leads</span>
                    <span className="font-medium">180 / 250 leads</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium">3.2 / 4.0 %</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Tasks & Budget</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-medium">$25,000</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Landing page optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Lead magnet development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Email automation setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
          <p className="text-gray-600 mt-1">Manage your marketing team and assignments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          Add Member
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketingPlans.flatMap(plan => plan.team).filter((member, index, arr) => arr.indexOf(member) === index).map((member, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-blue-600">{member.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{member}</h3>
                <p className="text-sm text-gray-600">Marketing Specialist</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Active Campaigns</span>
                <span className="font-medium">{marketingPlans.filter(plan => plan.team.includes(member)).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Performance</span>
                <span className="font-medium">8.5/10</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Availability</span>
                <span className="font-medium text-green-600">Available</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBudget = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Budget Management</h2>
          <p className="text-gray-600 mt-1">Track and manage marketing budgets</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          Add Budget
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
          <div className="space-y-4">
            {marketingPlans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{plan.title}</p>
                    <p className="text-sm text-gray-600">{plan.type} campaign</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${plan.spent.toLocaleString()} / ${plan.budget.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{Math.round((plan.spent / plan.budget) * 100)}% used</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Budget</span>
              <span className="font-semibold text-gray-900">${marketingPlans.reduce((sum, plan) => sum + plan.budget, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Spent</span>
              <span className="font-semibold text-gray-900">${marketingPlans.reduce((sum, plan) => sum + plan.spent, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Remaining</span>
              <span className="font-semibold text-green-600">${(marketingPlans.reduce((sum, plan) => sum + plan.budget, 0) - marketingPlans.reduce((sum, plan) => sum + plan.spent, 0)).toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(marketingPlans.reduce((sum, plan) => sum + plan.spent, 0) / marketingPlans.reduce((sum, plan) => sum + plan.budget, 0)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                {Math.round((marketingPlans.reduce((sum, plan) => sum + plan.spent, 0) / marketingPlans.reduce((sum, plan) => sum + plan.budget, 0)) * 100)}% of budget used
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Strategic Planning</h1>
          <p className="text-gray-600 mt-2">Digital Marketing Planning & Management Platform</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
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
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "campaigns" && renderCampaigns()}
          {activeTab === "audit" && renderAudit()}
          {activeTab === "strategy" && renderStrategy()}
          {activeTab === "team" && renderTeam()}
          {activeTab === "budget" && renderBudget()}
        </div>
      </div>
    </div>
  );
}
