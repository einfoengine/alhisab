import React, { useState } from 'react';

const initialState = {
  // 1. Site Health Score
  siteHealthScore: '',
  issuesSummary: '',
  // 2. Crawlability & Indexing
  crawlErrors: '',
  indexedPages: '',
  redirectsCanonicals: '',
  // 3. Technical SEO Issues
  brokenLinks: '',
  redirectChains: '',
  sitemapIssues: '',
  robotsIssues: '',
  jsIssues: '',
  // 4. On-Page SEO
  metaTags: '',
  headingTags: '',
  imageAlt: '',
  internalLinks: '',
  contentIssues: '',
  // 5. Mobile Usability
  mobileFriendliness: '',
  responsiveDesign: '',
  // 6. Page Speed Insights
  pageLoadSpeed: '',
  optimizationRecommendations: '',
  // 7. Backlink Profile
  backlinkAnalysis: '',
  toxicBacklinks: '',
  linkDistribution: '',
  // 8. Security Issues
  httpsImplementation: '',
  malwarePhishing: '',
  vulnerabilities: '',
  // 9. User Experience (UX)
  uxExperience: '',
  coreWebVitals: '',
  // 10. Content & Keyword Analysis
  keywordRankings: '',
  contentGaps: '',
  competitorComparison: '',
  // 11. Social Media Metrics
  socialShares: '',
  socialCompetitor: '',
  // 12. Technical Recommendations
  structuredData: '',
  hreflang: '',
  // 13. User Behavior Data
  bounceExitRate: '',
  behaviorAnalysis: '',
  // 14. Site Performance & Server Status
  hostingPerformance: '',
  dnsIssues: '',
  // Bing-specific fields
  searchQueries: '',
  searchImpressions: '',
  searchClicks: '',
  searchCTR: '',
  searchAvgPosition: '',
  searchTraffic: '',
  topPages: '',
  keywordPerformance: '',
  crawlStats: '',
  crawlStatsPeriod: '',
  crawlServerErrors: '',
  crawlNotFoundErrors: '',
  crawlRedirectIssues: '',
  blockedUrls: '',
  urlFetch: '',
  sitemaps: '',
  sitemapSubmissionStatus: '',
  sitemapErrors: '',
  sitemapIndexedPages: '',
  urlRemovalTool: '',
  backlinkProfile: '',
  totalBacklinks: '',
  referringDomains: '',
  newVsLostBacklinks: '',
  anchorText: '',
  referringIps: '',
  securityIssues: '',
  safeBrowsingStatus: '',
  phishingSpamAlerts: '',
  mobileOptimization: '',
  mobileUsabilityErrors: '',
  richSnippets: '',
  validationIssues: '',
  pageSpeedInsights: '',
  urlInspection: '',
  indexingIssues: '',
  geoTargeting: '',
  crawlRateSettings: '',
  disavowLinks: '',
  siteLinks: '',
  breadcrumbs: '',
  ampStatus: '',
  seoSuggestions: '',
  performanceAlerts: '',
  userAccess: '',
  // GSC-specific fields
  gscTotalClicks: '',
  gscTotalImpressions: '',
  gscCTR: '',
  gscAvgPosition: '',
  gscTopQueries: '',
  gscTopPages: '',
  gscDevices: '',
  gscCrawlStats: '',
  gscCrawlErrors: '',
  gscIndexCoverageReport: '',
  gscIndexedPages: '',
  gscExcludedPages: '',
  gscCoverageErrors: '',
  gscValidPages: '',
  gscMobileUsabilityReport: '',
  gscCoreWebVitalsLCP: '',
  gscCoreWebVitalsFID: '',
  gscCoreWebVitalsCLS: '',
  gscCoreWebVitalsNotes: '',
  gscInternalLinks: '',
  gscExternalLinks: '',
  gscTopLinkingSites: '',
  gscTopLinkedPages: '',
  gscSitemapStatus: '',
  gscSitemapErrors: '',
  gscManualActions: '',
  gscSecurityIssues: '',
  gscUrlInspection: '',
  gscCrawlStatusErrors: '',
  gscLiveTest: '',
  gscRichResultsReport: '',
  gscStructuredDataErrors: '',
  gscRichSnippetPerformance: '',
  gscDisavowLinks: '',
  gscInternationalTargeting: '',
  gscHreflangImplementation: '',
  gscDateRangeAnalysis: '',
  gscTrendAnalysis: '',
  // Ahrefs-specific fields
  ahrefsOrganicKeywords: '',
  ahrefsTopOrganicPages: '',
  ahrefsTrafficValue: '',
  ahrefsTotalBacklinks: '',
  ahrefsReferringDomains: '',
  ahrefsBacklinkGrowth: '',
  ahrefsAnchorTextAnalysis: '',
  ahrefsNewBacklinks: '',
  ahrefsLostBacklinks: '',
  ahrefsTopReferringPages: '',
  ahrefsTopLinkingDomains: '',
  ahrefsHealthScore: '',
  ahrefsCrawlErrors: '',
  ahrefsBrokenLinks: '',
  ahrefsMetaTagsIssues: '',
  ahrefsDuplicateContent: '',
  ahrefsMissingSchema: '',
  ahrefsMobileUsability: '',
  ahrefsCoreWebVitalsLCP: '',
  ahrefsCoreWebVitalsFID: '',
  ahrefsCoreWebVitalsCLS: '',
  ahrefsCoreWebVitalsNotes: '',
  ahrefsBacklinkProfile: '',
  ahrefsBacklinkQuality: '',
  ahrefsDomainRating: '',
  ahrefsUrlRating: '',
  ahrefsAnchorTextDistribution: '',
  ahrefsKeywordOverview: '',
  ahrefsClicksVsImpressions: '',
  ahrefsKeywordSuggestions: '',
  ahrefsKeywordDifficulty: '',
  ahrefsSERPOverview: '',
  ahrefsClickstreamData: '',
  ahrefsTopContentByTopic: '',
  ahrefsContentGaps: '',
  ahrefsRankPositionTracking: '',
  ahrefsCompetitorAnalysis: '',
  ahrefsCompetitorBacklinks: '',
  ahrefsKeywordGapAnalysis: '',
  ahrefsTopPagesOfCompetitors: '',
  ahrefsLinkIntersect: '',
  ahrefsDisavowToxicBacklinks: '',
};

