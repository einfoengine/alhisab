'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import TaskDetailsModal from './TaskDetailsModal';
import TaskCard from './elements/TaskCard';

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
  archived: { name: 'Archived', color: 'bg-gray-700' },
};

type TasksBoardViewProps = {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onAddTask: () => void;
};

const columnOrder: Task['status'][] = ['planning', 'doing', 'qc', 'redo', 'done', 'delivered'];
const columnConfig: Record<Task['status'], { name: string, color: string }> = {
  planning: { name: 'Planning', color: 'bg-gray-400' },
  doing: { name: 'In Progress', color: 'bg-blue-500' },
  qc: { name: 'Quality Check', color: 'bg-purple-500' },
  redo: { name: 'Redo', color: 'bg-red-500' },
  done: { name: 'Done', color: 'bg-green-500' },
  delivered: { name: 'Delivered', color: 'bg-teal-500' },
  archived: { name: 'Archived', color: 'bg-gray-700' },
};

const TasksBoardView: React.FC<TasksBoardViewProps> = ({ tasks, onUpdateTask, onAddTask }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [cardWithOpenPopup, setCardWithOpenPopup] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    setCardWithOpenPopup(null);
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const startColumnStatus = source.droppableId as Task['status'];
    const endColumnStatus = destination.droppableId as Task['status'];

    if (startColumnStatus === endColumnStatus) {
        const columnTasks = tasks
            .filter(t => t.status === startColumnStatus)
            .sort((a, b) => a.order - b.order);
        
        const [movedItem] = columnTasks.splice(source.index, 1);
        columnTasks.splice(destination.index, 0, movedItem);
        
        columnTasks.forEach((task, index) => {
            if (task.order !== index) {
                onUpdateTask(task.id, { order: index });
            }
        });

    } else {
        // Moving to a different column
        const sourceColTasks = tasks
            .filter(t => t.status === startColumnStatus)
            .sort((a, b) => a.order - b.order);
      
        const [movedTask] = sourceColTasks.splice(source.index, 1);
      
        const destColTasks = tasks
            .filter(t => t.status === endColumnStatus)
            .sort((a, b) => a.order - b.order);

        destColTasks.splice(destination.index, 0, { ...movedTask, status: endColumnStatus });

        sourceColTasks.forEach((task, index) => {
            onUpdateTask(task.id, { order: index });
        });
      
        destColTasks.forEach((task, index) => {
            onUpdateTask(task.id, { order: index, status: endColumnStatus });
        });
    }
  };
  
  const handleSave = (taskId: string, updates: Partial<Task>) => {
    onUpdateTask(taskId, updates);
    setSelectedTask(null);
  }

  return (
    <>
      <TaskDetailsModal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} task={selectedTask} onSave={handleSave} columnConfig={columnConfig} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 overflow-x-auto p-4 bg-white">
          <div className="flex h-full">
            {columnOrder.map((status, index) => {
              const column = columnConfig[status];
              const columnTasks = tasks.filter(t => t.status === status).sort((a,b) => a.order - b.order);
              const isLastColumn = index === columnOrder.length - 1;
              const isColumnActive = columnTasks.some(t => t.id === cardWithOpenPopup);
              return (
                <Droppable key={status} droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`w-[320px] flex-shrink-0 flex flex-col ${!isLastColumn ? 'border-r border-gray-200' : ''}`}
                    >
                      <div className="p-2 sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${column.color}`}></span>
                            <h3 className="font-semibold text-gray-700 text-base">{column.name}</h3>
                            <span className="text-sm font-medium text-gray-400">{columnTasks.length}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={onAddTask} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                              <PlusIcon className="w-5 h-5" />
                            </button>
                             <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                              <EllipsisVerticalIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={`flex-1 p-2 space-y-3 rounded-lg ${snapshot.isDraggingOver ? 'bg-gray-100' : 'bg-transparent'} px-4 ${isColumnActive ? 'overflow-visible' : 'overflow-y-auto'}`}>
                        {columnTasks.map((task, index) => {
                          return (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{...provided.draggableProps.style, zIndex: cardWithOpenPopup === task.id ? 50 : 'auto', position: 'relative' }}
                                >
                                  <TaskCard
                                    task={task}
                                    provided={provided}
                                    snapshot={snapshot}
                                    onCardClick={() => setSelectedTask(task)}
                                    onUpdateTask={onUpdateTask}
                                    onPopupToggle={(isOpen) => setCardWithOpenPopup(isOpen ? task.id : null)}
                                  />
                                </div>
                              )}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                        <button onClick={onAddTask} className="w-full text-left flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                          <PlusIcon className="w-4 h-4" />
                          Add Task
                        </button>
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default TasksBoardView; 