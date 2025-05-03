'use client';

import { useParams } from "next/navigation";

const invoiceDetails = {
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
  description: "Detailed description of the invoice and its items.",
  paymentHistory: [
    { date: "2025-04-10", amount: "$200", method: "Credit Card", paidFor: "Development Services" },
    { date: "2025-04-20", amount: "$300", method: "Bank Transfer", paidFor: "Consultation" },
  ],
};

export default function InvoiceDetailsPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Invoice Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold text-gray-700">Invoice ID:</span>
            <span className="text-gray-600">{invoiceDetails.id}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Created Date:</span>
            <span className="text-gray-600">{invoiceDetails.createdDate}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Due Date:</span>
            <span className="text-gray-600">{invoiceDetails.dueDate}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Invoice Number:</span>
            <span className="text-gray-600">{invoiceDetails.invoiceNumber}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Created By:</span>
            <span className="text-gray-600">{invoiceDetails.createdBy}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Invoice Type:</span>
            <span className="text-gray-600">{invoiceDetails.invoiceType}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Invoice To:</span>
            <span className="text-gray-600">{invoiceDetails.invoiceTo}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Receiver's Email:</span>
            <span className="text-gray-600">{invoiceDetails.receiversEmail}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Receiver's Contact:</span>
            <span className="text-gray-600">{invoiceDetails.receiversContact}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Due Amount:</span>
            <span className="text-red-500">{invoiceDetails.dueAmount}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Paid Amount:</span>
            <span className="text-green-500">{invoiceDetails.paidAmount}</span>
          </div>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Description:</span>
          <span className="text-gray-600 mt-2">{invoiceDetails.description}</span>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment History</h2>
        <div className="flex font-semibold text-gray-700 border-b pb-2">
          <span className="w-1/4">Date</span>
          <span className="w-1/4">Amount</span>
          <span className="w-1/4">Method</span>
          <span className="w-1/4">Paid For</span>
        </div>
        <ul className="space-y-4">
          {invoiceDetails.paymentHistory.map((payment, index) => (
            <li key={index} className="flex justify-between border-b pb-2">
              <span className="w-1/4 text-gray-600">{payment.date}</span>
              <span className="w-1/4 text-gray-600">{payment.amount}</span>
              <span className="w-1/4 text-gray-600">{payment.method}</span>
              <span className="w-1/4 text-gray-600">{payment.paidFor}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Comments</h2>
        <ul className="space-y-4">
          <li className="flex flex-col border-b pb-2">
            <span className="font-semibold text-gray-700">John Doe:</span>
            <span className="text-gray-600">This invoice needs to be reviewed.</span>
          </li>
          <li className="flex flex-col border-b pb-2">
            <span className="font-semibold text-gray-700">Jane Smith:</span>
            <span className="text-gray-600">Payment has been partially made.</span>
          </li>
        </ul>
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Add a comment..."
          ></textarea>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        </div>
      </div>
    </div>
  );
}