import React, { useState } from 'react';
import AuditPlatformSelector from '../../components/AuditPlatformSelector';
import { 
  MagnifyingGlassIcon, 
  DocumentTextIcon,
  LinkIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
  CogIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const seoPlatforms = [
  { id: 'google-search-console', name: 'Google Search Console', icon: MagnifyingGlassIcon },
  { id: 'google-analytics', name: 'Google Analytics', icon: ChartBarIcon },
  { id: 'semrush', name: 'SEMrush', icon: DocumentTextIcon },
  { id: 'ahrefs', name: 'Ahrefs', icon: LinkIcon },
  { id: 'moz', name: 'Moz', icon: GlobeAltIcon },
  { id: 'screaming-frog', name: 'Screaming Frog', icon: CogIcon },
  { id: 'google-page-speed', name: 'Google PageSpeed', icon: DevicePhoneMobileIcon },
  { id: 'google-my-business', name: 'Google My Business', icon: MapPinIcon },
];

export default function SEOTab() {
  const [seoData, setSeoData] = useState({
    websiteUrl: '',
    currentRankings: '',
    targetKeywords: '',
    technicalIssues: '',
    contentQuality: '',
    backlinkProfile: '',
    localSeo: '',
    mobileOptimization: '',
    pageSpeed: '',
    recommendations: ''
  });

  const handlePlatformChange = (platforms: string[]) => {
    // Platform change handler - track selected SEO audit areas
    console.log('Selected SEO audit areas:', platforms);
  };

  const handleInputChange = (field: string, value: string) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <AuditPlatformSelector 
        platforms={seoPlatforms} 
        onChange={handlePlatformChange}
      >
        {(selectedPlatforms) => (
          <div className="space-y-6">
            {selectedPlatforms.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-blue-600" />
                  SEO Audit Form
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                    <input
                      type="url"
                      value={seoData.websiteUrl}
                      onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Rankings Assessment</label>
                    <textarea
                      value={seoData.currentRankings}
                      onChange={(e) => handleInputChange('currentRankings', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Current rankings for target keywords, position tracking, SERP analysis..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Keywords Analysis</label>
                    <textarea
                      value={seoData.targetKeywords}
                      onChange={(e) => handleInputChange('targetKeywords', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Primary and secondary keywords, search volume, competition level, keyword opportunities..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technical SEO Issues</label>
                    <textarea
                      value={seoData.technicalIssues}
                      onChange={(e) => handleInputChange('technicalIssues', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Crawl errors, broken links, duplicate content, XML sitemap issues, robots.txt problems..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Quality Assessment</label>
                    <textarea
                      value={seoData.contentQuality}
                      onChange={(e) => handleInputChange('contentQuality', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Content relevance, depth, freshness, user engagement, content gaps..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backlink Profile Analysis</label>
                    <textarea
                      value={seoData.backlinkProfile}
                      onChange={(e) => handleInputChange('backlinkProfile', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Backlink quantity, quality, anchor text diversity, toxic links, link building opportunities..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Local SEO Assessment</label>
                    <textarea
                      value={seoData.localSeo}
                      onChange={(e) => handleInputChange('localSeo', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Google My Business optimization, local citations, NAP consistency, local keyword rankings..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Optimization</label>
                    <textarea
                      value={seoData.mobileOptimization}
                      onChange={(e) => handleInputChange('mobileOptimization', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Mobile-friendliness, responsive design, mobile page speed, mobile user experience..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Page Speed & Performance</label>
                    <textarea
                      value={seoData.pageSpeed}
                      onChange={(e) => handleInputChange('pageSpeed', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Core Web Vitals, loading times, optimization opportunities, performance bottlenecks..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Recommendations</label>
                    <textarea
                      value={seoData.recommendations}
                      onChange={(e) => handleInputChange('recommendations', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Priority recommendations for improving SEO performance, action items, timeline suggestions..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </AuditPlatformSelector>
    </div>
  );
} 