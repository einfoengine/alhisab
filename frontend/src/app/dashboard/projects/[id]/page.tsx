'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  TrashIcon,
  CalendarIcon,
  UserIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

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

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        const foundProject = data.projects.find((p: Project) => p.id === params.id);
        setProject(foundProject || null);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/projects/edit/${params.id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Here you would typically make an API call to delete the project
      console.log('Deleting project:', params.id);
      router.push('/projects');
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setShowDeleteModal(false);
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

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16">
          <div className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
              <p className="mt-2 text-gray-600">The project you're looking for doesn't exist.</p>
              <button
                onClick={() => router.push('/projects')}
                className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Projects
              </button>
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
          <div className="mb-8">
            <button
              onClick={() => router.push('/projects')}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Projects
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                    <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Details */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Project Details</h2>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Client</p>
                            <p className="text-sm text-gray-900">{project.clientName}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Project Master</p>
                            <p className="text-sm text-gray-900">{project.projectMaster}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <TagIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Project Type</p>
                            <p className="text-sm text-gray-900 capitalize">{project.projectType}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Timeline</p>
                            <p className="text-sm text-gray-900">
                              {formatDate(project.startDate)} - {formatDate(project.endDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Information */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Financial Information</h2>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Project Value</p>
                            <p className="text-sm text-gray-900">{formatCurrency(project.projectValue)}</p>
                          </div>
                        </div>
                        {project.dueInvoices > 0 && (
                          <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 text-red-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Due Invoices</p>
                              <p className="text-sm text-red-600">{formatCurrency(project.dueInvoices)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status and Tasks */}
                  <div className="space-y-6">
                    {/* Status */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Status</h2>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ').charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
                      </span>
                    </div>

                    {/* Key Tasks */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Key Tasks</h2>
                      <div className="flex flex-wrap gap-2">
                        {project.keyTasks.map((task, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                          >
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
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