'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import auditDataRaw from '../../../../data/audit.json';
import { jsPDF } from 'jspdf';
import autoTable, { RowInput, CellHookData } from 'jspdf-autotable';
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

function StatusBadge({ status }: { status: string }) {
  let color = '#6b7280'; // gray
  if (status.toLowerCase() === 'ok') color = '#22c55e'; // green
  else if (status.toLowerCase() === 'below') color = '#ef4444'; // red
  else if (status.toLowerCase() === 'high') color = '#f59e42'; // orange
  else if (status.toLowerCase() === 'low') color = '#3b82f6'; // blue
  else if (status.toLowerCase() === 'short' || status.toLowerCase() === 'slow') color = '#a3a3a3'; // gray
  return (
    <span style={{
      display: 'inline-block',
      minWidth: 60,
      textAlign: 'center',
      background: color + '22',
      color,
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 13,
      padding: '2px 12px',
      letterSpacing: 0.5,
    }}>{status}</span>
  );
}

function statusColor(status: string): [number, number, number] {
  if (status.toLowerCase() === 'ok') return [34, 197, 94]; // green
  if (status.toLowerCase() === 'below') return [239, 68, 68]; // red
  if (status.toLowerCase() === 'high') return [245, 158, 66]; // orange
  if (status.toLowerCase() === 'low') return [59, 130, 246]; // blue
  if (status.toLowerCase() === 'short' || status.toLowerCase() === 'slow') return [163, 163, 163]; // gray
  return [107, 114, 128]; // default gray
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

export default function AuditDetailsPage({ params }: Params) {
  const audits: Audit[] = auditDataRaw as Audit[];
  const audit = audits.find((a) => String(a.report_id) === params.id);
  if (!audit) return notFound();
  // For now, show the first project (or you can add a selector for multiple projects)
  const project = audit.projects[0];
  const projectName = project ? project.project_name : '';
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
      {project && project.platforms.map((platform) => (
        <section key={platform.name} style={{ margin: '32px 0', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, boxShadow: '0 2px 12px #0001', padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 18, color: '#222', letterSpacing: 0.5 }}>{platform.name} Audit</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
            <div style={{ width: '100%' }}>
              <h3 style={{ fontSize: 17, marginBottom: 8, color: '#2563eb' }}>Organic Performance</h3>
              <table style={{ width: '100%', margin: '8px 0', borderCollapse: 'collapse', background: '#f9fafb', borderRadius: 8, overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Metric</th>
                    <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>My Matrix</th>
                    <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Required Matrix</th>
                    <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {platform.organic.metrics.map((m, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f3f4f6' }}>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{m.metric}</td>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{m.my_matrix}</td>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{m.required_matrix}</td>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}><StatusBadge status={m.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 8 }}>
                <b>Organic Summary Table</b>
                <table style={{ width: '100%', margin: '8px 0', borderCollapse: 'collapse', background: '#f9fafb', borderRadius: 8 }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9' }}>
                      <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Metric Category</th>
                      <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Average Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{platform.organic.summary.category}</td>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{platform.organic.summary.average_performance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <h3 style={{ fontSize: 17, marginBottom: 8, color: '#2563eb' }}>Paid Performance</h3>
              <table style={{ width: '100%', margin: '8px 0', borderCollapse: 'collapse', background: '#f9fafb', borderRadius: 8, overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Metric</th>
                    <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>My Matrix</th>
                    <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Required Matrix</th>
                    <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {platform.paid.metrics.map((m, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f3f4f6' }}>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{m.metric}</td>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{m.my_matrix}</td>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{m.required_matrix}</td>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}><StatusBadge status={m.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 8 }}>
                <b>Paid Summary Table</b>
                <table style={{ width: '100%', margin: '8px 0', borderCollapse: 'collapse', background: '#f9fafb', borderRadius: 8 }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9' }}>
                      <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Metric Category</th>
                      <th style={{ border: '1px solid #e5e7eb', padding: 8, fontWeight: 600 }}>Average Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{platform.paid.summary.category}</td>
                      <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{platform.paid.summary.average_performance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ))}
      <section style={{ margin: '32px 0' }}>
        <h2 style={{ fontSize: 22, marginBottom: 12, color: '#222' }}>Cross-Platform Summary</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24, background: '#f9fafb', borderRadius: 8 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e5e7eb', padding: 10, fontWeight: 600 }}>Platform</th>
              <th style={{ border: '1px solid #e5e7eb', padding: 10, fontWeight: 600 }}>Organic Score</th>
              <th style={{ border: '1px solid #e5e7eb', padding: 10, fontWeight: 600 }}>Paid Media Score</th>
              <th style={{ border: '1px solid #e5e7eb', padding: 10, fontWeight: 600 }}>Total Score (out of 10)</th>
            </tr>
          </thead>
          <tbody>
            {project.cross_platform_summary.platforms.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f3f4f6' }}>
                <td style={{ border: '1px solid #e5e7eb', padding: 10 }}>{row.platform}</td>
                <td style={{ border: '1px solid #e5e7eb', padding: 10 }}>{row.organic_score}</td>
                <td style={{ border: '1px solid #e5e7eb', padding: 10 }}>{row.paid_media_score}</td>
                <td style={{ border: '1px solid #e5e7eb', padding: 10 }}>{row.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
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