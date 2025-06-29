import React, { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function EmailTab() {
  const [emailData, setEmailData] = useState({
    emailProvider: '',
    subscriberCount: '',
    openRate: '',
    clickRate: '',
    bounceRate: '',
    unsubscribeRate: '',
    spamComplaints: '',
    deliverabilityScore: '',
    subjectLinePerformance: '',
    sendTimeOptimization: '',
    segmentationStrategy: '',
    automationWorkflows: '',
    aBTestingResults: '',
    mobileOptimization: '',
    templateDesign: '',
    callToActionEffectiveness: '',
    listQuality: '',
    complianceStatus: '',
    recommendations: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <EnvelopeIcon className="w-5 h-5 mr-2 text-orange-600" />
          Email Marketing Audit
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Service Provider</label>
            <input
              type="text"
              value={emailData.emailProvider}
              onChange={(e) => handleInputChange('emailProvider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Mailchimp, Constant Contact, SendGrid"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber Count</label>
              <input
                type="number"
                value={emailData.subscriberCount}
                onChange={(e) => handleInputChange('subscriberCount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Open Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={emailData.openRate}
                onChange={(e) => handleInputChange('openRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Click Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={emailData.clickRate}
                onChange={(e) => handleInputChange('clickRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bounce Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={emailData.bounceRate}
                onChange={(e) => handleInputChange('bounceRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Marketing Recommendations</label>
            <textarea
              rows={4}
              value={emailData.recommendations}
              onChange={(e) => handleInputChange('recommendations', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Recommendations for improving email marketing performance..."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 