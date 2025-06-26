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
  ChartBarIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import AuditResultSummary from '../AuditResultSummary';
import SocialAuditForm from '../SocialAuditForm';

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
    id: "campaigns",
    name: "Campaigns Audit",
    description: "Analysis of marketing campaigns, objectives, and results",
    icon: ChartBarIcon,
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

const CONTENT_DISTRIBUTION_CHANNELS = [
  "Website",
  "Blog",
  "Email Newsletter",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "YouTube",
  "Twitter/X",
  "TikTok",
  "Podcast",
  "SMS",
  "Non-Digital/Offline Marketing",
  "Other"
];
const CONTENT_TYPES = [
  "Blog Posts",
  "Case Studies",
  "Whitepapers",
  "Ebooks",
  "Videos",
  "Podcasts",
  "Infographics",
  "Social Media Posts",
  "Webinars",
  "Newsletters",
  "Press Releases",
  "Landing Pages",
  "Other"
];

// Add icon mapping for channels and types
const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  Website: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="2" /></svg>,
  Blog: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" /></svg>,
  'Email Newsletter': <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" /></svg>,
  Facebook: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" /><path d="M15 8h-2c-.7 0-1 .3-1 1v2h3l-.3 2h-2.7v6h-2v-6H8v-2h2V9c0-1.2.7-2 2-2h2v2z" stroke="currentColor" strokeWidth="2" /></svg>,
  Instagram: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="7" r="1.5" stroke="currentColor" strokeWidth="2" /></svg>,
  LinkedIn: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" /><path d="M8 17v-6M8 7v.01M12 17v-3a2 2 0 1 1 4 0v3" stroke="currentColor" strokeWidth="2" /></svg>,
  YouTube: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="4" stroke="currentColor" strokeWidth="2" /><polygon points="10,9 16,12 10,15" stroke="currentColor" strokeWidth="2" fill="none" /></svg>,
  'Twitter/X': <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 20L20 4M4 4l16 16" stroke="currentColor" strokeWidth="2" /></svg>,
  TikTok: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M15 8a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="2" /><circle cx="10" cy="14" r="3" stroke="currentColor" strokeWidth="2" /></svg>,
  Podcast: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /><path d="M12 15v2" stroke="currentColor" strokeWidth="2" /></svg>,
  SMS: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M2 7l10 6 10-6" stroke="currentColor" strokeWidth="2" /></svg>,
  Other: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" /></svg>,
  'Non-Digital/Offline Marketing': <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8" stroke="currentColor" strokeWidth="2" /><path d="M7 20h10" stroke="currentColor" strokeWidth="2" /></svg>
};
const TYPE_ICONS: Record<string, React.ReactNode> = {
  'Blog Posts': <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" /></svg>,
  'Case Studies': <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="2" /></svg>,
  Whitepapers: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" /></svg>,
  Ebooks: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" /></svg>,
  Videos: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><polygon points="10,9 16,12 10,15" stroke="currentColor" strokeWidth="2" fill="none" /></svg>,
  Podcasts: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /><path d="M12 15v2" stroke="currentColor" strokeWidth="2" /></svg>,
  Infographics: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" /></svg>,
  'Social Media Posts': <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" /><path d="M15 8h-2c-.7 0-1 .3-1 1v2h3l-.3 2h-2.7v6h-2v-6H8v-2h2V9c0-1.2.7-2 2-2h2v2z" stroke="currentColor" strokeWidth="2" /></svg>,
  Webinars: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" /></svg>,
  Newsletters: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" /></svg>,
  'Press Releases': <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" /></svg>,
  'Landing Pages': <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" /></svg>,
  Other: <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" /></svg>
};

