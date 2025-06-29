import React from 'react';

export default function ComprehensiveTab() {
  return (
    <div className="space-y-8">
      {/* Branding Audit */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Branding Audit</h3>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Guidelines Availability</label>
          <div className="flex flex-col gap-2 mb-4">
            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Logo Usage Guidelines</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Color Palette Documentation</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Typography Guidelines</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Brand Voice & Messaging</label>
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Internal Branding</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Describe office branding, employee brand awareness, training, etc." />
          <label className="block text-sm font-medium text-gray-700 mb-2">External Branding</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Website, social media, marketing materials, customer touchpoints, etc." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Consistency Observations</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Observations on consistency across channels." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Strength Score (1-10)</label>
          <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Areas for Improvement</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="List priority areas for improvement." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Recommendations</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Key recommendations for brand improvement." />
        </div>
      </div>

      {/* Communication Channels Audit */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Channels Audit</h3>
        <div className="space-y-6">
          {/* Owned Channels */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3">Owned Channels</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" className="border rounded p-2" placeholder="Website URL" />
                  <select className="border rounded p-2">
                    <option>Select Performance</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
                <textarea className="w-full border rounded p-2 mt-2" rows={2} placeholder="Website observations and recommendations" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blog/Content Hub</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" className="border rounded p-2" placeholder="Blog URL" />
                  <select className="border rounded p-2">
                    <option>Select Performance</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
                <textarea className="w-full border rounded p-2 mt-2" rows={2} placeholder="Blog performance and content quality assessment" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Newsletter</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" className="border rounded p-2" placeholder="Frequency" />
                  <input type="text" className="border rounded p-2" placeholder="Subscriber Count" />
                  <input type="text" className="border rounded p-2" placeholder="Open Rate %" />
                </div>
                <textarea className="w-full border rounded p-2 mt-2" rows={2} placeholder="Email strategy and performance notes" />
              </div>
            </div>
          </div>

          {/* Social Media Channels */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3">Social Media Channels</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                  <input type="text" className="border rounded p-2 w-full" placeholder="Followers" />
                  <select className="border rounded p-2 w-full mt-1">
                    <option>Performance</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <input type="text" className="border rounded p-2 w-full" placeholder="Followers" />
                  <select className="border rounded p-2 w-full mt-1">
                    <option>Performance</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input type="text" className="border rounded p-2 w-full" placeholder="Followers" />
                  <select className="border rounded p-2 w-full mt-1">
                    <option>Performance</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
                  <input type="text" className="border rounded p-2 w-full" placeholder="Followers" />
                  <select className="border rounded p-2 w-full mt-1">
                    <option>Performance</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
                  <input type="text" className="border rounded p-2 w-full" placeholder="Followers" />
                  <select className="border rounded p-2 w-full mt-1">
                    <option>Performance</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                  <input type="text" className="border rounded p-2 w-full" placeholder="Subscribers" />
                  <select className="border rounded p-2 w-full mt-1">
                    <option>Performance</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Strategy Assessment</label>
                <textarea className="w-full border rounded p-2" rows={3} placeholder="Overall social media strategy, content quality, engagement rates, posting frequency, and recommendations" />
              </div>
            </div>
          </div>

          {/* Paid Channels */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3">Paid Channels</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Ads</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" className="border rounded p-2" placeholder="Monthly Budget" />
                  <input type="text" className="border rounded p-2" placeholder="CTR %" />
                  <input type="text" className="border rounded p-2" placeholder="Conversion Rate %" />
                </div>
                <textarea className="w-full border rounded p-2 mt-2" rows={2} placeholder="Google Ads performance and optimization notes" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook/Instagram Ads</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" className="border rounded p-2" placeholder="Monthly Budget" />
                  <input type="text" className="border rounded p-2" placeholder="CPC" />
                  <input type="text" className="border rounded p-2" placeholder="ROAS" />
                </div>
                <textarea className="w-full border rounded p-2 mt-2" rows={2} placeholder="Social ads performance and targeting assessment" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Other Paid Channels</label>
                <textarea className="w-full border rounded p-2" rows={2} placeholder="LinkedIn Ads, Display Ads, Video Ads, etc." />
              </div>
            </div>
          </div>

          {/* Earned Channels */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3">Earned Channels</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PR & Media Coverage</label>
                <textarea className="w-full border rounded p-2" rows={2} placeholder="Recent media mentions, press releases, media relationships" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Influencer Partnerships</label>
                <textarea className="w-full border rounded p-2" rows={2} placeholder="Current influencer relationships, performance, and opportunities" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Reviews & Testimonials</label>
                <textarea className="w-full border rounded p-2" rows={2} placeholder="Review platforms, ratings, testimonial collection strategy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Word-of-Mouth & Referrals</label>
                <textarea className="w-full border rounded p-2" rows={2} placeholder="Referral program effectiveness, customer advocacy" />
              </div>
            </div>
          </div>

          {/* Channel Integration & Performance */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3">Channel Integration & Overall Performance</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Channel Integration Assessment</label>
                <textarea className="w-full border rounded p-2" rows={3} placeholder="How well do channels work together? Cross-channel messaging consistency?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Top Performing Channels</label>
                <textarea className="w-full border rounded p-2" rows={2} placeholder="Which channels deliver the best ROI and engagement?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Underperforming Channels</label>
                <textarea className="w-full border rounded p-2" rows={2} placeholder="Which channels need improvement or should be discontinued?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Channel Optimization Recommendations</label>
                <textarea className="w-full border rounded p-2" rows={3} placeholder="Specific recommendations for improving each channel's performance" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Audit */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaigns Audit</h3>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Recent Campaigns Overview</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Describe recent marketing campaigns." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Objectives</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="What were the goals of each campaign?" />
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Performance Metrics</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="KPIs, ROI, engagement, conversions, etc." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Learnings & Recommendations</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="What worked, what didn't, and what to improve?" />
        </div>
      </div>

      {/* Communication Quality Audit */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Quality Audit</h3>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Quality Assessment</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Assess clarity, consistency, tone, and value of content." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Types & Formats</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Blog, video, social posts, email, etc." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Calendar & Planning</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Is there a content calendar? How is planning managed?" />
          <label className="block text-sm font-medium text-gray-700 mb-2">Distribution & Reach</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="How is content distributed? What is the reach?" />
          <label className="block text-sm font-medium text-gray-700 mb-2">Performance Metrics</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Engagement, shares, open rates, etc." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations for Communication Quality Improvement</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="How can communication quality be improved?" />
        </div>
      </div>
    </div>
  );
} 