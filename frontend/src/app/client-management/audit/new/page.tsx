"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import projectsData from '@/data/projects.json';
import usersData from '@/data/users.json';

const DEFAULT_PLATFORMS = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "YouTube",
  "TikTok",
  "Website"
];

const DEFAULT_METRICS = {
  Facebook: {
    organic: [
      "Static Post Frequency",
      "Video Post Frequency",
      "Reels Post Frequency",
      "Story Frequency",
      "Long Video Frequency",
      "Engagement Rate",
      "Follower Growth Rate",
      "Avg. Reach per Post"
    ],
    paid: [
      "CPM",
      "CPC",
      "CTR",
      "Conversion Rate",
      "ROAS"
    ]
  },
  Instagram: {
    organic: [
      "Static Post Frequency",
      "Reels Post Frequency",
      "Story Frequency",
      "Engagement Rate",
      "Follower Growth",
      "Reel Views Avg."
    ],
    paid: [
      "CPM",
      "CPC",
      "CTR",
      "ROAS"
    ]
  },
  LinkedIn: {
    organic: [
      "Static Post Frequency",
      "Article Publishing Frequency",
      "Engagement Rate",
      "Follower Growth"
    ],
    paid: [
      "CPC",
      "CTR",
      "ROAS"
    ]
  },
  YouTube: {
    organic: [
      "Upload Frequency",
      "Avg. View Duration",
      "Engagement (Like/Cmt)",
      "Subscriber Growth",
      "Ad ROAS"
    ],
    paid: []
  },
  TikTok: {
    organic: [
      "Reels Frequency",
      "Avg. View Count",
      "Follower Growth",
      "Engagement Rate",
      "Ad ROAS"
    ],
    paid: []
  },
  Website: {
    organic: [
      "Organic Traffic",
      "Bounce Rate",
      "Avg. Time on Page",
      "Domain Authority"
    ],
    paid: [
      "CPC (Search)",
      "ROAS"
    ]
  }
};

type PlatformName = keyof typeof DEFAULT_METRICS;

// Add sensible defaults for required_matrix for each metric (unique keys)
const REQUIRED_MATRIX_DEFAULTS: Record<string, string> = {
  // Facebook
  "Facebook:Static Post Frequency": "6+/mo",
  "Facebook:Video Post Frequency": "4+/mo",
  "Facebook:Reels Post Frequency": "4+/mo",
  "Facebook:Story Frequency": "12+/mo",
  "Facebook:Long Video Frequency": "2+/mo",
  "Facebook:Engagement Rate": "3.5%+",
  "Facebook:Follower Growth Rate": "5%+",
  "Facebook:Avg. Reach per Post": "1,500+",
  "Facebook:CPM": "<$5.00",
  "Facebook:CPC": "<$0.50",
  "Facebook:CTR": ">1%",
  "Facebook:Conversion Rate": ">3%",
  "Facebook:ROAS": "3x+",
  // Instagram
  "Instagram:Static Post Frequency": "8+/mo",
  "Instagram:Reels Post Frequency": "5+/mo",
  "Instagram:Story Frequency": "15+/mo",
  "Instagram:Engagement Rate": "5%+",
  "Instagram:Follower Growth": "5%+",
  "Instagram:Reel Views Avg.": "25,000+",
  "Instagram:CPM": "<$6.00",
  "Instagram:CPC": "<$0.40",
  "Instagram:CTR": ">1.5%",
  "Instagram:ROAS": ">3.5x",
  // LinkedIn
  "LinkedIn:Static Post Frequency": "6+/mo",
  "LinkedIn:Article Publishing Frequency": "2+/mo",
  "LinkedIn:Engagement Rate": "4%+",
  "LinkedIn:Follower Growth": "3%+",
  "LinkedIn:CPC": "<$2.50",
  "LinkedIn:CTR": ">1%",
  "LinkedIn:ROAS": ">2.5x",
  // YouTube
  "YouTube:Upload Frequency": "4/mo",
  "YouTube:Avg. View Duration": "4:00+ min",
  "YouTube:Engagement (Like/Cmt)": "6%+",
  "YouTube:Subscriber Growth": "3%+",
  "YouTube:Ad ROAS": ">4x",
  // TikTok
  "TikTok:Reels Frequency": "3+/week",
  "TikTok:Avg. View Count": "15,000+",
  "TikTok:Follower Growth": "6%+",
  "TikTok:Engagement Rate": ">8%",
  "TikTok:Ad ROAS": "4x+",
  // Website
  "Website:Organic Traffic": "8k+/mo",
  "Website:Bounce Rate": "<50%",
  "Website:Avg. Time on Page": ">2:30 min",
  "Website:Domain Authority": "30+",
  "Website:CPC (Search)": "<$1.00",
  "Website:ROAS": ">3x"
};

