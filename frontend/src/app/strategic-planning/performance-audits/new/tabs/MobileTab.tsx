import React, { useState } from 'react';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function MobileTab() {
  const [mobileData, setMobileData] = useState({
    appName: '',
    platform: '',
    downloads: '',
    activeUsers: '',
    retentionRate: '',
    crashRate: '',
    appStoreRating: '',
    userReviews: '',
    performanceScore: '',
    recommendations: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setMobileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DevicePhoneMobileIcon className="w-5 h-5 mr-2 text-pink-600" />
          Mobile App Audit
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
            <input
              type="text"
              value={mobileData.appName}
              onChange={(e) => handleInputChange('appName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="App name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                value={mobileData.platform}
                onChange={(e) => handleInputChange('platform', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select platform</option>
                <option value="ios">iOS</option>
                <option value="android">Android</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Downloads</label>
              <input
                type="number"
                value={mobileData.downloads}
                onChange={(e) => handleInputChange('downloads', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Retention Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={mobileData.retentionRate}
                onChange={(e) => handleInputChange('retentionRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">App Store Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={mobileData.appStoreRating}
                onChange={(e) => handleInputChange('appStoreRating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.0-5.0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile App Recommendations</label>
            <textarea
              rows={4}
              value={mobileData.recommendations}
              onChange={(e) => handleInputChange('recommendations', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Recommendations for improving mobile app performance..."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 