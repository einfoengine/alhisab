'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/elements/PageHeader';
import tasks from '@/data/tasks.json';
import users from '@/data/users.json';
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Task = {
  id: string;
  title: string;
  description: string;
  type: 'repetitive' | 'one_time';
  category_id: string;
  frequency?: 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'pending' | 'in_progress' | 'completed';
  assigned_to: string;
  priority: 'low' | 'medium' | 'high';
  order: number;
  created_at: string;
  start_date: string;
  end_date: string;
  last_completed?: string;
  next_due?: string;
  progress?: number;
};

interface SortableTaskItemProps {
  task: Task;
  getAssignedUser: (userId: string) => any;
  getPriorityColor: (priority: Task['priority']) => string;
  getStatusColor: (status: Task['status']) => string;
  getCategoryName: (categoryId: string) => string;
}

function SortableTaskItem({
  task,
  getAssignedUser,
  getPriorityColor,
  getStatusColor,
  getCategoryName,
}: SortableTaskItemProps) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  const assignedUser = getAssignedUser(task.assigned_to);
  const categoryName = getCategoryName(task.category_id);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
            <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
              {task.priority.toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
              {task.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <p className="mt-1 text-gray-600">{task.description}</p>
          
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={assignedUser?.avatar} 
                alt={assignedUser?.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">{assignedUser?.name}</span>
            </div>
            
            <span className="text-sm text-gray-500">
              {task.type === 'repetitive' ? (
                <>
                  {task.frequency?.toUpperCase()} • Last: {new Date(task.last_completed!).toLocaleDateString()}
                </>
              ) : (
                <>
                  Due: {new Date(task.end_date).toLocaleDateString()}
                  {task.progress !== undefined && (
                    <span className="ml-2">
                      • Progress: {task.progress}%
                    </span>
                  )}
                </>
              )}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            <span>Start: {new Date(task.start_date).toLocaleDateString()}</span>
            <span>•</span>
            <span>End: {new Date(task.end_date).toLocaleDateString()}</span>
            <span>•</span>
            <span className="text-blue-600">{categoryName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const TasksPage = () => {
  const [taskList, setTaskList] = useState<Task[]>(tasks.tasks as Task[]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTaskList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const getAssignedUser = (userId: string) => {
    return users.users.find(user => user.id === userId);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (categoryId: string) => {
    return tasks.categories.find(cat => cat.id === categoryId)?.name || 'Uncategorized';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Tasks" />
        
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={taskList.map(task => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {taskList.map((task) => (
                    <SortableTaskItem
                      key={task.id}
                      task={task}
                      getAssignedUser={getAssignedUser}
                      getPriorityColor={getPriorityColor}
                      getStatusColor={getStatusColor}
                      getCategoryName={getCategoryName}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage; 