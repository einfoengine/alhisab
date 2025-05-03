import React from "react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center font-bold text-lg">Logo</div>
        <nav className="mt-4 space-y-2">
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Users</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Projects</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Clients</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Services</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Products</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Invoices</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Journal</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Ledger</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Trial Balance</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Adjustment Entries</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Financial Statement</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Closing</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-4 text-gray-600">Welcome to the dashboard!</p>
      </main>
    </div>
  );
}