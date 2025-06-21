import Link from 'next/link';
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

export default function LeadsListPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(leads as Lead[]).map((lead) => (
              <tr key={lead.id} className="hover:bg-blue-50 cursor-pointer transition">
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link href={`/business-desk/leads/${lead.id}`} className="text-blue-600 hover:underline">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{lead.company}</td>
                <td className="px-4 py-3 whitespace-nowrap">{lead.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">{lead.phone}</td>
                <td className="px-4 py-3 whitespace-nowrap">{lead.source}</td>
                <td className="px-4 py-3 whitespace-nowrap">{lead.status}</td>
                <td className="px-4 py-3 whitespace-nowrap">${lead.value.toLocaleString()}</td>
                <td className="px-4 py-3 whitespace-nowrap">{lead.assignedTo}</td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(lead.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 