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
  DocumentTextIcon,
  BuildingStorefrontIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
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
};

export default function NewAuditPage() {
  const [selectedAuditType, setSelectedAuditType] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [auditName, setAuditName] = useState("");
  const [step, setStep] = useState(1);

  const selectedAudit = auditTypes.find(type => type.id === selectedAuditType);

  const handleAuditTypeSelect = (auditTypeId: string) => {
    setSelectedAuditType(auditTypeId);
    // Auto-select platforms based on audit type
    if (auditTypeId === "comprehensive") {
      setSelectedPlatforms(["google", "facebook", "mailchimp", "google_ads", "google_analytics"]);
    } else if (auditTypeId === "seo") {
      setSelectedPlatforms(["google", "bing", "semrush"]);
    } else if (auditTypeId === "social") {
      setSelectedPlatforms(["facebook", "instagram", "linkedin", "twitter"]);
    } else if (auditTypeId === "email") {
      setSelectedPlatforms(["mailchimp", "constant_contact"]);
    } else if (auditTypeId === "ppc") {
      setSelectedPlatforms(["google_ads", "facebook_ads"]);
    } else if (auditTypeId === "website") {
      setSelectedPlatforms(["google_analytics", "hotjar"]);
    } else if (auditTypeId === "mobile") {
      setSelectedPlatforms(["google_play", "app_store"]);
    }
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
    };
    return colorMap[color] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const canProceed = () => {
    if (step === 1) return selectedAuditType !== "";
    if (step === 2) return selectedPlatforms.length > 0;
    if (step === 3) return auditName.trim() !== "";
    return false;
  };

  const handleNext = () => {
    if (canProceed()) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleCreateAudit = () => {
    // Redirect to audits page
    window.location.href = "/strategic-planning/performance-audits";
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/strategic-planning/performance-audits"
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Audits
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-gray-900">Create New Audit</h1>
          <p className="text-gray-600">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stepNumber <= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  stepNumber < step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Audit Type</h2>
              <p className="text-gray-600">Select the type of audit you want to perform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {auditTypes.map((auditType) => {
                const Icon = auditType.icon;
                const isSelected = selectedAuditType === auditType.id;
                
                return (
                  <button
                    key={auditType.id}
                    onClick={() => handleAuditTypeSelect(auditType.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected 
                        ? `${getColorClasses(auditType.color)} border-current` 
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`h-8 w-8 ${isSelected ? 'text-current' : 'text-gray-600'}`} />
                      {isSelected && <CheckCircleIcon className="h-6 w-6 text-current" />}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{auditType.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{auditType.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {auditType.duration}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Platforms</h2>
              <p className="text-gray-600">Choose which platforms to include in your audit</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(platformOptions).map(([category, platforms]) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900 capitalize">
                    {category === "seo" ? "SEO Platforms" :
                     category === "social" ? "Social Media" :
                     category === "email" ? "Email Marketing" :
                     category === "ppc" ? "PPC Platforms" :
                     category === "website" ? "Website Analytics" :
                     category === "mobile" ? "Mobile Apps" : category}
                  </h3>
                  <div className="space-y-2">
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
                              <Icon className="h-5 w-5 text-gray-600 mr-2" />
                              <span className="font-medium text-gray-900">{platform.name}</span>
                            </div>
                            {isSelected && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
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
                    <span>Audit Type:</span>
                    <span className="font-medium">{selectedAudit?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platforms:</span>
                    <span className="font-medium">{selectedPlatforms.length} selected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Duration:</span>
                    <span className="font-medium">{selectedAudit?.duration}</span>
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