'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { format, isThisWeek, isThisMonth } from 'date-fns';
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type Task = {
  id: string;
  title: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
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

const StatusFilterDropdown = ({ value, onChange }: { value: string; onChange: (value: string) => void; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options = [
        { value: 'all', label: 'All' },
        { value: 'todo', label: 'Todo' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'in_qc', label: 'In QC' },
        { value: 'redo', label: 'Redo' },
        { value: 'completed', label: 'Completed' },
    ];
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label;

    return (
        <div ref={dropdownRef} className="relative">
            <button onClick={() => setIsOpen(p => !p)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
                <span>Status: <strong>{selectedLabel}</strong></span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    {options.map(option => (
                         <button
                            key={option.value}
                            onClick={() => { onChange(option.value); setIsOpen(false); }}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

interface UserTaskListProps {
  tasks: Task[];
}

const UserTaskList: React.FC<UserTaskListProps> = ({ tasks }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'week', 'month'

  const filteredTasks = useMemo(() => {
    let tempTasks = tasks;
    
    if (timeFilter === 'week') {
      tempTasks = tempTasks.filter(t => isThisWeek(new Date(t.end_date), { weekStartsOn: 1 }));
    } else if (timeFilter === 'month') {
      tempTasks = tempTasks.filter(t => isThisMonth(new Date(t.end_date)));
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'todo') {
        tempTasks = tempTasks.filter(t => t.status === 'planning');
      } else if (statusFilter === 'in_progress') {
        tempTasks = tempTasks.filter(t => t.status === 'doing');
      } else if (statusFilter === 'in_qc') {
        tempTasks = tempTasks.filter(t => t.status === 'qc');
      } else if (statusFilter === 'completed') {
        tempTasks = tempTasks.filter(t => t.status === 'done' || t.status === 'delivered');
      } else { // 'redo'
        tempTasks = tempTasks.filter(t => t.status === statusFilter);
      }
    }

    return tempTasks;
  }, [tasks, statusFilter, timeFilter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
          {(['all', 'week', 'month'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${timeFilter === filter ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'}`}
            >
              {filter === 'all' ? 'From the beginning' : filter === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
        <StatusFilterDropdown value={statusFilter} onChange={setStatusFilter} />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-lg">
          <BriefcaseIcon className="w-12 h-12 text-gray-300 mx-auto" />
          <p className="mt-4 text-gray-500">No tasks match the current filters.</p>
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