'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, addMonths, addDays, getWeek, getYear, setWeek, setYear, isToday } from 'date-fns';
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/solid';
import ProjectDetailsModal from '../ProjectDetailsModal';
import TaskDetailsModal from '../TaskDetailsModal';

type RawTask = {
    id: string;
    title: string;
    status: string;
    priority: 'low' | 'medium' | 'high' | string;
    end_date: string;
    start_date: string;
    created_at: string;
    mother_task: string | null;
    project_id: string;
    assigned_to: string[];
    company: string;
};

type Project = {
    id: string;
    name: string;
};

type User = {
    id: string;
    name: string;
    avatar: string;
};

type Task = {
  id: string;
  title: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  priority: 'low' | 'medium' | 'high';
  end_date: string;
  start_date: string;
  created_at: string;
  mother_task: string | null;
  project_id: string;
  assigned_to: string[];
  description: string;
  platforms?: string[];
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

const PriorityTag = ({ priority }: { priority: 'low' | 'medium' | 'high' }) => {
    const config = {
        low: { text: 'Low', bg: 'bg-gray-100', textColor: 'text-gray-600' },
        medium: { text: 'Medium', bg: 'bg-yellow-100', textColor: 'text-yellow-800' },
        high: { text: 'High', bg: 'bg-red-100', textColor: 'text-red-800' },
    };
    const { text, bg, textColor } = config[priority] || config.low;
    return (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${bg} ${textColor}`}>
            {text}
        </span>
    );
};

const mapTaskStatus = (status: string): Task['status'] => {
  switch (status) {
    case 'pending':
      return 'planning';
    case 'in_progress':
      return 'doing';
    case 'active':
      return 'doing';
    case 'completed':
      return 'done';
    case 'qc':
      return 'qc';
    case 'redo':
      return 'redo';
    case 'delivered':
      return 'delivered';
    case 'archived':
      return 'archived';
    default:
      return 'planning';
  }
};

interface UserTaskListProps {
  tasks: Task[];
  allTasks: RawTask[];
  projects: Project[];
  clients: Client[];
  users: User[];
}

const UserTaskList: React.FC<UserTaskListProps> = ({ tasks, allTasks, projects, clients, users }) => {
  const [statusFilter, setStatusFilter] = useState('todo');
  const [timeView, setTimeView] = useState<'all' | 'month' | 'week' | 'today'>('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (tasks.length > 0) {
      setCurrentDate(new Date(tasks[0].end_date));
    } else {
      setCurrentDate(new Date());
    }
  }, [tasks]);

  const selectedProjectClient = useMemo(() => {
    if (!selectedProject) return null;
    const client = clients.find(c => c.id === selectedProject.client_id);
    return client ? { id: client.id, name: (client as any).client_name, company: (client as any).company_names[0] } : null;
  }, [selectedProject, clients]);

  const selectedTaskData = useMemo(() => {
    if (!selectedTask) return null;

    const project = projects.find(p => p.id === selectedTask.project_id) || null;
    const motherTask = allTasks.find(t => t.id === selectedTask.mother_task) || null;
    const assignees = users.filter(u => selectedTask.assigned_to.includes(u.id));

    return { project, motherTask, assignees };
  }, [selectedTask, projects, allTasks, users]);

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

  const TaskItem = ({ task }: { task: Task }) => {
    const [subtasksOpen, setSubtasksOpen] = useState(false);

    const motherTask = useMemo(() => {
        if (!task.mother_task) return null;
        return allTasks.find(t => t.id === task.mother_task);
    }, [task.mother_task]);

    const project = useMemo(() => {
        return projects.find(p => p.id === task.project_id);
    }, [task.project_id]);

    const subtasks = useMemo(() => {
        return allTasks
            .filter(t => t.mother_task === task.id)
            .map(subtask => ({
                ...subtask,
                status: mapTaskStatus(subtask.status)
            } as Task));
    }, [task.id]);

    return (
        <div className="bg-white border-b border-gray-200/80">
            <div className="p-4 flex flex-col md:flex-row gap-4 items-start justify-between">
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                        <button onClick={() => setSelectedTask(task)} className="font-semibold text-gray-800 hover:text-blue-600 text-left">
                            {task.title}
                        </button>
                        <PriorityTag priority={task.priority} />
                    </div>
                    
                    <p className="text-xs text-gray-500">
                        {`Assigned: ${format(new Date(task.created_at), 'MMM d')} • Start: ${format(new Date(task.start_date), 'MMM d')} • End: ${format(new Date(task.end_date), 'MMM d, yyyy')}`}
                    </p>

                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                        {project && (
                            <p>Project: <span className="font-medium text-gray-700">{project.name}</span></p>
                        )}
                        {motherTask && project && <span className="text-gray-300">|</span>}
                        {motherTask && (
                            <p>Mother task: <span className="font-medium text-gray-700">{motherTask.title}</span></p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-start md:justify-end gap-3 flex-shrink-0">
                    <TaskStatus status={task.status} />
                    {subtasks.length > 0 && (
                        <button
                            onClick={() => setSubtasksOpen(!subtasksOpen)}
                            className="flex items-center justify-center w-6 h-6 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            title={`${subtasks.length} subtasks`}
                        >
                            {subtasks.length}
                        </button>
                    )}
                </div>
            </div>
            {subtasksOpen && subtasks.length > 0 && (
                <div className="pl-8 pr-4 pb-4 bg-gray-50/50">
                    <div className="border-l-2 border-blue-200 pl-6 ml-1">
                        <div className="divide-y divide-gray-200">
                            {subtasks.map((subtask: Task) => (
                                <div key={subtask.id} className="py-2 flex justify-between items-center">
                                    <p className="text-sm text-gray-700">{subtask.title}</p>
                                    <TaskStatus status={subtask.status} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
  };

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
          <div className="divide-y-0">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
      {selectedProject && (
        <ProjectDetailsModal
            project={selectedProject}
            client={selectedProjectClient}
            onClose={() => setSelectedProject(null)}
        />
      )}
      {selectedTask && selectedTaskData && (
        <TaskDetailsModal
            task={selectedTask}
            project={selectedTaskData.project}
            motherTask={selectedTaskData.motherTask}
            assignees={selectedTaskData.assignees}
            onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default UserTaskList; 