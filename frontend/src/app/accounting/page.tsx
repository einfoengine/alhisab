"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const mockData = {
  totalRevenue: 120000,
  totalExpenses: 85000,
  netProfit: 35000,
  outstandingInvoices: 7,
  recentTransactions: [
    { id: 1, date: "2024-06-01", description: "Invoice Payment - Client A", amount: 5000, type: "income" },
    { id: 2, date: "2024-05-28", description: "Office Rent", amount: -2000, type: "expense" },
    { id: 3, date: "2024-05-25", description: "Invoice Payment - Client B", amount: 8000, type: "income" },
    { id: 4, date: "2024-05-20", description: "Software Subscription", amount: -300, type: "expense" },
    { id: 5, date: "2024-05-18", description: "Invoice Payment - Client C", amount: 4000, type: "income" },
  ],
};

export default function AccountingOverviewPage() {
  const router = useRouter();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 w-full">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            <span className="cursor-pointer hover:text-green-600" onClick={() => router.push("/")}>Home</span>
            <ChevronRightIcon className="w-4 h-4" />
            <span className="text-green-600 font-medium">Accounting</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Accounting Overview</h1>
          <div className="text-gray-500 text-sm mt-1">A snapshot of your business finances: revenue, expenses, profit, and more.</div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-green-600">${mockData.totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Total Expenses</div>
          <div className="text-2xl font-bold text-red-600">${mockData.totalExpenses.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Net Profit</div>
          <div className="text-2xl font-bold text-blue-600">${mockData.netProfit.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Outstanding Invoices</div>
          <div className="text-2xl font-bold text-yellow-600">{mockData.outstandingInvoices}</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="font-semibold text-lg text-gray-900 mb-4">Recent Transactions</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase text-xs">
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Description</th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockData.recentTransactions.map((tx) => (
              <tr key={tx.id} className="align-top border-b border-gray-100 last:border-0 hover:bg-green-50 transition-colors">
                <td className="px-4 py-3">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{tx.description}</td>
                <td className={`px-4 py-3 text-right font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>{tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}</td>
              </tr>
            ))}
            {mockData.recentTransactions.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 py-8">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Placeholder for future charts or analytics */}
      <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
        <div className="text-lg font-semibold mb-2">[Charts & Analytics Coming Soon]</div>
        <div className="text-sm">Visualize your financial data with interactive charts and insights.</div>
      </div>
    </div>
  );
} 