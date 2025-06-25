"use client";

import React, { useState } from "react";
import {
  ArrowLeftIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  TagIcon,
  VideoCameraIcon,
  BuildingStorefrontIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const auditTypes = [
  {
    id: "comprehensive",
    name: "Comprehensive Audit",
    description: "Full analysis across all platforms and channels",
    icon: MagnifyingGlassIcon,
    duration: "2-3 hours",
    color: "purple"
  },
  {
    id: "seo",
    name: "SEO Audit",
    description: "Search engine optimization analysis",
    icon: GlobeAltIcon,
    duration: "1-2 hours",
    color: "blue"
  },
  {
    id: "social",
    name: "Social Media Audit",
    description: "Social media performance analysis",
    icon: ChatBubbleLeftRightIcon,
    duration: "1-2 hours",
    color: "green"
  },
  {
    id: "email",
    name: "Email Marketing Audit",
    description: "Email campaign and deliverability analysis",
    icon: EnvelopeIcon,
    duration: "1 hour",
    color: "orange"
  },
  {
    id: "ppc",
    name: "PPC Audit",
    description: "Paid advertising performance analysis",
    icon: TagIcon,
    duration: "1-2 hours",
    color: "red"
  },
  {
    id: "website",
    name: "Website Performance Audit",
    description: "Website analytics and user experience analysis",
    icon: ComputerDesktopIcon,
    duration: "1-2 hours",
    color: "indigo"
  },
  {
    id: "mobile",
    name: "Mobile App Audit",
    description: "Mobile application performance analysis",
    icon: DevicePhoneMobileIcon,
    duration: "1-2 hours",
    color: "pink"
  },
  {
    id: "content",
    name: "Content Audit",
    description: "Content quality, relevance, and performance analysis",
    icon: DocumentTextIcon,
    duration: "1-2 hours",
    color: "teal"
  },
  {
    id: "internal",
    name: "Internal Audit",
    description: "Internal processes, compliance, and operational analysis",
    icon: UserGroupIcon,
    duration: "2-3 hours",
    color: "amber"
  },
];

const platformOptions = {
  seo: [
    { id: "google", name: "Google Search Console", icon: GlobeAltIcon },
    { id: "bing", name: "Bing Webmaster Tools", icon: GlobeAltIcon },
    { id: "semrush", name: "SEMrush", icon: MagnifyingGlassIcon },
    { id: "ahrefs", name: "Ahrefs", icon: MagnifyingGlassIcon },
  ],
  social: [
    { id: "facebook", name: "Facebook", icon: ChatBubbleLeftRightIcon },
    { id: "instagram", name: "Instagram", icon: ChatBubbleLeftRightIcon },
    { id: "linkedin", name: "LinkedIn", icon: BuildingStorefrontIcon },
    { id: "twitter", name: "Twitter/X", icon: ChatBubbleLeftRightIcon },
    { id: "tiktok", name: "TikTok", icon: VideoCameraIcon },
  ],
  email: [
    { id: "mailchimp", name: "Mailchimp", icon: EnvelopeIcon },
    { id: "constant_contact", name: "Constant Contact", icon: EnvelopeIcon },
    { id: "sendgrid", name: "SendGrid", icon: EnvelopeIcon },
    { id: "klaviyo", name: "Klaviyo", icon: EnvelopeIcon },
  ],
  ppc: [
    { id: "google_ads", name: "Google Ads", icon: TagIcon },
    { id: "facebook_ads", name: "Facebook Ads", icon: TagIcon },
    { id: "linkedin_ads", name: "LinkedIn Ads", icon: TagIcon },
    { id: "bing_ads", name: "Microsoft Advertising", icon: TagIcon },
  ],
  website: [
    { id: "google_analytics", name: "Google Analytics", icon: ComputerDesktopIcon },
    { id: "hotjar", name: "Hotjar", icon: ComputerDesktopIcon },
    { id: "crazy_egg", name: "Crazy Egg", icon: ComputerDesktopIcon },
    { id: "mixpanel", name: "Mixpanel", icon: ComputerDesktopIcon },
  ],
  mobile: [
    { id: "google_play", name: "Google Play Console", icon: DevicePhoneMobileIcon },
    { id: "app_store", name: "App Store Connect", icon: DevicePhoneMobileIcon },
    { id: "firebase", name: "Firebase Analytics", icon: DevicePhoneMobileIcon },
  ],
  content: [
    { id: "content_calendar", name: "Content Calendar", icon: DocumentTextIcon },
    { id: "cms", name: "CMS Analytics", icon: DocumentTextIcon },
    { id: "social_content", name: "Social Content", icon: ChatBubbleLeftRightIcon },
    { id: "blog_analytics", name: "Blog Analytics", icon: DocumentTextIcon },
    { id: "video_analytics", name: "Video Analytics", icon: VideoCameraIcon },
  ],
  internal: [
    { id: "process_docs", name: "Process Documentation", icon: DocumentTextIcon },
    { id: "compliance_tools", name: "Compliance Tools", icon: UserGroupIcon },
    { id: "team_performance", name: "Team Performance", icon: UserGroupIcon },
    { id: "project_management", name: "Project Management", icon: UserGroupIcon },
    { id: "quality_assurance", name: "Quality Assurance", icon: CheckCircleIcon },
  ],
};

export default function NewAuditPage() {
  const [selectedAuditTypes, setSelectedAuditTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [auditName, setAuditName] = useState("");
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("");

  const selectedAudits = auditTypes.filter(type => selectedAuditTypes.includes(type.id));

  const handleAuditTypeToggle = (auditTypeId: string) => {
    setSelectedAuditTypes(prev => 
      prev.includes(auditTypeId) 
        ? prev.filter(id => id !== auditTypeId)
        : [...prev, auditTypeId]
    );
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: "bg-purple-100 text-purple-700 border-purple-200",
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      green: "bg-green-100 text-green-700 border-green-200",
      orange: "bg-orange-100 text-orange-700 border-orange-200",
      red: "bg-red-100 text-red-700 border-red-200",
      indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
      pink: "bg-pink-100 text-pink-700 border-pink-200",
      teal: "bg-teal-100 text-teal-700 border-teal-200",
      amber: "bg-amber-100 text-amber-700 border-amber-200",
    };
    return colorMap[color] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const canProceed = () => {
    if (step === 1) return selectedAuditTypes.length > 0;
    if (step === 2) return selectedPlatforms.length > 0;
    if (step === 3) return auditName.trim() !== "";
    return false;
  };

  const handleNext = () => {
    if (canProceed()) {
      setStep(step + 1);
      // Set the first selected audit type as the active tab
      if (step === 1 && selectedAuditTypes.length > 0) {
        setActiveTab(selectedAuditTypes[0]);
      }
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleCreateAudit = () => {
    // Redirect to audits page
    window.location.href = "/strategic-planning/performance-audits";
  };

  const getTotalDuration = () => {
    return selectedAudits.reduce((total, audit) => {
      const duration = audit.duration.split('-')[1]?.split(' ')[0] || '2';
      return total + parseInt(duration);
    }, 0);
  };

  return (
    <div className="p-3 md:p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/strategic-planning/performance-audits"
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Audits
        </Link>
        <div className="text-right">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Create New Audit</h1>
          <p className="text-gray-600 text-sm">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                stepNumber <= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-8 md:w-16 h-1 mx-1 md:mx-2 ${
                  stepNumber < step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Choose Audit Types</h2>
              <p className="text-gray-600 text-sm">Select one or more audit types to perform</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {auditTypes.map((auditType) => {
                const Icon = auditType.icon;
                const isSelected = selectedAuditTypes.includes(auditType.id);
                
                return (
                  <button
                    key={auditType.id}
                    onClick={() => handleAuditTypeToggle(auditType.id)}
                    className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected 
                        ? `${getColorClasses(auditType.color)} border-current` 
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`h-5 w-5 md:h-6 md:w-6 ${isSelected ? 'text-current' : 'text-gray-600'}`} />
                      {isSelected && <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-xs md:text-sm">{auditType.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{auditType.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {auditType.duration}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedAuditTypes.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
                <h3 className="font-medium text-blue-900 mb-2 text-sm">Selected Audits ({selectedAuditTypes.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAudits.map((audit) => (
                    <span key={audit.id} className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(audit.color)}`}>
                      {audit.name}
                    </span>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-blue-700 mt-2">
                  Estimated total duration: {getTotalDuration()} hours
                </p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Select Platforms</h2>
              <p className="text-gray-600 text-sm">Choose platforms for each audit type</p>
            </div>

            {/* Tabs for selected audit types */}
            {selectedAuditTypes.length > 1 && (
              <div className="border-b border-gray-200">
                <div className="flex space-x-1 overflow-x-auto pb-1">
                  {selectedAuditTypes.map((auditTypeId) => {
                    const audit = auditTypes.find(type => type.id === auditTypeId);
                    const isActive = activeTab === auditTypeId;
                    
                    return (
                      <button
                        key={auditTypeId}
                        onClick={() => setActiveTab(auditTypeId)}
                        className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                          isActive 
                            ? 'bg-white border border-gray-200 border-b-0 text-gray-900' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {audit?.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Platform selection for active tab */}
            <div className="space-y-4">
              {(() => {
                const currentAuditType = activeTab || selectedAuditTypes[0];
                const platforms = platformOptions[currentAuditType as keyof typeof platformOptions] || [];
                
                return (
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3">
                      {auditTypes.find(type => type.id === currentAuditType)?.name} Platforms
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {platforms.map((platform) => {
                        const Icon = platform.icon;
                        const isSelected = selectedPlatforms.includes(platform.id);
                        
                        return (
                          <button
                            key={platform.id}
                            onClick={() => handlePlatformToggle(platform.id)}
                            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                              isSelected 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Icon className="h-4 w-4 md:h-5 md:w-5 text-gray-600 mr-2" />
                                <span className="font-medium text-gray-900 text-sm">{platform.name}</span>
                              </div>
                              {isSelected && <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {selectedPlatforms.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4">
                <h3 className="font-medium text-green-900 mb-2 text-sm">Selected Platforms ({selectedPlatforms.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPlatforms.map((platformId) => {
                    // Find platform name from all platform options
                    const platformName = Object.values(platformOptions)
                      .flat()
                      .find(platform => platform.id === platformId)?.name;
                    
                    return (
                      <span key={platformId} className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {platformName}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Audit Details</h2>
              <p className="text-gray-600">Provide basic information about your audit</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="auditName" className="block text-sm font-medium text-gray-700 mb-2">
                  Audit Name *
                </label>
                <input
                  type="text"
                  id="auditName"
                  value={auditName}
                  onChange={(e) => setAuditName(e.target.value)}
                  placeholder="e.g., Q1 2024 Marketing Performance Audit"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Audit Summary</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Audit Types:</span>
                    <span className="font-medium">{selectedAuditTypes.length} selected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platforms:</span>
                    <span className="font-medium">{selectedPlatforms.length} selected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Duration:</span>
                    <span className="font-medium">{getTotalDuration()} hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg border transition-colors ${
              step === 1
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Back
          </button>

          <div className="flex space-x-3">
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  canProceed()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleCreateAudit}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                  canProceed()
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Audit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}