const emptyMetric = (metric: string, platform: string) => ({
  metric,
  my_matrix: "",
  required_matrix: REQUIRED_MATRIX_DEFAULTS[`${platform}:${metric}`] || "",
  status: ""
});

const emptySummary = { category: "", average_performance: "" };
const emptyPlatform = (name: string) => ({
  name,
  organic: { metrics: DEFAULT_METRICS[name as PlatformName].organic.map(m => emptyMetric(m, name)), summary: { ...emptySummary } },
  paid: { metrics: DEFAULT_METRICS[name as PlatformName].paid.map(m => emptyMetric(m, name)), summary: { ...emptySummary } },
});
const emptyCrossSummary = (platform: string) => ({ platform, organic_score: "", paid_media_score: "", total_score: "" });

function generateReportId() {
  return `audit-${Date.now()}`;
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function NewAuditPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    report_id: generateReportId(),
    report_title: "",
    report_date: getToday(),
    prepared_by: "",
    projects: [
      {
        project_name: "",
        platforms: DEFAULT_PLATFORMS.map(emptyPlatform),
        cross_platform_summary: { platforms: DEFAULT_PLATFORMS.map(emptyCrossSummary) },
        recommendations: [""],
        avg_content_quality: "",
        conversion_potential: "",
        content_ratio: { direct: "", other: "" },
        traffic_sources: [ { source: "", percent: "" } ],
        cross_platform_content_relation: "",
        growth_factors: [""],
      }
    ]
  });
  const project = form.projects[0];

  // Top-level handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Dynamic array handlers
  // Platform metrics
  const handleMetricChange = (
    platIdx: number,
    type: "organic" | "paid",
    metIdx: number,
    field: string,
    value: string
  ) => {
    setForm((prev) => {
      const updated = { ...prev };
      const platforms = [...project.platforms];
      const metrics = [...platforms[platIdx][type].metrics];
      const metric = { ...metrics[metIdx], [field]: value };
      // If my_matrix or required_matrix changes, recalc status
      if (field === "my_matrix" || field === "required_matrix") {
        metric.status = calculateStatus(
          field === "my_matrix" ? value : metric.my_matrix,
          field === "required_matrix" ? value : metric.required_matrix
        );
      }
      metrics[metIdx] = metric;
      platforms[platIdx][type].metrics = metrics;
      updated.projects = [ { ...project, platforms } ];
      return updated;
    });
  };
  // Platform summary
  const handleSummaryChange = (platIdx: number, type: "organic" | "paid", field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev };
      const platforms = [...project.platforms];
      platforms[platIdx][type].summary = { ...platforms[platIdx][type].summary, [field]: value };
      updated.projects = [ { ...project, platforms } ];
      return updated;
    });
  };
  // Cross-platform summary
  const handleCrossSummaryChange = (idx: number, field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev };
      const cross = [...project.cross_platform_summary.platforms];
      cross[idx] = { ...cross[idx], [field]: value };
      updated.projects = [ { ...project, cross_platform_summary: { platforms: cross } } ];
      return updated;
    });
  };
  // Recommendations
  const handleRecommendationChange = (idx: number, value: string) => {
    setForm((prev) => {
      const updated = { ...prev };
      const recs = [...project.recommendations];
      recs[idx] = value;
      updated.projects = [ { ...project, recommendations: recs } ];
      return updated;
    });
  };
  const addRecommendation = () => {
    setForm((prev) => {
      const updated = { ...prev };
      updated.projects = [ { ...project, recommendations: [ ...project.recommendations, "" ] } ];
      return updated;
    });
  };
  const removeRecommendation = (idx: number) => {
    setForm((prev) => {
      const updated = { ...prev };
      updated.projects = [ { ...project, recommendations: project.recommendations.filter((_, i) => i !== idx) } ];
      return updated;
    });
  };
  // Traffic sources
  const handleTrafficSourceChange = (idx: number, field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev };
      const ts = [...project.traffic_sources];
      ts[idx] = { ...ts[idx], [field]: value };
      updated.projects = [ { ...project, traffic_sources: ts } ];
      return updated;
    });
  };
  // Growth factors
  const handleGrowthFactorChange = (idx: number, value: string) => {
    setForm((prev) => {
      const updated = { ...prev };
      const gf = [...project.growth_factors];
      gf[idx] = value;
      updated.projects = [ { ...project, growth_factors: gf } ];
      return updated;
    });
  };

  // Content ratio
  const handleContentRatioChange = (field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev };
      updated.projects = [ { ...project, content_ratio: { ...project.content_ratio, [field]: value } } ];
      return updated;
    });
  };

  // Avg content quality, conversion potential, cross-platform content relation
  const handleSimpleProjectField = (field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev };
      updated.projects = [ { ...project, [field]: value } ];
      return updated;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Audit submitted! (Demo only)");
    router.push("/client-management/audit");
  };

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, projects: [ { ...project, project_name: value } ] }));
  };

  // Project name dropdown
  const projectOptions: { value: string; label: string }[] = (projectsData.projects || []).map((p: { name: string }) => ({ value: p.name, label: p.name }));

  // Dedicated handler for Prepared By dropdown
  const handlePreparedByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, prepared_by: value }));
  };

  // Prepared By dropdown options
  const preparedByOptions: { value: string; label: string }[] = (usersData.users || []).map((u: { name: string }) => ({ value: u.name, label: u.name }));

  // Add metric logic
  const addMetric = (platIdx: number, type: "organic" | "paid") => {
    setForm((prev) => {
      const updated = { ...prev };
      const platforms = [...project.platforms];
      platforms[platIdx][type].metrics = [...platforms[platIdx][type].metrics];
      platforms[platIdx][type].metrics.push({ metric: "", my_matrix: "", required_matrix: "", status: "" });
      updated.projects = [ { ...project, platforms } ];
      return updated;
    });
  };

  // Cross-Platform Summary add/remove logic
  const addCrossSummary = () => {
    setForm((prev) => {
      const updated = { ...prev };
      const cross = [...project.cross_platform_summary.platforms];
      cross.push({ platform: "", organic_score: "", paid_media_score: "", total_score: "" });
      updated.projects = [ { ...project, cross_platform_summary: { platforms: cross } } ];
      return updated;
    });
  };
  const removeCrossSummary = (idx: number) => {
    setForm((prev) => {
      const updated = { ...prev };
      const cross = project.cross_platform_summary.platforms.filter((_, i) => i !== idx);
      updated.projects = [ { ...project, cross_platform_summary: { platforms: cross } } ];
      return updated;
    });
  };

  // Automatic status calculation
  function calculateStatus(my_matrix: string, required_matrix: string): string {
    // Try to parse numbers, handle % and $ and x
    const parse = (val: string) => {
      if (!val) return NaN;
      if (val.includes("%")) return parseFloat(val);
      if (val.includes("x")) return parseFloat(val);
      if (val.includes("$")) return parseFloat(val.replace(/[^\d.]/g, ""));
      return parseFloat(val);
    };
    const myVal = parse(my_matrix);
    const reqVal = parse(required_matrix);
    if (isNaN(myVal) || isNaN(reqVal)) return "";
    // Heuristic: if required is a min (e.g. 5+, >3%), OK if my >= req
    if (/[+>]/.test(required_matrix)) {
      return myVal >= reqVal ? "OK" : "Below";
    }
    // If required is a max (e.g. <50%, <$1.00), OK if my <= req
    if (/[<]/.test(required_matrix)) {
      return myVal <= reqVal ? "OK" : "High";
    }
    // Otherwise, just compare
    return myVal === reqVal ? "OK" : myVal > reqVal ? "High" : "Low";
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">New Manual Audit</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Top-level audit fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Report ID</label>
            <input name="report_id" value={form.report_id} readOnly className="mt-1 block w-full border rounded p-2 bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Title</label>
            <input name="report_title" value={form.report_title} onChange={handleChange} className="mt-1 block w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Date</label>
            <input name="report_date" value={form.report_date} readOnly className="mt-1 block w-full border rounded p-2 bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prepared By</label>
            <select name="prepared_by" value={form.prepared_by} onChange={handlePreparedByChange} className="mt-1 block w-full border rounded p-2" required>
              <option value="">Select user</option>
              {preparedByOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
        <hr />
        {/* Project fields */}
        <h2 className="text-lg font-semibold">Project Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <select name="project_name" value={project.project_name} onChange={handleProjectNameChange} className="mt-1 block w-full border rounded p-2" required>
              <option value="">Select a project</option>
              {projectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <hr />
        {/* Platforms */}
        <h2 className="text-lg font-semibold">Platforms</h2>
        {project.platforms.map((platform, platIdx) => (
          <div key={platIdx} className="border rounded p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <input value={platform.name} readOnly className="border rounded p-2 flex-1 bg-gray-100" />
            </div>
            {/* Organic Metrics */}
            <div className="mb-2">
              <h3 className="font-semibold text-blue-700">Organic Metrics</h3>
              {platform.organic.metrics.map((metric: { metric: string; my_matrix: string; required_matrix: string; status: string }, metIdx: number) => (
                <div key={metIdx} className="flex gap-2 mb-1">
                  <input value={metric.metric} readOnly={!!metric.metric} onChange={e => handleMetricChange(platIdx, "organic", metIdx, "metric", e.target.value)} className="border rounded p-1 w-1/4" placeholder="Metric" required />
                  <input value={metric.my_matrix} onChange={e => handleMetricChange(platIdx, "organic", metIdx, "my_matrix", e.target.value)} className="border rounded p-1 w-1/4" placeholder="My Matrix" required />
                  <input value={metric.required_matrix} onChange={e => handleMetricChange(platIdx, "organic", metIdx, "required_matrix", e.target.value)} className="border rounded p-1 w-1/4" placeholder="Required Matrix" required />
                  <input value={metric.status} onChange={e => handleMetricChange(platIdx, "organic", metIdx, "status", e.target.value)} className="border rounded p-1 w-1/4" placeholder="Status" required />
                </div>
              ))}
              <button type="button" onClick={() => addMetric(platIdx, "organic")} className="text-blue-600 text-xs">+ Add Metric</button>
            </div>
            {/* Organic Summary */}
            <div className="mb-2">
              <input value={platform.organic.summary.category} onChange={e => handleSummaryChange(platIdx, "organic", "category", e.target.value)} className="border rounded p-1 mr-2" placeholder="Organic Summary Category" required />
              <input value={platform.organic.summary.average_performance} onChange={e => handleSummaryChange(platIdx, "organic", "average_performance", e.target.value)} className="border rounded p-1" placeholder="Organic Avg Performance" required />
            </div>
            {/* Paid Metrics */}
            <div className="mb-2">
              <h3 className="font-semibold text-orange-700">Paid Metrics</h3>
              {platform.paid.metrics.map((metric: { metric: string; my_matrix: string; required_matrix: string; status: string }, metIdx: number) => (
                <div key={metIdx} className="flex gap-2 mb-1">
                  <input value={metric.metric} readOnly={!!metric.metric} onChange={e => handleMetricChange(platIdx, "paid", metIdx, "metric", e.target.value)} className="border rounded p-1 w-1/4" placeholder="Metric" required />
                  <input value={metric.my_matrix} onChange={e => handleMetricChange(platIdx, "paid", metIdx, "my_matrix", e.target.value)} className="border rounded p-1 w-1/4" placeholder="My Matrix" required />
                  <input value={metric.required_matrix} onChange={e => handleMetricChange(platIdx, "paid", metIdx, "required_matrix", e.target.value)} className="border rounded p-1 w-1/4" placeholder="Required Matrix" required />
                  <input value={metric.status} onChange={e => handleMetricChange(platIdx, "paid", metIdx, "status", e.target.value)} className="border rounded p-1 w-1/4" placeholder="Status" required />
                </div>
              ))}
              <button type="button" onClick={() => addMetric(platIdx, "paid")} className="text-orange-600 text-xs">+ Add Metric</button>
            </div>
            {/* Paid Summary */}
            <div className="mb-2">
              <input value={platform.paid.summary.category} onChange={e => handleSummaryChange(platIdx, "paid", "category", e.target.value)} className="border rounded p-1 mr-2" placeholder="Paid Summary Category" required />
              <input value={platform.paid.summary.average_performance} onChange={e => handleSummaryChange(platIdx, "paid", "average_performance", e.target.value)} className="border rounded p-1" placeholder="Paid Avg Performance" required />
            </div>
          </div>
        ))}
        <hr />
        {/* Cross-Platform Summary */}
        <h2 className="text-lg font-semibold">Cross-Platform Summary</h2>
        {project.cross_platform_summary.platforms.map((row, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input value={row.platform} readOnly className="border rounded p-1 bg-gray-100" />
            <input value={row.organic_score} onChange={e => handleCrossSummaryChange(idx, "organic_score", e.target.value)} className="border rounded p-1" placeholder="Organic Score" required />
            <input value={row.paid_media_score} onChange={e => handleCrossSummaryChange(idx, "paid_media_score", e.target.value)} className="border rounded p-1" placeholder="Paid Media Score" required />
            <input value={row.total_score} onChange={e => handleCrossSummaryChange(idx, "total_score", e.target.value)} className="border rounded p-1" placeholder="Total Score" required />
            <button type="button" onClick={() => removeCrossSummary(idx)} className="text-red-400">x</button>
          </div>
        ))}
        <button type="button" onClick={addCrossSummary} className="text-blue-600 text-xs">+ Add Row</button>
        <hr />
        {/* Recommendations */}
        <h2 className="text-lg font-semibold">Recommendations</h2>
        {project.recommendations.map((rec: string, idx: number) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input value={rec} onChange={e => handleRecommendationChange(idx, e.target.value)} className="border rounded p-1 flex-1" placeholder="Recommendation" required />
            <button type="button" onClick={() => removeRecommendation(idx)} className="text-red-400">x</button>
          </div>
        ))}
        <button type="button" onClick={addRecommendation} className="text-blue-600 text-xs">+ Add Recommendation</button>
        <hr />
        {/* Avg Content Quality, Conversion Potential, Content Ratio, Traffic Sources, Cross-Platform Content Relation, Growth Factors */}
        <h2 className="text-lg font-semibold">Summary & Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Avg. Content Quality</label>
            <input value={project.avg_content_quality} onChange={e => handleSimpleProjectField("avg_content_quality", e.target.value)} className="mt-1 block w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Conversion Potential</label>
            <input value={project.conversion_potential} onChange={e => handleSimpleProjectField("conversion_potential", e.target.value)} className="mt-1 block w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content Ratio - Direct (%)</label>
            <input value={project.content_ratio.direct} onChange={e => handleContentRatioChange("direct", e.target.value)} className="mt-1 block w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content Ratio - Other (%)</label>
            <input value={project.content_ratio.other} onChange={e => handleContentRatioChange("other", e.target.value)} className="mt-1 block w-full border rounded p-2" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cross-Platform Content Relation</label>
          <textarea value={project.cross_platform_content_relation} onChange={e => handleSimpleProjectField("cross_platform_content_relation", e.target.value)} className="mt-1 block w-full border rounded p-2" required />
        </div>
        <h3 className="font-semibold mt-4">Traffic Sources</h3>
        {project.traffic_sources.map((src, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input value={src.source} onChange={e => handleTrafficSourceChange(idx, "source", e.target.value)} className="border rounded p-1" placeholder="Source" required />
            <input value={src.percent} onChange={e => handleTrafficSourceChange(idx, "percent", e.target.value)} className="border rounded p-1" placeholder="Percent" required />
          </div>
        ))}
        <h3 className="font-semibold mt-4">Growth Factors</h3>
        {project.growth_factors.map((gf, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input value={gf} onChange={e => handleGrowthFactorChange(idx, e.target.value)} className="border rounded p-1 flex-1" placeholder="Growth Factor" required />
          </div>
        ))}
        <hr />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold">Submit Audit</button>
      </form>
    </div>
  );
} 