'use client';

import React, { useState, useEffect } from 'react';
import tasks from '@/data/tasks.json';
import users from '@/data/users.json';
import AssigneeSelector from './AssigneeSelector';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  CheckCircleIcon,
  PlusIcon,
  ArrowPathIcon,
  FlagIcon,
  PlayCircleIcon,
  PaperClipIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface TaskFormData {
  project_id: string;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
  assignee: string[];
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  description: string;
  estimated_time: string;
  task_type: 'one_time' | 'repetitive';
  checklist: Array<{ id: string; text: string; completed: boolean }>;
  departments: string[];
  mother_task?: string;
  subtasks: Array<{ 
    id: string; 
    title: string; 
    status: string; 
    assignee: string[];
    start_date: string;
    end_date: string;
    mother_task?: string;
    task_type: 'one_time' | 'repetitive';
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    files: Array<{ id: string; name: string; type: string; size: number; url: string }>;
  }>;
  files: Array<{ id: string; name: string; type: string; size: number; url: string }>;
}

interface TasksFormProps {
  taskId?: string;
}

const TASK_TYPE_OPTIONS = [
  { value: 'one_time', label: 'One Time' },
  { value: 'repetitive', label: 'Repetitive' }
];

const STATUS_OPTIONS = [
  { value: 'planning', label: 'Planning', color: 'bg-gray-100 text-gray-800' },
  { value: 'doing', label: 'Doing', color: 'bg-blue-100 text-blue-800' },
  { value: 'qc', label: 'QC', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'redo', label: 'Redo', color: 'bg-red-100 text-red-800' },
  { value: 'done', label: 'Done', color: 'bg-green-100 text-green-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-purple-100 text-purple-800' },
  { value: 'archived', label: 'Archived', color: 'bg-gray-100 text-gray-600' }
];

const ESTIMATED_TIME_OPTIONS = [
  { value: '1_hour', label: '1 Hour', days: 0.04 },
  { value: '2_hours', label: '2 Hours', days: 0.08 },
  { value: '4_hours', label: '4 Hours', days: 0.17 },
  { value: '1_day', label: '1 Day', days: 1 },
  { value: '2_days', label: '2 Days', days: 2 },
  { value: '3_days', label: '3 Days', days: 3 },
  { value: '1_week', label: '1 Week', days: 7 },
  { value: '2_weeks', label: '2 Weeks', days: 14 },
  { value: '1_month', label: '1 Month', days: 30 }
];

const DEFAULT_SUBTASKS = [
  { title: 'Verification', status: 'planning' },
  { title: 'Design', status: 'planning' },
  { title: 'Content & Multimedia', status: 'planning' },
  { title: 'QC', status: 'planning' },
  { title: 'Client Check', status: 'planning' },
  { title: 'Deliver', status: 'planning' }
];

