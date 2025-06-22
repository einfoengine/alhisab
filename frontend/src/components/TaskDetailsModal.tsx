'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon, PencilIcon, TagIcon, CalendarIcon } from '@heroicons/react/24/outline';
import AssigneeFilter from './AssigneeFilter';
import usersData from '@/data/users.json';

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  assigned_to: string[];
  priority: 'low' | 'medium' | 'high';
  order: number;
  start_date: string;
  end_date: string;
  project_name: string;
  service_name: string;
  subtask_count?: number;
};

type TaskDetailsModalProps = {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<Task>) => void;
  columnConfig: Record<string, { name: string, color: string }>;
};

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, isOpen, onClose, onSave, columnConfig }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
    setIsEditing(false);
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    onSave(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };
  
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="p-4 border-b flex justify-between items-center flex-shrink-0">
          {isEditing ? (
            <input
              type="text"
              value={editedTask.title || ''}
              onChange={(e) => setEditedTask(prev => ({ ...prev, title: e.target.value }))}
              className="w-full text-lg font-semibold border-b-2 border-blue-500 focus:outline-none"
            />
          ) : (
            <h2 className="text-lg font-semibold">{task.title}</h2>
          )}
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="p-2 rounded-full hover:bg-gray-100">
                <PencilIcon className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </header>

        <main className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
            {isEditing ? (
              <textarea
                value={editedTask.description || ''}
                onChange={(e) => setEditedTask(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            ) : (
              <p className="text-gray-800">{task.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Project</label>
              <div className="flex items-center gap-2 text-gray-800">
                <TagIcon className="w-4 h-4 text-gray-400" />
                <span>{task.project_name}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Service</label>
              <p className="text-gray-800">{task.service_name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
                {isEditing ? (
                    <select
                        value={editedTask.status || 'planning'}
                        onChange={(e) => setEditedTask(prev => ({ ...prev, status: e.target.value as Task['status'] }))}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        {Object.entries(columnConfig).map(([status, config]) => (
                            <option key={status} value={status}>{config.name}</option>
                        ))}
                    </select>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${columnConfig[task.status]?.color || 'bg-gray-400'}`}></span>
                        <p className="text-gray-800">{columnConfig[task.status]?.name || 'Unknown'}</p>
                    </div>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Priority</label>
                {isEditing ? (
                    <select
                        value={editedTask.priority || 'medium'}
                        onChange={(e) => setEditedTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                ) : (
                    <p className="text-gray-800 capitalize">{task.priority}</p>
                )}
            </div>
          </div>
            
          <div className="grid grid-cols-1">
             <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Dates</label>
              <div className="flex items-center gap-4 text-gray-800">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(task.start_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(task.end_date)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Assignees</label>
            {isEditing ? (
                 <AssigneeFilter
                    selectedAssignees={editedTask.assigned_to || []}
                    onChange={(assignees) => setEditedTask(prev => ({ ...prev, assigned_to: assignees }))}
                />
            ) : (
                <div className="flex items-center gap-2">
                    {task.assigned_to.map(id => {
                        const user = usersData.users.find(u => u.id === id);
                        return user ? <img key={id} src={user.avatar} alt={user.name} title={user.name} className="w-8 h-8 rounded-full" /> : null;
                    })}
                </div>
            )}
          </div>
        </main>
        
        {isEditing && (
            <footer className="p-4 border-t flex justify-end gap-3 flex-shrink-0">
                <button onClick={handleCancel} className="px-4 py-2 rounded-md border">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 rounded-md bg-blue-600 text-white">Save Changes</button>
            </footer>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsModal; 