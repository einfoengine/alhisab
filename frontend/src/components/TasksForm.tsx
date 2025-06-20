'use client';

import React, { useState } from 'react';
import projectsData from '@/data/projects.json';
import users from '@/data/users.json';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  TagIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface TaskFormData {
  project_id: string;
  title: string;
  start_date: string;
  end_date: string;
  assignee: string[];
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  description: string;
  estimated_time: string;
  checklist: Array<{ id: string; text: string; completed: boolean }>;
  departments: string[];
  comments: Array<{ id: string; user: string; text: string; timestamp: string }>;
}

interface TasksFormProps {
  taskId?: string;
}

const DEPARTMENTS = [
  { id: 'design', name: 'Design' },
  { id: 'content', name: 'Content' },
  { id: 'management', name: 'Management' },
  { id: 'strategy_planning', name: 'Strategy & Planning' },
  { id: 'multimedia', name: 'Multimedia' },
  { id: 'animation', name: 'Animation' }
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
];

const TasksForm: React.FC<TasksFormProps> = ({ taskId }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    project_id: '',
    title: '',
    start_date: '',
    end_date: '',
    assignee: [],
    tags: [],
    priority: 'medium',
    description: '',
    estimated_time: '',
    checklist: [],
    departments: [],
    comments: []
  });

  const [newTag, setNewTag] = useState('');
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleInputChange = (field: keyof TaskFormData, value: string | string[] | 'low' | 'medium' | 'high') => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAssigneeToggle = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      assignee: prev.assignee.includes(userId)
        ? prev.assignee.filter(id => id !== userId)
        : [...prev.assignee, userId]
    }));
  };

  const handleDepartmentToggle = (deptId: string) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(deptId)
        ? prev.departments.filter(id => id !== deptId)
        : [...prev.departments, deptId]
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setFormData(prev => ({
        ...prev,
        checklist: [...prev.checklist, {
          id: Date.now().toString(),
          text: newChecklistItem.trim(),
          completed: false
        }]
      }));
      setNewChecklistItem('');
    }
  };

  const toggleChecklistItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const removeChecklistItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.filter(item => item.id !== id)
    }));
  };

  const addComment = () => {
    if (newComment.trim()) {
      setFormData(prev => ({
        ...prev,
        comments: [...prev.comments, {
          id: Date.now().toString(),
          user: 'Current User', // Replace with actual user
          text: newComment.trim(),
          timestamp: new Date().toISOString()
        }]
      }));
      setNewComment('');
    }
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project *
          </label>
          <select
            value={formData.project_id}
            onChange={(e) => handleInputChange('project_id', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a project</option>
            {projectsData.projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Task Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
            required
          />
        </div>

        {/* Start and End Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="inline w-4 h-4 mr-1" />
              Start Date *
            </label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => handleInputChange('start_date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="inline w-4 h-4 mr-1" />
              End Date *
            </label>
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => handleInputChange('end_date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Assignee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <UserIcon className="inline w-4 h-4 mr-1" />
            Assignee
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {users.users.map((user) => (
              <label key={user.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.assignee.includes(user.id)}
                  onChange={() => handleAssigneeToggle(user.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{user.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TagIcon className="inline w-4 h-4 mr-1" />
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <ExclamationTriangleIcon className="inline w-4 h-4 mr-1" />
            Priority
          </label>
          <div className="flex space-x-4">
            {PRIORITY_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={formData.priority === option.value}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className={`px-2 py-1 rounded text-xs font-medium ${option.color}`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the task in detail..."
          />
        </div>

        {/* Estimated Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <ClockIcon className="inline w-4 h-4 mr-1" />
            Estimated Time
          </label>
          <input
            type="text"
            value={formData.estimated_time}
            onChange={(e) => handleInputChange('estimated_time', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 2 hours, 1 day, 3 days"
          />
        </div>

        {/* Departments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <BuildingOfficeIcon className="inline w-4 h-4 mr-1" />
            Departments
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {DEPARTMENTS.map((dept) => (
              <label key={dept.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.departments.includes(dept.id)}
                  onChange={() => handleDepartmentToggle(dept.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{dept.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CheckCircleIcon className="inline w-4 h-4 mr-1" />
            Checklist
          </label>
          <div className="space-y-2 mb-2">
            {formData.checklist.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleChecklistItem(item.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={`flex-1 text-sm ${item.completed ? 'line-through text-gray-500' : ''}`}>
                  {item.text}
                </span>
                <button
                  type="button"
                  onClick={() => removeChecklistItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add checklist item"
            />
            <button
              type="button"
              onClick={addChecklistItem}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <ChatBubbleLeftRightIcon className="inline w-4 h-4 mr-1" />
            Comments
          </label>
          <div className="space-y-2 mb-2 max-h-40 overflow-y-auto">
            {formData.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium">{comment.user}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addComment())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment"
            />
            <button
              type="button"
              onClick={addComment}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
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