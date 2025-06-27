import React, { useState } from 'react';

const initialState = {
  totalSubscribers: '',
  bounceRate: '',
  unsubscribeRate: '',
  openRate: '',
  spamComplaints: '',
  senderReputation: '',
  ctr: '',
  conversions: '',
  bestCampaign: '',
  worstCampaign: '',
  segments: '',
  dynamicContent: '',
  automation: '',
  compliance: '',
  recommendations: '',
};

const EmailAuditForm: React.FC = () => {
  const [formData, setFormData] = useState(initialState);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form className="space-y-8">
      <div className="bg-white border border-orange-100 rounded-lg p-4 mb-6 mt-6">
        <h5 className="font-semibold text-orange-700 mb-3 text-base">Email Marketing Audit</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Subscribers</label>
            <input type="number" value={formData.totalSubscribers} onChange={e => handleFieldChange('totalSubscribers', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bounce Rate (%)</label>
            <input type="number" step="0.01" value={formData.bounceRate} onChange={e => handleFieldChange('bounceRate', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unsubscribe Rate (%)</label>
            <input type="number" step="0.01" value={formData.unsubscribeRate} onChange={e => handleFieldChange('unsubscribeRate', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Open Rate (%)</label>
            <input type="number" step="0.01" value={formData.openRate} onChange={e => handleFieldChange('openRate', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Spam Complaints</label>
            <input type="number" value={formData.spamComplaints} onChange={e => handleFieldChange('spamComplaints', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sender Reputation</label>
            <input type="text" value={formData.senderReputation} onChange={e => handleFieldChange('senderReputation', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="e.g. Good, Fair, Poor" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Click-Through Rate (CTR) (%)</label>
            <input type="number" step="0.01" value={formData.ctr} onChange={e => handleFieldChange('ctr', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conversions</label>
            <input type="number" value={formData.conversions} onChange={e => handleFieldChange('conversions', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Best Campaign</label>
            <input type="text" value={formData.bestCampaign} onChange={e => handleFieldChange('bestCampaign', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="Name or link" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Worst Campaign</label>
            <input type="text" value={formData.worstCampaign} onChange={e => handleFieldChange('worstCampaign', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="Name or link" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Segments Used</label>
            <input type="text" value={formData.segments} onChange={e => handleFieldChange('segments', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="List segments" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dynamic Content/Personalization</label>
            <input type="text" value={formData.dynamicContent} onChange={e => handleFieldChange('dynamicContent', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="e.g. First name, product recommendations" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Automation (Workflows, Triggers)</label>
            <textarea value={formData.automation} onChange={e => handleFieldChange('automation', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="Describe automations, performance, etc." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Compliance (GDPR, CAN-SPAM, Opt-in)</label>
            <textarea value={formData.compliance} onChange={e => handleFieldChange('compliance', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="Describe compliance status, issues, etc." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations</label>
            <textarea value={formData.recommendations} onChange={e => handleFieldChange('recommendations', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="List actionable recommendations for email marketing" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmailAuditForm; 