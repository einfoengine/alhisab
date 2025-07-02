import React, { useEffect } from 'react';
import clientsData from '../../../../data/clients.json';
import projectsData from '../../../../data/projects.json';

interface AuditHeaderProps {
  clientId: string;
  setClientId: (id: string) => void;
  projectId: string;
  setProjectId: (id: string) => void;
  auditNumber: string;
}

interface Client {
  id: string;
  client_name: string;
  projects?: { id: string; name: string }[];
}

interface Project {
  id: string;
  name: string;
  client_id: string;
}

const AuditHeader: React.FC<AuditHeaderProps> = ({ clientId, setClientId, projectId, setProjectId, auditNumber }) => {
  const clients: Client[] = clientsData as Client[];
  const allProjects: Project[] = (projectsData as any).projects;

  // Filter projects by selected client
  const filteredProjects = allProjects.filter(p => p.client_id === clientId);

  // When client changes, reset project
  useEffect(() => {
    if (clientId && (!projectId || !filteredProjects.some(p => p.id === projectId))) {
      setProjectId(filteredProjects[0]?.id || '');
    }
    // eslint-disable-next-line
  }, [clientId]);

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 bg-white border border-blue-100 rounded-xl shadow p-6 mb-6">
      {/* Client select */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-blue-700 mb-1">Client</label>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={clientId}
          onChange={e => setClientId(e.target.value)}
        >
          <option value="">Select a client...</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.client_name}</option>
          ))}
        </select>
      </div>
      {/* Project select */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-blue-700 mb-1">Project</label>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          disabled={!clientId}
        >
          <option value="">{clientId ? 'Select a project...' : 'Select a client first'}</option>
          {filteredProjects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>
      {/* Audit number (read-only) */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-blue-700 mb-1">Audit Number</label>
        <input
          className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-700 font-mono"
          value={auditNumber}
          readOnly
        />
      </div>
    </div>
  );
};

export default AuditHeader; 