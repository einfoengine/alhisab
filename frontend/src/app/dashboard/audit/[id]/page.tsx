'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import auditDataRaw from '../../../../data/audit.json';
import { jsPDF } from 'jspdf';
import autoTable, { RowInput, CellHookData } from 'jspdf-autotable';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
// import projectsData from '../../../../data/projects.json';
// import { jsPDF } from 'jspdf';

interface PlatformMetric {
  metric: string;
  my_matrix: string;
  required_matrix: string;
  status: string;
}
interface PlatformSummary {
  category: string;
  average_performance: string;
}
interface Platform {
  name: string;
  organic: {
    metrics: PlatformMetric[];
    summary: PlatformSummary;
  };
  paid: {
    metrics: PlatformMetric[];
    summary: PlatformSummary;
  };
}
interface CrossPlatformSummaryRow {
  platform: string;
  organic_score: string;
  paid_media_score: string;
  total_score: string;
}
interface Project {
  project_id: string;
  project_name: string;
  client_id: string;
  platforms: Platform[];
  cross_platform_summary: {
    platforms: CrossPlatformSummaryRow[];
  };
  recommendations: string[];
  avg_content_quality?: number;
  conversion_potential?: number;
  content_ratio?: {
    direct: number;
    other: number;
  };
  traffic_sources?: {
    source: string;
    percent: number;
  }[];
  cross_platform_content_relation?: string;
  growth_factors?: string[];
}
interface Audit {
  report_id: string;
  report_title: string;
  report_date: string;
  prepared_by: string;
  projects: Project[];
}

interface Params {
  params: { id: string };
}

function statusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'ok':
      return '#22c55e'; // green
    case 'below':
      return '#ef4444'; // red
    case 'high':
      return '#f59e42'; // orange
    case 'low':
      return '#3b82f6'; // blue
    case 'short':
    case 'slow':
      return '#a3a3a3'; // gray
    default:
      return '#6b7280'; // default gray
  }
}

