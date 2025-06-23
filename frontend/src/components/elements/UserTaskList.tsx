'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, addMonths, addDays, getWeek, getYear, setWeek, setYear, isToday } from 'date-fns';
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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
                <span>{selectedLabel}</span>
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

const MonthSelector = ({ value, onChange }: { value: Date; onChange: (date: Date) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = getYear(value);
    const currentMonth = value.getMonth();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button 
                onClick={() => setIsOpen(p => !p)} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 min-w-[140px]"
            >
                <span className="font-semibold">{months[currentMonth]} {currentYear}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200 max-h-60 overflow-y-auto">
                    {Array.from({ length: 5 }, (_, yearOffset) => {
                        const year = currentYear - 2 + yearOffset;
                        return (
                            <div key={year}>
                                <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
                                    {year}
                                </div>
                                {months.map((month, monthIndex) => (
                                    <button
                                        key={`${year}-${monthIndex}`}
                                        onClick={() => { 
                                            onChange(new Date(year, monthIndex, 1)); 
                                            setIsOpen(false); 
                                        }}
                                        className={`w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 ${
                                            year === currentYear && monthIndex === currentMonth 
                                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        {month}
                                    </button>
                                ))}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const WeekSelector = ({ value, onChange }: { value: Date; onChange: (date: Date) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentYear = getYear(value);
    const currentWeek = getWeek(value, { weekStartsOn: 1 });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button 
                onClick={() => setIsOpen(p => !p)} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 min-w-[120px]"
            >
                <span className="font-semibold">Week {currentWeek}, {currentYear}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 max-h-60 overflow-y-auto">
                    {Array.from({ length: 5 }, (_, yearOffset) => {
                        const year = currentYear - 2 + yearOffset;
                        return (
                            <div key={year}>
                                <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
                                    {year}
                                </div>
                                {Array.from({ length: 52 }, (_, weekIndex) => {
                                    const weekNumber = weekIndex + 1;
                                    return (
                                        <button
                                            key={`${year}-${weekNumber}`}
                                            onClick={() => { 
                                                const newDate = setWeek(setYear(new Date(), year), weekNumber, { weekStartsOn: 1 });
                                                onChange(newDate); 
                                                setIsOpen(false); 
                                            }}
                                            className={`w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 ${
                                                year === currentYear && weekNumber === currentWeek 
                                                    ? 'bg-blue-50 text-blue-600 font-medium' 
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            Week {weekNumber}
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

interface UserTaskListProps {
  tasks: Task[];
}

const UserTaskList: React.FC<UserTaskListProps> = ({ tasks }) => {
  const [statusFilter, setStatusFilter] = useState('todo');
  const [timeView, setTimeView] = useState<'all' | 'month' | 'week' | 'today'>('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (tasks.length > 0) {
      setCurrentDate(new Date(tasks[0].end_date));
    } else {
      setCurrentDate(new Date());
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let tempTasks = tasks;
    
    if (timeView === 'today') {
        tempTasks = tempTasks.filter(t => isToday(new Date(t.end_date)));
    } else if (timeView !== 'all') {
        let interval: { start: Date, end: Date };
        if (timeView === 'week') {
            interval = { start: startOfWeek(currentDate, { weekStartsOn: 1 }), end: endOfWeek(currentDate, { weekStartsOn: 1 }) };
        } else { // month
            interval = { start: startOfMonth(currentDate), end: endOfMonth(currentDate) };
        }
        tempTasks = tempTasks.filter(t => isWithinInterval(new Date(t.end_date), interval));
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
  }, [tasks, statusFilter, timeView, currentDate]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            {(['all', 'today', 'week', 'month'] as const).map(view => (
                <button
                key={view}
                onClick={() => {
                  setTimeView(view);
                  if (view === 'today') {
                    setCurrentDate(new Date());
                  }
                }}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${timeView === view ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200/50'}`}
                >
                {view}
                </button>
            ))}
            </div>
            {timeView === 'month' ? (
                <MonthSelector value={currentDate} onChange={setCurrentDate} />
            ) : timeView === 'week' ? (
                <WeekSelector value={currentDate} onChange={setCurrentDate} />
            ) : null}
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