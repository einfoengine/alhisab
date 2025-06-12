"use client";

import TableBuilder from "@/components/TableBuilder";
import agreements from "@/data/agreements.json";
import projects from "@/data/projects.json";
import clients from "@/data/clients.json";
import { Column } from "@/types/table";
import { ReactNode } from "react";

// Helper to get project info by title
const getProjectByTitle = (title: string) =>
  projects.projects.find((p) => p.name === title);

// Helper to get client info by name
const getClientByName = (name: string) =>
  clients.find((c) => c.client_name === name);

const agreementsData = agreements.map((a, idx) => {
  const projectTitle = a.scope_of_work?.project_title || "";
  const project = getProjectByTitle(projectTitle);
  const clientParty = a.parties.find((p) => p.type === "client");
  const clientName = clientParty?.name || "";
  const client = getClientByName(clientName);
  return {
    id: a.agreement_id || idx,
    agreement_id: a.agreement_id,
    project_title: projectTitle,
    client_name: clientName,
    agreement_date: a.agreement_date,
    project_start_date: a.scope_of_work?.start_date || "",
    project_end_date: a.scope_of_work?.end_date || "",
    total_cost: a.payment_terms?.total_cost || 0,
    signed_by: a.parties.map((p) => p.name).join(", "),
    project_id: project?.id || "",
    client_id: client?.id || "",
  };
});

const projectOptions = projects.projects.map((p) => ({ id: p.id, name: p.name }));
const clientOptions = clients.map((c) => ({ id: c.id, name: c.client_name }));

type AgreementRow = typeof agreementsData[number];

const columns: Column<AgreementRow>[] = [
  {
    key: "agreement_id",
    label: "Agreement ID",
    sortable: true,
  },
  {
    key: "project_title",
    label: "Project Title",
    sortable: true,
    filterable: true,
    options: projectOptions,
    render: (value: unknown, row: AgreementRow): ReactNode => row.project_title,
  },
  {
    key: "client_name",
    label: "Client Name",
    sortable: true,
    filterable: true,
    options: clientOptions,
    render: (value: unknown, row: AgreementRow): ReactNode => row.client_name,
  },
  {
    key: "agreement_date",
    label: "Agreement Date",
    sortable: true,
    render: (value: unknown) => new Date(String(value)).toLocaleDateString(),
  },
  {
    key: "project_start_date",
    label: "Project Start Date",
    sortable: true,
    render: (value: unknown) => new Date(String(value)).toLocaleDateString(),
  },
  {
    key: "project_end_date",
    label: "Project End Date",
    sortable: true,
    render: (value: unknown) => new Date(String(value)).toLocaleDateString(),
  },
  {
    key: "total_cost",
    label: "Total Cost",
    sortable: true,
    render: (value: unknown) => `$${Number(value).toLocaleString()}`,
  },
  {
    key: "signed_by",
    label: "Signed by",
    render: (value: unknown, row: AgreementRow): ReactNode => row.signed_by,
  },
];

export default function AgreementsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Agreements</h1>
        <p className="mt-1 text-sm text-gray-500">
          List of all agreements with project and client details
        </p>
      </div>
      <TableBuilder data={agreementsData} columns={columns} />
    </div>
  );
} 