export default function NewAuditPage() {
  const [selectedAuditTypes, setSelectedAuditTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [auditName, setAuditName] = useState("");
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("");
  const [showBrandingForm, setShowBrandingForm] = useState(true);
  const [showContentStrategyForm, setShowContentStrategyForm] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [showNonDigitalForm, setShowNonDigitalForm] = useState(false);
  const [nonDigitalActivities, setNonDigitalActivities] = useState([
    { activityType: '', description: '', targetAudience: '', frequency: '', effectiveness: '', notes: '' }
  ]);

  const [showOrganicForm, setShowOrganicForm] = useState(false);
  const [organicActivities, setOrganicActivities] = useState([
    { name: '', description: '', channel: '', frequency: '', effectiveness: '', notes: '' }
  ]);
  const handleOrganicChange = (idx: number, field: string, value: string) => {
    setOrganicActivities((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };
  const addOrganicActivity = () => {
    setOrganicActivities((prev) => [
      ...prev,
      { name: '', description: '', channel: '', frequency: '', effectiveness: '', notes: '' }
    ]);
  };
  const removeOrganicActivity = (idx: number) => {
    setOrganicActivities((prev) => prev.filter((_, i) => i !== idx));
  };

  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { name: '', objective: '', channels: '', duration: '', budget: '', results: '', lessons: '' }
  ]);
  const handleCampaignChange = (idx: number, field: string, value: string) => {
    setCampaigns((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };
  const addCampaign = () => {
    setCampaigns((prev) => [
      ...prev,
      { name: '', objective: '', channels: '', duration: '', budget: '', results: '', lessons: '' }
    ]);
  };
  const removeCampaign = (idx: number) => {
    setCampaigns((prev) => prev.filter((_, i) => i !== idx));
  };

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

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };
  const toggleContentType = (type: string) => {
    setSelectedContentTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
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

  const handleNonDigitalChange = (idx: number, field: string, value: string) => {
    setNonDigitalActivities((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };
  const addNonDigitalActivity = () => {
    setNonDigitalActivities((prev) => [
      ...prev,
      { activityType: '', description: '', targetAudience: '', frequency: '', effectiveness: '', notes: '' }
    ]);
  };
  const removeNonDigitalActivity = (idx: number) => {
    setNonDigitalActivities((prev) => prev.filter((_, i) => i !== idx));
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
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Select Platforms & Forms</h2>
              <p className="text-gray-600 text-sm">Choose platforms and complete audit forms</p>
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

            {/* Content for active tab */}
            <div className="space-y-4">
              {(() => {
                const currentAuditType = activeTab || selectedAuditTypes[0];
                
                // Show branding form for comprehensive audit
                if (currentAuditType === "comprehensive") {
                  return (
                    <div className="space-y-6">
                      {/* Collapsible Branding Audit Form */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
                          onClick={() => setShowBrandingForm((prev) => !prev)}
                        >
                          <span className="flex items-center">
                            <TagIcon className="h-6 w-6 text-purple-600 mr-2" />
                            <span className="text-lg font-semibold text-purple-900">Branding Audit Form</span>
                          </span>
                          <span className="text-purple-700">{showBrandingForm ? "▲" : "▼"}</span>
                        </button>
                        {showBrandingForm && (
                          <div className="p-4 md:p-6 pt-0">
                            <p className="text-sm text-purple-700 mb-4">
                              Complete this form during your client office investigation to assess branding across all touchpoints.
                            </p>
                            {/* Brand Strategy Section */}
                            <div className="bg-white rounded-lg p-4 border border-purple-100 mb-6">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <TagIcon className="h-5 w-5 mr-2 text-purple-600" />
                                Brand Strategy
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Unique Sales Propositions
                                  </label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                                    placeholder="What makes this brand unique in the market?"
                                  ></textarea>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Target Audience
                                  </label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                                    placeholder="Describe the ideal customer or audience."
                                  ></textarea>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand Persona
                                  </label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                                    placeholder="Describe the brand&apos;s personality, tone, and style."
                                  ></textarea>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand Archetype
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select archetype</option>
                                    <option value="innocent">Innocent</option>
                                    <option value="everyman">Everyman</option>
                                    <option value="hero">Hero</option>
                                    <option value="outlaw">Outlaw</option>
                                    <option value="explorer">Explorer</option>
                                    <option value="creator">Creator</option>
                                    <option value="ruler">Ruler</option>
                                    <option value="magician">Magician</option>
                                    <option value="lover">Lover</option>
                                    <option value="caregiver">Caregiver</option>
                                    <option value="jester">Jester</option>
                                    <option value="sage">Sage</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Branding Documentation Section */}
                            <div className="bg-white rounded-lg p-4 border border-purple-100">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <DocumentTextIcon className="h-5 w-5 mr-2 text-purple-600" />
                                Branding Documentation
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand Guidelines Available?
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="yes">Yes, comprehensive</option>
                                    <option value="partial">Yes, but incomplete</option>
                                    <option value="no">No, missing</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Logo Usage Guidelines
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="clear">Clear and documented</option>
                                    <option value="unclear">Unclear guidelines</option>
                                    <option value="none">No guidelines</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Color Palette Documentation
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="complete">Complete with codes</option>
                                    <option value="partial">Partial documentation</option>
                                    <option value="missing">Missing</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Typography Guidelines
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="defined">Well defined</option>
                                    <option value="basic">Basic guidelines</option>
                                    <option value="none">No guidelines</option>
                                  </select>
                                </div>
                              </div>
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Additional Documentation Notes
                                </label>
                                <textarea 
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                                  placeholder="Notes about brand documentation, style guides, etc."
                                ></textarea>
                              </div>
                            </div>

                            {/* Internal Branding Section */}
                            <div className="bg-white rounded-lg p-4 border border-purple-100">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <UserGroupIcon className="h-5 w-5 mr-2 text-purple-600" />
                                Internal Branding
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Office Environment Branding
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="excellent">Excellent - Consistent throughout</option>
                                    <option value="good">Good - Mostly consistent</option>
                                    <option value="fair">Fair - Some inconsistencies</option>
                                    <option value="poor">Poor - Inconsistent</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Employee Brand Awareness
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="high">High - Employees understand brand</option>
                                    <option value="medium">Medium - Some understanding</option>
                                    <option value="low">Low - Limited understanding</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Internal Communications
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="branded">Well branded</option>
                                    <option value="partial">Partially branded</option>
                                    <option value="generic">Generic</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand Training Programs
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="regular">Regular training</option>
                                    <option value="occasional">Occasional training</option>
                                    <option value="none">No training</option>
                                  </select>
                                </div>
                              </div>
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Internal Branding Observations
                                </label>
                                <textarea 
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                                  placeholder="Observations about office branding, employee interactions, internal materials, etc."
                                ></textarea>
                              </div>
                            </div>

                            {/* External Branding Section */}
                            <div className="bg-white rounded-lg p-4 border border-purple-100">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <GlobeAltIcon className="h-5 w-5 mr-2 text-purple-600" />
                                External Branding
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website Brand Consistency
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="excellent">Excellent - Fully consistent</option>
                                    <option value="good">Good - Mostly consistent</option>
                                    <option value="fair">Fair - Some inconsistencies</option>
                                    <option value="poor">Poor - Inconsistent</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Social Media Branding
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="consistent">Consistent across platforms</option>
                                    <option value="mixed">Mixed consistency</option>
                                    <option value="inconsistent">Inconsistent</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Marketing Materials
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="branded">Well branded</option>
                                    <option value="partial">Partially branded</option>
                                    <option value="generic">Generic</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Customer Touchpoints
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select option</option>
                                    <option value="consistent">Consistent experience</option>
                                    <option value="mixed">Mixed experience</option>
                                    <option value="inconsistent">Inconsistent experience</option>
                                  </select>
                                </div>
                              </div>
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  External Branding Observations
                                </label>
                                <textarea 
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                                  placeholder="Observations about external communications, customer-facing materials, online presence, etc."
                                ></textarea>
                              </div>
                            </div>

                            {/* Overall Brand Assessment */}
                            <div className="bg-white rounded-lg p-4 border border-purple-100">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <MagnifyingGlassIcon className="h-5 w-5 mr-2 text-purple-600" />
                                Overall Brand Assessment
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand Strength Score (1-10)
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select score</option>
                                    {[1,2,3,4,5,6,7,8,9,10].map(score => (
                                      <option key={score} value={score}>{score} - {score <= 3 ? 'Weak' : score <= 6 ? 'Fair' : score <= 8 ? 'Good' : 'Excellent'}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority Areas for Improvement
                                  </label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                                    <option value="">Select priority</option>
                                    <option value="documentation">Brand Documentation</option>
                                    <option value="internal">Internal Branding</option>
                                    <option value="external">External Branding</option>
                                    <option value="training">Employee Training</option>
                                    <option value="consistency">Brand Consistency</option>
                                  </select>
                                </div>
                              </div>
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Key Recommendations
                                </label>
                                <textarea 
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                                  placeholder="Key recommendations for brand improvement based on your investigation..."
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Collapsible Content Strategy & Quality Form */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg mt-6">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
                          onClick={() => setShowContentStrategyForm((prev) => !prev)}
                        >
                          <span className="flex items-center">
                            <DocumentTextIcon className="h-6 w-6 text-yellow-600 mr-2" />
                            <span className="text-lg font-semibold text-yellow-900">Content Strategy & Quality Form</span>
                          </span>
                          <span className="text-yellow-700">{showContentStrategyForm ? "▲" : "▼"}</span>
                        </button>
                        {showContentStrategyForm && (
                          <div className="p-4 md:p-6 pt-0">
                            <p className="text-sm text-yellow-700 mb-4">
                              Investigate the client&apos;s content strategy, planning, and content quality.
                            </p>
                            <div className="space-y-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Content Strategy Overview
                                </label>
                                <textarea
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                                  placeholder="Describe the overall content strategy, goals, and planning."
                                ></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Content Calendar & Planning
                                </label>
                                <textarea
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                                  placeholder="How is content planned, scheduled, and managed?"
                                ></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Content Quality Assessment
                                </label>
                                <textarea
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                                  placeholder="Evaluate the quality, consistency, and relevance of content."
                                ></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Content Distribution Channels
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {CONTENT_DISTRIBUTION_CHANNELS.map((channel) => {
                                    const selected = selectedChannels.includes(channel);
                                    return (
                                      <button
                                        type="button"
                                        key={channel}
                                        onClick={() => toggleChannel(channel)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-150 text-sm font-medium shadow-sm focus:outline-none w-full
                                          ${selected ? 'bg-yellow-100 border-yellow-600 text-yellow-800 ring-2 ring-yellow-200' : 'bg-white border-gray-300 text-gray-700 hover:bg-yellow-50'}`}
                                      >
                                        <span className="flex items-center">
                                          {CHANNEL_ICONS[channel] || CHANNEL_ICONS['Other']}
                                          {channel}
                                        </span>
                                        {selected && (
                                          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                          </svg>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Content Types
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {CONTENT_TYPES.map((type) => {
                                    const selected = selectedContentTypes.includes(type);
                                    return (
                                      <button
                                        type="button"
                                        key={type}
                                        onClick={() => toggleContentType(type)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-150 text-sm font-medium shadow-sm focus:outline-none w-full
                                          ${selected ? 'bg-yellow-100 border-yellow-600 text-yellow-800 ring-2 ring-yellow-200' : 'bg-white border-gray-300 text-gray-700 hover:bg-yellow-50'}`}
                                      >
                                        <span className="flex items-center">
                                          {TYPE_ICONS[type] || TYPE_ICONS['Other']}
                                          {type}
                                        </span>
                                        {selected && (
                                          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                          </svg>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Content Performance Metrics
                                </label>
                                <textarea
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                                  placeholder="What metrics are tracked? How is performance measured?"
                                ></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Recommendations for Content Improvement
                                </label>
                                <textarea
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                                  placeholder="List actionable recommendations for improving content strategy and quality."
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Collapsible Non-Digital/Offline Marketing Activities Form */}
                      <div className="bg-green-50 border border-green-200 rounded-lg mt-6">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
                          onClick={() => setShowNonDigitalForm((v) => !v)}
                        >
                          <span className="flex items-center">
                            <svg className="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8" stroke="currentColor" strokeWidth="2" /><path d="M7 20h10" stroke="currentColor" strokeWidth="2" /></svg>
                            <span className="text-lg font-semibold text-green-900">Non-Digital/Offline Marketing Activities</span>
                          </span>
                          <span className="text-green-700">{showNonDigitalForm ? "▲" : "▼"}</span>
                        </button>
                        {showNonDigitalForm && (
                          <div className="p-4 md:p-6 pt-0">
                            {nonDigitalActivities.map((activity, idx) => (
                              <div key={idx} className="space-y-4 relative">
                                {nonDigitalActivities.length > 1 && (
                                  <button
                                    type="button"
                                    className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                                    onClick={() => removeNonDigitalActivity(idx)}
                                    title="Remove activity"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                  </button>
                                )}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm"
                                    placeholder="e.g. Print Ads, Events, Billboards, Sponsorships"
                                    value={activity.activityType}
                                    onChange={e => handleNonDigitalChange(idx, 'activityType', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm"
                                    placeholder="Describe the non-digital marketing activity."
                                    value={activity.description}
                                    onChange={e => handleNonDigitalChange(idx, 'description', e.target.value)}
                                  ></textarea>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm"
                                    placeholder="Who is this activity aimed at?"
                                    value={activity.targetAudience}
                                    onChange={e => handleNonDigitalChange(idx, 'targetAudience', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm"
                                    placeholder="e.g. Monthly, Quarterly, Annually, One-off"
                                    value={activity.frequency}
                                    onChange={e => handleNonDigitalChange(idx, 'frequency', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Effectiveness Assessment</label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm"
                                    placeholder="How effective is this activity? Any measurable outcomes?"
                                    value={activity.effectiveness}
                                    onChange={e => handleNonDigitalChange(idx, 'effectiveness', e.target.value)}
                                  ></textarea>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm"
                                    placeholder="Any other relevant information."
                                    value={activity.notes}
                                    onChange={e => handleNonDigitalChange(idx, 'notes', e.target.value)}
                                  ></textarea>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end pt-4">
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow font-semibold transition"
                                onClick={addNonDigitalActivity}
                              >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                Add Activity
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Collapsible Other Activities for Organic Reach Form */}
                      <div className="bg-orange-50 border border-orange-200 rounded-lg mt-6">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
                          onClick={() => setShowOrganicForm((v) => !v)}
                        >
                          <span className="flex items-center">
                            <MegaphoneIcon className="h-6 w-6 text-orange-600 mr-2" />
                            <span className="text-lg font-semibold text-orange-900">Other Activities for Organic Reach</span>
                          </span>
                          <span className="text-orange-700">{showOrganicForm ? "▲" : "▼"}</span>
                        </button>
                        {showOrganicForm && (
                          <div className="p-4 md:p-6 pt-0">
                            {organicActivities.map((activity, idx) => (
                              <div key={idx} className="bg-white rounded-lg shadow-sm border border-orange-100 p-4 mt-4 relative">
                                {organicActivities.length > 1 && (
                                  <button
                                    type="button"
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                    onClick={() => removeOrganicActivity(idx)}
                                    title="Remove activity"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                  </button>
                                )}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
                                    placeholder="e.g. Community Building, SEO, Partnerships"
                                    value={activity.name}
                                    onChange={e => handleOrganicChange(idx, 'name', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
                                    placeholder="Describe the activity."
                                    value={activity.description}
                                    onChange={e => handleOrganicChange(idx, 'description', e.target.value)}
                                  ></textarea>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel/Platform</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
                                    placeholder="e.g. Facebook Groups, Forums, Events"
                                    value={activity.channel}
                                    onChange={e => handleOrganicChange(idx, 'channel', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
                                    placeholder="e.g. Weekly, Monthly, Ongoing"
                                    value={activity.frequency}
                                    onChange={e => handleOrganicChange(idx, 'frequency', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Effectiveness</label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
                                    placeholder="How effective is this activity? Any measurable outcomes?"
                                    value={activity.effectiveness}
                                    onChange={e => handleOrganicChange(idx, 'effectiveness', e.target.value)}
                                  ></textarea>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
                                    placeholder="Any other relevant information."
                                    value={activity.notes}
                                    onChange={e => handleOrganicChange(idx, 'notes', e.target.value)}
                                  ></textarea>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end pt-4">
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded shadow font-semibold transition"
                                onClick={addOrganicActivity}
                              >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                Add Activity
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Collapsible Campaigns Overview Form */}
                      <div className="bg-teal-50 border border-teal-200 rounded-lg mt-6">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
                          onClick={() => setShowCampaignForm((v) => !v)}
                        >
                          <span className="flex items-center">
                            <ChartBarIcon className="h-6 w-6 text-teal-600 mr-2" />
                            <span className="text-lg font-semibold text-teal-900">Campaigns Overview</span>
                          </span>
                          <span className="text-teal-700">{showCampaignForm ? "▲" : "▼"}</span>
                        </button>
                        {showCampaignForm && (
                          <div className="p-4 md:p-6 pt-0">
                            {campaigns.map((campaign, idx) => (
                              <div key={idx} className="bg-white rounded-lg shadow-sm border border-teal-100 p-4 mt-4 relative">
                                {campaigns.length > 1 && (
                                  <button
                                    type="button"
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                    onClick={() => removeCampaign(idx)}
                                    title="Remove campaign"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                  </button>
                                )}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                                    placeholder="e.g. Summer Sale, Brand Awareness Push"
                                    value={campaign.name}
                                    onChange={e => handleCampaignChange(idx, 'name', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Objective</label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                                    placeholder="What was the main goal of this campaign?"
                                    value={campaign.objective}
                                    onChange={e => handleCampaignChange(idx, 'objective', e.target.value)}
                                  ></textarea>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Channels Used</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                                    placeholder="e.g. Facebook, Email, Events"
                                    value={campaign.channels}
                                    onChange={e => handleCampaignChange(idx, 'channels', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                                    placeholder="e.g. June 1 - July 15, 2024"
                                    value={campaign.duration}
                                    onChange={e => handleCampaignChange(idx, 'duration', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                                    placeholder="e.g. $5,000"
                                    value={campaign.budget}
                                    onChange={e => handleCampaignChange(idx, 'budget', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Results</label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                                    placeholder="What were the main outcomes?"
                                    value={campaign.results}
                                    onChange={e => handleCampaignChange(idx, 'results', e.target.value)}
                                  ></textarea>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Lessons Learned</label>
                                  <textarea
                                    rows={2}
                                    className="w-full px-3 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                                    placeholder="What did you learn from this campaign?"
                                    value={campaign.lessons}
                                    onChange={e => handleCampaignChange(idx, 'lessons', e.target.value)}
                                  ></textarea>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end pt-4">
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded shadow font-semibold transition"
                                onClick={addCampaign}
                              >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                Add Campaign
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                
                // Show platform selection for other audit types
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
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Icon className="h-4 w-4 md:h-5 md:w-5 text-gray-600 mr-2" />
                                <span className="font-medium text-gray-900 text-sm">{platform.name}</span>
                              </div>
                              {isSelected && <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-green-600" />}
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

            {activeTab === 'seo' && selectedPlatforms.length > 0 && (
              <div className="mt-8">
                <AuditResultSummary />
              </div>
            )}
            {activeTab === 'social' && selectedPlatforms.length > 0 && (
              <div className="mt-8">
                <SocialAuditForm />
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