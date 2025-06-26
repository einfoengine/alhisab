import React, { useState } from 'react';

const initialState = {
  platform: '',
  // General Info
  pageName: '',
  pageUrl: '',
  pageCategory: '',
  verificationStatus: '',
  // Audience
  followers: '',
  pageLikes: '',
  audienceDemographics: '',
  audienceGrowth: '',
  // Content & Posting
  avgPostsPerWeek: '',
  contentTypes: '',
  bestContent: '',
  bestTimes: '',
  // Engagement
  engagementRate: '',
  avgReach: '',
  engagementActions: '',
  negativeFeedback: '',
  // Paid Campaigns
  recentCampaigns: '',
  campaignSpend: '',
  cpm: '',
  cpc: '',
  ctr: '',
  cpa: '',
  campaignResults: '',
  audienceTargeting: '',
  // Compliance & Health
  policyViolations: '',
  responseRate: '',
  messengerSetup: '',
  reviewsRatings: '',
  // Competitor Benchmarking
  competitors: '',
  competitorComparison: '',
  // Tracking
  pixelInstalled: '',
  pixelEvents: '',
  pixelHealth: '',
  // Recommendations
  keyIssues: '',
  quickWins: '',
  recommendations: '',
  // Platform-specific (Facebook)
  adLibraryInsights: '',
  // Platform-specific (Instagram)
  storyPerformance: '',
  reelsPerformance: '',
  // Platform-specific (LinkedIn)
  companyUpdates: '',
  // Platform-specific (Twitter)
  tweetTypes: '',
  // Platform-specific (TikTok)
  viralVideos: '',
  // Other
  otherNotes: '',
  // New fields for tracking
  analyticsTool: '',
  utmUsed: '',
  conversionTracking: '',
  eventsTracked: '',
  trackingNotes: '',
  igInsightsConnected: '',
  igEventsTracked: '',
  liInsightTag: '',
  liEventsTracked: '',
  twConversionTracking: '',
  twEventsTracked: '',
  ttPixelInstalled: '',
  ttEventsTracked: '',
  ttPixelHealth: '',
};

interface SocialAuditFormProps {
  platform: string;
}

const CATEGORY_OPTIONS = [
  'Brand', 'Personal', 'News', 'Entertainment', 'Nonprofit', 'Other'
];
const AUDIENCE_GROWTH_OPTIONS = [
  'Declining', 'Stable', 'Growing', 'Rapidly Growing'
];
const CONTENT_TYPE_OPTIONS = [
  'Video', 'Image', 'Link', 'Story', 'Reel', 'Text', 'Live', 'Poll', 'Other'
];
const ENGAGEMENT_ACTIONS_OPTIONS = [
  'Likes', 'Comments', 'Shares', 'Saves', 'Clicks', 'Other'
];
const NEGATIVE_FEEDBACK_OPTIONS = [
  'Hides', 'Unlikes', 'Reports', 'Spam', 'Other'
];
const POLICY_VIOLATION_OPTIONS = [
  'None', 'Minor', 'Major', 'Account at Risk'
];
const RESPONSE_RATE_OPTIONS = [
  '<1hr', '1-4hr', '4-24hr', '>24hr', 'Not Monitored'
];
const MESSENGER_SETUP_OPTIONS = [
  'None', 'Auto-replies', 'Bots', 'Both'
];
const REVIEWS_RATINGS_OPTIONS = [
  '1 star', '2 stars', '3 stars', '4 stars', '5 stars'
];

