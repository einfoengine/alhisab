'use client';

import React, { useState, useRef, useEffect } from 'react';
import PageHeader from '@/components/elements/PageHeader';
import tasks from '@/data/tasks.json';
import users from '@/data/users.json';
import Link from 'next/link';
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

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Category = {
  id: string;
  name: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  type: 'repetitive' | 'one_time';
  category_id: string;
  categories: string[];
  frequency?: 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'pending' | 'in_progress' | 'completed';
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
  content_type?: string;
  mother_task?: string | null;
};

const COLUMN_WIDTHS = {
  drag: '40px',
  title: '350px',
  assignee: '160px',
  start: '110px',
  end: '110px',
  categories: '220px',
  priority: '100px',
  status: '130px',
  contentType: '120px',
};

const TasksPage = () => {
  const [taskList, setTaskList] = useState<Task[]>(tasks.tasks as unknown as Task[]);
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});

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

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const toggleExpand = (taskId: string) => {
    setExpandedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-8 py-8">
        <PageHeader title="Tasks" />
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[1400px] text-sm align-middle">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th style={{ width: COLUMN_WIDTHS.drag }}></th>
                    <th style={{ width: COLUMN_WIDTHS.title }} className="text-left font-medium text-gray-900">Task</th>
                    <th style={{ width: COLUMN_WIDTHS.assignee }} className="text-left font-medium text-gray-900">Assignee</th>
                    <th style={{ width: COLUMN_WIDTHS.start }} className="text-left font-medium text-gray-900">Start Date</th>
                    <th style={{ width: COLUMN_WIDTHS.end }} className="text-left font-medium text-gray-900">End Date</th>
                    <th style={{ width: COLUMN_WIDTHS.categories }} className="text-left font-medium text-gray-900">Categories</th>
                    <th style={{ width: COLUMN_WIDTHS.priority }} className="text-left font-medium text-gray-900">Priority</th>
                    <th style={{ width: COLUMN_WIDTHS.status }} className="text-left font-medium text-gray-900">Status</th>
                    <th style={{ width: COLUMN_WIDTHS.contentType }} className="text-left font-medium text-gray-900">Content Type</th>
                  </tr>
                </thead>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={taskList.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <tbody className="divide-y divide-gray-200">
                      {renderTaskRows(taskList, null, expandedTasks, toggleExpand, handleUpdateTask)}
                    </tbody>
                  </SortableContext>
                </DndContext>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to recursively render tasks and their subtasks
function renderTaskRows(
  tasks: Task[],
  parentId: string | null,
  expandedTasks: Record<string, boolean>,
  onToggleExpand: (id: string) => void,
  onUpdateTask: (id: string, updates: Partial<Task>) => void,
  level: number = 0
): React.ReactNode[] {
  return tasks
    .filter(task => (task.mother_task ?? null) === parentId)
    .map(task => [
      <SortableTaskRow
        key={task.id}
        task={task}
        onUpdateTask={onUpdateTask}
        expanded={!!expandedTasks[task.id]}
        onToggleExpand={() => onToggleExpand(task.id)}
        isSubtask={level > 0}
        indentLevel={level}
        hasSubtasks={tasks.some(t => t.mother_task === task.id)}
      />,
      expandedTasks[task.id] && renderTaskRows(tasks, task.id, expandedTasks, onToggleExpand, onUpdateTask, level + 1)
    ]).flat();
}

function SortableTaskRow({ task, onUpdateTask, expanded, onToggleExpand, isSubtask, indentLevel = 0, hasSubtasks = false }: { task: Task; onUpdateTask: (id: string, updates: Partial<Task>) => void; expanded?: boolean; onToggleExpand?: () => void; isSubtask?: boolean; indentLevel?: number; hasSubtasks?: boolean }) {
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
    background: isDragging ? '#f3f4f6' : undefined,
  };

  // Priority badge color
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

  // --- Assignee Dropdown with Search and Outside Click ---
  const [assigneeOpen, setAssigneeOpen] = useState(false);
  const [assigneeSearch, setAssigneeSearch] = useState('');
  const assigneeRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentUserId = users.users[0]?.id; // Replace with actual current user logic if available

  // Filtered users for search
  const filteredUsers = users.users.filter((user: User) =>
    user.name.toLowerCase().includes(assigneeSearch.toLowerCase()) ||
    user.id.toLowerCase().includes(assigneeSearch.toLowerCase())
  );

  // 'Me' logic
  const meUser = users.users.find((u: User) => u.id === currentUserId);
  const otherUsers = filteredUsers.filter((u: User) => u.id !== currentUserId);

  const handleAssigneeToggle = (userId: string) => {
    let updated: string[] = Array.isArray(task.assigned_to) ? [...task.assigned_to] : [];
    if (updated.includes(userId)) {
      updated = updated.filter(id => id !== userId);
    } else {
      updated.push(userId);
    }
    onUpdateTask(task.id, { assigned_to: updated });
  };

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!assigneeOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        assigneeRef.current &&
        !assigneeRef.current.contains(e.target as Node)
      ) {
        setAssigneeOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setAssigneeOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [assigneeOpen]);

  // --- Editable Dates ---
  const [editingStart, setEditingStart] = useState(false);
  const [editingEnd, setEditingEnd] = useState(false);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTask(task.id, { start_date: e.target.value });
    setEditingStart(false);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTask(task.id, { end_date: e.target.value });
    setEditingEnd(false);
  };
  const handleStartKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setEditingStart(false);
  };
  const handleEndKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setEditingEnd(false);
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // --- Category Dropdown (unchanged) ---
  const [catOpen, setCatOpen] = useState(false);
  const toggleCat = () => setCatOpen((v) => !v);
  const handleCategoryToggle = (catId: string) => {
    let updated: string[] = Array.isArray(task.categories) ? [...task.categories] : [];
    if (updated.includes(catId)) {
      updated = updated.filter(id => id !== catId);
    } else {
      updated.push(catId);
    }
    onUpdateTask(task.id, { categories: updated });
  };

  // Status change handler
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateTask(task.id, { status: e.target.value as Task['status'] });
  };

  return (
    <tr
      ref={setNodeRef}
      style={{ ...style, background: isSubtask ? '#f9fafb' : style.background }}
      className={`hover:bg-gray-100 transition-colors cursor-pointer h-12 ${isSubtask ? 'subtask-row' : ''}`}
    >
      <td style={{ width: COLUMN_WIDTHS.drag }} className={`pl-2 pr-1 align-middle`}>
        <div style={{ paddingLeft: indentLevel * 24 }} className="flex items-center">
          {hasSubtasks && (
            <button onClick={onToggleExpand} className="mr-2 focus:outline-none">
              <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          <span {...attributes} {...listeners} className="cursor-move text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </span>
        </div>
      </td>
      <td style={{ width: COLUMN_WIDTHS.title }} className="truncate">
        <Link href={`/dashboard/tasks/${task.id}`} className="text-gray-900 font-medium hover:text-blue-600 block truncate">
          {task.title}
        </Link>
      </td>
      <td style={{ width: COLUMN_WIDTHS.assignee }}>
        <div className="relative" ref={assigneeRef}>
          <div className="flex -space-x-2 items-center cursor-pointer border rounded px-1 py-1 min-h-[36px]" onClick={() => setAssigneeOpen((v) => !v)}>
            {Array.isArray(task.assigned_to) && task.assigned_to.length > 0 ? (
              task.assigned_to.map((userId: string) => {
                const user = users.users.find((u: User) => u.id === userId);
                return user ? (
                  <img
                    key={user.id}
                    src={user.avatar || '/default-avatar.png'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                    title={user.name}
                  />
                ) : null;
              })
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
          {assigneeOpen && (
            <div ref={dropdownRef} className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-2" style={{ maxHeight: 400, minWidth: 260 }}>
              <input
                type="text"
                className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search or enter email..."
                value={assigneeSearch}
                onChange={e => setAssigneeSearch(e.target.value)}
                autoFocus
              />
              <div className="overflow-y-auto max-h-60 divide-y divide-gray-100">
                {meUser && (
                  <div
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded ${task.assigned_to.includes(meUser.id) ? 'bg-pink-100' : ''}`}
                    onClick={() => handleAssigneeToggle(meUser.id)}
                  >
                    <img src={meUser.avatar || '/default-avatar.png'} alt={meUser.name} className="w-7 h-7 rounded-full border-2 border-pink-400" />
                    <span className="font-medium">Me</span>
                    {task.assigned_to.includes(meUser.id) && <span className="ml-auto text-pink-500">✓</span>}
                  </div>
                )}
                {otherUsers.map((user: User) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded ${task.assigned_to.includes(user.id) ? 'bg-blue-100' : ''}`}
                    onClick={() => handleAssigneeToggle(user.id)}
                  >
                    <img src={user.avatar || '/default-avatar.png'} alt={user.name} className="w-7 h-7 rounded-full border-2 border-white" />
                    <span>{user.name}</span>
                    {task.assigned_to.includes(user.id) && <span className="ml-auto text-blue-500">✓</span>}
                  </div>
                ))}
              </div>
              <div className="mt-2 border-t pt-2 flex items-center justify-center">
                <button className="flex items-center gap-2 text-xs text-purple-500 hover:underline">
                  <span className="inline-block w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">⚙️</span>
                  Set up fill with AI
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
      <td style={{ width: COLUMN_WIDTHS.start }}>
        {editingStart ? (
          <input
            type="date"
            value={task.start_date}
            ref={startInputRef}
            onChange={handleStartDateChange}
            onBlur={() => setEditingStart(false)}
            onKeyDown={handleStartKeyDown}
            className="border rounded px-2 py-1 w-32"
            autoFocus
          />
        ) : (
          <span className="text-gray-700 cursor-pointer" onClick={() => setEditingStart(true)}>
            {formatDate(task.start_date) || <span className="text-gray-400">Set date</span>}
          </span>
        )}
      </td>
      <td style={{ width: COLUMN_WIDTHS.end }}>
        {editingEnd ? (
          <input
            type="date"
            value={task.end_date}
            ref={endInputRef}
            onChange={handleEndDateChange}
            onBlur={() => setEditingEnd(false)}
            onKeyDown={handleEndKeyDown}
            className="border rounded px-2 py-1 w-32"
            autoFocus
          />
        ) : (
          <span className="text-gray-700 cursor-pointer" onClick={() => setEditingEnd(true)}>
            {formatDate(task.end_date) || <span className="text-gray-400">Set date</span>}
          </span>
        )}
      </td>
      <td style={{ width: COLUMN_WIDTHS.categories }}>
        <div className="relative">
          <div className="flex flex-wrap gap-1 items-center cursor-pointer" onClick={toggleCat}>
            {Array.isArray(task.categories) && task.categories.length > 0 ? (
              task.categories.map((catId: string) => {
                const cat = tasks.categories.find((c: Category) => c.id === catId);
                return cat ? (
                  <span key={cat.id} className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium mr-1">{cat.name}</span>
                ) : null;
              })
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
          {catOpen && (
            <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg p-2">
              <div className="flex flex-wrap gap-2">
                {tasks.categories.map((cat: Category) => {
                  const isSelected = Array.isArray(task.categories) && task.categories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryToggle(cat.id)}
                      className={`px-2 py-1 rounded text-xs font-medium ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </td>
      <td style={{ width: COLUMN_WIDTHS.priority }}>
        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(task.priority)}`}>{task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : '—'}</span>
      </td>
      <td style={{ width: COLUMN_WIDTHS.status }}>
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </td>
      <td style={{ width: COLUMN_WIDTHS.contentType }}>
        <span className="inline-block px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 font-medium">{task.content_type || '—'}</span>
      </td>
    </tr>
  );
}

export default TasksPage; 