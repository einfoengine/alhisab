import React, { useRef, useState } from 'react';
import { useAuditData } from '../AuditDataContext';

function TagInput({
  value,
  onChange,
  placeholder
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (input.trim()) {
        addTag(input);
        setInput('');
      }
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-wrap items-center border rounded-lg px-2 py-1 min-h-[42px] bg-white focus-within:ring-2 focus-within:ring-blue-500">
      {value.map((tag, idx) => (
        <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-1 flex items-center">
          {tag}
          <button type="button" className="ml-1 text-blue-500 hover:text-blue-700" onClick={() => removeTag(idx)}>&times;</button>
        </span>
      ))}
      <input
        ref={inputRef}
        className="flex-1 min-w-[120px] border-none outline-none py-1 px-2 text-sm bg-transparent"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
}

function TagSelect({
  value,
  onChange,
  options,
  placeholder
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  options: string[];
  placeholder?: string;
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed) && options.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (input.trim() && options.includes(input.trim())) {
        addTag(input);
        setInput('');
      }
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
    inputRef.current?.focus();
  };

  // Filter options to only those not already selected and matching input
  const filteredOptions = options.filter(opt => !value.includes(opt) && (!input || opt.toLowerCase().includes(input.toLowerCase())));

  return (
    <div className="flex flex-wrap items-center border rounded-lg px-2 py-1 min-h-[42px] bg-white focus-within:ring-2 focus-within:ring-blue-500">
      {value.map((tag, idx) => (
        <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-1 flex items-center">
          {tag}
          <button type="button" className="ml-1 text-blue-500 hover:text-blue-700" onClick={() => removeTag(idx)}>&times;</button>
        </span>
      ))}
      <input
        ref={inputRef}
        className="flex-1 min-w-[120px] border-none outline-none py-1 px-2 text-sm bg-transparent"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        list={`marketing-goal-options`}
      />
      {/* Show dropdown of filtered options */}
      {input && filteredOptions.length > 0 && (
        <div className="absolute bg-white border rounded shadow z-10 mt-10">
          {filteredOptions.map(opt => (
            <div
              key={opt}
              className="px-3 py-1 cursor-pointer hover:bg-blue-100 text-sm"
              onMouseDown={() => {
                addTag(opt);
                setInput('');
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
      <datalist id="marketing-goal-options">
        {options.map(opt => <option key={opt} value={opt} />)}
      </datalist>
    </div>
  );
}

export default function MediaBuyingTab() {
  const { auditData, setAuditData } = useAuditData();
  const data = (auditData['media_buying'] as Record<string, unknown>) || {};

  // Marketing Goals as an array
  const marketingGoals: string[] = Array.isArray(data.marketingGoals)
    ? (data.marketingGoals as string[])
    : data.marketingGoals
    ? [data.marketingGoals as string]
    : [];

  // Campaign Level Audit as an array
  type CampaignAudit = {
    campaignName?: string;
    objectiveSetCorrectly?: string;
    buyingType?: string;
    budgetAllocationCampaign?: string;
    optimizationStrategy?: string;
    performanceKPIs?: string;
    dateRange?: string;
    complianceCheck?: string;
    notesRecommendationsCampaign?: string;
    marketingGoalsSupported?: string[];
  };
  const campaignAudits: CampaignAudit[] = Array.isArray(data.campaignAudits)
    ? (data.campaignAudits as CampaignAudit[])
    : [{}];

  const handleInputChange = (field: string, value: unknown) => {
    setAuditData('media_buying', {
      ...data,
      [field]: value
    });
  };

  const handleCampaignChange = (idx: number, field: keyof CampaignAudit, value: string | string[]) => {
    const updated = [...campaignAudits];
    if (field === 'marketingGoalsSupported') {
      updated[idx] = { ...updated[idx], [field]: value as string[] };
    } else {
      updated[idx] = { ...updated[idx], [field]: value as string };
    }
    handleInputChange('campaignAudits', updated);
  };

  const addCampaign = () => {
    handleInputChange('campaignAudits', [...campaignAudits, {}]);
  };

  const removeCampaign = (idx: number) => {
    if (campaignAudits.length > 1) {
      const updated = campaignAudits.filter((_, i) => i !== idx);
      handleInputChange('campaignAudits', updated);
    }
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: OVERALL MARKETING GOALS */}
      <section>
        <h3 className="text-lg font-semibold mb-2">🏆 SECTION 1: OVERALL MARKETING GOALS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <label className="block font-medium mb-1">Marketing Goal(s)</label>
            <TagInput
              value={marketingGoals}
              onChange={tags => handleInputChange('marketingGoals', tags)}
              placeholder="Type a goal and press comma or Enter"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Notes & Gaps</label>
            <textarea className="w-full border rounded-lg px-3 py-2" value={(data.notesGaps as string) || ''} onChange={e => handleInputChange('notesGaps', e.target.value)} placeholder="Any observations, misalignment, or missing elements" />
          </div>
        </div>
      </section>

      {/* SECTION 2: CAMPAIGN LEVEL AUDIT (Multiple) */}
      <section>
        <h3 className="text-lg font-semibold mb-2 flex items-center">📂 SECTION 2: CAMPAIGN LEVEL AUDIT</h3>
        {campaignAudits.map((campaign, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 mb-6 relative">
            {campaignAudits.length > 1 && (
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs"
                onClick={() => removeCampaign(idx)}
                title="Remove this campaign"
              >
                Remove
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Campaign Name</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" value={campaign.campaignName || ''} onChange={e => handleCampaignChange(idx, 'campaignName', e.target.value)} />
              </div>
              <div>
                <label className="block font-medium mb-1">Marketing Goals Supported</label>
                <TagSelect
                  value={campaign.marketingGoalsSupported || []}
                  onChange={tags => handleCampaignChange(idx, 'marketingGoalsSupported', tags)}
                  options={marketingGoals}
                  placeholder="Select or type to filter goals"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Objective Set Correctly?</label>
                <select className="w-full border rounded-lg px-3 py-2" value={campaign.objectiveSetCorrectly || ''} onChange={e => handleCampaignChange(idx, 'objectiveSetCorrectly', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Awareness">Awareness</option>
                  <option value="Traffic">Traffic</option>
                  <option value="Conversions">Conversions</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Video Views">Video Views</option>
                  <option value="Lead Generation">Lead Generation</option>
                  <option value="Sales">Sales</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Buying Type</label>
                <select className="w-full border rounded-lg px-3 py-2" value={campaign.buyingType || ''} onChange={e => handleCampaignChange(idx, 'buyingType', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Auction">Auction</option>
                  <option value="Reach & Frequency">Reach & Frequency</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Budget Allocation</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" value={campaign.budgetAllocationCampaign || ''} onChange={e => handleCampaignChange(idx, 'budgetAllocationCampaign', e.target.value)} placeholder="Planned vs. Actual; justification of spend" />
              </div>
              <div>
                <label className="block font-medium mb-1">Optimization Strategy</label>
                <select className="w-full border rounded-lg px-3 py-2" value={campaign.optimizationStrategy || ''} onChange={e => handleCampaignChange(idx, 'optimizationStrategy', e.target.value)}>
                  <option value="">Select</option>
                  <option value="CBO">CBO (Campaign Budget Optimization)</option>
                  <option value="Manual">Manual</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Performance KPIs</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" value={campaign.performanceKPIs || ''} onChange={e => handleCampaignChange(idx, 'performanceKPIs', e.target.value)} placeholder="CPM, CTR, CPA, ROAS" />
              </div>
              <div>
                <label className="block font-medium mb-1">Date Range</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" value={campaign.dateRange || ''} onChange={e => handleCampaignChange(idx, 'dateRange', e.target.value)} />
              </div>
              <div>
                <label className="block font-medium mb-1">Compliance Check</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" value={campaign.complianceCheck || ''} onChange={e => handleCampaignChange(idx, 'complianceCheck', e.target.value)} placeholder="Any policy violations or rejected ads" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Notes & Recommendations</label>
                <textarea className="w-full border rounded-lg px-3 py-2" value={campaign.notesRecommendationsCampaign || ''} onChange={e => handleCampaignChange(idx, 'notesRecommendationsCampaign', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={addCampaign}
        >
          + Add Campaign
        </button>
      </section>

      {/* SECTION 3: AD SET LEVEL AUDIT */}
      <section>
        <h3 className="text-lg font-semibold mb-2">📁 SECTION 3: AD SET LEVEL AUDIT</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Ad Set Name</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.adSetName as string) || ''} onChange={e => handleInputChange('adSetName', e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Target Audience</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.targetAudience as string) || ''} onChange={e => handleInputChange('targetAudience', e.target.value)} placeholder="Demographics, interests, behaviors, lookalikes" />
          </div>
          <div>
            <label className="block font-medium mb-1">Audience Overlap?</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.audienceOverlap as string) || ''} onChange={e => handleInputChange('audienceOverlap', e.target.value)} placeholder="Any cannibalization or excessive overlap?" />
          </div>
          <div>
            <label className="block font-medium mb-1">Placements</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.placements as string) || ''} onChange={e => handleInputChange('placements', e.target.value)} placeholder="Automatic vs. Manual; where ads are shown" />
          </div>
          <div>
            <label className="block font-medium mb-1">Budget & Schedule</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.budgetSchedule as string) || ''} onChange={e => handleInputChange('budgetSchedule', e.target.value)} placeholder="Daily/Lifetime; pacing strategy" />
          </div>
          <div>
            <label className="block font-medium mb-1">Frequency</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.frequency as string) || ''} onChange={e => handleInputChange('frequency', e.target.value)} placeholder="Is ad fatigue occurring?" />
          </div>
          <div>
            <label className="block font-medium mb-1">Performance KPIs</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.performanceKPIsAdSet as string) || ''} onChange={e => handleInputChange('performanceKPIsAdSet', e.target.value)} placeholder="CPC, CTR, Conversion Rate" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Notes & Recommendations</label>
            <textarea className="w-full border rounded-lg px-3 py-2" value={(data.notesRecommendationsAdSet as string) || ''} onChange={e => handleInputChange('notesRecommendationsAdSet', e.target.value)} />
          </div>
        </div>
      </section>

      {/* SECTION 4: AD LEVEL AUDIT */}
      <section>
        <h3 className="text-lg font-semibold mb-2">🎨 SECTION 4: AD LEVEL AUDIT</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Ad Name / ID</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.adNameId as string) || ''} onChange={e => handleInputChange('adNameId', e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Creative Format</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.creativeFormat as string) || ''} onChange={e => handleInputChange('creativeFormat', e.target.value)} placeholder="Image / Video / Carousel / Collection" />
          </div>
          <div>
            <label className="block font-medium mb-1">Creative Relevance</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.creativeRelevance as string) || ''} onChange={e => handleInputChange('creativeRelevance', e.target.value)} placeholder="Aligned with message & audience?" />
          </div>
          <div>
            <label className="block font-medium mb-1">CTA Effectiveness</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.ctaEffectiveness as string) || ''} onChange={e => handleInputChange('ctaEffectiveness', e.target.value)} placeholder="Clear, compelling, action-oriented?" />
          </div>
          <div>
            <label className="block font-medium mb-1">Ad Copy Compliance</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.adCopyCompliance as string) || ''} onChange={e => handleInputChange('adCopyCompliance', e.target.value)} placeholder="Brand tone, spelling, legal claims" />
          </div>
          <div>
            <label className="block font-medium mb-1">Destination URL</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.destinationUrl as string) || ''} onChange={e => handleInputChange('destinationUrl', e.target.value)} placeholder="UTM tags added? Relevant landing page?" />
          </div>
          <div>
            <label className="block font-medium mb-1">Performance KPIs</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.performanceKPIsAd as string) || ''} onChange={e => handleInputChange('performanceKPIsAd', e.target.value)} placeholder="Engagement Rate, CTR, ROAS" />
          </div>
          <div>
            <label className="block font-medium mb-1">A/B Testing?</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.abTesting as string) || ''} onChange={e => handleInputChange('abTesting', e.target.value)} placeholder="Are creative variations tested?" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Notes & Recommendations</label>
            <textarea className="w-full border rounded-lg px-3 py-2" value={(data.notesRecommendationsAd as string) || ''} onChange={e => handleInputChange('notesRecommendationsAd', e.target.value)} />
          </div>
        </div>
      </section>

      {/* SECTION 5: TRACKING, ATTRIBUTION & COMPLIANCE */}
      <section>
        <h3 className="text-lg font-semibold mb-2">⚖️ SECTION 5: TRACKING, ATTRIBUTION & COMPLIANCE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Pixel/SDK Setup</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.pixelSdkSetup as string) || ''} onChange={e => handleInputChange('pixelSdkSetup', e.target.value)} placeholder="Pixel/Conversions API installed and firing correctly?" />
          </div>
          <div>
            <label className="block font-medium mb-1">Event Tracking</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.eventTracking as string) || ''} onChange={e => handleInputChange('eventTracking', e.target.value)} placeholder="ViewContent, AddToCart, Purchase, etc." />
          </div>
          <div>
            <label className="block font-medium mb-1">UTM Tracking</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.utmTracking as string) || ''} onChange={e => handleInputChange('utmTracking', e.target.value)} placeholder="Consistently applied across campaigns?" />
          </div>
          <div>
            <label className="block font-medium mb-1">Attribution Model</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.attributionModel as string) || ''} onChange={e => handleInputChange('attributionModel', e.target.value)} placeholder="Last Click / Data-Driven / Multi-Touch" />
          </div>
          <div>
            <label className="block font-medium mb-1">Ad Disapprovals</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.adDisapprovals as string) || ''} onChange={e => handleInputChange('adDisapprovals', e.target.value)} placeholder="Any issues? Were they resolved?" />
          </div>
          <div>
            <label className="block font-medium mb-1">Policy Violations</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.policyViolations as string) || ''} onChange={e => handleInputChange('policyViolations', e.target.value)} placeholder="Account restrictions, rejected content" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Notes & Recommendations</label>
            <textarea className="w-full border rounded-lg px-3 py-2" value={(data.notesRecommendationsTracking as string) || ''} onChange={e => handleInputChange('notesRecommendationsTracking', e.target.value)} />
          </div>
        </div>
      </section>

      {/* SECTION 6: MEDIA MIX & CHANNEL ANALYSIS */}
      <section>
        <h3 className="text-lg font-semibold mb-2">🔄 SECTION 6: MEDIA MIX & CHANNEL ANALYSIS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Channel Breakdown</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.channelBreakdown as string) || ''} onChange={e => handleInputChange('channelBreakdown', e.target.value)} placeholder="% Spend on FB, IG, YouTube, Search, Display, etc." />
          </div>
          <div>
            <label className="block font-medium mb-1">Budget Distribution</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.budgetDistribution as string) || ''} onChange={e => handleInputChange('budgetDistribution', e.target.value)} placeholder="Does distribution align with performance and goal?" />
          </div>
          <div>
            <label className="block font-medium mb-1">Performance by Channel</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.performanceByChannel as string) || ''} onChange={e => handleInputChange('performanceByChannel', e.target.value)} placeholder="Which platforms are driving best ROI?" />
          </div>
          <div>
            <label className="block font-medium mb-1">Opportunities to Reallocate</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.opportunitiesToReallocate as string) || ''} onChange={e => handleInputChange('opportunitiesToReallocate', e.target.value)} />
          </div>
        </div>
      </section>

      {/* SECTION 7: WASTE & EFFICIENCY */}
      <section>
        <h3 className="text-lg font-semibold mb-2">⚠️ SECTION 7: WASTE & EFFICIENCY</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Low Performing Segments</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.lowPerformingSegments as string) || ''} onChange={e => handleInputChange('lowPerformingSegments', e.target.value)} placeholder="Ad sets or audiences with poor ROAS" />
          </div>
          <div>
            <label className="block font-medium mb-1">High Frequency Issues</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.highFrequencyIssues as string) || ''} onChange={e => handleInputChange('highFrequencyIssues', e.target.value)} placeholder="Ad fatigue or oversaturation" />
          </div>
          <div>
            <label className="block font-medium mb-1">Underperforming Creatives</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.underperformingCreatives as string) || ''} onChange={e => handleInputChange('underperformingCreatives', e.target.value)} placeholder="Ads with low relevance or engagement" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Notes & Action Points</label>
            <textarea className="w-full border rounded-lg px-3 py-2" value={(data.notesActionPoints as string) || ''} onChange={e => handleInputChange('notesActionPoints', e.target.value)} />
          </div>
        </div>
      </section>

      {/* SECTION 8: SUMMARY & ACTION PLAN */}
      <section>
        <h3 className="text-lg font-semibold mb-2">📊 SECTION 8: SUMMARY & ACTION PLAN</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Key Strengths</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.keyStrengths as string) || ''} onChange={e => handleInputChange('keyStrengths', e.target.value)} placeholder="What's working well" />
          </div>
          <div>
            <label className="block font-medium mb-1">Key Weaknesses</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.keyWeaknesses as string) || ''} onChange={e => handleInputChange('keyWeaknesses', e.target.value)} placeholder="Major gaps or risks" />
          </div>
          <div>
            <label className="block font-medium mb-1">Top Priority Fixes</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.topPriorityFixes as string) || ''} onChange={e => handleInputChange('topPriorityFixes', e.target.value)} placeholder="High impact issues to resolve ASAP" />
          </div>
          <div>
            <label className="block font-medium mb-1">Quick Wins</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.quickWins as string) || ''} onChange={e => handleInputChange('quickWins', e.target.value)} placeholder="Easy improvements to implement" />
          </div>
          <div>
            <label className="block font-medium mb-1">Long-Term Opportunities</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.longTermOpportunities as string) || ''} onChange={e => handleInputChange('longTermOpportunities', e.target.value)} placeholder="Strategic insights for future campaigns" />
          </div>
          <div>
            <label className="block font-medium mb-1">Owner & Deadline</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.ownerDeadline as string) || ''} onChange={e => handleInputChange('ownerDeadline', e.target.value)} placeholder="Who is responsible? By when?" />
          </div>
        </div>
      </section>

      {/* Audit Conducted By, Date, Signature */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block font-medium mb-1">Audit Conducted By</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.auditConductedBy as string) || ''} onChange={e => handleInputChange('auditConductedBy', e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Date of Audit</label>
            <input type="date" className="w-full border rounded-lg px-3 py-2" value={(data.dateOfAudit as string) || ''} onChange={e => handleInputChange('dateOfAudit', e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Signature / Reviewer</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={(data.signatureReviewer as string) || ''} onChange={e => handleInputChange('signatureReviewer', e.target.value)} />
          </div>
        </div>
      </section>
    </div>
  );
} 