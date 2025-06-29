import React, { useState } from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function CampaignsTab() {
  const [campaignData, setCampaignData] = useState({
    campaignName: '',
    campaignType: '',
    budget: '',
    impressions: '',
    clicks: '',
    conversions: '',
    roas: '',
    ctr: '',
    cpc: '',
    targetAudience: '',
    campaignDuration: '',
    recommendations: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="w-5 h-5 mr-2 text-teal-600" />
          Campaigns Audit
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
            <input
              type="text"
              value={campaignData.campaignName}
              onChange={(e) => handleInputChange('campaignName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Campaign name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
              <select
                value={campaignData.campaignType}
                onChange={(e) => handleInputChange('campaignType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select type</option>
                <option value="awareness">Awareness</option>
                <option value="consideration">Consideration</option>
                <option value="conversion">Conversion</option>
                <option value="retargeting">Retargeting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($)</label>
              <input
                type="number"
                step="0.01"
                value={campaignData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ROAS</label>
              <input
                type="number"
                step="0.01"
                value={campaignData.roas}
                onChange={(e) => handleInputChange('roas', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTR (%)</label>
              <input
                type="number"
                step="0.01"
                value={campaignData.ctr}
                onChange={(e) => handleInputChange('ctr', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Recommendations</label>
            <textarea
              rows={4}
              value={campaignData.recommendations}
              onChange={(e) => handleInputChange('recommendations', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Recommendations for improving campaign performance..."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 