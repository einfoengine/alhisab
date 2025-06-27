import React, { useState } from 'react';

const PLATFORMS = [
  { id: 'google_ads', name: 'Google Ads' },
  { id: 'facebook_ads', name: 'Facebook Ads' },
  { id: 'linkedin_ads', name: 'LinkedIn Ads' },
  { id: 'bing_ads', name: 'Microsoft Advertising' },
];

const initialPlatformState = {
  accountStructure: '',
  campaignsOverview: '',
  keywordsAudiences: '',
  adCopyCreatives: '',
  conversionTracking: '',
  budgetSpend: '',
  ctr: '',
  cpc: '',
  cpa: '',
  roas: '',
  issues: '',
  recommendations: '',
};

interface PPCAuditFormProps {
  selectedPlatforms: string[];
}

const PPCAuditForm: React.FC<PPCAuditFormProps> = ({ selectedPlatforms }) => {
  const [platformData, setPlatformData] = useState<Record<string, typeof initialPlatformState>>({});

  const handleFieldChange = (platformId: string, field: string, value: string) => {
    setPlatformData((prev) => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        [field]: value,
      },
    }));
  };

  if (!selectedPlatforms || selectedPlatforms.length === 0) return null;

  return (
    <form className="space-y-8">
      <section className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-red-800 mb-4 text-lg">PPC Audit Platforms</h4>
        {selectedPlatforms.map((platformId) => {
          const platform = PLATFORMS.find((p) => p.id === platformId);
          const data = platformData[platformId] || initialPlatformState;
          return (
            <div key={platformId} className="bg-white border border-red-100 rounded-lg p-4 mb-6 mt-6">
              <h5 className="font-semibold text-red-700 mb-3 text-base">{platform?.name} Audit</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Structure</label>
                  <textarea value={data.accountStructure} onChange={e => handleFieldChange(platformId, 'accountStructure', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" placeholder="Describe account structure, campaigns, ad groups, etc." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaigns Overview</label>
                  <textarea value={data.campaignsOverview} onChange={e => handleFieldChange(platformId, 'campaignsOverview', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" placeholder="Summarize active/inactive campaigns, objectives, etc." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keywords / Audiences</label>
                  <textarea value={data.keywordsAudiences} onChange={e => handleFieldChange(platformId, 'keywordsAudiences', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" placeholder="List top keywords, negative keywords, audiences, etc." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ad Copy / Creatives</label>
                  <textarea value={data.adCopyCreatives} onChange={e => handleFieldChange(platformId, 'adCopyCreatives', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" placeholder="Describe ad copy, creative strategy, A/B tests, etc." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conversion Tracking</label>
                  <textarea value={data.conversionTracking} onChange={e => handleFieldChange(platformId, 'conversionTracking', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" placeholder="Describe tracking setup, issues, attribution, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget & Spend</label>
                  <input type="text" value={data.budgetSpend} onChange={e => handleFieldChange(platformId, 'budgetSpend', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" placeholder="e.g. $5,000/mo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTR (%)</label>
                  <input type="number" step="0.01" value={data.ctr} onChange={e => handleFieldChange(platformId, 'ctr', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPC ($)</label>
                  <input type="number" step="0.01" value={data.cpc} onChange={e => handleFieldChange(platformId, 'cpc', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPA ($)</label>
                  <input type="number" step="0.01" value={data.cpa} onChange={e => handleFieldChange(platformId, 'cpa', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ROAS</label>
                  <input type="number" step="0.01" value={data.roas} onChange={e => handleFieldChange(platformId, 'roas', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Issues</label>
                  <textarea value={data.issues} onChange={e => handleFieldChange(platformId, 'issues', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" placeholder="List any major issues, blockers, or risks" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations</label>
                  <textarea value={data.recommendations} onChange={e => handleFieldChange(platformId, 'recommendations', e.target.value)} className="w-full px-3 py-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm" placeholder="List actionable recommendations for this platform" />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </form>
  );
};

export default PPCAuditForm; 