const TasksForm: React.FC<TasksFormProps> = ({ taskId }) => {
  const [formData, setFormData] = useState<TaskFormData>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    
    return {
      project_id: '',
      title: '',
      status: 'planning',
      start_date: tomorrow.toISOString().split('T')[0],
      end_date: dayAfterTomorrow.toISOString().split('T')[0],
      assignee: [],
      tags: [],
      priority: 'medium',
      description: '',
      estimated_time: '',
      task_type: 'one_time',
      checklist: [],
      departments: [],
      subtasks: [],
      files: [],
      mother_task: undefined
    };
  });

  const [newSubtask, setNewSubtask] = useState({
    title: '',
    assignee: [],
    start_date: '',
    end_date: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    tags: [],
    task_type: 'one_time' as 'one_time' | 'repetitive',
    status: 'planning',
    files: [],
  });
  const [activeEditor, setActiveEditor] = useState<string | null>(null);

  // Load task data when editing
  useEffect(() => {
    if (taskId) {
      const task = tasks.tasks.find(t => t.id === taskId);
      if (task) {
        setFormData({
          project_id: task.project_id || '',
          title: task.title || '',
          status: task.status || 'planning',
          start_date: task.start_date || '',
          end_date: task.end_date || '',
          assignee: Array.isArray(task.assigned_to) ? task.assigned_to : [],
          tags: Array.isArray(task.tags) ? task.tags : [],
          priority: (task.priority as 'low' | 'medium' | 'high') || 'medium',
          description: task.description || '',
          estimated_time: '2_days',
          task_type: (task.type as 'one_time' | 'repetitive') || 'one_time',
          checklist: [],
          departments: [],
          subtasks: DEFAULT_SUBTASKS.map((subtask, index) => ({
            id: (index + 1).toString(),
            title: subtask.title,
            status: subtask.status,
            assignee: [],
            start_date: '',
            end_date: '',
            mother_task: task.id,
            task_type: (task.type as 'one_time' | 'repetitive') || 'one_time',
            priority: (task.priority as 'low' | 'medium' | 'high') || 'medium',
            tags: [],
            files: [],
          })),
          files: [],
          mother_task: task.id
        });
      }
    } else {
      // For new tasks, add default subtasks
      setFormData(prev => ({
        ...prev,
        subtasks: DEFAULT_SUBTASKS.map((subtask, index) => ({
          id: (index + 1).toString(),
          title: subtask.title,
          status: subtask.status,
          assignee: [],
          start_date: '',
          end_date: '',
          mother_task: undefined,
          task_type: 'one_time',
          priority: 'medium',
          tags: [],
          files: [],
        }))
      }));
    }
  }, [taskId]);

  const handleInputChange = (field: keyof TaskFormData, value: string | string[] | 'low' | 'medium' | 'high') => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNewSubtaskChange = (field: string, value: string | string[] | 'low' | 'medium' | 'high') => {
    setNewSubtask(prev => ({ ...prev, [field]: value }));
  };

  const handleEstimatedTimeChange = (value: string) => {
    const selectedOption = ESTIMATED_TIME_OPTIONS.find(option => option.value === value);
    if (selectedOption && formData.start_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + selectedOption.days);
      
      setFormData(prev => ({
        ...prev,
        estimated_time: value,
        end_date: endDate.toISOString().split('T')[0]
      }));
    } else {
      setFormData(prev => ({ ...prev, estimated_time: value }));
    }
  };

  const addSubtask = () => {
    if (newSubtask.title.trim()) {
      setFormData(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, {
          id: Date.now().toString(),
          ...newSubtask,
          mother_task: prev.mother_task,
        }]
      }));
      setNewSubtask({
        title: '',
        assignee: [],
        start_date: '',
        end_date: '',
        priority: 'medium',
        tags: [],
        task_type: 'one_time',
        status: 'planning',
        files: [],
      });
      setActiveEditor(null);
    }
  };

  const removeSubtask = (id: string) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(subtask => subtask.id !== id)
    }));
  };

  const updateSubtask = (id: string, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(subtask =>
        subtask.id === id ? { ...subtask, [field]: value } : subtask
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (taskId) {
      console.log('Updating task:', taskId);
      // Add your update logic here
    } else {
      console.log('Creating new task');
      // Add your creation logic here
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        {/* Task Title */}
        <div className="mb-6">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full text-2xl font-bold border-none focus:ring-0 p-0"
            placeholder="Task Title"
          />
        </div>

        {/* Main form grid */}
        <div className="grid grid-cols-[max-content_1fr] items-center gap-x-8 gap-y-4 mb-8">
          {/* Status */}
          <div className="flex items-center text-sm font-medium text-gray-600">
            <ArrowPathIcon className="w-5 h-5 mr-3" />
            Status
          </div>
          <div>
            <select 
              value={formData.status} 
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="p-1 border border-gray-300 rounded-md text-sm"
            >
              {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          {/* Assignees */}
          <div className="flex items-center text-sm font-medium text-gray-600">
            <UserIcon className="w-5 h-5 mr-3" />
            Assignees
          </div>
          <div>
            <AssigneeSelector
              selectedAssignees={formData.assignee}
              onAssigneesChange={(assignees) => handleInputChange('assignee', assignees)}
            />
          </div>

          {/* Dates */}
          <div className="flex items-center text-sm font-medium text-gray-600">
            <CalendarIcon className="w-5 h-5 mr-3" />
            Dates
          </div>
          <div className="flex items-center gap-2">
            <input type="date" value={formData.start_date} onChange={e => handleInputChange('start_date', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm" />
            <span>→</span>
            <input type="date" value={formData.end_date} onChange={e => handleInputChange('end_date', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm" />
          </div>
          
          {/* Priority */}
          <div className="flex items-center text-sm font-medium text-gray-600">
            <FlagIcon className="w-5 h-5 mr-3" />
            Priority
          </div>
          <div>
             <select value={formData.priority} onChange={e => handleInputChange('priority', e.target.value as 'low' | 'medium' | 'high')} className="p-1 border border-gray-300 rounded-md text-sm">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
             </select>
          </div>
          
          {/* Time Estimate */}
          <div className="flex items-center text-sm font-medium text-gray-600">
            <ClockIcon className="w-5 h-5 mr-3" />
            Time Estimate
          </div>
          <div>
            <select value={formData.estimated_time} onChange={e => handleEstimatedTimeChange(e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm">
                 <option value="">Select duration</option>
              {ESTIMATED_TIME_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Task Type */}
          <div className="flex items-center text-sm font-medium text-gray-600">
            <CheckCircleIcon className="w-5 h-5 mr-3" />
            Task Type
          </div>
          <div>
             <select value={formData.task_type} onChange={e => handleInputChange('task_type', e.target.value as 'one_time' | 'repetitive')} className="p-1 border border-gray-300 rounded-md text-sm">
                {TASK_TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
             </select>
          </div>
          
          {/* Track Time */}
          <div className="flex items-center text-sm font-medium text-gray-600">
            <PlayCircleIcon className="w-5 h-5 mr-3" />
            Track Time
          </div>
          <button type="button" className="flex items-center gap-2 text-sm text-blue-600">
            <PlayCircleIcon className="w-5 h-5" />
            Add time
          </button>
        </div>

        {/* Separator */}
        <hr className="my-6" />

        {/* Description */}
        <div>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a description..."
          />
        </div>

        {/* Subtasks Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Subtasks</h3>
          {/* Existing Subtasks Table */}
          {formData.subtasks.length > 0 && (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full bg-white">
                 <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">Task Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Assignee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Status</th>
                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Task Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Mother Task</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Start Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">End Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">Actions</th>
                    </tr>
                  </thead>
                <tbody className="divide-y divide-gray-200">
                  {formData.subtasks.map((subtask) => (
                    <tr key={subtask.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          value={subtask.title}
                          onChange={(e) => updateSubtask(subtask.id, 'title', e.target.value)}
                          className="w-full px-2 py-1 border border-transparent rounded hover:border-gray-300 focus:border-blue-500 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter task name"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex -space-x-2 overflow-hidden">
                            {subtask.assignee.map(assigneeId => {
                                const user = users.users.find((u: User) => u.id === assigneeId);
                                return user ? (
                                    <img key={user.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={user.avatar} alt={user.name} title={user.name} />
                                ) : null;
                            })}
                          </div>
                          <button type="button" onClick={() => setActiveEditor(`assignee-${subtask.id}`)} className="ml-2 p-1 rounded-full hover:bg-gray-200">
                            <PlusIcon className="w-4 h-4" />
                          </button>
                           {activeEditor === `assignee-${subtask.id}` && (
                              <div className="absolute z-10 bg-white shadow-lg rounded-lg p-2">
                                <AssigneeSelector
                                  selectedAssignees={subtask.assignee}
                                  onAssigneesChange={(assignees) => {
                                    updateSubtask(subtask.id, 'assignee', assignees)
                                    setActiveEditor(null);
                                  }}
                                />
                                <button onClick={() => setActiveEditor(null)} className="mt-2 text-xs">Close</button>
                              </div>
                            )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                         <select value={subtask.status} onChange={(e) => updateSubtask(subtask.id, 'status', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm">
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                      </td>
                         <td className="px-4 py-3 whitespace-nowrap">
                           <select value={subtask.task_type} onChange={(e) => updateSubtask(subtask.id, 'task_type', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm">
                              {TASK_TYPE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <select
                            value={subtask.mother_task || ''}
                            onChange={(e) => updateSubtask(subtask.id, 'mother_task', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="">Select mother task</option>
                            {tasks.tasks.filter(task => task.id !== taskId).map((task) => (
                              <option key={task.id} value={task.id}>
                                {task.title}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input
                            type="date"
                            value={subtask.start_date}
                            onChange={(e) => updateSubtask(subtask.id, 'start_date', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input
                            type="date"
                            value={subtask.end_date}
                            onChange={(e) => updateSubtask(subtask.id, 'end_date', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => removeSubtask(subtask.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            title="Remove subtask"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          )}

          {/* Add Subtask Form */}
          <div className="flex items-center gap-2 p-2 border rounded-lg mt-4 relative">
            <PlusIcon className="w-5 h-5 text-gray-400" />
            <input 
              type="text"
              value={newSubtask.title}
              onChange={(e) => handleNewSubtaskChange('title', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
              placeholder="Add a subtask..."
              className="flex-grow p-1 border-none focus:ring-0"
            />
            <div className="flex items-center gap-1">
              {/* Attachment */}
              <button type="button" onClick={() => {/* Logic for file upload */}} className="p-2 text-gray-500 hover:bg-gray-100 rounded"><PaperClipIcon className="w-5 h-5" /></button>
              
              {/* Assignee */}
               <button type="button" onClick={() => setActiveEditor('new-assignee')} className="p-2 text-gray-500 hover:bg-gray-100 rounded"><UserIcon className="w-5 h-5" /></button>
              
              {/* Dates */}
              <button type="button" onClick={() => setActiveEditor('new-date')} className="p-2 text-gray-500 hover:bg-gray-100 rounded"><CalendarIcon className="w-5 h-5" /></button>
              
              {/* Priority */}
              <button type="button" onClick={() => setActiveEditor('new-priority')} className="p-2 text-gray-500 hover:bg-gray-100 rounded"><FlagIcon className="w-5 h-5" /></button>
            </div>
            <button type="button" onClick={addSubtask} className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 text-sm">Save</button>
            <button type="button" onClick={() => setNewSubtask({ ...newSubtask, title: ''})} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>

            {/* Pop-up Editors */}
            {activeEditor === 'new-assignee' && (
              <div className="absolute top-full mt-2 z-10 bg-white p-4 rounded-lg shadow-lg border">
                <h4 className="font-semibold mb-2">Assign to</h4>
                <AssigneeSelector selectedAssignees={newSubtask.assignee} onAssigneesChange={(a) => handleNewSubtaskChange('assignee', a)} />
                <button onClick={() => setActiveEditor(null)} className="mt-2 text-xs text-blue-500">Close</button>
              </div>
            )}
            {activeEditor === 'new-date' && (
              <div className="absolute top-full mt-2 z-10 bg-white p-4 rounded-lg shadow-lg border space-y-2">
                <div>
                  <label className="text-xs">Start Date</label>
                  <input type="date" value={newSubtask.start_date} onChange={e => handleNewSubtaskChange('start_date', e.target.value)} className="w-full p-1 border rounded" />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <input type="date" value={newSubtask.end_date} onChange={e => handleNewSubtaskChange('end_date', e.target.value)} className="w-full p-1 border rounded" />
                </div>
                 <button onClick={() => setActiveEditor(null)} className="mt-2 text-xs text-blue-500">Close</button>
              </div>
            )}
            {activeEditor === 'new-priority' && (
                <div className="absolute top-full mt-2 z-10 bg-white p-4 rounded-lg shadow-lg border">
                    <h4 className="font-semibold mb-2">Set Priority</h4>
                    <select value={newSubtask.priority} onChange={e => handleNewSubtaskChange('priority', e.target.value)} className="w-full p-1 border rounded">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                     <button onClick={() => setActiveEditor(null)} className="mt-2 text-xs text-blue-500">Close</button>
                </div>
            )}
          </div>
        </div>
        
        {/* Final Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-8 border-t">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {taskId ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TasksForm; 