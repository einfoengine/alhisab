'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PencilIcon, 
  TrashIcon,
  CalendarIcon,
  UserIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TableBuilder from '@/components/TableBuilder';
import PageHeader from '@/components/PageHeader';

interface Project {
  id: string;
  name: string;
  clientName: string;
  projectMaster: string;
  projectType: 'single' | 'recurring';
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'in_progress';
  projectValue: number;
  dueInvoices: number;
  keyTasks: string[];
  description: string;
}

interface Column {
  key: string;
  label: string;
  render?: (item: Project) => React.ReactNode;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    router.push('/projects/create');
  };

  const handleEditProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    router.push(`/projects/edit/${projectId}`);
  };

  const handleDeleteProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProject) return;
    try {
      // Here you would typically make an API call to delete the project
      setProjects(prev => prev.filter(p => p.id !== selectedProject.id));
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setShowDeleteModal(false);
      setSelectedProject(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string) => {
    if (date === 'ongoing') return 'Ongoing';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const columns: Column[] = [
    {
      key: 'name',
      label: 'Project Name',
      render: (project) => (
        <div className="flex items-center cursor-pointer" onClick={() => handleProjectClick(project.id)}>
          <div>
            <div className="font-medium text-gray-900">{project.name}</div>
            <div className="text-sm text-gray-500">{project.clientName}</div>
          </div>
        </div>
      )
    },
    {
      key: 'projectMaster',
      label: 'Project Master',
      render: (project) => (
        <div className="flex items-center">
          <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span>{project.projectMaster}</span>
        </div>
      )
    },
    {
      key: 'projectType',
      label: 'Type',
      render: (project) => (
        <span className="capitalize">{project.projectType}</span>
      )
    },
    {
      key: 'dates',
      label: 'Timeline',
      render: (project) => (
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (project) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status.replace('_', ' ').charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
        </span>
      )
    },
    {
      key: 'projectValue',
      label: 'Value',
      render: (project) => (
        <div className="flex items-center">
          <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span>{formatCurrency(project.projectValue)}</span>
        </div>
      )
    },
    {
      key: 'dueInvoices',
      label: 'Due Invoices',
      render: (project) => (
        <div className="flex items-center">
          <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span>{formatCurrency(project.dueInvoices)}</span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (project) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={e => handleEditProject(e, project.id)}
            className="text-blue-600 hover:text-blue-900"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={e => handleDeleteProject(e, project)}
            className="text-red-600 hover:text-red-900"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          <PageHeader
            title="Projects"
            showViewToggle={false}
            actionLabel="New Project"
            onAction={handleCreateProject}
          />
          <TableBuilder
            data={projects}
            columns={columns}
            onRowClick={handleProjectClick}
          />
        </div>
      </main>
      {showDeleteModal && selectedProject && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Project</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 