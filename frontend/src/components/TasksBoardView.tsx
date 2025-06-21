'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PlusIcon, EllipsisVerticalIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import users from '@/data/users.json';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';

type Task = {
  id: string;
  title: string;
  description: string;
  type: 'repetitive' | 'one_time';
  category_id: string;
  categories: string[];
  frequency?: 'daily' | 'weekly' | 'monthly';
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  assigned_to: string[];
  priority: 'low' | 'medium' | 'high';
  order: number;
  created_at: string;
  start_date: string;
  end_date: string;
  last_completed?: string;
  next_due?: string;
  progress?: number;
  tags: string[];
  content_type: string;
  mother_task?: string | null;
  project_id: string;
  platforms: string[];
  [key: string]: string | string[] | number | boolean | null | undefined;
};

interface TasksBoardViewProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onAddTask: () => void;
}

const STATUS_COLUMNS = [
  { id: 'planning', title: 'Planning', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700' },
  { id: 'doing', title: 'In Progress', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-700' },
  { id: 'qc', title: 'Quality Check', color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700' },
  { id: 'redo', title: 'Redo', color: 'bg-red-50 border-red-200', textColor: 'text-red-700' },
  { id: 'done', title: 'Done', color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
  { id: 'delivered', title: 'Delivered', color: 'bg-indigo-50 border-indigo-200', textColor: 'text-indigo-700' },
  { id: 'archived', title: 'Archived', color: 'bg-gray-50 border-gray-200', textColor: 'text-gray-700' },
];

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200',
};

const PLATFORM_OPTIONS = [
  { value: 'FB', label: 'Facebook', color: 'bg-blue-600' },
  { value: 'Insta', label: 'Instagram', color: 'bg-pink-500' },
  { value: 'Youtube', label: 'YouTube', color: 'bg-red-600' },
  { value: 'Website', label: 'Website', color: 'bg-gray-700' },
];

function SortableTaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getProjectName = (id: string) => {
    const project = projectsData.projects.find(p => p.id === id);
    return project?.name || 'Unknown Project';
  };

  const getServiceName = (id: string) => {
    const service = servicesData.services.find(s => s.id === id);
    return service?.name || 'Unknown Service';
  };

  const getAssignedUsers = () => {
    return task.assigned_to.map(userId => {
      const user = users.users.find(u => u.id === userId);
      return user;
    }).filter(Boolean);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const assignedUsers = getAssignedUsers();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900 text-sm leading-tight">{task.title}</h4>
        <button className="text-gray-400 hover:text-gray-600">
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Task Meta */}
      <div className="space-y-2 mb-3">
        {/* Project */}
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <TagIcon className="w-3 h-3" />
          <span>{getProjectName(task.project_id)}</span>
        </div>

        {/* Service Type */}
        <div className="text-xs text-gray-600">
          {getServiceName(task.content_type)}
        </div>

        {/* Priority */}
        <div className="flex items-center gap-2">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${PRIORITY_COLORS[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
      </div>

      {/* Platforms */}
      {task.platforms && task.platforms.length > 0 && (
        <div className="flex items-center gap-1 mb-3">
          {task.platforms.slice(0, 3).map((platform) => {
            const platformOption = PLATFORM_OPTIONS.find(p => p.value === platform);
            return (
              <span
                key={platform}
                className={`w-2 h-2 rounded-full ${platformOption?.color || 'bg-gray-400'}`}
                title={platformOption?.label || platform}
              />
            );
          })}
          {task.platforms.length > 3 && (
            <span className="text-xs text-gray-500">+{task.platforms.length - 3}</span>
          )}
        </div>
      )}

      {/* Dates */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-3 h-3" />
          <span>{formatDate(task.start_date)}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-3 h-3" />
          <span>{formatDate(task.end_date)}</span>
        </div>
      </div>

      {/* Assignees */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {assignedUsers.slice(0, 3).map((user) => (
            <div
              key={user?.id}
              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700"
              title={user?.name}
            >
              {user?.name.charAt(0).toUpperCase()}
            </div>
          ))}
          {assignedUsers.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">
              +{assignedUsers.length - 3}
            </div>
          )}
        </div>

        {/* Progress */}
        {task.progress !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{task.progress}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

const TasksBoardView: React.FC<TasksBoardViewProps> = ({ tasks, onUpdateTask, onAddTask }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeTask = tasks.find(task => task.id === active.id);
      const overColumn = STATUS_COLUMNS.find(col => col.id === over.id);
      
      if (activeTask && overColumn) {
        onUpdateTask(activeTask.id, { status: overColumn.id as Task['status'] });
      }
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="h-full overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 p-4 min-w-max">
          {STATUS_COLUMNS.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            
            return (
              <div
                key={column.id}
                className={`flex-shrink-0 w-80 ${column.color} border rounded-lg p-4`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${column.textColor}`}>
                      {column.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${column.textColor} bg-white/50`}>
                      {columnTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={onAddTask}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Column Tasks */}
                <div className="space-y-2">
                  <SortableContext
                    items={columnTasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {columnTasks.map((task) => (
                      <SortableTaskCard
                        key={task.id}
                        task={task}
                      />
                    ))}
                  </SortableContext>
                </div>

                {/* Empty State */}
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No tasks</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
};

export default TasksBoardView; 