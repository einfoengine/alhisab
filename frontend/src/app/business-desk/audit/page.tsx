'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import TableBuilder from '../../../components/TableBuilder';
import auditDataRaw from '../../../data/audit.json';
import projectsData from '../../../data/projects.json';
import { PlusIcon } from '@heroicons/react/24/outline';

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

interface AuditRow {
  id: string;
  report_id: string;
  report_title: string;
  project_id: string;
  client_id: string;
  report_date: string;
  prepared_by: string;
  project_name: string;
  [key: string]: unknown;
}

const projectMap = Object.fromEntries(
  (projectsData.projects as { id: string; name: string }[]).map((p) => [p.id, p.name])
);

const columns = [
  { key: 'report_id', label: 'Audit ID' },
  { key: 'report_title', label: 'Title' },
  { key: 'project_name', label: 'Project' },
  { key: 'client_id', label: 'Client ID' },
  { key: 'report_date', label: 'Date' },
  { key: 'prepared_by', label: 'Prepared By' },
];

const auditsData = auditDataRaw as Audit[];
const data: AuditRow[] = auditsData.map((audit) => {
  // For listing, use the first project for project_id, client_id, etc.
  const firstProject = audit.projects[0];
  return {
    id: audit.report_id,
    report_id: audit.report_id,
    report_title: audit.report_title,
    project_id: firstProject?.project_id || '',
    client_id: firstProject?.client_id || '',
    report_date: audit.report_date,
    prepared_by: audit.prepared_by,
    project_name: projectMap[firstProject?.project_id] || firstProject?.project_id || '',
  };
});

export default function AuditsPage() {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1>Audits</h1>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.push('/business-desk/audit/new')}
        >
          <PlusIcon className="h-5 w-5" /> New Audit
        </button>
      </div>
      <TableBuilder
        columns={columns}
        data={data}
        onRowClick={(row) => router.push(`/business-desk/audit/${row.report_id}`)}
      />
    </div>
  );
} 