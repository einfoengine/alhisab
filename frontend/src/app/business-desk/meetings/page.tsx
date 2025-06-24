"use client";

import React from "react";
import { useRouter } from "next/navigation";
import meetingsData from "@/data/meetings.json";
import clients from "@/data/clients.json";
import { PlusIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const getClient = (client_id: string) => clients.find((c) => c.id === client_id);

export default function MeetingsPage() {
  const router = useRouter();
  const meetings = meetingsData.meetings;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 w-full">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <span className="cursor-pointer hover:text-blue-600" onClick={() => router.push("/business-desk")}>Business-desk</span>
              <ChevronRightIcon className="w-4 h-4" />
              <span className="text-blue-600 font-medium">Meetings</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
            <div className="text-gray-500 text-sm mt-1">All your meetings with team and clients, organized in one place.</div>
          </div>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            onClick={() => router.push('/business-desk/meetings/new')}
          >
            <PlusIcon className="h-5 w-5" /> New Meeting
          </button>
        </div>

        {/* Meetings Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-none w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs">
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Client</th>
                <th className="px-4 py-3 text-left font-semibold">Members</th>
                <th className="px-4 py-3 text-left font-semibold">Topics</th>
                <th className="px-4 py-3 text-left font-semibold">Duration</th>
                <th className="px-4 py-3 text-left font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting, idx) => {
                const client = getClient(meeting.client_id);
                const isLast = idx === meetings.length - 1;
                return (
                  <tr key={meeting.id} className={`align-top ${!isLast ? 'border-b border-gray-100' : ''} hover:bg-blue-50 transition-colors`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{new Date(meeting.date).toLocaleString()}</div>
                    </td>
                    <td className="px-4 py-3">{meeting.type}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${meeting.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{meeting.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{client?.client_name || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <ul className="space-y-1">
                        {meeting.members.map((m, i) => (
                          <li key={i} className="text-xs text-gray-700">
                            <span className="font-medium text-gray-900">{m.name}</span> <span className="text-gray-400">({m.role})</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3">
                      <ul className="space-y-1">
                        {meeting.topics.map((topic, i) => (
                          <li key={i} className="text-xs text-gray-700">{topic}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3">{meeting.duration} min</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{meeting.notes}</td>
                  </tr>
                );
              })}
              {meetings.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-400 py-8">No meetings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 