import React, { useState } from 'react';
import { TagIcon } from '@heroicons/react/24/outline';

export default function MediaBuyingTab() {
  const [mediaData, setMediaData] = useState({
    // Platform Overview
    primaryPlatform: '',
    secondaryPlatforms: '',
    accountStructure: '',
    totalCampaigns: '',
    activeCampaigns: '',
    pausedCampaigns: '',
    accountAge: '',
    
    // Campaign Performance
    totalSpend: '',
    totalImpressions: '',
    totalClicks: '',
    totalConversions: '',
    avgCTR: '',
    avgCPC: '',
    avgCPM: '',
    avgConversionRate: '',
    avgCostPerConversion: '',
    totalRevenue: '',
    roas: '',
    
    // Budget & ROI
    monthlyBudget: '',
    budgetUtilization: '',
    budgetAllocation: '',
    costPerLead: '',
    costPerAcquisition: '',
    lifetimeValue: '',
    profitMargin: '',
    
    // Audience Targeting
    targetingTypes: '',
    audienceSegments: '',
    geographicTargeting: '',
    demographicTargeting: '',
    interestTargeting: '',
    customAudiences: '',
    lookalikeAudiences: '',
    remarketingLists: '',
    
    // Ad Creative
    adFormats: '',
    creativeAssets: '',
    adCopyPerformance: '',
    imagePerformance: '',
    videoPerformance: '',
    carouselPerformance: '',
    creativeTesting: '',
    
    // Bidding & Optimization
    biddingStrategies: '',
    bidAdjustments: '',
    automatedBidding: '',
    manualBidding: '',
    bidOptimization: '',
    qualityScore: '',
    adRank: '',
    
    // Landing Pages
    landingPagePerformance: '',
    pageLoadSpeed: '',
    mobileOptimization: '',
    conversionFunnel: '',
    aBTesting: '',
    
    // Conversion Tracking
    trackingSetup: '',
    conversionActions: '',
    attributionModel: '',
    crossDeviceTracking: '',
    offlineConversions: '',
    
    // Competitive Analysis
    competitorAnalysis: '',
    marketShare: '',
    competitivePositioning: '',
    keywordGaps: '',
    adCopyAnalysis: '',
    
    // Recommendations
    priorityActions: '',
    optimizationStrategy: '',
    budgetRecommendations: '',
    creativeRecommendations: '',
    targetingRecommendations: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setMediaData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TagIcon className="w-5 h-5 mr-2 text-red-600" />
          PPC & Media Buying Audit
        </h3>
        
        {/* Platform Overview */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Platform Overview</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Platform</label>
              <select value={mediaData.primaryPlatform} onChange={e => handleInputChange('primaryPlatform', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select platform</option>
                <option value="google-ads">Google Ads</option>
                <option value="facebook-ads">Facebook Ads</option>
                <option value="linkedin-ads">LinkedIn Ads</option>
                <option value="tiktok-ads">TikTok Ads</option>
                <option value="twitter-ads">Twitter Ads</option>
                <option value="instagram-ads">Instagram Ads</option>
                <option value="bing-ads">Bing Ads</option>
                <option value="amazon-ads">Amazon Ads</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Platforms</label>
              <input type="text" value={mediaData.secondaryPlatforms} onChange={e => handleInputChange('secondaryPlatforms', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Facebook, LinkedIn, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns</label>
              <input type="number" value={mediaData.totalCampaigns} onChange={e => handleInputChange('totalCampaigns', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Campaigns</label>
              <input type="number" value={mediaData.activeCampaigns} onChange={e => handleInputChange('activeCampaigns', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paused Campaigns</label>
              <input type="number" value={mediaData.pausedCampaigns} onChange={e => handleInputChange('pausedCampaigns', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Age (months)</label>
              <input type="number" value={mediaData.accountAge} onChange={e => handleInputChange('accountAge', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Structure</label>
              <input type="text" value={mediaData.accountStructure} onChange={e => handleInputChange('accountStructure', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Single account, MCC, etc." />
            </div>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Campaign Performance (Last 30 Days)</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Spend ($)</label>
              <input type="number" step="0.01" value={mediaData.totalSpend} onChange={e => handleInputChange('totalSpend', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Impressions</label>
              <input type="number" value={mediaData.totalImpressions} onChange={e => handleInputChange('totalImpressions', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Clicks</label>
              <input type="number" value={mediaData.totalClicks} onChange={e => handleInputChange('totalClicks', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Conversions</label>
              <input type="number" value={mediaData.totalConversions} onChange={e => handleInputChange('totalConversions', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Revenue ($)</label>
              <input type="number" step="0.01" value={mediaData.totalRevenue} onChange={e => handleInputChange('totalRevenue', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ROAS</label>
              <input type="number" step="0.01" value={mediaData.roas} onChange={e => handleInputChange('roas', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. CTR (%)</label>
              <input type="number" step="0.01" value={mediaData.avgCTR} onChange={e => handleInputChange('avgCTR', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. CPC ($)</label>
              <input type="number" step="0.01" value={mediaData.avgCPC} onChange={e => handleInputChange('avgCPC', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. CPM ($)</label>
              <input type="number" step="0.01" value={mediaData.avgCPM} onChange={e => handleInputChange('avgCPM', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Conversion Rate (%)</label>
              <input type="number" step="0.01" value={mediaData.avgConversionRate} onChange={e => handleInputChange('avgConversionRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Cost Per Conversion ($)</label>
              <input type="number" step="0.01" value={mediaData.avgCostPerConversion} onChange={e => handleInputChange('avgCostPerConversion', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profit Margin (%)</label>
              <input type="number" step="0.01" value={mediaData.profitMargin} onChange={e => handleInputChange('profitMargin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
        </div>

        {/* Budget & ROI */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Budget & ROI Analysis</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Budget ($)</label>
              <input type="number" step="0.01" value={mediaData.monthlyBudget} onChange={e => handleInputChange('monthlyBudget', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Utilization (%)</label>
              <input type="number" step="0.01" value={mediaData.budgetUtilization} onChange={e => handleInputChange('budgetUtilization', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cost Per Lead ($)</label>
              <input type="number" step="0.01" value={mediaData.costPerLead} onChange={e => handleInputChange('costPerLead', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cost Per Acquisition ($)</label>
              <input type="number" step="0.01" value={mediaData.costPerAcquisition} onChange={e => handleInputChange('costPerAcquisition', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Lifetime Value ($)</label>
              <input type="number" step="0.01" value={mediaData.lifetimeValue} onChange={e => handleInputChange('lifetimeValue', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget Allocation Strategy</label>
            <textarea rows={2} value={mediaData.budgetAllocation} onChange={e => handleInputChange('budgetAllocation', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="How budget is allocated across campaigns, platforms, etc." />
          </div>
        </div>

        {/* Audience Targeting */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Audience Targeting</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Targeting Types Used</label>
              <input type="text" value={mediaData.targetingTypes} onChange={e => handleInputChange('targetingTypes', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Demographic, interest, behavioral, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Segments</label>
              <input type="text" value={mediaData.audienceSegments} onChange={e => handleInputChange('audienceSegments', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="High-value, mid-funnel, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Geographic Targeting</label>
              <input type="text" value={mediaData.geographicTargeting} onChange={e => handleInputChange('geographicTargeting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Countries, cities, radius targeting..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Demographic Targeting</label>
              <input type="text" value={mediaData.demographicTargeting} onChange={e => handleInputChange('demographicTargeting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Age, gender, income, education..." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Targeting</label>
              <input type="text" value={mediaData.interestTargeting} onChange={e => handleInputChange('interestTargeting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Interests, hobbies, activities..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Audiences</label>
              <input type="text" value={mediaData.customAudiences} onChange={e => handleInputChange('customAudiences', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Email lists, website visitors, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lookalike Audiences</label>
              <input type="text" value={mediaData.lookalikeAudiences} onChange={e => handleInputChange('lookalikeAudiences', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="1%, 5%, 10% lookalikes..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remarketing Lists</label>
              <input type="text" value={mediaData.remarketingLists} onChange={e => handleInputChange('remarketingLists', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Cart abandoners, page visitors, etc." />
            </div>
          </div>
        </div>

        {/* Ad Creative */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Ad Creative Performance</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ad Formats Used</label>
              <input type="text" value={mediaData.adFormats} onChange={e => handleInputChange('adFormats', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Text, image, video, carousel, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Creative Assets</label>
              <input type="text" value={mediaData.creativeAssets} onChange={e => handleInputChange('creativeAssets', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Number and types of assets" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ad Copy Performance</label>
              <textarea rows={2} value={mediaData.adCopyPerformance} onChange={e => handleInputChange('adCopyPerformance', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Best/worst performing ad copy, messaging..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image Performance</label>
              <textarea rows={2} value={mediaData.imagePerformance} onChange={e => handleInputChange('imagePerformance', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Best/worst performing images, styles..." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Performance</label>
              <textarea rows={2} value={mediaData.videoPerformance} onChange={e => handleInputChange('videoPerformance', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Video completion rates, engagement..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Creative Testing</label>
              <textarea rows={2} value={mediaData.creativeTesting} onChange={e => handleInputChange('creativeTesting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="A/B tests, multivariate tests..." />
            </div>
          </div>
        </div>

        {/* Bidding & Optimization */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Bidding & Optimization</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bidding Strategies</label>
              <input type="text" value={mediaData.biddingStrategies} onChange={e => handleInputChange('biddingStrategies', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Manual, automated, target CPA, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Automated Bidding</label>
              <select value={mediaData.automatedBidding} onChange={e => handleInputChange('automatedBidding', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="target-cpa">Target CPA</option>
                <option value="target-roas">Target ROAS</option>
                <option value="maximize-clicks">Maximize Clicks</option>
                <option value="maximize-conversions">Maximize Conversions</option>
                <option value="enhanced-cpc">Enhanced CPC</option>
                <option value="none">None (Manual)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bid Adjustments</label>
              <input type="text" value={mediaData.bidAdjustments} onChange={e => handleInputChange('bidAdjustments', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Device, location, time, audience..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bid Optimization</label>
              <textarea rows={2} value={mediaData.bidOptimization} onChange={e => handleInputChange('bidOptimization', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Bid optimization strategies, performance..." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quality Score (Avg)</label>
              <input type="number" min="1" max="10" value={mediaData.qualityScore} onChange={e => handleInputChange('qualityScore', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="1-10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ad Rank (Avg)</label>
              <input type="number" step="0.1" value={mediaData.adRank} onChange={e => handleInputChange('adRank', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
            </div>
          </div>
        </div>

        {/* Landing Pages */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Landing Pages</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Landing Page Performance</label>
              <textarea rows={2} value={mediaData.landingPagePerformance} onChange={e => handleInputChange('landingPagePerformance', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Conversion rates, bounce rates, best/worst pages..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Load Speed</label>
              <input type="text" value={mediaData.pageLoadSpeed} onChange={e => handleInputChange('pageLoadSpeed', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Fast, moderate, slow, or specific times" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Optimization</label>
              <select value={mediaData.mobileOptimization} onChange={e => handleInputChange('mobileOptimization', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="fully-optimized">Fully Optimized</option>
                <option value="partially-optimized">Partially Optimized</option>
                <option value="not-optimized">Not Optimized</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">A/B Testing</label>
              <input type="text" value={mediaData.aBTesting} onChange={e => handleInputChange('aBTesting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Landing page tests, results..." />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Funnel Analysis</label>
            <textarea rows={2} value={mediaData.conversionFunnel} onChange={e => handleInputChange('conversionFunnel', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Funnel drop-offs, optimization opportunities..." />
          </div>
        </div>

        {/* Conversion Tracking */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Conversion Tracking</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Setup</label>
              <select value={mediaData.trackingSetup} onChange={e => handleInputChange('trackingSetup', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="fully-implemented">Fully Implemented</option>
                <option value="partially-implemented">Partially Implemented</option>
                <option value="not-implemented">Not Implemented</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Actions</label>
              <input type="text" value={mediaData.conversionActions} onChange={e => handleInputChange('conversionActions', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Purchase, lead, signup, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attribution Model</label>
              <select value={mediaData.attributionModel} onChange={e => handleInputChange('attributionModel', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="last-click">Last Click</option>
                <option value="first-click">First Click</option>
                <option value="linear">Linear</option>
                <option value="time-decay">Time Decay</option>
                <option value="position-based">Position Based</option>
                <option value="data-driven">Data Driven</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cross Device Tracking</label>
              <select value={mediaData.crossDeviceTracking} onChange={e => handleInputChange('crossDeviceTracking', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="enabled">Enabled</option>
                <option value="partial">Partially Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Offline Conversions</label>
            <input type="text" value={mediaData.offlineConversions} onChange={e => handleInputChange('offlineConversions', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Phone calls, store visits, etc." />
          </div>
        </div>

        {/* Competitive Analysis */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Competitive Analysis</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Analysis</label>
              <textarea rows={2} value={mediaData.competitorAnalysis} onChange={e => handleInputChange('competitorAnalysis', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Main competitors, their strategies, strengths/weaknesses..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Market Share (%)</label>
              <input type="number" step="0.01" value={mediaData.marketShare} onChange={e => handleInputChange('marketShare', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Competitive Positioning</label>
              <textarea rows={2} value={mediaData.competitivePositioning} onChange={e => handleInputChange('competitivePositioning', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Position in market, unique selling points..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keyword Gaps</label>
              <textarea rows={2} value={mediaData.keywordGaps} onChange={e => handleInputChange('keywordGaps', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Keywords competitors are targeting that we're not..." />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ad Copy Analysis</label>
            <textarea rows={2} value={mediaData.adCopyAnalysis} onChange={e => handleInputChange('adCopyAnalysis', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Competitor ad copy, messaging strategies..." />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h5 className="text-md font-semibold text-gray-800 mb-4">Recommendations & Notes</h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority Actions</label>
              <textarea rows={3} value={mediaData.priorityActions} onChange={e => handleInputChange('priorityActions', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="High-priority fixes, quick wins, immediate actions..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Optimization Strategy</label>
              <textarea rows={3} value={mediaData.optimizationStrategy} onChange={e => handleInputChange('optimizationStrategy', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Long-term optimization strategy, testing roadmap..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Recommendations</label>
              <textarea rows={2} value={mediaData.budgetRecommendations} onChange={e => handleInputChange('budgetRecommendations', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Budget reallocation, scaling opportunities..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Creative Recommendations</label>
              <textarea rows={2} value={mediaData.creativeRecommendations} onChange={e => handleInputChange('creativeRecommendations', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Creative improvements, testing suggestions..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Targeting Recommendations</label>
              <textarea rows={2} value={mediaData.targetingRecommendations} onChange={e => handleInputChange('targetingRecommendations', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Audience expansion, new targeting opportunities..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea rows={2} value={mediaData.notes} onChange={e => handleInputChange('notes', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Other observations, context, special considerations..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 