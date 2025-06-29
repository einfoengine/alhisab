import React, { useState } from 'react';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function WebsiteTab() {
  const [websiteData, setWebsiteData] = useState({
    websiteUrl: '',
    pageLoadTime: '',
    bounceRate: '',
    avgSessionDuration: '',
    pagesPerSession: '',
    conversionRate: '',
    mobileTraffic: '',
    desktopTraffic: '',
    topPages: '',
    exitPages: '',
    userExperience: '',
    recommendations: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setWebsiteData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ComputerDesktopIcon className="w-5 h-5 mr-2 text-indigo-600" />
          Website Performance Audit
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
            <input
              type="url"
              value={websiteData.websiteUrl}
              onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Load Time (seconds)</label>
              <input
                type="number"
                step="0.1"
                value={websiteData.pageLoadTime}
                onChange={(e) => handleInputChange('pageLoadTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bounce Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={websiteData.bounceRate}
                onChange={(e) => handleInputChange('bounceRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg Session Duration (seconds)</label>
              <input
                type="number"
                step="0.1"
                value={websiteData.avgSessionDuration}
                onChange={(e) => handleInputChange('avgSessionDuration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={websiteData.conversionRate}
                onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website Performance Recommendations</label>
            <textarea
              rows={4}
              value={websiteData.recommendations}
              onChange={(e) => handleInputChange('recommendations', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Recommendations for improving website performance..."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 