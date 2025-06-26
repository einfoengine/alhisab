import React, { useState } from 'react';

const PLATFORMS = [
  { id: 'mailchimp', name: 'Mailchimp' },
  { id: 'constant_contact', name: 'Constant Contact' },
  { id: 'sendgrid', name: 'SendGrid' },
  { id: 'klaviyo', name: 'Klaviyo' },
];

const initialPlatformState = {
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
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [platformData, setPlatformData] = useState<Record<string, typeof initialPlatformState>>({});

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
    setPlatformData((prev) =>
      prev[platformId]
        ? prev
        : { ...prev, [platformId]: { ...initialPlatformState } }
    );
  };

  const handleFieldChange = (platformId: string, field: string, value: string) => {
    setPlatformData((prev) => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        [field]: value,
      },
    }));
  };

  return (
    <form className="space-y-8">
      <section className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-orange-800 mb-4 text-lg">Email Marketing Audit</h4>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Platforms</label>
          <div className="flex flex-wrap gap-4">
            {PLATFORMS.map((platform) => (
              <label key={platform.id} className="flex items-center gap-2 text-sm bg-orange-100 px-2 py-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform.id)}
                  onChange={() => handlePlatformToggle(platform.id)}
                />
                {platform.name}
              </label>
            ))}
          </div>
        </div>
        {selectedPlatforms.length === 0 && (
          <div className="text-orange-700 text-sm">Please select at least one platform to audit.</div>
        )}
        {selectedPlatforms.map((platformId) => {
          const platform = PLATFORMS.find((p) => p.id === platformId);
          const data = platformData[platformId] || initialPlatformState;
          return (
            <div key={platformId} className="bg-white border border-orange-100 rounded-lg p-4 mb-6 mt-6">
              <h5 className="font-semibold text-orange-700 mb-3 text-base">{platform?.name} Audit</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Subscribers</label>
                  <input type="number" value={data.totalSubscribers} onChange={e => handleFieldChange(platformId, 'totalSubscribers', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bounce Rate (%)</label>
                  <input type="number" step="0.01" value={data.bounceRate} onChange={e => handleFieldChange(platformId, 'bounceRate', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unsubscribe Rate (%)</label>
                  <input type="number" step="0.01" value={data.unsubscribeRate} onChange={e => handleFieldChange(platformId, 'unsubscribeRate', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Open Rate (%)</label>
                  <input type="number" step="0.01" value={data.openRate} onChange={e => handleFieldChange(platformId, 'openRate', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spam Complaints</label>
                  <input type="number" value={data.spamComplaints} onChange={e => handleFieldChange(platformId, 'spamComplaints', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sender Reputation</label>
                  <input type="text" value={data.senderReputation} onChange={e => handleFieldChange(platformId, 'senderReputation', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="e.g. Good, Fair, Poor" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Click-Through Rate (CTR) (%)</label>
                  <input type="number" step="0.01" value={data.ctr} onChange={e => handleFieldChange(platformId, 'ctr', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conversions</label>
                  <input type="number" value={data.conversions} onChange={e => handleFieldChange(platformId, 'conversions', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Best Campaign</label>
                  <input type="text" value={data.bestCampaign} onChange={e => handleFieldChange(platformId, 'bestCampaign', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="Name or link" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Worst Campaign</label>
                  <input type="text" value={data.worstCampaign} onChange={e => handleFieldChange(platformId, 'worstCampaign', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="Name or link" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Segments Used</label>
                  <input type="text" value={data.segments} onChange={e => handleFieldChange(platformId, 'segments', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="List segments" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dynamic Content/Personalization</label>
                  <input type="text" value={data.dynamicContent} onChange={e => handleFieldChange(platformId, 'dynamicContent', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="e.g. First name, product recommendations" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Automation (Workflows, Triggers)</label>
                  <textarea value={data.automation} onChange={e => handleFieldChange(platformId, 'automation', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="Describe automations, performance, etc." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Compliance (GDPR, CAN-SPAM, Opt-in)</label>
                  <textarea value={data.compliance} onChange={e => handleFieldChange(platformId, 'compliance', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="Describe compliance status, issues, etc." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations</label>
                  <textarea value={data.recommendations} onChange={e => handleFieldChange(platformId, 'recommendations', e.target.value)} className="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm" placeholder="List actionable recommendations for email marketing" />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </form>
  );
};

export default EmailAuditForm; 