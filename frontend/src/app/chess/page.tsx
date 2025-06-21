'use client';

import React, { useState, useEffect } from 'react';
import { 
  FolderIcon, 
  PlusIcon, 
  ChevronDownIcon, 
  ChevronRightIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Sample projects data - in a real app this would come from an API
const projects = [
  {
    id: 'proj_001',
    name: 'E-commerce Website Development',
    status: 'active',
    progress: 75,
    tasks: [
      { id: 'task_001', name: 'Design Homepage', status: 'completed' },
      { id: 'task_002', name: 'Implement Payment Gateway', status: 'in_progress' },
      { id: 'task_003', name: 'Setup Database', status: 'pending' },
    ]
  },
  {
    id: 'proj_002',
    name: 'Mobile App Development',
    status: 'planning',
    progress: 25,
    tasks: [
      { id: 'task_004', name: 'UI/UX Design', status: 'in_progress' },
      { id: 'task_005', name: 'Backend API', status: 'pending' },
    ]
  },
  {
    id: 'proj_003',
    name: 'Digital Marketing Campaign',
    status: 'completed',
    progress: 100,
    tasks: [
      { id: 'task_006', name: 'SEO Optimization', status: 'completed' },
      { id: 'task_007', name: 'Social Media Management', status: 'completed' },
    ]
  }
];

interface ChessSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const ChessSidebar: React.FC<ChessSidebarProps> = ({ collapsed, setCollapsed }) => {
  const pathname = usePathname() || '';
  const [expandedProjects, setExpandedProjects] = useState<string[]>(['proj_001']);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`fixed top-0 left-0 h-screen z-30 bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && <h1 className="text-xl font-bold text-gray-800">Chess</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2">
        {/* Main Navigation */}
        <div className="mb-6">
          <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${collapsed ? 'hidden' : 'block'}`}>
            Navigation
          </div>
          <div className="space-y-1">
            <Link
              href="/chess"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <DocumentTextIcon className="w-4 h-4 mr-3" />
              {!collapsed && <span>Dashboard</span>}
            </Link>
            <Link
              href="/chess/calendar"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess/calendar'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CalendarIcon className="w-4 h-4 mr-3" />
              {!collapsed && <span>Calendar</span>}
            </Link>
            <Link
              href="/chess/team"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess/team'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <UserGroupIcon className="w-4 h-4 mr-3" />
              {!collapsed && <span>Team</span>}
            </Link>
            <Link
              href="/chess/analytics"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess/analytics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChartBarIcon className="w-4 h-4 mr-3" />
              {!collapsed && <span>Analytics</span>}
            </Link>
            <Link
              href="/chess/settings"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess/settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Cog6ToothIcon className="w-4 h-4 mr-3" />
              {!collapsed && <span>Settings</span>}
            </Link>
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className={`flex items-center justify-between mb-2 ${collapsed ? 'hidden' : 'block'}`}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Projects
            </div>
            <button className="p-1 rounded hover:bg-gray-100">
              <PlusIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-1">
            {projects.map((project) => (
              <div key={project.id}>
                <button
                  onClick={() => toggleProject(project.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname.includes(`/chess/project/${project.id}`)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <FolderIcon className="w-4 h-4 mr-3" />
                    {!collapsed && (
                      <div className="text-left">
                        <div className="font-medium">{project.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {!collapsed && (
                    expandedProjects.includes(project.id) ? (
                      <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4" />
                    )
                  )}
                </button>
                
                {/* Project Tasks */}
                {expandedProjects.includes(project.id) && !collapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {project.tasks.map((task) => (
                      <Link
                        key={task.id}
                        href={`/chess/project/${project.id}/task/${task.id}`}
                        className={`block px-3 py-1.5 text-xs rounded transition-colors ${
                          pathname.includes(`/chess/project/${project.id}/task/${task.id}`)
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {task.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

const ChessPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Hide main sidebar when on chess routes
  useEffect(() => {
    const mainSidebar = document.querySelector('.nt-sidebar') as HTMLElement;
    const mainBody = document.querySelector('.nt-main-body') as HTMLElement;
    
    if (mainSidebar) {
      mainSidebar.style.display = 'none';
    }
    if (mainBody) {
      mainBody.style.marginLeft = '0';
    }

    return () => {
      if (mainSidebar) {
        mainSidebar.style.display = 'flex';
      }
      if (mainBody) {
        mainBody.style.marginLeft = '';
      }
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ChessSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      {/* Main Content */}
      <div className={`transition-all duration-200 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Chess Dashboard</h1>
              <p className="text-gray-600 mt-2">Your project management workspace</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CalendarIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {projects.filter(p => p.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <UserGroupIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Team Members</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ChartBarIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <FolderIcon className="w-8 h-8 text-blue-600 mr-4" />
                        <div>
                          <h3 className="font-medium text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.tasks.length} tasks</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{project.progress}%</div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessPage; 