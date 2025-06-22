'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { EllipsisVerticalIcon, CalendarIcon, FlagIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import usersData from '@/data/users.json';

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  assigned_to: string[];
  priority: 'low' | 'medium' | 'high';
  order: number;
  start_date: string;
  end_date: string;
  project_name: string;
  service_name: string;
  subtask_count?: number;
};

const priorityConfig: Record<string, { icon: React.ElementType, color: string, name: string }> = {
  low: { icon: FlagIcon, color: 'text-gray-500', name: 'Low' },
  medium: { icon: FlagIcon, color: 'text-yellow-500', name: 'Medium' },
  high: { icon: FlagIcon, color: 'text-red-600', name: 'High' },
};

const columnConfig: Record<Task['status'], { name: string, color: string }> = {
  planning: { name: 'Planning', color: 'bg-gray-400' },
  doing: { name: 'In Progress', color: 'bg-blue-500' },
  qc: { name: 'Quality Check', color: 'bg-purple-500' },
  redo: { name: 'Redo', color: 'bg-red-500' },
  done: { name: 'Done', color: 'bg-green-500' },
  delivered: { name: 'Delivered', color: 'bg-teal-500' },
  archived: { name: 'Archived', color: 'bg-gray-700' },
};


type TaskCardProps = {
    task: Task;
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    onCardClick: (task: Task) => void;
    onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, provided, snapshot, onCardClick, onUpdateTask }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const handleStatusChange = (newStatus: Task['status']) => {
        onUpdateTask(task.id, { status: newStatus });
        setMenuOpen(false);
    };
    
    const PriorityIcon = priorityConfig[task.priority].icon;
    const priorityColor = priorityConfig[task.priority].color;
    
    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => onCardClick(task)}
            className={`bg-white p-3 rounded-lg shadow-sm border transition-shadow relative ${snapshot.isDragging ? 'shadow-md border-blue-500' : 'border-gray-200/80 hover:bg-gray-100 hover:border-gray-300'}`}
        >
            <div className="absolute top-2 right-2">
                <div ref={menuRef} className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(!menuOpen);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        <EllipsisVerticalIcon className="w-4 h-4" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-100">
                            <div className="py-1">
                                <span className="block px-4 py-2 text-xs text-gray-400">Change Status</span>
                                {Object.entries(columnConfig).filter(([statusKey]) => statusKey !== 'archived').map(([statusKey, { name }]) => (
                                    <button
                                        key={statusKey}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStatusChange(statusKey as Task['status']);
                                        }}
                                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <h4 className="font-semibold text-gray-800 mb-4 pr-6 text-base">{task.title}</h4>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <div title={`Priority: ${priorityConfig[task.priority].name}`}>
                        <PriorityIcon className={`w-5 h-5 ${priorityColor}`} />
                    </div>
                    
                    {task.assigned_to.length > 0 && (() => {
                        const user = usersData.users.find(u => u.id === task.assigned_to[0]);
                        const initials = user ? user.name.split(' ').map(n => n[0]).join('').substring(0,2) : '';
                        return user ? (
                            <div key={user.id} title={user.name} className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                {initials}
                            </div>
                        ) : null;
                    })()}
                </div>
                <div className="flex items-center gap-1.5" title={`Due ${format(new Date(task.end_date), 'MMM d, yyyy')}`}>
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <span className={`font-semibold text-sm text-gray-700`}>{format(new Date(task.end_date), 'MMM d')}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard; 