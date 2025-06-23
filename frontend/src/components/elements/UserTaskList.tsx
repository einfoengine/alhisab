'use client';

import React, { useState, useMemo } from 'react';
import { format, isToday, isThisWeek, isThisMonth } from 'date-fns';
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type Task = {
  id: string;
  title: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  priority: 'low' | 'medium' | 'high';
  end_date: string;
};

const statusConfig: Record<Task['status'], { name: string; color: string; icon: React.ElementType }> = {
  planning: { name: 'Planning', color: 'text-gray-500', icon: BriefcaseIcon },
  doing: { name: 'In Progress', color: 'text-blue-500', icon: ClockIcon },
  qc: { name: 'Quality Check', color: 'text-purple-500', icon: ClockIcon },
  redo: { name: 'Redo', color: 'text-red-500', icon: ExclamationTriangleIcon },
  done: { name: 'Done', color: 'text-green-500', icon: CheckCircleIcon },
  delivered: { name: 'Delivered', color: 'text-teal-500', icon: CheckCircleIcon },
  archived: { name: 'Archived', color: 'text-gray-700', icon: BriefcaseIcon },
};

const TaskStatus = ({ status }: { status: Task['status'] }) => {
  const config = statusConfig[status];

  if (!config) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800">
            <BriefcaseIcon className="w-3.5 h-3.5" />
            Missing Status
        </span>
    );
  }

  const { name, color, icon: Icon } = config;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${color.replace('text-', 'bg-').replace('500', '100')} ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {name}
    </span>
  );
};

const FilterButton = ({ label, count, isActive, onClick }: { label: string; count: number; isActive: boolean; onClick: () => void; }) => (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border ${isActive ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
        {label}
        <span className={`px-1.5 py-0.5 rounded-full text-xs ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>{count}</span>
    </button>
);

interface UserTaskListProps {
  tasks: Task[];
}

const UserTaskList: React.FC<UserTaskListProps> = ({ tasks }) => {
  type FilterType = 'all' | 'today' | 'week' | 'month' | 'urgent' | 'done' | 'redo';
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'today':
        return tasks.filter(t => isToday(new Date(t.end_date)));
      case 'week':
        return tasks.filter(t => isThisWeek(new Date(t.end_date), { weekStartsOn: 1 }));
      case 'month':
        return tasks.filter(t => isThisMonth(new Date(t.end_date)));
      case 'urgent':
        return tasks.filter(t => t.priority === 'high');
      case 'done':
        return tasks.filter(t => t.status === 'done' || t.status === 'delivered');
      case 'redo':
        return tasks.filter(t => t.status === 'redo');
      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  const getCount = (filter: FilterType) => {
    if (filter === 'all') return tasks.length;
    if (filter === 'today') return tasks.filter(t => isToday(new Date(t.end_date))).length;
    if (filter === 'week') return tasks.filter(t => isThisWeek(new Date(t.end_date), { weekStartsOn: 1 })).length;
    if (filter === 'month') return tasks.filter(t => isThisMonth(new Date(t.end_date))).length;
    if (filter === 'urgent') return tasks.filter(t => t.priority === 'high').length;
    if (filter === 'done') return tasks.filter(t => t.status === 'done' || t.status === 'delivered').length;
    if (filter === 'redo') return tasks.filter(t => t.status === 'redo').length;
    return 0;
  }

  return (
    <div>
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 flex-wrap">
            <FilterButton label="All" count={getCount('all')} isActive={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
            <FilterButton label="Today" count={getCount('today')} isActive={activeFilter === 'today'} onClick={() => setActiveFilter('today')} />
            <FilterButton label="This Week" count={getCount('week')} isActive={activeFilter === 'week'} onClick={() => setActiveFilter('week')} />
            <FilterButton label="This Month" count={getCount('month')} isActive={activeFilter === 'month'} onClick={() => setActiveFilter('month')} />
            <FilterButton label="Urgent" count={getCount('urgent')} isActive={activeFilter === 'urgent'} onClick={() => setActiveFilter('urgent')} />
            <FilterButton label="Done" count={getCount('done')} isActive={activeFilter === 'done'} onClick={() => setActiveFilter('done')} />
            <FilterButton label="Redo" count={getCount('redo')} isActive={activeFilter === 'redo'} onClick={() => setActiveFilter('redo')} />
        </div>

        {filteredTasks.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-lg">
            <BriefcaseIcon className="w-12 h-12 text-gray-300 mx-auto"/>
            <p className="mt-4 text-gray-500">No tasks match the current filter.</p>
        </div>
        ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
            <div className="divide-y divide-gray-200/80">
                {filteredTasks.map((task) => (
                    <div key={task.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div>
                            <p className="font-semibold text-gray-800">{task.title}</p>
                            <p className="text-sm text-gray-500">
                                Due: {format(new Date(task.end_date), 'MMM d, yyyy')}
                            </p>
                        </div>
                        <div>
                            <TaskStatus status={task.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        )}
    </div>
  );
};

export default UserTaskList; 