const SocialAuditForm: React.FC<SocialAuditFormProps> = ({ platform }) => {
  const [form, setForm] = useState({ ...initialState, platform });
  // For multi-checkboxes
  const [contentTypesUsed, setContentTypesUsed] = useState<string[]>([]);
  const [engagementActions, setEngagementActions] = useState<string[]>([]);
  const [negativeFeedback, setNegativeFeedback] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleMultiCheckbox = (state: string[], setState: (v: string[]) => void, value: string) => {
    if (state.includes(value)) {
      setState(state.filter((v) => v !== value));
    } else {
      setState([...state, value]);
    }
  };

  // Helper to show fields for the selected platform
  const show = (platforms: string[]) =>
    platform && platforms.includes(platform);

  if (!platform) return null;

  return (
    <form className="space-y-8">
      {/* Page/Profile Info */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Page/Profile Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page/Profile Name</label>
            <input type="text" value={form.pageName} onChange={e => handleChange('pageName', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page/Profile URL</label>
            <input type="text" value={form.pageUrl} onChange={e => handleChange('pageUrl', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={form.pageCategory} onChange={e => handleChange('pageCategory', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
              <option value="">Select</option>
              {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
            <select value={form.verificationStatus} onChange={e => handleChange('verificationStatus', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
              <option value="">Select</option>
              <option value="verified">Verified</option>
              <option value="not_verified">Not Verified</option>
            </select>
          </div>
        </div>
      </section>

      {/* Audience & Demographics */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Audience & Demographics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
            <input type="number" value={form.followers} onChange={e => handleChange('followers', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          {show(['facebook']) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Likes</label>
              <input type="number" value={form.pageLikes} onChange={e => handleChange('pageLikes', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
            </div>
          )}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience Demographics</label>
            <textarea rows={2} value={form.audienceDemographics} onChange={e => handleChange('audienceDemographics', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Age, gender, location, etc." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience Growth Rate</label>
            <select value={form.audienceGrowth} onChange={e => handleChange('audienceGrowth', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
              <option value="">Select</option>
              {AUDIENCE_GROWTH_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Content & Posting */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Content & Posting</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Posts per Week</label>
            <input type="number" value={form.avgPostsPerWeek} onChange={e => handleChange('avgPostsPerWeek', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Types Used</label>
            <div className="flex flex-wrap gap-2">
              {CONTENT_TYPE_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-1 text-xs bg-green-100 px-2 py-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contentTypesUsed.includes(opt)}
                    onChange={() => handleMultiCheckbox(contentTypesUsed, setContentTypesUsed, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Best Performing Content</label>
            <textarea rows={2} value={form.bestContent} onChange={e => handleChange('bestContent', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Describe/link top posts" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Best Posting Times</label>
            <input type="text" value={form.bestTimes} onChange={e => handleChange('bestTimes', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Wed 8pm, Sat 10am" />
          </div>
          {show(['instagram']) && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stories Performance</label>
              <textarea rows={2} value={form.storyPerformance} onChange={e => handleChange('storyPerformance', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Insights on Instagram Stories" />
            </div>
          )}
          {show(['instagram']) && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reels Performance</label>
              <textarea rows={2} value={form.reelsPerformance} onChange={e => handleChange('reelsPerformance', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Insights on Instagram Reels" />
            </div>
          )}
          {show(['tiktok']) && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Viral Videos</label>
              <textarea rows={2} value={form.viralVideos} onChange={e => handleChange('viralVideos', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Describe/link viral TikTok videos" />
            </div>
          )}
          {show(['twitter']) && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tweet Types</label>
              <textarea rows={2} value={form.tweetTypes} onChange={e => handleChange('tweetTypes', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Insights on tweet types (text, image, video, thread)" />
            </div>
          )}
          {show(['linkedin']) && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Updates</label>
              <textarea rows={2} value={form.companyUpdates} onChange={e => handleChange('companyUpdates', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Insights on LinkedIn company updates" />
            </div>
          )}
        </div>
      </section>

      {/* Engagement Metrics */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Engagement Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Engagement Rate (%)</label>
            <input type="number" step="0.01" value={form.engagementRate} onChange={e => handleChange('engagementRate', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Reach</label>
            <input type="number" value={form.avgReach} onChange={e => handleChange('avgReach', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Engagement Actions</label>
            <div className="flex flex-wrap gap-2">
              {ENGAGEMENT_ACTIONS_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-1 text-xs bg-green-100 px-2 py-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={engagementActions.includes(opt)}
                    onChange={() => handleMultiCheckbox(engagementActions, setEngagementActions, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Negative Feedback</label>
            <div className="flex flex-wrap gap-2">
              {NEGATIVE_FEEDBACK_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-1 text-xs bg-green-100 px-2 py-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negativeFeedback.includes(opt)}
                    onChange={() => handleMultiCheckbox(negativeFeedback, setNegativeFeedback, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">CPM (Cost per 1,000 Impressions)</label>
            <input type="number" value={form.cpm} onChange={e => handleChange('cpm', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPC (Cost per Click)</label>
            <input type="number" value={form.cpc} onChange={e => handleChange('cpc', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTR (Click-Through Rate)</label>
            <input type="number" value={form.ctr} onChange={e => handleChange('ctr', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPA (Cost per Acquisition)</label>
            <input type="number" value={form.cpa} onChange={e => handleChange('cpa', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Results</label>
            <textarea rows={2} value={form.campaignResults} onChange={e => handleChange('campaignResults', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Results, ROI, reach, etc." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience Targeting Used</label>
            <textarea rows={2} value={form.audienceTargeting} onChange={e => handleChange('audienceTargeting', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Describe targeting (interests, lookalikes, etc.)" />
          </div>
          {show(['facebook']) && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Library Insights</label>
              <textarea rows={2} value={form.adLibraryInsights} onChange={e => handleChange('adLibraryInsights', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Insights from Facebook Ad Library" />
            </div>
          )}
        </div>
      </section>

      {/* Page Health & Compliance */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Page Health & Compliance</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Policy Violations/Restrictions</label>
            <select value={form.policyViolations} onChange={e => handleChange('policyViolations', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
              <option value="">Select</option>
              {POLICY_VIOLATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Response Rate to Messages</label>
            <select value={form.responseRate} onChange={e => handleChange('responseRate', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
              <option value="">Select</option>
              {RESPONSE_RATE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          {show(['facebook']) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Messenger Setup</label>
              <select value={form.messengerSetup} onChange={e => handleChange('messengerSetup', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
                <option value="">Select</option>
                {MESSENGER_SETUP_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reviews & Ratings</label>
            <select value={form.reviewsRatings} onChange={e => handleChange('reviewsRatings', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
              <option value="">Select</option>
              {REVIEWS_RATINGS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Competitor Benchmarking */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Competitor Benchmarking</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Competitors</label>
            <textarea rows={2} value={form.competitors} onChange={e => handleChange('competitors', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="List competitor profiles/pages" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comparative Metrics</label>
            <textarea rows={2} value={form.competitorComparison} onChange={e => handleChange('competitorComparison', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Followers, engagement, content frequency, etc." />
          </div>
        </div>
      </section>

      {/* Tracking & Pixel */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Tracking & Pixel</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* General Tracking Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Analytics/Insights Tool Used</label>
            <input type="text" value={form.analyticsTool} onChange={e => handleChange('analyticsTool', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Facebook Insights, Google Analytics, TikTok Analytics" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">UTM Parameters Used?</label>
            <select value={form.utmUsed || ''} onChange={e => handleChange('utmUsed', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conversion Tracking Enabled?</label>
            <select value={form.conversionTracking || ''} onChange={e => handleChange('conversionTracking', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Events/Goals Tracked</label>
            <input type="text" value={form.eventsTracked || ''} onChange={e => handleChange('eventsTracked', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. PageView, Lead, Purchase, Custom Events" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Issues/Notes</label>
            <textarea rows={2} value={form.trackingNotes || ''} onChange={e => handleChange('trackingNotes', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Any issues, gaps, or notes about tracking setup" />
          </div>

          {/* Platform-Specific Tracking */}
          {show(['facebook']) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Pixel Installed?</label>
                <select value={form.pixelInstalled} onChange={e => handleChange('pixelInstalled', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Events Tracked (Facebook Pixel)</label>
                <input type="text" value={form.pixelEvents} onChange={e => handleChange('pixelEvents', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. PageView, Lead, Purchase" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pixel Health</label>
                <textarea rows={2} value={form.pixelHealth} onChange={e => handleChange('pixelHealth', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Any issues or warnings?" />
              </div>
            </>
          )}
          {show(['instagram']) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Connected to Facebook Insights?</label>
                <select value={form.igInsightsConnected || ''} onChange={e => handleChange('igInsightsConnected', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Events Tracked (Instagram)</label>
                <input type="text" value={form.igEventsTracked || ''} onChange={e => handleChange('igEventsTracked', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Profile Visits, Website Clicks" />
              </div>
            </>
          )}
          {show(['linkedin']) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Insight Tag Installed?</label>
                <select value={form.liInsightTag || ''} onChange={e => handleChange('liInsightTag', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Events Tracked (LinkedIn)</label>
                <input type="text" value={form.liEventsTracked || ''} onChange={e => handleChange('liEventsTracked', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Website Visits, Conversions" />
              </div>
            </>
          )}
          {show(['twitter']) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conversion Tracking Enabled? (Twitter/X)</label>
                <select value={form.twConversionTracking || ''} onChange={e => handleChange('twConversionTracking', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Events Tracked (Twitter/X)</label>
                <input type="text" value={form.twEventsTracked || ''} onChange={e => handleChange('twEventsTracked', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Website Clicks, Conversions" />
              </div>
            </>
          )}
          {show(['tiktok']) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Pixel Installed?</label>
                <select value={form.ttPixelInstalled || ''} onChange={e => handleChange('ttPixelInstalled', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Events Tracked (TikTok)</label>
                <input type="text" value={form.ttEventsTracked || ''} onChange={e => handleChange('ttEventsTracked', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Video Views, Website Clicks" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pixel Health (TikTok)</label>
                <textarea rows={2} value={form.ttPixelHealth || ''} onChange={e => handleChange('ttPixelHealth', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Any issues or warnings?" />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Recommendations & Next Steps */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-yellow-800 mb-4 text-lg">Recommendations & Next Steps</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Issues Identified</label>
            <textarea rows={2} value={form.keyIssues} onChange={e => handleChange('keyIssues', e.target.value)} className="w-full px-3 py-2 border border-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quick Wins</label>
            <textarea rows={2} value={form.quickWins} onChange={e => handleChange('quickWins', e.target.value)} className="w-full px-3 py-2 border border-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Strategic Recommendations</label>
            <textarea rows={2} value={form.recommendations} onChange={e => handleChange('recommendations', e.target.value)} className="w-full px-3 py-2 border border-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Notes</label>
            <textarea rows={2} value={form.otherNotes} onChange={e => handleChange('otherNotes', e.target.value)} className="w-full px-3 py-2 border border-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm" />
          </div>
        </div>
      </section>
    </form>
  );
};

export default SocialAuditForm; 