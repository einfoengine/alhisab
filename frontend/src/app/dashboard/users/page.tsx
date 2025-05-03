import React from "react";

const users = [
  {
    id: 1,
    name: "John Doe",
    role: "Admin",
    joiningDate: "2023-01-15",
    designation: "Manager",
    payscale: "$5000",
    tasks: "Manage team",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "User",
    joiningDate: "2024-03-10",
    designation: "Developer",
    payscale: "$4000",
    tasks: "Develop features",
  },
];

export default function UsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Create New User</button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Joining Date</th>
            <th className="border border-gray-300 px-4 py-2">Designation</th>
            <th className="border border-gray-300 px-4 py-2">Payscale</th>
            <th className="border border-gray-300 px-4 py-2">Tasks</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">{user.joiningDate}</td>
              <td className="border border-gray-300 px-4 py-2">{user.designation}</td>
              <td className="border border-gray-300 px-4 py-2">{user.payscale}</td>
              <td className="border border-gray-300 px-4 py-2">{user.tasks}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}