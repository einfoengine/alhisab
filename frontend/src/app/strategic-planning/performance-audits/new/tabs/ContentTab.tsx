import React, { useState } from 'react';
import { DocumentTextIcon, ChartBarIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ContentTab() {
  const [contentData, setContentData] = useState({
    // Content Inventory
    totalContent: '',
    blogPosts: '',
    videos: '',
    infographics: '',
    whitepapers: '',
    caseStudies: '',
    socialMediaPosts: '',
    emailNewsletters: '',
    
    // Content Performance
    avgEngagementRate: '',
    avgTimeOnPage: '',
    bounceRate: '',
    conversionRate: '',
    socialShares: '',
    backlinks: '',
    
    // Content Quality
    seoOptimized: '',
    contentQuality: '',
    readabilityScore: '',
    contentFreshness: '',
    brandConsistency: '',
    targetAudienceAlignment: '',
    
    // Content Strategy
    contentCalendar: '',
    contentGaps: '',
    competitorContent: '',
    trendingTopics: '',
    contentRepurposing: '',
    
    // Recommendations
    immediateActions: '',
    shortTermGoals: '',
    longTermStrategy: '',
    resourceAllocation: '',
    technologyTools: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setContentData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Content Inventory Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
          Content Inventory Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Content Pieces</label>
            <input
              type="number"
              value={contentData.totalContent}
              onChange={(e) => handleInputChange('totalContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blog Posts</label>
            <input
              type="number"
              value={contentData.blogPosts}
              onChange={(e) => handleInputChange('blogPosts', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Videos</label>
            <input
              type="number"
              value={contentData.videos}
              onChange={(e) => handleInputChange('videos', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Infographics</label>
            <input
              type="number"
              value={contentData.infographics}
              onChange={(e) => handleInputChange('infographics', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Whitepapers</label>
            <input
              type="number"
              value={contentData.whitepapers}
              onChange={(e) => handleInputChange('whitepapers', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Case Studies</label>
            <input
              type="number"
              value={contentData.caseStudies}
              onChange={(e) => handleInputChange('caseStudies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Posts</label>
            <input
              type="number"
              value={contentData.socialMediaPosts}
              onChange={(e) => handleInputChange('socialMediaPosts', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Newsletters</label>
            <input
              type="number"
              value={contentData.emailNewsletters}
              onChange={(e) => handleInputChange('emailNewsletters', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Content Performance Metrics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="w-5 h-5 mr-2 text-green-600" />
          Content Performance Metrics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Engagement Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={contentData.avgEngagementRate}
              onChange={(e) => handleInputChange('avgEngagementRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Time on Page (min)</label>
            <input
              type="number"
              step="0.1"
              value={contentData.avgTimeOnPage}
              onChange={(e) => handleInputChange('avgTimeOnPage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bounce Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={contentData.bounceRate}
              onChange={(e) => handleInputChange('bounceRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={contentData.conversionRate}
              onChange={(e) => handleInputChange('conversionRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Shares</label>
            <input
              type="number"
              value={contentData.socialShares}
              onChange={(e) => handleInputChange('socialShares', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backlinks</label>
            <input
              type="number"
              value={contentData.backlinks}
              onChange={(e) => handleInputChange('backlinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Content Quality Assessment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircleIcon className="w-5 h-5 mr-2 text-purple-600" />
          Content Quality Assessment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEO Optimized Content (%)</label>
            <input
              type="number"
              step="0.01"
              value={contentData.seoOptimized}
              onChange={(e) => handleInputChange('seoOptimized', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Quality Score</label>
            <select
              value={contentData.contentQuality}
              onChange={(e) => handleInputChange('contentQuality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select quality</option>
              <option value="excellent">Excellent (90-100%)</option>
              <option value="good">Good (70-89%)</option>
              <option value="average">Average (50-69%)</option>
              <option value="poor">Poor (Below 50%)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Readability Score</label>
            <select
              value={contentData.readabilityScore}
              onChange={(e) => handleInputChange('readabilityScore', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select score</option>
              <option value="excellent">Excellent (Easy to read)</option>
              <option value="good">Good (Moderately easy)</option>
              <option value="average">Average (Somewhat difficult)</option>
              <option value="poor">Poor (Very difficult)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Freshness</label>
            <select
              value={contentData.contentFreshness}
              onChange={(e) => handleInputChange('contentFreshness', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select freshness</option>
              <option value="very_recent">Very Recent (Last 3 months)</option>
              <option value="recent">Recent (3-12 months)</option>
              <option value="moderate">Moderate (1-2 years)</option>
              <option value="outdated">Outdated (2+ years)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Consistency</label>
            <select
              value={contentData.brandConsistency}
              onChange={(e) => handleInputChange('brandConsistency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select consistency</option>
              <option value="excellent">Excellent (Highly consistent)</option>
              <option value="good">Good (Mostly consistent)</option>
              <option value="average">Average (Some inconsistencies)</option>
              <option value="poor">Poor (Inconsistent)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience Alignment</label>
            <select
              value={contentData.targetAudienceAlignment}
              onChange={(e) => handleInputChange('targetAudienceAlignment', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select alignment</option>
              <option value="excellent">Excellent (Perfect match)</option>
              <option value="good">Good (Strong match)</option>
              <option value="average">Average (Moderate match)</option>
              <option value="poor">Poor (Weak match)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Strategy Assessment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ClockIcon className="w-5 h-5 mr-2 text-orange-600" />
          Content Strategy Assessment
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Calendar Status</label>
            <select
              value={contentData.contentCalendar}
              onChange={(e) => handleInputChange('contentCalendar', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select status</option>
              <option value="well_planned">Well Planned (3+ months ahead)</option>
              <option value="moderate">Moderate (1-3 months ahead)</option>
              <option value="basic">Basic (Weekly planning)</option>
              <option value="reactive">Reactive (No planning)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Gaps Identified</label>
            <textarea
              rows={3}
              value={contentData.contentGaps}
              onChange={(e) => handleInputChange('contentGaps', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Describe content gaps in your current strategy..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Content Analysis</label>
              <textarea
                rows={3}
                value={contentData.competitorContent}
                onChange={(e) => handleInputChange('competitorContent', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Key insights from competitor content analysis..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trending Topics Coverage</label>
              <textarea
                rows={3}
                value={contentData.trendingTopics}
                onChange={(e) => handleInputChange('trendingTopics', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="How well you cover trending topics in your industry..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Repurposing Strategy</label>
            <select
              value={contentData.contentRepurposing}
              onChange={(e) => handleInputChange('contentRepurposing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select strategy</option>
              <option value="excellent">Excellent (Systematic repurposing)</option>
              <option value="good">Good (Regular repurposing)</option>
              <option value="basic">Basic (Occasional repurposing)</option>
              <option value="none">None (No repurposing)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-600" />
          Content Audit Recommendations
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Immediate Actions (Next 30 days)</label>
            <textarea
              rows={3}
              value={contentData.immediateActions}
              onChange={(e) => handleInputChange('immediateActions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Critical actions that need immediate attention..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short-term Goals (3-6 months)</label>
              <textarea
                rows={3}
                value={contentData.shortTermGoals}
                onChange={(e) => handleInputChange('shortTermGoals', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Short-term content strategy goals..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Long-term Strategy (6-12 months)</label>
              <textarea
                rows={3}
                value={contentData.longTermStrategy}
                onChange={(e) => handleInputChange('longTermStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Long-term content strategy vision..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Allocation</label>
              <textarea
                rows={3}
                value={contentData.resourceAllocation}
                onChange={(e) => handleInputChange('resourceAllocation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Recommended resource allocation for content..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technology & Tools</label>
              <textarea
                rows={3}
                value={contentData.technologyTools}
                onChange={(e) => handleInputChange('technologyTools', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Recommended tools and technology for content management..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 