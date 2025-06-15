'use client';

import { useParams } from 'next/navigation';
import clientsData from '@/data/clients.json';
import meetingsData from '@/data/meetings.json';
import PageHeader from '@/components/elements/PageHeader';
import { CalendarIcon, DocumentTextIcon, BriefcaseIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface Client {
  id: string;
  client_name: string;
  company_names: string[];
  status: string;
  email: string;
  address?: string;
  phone: { country_code: string; number: string; whatsapp: boolean };
  preferred_contact_method: string;
  avatar: string;
  notes?: string;
}

interface Meeting {
  id: string;
  client_id: string;
  date: string;
  duration: number;
  type: string;
  status: string;
  members: Array<{
    name: string;
    role: string;
    email: string;
  }>;
  topics: string[];
  notes: string;
}

interface RawClient {
  [key: string]: unknown;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

export default function ClientDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;

  // Find the client
  const client = (clientsData as RawClient[])
    .filter((c) => c.id === clientId)
    .map((c) => ({
      id: c.id as string,
      client_name: c.client_name as string,
      company_names: c.company_names as string[],
      status: c.status as string,
      email: c.email as string,
      address: c.address as string | undefined,
      phone: c.phone as { country_code: string; number: string; whatsapp: boolean },
      preferred_contact_method: c.preferred_contact_method as string,
      avatar: c.avatar as string,
      notes: c.notes as string | undefined,
    }))[0];

  // Get client meetings
  const meetings: Meeting[] = meetingsData.meetings.filter(m => m.client_id === clientId);

  if (!client) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Client not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Client Details"
        actions={[{
          name: 'Back to Clients',
          icon: ArrowLeftIcon,
          onClick: () => router.push('/dashboard/clients'),
        }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Left Column - Client Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4 mb-6">
              {client.avatar ? (
                <img src={client.avatar} alt={client.client_name} className="h-20 w-20 rounded-full object-cover border-2 border-blue-400 shadow" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white font-bold text-2xl shadow">
                  {client.client_name ? client.client_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2) : '?'}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{client.client_name}</h2>
                <p className="text-gray-600">{client.company_names?.join(', ')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Email:</span> {client.email}</p>
                  <p><span className="font-medium">Phone:</span> {client.phone?.number}</p>
                  <p><span className="font-medium">Preferred Contact:</span> {client.preferred_contact_method}</p>
                  {client.address && <p><span className="font-medium">Address:</span> {client.address}</p>}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Status & Notes</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Status:</span> {client.status}</p>
                  {client.notes && <p><span className="font-medium">Notes:</span> {client.notes}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <DocumentTextIcon className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Agreements</h3>
            </div>
            <p className="text-gray-600">No active agreements</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <BriefcaseIcon className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
            </div>
            <p className="text-gray-600">No active projects</p>
          </div>
        </div>

        {/* Right Column - Meetings and Calendar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h3>
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{meeting.type}</h4>
                      <p className="text-sm text-gray-600">{formatDate(meeting.date)}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      meeting.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {meeting.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Topics:</span> {meeting.topics.join(', ')}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Members:</span>
                      </p>
                      <ul className="mt-1 space-y-1">
                        {meeting.members.map((member, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {member.name} ({member.role})
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Meeting Calendar</h3>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Calendar component will be implemented here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 