const AuditResultSummary = () => {
  const [form, setForm] = useState(initialState);
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <form className="space-y-8">
      {/* 1. Site Health Score */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">1. Site Health Score</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Overall Health Score (%)</label>
            <input type="number" min="0" max="100" value={form.siteHealthScore} onChange={e => handleChange('siteHealthScore', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issues Summary</label>
            <textarea rows={2} value={form.issuesSummary} onChange={e => handleChange('issuesSummary', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="High, medium, low-priority issues" />
          </div>
        </div>
      </section>
      {/* 2. Crawlability & Indexing */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">2. Crawlability & Indexing</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawlability Errors</label>
            <textarea rows={2} value={form.crawlErrors} onChange={e => handleChange('crawlErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Pages that can't be crawled" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Indexability (Indexed Pages)</label>
            <input type="number" value={form.indexedPages} onChange={e => handleChange('indexedPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Redirects & Canonicals</label>
            <textarea rows={2} value={form.redirectsCanonicals} onChange={e => handleChange('redirectsCanonicals', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Redirect/canonical issues" />
          </div>
        </div>
      </section>
      {/* 3. Technical SEO Issues */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">3. Technical SEO Issues</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Broken Links (404 Errors)</label>
            <textarea rows={2} value={form.brokenLinks} onChange={e => handleChange('brokenLinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="List 404 errors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Redirect Chains & Loops</label>
            <textarea rows={2} value={form.redirectChains} onChange={e => handleChange('redirectChains', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Describe redirect chains/loops" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">XML Sitemap Issues</label>
            <textarea rows={2} value={form.sitemapIssues} onChange={e => handleChange('sitemapIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Missing or misconfigured sitemap" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Robots.txt Issues</label>
            <textarea rows={2} value={form.robotsIssues} onChange={e => handleChange('robotsIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Problems with robots.txt" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">JavaScript Issues</label>
            <textarea rows={2} value={form.jsIssues} onChange={e => handleChange('jsIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="JS rendering issues" />
          </div>
        </div>
      </section>
      {/* 4. On-Page SEO */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">4. On-Page SEO</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Tags (Title & Description)</label>
            <textarea rows={2} value={form.metaTags} onChange={e => handleChange('metaTags', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Missing/duplicate/long meta tags" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading Tags</label>
            <textarea rows={2} value={form.headingTags} onChange={e => handleChange('headingTags', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="H1, H2, H3 issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text</label>
            <textarea rows={2} value={form.imageAlt} onChange={e => handleChange('imageAlt', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Missing/non-descriptive alt text" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internal Linking</label>
            <textarea rows={2} value={form.internalLinks} onChange={e => handleChange('internalLinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Broken/orphan links, poor structure" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Issues</label>
            <textarea rows={2} value={form.contentIssues} onChange={e => handleChange('contentIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Thin/duplicate/poor content" />
          </div>
        </div>
      </section>
      {/* 5. Mobile Usability */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">5. Mobile Usability</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile-Friendliness</label>
            <textarea rows={2} value={form.mobileFriendliness} onChange={e => handleChange('mobileFriendliness', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Mobile usability issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsive Design</label>
            <textarea rows={2} value={form.responsiveDesign} onChange={e => handleChange('responsiveDesign', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Responsive design issues" />
          </div>
        </div>
      </section>
      {/* 6. Page Speed Insights */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">6. Page Speed Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Load Speed (s)</label>
            <input type="number" step="0.01" value={form.pageLoadSpeed} onChange={e => handleChange('pageLoadSpeed', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Optimization Recommendations</label>
            <textarea rows={2} value={form.optimizationRecommendations} onChange={e => handleChange('optimizationRecommendations', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Suggestions for speed improvement" />
          </div>
        </div>
      </section>
      {/* 7. Backlink Profile */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">7. Backlink Profile</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Backlink Analysis</label>
            <textarea rows={2} value={form.backlinkAnalysis} onChange={e => handleChange('backlinkAnalysis', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Overview of backlinks" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Toxic Backlinks</label>
            <textarea rows={2} value={form.toxicBacklinks} onChange={e => handleChange('toxicBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Potentially harmful backlinks" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link Distribution</label>
            <textarea rows={2} value={form.linkDistribution} onChange={e => handleChange('linkDistribution', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Follow vs. nofollow links" />
          </div>
        </div>
      </section>
      {/* 8. Security Issues */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">8. Security Issues</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HTTPS Implementation</label>
            <textarea rows={2} value={form.httpsImplementation} onChange={e => handleChange('httpsImplementation', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="SSL/HTTPS issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Malware or Phishing</label>
            <textarea rows={2} value={form.malwarePhishing} onChange={e => handleChange('malwarePhishing', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Malware/phishing threats" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vulnerabilities</label>
            <textarea rows={2} value={form.vulnerabilities} onChange={e => handleChange('vulnerabilities', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Security flaws" />
          </div>
        </div>
      </section>
      {/* 9. User Experience (UX) */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">9. User Experience (UX)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile & Desktop Experience</label>
            <textarea rows={2} value={form.uxExperience} onChange={e => handleChange('uxExperience', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Mobile vs. desktop issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Core Web Vitals</label>
            <textarea rows={2} value={form.coreWebVitals} onChange={e => handleChange('coreWebVitals', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="LCP, FID, CLS metrics" />
          </div>
        </div>
      </section>
      {/* 10. Content & Keyword Analysis */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">10. Content & Keyword Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keyword Rankings</label>
            <textarea rows={2} value={form.keywordRankings} onChange={e => handleChange('keywordRankings', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Keywords, position, volume, competition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Gaps</label>
            <textarea rows={2} value={form.contentGaps} onChange={e => handleChange('contentGaps', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Missing/underutilized keywords" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Competitor Comparison</label>
            <textarea rows={2} value={form.competitorComparison} onChange={e => handleChange('competitorComparison', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Compare with competitors" />
          </div>
        </div>
      </section>
      {/* 11. Social Media Metrics */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">11. Social Media Metrics (if linked)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Social Shares & Engagement</label>
            <textarea rows={2} value={form.socialShares} onChange={e => handleChange('socialShares', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Social signals, engagement" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Competitor Analysis</label>
            <textarea rows={2} value={form.socialCompetitor} onChange={e => handleChange('socialCompetitor', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Competitor social presence" />
          </div>
        </div>
      </section>
      {/* 12. Technical Recommendations */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">12. Technical Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Structured Data Errors</label>
            <textarea rows={2} value={form.structuredData} onChange={e => handleChange('structuredData', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Schema markup issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hreflang Errors</label>
            <textarea rows={2} value={form.hreflang} onChange={e => handleChange('hreflang', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="International/language targeting issues" />
          </div>
        </div>
      </section>
      {/* 13. User Behavior Data */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">13. User Behavior Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bounce Rate & Exit Rate</label>
            <textarea rows={2} value={form.bounceExitRate} onChange={e => handleChange('bounceExitRate', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="High bounce/exit rates" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">On-Site Behavior Analysis</label>
            <textarea rows={2} value={form.behaviorAnalysis} onChange={e => handleChange('behaviorAnalysis', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="User engagement/friction points" />
          </div>
        </div>
      </section>
      {/* 14. Site Performance & Server Status */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">14. Site Performance & Server Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hosting Performance</label>
            <textarea rows={2} value={form.hostingPerformance} onChange={e => handleChange('hostingPerformance', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Server response time, downtime, uptime" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DNS and Server Issues</label>
            <textarea rows={2} value={form.dnsIssues} onChange={e => handleChange('dnsIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="DNS errors, slow server responses" />
          </div>
        </div>
      </section>
      {/* Bing Webmaster Tools - Additional Fields */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Search Performance Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Queries</label>
            <textarea rows={2} value={form.searchQueries} onChange={e => handleChange('searchQueries', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="List of search queries" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Impressions</label>
            <input type="number" value={form.searchImpressions} onChange={e => handleChange('searchImpressions', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clicks</label>
            <input type="number" value={form.searchClicks} onChange={e => handleChange('searchClicks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTR (%)</label>
            <input type="number" step="0.01" value={form.searchCTR} onChange={e => handleChange('searchCTR', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Position</label>
            <input type="number" step="0.01" value={form.searchAvgPosition} onChange={e => handleChange('searchAvgPosition', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Traffic</label>
            <input type="number" value={form.searchTraffic} onChange={e => handleChange('searchTraffic', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Pages</label>
            <textarea rows={2} value={form.topPages} onChange={e => handleChange('topPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Top organic traffic pages" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keyword Performance</label>
            <textarea rows={2} value={form.keywordPerformance} onChange={e => handleChange('keywordPerformance', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Keyword ranking insights" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Crawl Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Stats</label>
            <textarea rows={2} value={form.crawlStats} onChange={e => handleChange('crawlStats', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Crawl stats details" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Stats Period</label>
            <input type="text" value={form.crawlStatsPeriod} onChange={e => handleChange('crawlStatsPeriod', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="e.g. Last 30 days" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Server Errors (5xx)</label>
            <textarea rows={2} value={form.crawlServerErrors} onChange={e => handleChange('crawlServerErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="5xx errors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Not Found Errors (404)</label>
            <textarea rows={2} value={form.crawlNotFoundErrors} onChange={e => handleChange('crawlNotFoundErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="404 errors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Redirect Issues (301, 302, etc.)</label>
            <textarea rows={2} value={form.crawlRedirectIssues} onChange={e => handleChange('crawlRedirectIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Redirect issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blocked URLs</label>
            <textarea rows={2} value={form.blockedUrls} onChange={e => handleChange('blockedUrls', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Blocked by robots.txt or meta tags" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Fetch</label>
            <textarea rows={2} value={form.urlFetch} onChange={e => handleChange('urlFetch', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Manual URL fetch requests" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Indexing Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitemaps</label>
            <textarea rows={2} value={form.sitemaps} onChange={e => handleChange('sitemaps', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Sitemap info" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitemap Submission Status</label>
            <input type="text" value={form.sitemapSubmissionStatus} onChange={e => handleChange('sitemapSubmissionStatus', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitemap Errors</label>
            <textarea rows={2} value={form.sitemapErrors} onChange={e => handleChange('sitemapErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Sitemap errors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitemap Indexed Pages</label>
            <input type="number" value={form.sitemapIndexedPages} onChange={e => handleChange('sitemapIndexedPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Removal Tool</label>
            <textarea rows={2} value={form.urlRemovalTool} onChange={e => handleChange('urlRemovalTool', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="URL removal requests" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Backlinks Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Backlink Profile</label>
            <textarea rows={2} value={form.backlinkProfile} onChange={e => handleChange('backlinkProfile', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Backlink insights" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Backlinks</label>
            <input type="number" value={form.totalBacklinks} onChange={e => handleChange('totalBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referring Domains</label>
            <input type="number" value={form.referringDomains} onChange={e => handleChange('referringDomains', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New vs. Lost Backlinks</label>
            <textarea rows={2} value={form.newVsLostBacklinks} onChange={e => handleChange('newVsLostBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="New/lost backlinks" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Anchor Text</label>
            <textarea rows={2} value={form.anchorText} onChange={e => handleChange('anchorText', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Anchor text in backlinks" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referring IPs</label>
            <textarea rows={2} value={form.referringIps} onChange={e => handleChange('referringIps', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Referring IP addresses" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Security & Malware Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Security Issues</label>
            <textarea rows={2} value={form.securityIssues} onChange={e => handleChange('securityIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Potential security risks" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Safe Browsing Status</label>
            <textarea rows={2} value={form.safeBrowsingStatus} onChange={e => handleChange('safeBrowsingStatus', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Safe browsing info" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phishing/Spam Alerts</label>
            <textarea rows={2} value={form.phishingSpamAlerts} onChange={e => handleChange('phishingSpamAlerts', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Phishing/spam alerts" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Mobile Usability Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Optimization</label>
            <textarea rows={2} value={form.mobileOptimization} onChange={e => handleChange('mobileOptimization', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Mobile optimization report" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Usability Errors</label>
            <textarea rows={2} value={form.mobileUsabilityErrors} onChange={e => handleChange('mobileUsabilityErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Mobile usability errors" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Rich Results & Structured Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rich Snippets</label>
            <textarea rows={2} value={form.richSnippets} onChange={e => handleChange('richSnippets', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Rich results info" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Validation Issues</label>
            <textarea rows={2} value={form.validationIssues} onChange={e => handleChange('validationIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Schema validation issues" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Website Performance (Speed)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Speed Insights</label>
            <textarea rows={2} value={form.pageSpeedInsights} onChange={e => handleChange('pageSpeedInsights', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Page speed data" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - URL Inspection Tool</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Status Check</label>
            <textarea rows={2} value={form.urlInspection} onChange={e => handleChange('urlInspection', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="URL inspection results" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Indexing Issues</label>
            <textarea rows={2} value={form.indexingIssues} onChange={e => handleChange('indexingIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Indexing issues" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Site Configuration & Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Geographical Targeting</label>
            <input type="text" value={form.geoTargeting} onChange={e => handleChange('geoTargeting', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Target region/language" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Rate Settings</label>
            <input type="text" value={form.crawlRateSettings} onChange={e => handleChange('crawlRateSettings', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Crawl frequency" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Disavow Tool (for Links)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disavow Links</label>
            <textarea rows={2} value={form.disavowLinks} onChange={e => handleChange('disavowLinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Disavow list" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Search Appearance</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Links</label>
            <textarea rows={2} value={form.siteLinks} onChange={e => handleChange('siteLinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Site links info" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breadcrumbs</label>
            <textarea rows={2} value={form.breadcrumbs} onChange={e => handleChange('breadcrumbs', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Breadcrumb markup info" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">AMP Status</label>
            <textarea rows={2} value={form.ampStatus} onChange={e => handleChange('ampStatus', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="AMP status/issues" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - Actionable Insights & Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Suggestions</label>
            <textarea rows={2} value={form.seoSuggestions} onChange={e => handleChange('seoSuggestions', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="SEO suggestions" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Performance Alerts</label>
            <textarea rows={2} value={form.performanceAlerts} onChange={e => handleChange('performanceAlerts', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Performance alerts" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Bing Webmaster Tools - User & Permissions Management</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Access</label>
            <textarea rows={2} value={form.userAccess} onChange={e => handleChange('userAccess', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="User access/permissions info" />
          </div>
        </div>
      </section>
      {/* Google Search Console - Additional Fields */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Search Performance Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Clicks</label>
            <input type="number" value={form.gscTotalClicks} onChange={e => handleChange('gscTotalClicks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Impressions</label>
            <input type="number" value={form.gscTotalImpressions} onChange={e => handleChange('gscTotalImpressions', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Click-Through Rate (CTR)</label>
            <input type="number" step="0.01" value={form.gscCTR} onChange={e => handleChange('gscCTR', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Position</label>
            <input type="number" step="0.01" value={form.gscAvgPosition} onChange={e => handleChange('gscAvgPosition', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Queries</label>
            <textarea rows={2} value={form.gscTopQueries} onChange={e => handleChange('gscTopQueries', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Top search queries" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Pages</label>
            <textarea rows={2} value={form.gscTopPages} onChange={e => handleChange('gscTopPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Most popular pages" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Devices</label>
            <textarea rows={2} value={form.gscDevices} onChange={e => handleChange('gscDevices', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Desktop, mobile, tablet data" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Crawl Data & Coverage Issues</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Stats</label>
            <textarea rows={2} value={form.gscCrawlStats} onChange={e => handleChange('gscCrawlStats', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Googlebot crawling activity" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Errors</label>
            <textarea rows={2} value={form.gscCrawlErrors} onChange={e => handleChange('gscCrawlErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="404, 500, redirect errors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Index Coverage Report</label>
            <textarea rows={2} value={form.gscIndexCoverageReport} onChange={e => handleChange('gscIndexCoverageReport', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Index status details" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Indexed Pages</label>
            <input type="number" value={form.gscIndexedPages} onChange={e => handleChange('gscIndexedPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excluded Pages</label>
            <input type="number" value={form.gscExcludedPages} onChange={e => handleChange('gscExcludedPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Errors</label>
            <textarea rows={2} value={form.gscCoverageErrors} onChange={e => handleChange('gscCoverageErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Coverage errors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valid Pages</label>
            <input type="number" value={form.gscValidPages} onChange={e => handleChange('gscValidPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Mobile Usability</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Usability Report</label>
            <textarea rows={2} value={form.gscMobileUsabilityReport} onChange={e => handleChange('gscMobileUsabilityReport', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Mobile usability issues" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Core Web Vitals</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Largest Contentful Paint (LCP)</label>
            <input type="number" step="0.01" value={form.gscCoreWebVitalsLCP} onChange={e => handleChange('gscCoreWebVitalsLCP', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Input Delay (FID)</label>
            <input type="number" step="0.01" value={form.gscCoreWebVitalsFID} onChange={e => handleChange('gscCoreWebVitalsFID', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cumulative Layout Shift (CLS)</label>
            <input type="number" step="0.01" value={form.gscCoreWebVitalsCLS} onChange={e => handleChange('gscCoreWebVitalsCLS', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Core Web Vitals Notes</label>
            <textarea rows={2} value={form.gscCoreWebVitalsNotes} onChange={e => handleChange('gscCoreWebVitalsNotes', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Notes on Core Web Vitals" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Links Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internal Links</label>
            <input type="number" value={form.gscInternalLinks} onChange={e => handleChange('gscInternalLinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">External Links (Backlinks)</label>
            <input type="number" value={form.gscExternalLinks} onChange={e => handleChange('gscExternalLinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Linking Sites</label>
            <textarea rows={2} value={form.gscTopLinkingSites} onChange={e => handleChange('gscTopLinkingSites', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Top linking sites" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Linked Pages</label>
            <textarea rows={2} value={form.gscTopLinkedPages} onChange={e => handleChange('gscTopLinkedPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Top linked pages" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Sitemaps</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitemap Status</label>
            <textarea rows={2} value={form.gscSitemapStatus} onChange={e => handleChange('gscSitemapStatus', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Sitemap status" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitemap Errors</label>
            <textarea rows={2} value={form.gscSitemapErrors} onChange={e => handleChange('gscSitemapErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Sitemap errors" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Security & Manual Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manual Actions Report</label>
            <textarea rows={2} value={form.gscManualActions} onChange={e => handleChange('gscManualActions', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Manual penalties" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Security Issues Report</label>
            <textarea rows={2} value={form.gscSecurityIssues} onChange={e => handleChange('gscSecurityIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Security issues" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - URL Inspection Tool</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Inspection</label>
            <textarea rows={2} value={form.gscUrlInspection} onChange={e => handleChange('gscUrlInspection', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="URL inspection status" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Status & Errors</label>
            <textarea rows={2} value={form.gscCrawlStatusErrors} onChange={e => handleChange('gscCrawlStatusErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Crawl status/errors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Live Test</label>
            <textarea rows={2} value={form.gscLiveTest} onChange={e => handleChange('gscLiveTest', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Live test results" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Rich Results & Structured Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rich Results Report</label>
            <textarea rows={2} value={form.gscRichResultsReport} onChange={e => handleChange('gscRichResultsReport', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Rich results performance" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Structured Data Errors</label>
            <textarea rows={2} value={form.gscStructuredDataErrors} onChange={e => handleChange('gscStructuredDataErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Structured data issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rich Snippet Performance</label>
            <textarea rows={2} value={form.gscRichSnippetPerformance} onChange={e => handleChange('gscRichSnippetPerformance', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Rich snippet insights" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Disavow Links</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disavow Tool</label>
            <textarea rows={2} value={form.gscDisavowLinks} onChange={e => handleChange('gscDisavowLinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Disavow links" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Performance Across Different Countries and Languages</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">International Targeting Report</label>
            <textarea rows={2} value={form.gscInternationalTargeting} onChange={e => handleChange('gscInternationalTargeting', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Country/language performance" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hreflang Implementation</label>
            <textarea rows={2} value={form.gscHreflangImplementation} onChange={e => handleChange('gscHreflangImplementation', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Hreflang tag issues" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Google Search Console - Performance Over Time</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range Analysis</label>
            <textarea rows={2} value={form.gscDateRangeAnalysis} onChange={e => handleChange('gscDateRangeAnalysis', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Performance by date range" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trend Analysis</label>
            <textarea rows={2} value={form.gscTrendAnalysis} onChange={e => handleChange('gscTrendAnalysis', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Trends and seasonal patterns" />
          </div>
        </div>
      </section>
      {/* Ahrefs - Additional Fields */}
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Ahrefs - Site Explorer</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organic Keywords</label>
            <textarea rows={2} value={form.ahrefsOrganicKeywords} onChange={e => handleChange('ahrefsOrganicKeywords', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Keywords, positions, volume, traffic potential" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Organic Pages</label>
            <textarea rows={2} value={form.ahrefsTopOrganicPages} onChange={e => handleChange('ahrefsTopOrganicPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Best-performing pages" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Traffic Value</label>
            <input type="number" value={form.ahrefsTrafficValue} onChange={e => handleChange('ahrefsTrafficValue', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Backlinks</label>
            <input type="number" value={form.ahrefsTotalBacklinks} onChange={e => handleChange('ahrefsTotalBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referring Domains</label>
            <input type="number" value={form.ahrefsReferringDomains} onChange={e => handleChange('ahrefsReferringDomains', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Backlink Growth</label>
            <textarea rows={2} value={form.ahrefsBacklinkGrowth} onChange={e => handleChange('ahrefsBacklinkGrowth', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Backlink growth over time" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Anchor Text Analysis</label>
            <textarea rows={2} value={form.ahrefsAnchorTextAnalysis} onChange={e => handleChange('ahrefsAnchorTextAnalysis', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Most common anchor texts" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Backlinks</label>
            <textarea rows={2} value={form.ahrefsNewBacklinks} onChange={e => handleChange('ahrefsNewBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="New backlinks gained" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lost Backlinks</label>
            <textarea rows={2} value={form.ahrefsLostBacklinks} onChange={e => handleChange('ahrefsLostBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Backlinks lost over time" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Referring Pages</label>
            <textarea rows={2} value={form.ahrefsTopReferringPages} onChange={e => handleChange('ahrefsTopReferringPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Pages sending most backlinks" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Linking Domains</label>
            <textarea rows={2} value={form.ahrefsTopLinkingDomains} onChange={e => handleChange('ahrefsTopLinkingDomains', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Domains linking most" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Ahrefs - Site Audit</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Health Score</label>
            <input type="number" value={form.ahrefsHealthScore} onChange={e => handleChange('ahrefsHealthScore', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Errors</label>
            <textarea rows={2} value={form.ahrefsCrawlErrors} onChange={e => handleChange('ahrefsCrawlErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="404s, redirects, duplicate content, server errors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Broken Links</label>
            <textarea rows={2} value={form.ahrefsBrokenLinks} onChange={e => handleChange('ahrefsBrokenLinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Broken internal/external links" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Tags Issues</label>
            <textarea rows={2} value={form.ahrefsMetaTagsIssues} onChange={e => handleChange('ahrefsMetaTagsIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Title/meta/header tag issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duplicate Content</label>
            <textarea rows={2} value={form.ahrefsDuplicateContent} onChange={e => handleChange('ahrefsDuplicateContent', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Duplicate content issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Missing or Invalid Schema</label>
            <textarea rows={2} value={form.ahrefsMissingSchema} onChange={e => handleChange('ahrefsMissingSchema', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Schema markup issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Usability</label>
            <textarea rows={2} value={form.ahrefsMobileUsability} onChange={e => handleChange('ahrefsMobileUsability', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Mobile usability issues" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Core Web Vitals - LCP</label>
            <input type="number" step="0.01" value={form.ahrefsCoreWebVitalsLCP} onChange={e => handleChange('ahrefsCoreWebVitalsLCP', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Core Web Vitals - FID</label>
            <input type="number" step="0.01" value={form.ahrefsCoreWebVitalsFID} onChange={e => handleChange('ahrefsCoreWebVitalsFID', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Core Web Vitals - CLS</label>
            <input type="number" step="0.01" value={form.ahrefsCoreWebVitalsCLS} onChange={e => handleChange('ahrefsCoreWebVitalsCLS', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Core Web Vitals Notes</label>
            <textarea rows={2} value={form.ahrefsCoreWebVitalsNotes} onChange={e => handleChange('ahrefsCoreWebVitalsNotes', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Notes on Core Web Vitals" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Ahrefs - Backlink Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Backlink Profile</label>
            <textarea rows={2} value={form.ahrefsBacklinkProfile} onChange={e => handleChange('ahrefsBacklinkProfile', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Backlink overview" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Backlinks</label>
            <textarea rows={2} value={form.ahrefsNewBacklinks} onChange={e => handleChange('ahrefsNewBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="New backlinks" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lost Backlinks</label>
            <textarea rows={2} value={form.ahrefsLostBacklinks} onChange={e => handleChange('ahrefsLostBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Lost backlinks" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Backlink Quality</label>
            <textarea rows={2} value={form.ahrefsBacklinkQuality} onChange={e => handleChange('ahrefsBacklinkQuality', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Domain/URL rating" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domain Rating (DR)</label>
            <input type="number" value={form.ahrefsDomainRating} onChange={e => handleChange('ahrefsDomainRating', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Rating (UR)</label>
            <input type="number" value={form.ahrefsUrlRating} onChange={e => handleChange('ahrefsUrlRating', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Anchor Text Distribution</label>
            <textarea rows={2} value={form.ahrefsAnchorTextDistribution} onChange={e => handleChange('ahrefsAnchorTextDistribution', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Anchor text profile" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Ahrefs - Keyword Explorer</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keyword Overview</label>
            <textarea rows={2} value={form.ahrefsKeywordOverview} onChange={e => handleChange('ahrefsKeywordOverview', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Search volume, KD, clicks" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clicks vs. Impressions</label>
            <textarea rows={2} value={form.ahrefsClicksVsImpressions} onChange={e => handleChange('ahrefsClicksVsImpressions', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Clicks vs. impressions" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keyword Suggestions</label>
            <textarea rows={2} value={form.ahrefsKeywordSuggestions} onChange={e => handleChange('ahrefsKeywordSuggestions', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Related keywords" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keyword Difficulty (KD)</label>
            <input type="number" value={form.ahrefsKeywordDifficulty} onChange={e => handleChange('ahrefsKeywordDifficulty', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SERP Overview</label>
            <textarea rows={2} value={form.ahrefsSERPOverview} onChange={e => handleChange('ahrefsSERPOverview', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Top 10 results analysis" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clickstream Data</label>
            <textarea rows={2} value={form.ahrefsClickstreamData} onChange={e => handleChange('ahrefsClickstreamData', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Clicks for top pages" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Ahrefs - Content Explorer</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Content by Topic</label>
            <textarea rows={2} value={form.ahrefsTopContentByTopic} onChange={e => handleChange('ahrefsTopContentByTopic', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Most shared/linked content" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Gaps</label>
            <textarea rows={2} value={form.ahrefsContentGaps} onChange={e => handleChange('ahrefsContentGaps', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Content gaps vs. competitors" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Ahrefs - Rank Tracker</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rank Position Tracking</label>
            <textarea rows={2} value={form.ahrefsRankPositionTracking} onChange={e => handleChange('ahrefsRankPositionTracking', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Keyword ranking changes" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Competitor Analysis</label>
            <textarea rows={2} value={form.ahrefsCompetitorAnalysis} onChange={e => handleChange('ahrefsCompetitorAnalysis', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Competitor ranking comparison" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Ahrefs - Competitor Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Competitor Backlinks</label>
            <textarea rows={2} value={form.ahrefsCompetitorBacklinks} onChange={e => handleChange('ahrefsCompetitorBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Competitor backlink sources" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keyword Gap Analysis</label>
            <textarea rows={2} value={form.ahrefsKeywordGapAnalysis} onChange={e => handleChange('ahrefsKeywordGapAnalysis', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Keywords competitors rank for but you don't" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Pages of Competitors</label>
            <textarea rows={2} value={form.ahrefsTopPagesOfCompetitors} onChange={e => handleChange('ahrefsTopPagesOfCompetitors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Competitor top pages" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Ahrefs - Link Intersect</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link Intersect</label>
            <textarea rows={2} value={form.ahrefsLinkIntersect} onChange={e => handleChange('ahrefsLinkIntersect', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Sites linking to competitors but not you" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-semibold text-blue-800 mb-2">Ahrefs - Disavow Tool</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disavow Toxic Backlinks</label>
            <textarea rows={2} value={form.ahrefsDisavowToxicBacklinks} onChange={e => handleChange('ahrefsDisavowToxicBacklinks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Disavow toxic backlinks" />
          </div>
        </div>
      </section>
    </form>
  );
};

export default AuditResultSummary; 