'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
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
import projectsData from '@/data/projects.json';
import { ChevronUpIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import servicesData from '@/data/services.json';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Category = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
};

type Service = {
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
  project_id: string;
  platforms: string[];
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

const PLATFORM_OPTIONS = [
  { value: 'FB', label: 'Facebook', color: 'bg-blue-600' },
  { value: 'Insta', label: 'Instagram', color: 'bg-pink-500' },
  { value: 'Youtube', label: 'YouTube', color: 'bg-red-600' },
  { value: 'Website', label: 'Website', color: 'bg-gray-700' },
];

const SERVICE_OPTIONS: Service[] = (servicesData.services as Service[]).map((s: Service) => ({ id: s.id, name: s.name }));

const TasksPage = () => {
  const [taskList, setTaskList] = useState<Task[]>(tasks.tasks as unknown as Task[]);
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterServiceType, setFilterServiceType] = useState<string>('');

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

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...taskList];
    if (filterStatus) filtered = filtered.filter(t => t.status === filterStatus);
    if (filterCategory) filtered = filtered.filter(t => t.categories.includes(filterCategory));
    if (filterServiceType) filtered = filtered.filter(t => t.content_type === filterServiceType);
    
    if (sortConfig) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key as keyof Task];
        let bVal = b[sortConfig.key as keyof Task];
        
        if (sortConfig.key === 'priority') {
          const order = { high: 3, medium: 2, low: 1 };
          aVal = order[a.priority];
          bVal = order[b.priority];
        }
        if (sortConfig.key === 'content_type') {
          const aName = SERVICE_OPTIONS.find(s => s.id === a.content_type)?.name || '';
          const bName = SERVICE_OPTIONS.find(s => s.id === b.content_type)?.name || '';
          return sortConfig.direction === 'asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
        }
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        return 0;
      });
    }
    return filtered;
  }, [taskList, sortConfig, filterStatus, filterCategory, filterServiceType]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // State for open filter dropdown
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // Helper to get unique values for a column
  function getUniqueValues(key: string) {
    if (key === 'categories') {
      return Array.from(new Set(taskList.flatMap((t: Task) => t.categories)));
    }
    if (key === 'content_type') {
      return Array.from(new Set(taskList.map((t: Task) => t.content_type).filter(Boolean)));
    }
    return Array.from(new Set(taskList.map((t: Task) => t[key]).filter(Boolean)));
  }

  // Filter dropdown UI (TableBuilder style)
  function renderFilterDropdown(columnKey: string, filterValue: string, setFilterValue: (v: string) => void, labelMap?: Record<string, string>) {
    let uniqueValues = getUniqueValues(columnKey);
    if (columnKey === 'content_type') {
      uniqueValues = SERVICE_OPTIONS.map(s => s.id);
      labelMap = Object.fromEntries(SERVICE_OPTIONS.map(s => [s.id, s.name]));
    }
    return (
      <div className="relative inline-block">
        <button
          className="ml-1 text-gray-500 hover:text-gray-700"
          onClick={e => {
            e.stopPropagation();
            setOpenFilter(openFilter === columnKey ? null : columnKey);
          }}
          type="button"
        >
          <FunnelIcon className="w-4 h-4" />
        </button>
        {openFilter === columnKey && (
          <div className="absolute z-20 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg p-2" onClick={e => e.stopPropagation()}>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
              onClick={() => {
                setFilterValue('');
                setOpenFilter(null);
              }}
            >
              Reset Filter
            </button>
            {uniqueValues.map((value, idx) => (
              <button
                key={value || idx}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${filterValue === value ? 'bg-gray-200' : ''}`}
                onClick={() => {
                  setFilterValue(value);
                  setOpenFilter(null);
                }}
              >
                {labelMap && labelMap[value] ? labelMap[value] : value}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Close filter dropdown on outside click
  useEffect(() => {
    if (!openFilter) return;
    function handleClick() {
      setOpenFilter(null);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-8 py-8">
        <PageHeader title="Tasks" />
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[1400px] text-sm align-middle">
                <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th style={{ width: COLUMN_WIDTHS.drag }}></th>
                    <th style={{ width: COLUMN_WIDTHS.title }} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Title</span>
                        <button
                          onClick={() => handleSort('title')}
                          className="focus:outline-none"
                        >
                          <SortIcon active={sortConfig?.key === 'title'} direction={sortConfig?.direction} />
                        </button>
                      </div>
                    </th>
                    <th style={{ width: COLUMN_WIDTHS.assignee }} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Assignee</span>
                        <button
                          onClick={() => handleSort('assigned_to')}
                          className="focus:outline-none"
                        >
                          <SortIcon active={sortConfig?.key === 'assigned_to'} direction={sortConfig?.direction} />
                        </button>
                      </div>
                    </th>
                    <th style={{ width: COLUMN_WIDTHS.start }} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Start</span>
                        <button
                          onClick={() => handleSort('start_date')}
                          className="focus:outline-none"
                        >
                          <SortIcon active={sortConfig?.key === 'start_date'} direction={sortConfig?.direction} />
                        </button>
                      </div>
                    </th>
                    <th style={{ width: COLUMN_WIDTHS.end }} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>End</span>
                        <button
                          onClick={() => handleSort('end_date')}
                          className="focus:outline-none"
                        >
                          <SortIcon active={sortConfig?.key === 'end_date'} direction={sortConfig?.direction} />
                        </button>
                      </div>
                    </th>
                    <th style={{ width: COLUMN_WIDTHS.categories }} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Categories</span>
                        <button
                          onClick={() => handleSort('categories')}
                          className="focus:outline-none"
                        >
                          <SortIcon active={sortConfig?.key === 'categories'} direction={sortConfig?.direction} />
                        </button>
                        {renderFilterDropdown('categories', filterCategory, setFilterCategory)}
                      </div>
                    </th>
                    <th style={{ width: COLUMN_WIDTHS.priority }} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Priority</span>
                        <button
                          onClick={() => handleSort('priority')}
                          className="focus:outline-none"
                        >
                          <SortIcon active={sortConfig?.key === 'priority'} direction={sortConfig?.direction} />
                        </button>
                      </div>
                    </th>
                    <th style={{ width: COLUMN_WIDTHS.status }} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <button
                          onClick={() => handleSort('status')}
                          className="focus:outline-none"
                        >
                          <SortIcon active={sortConfig?.key === 'status'} direction={sortConfig?.direction} />
                        </button>
                        {renderFilterDropdown('status', filterStatus, setFilterStatus)}
                      </div>
                    </th>
                    <th style={{ width: COLUMN_WIDTHS.contentType }} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Service Type</span>
                        <button
                          onClick={() => handleSort('content_type')}
                          className="focus:outline-none"
                        >
                          <SortIcon active={sortConfig?.key === 'content_type'} direction={sortConfig?.direction} />
                        </button>
                        {renderFilterDropdown('content_type', filterServiceType, setFilterServiceType)}
                      </div>
                    </th>
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
                      {renderTaskRows(filteredAndSortedTasks, null, expandedTasks, toggleExpand, handleUpdateTask)}
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
        serviceOptions={SERVICE_OPTIONS}
      />,
      expandedTasks[task.id] && renderTaskRows(tasks, task.id, expandedTasks, onToggleExpand, onUpdateTask, level + 1)
    ]).flat();
}

function SortableTaskRow({ task, onUpdateTask, expanded, onToggleExpand, isSubtask, indentLevel = 0, hasSubtasks = false, serviceOptions }: { 
  task: Task; 
  onUpdateTask: (id: string, updates: Partial<Task>) => void; 
  expanded?: boolean; 
  onToggleExpand?: () => void; 
  isSubtask?: boolean; 
  indentLevel?: number; 
  hasSubtasks?: boolean; 
  serviceOptions: Service[] 
}) {
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
    const currentCategories = task.categories;
    const newCategories = currentCategories.includes(catId)
      ? currentCategories.filter(id => id !== catId)
      : [...currentCategories, catId];
    onUpdateTask(task.id, { categories: newCategories });
  };

  // Status change handler
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateTask(task.id, { status: e.target.value as Task['status'] });
  };

  // In SortableTaskRow, add state for dropdowns
  const [projectOpen, setProjectOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);
  const priorityRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Helper to get project name
  const getProjectName = (id: string) => {
    const projects = projectsData.projects as unknown[] as Project[];
    const project = projects.find((p) => p.id === id);
    return project ? project.name : '—';
  };

  // Priority pill colors
  const PRIORITY_COLORS: Record<string, string> = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  // Handle project change
  const handleProjectChange = (id: string) => {
    onUpdateTask(task.id, { project_id: id });
    setProjectOpen(false);
  };
  // Handle priority change
  const handlePriorityChange = (val: string) => {
    onUpdateTask(task.id, { priority: val as Task['priority'] });
    setPriorityOpen(false);
  };
  // Handle platforms change
  const handlePlatformToggle = (val: string) => {
    let updated = Array.isArray(task.platforms) ? [...task.platforms] : [];
    if (updated.includes(val)) {
      updated = updated.filter(p => p !== val);
    } else {
      updated.push(val);
    }
    onUpdateTask(task.id, { platforms: updated });
  };

  const [serviceOpen, setServiceOpen] = useState(false);
  const serviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!serviceOpen) return;
    function handleClick(e: MouseEvent) {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [serviceOpen]);

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
      <td style={{ width: '160px' }}>
        <div className="relative" ref={projectRef}>
          <span className="inline-block px-2 py-1 rounded text-xs bg-gray-100 text-gray-800 font-medium cursor-pointer" onClick={() => setProjectOpen(v => !v)}>
            {getProjectName(task.project_id)}
          </span>
          {projectOpen && (
            <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg p-2">
              {projectsData.projects.map((proj: any) => (
                <div key={proj.id} className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded" onClick={() => handleProjectChange(proj.id)}>
                  {proj.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </td>
      <td style={{ width: '180px' }}>
        <div className="relative" ref={platformsRef}>
          <div className="flex flex-wrap gap-1 items-center cursor-pointer" onClick={() => setPlatformsOpen(v => !v)}>
            {Array.isArray(task.platforms) && task.platforms.length > 0 ? (
              task.platforms.map((platform: string) => {
                const opt = PLATFORM_OPTIONS.find(opt => opt.value === platform);
                return opt ? (
                  <span key={opt.value} className={`inline-block px-2 py-1 rounded text-xs font-semibold ${opt.color} mr-1`}>{opt.label}</span>
                ) : null;
              })
            ) : (
              <span className="text-gray-400">+</span>
            )}
          </div>
          {platformsOpen && (
            <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg p-2">
              {PLATFORM_OPTIONS.map(opt => {
                const isSelected = Array.isArray(task.platforms) && task.platforms.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handlePlatformToggle(opt.value)}
                    className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-2 ${isSelected ? opt.color + ' text-white' : 'bg-gray-100 text-gray-800'}`}
                  >
                    <input type="checkbox" checked={isSelected} readOnly className="mr-2" />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </td>
      <td style={{ width: COLUMN_WIDTHS.categories }}>
        <div className="relative" ref={categoriesRef}>
          <div className="flex flex-wrap gap-1 items-center cursor-pointer" onClick={() => setCategoriesOpen(v => !v)}>
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
          {categoriesOpen && (
            <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg p-2">
              {(tasks.categories as Category[]).map((cat: Category) => {
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
          )}
        </div>
      </td>
      <td style={{ width: COLUMN_WIDTHS.priority }}>
        <div className="relative" ref={priorityRef}>
          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold cursor-pointer ${PRIORITY_COLORS[task.priority] || 'bg-gray-100 text-gray-800'}`} onClick={() => setPriorityOpen(v => !v)}>
            {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : '—'}
          </span>
          {priorityOpen && (
            <div className="absolute z-10 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg p-2">
              {['high', 'medium', 'low'].map(val => (
                <div key={val} className={`px-3 py-2 cursor-pointer hover:bg-gray-100 rounded ${PRIORITY_COLORS[val]}`} onClick={() => handlePriorityChange(val)}>
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>
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
        <div className="relative" ref={serviceRef}>
          <span className="inline-block px-2 py-1 rounded text-xs bg-purple-100 text-purple-800 font-medium cursor-pointer" onClick={() => setServiceOpen(v => !v)}>
            {serviceOptions.find(s => s.id === task.content_type)?.name || <span className="text-gray-400">Set service</span>}
          </span>
          {serviceOpen && (
            <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg p-2">
              {serviceOptions.map(opt => (
                <div
                  key={opt.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 rounded ${task.content_type === opt.id ? 'bg-purple-600 text-white' : ''}`}
                  onClick={() => { onUpdateTask(task.id, { content_type: opt.id }); setServiceOpen(false); }}
                >
                  {opt.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

// Helper for rendering sort icons
function SortIcon({ active, direction }: { active: boolean; direction: 'asc' | 'desc' | undefined }) {
  if (!active) {
    return <ChevronUpIcon className="w-4 h-4 text-gray-400" />;
  }
  return direction === 'asc' ? (
    <ChevronUpIcon className="w-4 h-4" />
  ) : (
    <ChevronDownIcon className="w-4 h-4" />
  );
}

export default TasksPage; 