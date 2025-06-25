'use client';

import { useState, useEffect } from 'react';
import leads from '@/data/leads.json';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: string;
  value: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  tags: string[];
}

export default function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>('');
  const [lead, setLead] = useState<Lead | undefined>(undefined);
  
  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      const foundLead = (leads as Lead[]).find((l) => l.id === resolvedId);
      setLead(foundLead);
    });
  }, [params]);

  if (!id || !lead) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lead Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4"><span className="font-semibold">Name:</span> {lead.name}</div>
        <div className="mb-4"><span className="font-semibold">Company:</span> {lead.company}</div>
        <div className="mb-4"><span className="font-semibold">Email:</span> {lead.email}</div>
        <div className="mb-4"><span className="font-semibold">Phone:</span> {lead.phone}</div>
        <div className="mb-4"><span className="font-semibold">Source:</span> {lead.source}</div>
        <div className="mb-4"><span className="font-semibold">Status:</span> {lead.status}</div>
        <div className="mb-4"><span className="font-semibold">Value:</span> ${lead.value.toLocaleString()}</div>
        <div className="mb-4"><span className="font-semibold">Assigned To:</span> {lead.assignedTo}</div>
        <div className="mb-4"><span className="font-semibold">Created At:</span> {new Date(lead.createdAt).toLocaleString()}</div>
        <div className="mb-4"><span className="font-semibold">Updated At:</span> {new Date(lead.updatedAt).toLocaleString()}</div>
        <div className="mb-4"><span className="font-semibold">Tags:</span> {lead.tags.map(tag => (
          <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">{tag}</span>
        ))}</div>
        <div className="mb-4"><span className="font-semibold">Notes:</span> {lead.notes}</div>
      </div>
    </div>
  );
} 