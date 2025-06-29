import React, { useState } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function ContentTab() {
  const [contentData, setContentData] = useState({
    totalContent: '',
    contentTypes: '',
    seoOptimized: '',
    contentQuality: '',
    engagementRate: '',
    contentGaps: '',
    contentCalendar: '',
    recommendations: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setContentData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2 text-teal-600" />
          Content Audit
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Content Pieces</label>
            <input
              type="number"
              value={contentData.totalContent}
              onChange={(e) => handleInputChange('totalContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Types</label>
              <input
                type="text"
                value={contentData.contentTypes}
                onChange={(e) => handleInputChange('contentTypes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Blog posts, Videos, Infographics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SEO Optimized Content (%)</label>
              <input
                type="number"
                step="0.01"
                value={contentData.seoOptimized}
                onChange={(e) => handleInputChange('seoOptimized', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Quality Score</label>
              <select
                value={contentData.contentQuality}
                onChange={(e) => handleInputChange('contentQuality', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select quality</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={contentData.engagementRate}
                onChange={(e) => handleInputChange('engagementRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Audit Recommendations</label>
            <textarea
              rows={4}
              value={contentData.recommendations}
              onChange={(e) => handleInputChange('recommendations', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Recommendations for improving content strategy..."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 