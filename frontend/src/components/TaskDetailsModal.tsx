'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { XMarkIcon, CalendarIcon, FlagIcon, LinkIcon, BriefcaseIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  priority: 'low' | 'medium' | 'high';
  end_date: string;
  start_date: string;
  created_at: string;
  mother_task: string | null;
  project_id: string;
  assigned_to: string[];
  platforms?: string[];
  content_type?: string;
  tags?: string[];
};

type User = {
    id: string;
    name: string;
    avatar: string;
};

type Project = {
    id: string;
    name: string;
};

type RawTask = {
    id: string;
    title: string;
};

interface TaskDetailsModalProps {
  task: Task | null;
  project: Project | null;
  motherTask: RawTask | null;
  assignees: User[];
  onClose: () => void;
}

const statusOptions = [
  { value: 'planning', label: 'Planning' },
  { value: 'doing', label: 'In Progress' },
  { value: 'qc', label: 'Quality Check' },
  { value: 'redo', label: 'Redo' },
  { value: 'done', label: 'Done' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'archived', label: 'Archived' },
];

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, project, motherTask, assignees, onClose }) => {
  const [status, setStatus] = useState(task?.status || 'planning');
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                
                <div className="md:col-span-3">
                    <p className="text-gray-600">{task.description || 'No description provided.'}</p>
                </div>

                <div className="md:col-span-3 border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Details</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3">
                            <BriefcaseIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                            <div>
                                <p className="font-semibold text-gray-700">Project</p>
                                {project ? (
                                  <Link href={`/business-desk/projects/${project.id}`} className="text-blue-600 hover:underline">
                                    {project.name}
                                  </Link>
                                ) : (
                                  <span className="text-gray-500">N/A</span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FlagIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                            <div>
                                <p className="font-semibold text-gray-700">Status</p>
                                <select
                                  className="text-sm text-gray-700 border border-gray-200 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  value={status}
                                  onChange={e => setStatus(e.target.value as Task['status'])}
                                >
                                  {statusOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                  ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                            <div>
                                <p className="font-semibold text-gray-700">Priority</p>
                                <p className="text-sm text-gray-500 capitalize">{task.priority}</p>
                            </div>
                        </div>
                        {motherTask && (
                            <div className="flex items-start gap-3">
                                <LinkIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                                <div>
                                    <p className="font-semibold text-gray-700">Mother Task</p>
                                    <p className="text-sm text-gray-500">{motherTask.title}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-3 col-span-2 sm:col-span-3">
                             <CalendarIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                            <div>
                                <p className="font-semibold text-gray-700">Timeline</p>
                                <p className="text-sm text-gray-500">
                                    {format(new Date(task.start_date), 'MMM d, yyyy')} - {format(new Date(task.end_date), 'MMM d, yyyy')}
                                </p>
                                <p className="text-xs text-gray-400">Assigned: {format(new Date(task.created_at), 'MMM d, yyyy')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 col-span-2 sm:col-span-3">
                            <CalendarIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                            <div>
                                <p className="font-semibold text-gray-700">Assigned Date</p>
                                <p className="text-sm text-gray-500">{format(new Date(task.created_at), 'MMM d, yyyy')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3 border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Assignees</h3>
                    <div className="flex flex-wrap gap-3">
                        {assignees.map(user => (
                            <div key={user.id} className="flex items-center gap-2" title={user.name}>
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                 {(task.platforms && task.platforms.length > 0) && (
                    <div className="md:col-span-3 border-t border-gray-200 pt-6">
                        <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Platforms</h3>
                        <div className="flex flex-wrap gap-2">
                            {task.platforms.map((platform, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                    {platform}
                                </span>
                            ))}
                        </div>
                    </div>
                 )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal; 