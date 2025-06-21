"use client";

import TableBuilder from "@/components/TableBuilder";
import receipts from "@/data/receipts.json";
import clients from "@/data/clients.json";
import projects from "@/data/projects.json";
import Image from "next/image";
import { Column } from "@/types/table";
import { ReactNode } from "react";

const clientOptions = clients.map((c) => ({ id: c.id, name: c.client_name }));
const projectOptions = projects.projects.map((p) => ({ id: p.id, name: p.name }));
const statusOptions = [
  { id: "full", name: "Full" },
  { id: "partial", name: "Partial" },
];
const paymentMethodOptions = [
  { id: "bank_transfer", name: "Bank Transfer" },
  { id: "paypal", name: "PayPal" },
  { id: "auto", name: "Auto" },
];

type ReceiptRow = typeof receipts[number] & { id: string };
const receiptsData: ReceiptRow[] = receipts.map((r) => ({ ...r, id: r.receipt_id }));

const columns: Column<ReceiptRow>[] = [
  {
    key: "receipt_id",
    label: "Receipt ID",
    sortable: true,
  },
  {
    key: "invoice_id",
    label: "Invoice ID",
    sortable: true,
    render: (value: unknown, row: ReceiptRow): ReactNode => row.invoice_id,
  },
  {
    key: "client_id",
    label: "Client",
    filterable: true,
    options: clientOptions,
    render: (value: unknown, row: ReceiptRow): ReactNode => {
      const client = clients.find((c) => c.id === row.client_id);
      return (
        <span className="flex items-center gap-2">
          {client?.client_name}
          {client?.avatar && (
            <Image src={client.avatar} alt={client.client_name} width={24} height={24} className="rounded-full" />
          )}
        </span>
      );
    },
  },
  {
    key: "project_id",
    label: "Project",
    filterable: true,
    options: projectOptions,
    render: (value: unknown, row: ReceiptRow): ReactNode => {
      const project = projects.projects.find((p) => p.id === row.project_id);
      return project?.name || row.project_id;
    },
  },
  {
    key: "amount_paid",
    label: "Amount Paid",
    sortable: true,
    render: (value: unknown) => `$${Number(value).toLocaleString()}`,
  },
  {
    key: "payment_date",
    label: "Payment Date",
    sortable: true,
    render: (value: unknown) => new Date(String(value)).toLocaleDateString(),
  },
  {
    key: "payment_method",
    label: "Payment Method",
    filterable: true,
    options: paymentMethodOptions,
    render: (value: unknown) => {
      const method = paymentMethodOptions.find((m) => m.id === value);
      return method ? method.name : String(value);
    },
  },
  {
    key: "status",
    label: "Status",
    filterable: true,
    options: statusOptions,
    render: (value: unknown) => {
      const status = statusOptions.find((s) => s.id === value);
      return status ? status.name : String(value);
    },
  },
];

export default function ReceiptsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Receipts</h1>
        <p className="mt-1 text-sm text-gray-500">
          List of all receipts confirming payments against invoices
        </p>
      </div>
      <TableBuilder data={receiptsData} columns={columns} />
    </div>
  );
} 