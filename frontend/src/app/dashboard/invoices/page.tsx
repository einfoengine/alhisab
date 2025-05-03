import React from "react";
import Link from "next/link";

const invoices = [
  {
    id: 1,
    createdDate: "2025-04-01",
    dueDate: "2025-05-01",
    invoiceNumber: "INV-001",
    createdBy: "John Doe",
    invoiceType: "Project",
    invoiceTo: "Jane Smith",
    receiversEmail: "jane.smith@example.com",
    receiversContact: "123-456-7890",
    dueAmount: "$2000",
    paidAmount: "$500",
  },
  {
    id: 2,
    createdDate: "2025-03-15",
    dueDate: "2025-04-15",
    invoiceNumber: "INV-002",
    createdBy: "Alice Brown",
    invoiceType: "Work",
    invoiceTo: "Bob Johnson",
    receiversEmail: "bob.johnson@example.com",
    receiversContact: "987-654-3210",
    dueAmount: "$1500",
    paidAmount: "$1500",
  },
];

export default function InvoicesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <div className="flex font-semibold text-gray-700 border-b pb-2">
        <span className="w-1/6">Invoice ID</span>
        <span className="w-1/6">Created Date</span>
        <span className="w-1/6">Due Date</span>
        <span className="w-1/6">Invoice Number</span>
        <span className="w-1/6">Created By</span>
        <span className="w-1/6">Invoice Type</span>
      </div>
      <ul className="space-y-4">
        {invoices.map((invoice) => (
          <li key={invoice.id} className="flex justify-between border-b pb-2">
            <Link href={`/dashboard/invoices/${invoice.id}`} className="w-full flex justify-between hover:bg-gray-100 p-2 rounded">
              <span className="w-1/6 text-gray-600">{invoice.id}</span>
              <span className="w-1/6 text-gray-600">{invoice.createdDate}</span>
              <span className="w-1/6 text-gray-600">{invoice.dueDate}</span>
              <span className="w-1/6 text-gray-600">{invoice.invoiceNumber}</span>
              <span className="w-1/6 text-gray-600">{invoice.createdBy}</span>
              <span className="w-1/6 text-gray-600">{invoice.invoiceType}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}