"use client";

import React, { useState } from "react";
import {
  MagnifyingGlassCircleIcon,
  ChartBarIcon,
  DocumentTextIcon,
  EyeIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  CalendarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

// Mock audit data
const auditReports = [
  {
    id: "audit_001",
    title: "Q4 2024 Marketing Performance Audit",
    date: "2024-12-15",
    status: "completed",
    score: 85,
    type: "comprehensive",
    summary: "Overall strong performance with room for improvement in social media engagement",
    keyFindings: [
      "SEO performance improved by 23%",
      "Social media engagement declined by 8%",
      "Website conversion rate increased by 15%",
      "Email marketing open rates stable at 28%"
    ],
    recommendations: [
      "Implement social media automation tools",
      "Optimize content for mobile devices",
      "Enhance email segmentation strategy",
      "Increase video content production"
    ]
  },
  {
    id: "audit_002",
    title: "Website Performance & SEO Audit",
    date: "2024-11-30",
    status: "in_progress",
    score: 72,
    type: "technical",
    summary: "Technical SEO issues identified, mobile optimization needs improvement",
    keyFindings: [
      "Page load speed below industry average",
      "Mobile responsiveness issues detected",
      "Missing meta descriptions on 15% of pages",
      "Broken links found on 8 pages"
    ],
    recommendations: [
      "Optimize image sizes and compression",
      "Implement lazy loading for images",
      "Fix mobile navigation issues",
      "Add missing meta descriptions"
    ]
  },
  {
    id: "audit_003",
    title: "Social Media Performance Audit",
    date: "2024-11-15",
    status: "completed",
    score: 78,
    type: "social",
    summary: "Good content quality but engagement rates need improvement",
    keyFindings: [
      "Content quality score: 8.5/10",
      "Engagement rate: 2.1% (industry avg: 3.2%)",
      "Best performing platform: LinkedIn",
      "Optimal posting time: 9-11 AM"
    ],
    recommendations: [
      "Increase interactive content (polls, Q&A)",
      "Optimize posting schedule",
      "Enhance visual content strategy",
      "Implement influencer partnerships"
    ]
  }
];

const performanceMetrics = {
  seo: {
    organicTraffic: { current: 15420, previous: 12540, change: 23 },
    keywordRankings: { current: 45, previous: 30, change: 50 },
    backlinks: { current: 1250, previous: 1150, change: 8.7 },
    pageSpeed: { current: 2.8, previous: 3.2, change: -12.5 }
  },
  social: {
    engagementRate: { current: 2.1, previous: 2.3, change: -8.7 },
    followerGrowth: { current: 1250, previous: 1100, change: 13.6 },
    reach: { current: 45000, previous: 38000, change: 18.4 },
    impressions: { current: 89000, previous: 75000, change: 18.7 }
  },
  website: {
    conversionRate: { current: 3.2, previous: 2.8, change: 14.3 },
    bounceRate: { current: 42, previous: 48, change: -12.5 },
    avgSessionDuration: { current: 185, previous: 165, change: 12.1 },
    pagesPerSession: { current: 3.2, previous: 2.9, change: 10.3 }
  },
  email: {
    openRate: { current: 28.5, previous: 27.8, change: 2.5 },
    clickRate: { current: 4.2, previous: 3.9, change: 7.7 },
    unsubscribeRate: { current: 0.8, previous: 1.1, change: -27.3 },
    conversionRate: { current: 2.1, previous: 1.8, change: 16.7 }
  }
};

const competitorAnalysis = [
  {
    name: "Competitor A",
    domain: "competitora.com",
    traffic: 25000,
    keywords: 120,
    backlinks: 2100,
    socialFollowers: 15000,
    strengths: ["Strong content strategy", "High engagement rates"],
    weaknesses: ["Slow website speed", "Limited mobile optimization"]
  },
  {
    name: "Competitor B",
    domain: "competitorb.com",
    traffic: 18000,
    keywords: 85,
    backlinks: 1600,
    socialFollowers: 12000,
    strengths: ["Excellent SEO", "Fast website"],
    weaknesses: ["Low social engagement", "Poor content quality"]
  },
  {
    name: "Competitor C",
    domain: "competitorc.com",
    traffic: 22000,
    keywords: 95,
    backlinks: 1800,
    socialFollowers: 18000,
    strengths: ["Strong brand presence", "High conversion rates"],
    weaknesses: ["Limited content", "Poor mobile experience"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in_progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

const getChangeColor = (change: number) => {
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-gray-600";
};

const getChangeIcon = (change: number) => {
  if (change > 0) return <ArrowUpIcon className="h-4 w-4" />;
  if (change < 0) return <ArrowDownIcon className="h-4 w-4" />;
  return null;
};

export default function PerformanceAuditsPage() {
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", icon: ChartBarIcon },
    { id: "reports", name: "Audit Reports", icon: DocumentTextIcon },
    { id: "competitors", name: "Competitor Analysis", icon: EyeIcon },
    { id: "recommendations", name: "Recommendations", icon: InformationCircleIcon },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Performance Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Score</p>
              <p className="text-2xl font-bold text-gray-900">78/100</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+5 points from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Audits Completed</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+3 this quarter</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Issues Found</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDownIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">-2 from last audit</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Audit</p>
              <p className="text-2xl font-bold text-gray-900">Jan 15</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ClockIcon className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-600">15 days remaining</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-600" />
            SEO Performance
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceMetrics.seo).map(([key, data]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {typeof data.current === 'number' && data.current > 1000 
                      ? data.current.toLocaleString() 
                      : data.current}
                    {key === 'pageSpeed' && 's'}
                  </span>
                  <div className={`flex items-center text-xs ${getChangeColor(data.change)}`}>
                    {getChangeIcon(data.change)}
                    <span className="ml-1">{Math.abs(data.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <UserGroupIcon className="h-5 w-5 mr-2 text-purple-600" />
            Social Media Performance
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceMetrics.social).map(([key, data]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {typeof data.current === 'number' && data.current > 1000 
                      ? data.current.toLocaleString() 
                      : data.current}
                    {key === 'engagementRate' && '%'}
                  </span>
                  <div className={`flex items-center text-xs ${getChangeColor(data.change)}`}>
                    {getChangeIcon(data.change)}
                    <span className="ml-1">{Math.abs(data.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Website & Email Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ComputerDesktopIcon className="h-5 w-5 mr-2 text-green-600" />
            Website Performance
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceMetrics.website).map(([key, data]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {data.current}
                    {key === 'avgSessionDuration' && 's'}
                    {key === 'conversionRate' && '%'}
                    {key === 'bounceRate' && '%'}
                  </span>
                  <div className={`flex items-center text-xs ${getChangeColor(data.change)}`}>
                    {getChangeIcon(data.change)}
                    <span className="ml-1">{Math.abs(data.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2 text-orange-600" />
            Email Marketing Performance
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceMetrics.email).map(([key, data]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {data.current}%
                  </span>
                  <div className={`flex items-center text-xs ${getChangeColor(data.change)}`}>
                    {getChangeIcon(data.change)}
                    <span className="ml-1">{Math.abs(data.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuditReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Audit Reports</h2>
          <p className="text-gray-600 mt-1">Comprehensive performance analysis and insights</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {auditReports.map((audit) => (
          <div key={audit.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{audit.title}</h3>
                <p className="text-sm text-gray-600">{new Date(audit.date).toLocaleDateString()}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(audit.status)}`}>
                {audit.status.toUpperCase()}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Performance Score</span>
                <span className={`font-bold text-lg ${getScoreColor(audit.score)}`}>
                  {audit.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    audit.score >= 80 ? 'bg-green-500' : 
                    audit.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${audit.score}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{audit.summary}</p>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Findings</h4>
                <ul className="space-y-1">
                  {audit.keyFindings.slice(0, 2).map((finding, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {audit.recommendations.slice(0, 2).map((rec, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <InformationCircleIcon className="h-3 w-3 text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500 capitalize">{audit.type} audit</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompetitorAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Competitor Analysis</h2>
          <p className="text-gray-600 mt-1">Compare your performance against key competitors</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          Add Competitor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {competitorAnalysis.map((competitor, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
              <span className="text-xs text-gray-500">{competitor.domain}</span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monthly Traffic</span>
                <span className="font-medium">{competitor.traffic.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ranking Keywords</span>
                <span className="font-medium">{competitor.keywords}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Backlinks</span>
                <span className="font-medium">{competitor.backlinks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Social Followers</span>
                <span className="font-medium">{competitor.socialFollowers.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-medium text-green-700 mb-1">Strengths</h4>
                <ul className="space-y-1">
                  {competitor.strengths.map((strength, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start">
                      <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-red-700 mb-1">Weaknesses</h4>
                <ul className="space-y-1">
                  {competitor.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start">
                      <XCircleIcon className="h-3 w-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Actionable Recommendations</h2>
          <p className="text-gray-600 mt-1">Prioritized recommendations based on audit findings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          Add Recommendation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-red-600" />
            High Priority
          </h3>
          <div className="space-y-4">
            {[
              "Optimize website loading speed for mobile devices",
              "Fix broken links and 404 errors",
              "Implement structured data markup",
              "Enhance social media engagement strategy"
            ].map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{rec}</p>
                  <p className="text-xs text-gray-600 mt-1">Estimated impact: High</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <InformationCircleIcon className="h-5 w-5 mr-2 text-yellow-600" />
            Medium Priority
          </h3>
          <div className="space-y-4">
            {[
              "Enhance email segmentation strategy",
              "Create more video content",
              "Improve internal linking structure",
              "Optimize meta descriptions"
            ].map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <InformationCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{rec}</p>
                  <p className="text-xs text-gray-600 mt-1">Estimated impact: Medium</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
          Low Priority
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Update copyright year in footer",
            "Add more social sharing buttons",
            "Optimize images for web",
            "Create FAQ page",
            "Add breadcrumb navigation",
            "Implement schema markup for reviews"
          ].map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">{rec}</p>
                <p className="text-xs text-gray-600 mt-1">Estimated impact: Low</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Performance Audits</h1>
        <p className="text-gray-600 mt-1">Comprehensive analysis of your marketing performance and competitive landscape</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === "overview" && renderOverview()}
        {activeTab === "reports" && renderAuditReports()}
        {activeTab === "competitors" && renderCompetitorAnalysis()}
        {activeTab === "recommendations" && renderRecommendations()}
      </div>
    </div>
  );
} 