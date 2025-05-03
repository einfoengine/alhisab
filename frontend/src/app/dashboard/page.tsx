import React from "react";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <p className="mt-4 text-gray-600">Here you can find a summary of your activities and insights.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">Activity Summary</h2>
          <p className="text-gray-500">View your recent activities and updates.</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">Insights</h2>
          <p className="text-gray-500">Analyze your performance metrics.</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-gray-500">Stay updated with the latest alerts.</p>
        </div>
      </div>
    </>
  );
}