function generatePDF(audit: Audit, project: Project) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' }) as jsPDF & { lastAutoTable?: { finalY: number } };
  let y = 40;
  doc.setFontSize(20);
  doc.text(audit.report_title, 40, y);
  y += 28;
  doc.setFontSize(12);
  doc.text(`Project: ${project.project_name}`, 40, y);
  y += 16;
  doc.text(`Client ID: ${project.client_id}`, 40, y);
  y += 16;
  doc.text(`Report ID: ${audit.report_id}`, 40, y);
  y += 16;
  doc.text(`Prepared by: ${audit.prepared_by}`, 40, y);
  y += 16;
  doc.text(`Date: ${audit.report_date}`, 40, y);
  y += 24;
  project.platforms.forEach((platform) => {
    doc.setFontSize(15);
    doc.text(`${platform.name} Audit`, 40, y);
    y += 18;
    doc.setFontSize(12);
    // Organic Table
    autoTable(doc, {
      startY: y,
      head: [["Metric", "My Matrix", "Required Matrix", "Status"]],
      body: platform.organic.metrics.map((m) => [m.metric, m.my_matrix, m.required_matrix, m.status]) as RowInput[],
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      bodyStyles: {},
      didParseCell: (data: CellHookData) => {
        if (data.section === 'body' && data.column.index === 3) {
          data.cell.styles.fillColor = statusColor(data.cell.raw as string);
          data.cell.styles.textColor = [255, 255, 255];
        } else if (data.section === 'body') {
          data.cell.styles.textColor = [34, 34, 34];
        }
      },
      margin: { left: 40, right: 40 },
      theme: 'grid',
      tableWidth: 'auto',
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 8 : y + 8;
    autoTable(doc, {
      startY: y,
      head: [["Metric Category", "Average Performance"]],
      body: [[platform.organic.summary.category, platform.organic.summary.average_performance]],
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [241, 245, 249], textColor: [34, 34, 34] },
      margin: { left: 40, right: 40 },
      theme: 'grid',
      tableWidth: 'auto',
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 16 : y + 16;
    // Paid Table
    autoTable(doc, {
      startY: y,
      head: [["Metric", "My Matrix", "Required Matrix", "Status"]],
      body: platform.paid.metrics.map((m) => [m.metric, m.my_matrix, m.required_matrix, m.status]) as RowInput[],
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      bodyStyles: {},
      didParseCell: (data: CellHookData) => {
        if (data.section === 'body' && data.column.index === 3) {
          data.cell.styles.fillColor = statusColor(data.cell.raw as string);
          data.cell.styles.textColor = [255, 255, 255];
        } else if (data.section === 'body') {
          data.cell.styles.textColor = [34, 34, 34];
        }
      },
      margin: { left: 40, right: 40 },
      theme: 'grid',
      tableWidth: 'auto',
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 8 : y + 8;
    autoTable(doc, {
      startY: y,
      head: [["Metric Category", "Average Performance"]],
      body: [[platform.paid.summary.category, platform.paid.summary.average_performance]],
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [241, 245, 249], textColor: [34, 34, 34] },
      margin: { left: 40, right: 40 },
      theme: 'grid',
      tableWidth: 'auto',
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 24 : y + 24;
    if (y > 700) { doc.addPage(); y = 40; }
  });
  doc.setFontSize(15);
  doc.text('Cross-Platform Summary', 40, y);
  y += 18;
  autoTable(doc, {
    startY: y,
    head: [["Platform", "Organic Score", "Paid Media Score", "Total Score (out of 10)"]],
    body: project.cross_platform_summary.platforms.map((row: { platform: string; organic_score: string; paid_media_score: string; total_score: string }) => [row.platform, row.organic_score, row.paid_media_score, row.total_score]) as RowInput[],
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    margin: { left: 40, right: 40 },
    theme: 'grid',
    tableWidth: 'auto',
  });
  y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 18 : y + 18;
  doc.setFontSize(15);
  doc.text('Recommendations', 40, y);
  y += 18;
  doc.setFontSize(12);
  project.recommendations.forEach((rec: string) => {
    doc.text(`- ${rec}`, 50, y);
    y += 14;
    if (y > 700) { doc.addPage(); y = 40; }
  });
  doc.save(`${audit.report_title.replace(/\s+/g, '_')}.pdf`);
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function getStatusCounts(platforms: Platform[]): { [key: string]: number } {
  const counts: { [key: string]: number } = {};
  platforms.forEach(platform => {
    platform.organic.metrics.forEach(metric => {
      counts[metric.status] = (counts[metric.status] || 0) + 1;
    });
    platform.paid.metrics.forEach(metric => {
      counts[metric.status] = (counts[metric.status] || 0) + 1;
    });
  });
  return counts;
}

function getPlatformScores(platforms: Platform[]): { [key: string]: { organic: number; paid: number } } {
  const scores: { [key: string]: { organic: number; paid: number } } = {};
  platforms.forEach(platform => {
    const organicScore = parseFloat(platform.organic.summary.average_performance);
    const paidScore = parseFloat(platform.paid.summary.average_performance);
    scores[platform.name] = { organic: organicScore, paid: paidScore };
  });
  return scores;
}

function getPlatformMetrics(platform: Platform) {
  const organicMetrics = platform.organic.metrics.map(m => ({
    metric: m.metric,
    score: parseFloat(m.my_matrix),
    required: parseFloat(m.required_matrix),
    status: m.status
  }));

  const paidMetrics = platform.paid.metrics.map(m => ({
    metric: m.metric,
    score: parseFloat(m.my_matrix),
    required: parseFloat(m.required_matrix),
    status: m.status
  }));

  return { organicMetrics, paidMetrics };
}

export default function AuditDetailsPage({ params }: Params) {
  const audits: Audit[] = auditDataRaw as Audit[];
  const audit = audits.find((a) => String(a.report_id) === params.id);
  if (!audit) return notFound();
  // For now, show the first project (or you can add a selector for multiple projects)
  const project = audit.projects[0];
  const projectName = project ? project.project_name : '';

  if (!project) {
    return notFound();
  }

  const statusCounts = getStatusCounts(project.platforms);
  const platformScores = getPlatformScores(project.platforms);

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          '#22c55e', // ok
          '#ef4444', // below
          '#f59e42', // high
          '#3b82f6', // low
          '#a3a3a3', // short/slow
        ],
        borderWidth: 1,
      },
    ],
  };

  const platformComparisonData = {
    labels: Object.keys(platformScores),
    datasets: [
      {
        label: 'Organic Score',
        data: Object.values(platformScores).map(s => s.organic),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Paid Score',
        data: Object.values(platformScores).map(s => s.paid),
        backgroundColor: 'rgba(245, 158, 66, 0.5)',
        borderColor: 'rgb(245, 158, 66)',
        borderWidth: 1,
      },
    ],
  };

  const trendData = {
    labels: Object.keys(platformScores),
    datasets: [
      {
        label: 'Total Score',
        data: Object.values(platformScores).map(s => (s.organic + s.paid) / 2),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // Prepare data for new summary section
  const contentRatioData = project.content_ratio
    ? {
        labels: ['Direct Product/Service', 'Other Content'],
        datasets: [
          {
            data: [project.content_ratio.direct, project.content_ratio.other],
            backgroundColor: ['#2563eb', '#f59e42'],
            borderWidth: 1,
          },
        ],
      }
    : null;

  const trafficSourcesData = project.traffic_sources
    ? {
        labels: project.traffic_sources.map((s) => s.source),
        datasets: [
          {
            data: project.traffic_sources.map((s) => s.percent),
            backgroundColor: [
              '#2563eb', '#f59e42', '#22c55e', '#ef4444', '#a3a3a3', '#3b82f6', '#fbbf24', '#6366f1', '#14b8a6', '#eab308'
            ],
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 32, background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 15, color: '#888', marginBottom: 2 }}>
            <b>Project ID:</b> {project?.project_id} &nbsp;|&nbsp; <b>Report ID:</b> {audit.report_id}
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 700, margin: '8px 0 0 0', color: '#222' }}>{audit.report_title}</h1>
          <div style={{ fontSize: 16, color: '#666', margin: '8px 0' }}>Prepared by {audit.prepared_by}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 15, color: '#888' }}>{audit.report_date}</div>
          <button
            onClick={() => generatePDF(audit, project)}
            style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, marginTop: 8 }}
          >
            Download PDF
          </button>
        </div>
      </div>
      <section style={{ margin: '24px 0', color: '#444', fontSize: 16, display: 'flex', gap: 48 }}>
        <div style={{ flex: 1 }}><b>Project Name:</b> {projectName}</div>
        <div style={{ flex: 1 }}><b>Client ID:</b> {project?.client_id}</div>
        <div style={{ flex: 1 }}><b>Date:</b> {audit.report_date}</div>
        <div style={{ flex: 1 }}><b>Prepared By:</b> {audit.prepared_by}</div>
      </section>

      {/* New Audit Summary Section */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-gray-500">Avg. Content Quality</div>
                <div className="text-2xl font-bold text-blue-700">{project.avg_content_quality || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Conversion Potential</div>
                <div className="text-xl font-semibold text-orange-600">{project.conversion_potential || '-'}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-40">
                <div className="text-xs text-gray-500 mb-1">Content Ratio</div>
                {contentRatioData && (
                  <Pie data={contentRatioData} options={{ plugins: { legend: { position: 'bottom' } } }} />
                )}
              </div>
              <div className="w-40">
                <div className="text-xs text-gray-500 mb-1">Traffic Sources</div>
                {trafficSourcesData && (
                  <Pie data={trafficSourcesData} options={{ plugins: { legend: { position: 'bottom' } } }} />
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Cross-Platform Content Relation</div>
              <div className="text-base text-gray-700">{project.cross_platform_content_relation || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Growth Factors</div>
              <ul className="list-disc pl-5 text-gray-700">
                {project.growth_factors && project.growth_factors.map((factor: string, idx: number) => (
                  <li key={idx}>{factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {project.platforms.map((platform) => {
        const { organicMetrics, paidMetrics } = getPlatformMetrics(platform);
        
        const platformData = {
          labels: ['Organic', 'Paid'],
          datasets: [
            {
              label: 'Average Performance',
              data: [
                parseFloat(platform.organic.summary.average_performance),
                parseFloat(platform.paid.summary.average_performance)
              ],
              backgroundColor: [
                'rgba(59, 130, 246, 0.5)',
                'rgba(245, 158, 66, 0.5)'
              ],
              borderColor: [
                'rgb(59, 130, 246)',
                'rgb(245, 158, 66)'
              ],
              borderWidth: 1
            }
          ]
        };

        const metricsData = {
          labels: organicMetrics.map(m => m.metric),
          datasets: [
            {
              label: 'Current Score',
              data: organicMetrics.map(m => m.score),
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 1
            },
            {
              label: 'Required Score',
              data: organicMetrics.map(m => m.required),
              backgroundColor: 'rgba(245, 158, 66, 0.5)',
              borderColor: 'rgb(245, 158, 66)',
              borderWidth: 1
            }
          ]
        };

        const paidMetricsData = {
          labels: paidMetrics.map(m => m.metric),
          datasets: [
            {
              label: 'Current Score',
              data: paidMetrics.map(m => m.score),
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 1
            },
            {
              label: 'Required Score',
              data: paidMetrics.map(m => m.required),
              backgroundColor: 'rgba(245, 158, 66, 0.5)',
              borderColor: 'rgb(245, 158, 66)',
              borderWidth: 1
            }
          ]
        };

        return (
          <section key={platform.name} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{platform.name} Audit</h2>
            
            {/* Platform Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
                <div className="h-64">
                  <Bar
                    data={platformData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 10
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Organic Metrics Comparison</h3>
                <div className="h-64">
                  <Bar
                    data={metricsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 10
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Paid Metrics Comparison</h3>
                <div className="h-64">
                  <Bar
                    data={paidMetricsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 10
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Platform Tables */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Organic Performance</h3>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">My Matrix</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Matrix</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {platform.organic.metrics.map((metric, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.metric}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.my_matrix}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.required_matrix}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white`}
                              style={{ backgroundColor: statusColor(metric.status) }}
                            >
                              {metric.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Summary:</strong> {platform.organic.summary.category} - {platform.organic.summary.average_performance}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Paid Performance</h3>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">My Matrix</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Matrix</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {platform.paid.metrics.map((metric, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.metric}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.my_matrix}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.required_matrix}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white`}
                              style={{ backgroundColor: statusColor(metric.status) }}
                            >
                              {metric.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Summary:</strong> {platform.paid.summary.category} - {platform.paid.summary.average_performance}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Cross-Platform Comparison Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Cross-Platform Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
            <div className="h-64">
              <Doughnut
                data={statusData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Platform Performance Comparison</h3>
            <div className="h-64">
              <Bar
                data={platformComparisonData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 10,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
            <div className="h-64">
              <Line
                data={trendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 10,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Cross-Platform Summary Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organic Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Media Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {project.cross_platform_summary.platforms.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.platform}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.organic_score}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.paid_media_score}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.total_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recommendations Section */}
      <section style={{ margin: '32px 0' }}>
        <h2 style={{ fontSize: 22, marginBottom: 12, color: '#222' }}>Recommendations</h2>
        <ul style={{ paddingLeft: 20, fontSize: 16 }}>
          {project.recommendations.map((rec, i) => (
            <li key={i} style={{ marginBottom: 8 }}>{rec}</li>
          ))}
        </ul>
      </section>
    </div>
  );
} 