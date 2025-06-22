'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import servicesData from '@/data/services.json';
import projectsData from '@/data/projects.json';
import TasksBoardView from '@/components/TasksBoardView';
import TimelineSelector, { TimelineView } from '@/components/TimelineSelector';
import { FolderIcon, ChevronLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

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

type Project = {
  id: string;
  name: string;
  // Define other project properties as needed
};

type Service = {
    id: string;
    name: string;
    serviceShortName: string;
    serviceCategory: string;
    category_id: string;
    serviceTasks: string[];
    action_items: string[];
    shortDescription: string;
    serviceMaster: string;
    description: string;
    image: string;
    features: string[];
    pricing: {
        unit_price: number;
        max_discount: number;
    };
    minimum_time_required: number;
    minimum_order_unit: number;
    service_type: string;
}

const ServiceTasksPage = () => {
  const router = useRouter();
  const params = useParams() as { projectId: string; serviceId: string };
  const { projectId, serviceId } = params;

  const [project, setProject] = useState<Project | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timelineView, setTimelineView] = useState<TimelineView>('monthly');

  useEffect(() => {
    if (projectId && serviceId) {
      const foundProject = projectsData.projects.find(p => p.id === projectId);
      const foundService = servicesData.services.find(s => s.id === serviceId);
      
      if (foundProject && foundService) {
        setProject(foundProject);
        setService(foundService);
        
        // Generate tasks with more realistic dates spanning multiple months
        const serviceTasks = foundService.serviceTasks.map((taskTitle, index) => {
          const baseDate = new Date();
          
          // Spread tasks across multiple months for better timeline demonstration
          const monthOffset = Math.floor(index / 3); // 3 tasks per month
          const weekOffset = index % 3; // Spread within the month
          
          const startDate = new Date(baseDate);
          startDate.setMonth(baseDate.getMonth() + monthOffset);
          startDate.setDate(baseDate.getDate() + (weekOffset * 7)); // Spread across weeks
          
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 14); // 2 weeks duration
          
          // Randomize status for better visual demonstration
          const statuses: Task['status'][] = ['planning', 'doing', 'qc', 'done', 'delivered'];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          // Randomize priority
          const priorities: Task['priority'][] = ['low', 'medium', 'high'];
          const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
          
          return {
            id: `${foundService.id}_task_${index}`,
            title: taskTitle,
            description: `Description for ${taskTitle}`,
            type: 'one_time' as const,
            category_id: foundService.category_id,
            categories: [foundService.serviceCategory],
            status: randomStatus,
            assigned_to: [],
            priority: randomPriority,
            order: index,
            created_at: new Date().toISOString(),
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            tags: [],
            content_type: foundService.id,
            project_id: foundProject.id,
            platforms: [],
          };
        });
        setTasks(serviceTasks);
      }
    }
  }, [projectId, serviceId]);

  // Filter tasks based on timeline view and current date
  const filteredTasks = useMemo(() => {
    if (timelineView === 'monthly') {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      return tasks.filter(task => {
        const taskStartDate = new Date(task.start_date);
        const taskEndDate = new Date(task.end_date);
        
        // Task overlaps with the selected month
        return (taskStartDate <= endOfMonth && taskEndDate >= startOfMonth);
      });
    } else {
      // Weekly view
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      return tasks.filter(task => {
        const taskStartDate = new Date(task.start_date);
        const taskEndDate = new Date(task.end_date);
        
        // Task overlaps with the selected week
        return (taskStartDate <= endOfWeek && taskEndDate >= startOfWeek);
      });
    }
  }, [tasks, currentDate, timelineView]);

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const handleAddTask = () => {
    // For demonstration, you might open a modal form here
    console.log('Add new task for service:', service?.name);
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view: TimelineView) => {
    setTimelineView(view);
  };

  if (!project || !service) {
    return <div className="p-8 text-center">Loading project and service details...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <FolderIcon className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{project.name}</h1>
              <p className="text-sm text-gray-500">{service.name} - Task Board</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2"
            title="Planning"
          >
            <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Plannings</span>
          </button>
        </div>
      </header>
      
      {/* Timeline Selector */}
      <TimelineSelector
        currentDate={currentDate}
        view={timelineView}
        onDateChange={handleDateChange}
        onViewChange={handleViewChange}
      />
      
      {/* Task Board */}
      <main className="flex-1 overflow-hidden">
        <TasksBoardView 
          tasks={filteredTasks} 
          onUpdateTask={handleUpdateTask} 
          onAddTask={handleAddTask}
          timelineInfo={{
            view: timelineView,
            currentDate: currentDate,
            totalTasks: tasks.length
          }}
        />
      </main>
    </div>
  );
};

export default ServiceTasksPage; 