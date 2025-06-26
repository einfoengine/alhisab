import React, { useState } from 'react';

const initialState = {
  // Social Profiles Overview
  platform: '',
  followers: '',
  engagementRate: '',
  postingFrequency: '',
  // Content Performance
  topPosts: '',
  avgReach: '',
  engagementByType: '',
  // Audience Insights
  demographics: '',
  growthTrends: '',
  // Competitor Benchmarking
  competitorProfiles: '',
  competitorComparison: '',
  // Paid Campaigns
  recentCampaigns: '',
  campaignSpend: '',
  campaignResults: '',
  // Issues & Recommendations
  challenges: '',
  improvementSuggestions: '',
};

const SocialAuditForm = () => {
  const [form, setForm] = useState(initialState);
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <form className="space-y-8">
      {/* Social Profiles Overview */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Social Profiles Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <input type="text" value={form.platform} onChange={e => handleChange('platform', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Facebook, Instagram" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
            <input type="number" value={form.followers} onChange={e => handleChange('followers', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Engagement Rate (%)</label>
            <input type="number" step="0.01" value={form.engagementRate} onChange={e => handleChange('engagementRate', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Posting Frequency</label>
            <input type="text" value={form.postingFrequency} onChange={e => handleChange('postingFrequency', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Daily, Weekly" />
          </div>
        </div>
      </section>
      {/* Content Performance */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Content Performance</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Posts</label>
            <textarea rows={2} value={form.topPosts} onChange={e => handleChange('topPosts', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Describe top performing posts" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Reach</label>
            <input type="number" value={form.avgReach} onChange={e => handleChange('avgReach', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Engagement by Content Type</label>
            <textarea rows={2} value={form.engagementByType} onChange={e => handleChange('engagementByType', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Video, Image, Story" />
          </div>
        </div>
      </section>
      {/* Audience Insights */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Audience Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Demographics</label>
            <textarea rows={2} value={form.demographics} onChange={e => handleChange('demographics', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Age, gender, location, etc." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Growth Trends</label>
            <textarea rows={2} value={form.growthTrends} onChange={e => handleChange('growthTrends', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Follower growth, engagement trends" />
          </div>
        </div>
      </section>
      {/* Competitor Benchmarking */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Competitor Benchmarking</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Competitor Profiles</label>
            <textarea rows={2} value={form.competitorProfiles} onChange={e => handleChange('competitorProfiles', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="List competitor social profiles" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comparison Metrics</label>
            <textarea rows={2} value={form.competitorComparison} onChange={e => handleChange('competitorComparison', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Followers, engagement, content, etc." />
          </div>
        </div>
      </section>
      {/* Paid Campaigns */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Paid Campaigns</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recent Campaigns</label>
            <textarea rows={2} value={form.recentCampaigns} onChange={e => handleChange('recentCampaigns', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Describe recent paid campaigns" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Spend</label>
            <input type="number" value={form.campaignSpend} onChange={e => handleChange('campaignSpend', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Results</label>
            <textarea rows={2} value={form.campaignResults} onChange={e => handleChange('campaignResults', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Results, ROI, reach, etc." />
          </div>
        </div>
      </section>
      {/* Issues & Recommendations */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Issues & Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Challenges</label>
            <textarea rows={2} value={form.challenges} onChange={e => handleChange('challenges', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Challenges faced" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Improvement Suggestions</label>
            <textarea rows={2} value={form.improvementSuggestions} onChange={e => handleChange('improvementSuggestions', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Suggestions for improvement" />
          </div>
        </div>
      </section>
    </form>
  );
};

export default SocialAuditForm; 