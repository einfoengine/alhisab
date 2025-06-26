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
  ahrefsCrawlReport: '',
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
      {/* 1. Search Performance Data */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-4 text-lg">Search Performance Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Google, Bing, Ahrefs fields combined */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Clicks</label>
            <input type="number" value={form.gscTotalClicks || form.searchClicks} onChange={e => handleChange('gscTotalClicks', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Impressions</label>
            <input type="number" value={form.gscTotalImpressions || form.searchImpressions} onChange={e => handleChange('gscTotalImpressions', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Click-Through Rate (CTR)</label>
            <input type="number" step="0.01" value={form.gscCTR || form.searchCTR} onChange={e => handleChange('gscCTR', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Position</label>
            <input type="number" step="0.01" value={form.gscAvgPosition || form.searchAvgPosition} onChange={e => handleChange('gscAvgPosition', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Queries</label>
            <textarea rows={2} value={form.gscTopQueries || form.searchQueries} onChange={e => handleChange('gscTopQueries', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Top search queries" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Pages</label>
            <textarea rows={2} value={form.gscTopPages || form.topPages || form.ahrefsTopOrganicPages} onChange={e => handleChange('gscTopPages', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Most popular pages" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Devices</label>
            <textarea rows={2} value={form.gscDevices} onChange={e => handleChange('gscDevices', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Desktop, mobile, tablet data" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Traffic</label>
            <input type="number" value={form.searchTraffic} onChange={e => handleChange('searchTraffic', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Traffic Value</label>
            <input type="number" value={form.ahrefsTrafficValue} onChange={e => handleChange('ahrefsTrafficValue', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
        </div>
      </section>
      {/* 2. Crawl Data */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-4 text-lg">Crawl Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Stats</label>
            <textarea rows={2} value={form.gscCrawlStats || form.crawlStats} onChange={e => handleChange('gscCrawlStats', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Googlebot/Bingbot crawling activity" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Stats Period</label>
            <input type="text" value={form.crawlStatsPeriod} onChange={e => handleChange('crawlStatsPeriod', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="e.g. Last 30 days" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Errors</label>
            <textarea rows={2} value={form.gscCrawlErrors || form.crawlErrors || form.ahrefsCrawlErrors} onChange={e => handleChange('gscCrawlErrors', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="404, 500, redirect errors" />
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
            <textarea rows={2} value={form.crawlRedirectIssues || form.redirectChains} onChange={e => handleChange('crawlRedirectIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Redirect issues/chains" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blocked URLs</label>
            <textarea rows={2} value={form.blockedUrls} onChange={e => handleChange('blockedUrls', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Blocked by robots.txt or meta tags" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Fetch</label>
            <textarea rows={2} value={form.urlFetch} onChange={e => handleChange('urlFetch', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Manual URL fetch requests" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Report</label>
            <textarea rows={2} value={form.ahrefsCrawlReport} onChange={e => handleChange('ahrefsCrawlReport', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Detailed crawl report" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Robots.txt Issues</label>
            <textarea rows={2} value={form.robotsIssues} onChange={e => handleChange('robotsIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Problems with robots.txt" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitemap Issues</label>
            <textarea rows={2} value={form.sitemapIssues} onChange={e => handleChange('sitemapIssues', e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Missing or misconfigured sitemap" />
          </div>
        </div>
      </section>
      {/* ... repeat for all other groups ... */}
    </form>
  );
};

export default AuditResultSummary; 