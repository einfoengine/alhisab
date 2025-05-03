"use client";

import React, { useState } from "react";

export default function ClientsPage() {
  const [showModal, setShowModal] = useState(false);

  const clients = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City, Country",
      joiningDate: "2023-01-15",
      status: "Active",
      projects: ["Project A", "Project B"],
    },
    // Add more clients as needed
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Add New Client
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Joining Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Projects</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border border-gray-300 px-4 py-2">{client.id}</td>
              <td className="border border-gray-300 px-4 py-2">{client.name}</td>
              <td className="border border-gray-300 px-4 py-2">{client.email}</td>
              <td className="border border-gray-300 px-4 py-2">{client.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{client.address}</td>
              <td className="border border-gray-300 px-4 py-2">{client.joiningDate}</td>
              <td className="border border-gray-300 px-4 py-2">{client.status}</td>
              <td className="border border-gray-300 px-4 py-2">{client.projects.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Client</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}