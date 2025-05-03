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
      <ul className="space-y-6">
        {invoices.map((invoice) => (
          <li key={invoice.id} className="w-full flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            <Link href={`/dashboard/invoices/${invoice.id}`} className="block hover:bg-gray-100 p-4 rounded">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Invoice ID:</span>
                <span className="text-gray-600">{invoice.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Created Date:</span>
                <span className="text-gray-600">{invoice.createdDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Due Date:</span>
                <span className="text-gray-600">{invoice.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Invoice Number:</span>
                <span className="text-gray-600">{invoice.invoiceNumber}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}