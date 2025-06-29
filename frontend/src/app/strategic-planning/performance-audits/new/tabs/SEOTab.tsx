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

// Platform-specific form components
const GoogleSearchConsoleForm = () => {
  const [gscData, setGscData] = useState({
    propertyUrl: '',
    totalClicks: '',
    totalImpressions: '',
    averageCTR: '',
    averagePosition: '',
    indexingIssues: '',
    mobileIssues: '',
    coreWebVitals: '',
    manualActions: '',
    sitemapStatus: '',
    richResults: '',
    internationalTargeting: '',
    securityIssues: '',
    recommendations: ''
  });

  const handleGscChange = (field: string, value: string) => {
    setGscData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-blue-600" />
        Google Search Console Audit
      </h4>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property URL</label>
          <input 
            type="url" 
            value={gscData.propertyUrl}
            onChange={(e) => handleGscChange('propertyUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="https://example.com" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Clicks (Last 28 days)</label>
            <input 
              type="number" 
              value={gscData.totalClicks}
              onChange={(e) => handleGscChange('totalClicks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Impressions (Last 28 days)</label>
            <input 
              type="number" 
              value={gscData.totalImpressions}
              onChange={(e) => handleGscChange('totalImpressions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average CTR (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gscData.averageCTR}
              onChange={(e) => handleGscChange('averageCTR', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average Position</label>
            <input 
              type="number" 
              step="0.1"
              value={gscData.averagePosition}
              onChange={(e) => handleGscChange('averagePosition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.0" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Indexing Issues Count</label>
          <input 
            type="number" 
            value={gscData.indexingIssues}
            onChange={(e) => handleGscChange('indexingIssues', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="0" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Usability Issues Count</label>
          <input 
            type="number" 
            value={gscData.mobileIssues}
            onChange={(e) => handleGscChange('mobileIssues', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="0" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Core Web Vitals Status</label>
          <select 
            value={gscData.coreWebVitals}
            onChange={(e) => handleGscChange('coreWebVitals', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select status</option>
            <option value="good">Good</option>
            <option value="needs-improvement">Needs Improvement</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Manual Actions</label>
          <select 
            value={gscData.manualActions}
            onChange={(e) => handleGscChange('manualActions', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select status</option>
            <option value="none">None</option>
            <option value="partial">Partial</option>
            <option value="manual">Manual Action</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sitemap Status</label>
          <select 
            value={gscData.sitemapStatus}
            onChange={(e) => handleGscChange('sitemapStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select status</option>
            <option value="success">Success</option>
            <option value="errors">Has Errors</option>
            <option value="not-submitted">Not Submitted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rich Results Implementation</label>
          <select 
            value={gscData.richResults}
            onChange={(e) => handleGscChange('richResults', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select status</option>
            <option value="implemented">Implemented</option>
            <option value="partial">Partially Implemented</option>
            <option value="not-implemented">Not Implemented</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">International Targeting</label>
          <select 
            value={gscData.internationalTargeting}
            onChange={(e) => handleGscChange('internationalTargeting', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select status</option>
            <option value="implemented">Implemented</option>
            <option value="partial">Partially Implemented</option>
            <option value="not-implemented">Not Implemented</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Security Issues</label>
          <select 
            value={gscData.securityIssues}
            onChange={(e) => handleGscChange('securityIssues', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select status</option>
            <option value="none">None</option>
            <option value="hacked">Hacked Content</option>
            <option value="malware">Malware</option>
            <option value="spam">Spam</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Recommendations</label>
          <textarea 
            rows={3} 
            value={gscData.recommendations}
            onChange={(e) => handleGscChange('recommendations', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="Priority fixes, optimization suggestions, action items..." 
          />
        </div>
      </div>
    </div>
  );
};

const GoogleAnalyticsForm = () => {
  const [gaData, setGaData] = useState({
    propertyId: '',
    totalSessions: '',
    totalUsers: '',
    bounceRate: '',
    avgSessionDuration: '',
    pagesPerSession: '',
    organicTraffic: '',
    directTraffic: '',
    referralTraffic: '',
    socialTraffic: '',
    conversionRate: '',
    goalCompletions: '',
    ecommerceRevenue: '',
    mobileTraffic: '',
    desktopTraffic: '',
    tabletTraffic: '',
    topLandingPages: '',
    recommendations: ''
  });

  const handleGaChange = (field: string, value: string) => {
    setGaData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ChartBarIcon className="w-5 h-5 mr-2 text-green-600" />
        Google Analytics Audit
      </h4>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GA4 Property ID</label>
          <input 
            type="text" 
            value={gaData.propertyId}
            onChange={(e) => handleGaChange('propertyId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="123456789" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Sessions (Last 30 days)</label>
            <input 
              type="number" 
              value={gaData.totalSessions}
              onChange={(e) => handleGaChange('totalSessions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Users (Last 30 days)</label>
            <input 
              type="number" 
              value={gaData.totalUsers}
              onChange={(e) => handleGaChange('totalUsers', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bounce Rate (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.bounceRate}
              onChange={(e) => handleGaChange('bounceRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avg Session Duration (seconds)</label>
            <input 
              type="number" 
              step="0.1"
              value={gaData.avgSessionDuration}
              onChange={(e) => handleGaChange('avgSessionDuration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.0" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pages Per Session</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.pagesPerSession}
              onChange={(e) => handleGaChange('pagesPerSession', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.conversionRate}
              onChange={(e) => handleGaChange('conversionRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Traffic (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.organicTraffic}
              onChange={(e) => handleGaChange('organicTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Direct Traffic (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.directTraffic}
              onChange={(e) => handleGaChange('directTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Referral Traffic (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.referralTraffic}
              onChange={(e) => handleGaChange('referralTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Traffic (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.socialTraffic}
              onChange={(e) => handleGaChange('socialTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal Completions</label>
            <input 
              type="number" 
              value={gaData.goalCompletions}
              onChange={(e) => handleGaChange('goalCompletions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ecommerce Revenue ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.ecommerceRevenue}
              onChange={(e) => handleGaChange('ecommerceRevenue', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Traffic (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.mobileTraffic}
              onChange={(e) => handleGaChange('mobileTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Desktop Traffic (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.desktopTraffic}
              onChange={(e) => handleGaChange('desktopTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tablet Traffic (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={gaData.tabletTraffic}
              onChange={(e) => handleGaChange('tabletTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Top Landing Pages (comma-separated)</label>
          <input 
            type="text" 
            value={gaData.topLandingPages}
            onChange={(e) => handleGaChange('topLandingPages', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="/home, /about, /contact" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Analytics Recommendations</label>
          <textarea 
            rows={3} 
            value={gaData.recommendations}
            onChange={(e) => handleGaChange('recommendations', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="Optimization suggestions, missing tracking, data quality improvements..." 
          />
        </div>
      </div>
    </div>
  );
};

const SEMrushForm = () => {
  const [semrushData, setSemrushData] = useState({
    // Basic Domain Info
    domain: '',
    domainAuthority: '',
    organicKeywords: '',
    organicTraffic: '',
    trafficValue: '',
    organicVisibility: '',
    
    // Site Health Score
    overallHealthScore: '',
    criticalErrors: '',
    warnings: '',
    notices: '',
    
    // Crawlability & Indexing
    crawlabilityIssues: '',
    indexedPages: '',
    urlStructure: '',
    crawlErrors: '',
    redirectIssues: '',
    robotsTxtIssues: '',
    
    // On-Page SEO
    metaTagIssues: '',
    headingIssues: '',
    duplicateContent: '',
    imageOptimization: '',
    internalLinking: '',
    structuredData: '',
    anchorTextAnalysis: '',
    
    // Backlink Profile
    totalBacklinks: '',
    referringDomains: '',
    backlinkGrowth: '',
    toxicBacklinks: '',
    backlinkDistribution: '',
    backlinkAnchorText: '',
    
    // Site Speed (Technical SEO)
    pageLoadTime: '',
    coreWebVitals: '',
    speedOptimization: '',
    mobilePageSpeed: '',
    
    // Mobile Usability
    mobileFriendliness: '',
    mobileUsabilityIssues: '',
    
    // Security & Malware
    httpsImplementation: '',
    malwareAlerts: '',
    sslCertificateIssues: '',
    
    // Content Strategy & Optimization
    contentEffectiveness: '',
    contentPerformance: '',
    keywordCannibalization: '',
    contentOptimization: '',
    targetKeywordAnalysis: '',
    topicResearch: '',
    contentDuplication: '',
    
    // User Experience (UX)
    bounceRate: '',
    exitRate: '',
    timeOnPage: '',
    sessionDuration: '',
    pageDepth: '',
    conversionRate: '',
    
    // Structured Data & Rich Snippets
    richSnippetsPerformance: '',
    structuredDataErrors: '',
    richResultMonitoring: '',
    featuredSnippetsTracking: '',
    
    // SEO for Voice Search
    voiceSearchOptimization: '',
    featuredSnippetFocus: '',
    longTailVoiceKeywords: '',
    
    // Link Building Opportunities
    competitorBacklinkAnalysis: '',
    linkVelocity: '',
    linkDetox: '',
    linkIntersectTool: '',
    backlinkQuality: '',
    
    // Crawl Budget Optimization
    crawlBudgetAnalysis: '',
    orphanPageOptimization: '',
    duplicateContentManagement: '',
    
    // Local SEO Enhancements
    googleMyBusinessOptimization: '',
    localKeywordTracking: '',
    localCitationBuilding: '',
    gmbAudit: '',
    
    // Social Media & Brand Mentions
    socialMediaIntegration: '',
    socialSignals: '',
    brandMentionsMonitoring: '',
    
    // Competitor Benchmarking
    competitorKeywordRankings: '',
    competitorBacklinks: '',
    competitorTraffic: '',
    marketShare: '',
    
    // International SEO
    globalKeywordRankings: '',
    countrySpecificReports: '',
    internationalBacklinkStrategy: '',
    multilingualSEO: '',
    
    // SEO for E-commerce Sites
    productPageOptimization: '',
    productReviewOptimization: '',
    breadcrumbsAnalysis: '',
    facetedNavigation: '',
    
    // Search Intent & User Engagement
    searchIntentClassification: '',
    userEngagementMetrics: '',
    userIntentContent: '',
    
    // SEO Monitoring and Alerts
    realTimeAlerts: '',
    keywordMonitoringAlerts: '',
    customAlerts: '',
    
    // SEO for International Websites
    countrySpecificResults: '',
    languageSpecificKeywords: '',
    internationalBacklinkProfile: '',
    crossBorderSEO: '',
    
    // Keyword Analysis
    totalKeywords: '',
    keywordsTop3: '',
    keywordsTop10: '',
    keywordsTop100: '',
    featuredSnippets: '',
    questionKeywords: '',
    longTailKeywords: '',
    commercialKeywords: '',
    informationalKeywords: '',
    navigationalKeywords: '',
    
    // Keyword Tracking
    primaryKeywords: '',
    secondaryKeywords: '',
    highVolumeKeywords: '',
    lowCompetitionKeywords: '',
    featuredSnippetKeywords: '',
    questionBasedKeywords: '',
    brandKeywords: '',
    keywordOpportunities: '',
    seasonalKeywords: '',
    trendingKeywords: '',
    longTailOpportunities: '',
    commercialIntentKeywords: '',
    informationalIntentKeywords: '',
    navigationalIntentKeywords: '',
    transactionalKeywords: '',
    
    // Traffic Analysis
    trafficTrend: '',
    trafficSeasonality: '',
    trafficByCountry: '',
    trafficByDevice: '',
    trafficByPage: '',
    trafficValueByKeyword: '',
    
    // Competitor Analysis
    topCompetitors: '',
    competitorKeywords: '',
    keywordGaps: '',
    competitorTraffic: '',
    competitorBacklinks: '',
    competitivePosition: '',
    
    // Recommendations
    priorityActions: '',
    quickWins: '',
    longTermStrategy: '',
    resourceAllocation: '',
    competitiveAdvantages: '',
    
    // Technical SEO - Advanced
    javascriptSEO: '',
    crawlDepthAnalysis: '',
    internalLinkingIssues: '',
    canonicalTags: '',
    hreflangImplementation: '',
    xmlSitemapIssues: '',
    robotsTxtAnalysis: '',
    serverResponseTime: '',
    pageSpeedOptimization: '',
    mobileFirstIndexing: '',
    ampImplementation: '',
    progressiveWebApp: '',
    structuredDataErrors: '',
    breadcrumbImplementation: '',
    paginationIssues: '',
    facetedNavigation: '',
    infiniteScroll: '',
    lazyLoading: '',
    compressionIssues: '',
    cachingConfiguration: '',
    cdnImplementation: '',
    securityHeaders: '',
    mixedContentIssues: '',
    certificateIssues: '',
    redirectChains: '',
    brokenRedirects: '',
    orphanPages: '',
    crawlBudgetWaste: '',
    duplicateTitles: '',
    duplicateMetaDescriptions: '',
    missingAltText: '',
    oversizedImages: '',
    unoptimizedImages: '',
    missingFavicon: '',
    viewportIssues: '',
    touchTargetIssues: '',
    fontLoadingIssues: '',
    renderBlockingResources: '',
    unusedCSS: '',
    unusedJavaScript: '',
    minificationIssues: '',
    gzipCompression: '',
    browserCaching: '',
    databaseOptimization: '',
    serverConfiguration: '',
    hostingPerformance: '',
    dnsIssues: '',
    sslConfiguration: '',
    http2Implementation: '',
    resourceHints: '',
    preloadImplementation: '',
    prefetchImplementation: '',
    dnsPrefetch: '',
    preconnectImplementation: ''
  });

  const handleSemrushChange = (field: string, value: string) => {
    setSemrushData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <DocumentTextIcon className="w-5 h-5 mr-2 text-orange-600" />
        SEMrush Comprehensive SEO Audit
      </h4>
      
      {/* Domain Overview */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Domain Overview</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
            <input 
              type="text" 
              value={semrushData.domain}
              onChange={(e) => handleSemrushChange('domain', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domain Authority</label>
            <input 
              type="number" 
              min="0" max="100"
              value={semrushData.domainAuthority}
              onChange={(e) => handleSemrushChange('domainAuthority', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0-100" 
            />
          </div>
        </div>
      </div>

      {/* Site Health Score */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Site Health Score</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Overall Health Score (%)</label>
            <input 
              type="number" 
              min="0" max="100"
              value={semrushData.overallHealthScore}
              onChange={(e) => handleSemrushChange('overallHealthScore', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0-100" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Critical Errors</label>
            <input 
              type="number" 
              value={semrushData.criticalErrors}
              onChange={(e) => handleSemrushChange('criticalErrors', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Warnings</label>
            <input 
              type="number" 
              value={semrushData.warnings}
              onChange={(e) => handleSemrushChange('warnings', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notices</label>
            <input 
              type="number" 
              value={semrushData.notices}
              onChange={(e) => handleSemrushChange('notices', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Crawlability & Indexing */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Crawlability & Indexing</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crawlability Issues</label>
            <input 
              type="number" 
              value={semrushData.crawlabilityIssues}
              onChange={(e) => handleSemrushChange('crawlabilityIssues', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Indexed Pages</label>
            <input 
              type="number" 
              value={semrushData.indexedPages}
              onChange={(e) => handleSemrushChange('indexedPages', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crawl Errors</label>
            <input 
              type="number" 
              value={semrushData.crawlErrors}
              onChange={(e) => handleSemrushChange('crawlErrors', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Redirect Issues</label>
            <input 
              type="number" 
              value={semrushData.redirectIssues}
              onChange={(e) => handleSemrushChange('redirectIssues', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* On-Page SEO */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">On-Page SEO</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Tag Issues</label>
            <input 
              type="number" 
              value={semrushData.metaTagIssues}
              onChange={(e) => handleSemrushChange('metaTagIssues', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heading Issues</label>
            <input 
              type="number" 
              value={semrushData.headingIssues}
              onChange={(e) => handleSemrushChange('headingIssues', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duplicate Content</label>
            <input 
              type="number" 
              value={semrushData.duplicateContent}
              onChange={(e) => handleSemrushChange('duplicateContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Optimization</label>
            <input 
              type="number" 
              value={semrushData.imageOptimization}
              onChange={(e) => handleSemrushChange('imageOptimization', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Backlink Profile */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Backlink Profile</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Backlinks</label>
            <input 
              type="number" 
              value={semrushData.totalBacklinks}
              onChange={(e) => handleSemrushChange('totalBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Referring Domains</label>
            <input 
              type="number" 
              value={semrushData.referringDomains}
              onChange={(e) => handleSemrushChange('referringDomains', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Toxic Backlinks</label>
            <input 
              type="number" 
              value={semrushData.toxicBacklinks}
              onChange={(e) => handleSemrushChange('toxicBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Site Speed */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Site Speed (Technical SEO)</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Load Time (seconds)</label>
            <input 
              type="number" 
              step="0.1"
              value={semrushData.pageLoadTime}
              onChange={(e) => handleSemrushChange('pageLoadTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Page Speed</label>
            <select 
              value={semrushData.mobilePageSpeed}
              onChange={(e) => handleSemrushChange('mobilePageSpeed', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select speed</option>
              <option value="fast">Fast</option>
              <option value="moderate">Moderate</option>
              <option value="slow">Slow</option>
              <option value="very-slow">Very Slow</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Core Web Vitals Status</label>
          <select 
            value={semrushData.coreWebVitals}
            onChange={(e) => handleSemrushChange('coreWebVitals', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select status</option>
            <option value="good">Good</option>
            <option value="needs-improvement">Needs Improvement</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>

      {/* Mobile Usability */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Mobile Usability</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Friendliness</label>
            <select 
              value={semrushData.mobileFriendliness}
              onChange={(e) => handleSemrushChange('mobileFriendliness', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select status</option>
              <option value="mobile-friendly">Mobile Friendly</option>
              <option value="not-mobile-friendly">Not Mobile Friendly</option>
              <option value="needs-improvement">Needs Improvement</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Usability Issues</label>
            <input 
              type="number" 
              value={semrushData.mobileUsabilityIssues}
              onChange={(e) => handleSemrushChange('mobileUsabilityIssues', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Security & Malware */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Security & Malware</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HTTPS Implementation</label>
            <select 
              value={semrushData.httpsImplementation}
              onChange={(e) => handleSemrushChange('httpsImplementation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select status</option>
              <option value="implemented">Implemented</option>
              <option value="partial">Partially Implemented</option>
              <option value="not-implemented">Not Implemented</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Malware Alerts</label>
            <input 
              type="number" 
              value={semrushData.malwareAlerts}
              onChange={(e) => handleSemrushChange('malwareAlerts', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* User Experience (UX) */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">User Experience (UX)</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bounce Rate (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={semrushData.bounceRate}
              onChange={(e) => handleSemrushChange('bounceRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exit Rate (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={semrushData.exitRate}
              onChange={(e) => handleSemrushChange('exitRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time on Page (seconds)</label>
            <input 
              type="number" 
              step="0.1"
              value={semrushData.timeOnPage}
              onChange={(e) => handleSemrushChange('timeOnPage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={semrushData.conversionRate}
              onChange={(e) => handleSemrushChange('conversionRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>
      </div>

      {/* Structured Data & Rich Snippets */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Structured Data & Rich Snippets</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rich Snippets Performance</label>
            <input 
              type="number" 
              value={semrushData.richSnippetsPerformance}
              onChange={(e) => handleSemrushChange('richSnippetsPerformance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Structured Data Errors</label>
            <input 
              type="number" 
              value={semrushData.structuredDataErrors}
              onChange={(e) => handleSemrushChange('structuredDataErrors', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Local SEO */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Local SEO Enhancements</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google My Business Optimization</label>
            <select 
              value={semrushData.googleMyBusinessOptimization}
              onChange={(e) => handleSemrushChange('googleMyBusinessOptimization', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select status</option>
              <option value="optimized">Optimized</option>
              <option value="partially-optimized">Partially Optimized</option>
              <option value="not-optimized">Not Optimized</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Local Citation Building</label>
            <input 
              type="number" 
              value={semrushData.localCitationBuilding}
              onChange={(e) => handleSemrushChange('localCitationBuilding', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Competitor Benchmarking */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Competitor Benchmarking</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Share (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={semrushData.marketShare}
              onChange={(e) => handleSemrushChange('marketShare', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Keywords</label>
            <input 
              type="number" 
              value={semrushData.competitorKeywords}
              onChange={(e) => handleSemrushChange('competitorKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Keyword Analysis */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Keyword Analysis</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Keywords</label>
            <input 
              type="number" 
              value={semrushData.totalKeywords}
              onChange={(e) => handleSemrushChange('totalKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords in Top 3</label>
            <input 
              type="number" 
              value={semrushData.keywordsTop3}
              onChange={(e) => handleSemrushChange('keywordsTop3', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords in Top 10</label>
            <input 
              type="number" 
              value={semrushData.keywordsTop10}
              onChange={(e) => handleSemrushChange('keywordsTop10', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Keyword Tracking */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Keyword Tracking</h5>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              value={semrushData.primaryKeywords}
              onChange={(e) => handleSemrushChange('primaryKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="keyword1, keyword2, keyword3" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">High Volume Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              value={semrushData.highVolumeKeywords}
              onChange={(e) => handleSemrushChange('highVolumeKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="keyword1, keyword2, keyword3" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Snippet Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              value={semrushData.featuredSnippetKeywords}
              onChange={(e) => handleSemrushChange('featuredSnippetKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="keyword1, keyword2, keyword3" 
            />
          </div>
        </div>
      </div>

      {/* Traffic Analysis */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Traffic Analysis</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Traffic (Monthly)</label>
            <input 
              type="number" 
              value={semrushData.organicTraffic}
              onChange={(e) => handleSemrushChange('organicTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Traffic Value ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={semrushData.trafficValue}
              onChange={(e) => handleSemrushChange('trafficValue', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Recommendations</h5>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Actions</label>
            <textarea 
              rows={3} 
              value={semrushData.priorityActions}
              onChange={(e) => handleSemrushChange('priorityActions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="High-priority optimization actions, quick wins..." 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Long-term Strategy</label>
            <textarea 
              rows={3} 
              value={semrushData.longTermStrategy}
              onChange={(e) => handleSemrushChange('longTermStrategy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Long-term strategy recommendations, resource allocation..." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AhrefsForm = () => {
  const [ahrefsData, setAhrefsData] = useState({
    domain: '',
    domainRating: '',
    totalKeywords: '',
    keywordsTop3: '',
    keywordsTop10: '',
    keywordsTop100: '',
    featuredSnippets: '',
    questionKeywords: '',
    longTailKeywords: '',
    keywordsWithTraffic: '',
    keywordsWithoutTraffic: '',
    keywordsDifficulty: '',
    trafficValue: '',
    organicVisibility: '',
    trafficShare: '',
    topCompetitors: '',
    competitorKeywords: '',
    keywordGaps: '',
    competitorTraffic: '',
    competitorBacklinks: '',
    marketShare: '',
    competitivePosition: '',
    competitorOverlap: '',
    totalBacklinks: '',
    referringDomains: '',
    dofollowBacklinks: '',
    nofollowBacklinks: '',
    govBacklinks: '',
    eduBacklinks: '',
    spamScore: '',
    toxicBacklinks: '',
    lostBacklinks: '',
    newBacklinks: '',
    backlinkVelocity: '',
    anchorTextDistribution: '',
    linkTypes: '',
    linkQuality: '',
    linkValue: '',
    technicalIssues: '',
    onPageIssues: '',
    crawlErrors: '',
    brokenLinks: '',
    duplicateContent: '',
    missingMetaTags: '',
    slowPages: '',
    mobileIssues: '',
    securityIssues: '',
    sitemapIssues: '',
    healthScore: '',
    contentIdeas: '',
    contentGaps: '',
    topContent: '',
    underperformingContent: '',
    contentLength: '',
    contentFreshness: '',
    contentEngagement: '',
    viralContent: '',
    contentROI: '',
    localKeywords: '',
    localPackRankings: '',
    localCitations: '',
    googleMyBusiness: '',
    localCompetitors: '',
    localTraffic: '',
    localVisibility: '',
    trackedKeywords: '',
    rankingChanges: '',
    serpFeatures: '',
    featuredSnippetsRankings: '',
    localPackFeatures: '',
    shoppingResults: '',
    videoResults: '',
    imageResults: '',
    newsResults: '',
    rankingVolatility: '',
    keywordOpportunities: '',
    highPotentialKeywords: '',
    seasonalKeywords: '',
    missingTopics: '',
    contentOptimization: '',
    competitorContent: '',
    contentStrategy: '',
    contentCalendar: '',
    gapContentROI: '',
    subdomainAnalysis: '',
    pageAnalysis: '',
    internalLinking: '',
    topPages: '',
    pagePerformance: '',
    pageOptimization: '',
    rankingAlerts: '',
    backlinkAlerts: '',
    competitorAlerts: '',
    serpFeatureAlerts: '',
    trafficAlerts: '',
    priorityActions: '',
    quickWins: '',
    longTermStrategy: '',
    resourceAllocation: '',
    competitiveAdvantages: ''
  });

  const handleAhrefsChange = (field: string, value: string) => {
    setAhrefsData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <LinkIcon className="w-5 h-5 mr-2 text-purple-600" />
        Ahrefs Comprehensive Audit
      </h4>
      
      {/* Domain Overview */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Domain Overview</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
            <input 
              type="text" 
              value={ahrefsData.domain}
              onChange={(e) => handleAhrefsChange('domain', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domain Rating</label>
            <input 
              type="number" 
              min="0" max="100"
              value={ahrefsData.domainRating}
              onChange={(e) => handleAhrefsChange('domainRating', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0-100" 
            />
          </div>
        </div>
      </div>

      {/* Keyword Analysis */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Keyword Analysis</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Keywords</label>
            <input 
              type="number" 
              value={ahrefsData.totalKeywords}
              onChange={(e) => handleAhrefsChange('totalKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords in Top 3</label>
            <input 
              type="number" 
              value={ahrefsData.keywordsTop3}
              onChange={(e) => handleAhrefsChange('keywordsTop3', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords in Top 10</label>
            <input 
              type="number" 
              value={ahrefsData.keywordsTop10}
              onChange={(e) => handleAhrefsChange('keywordsTop10', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Snippets</label>
            <input 
              type="number" 
              value={ahrefsData.featuredSnippets}
              onChange={(e) => handleAhrefsChange('featuredSnippets', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question Keywords</label>
            <input 
              type="number" 
              value={ahrefsData.questionKeywords}
              onChange={(e) => handleAhrefsChange('questionKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords with Traffic</label>
            <input 
              type="number" 
              value={ahrefsData.keywordsWithTraffic}
              onChange={(e) => handleAhrefsChange('keywordsWithTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords without Traffic</label>
            <input 
              type="number" 
              value={ahrefsData.keywordsWithoutTraffic}
              onChange={(e) => handleAhrefsChange('keywordsWithoutTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average Keyword Difficulty</label>
            <input 
              type="number" 
              min="0" max="100"
              value={ahrefsData.keywordsDifficulty}
              onChange={(e) => handleAhrefsChange('keywordsDifficulty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0-100" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Long-tail Keywords</label>
            <input 
              type="number" 
              value={ahrefsData.longTailKeywords}
              onChange={(e) => handleAhrefsChange('longTailKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Keyword Tracking */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Keyword Tracking</h5>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="keyword1, keyword2, keyword3" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="keyword1, keyword2, keyword3" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">High Volume Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="keyword1, keyword2, keyword3" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Snippet Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="keyword1, keyword2, keyword3" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question-Based Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="what is, how to, why does" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="brand name, brand variations" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trending Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="trending keyword1, trending keyword2" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Commercial Intent Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="buy, purchase, best, review" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transactional Keywords (comma-separated)</label>
            <textarea 
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="buy now, order, shop, price" 
            />
          </div>
        </div>
      </div>

      {/* Traffic Analysis */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Traffic Analysis</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Traffic (Monthly)</label>
            <input 
              type="number" 
              value={ahrefsData.organicTraffic}
              onChange={(e) => handleAhrefsChange('organicTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Traffic Value ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={ahrefsData.trafficValue}
              onChange={(e) => handleAhrefsChange('trafficValue', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Visibility (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={ahrefsData.organicVisibility}
              onChange={(e) => handleAhrefsChange('organicVisibility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Traffic Share (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={ahrefsData.trafficShare}
              onChange={(e) => handleAhrefsChange('trafficShare', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Competitor Analysis</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Competitors (comma-separated)</label>
            <input 
              type="text" 
              value={ahrefsData.topCompetitors}
              onChange={(e) => handleAhrefsChange('topCompetitors', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="competitor1.com, competitor2.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Keywords</label>
            <input 
              type="number" 
              value={ahrefsData.competitorKeywords}
              onChange={(e) => handleAhrefsChange('competitorKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keyword Gaps Count</label>
            <input 
              type="number" 
              value={ahrefsData.keywordGaps}
              onChange={(e) => handleAhrefsChange('keywordGaps', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Overlap (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={ahrefsData.competitorOverlap}
              onChange={(e) => handleAhrefsChange('competitorOverlap', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>
      </div>

      {/* Backlink Profile */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Backlink Profile</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Backlinks</label>
            <input 
              type="number" 
              value={ahrefsData.totalBacklinks}
              onChange={(e) => handleAhrefsChange('totalBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Referring Domains</label>
            <input 
              type="number" 
              value={ahrefsData.referringDomains}
              onChange={(e) => handleAhrefsChange('referringDomains', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dofollow Backlinks</label>
            <input 
              type="number" 
              value={ahrefsData.dofollowBacklinks}
              onChange={(e) => handleAhrefsChange('dofollowBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nofollow Backlinks</label>
            <input 
              type="number" 
              value={ahrefsData.nofollowBacklinks}
              onChange={(e) => handleAhrefsChange('nofollowBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gov Backlinks</label>
            <input 
              type="number" 
              value={ahrefsData.govBacklinks}
              onChange={(e) => handleAhrefsChange('govBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Edu Backlinks</label>
            <input 
              type="number" 
              value={ahrefsData.eduBacklinks}
              onChange={(e) => handleAhrefsChange('eduBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spam Score</label>
            <input 
              type="number" 
              min="0" max="17"
              value={ahrefsData.spamScore}
              onChange={(e) => handleAhrefsChange('spamScore', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0-17" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Toxic Backlinks</label>
            <input 
              type="number" 
              value={ahrefsData.toxicBacklinks}
              onChange={(e) => handleAhrefsChange('toxicBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lost Backlinks</label>
            <input 
              type="number" 
              value={ahrefsData.lostBacklinks}
              onChange={(e) => handleAhrefsChange('lostBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Backlinks</label>
            <input 
              type="number" 
              value={ahrefsData.newBacklinks}
              onChange={(e) => handleAhrefsChange('newBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backlink Velocity</label>
            <input 
              type="number" 
              value={ahrefsData.backlinkVelocity}
              onChange={(e) => handleAhrefsChange('backlinkVelocity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link Value ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={ahrefsData.linkValue}
              onChange={(e) => handleAhrefsChange('linkValue', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>
      </div>

      {/* Site Audit */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Site Audit</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technical Issues</label>
            <input 
              type="number" 
              value={ahrefsData.technicalIssues}
              onChange={(e) => handleAhrefsChange('technicalIssues', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">On-Page Issues</label>
            <input 
              type="number" 
              value={ahrefsData.onPageIssues}
              onChange={(e) => handleAhrefsChange('onPageIssues', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Health Score</label>
            <input 
              type="number" 
              min="0" max="100"
              value={ahrefsData.healthScore}
              onChange={(e) => handleAhrefsChange('healthScore', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0-100" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crawl Errors</label>
            <input 
              type="number" 
              value={ahrefsData.crawlErrors}
              onChange={(e) => handleAhrefsChange('crawlErrors', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Broken Links</label>
            <input 
              type="number" 
              value={ahrefsData.brokenLinks}
              onChange={(e) => handleAhrefsChange('brokenLinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duplicate Content</label>
            <input 
              type="number" 
              value={ahrefsData.duplicateContent}
              onChange={(e) => handleAhrefsChange('duplicateContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Content Explorer */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Content Explorer</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Ideas Count</label>
            <input 
              type="number" 
              value={ahrefsData.contentIdeas}
              onChange={(e) => handleAhrefsChange('contentIdeas', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Gaps Count</label>
            <input 
              type="number" 
              value={ahrefsData.contentGaps}
              onChange={(e) => handleAhrefsChange('contentGaps', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Performing Content</label>
            <input 
              type="number" 
              value={ahrefsData.topContent}
              onChange={(e) => handleAhrefsChange('topContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Viral Content Potential</label>
            <select 
              value={ahrefsData.viralContent}
              onChange={(e) => handleAhrefsChange('viralContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select potential</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rank Tracker */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Rank Tracker</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tracked Keywords</label>
            <input 
              type="number" 
              value={ahrefsData.trackedKeywords}
              onChange={(e) => handleAhrefsChange('trackedKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ranking Changes</label>
            <input 
              type="number" 
              value={ahrefsData.rankingChanges}
              onChange={(e) => handleAhrefsChange('rankingChanges', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SERP Features</label>
            <input 
              type="number" 
              value={ahrefsData.serpFeatures}
              onChange={(e) => handleAhrefsChange('serpFeatures', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Snippets Rankings</label>
            <input 
              type="number" 
              value={ahrefsData.featuredSnippetsRankings}
              onChange={(e) => handleAhrefsChange('featuredSnippetsRankings', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Keyword Research */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Keyword Research</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keyword Opportunities</label>
            <input 
              type="number" 
              value={ahrefsData.keywordOpportunities}
              onChange={(e) => handleAhrefsChange('keywordOpportunities', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Low Competition Keywords</label>
            <input 
              type="number" 
              value={ahrefsData.lowCompetitionKeywords}
              onChange={(e) => handleAhrefsChange('lowCompetitionKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">High Potential Keywords</label>
            <input 
              type="number" 
              value={ahrefsData.highPotentialKeywords}
              onChange={(e) => handleAhrefsChange('highPotentialKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Keywords</label>
            <input 
              type="number" 
              value={ahrefsData.buyerKeywords}
              onChange={(e) => handleAhrefsChange('buyerKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Local SEO */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Local SEO</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Local Keywords</label>
            <input 
              type="number" 
              value={ahrefsData.localKeywords}
              onChange={(e) => handleAhrefsChange('localKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Local Pack Rankings</label>
            <input 
              type="number" 
              value={ahrefsData.localPackRankings}
              onChange={(e) => handleAhrefsChange('localPackRankings', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Local Citations</label>
            <input 
              type="number" 
              value={ahrefsData.localCitations}
              onChange={(e) => handleAhrefsChange('localCitations', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Local Visibility (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={ahrefsData.localVisibility}
              onChange={(e) => handleAhrefsChange('localVisibility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Alerts</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ranking Alerts</label>
            <input 
              type="number" 
              value={ahrefsData.rankingAlerts}
              onChange={(e) => handleAhrefsChange('rankingAlerts', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backlink Alerts</label>
            <input 
              type="number" 
              value={ahrefsData.backlinkAlerts}
              onChange={(e) => handleAhrefsChange('backlinkAlerts', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-8">
        <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Recommendations</h5>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Actions</label>
            <textarea 
              rows={3} 
              value={ahrefsData.priorityActions}
              onChange={(e) => handleAhrefsChange('priorityActions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="High-priority optimization actions, quick wins..." 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Long-term Strategy</label>
            <textarea 
              rows={3} 
              value={ahrefsData.longTermStrategy}
              onChange={(e) => handleAhrefsChange('longTermStrategy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Long-term strategy recommendations, resource allocation..." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MozForm = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <GlobeAltIcon className="w-5 h-5 mr-2 text-blue-600" />
      Moz Audit
    </h4>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Domain Overview</label>
        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="example.com" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Domain Authority & Page Authority</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Domain Authority score, Page Authority scores, authority distribution, authority building opportunities..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Organic Keywords Analysis</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Total keywords, ranking positions, search volume, keyword difficulty, traffic potential, keyword trends..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Organic Traffic Overview</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Traffic trends, traffic value, organic visibility, traffic distribution by country, seasonal patterns..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Backlink Profile Analysis</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Total backlinks, referring domains, backlink types, anchor text distribution, link velocity, link quality..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Spam Score Analysis</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Spam score distribution, toxic links identification, link quality assessment, link cleanup opportunities..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">MozBar Analysis - On-Page Elements</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Title tag optimization, meta description quality, heading structure, image optimization, internal linking..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">MozBar Analysis - Page Authority</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Page Authority scores, authority distribution, authority building opportunities, internal linking strategy..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Keyword Explorer - Keyword Research</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Keyword suggestions, search volume, keyword difficulty, organic CTR, priority scores, keyword opportunities..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Keyword Explorer - SERP Analysis</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="SERP features, featured snippets, People Also Ask, local packs, shopping results, competitor analysis..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Link Explorer - Backlink Analysis</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Backlink profile, link quality, anchor text analysis, link building opportunities, competitor backlinks..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Link Explorer - Link Intersection</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Common referring domains, shared backlinks, link building opportunities, competitor analysis..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Crawl - Technical Issues</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Crawl errors, broken links, duplicate content, missing meta tags, technical SEO issues..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Crawl - On-Page Issues</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Title tag issues, meta description problems, heading structure, image optimization, internal linking..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rank Tracker - Keyword Performance</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Keyword ranking changes, SERP features, featured snippets, local pack rankings, ranking volatility..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rank Tracker - Competitor Analysis</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Competitor rankings, ranking comparison, competitive analysis, market positioning..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Local SEO - Local Rankings</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Local keyword rankings, local pack performance, local search optimization, local keyword opportunities..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Local SEO - Local Citations</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Local directory listings, citation consistency, local link building, local SEO optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Moz Recommendations - Priority Actions</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Priority actions, quick wins, long-term strategy, resource allocation, ROI optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Moz Recommendations - Strategic Insights</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Strategic insights, market opportunities, competitive positioning, growth strategies..." />
      </div>
    </div>
  </div>
);

const ScreamingFrogForm = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <CogIcon className="w-5 h-5 mr-2 text-green-600" />
      Screaming Frog Audit
    </h4>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Crawl Configuration</label>
        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Crawl settings, robots.txt, sitemap, crawl depth, follow links..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Crawl Overview - URLs Found</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Total URLs crawled, unique URLs, redirects, blocked URLs, crawl efficiency, crawl statistics..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Crawl Overview - Response Codes</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="HTTP status codes, 404 errors, 500 errors, redirect chains, broken links, server issues..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical SEO - Meta Tags</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Missing title tags, duplicate titles, title length issues, missing meta descriptions, duplicate descriptions..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical SEO - Headings</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Missing H1 tags, multiple H1 tags, heading structure, heading hierarchy, heading optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical SEO - Images</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Missing alt text, large images, image optimization, image compression, image file names..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical SEO - Links</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Broken links, internal links, external links, nofollow links, link text analysis..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical SEO - Duplicate Content</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Duplicate titles, duplicate meta descriptions, duplicate content, canonical issues, hreflang problems..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical SEO - Schema Markup</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Schema markup implementation, structured data errors, missing schema, schema validation..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical SEO - XML Sitemap</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="XML sitemap issues, sitemap errors, missing sitemaps, sitemap optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical SEO - Robots.txt</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Robots.txt analysis, disallow rules, allow rules, robots.txt optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Performance - Page Speed</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Page load times, Core Web Vitals, performance issues, optimization opportunities..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Performance - Resource Optimization</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="CSS optimization, JavaScript optimization, image optimization, resource compression..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile - Mobile Usability</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Mobile-friendly issues, viewport problems, touch elements, mobile optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile - AMP Implementation</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="AMP pages, AMP validation, AMP optimization, mobile performance..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Security - SSL/HTTPS</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="SSL certificate issues, mixed content, HTTPS implementation, security problems..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Security - Security Headers</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Security headers, CSP headers, HSTS implementation, security configuration..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Screaming Frog Recommendations - Priority Fixes</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Priority technical fixes, critical issues, optimization recommendations, action items..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Screaming Frog Recommendations - Technical Strategy</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Technical SEO strategy, long-term improvements, monitoring recommendations..." />
      </div>
    </div>
  </div>
);

const GooglePageSpeedForm = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <DevicePhoneMobileIcon className="w-5 h-5 mr-2 text-green-600" />
      Google PageSpeed Audit
    </h4>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Page URL</label>
        <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="https://example.com/page" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Performance Score - Mobile</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Mobile performance score, Core Web Vitals, LCP, FID, CLS scores, mobile optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Performance Score - Desktop</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Desktop performance score, Core Web Vitals, LCP, FID, CLS scores, desktop optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Core Web Vitals - LCP (Largest Contentful Paint)</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="LCP scores, LCP optimization, image optimization, server response times, resource loading..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Core Web Vitals - FID (First Input Delay)</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="FID scores, JavaScript optimization, event handler optimization, main thread blocking..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Core Web Vitals - CLS (Cumulative Layout Shift)</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="CLS scores, layout stability, image dimensions, font loading, dynamic content..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Performance Opportunities - Image Optimization</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Image compression, WebP conversion, lazy loading, image sizing, image optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Performance Opportunities - CSS Optimization</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="CSS minification, unused CSS removal, critical CSS, CSS optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Performance Opportunities - JavaScript Optimization</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="JavaScript minification, unused JavaScript removal, code splitting, JavaScript optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Performance Opportunities - Resource Loading</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Resource prioritization, preloading, prefetching, resource loading optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Diagnostics - Server Response Times</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Time to First Byte (TTFB), server response optimization, hosting performance..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Diagnostics - Resource Sizes</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Total page size, resource sizes, compression opportunities, file size optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Diagnostics - Network Requests</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Number of requests, request optimization, resource consolidation, CDN usage..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Passed Audits - Optimization Success</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Successfully optimized elements, best practices implemented, optimization achievements..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accessibility - Screen Reader Support</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Screen reader compatibility, accessibility issues, ARIA implementation, accessibility optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Best Practices - Security & Performance</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Security best practices, performance best practices, optimization recommendations..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">SEO - Meta Tags & Structure</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Meta tag optimization, heading structure, SEO best practices, search engine optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">PageSpeed Recommendations - Priority Actions</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Priority performance fixes, quick wins, optimization recommendations, action items..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">PageSpeed Recommendations - Performance Strategy</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Long-term performance strategy, monitoring recommendations, performance optimization..." />
      </div>
    </div>
  </div>
);

const GoogleMyBusinessForm = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <MapPinIcon className="w-5 h-5 mr-2 text-red-600" />
      Google My Business Audit
    </h4>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Profile URL</label>
        <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="https://business.google.com/..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Information - Basic Details</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Business name, address, phone number, website, business hours, business category..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Information - NAP Consistency</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Name, Address, Phone consistency across platforms, citation consistency, local SEO optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Information - Business Description</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Business description optimization, keyword usage, call-to-action, description length..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Photos & Media - Profile Photos</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Profile photo quality, cover photo, logo, photo optimization, visual branding..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Photos & Media - Business Photos</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Business interior/exterior photos, product photos, team photos, photo quantity and quality..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Photos & Media - Customer Photos</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Customer photo contributions, photo moderation, customer engagement, visual social proof..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Reviews & Ratings - Review Management</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Review response rate, review quality, review quantity, review management strategy..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Reviews & Ratings - Rating Analysis</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Average rating, rating distribution, rating trends, rating improvement opportunities..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Reviews & Ratings - Review Response Strategy</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Response templates, response timing, response quality, customer service optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Local SEO - Local Keywords</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Local keyword rankings, local pack performance, local search optimization, local keyword opportunities..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Local SEO - Local Citations</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Local citation analysis, NAP consistency, local link building, local SEO optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Local SEO - Local Competitors</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Local competitor analysis, competitive positioning, local market analysis, differentiation opportunities..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Insights & Analytics - Search Performance</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Search queries, search performance, discovery searches, branded searches, local search trends..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Insights & Analytics - Customer Actions</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Website clicks, direction requests, phone calls, photo views, customer engagement metrics..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Insights & Analytics - Audience Insights</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Customer demographics, peak hours, popular times, audience analysis, customer behavior..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Posts & Updates - Content Strategy</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Post frequency, post quality, content types, engagement rates, content strategy..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Posts & Updates - Event Management</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Event posts, special offers, promotions, event optimization, customer engagement..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Questions & Answers - Q&A Management</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Q&A response rate, answer quality, question monitoring, customer service optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Questions & Answers - FAQ Strategy</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="FAQ optimization, common questions, answer templates, customer service improvement..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Services & Products - Service Optimization</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Service descriptions, service optimization, product listings, service category optimization..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Services & Products - Menu/Price Optimization</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Menu optimization, pricing strategy, service pricing, competitive pricing analysis..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Google My Business Recommendations - Priority Actions</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Priority optimization actions, quick wins, local SEO improvements, action items..." />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Google My Business Recommendations - Local Strategy</label>
        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Local SEO strategy, long-term improvements, local market positioning, competitive advantages..." />
      </div>
    </div>
  </div>
);

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

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handlePlatformChange = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
  };

  const handleInputChange = (field: string, value: string) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
  };

  const renderPlatformForm = (platformId: string) => {
    switch (platformId) {
      case 'google-search-console':
        return <GoogleSearchConsoleForm />;
      case 'google-analytics':
        return <GoogleAnalyticsForm />;
      case 'semrush':
        return <SEMrushForm />;
      case 'ahrefs':
        return <AhrefsForm />;
      case 'moz':
        return <MozForm />;
      case 'screaming-frog':
        return <ScreamingFrogForm />;
      case 'google-page-speed':
        return <GooglePageSpeedForm />;
      case 'google-my-business':
        return <GoogleMyBusinessForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Selector */}
      <AuditPlatformSelector 
        platforms={seoPlatforms} 
        onChange={handlePlatformChange}
      />
      {/* Basic SEO Audit Form - Always Visible */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-blue-600" />
          Basic SEO Audit Form
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

      

      {/* Platform-Specific Forms */}
      {selectedPlatforms.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Platform-Specific Audits</h3>
          {selectedPlatforms.map(platformId => (
            <div key={platformId}>
              {renderPlatformForm(platformId)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 