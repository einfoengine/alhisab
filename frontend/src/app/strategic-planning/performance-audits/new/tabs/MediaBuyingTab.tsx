import React, { useState } from 'react';
import { TagIcon } from '@heroicons/react/24/outline';

export default function MediaBuyingTab() {
  const [mediaData, setMediaData] = useState({
    platform: '',
    totalSpend: '',
    impressions: '',
    clicks: '',
    ctr: '',
    cpc: '',
    cpm: '',
    conversions: '',
    conversionRate: '',
    roas: '',
    audienceTargeting: '',
    adCreativePerformance: '',
    biddingStrategy: '',
    budgetAllocation: '',
    recommendations: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setMediaData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TagIcon className="w-5 h-5 mr-2 text-red-600" />
          Media Buying Audit
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Advertising Platform</label>
            <input
              type="text"
              value={mediaData.platform}
              onChange={(e) => handleInputChange('platform', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Google Ads, Facebook Ads, LinkedIn Ads"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Spend ($)</label>
              <input
                type="number"
                step="0.01"
                value={mediaData.totalSpend}
                onChange={(e) => handleInputChange('totalSpend', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Impressions</label>
              <input
                type="number"
                value={mediaData.impressions}
                onChange={(e) => handleInputChange('impressions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTR (%)</label>
              <input
                type="number"
                step="0.01"
                value={mediaData.ctr}
                onChange={(e) => handleInputChange('ctr', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CPC ($)</label>
              <input
                type="number"
                step="0.01"
                value={mediaData.cpc}
                onChange={(e) => handleInputChange('cpc', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Media Buying Recommendations</label>
            <textarea
              rows={4}
              value={mediaData.recommendations}
              onChange={(e) => handleInputChange('recommendations', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Recommendations for improving media buying performance..."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 