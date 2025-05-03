import React from "react";

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
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Invoice ID</th>
            <th className="border border-gray-300 px-4 py-2">Created Date</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Invoice Number</th>
            <th className="border border-gray-300 px-4 py-2">Created By</th>
            <th className="border border-gray-300 px-4 py-2">Invoice Type</th>
            <th className="border border-gray-300 px-4 py-2">Invoice To</th>
            <th className="border border-gray-300 px-4 py-2">Receiver's Email</th>
            <th className="border border-gray-300 px-4 py-2">Receiver's Contact</th>
            <th className="border border-gray-300 px-4 py-2">Due Amount</th>
            <th className="border border-gray-300 px-4 py-2">Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">{invoice.id}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.createdDate}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.dueDate}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.invoiceNumber}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.createdBy}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.invoiceType}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.invoiceTo}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.receiversEmail}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.receiversContact}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.dueAmount}</td>
              <td className="border border-gray-300 px-4 py-2">{invoice.paidAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}