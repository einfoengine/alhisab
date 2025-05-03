"use client";

import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 text-center font-bold text-lg">Logo</div>
      <nav className="mt-4 space-y-2">
        <Link href="/dashboard/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Users</Link>
        <Link href="/dashboard/projects" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Projects</Link>
        <Link href="/dashboard/clients" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Clients</Link>
        <Link href="/dashboard/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Services</Link>
        <Link href="/dashboard/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Products</Link>
        <Link href="/dashboard/invoices" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Invoices</Link>
        <Link href="/dashboard/journal" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Journal</Link>
        <Link href="/dashboard/ledger" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Ledger</Link>
        <Link href="/dashboard/trial-balance" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Trial Balance</Link>
        <Link href="/dashboard/adjustment-entries" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Adjustment Entries</Link>
        <Link href="/dashboard/financial-statement" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Financial Statement</Link>
        <Link href="/dashboard/closing" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Closing</Link>
      </nav>
    </aside>
  );
}