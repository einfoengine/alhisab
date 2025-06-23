'use client';

import React, { useState, useMemo } from 'react';
import usersData from '@/data/users.json';
import tasksData from '@/data/tasks.json';
import { UserIcon, PlusIcon } from '@heroicons/react/24/outline';
import TeamMemberSidebar from '@/components/elements/TeamMemberSidebar';
import UserTaskList from '@/components/elements/UserTaskList';
import UserInfoPanel from '@/components/elements/UserInfoPanel';

type Task = {
  id: string;
  title: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  priority: 'low' | 'medium' | 'high';
  end_date: string;
  assigned_to: string[];
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  phone: string;
  status: string;
  join_date: string;
  projects: string[];
  skills: string[];
  bio: string;
  performance: {
    rating: number;
    completed_projects: number;
    on_time_delivery: number;
  };
  designation?: string;
  salary?: number;
  bonus?: number;
};

// Mock data that might not be in users.json
const teamData: (User & { working_days: number; leave_taken: number; overtime_hours: number; designation: string; salary: number; bonus: number; })[] = (usersData.users as User[]).map(user => ({
  ...user,
  working_days: 240,
  leave_taken: 15,
  overtime_hours: 50,
  designation: user.designation || 'Software Engineer',
  salary: user.salary || 80000,
  bonus: user.bonus || 5000,
}));

const TeamPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(teamData[0]?.id || null);

  const selectedUser = useMemo(() => {
    const userToSelect = teamData.find(u => u.id === selectedUserId) || teamData[0];
    if (!userToSelect) return null;

    const user = teamData.find(u => u.id === userToSelect.id);
    if (!user) return null;

    const userTasks = tasksData.tasks.filter(task => task.assigned_to.includes(user.id)) as Task[];
    const doneWork = userTasks.filter(t => ['done', 'delivered'].includes(t.status)).length;
    const qcWork = userTasks.filter(t => t.status === 'qc').length;
    const redoWork = userTasks.filter(t => t.status === 'redo').length;

    return {
      ...user,
      tasks: userTasks,
      stats: {
        assigned: userTasks.length,
        done: doneWork,
        qc: qcWork,
        redo: redoWork,
      }
    };
  }, [selectedUserId]);

  return (
    <div className="h-full flex bg-gray-50 overflow-hidden">
      <TeamMemberSidebar
        users={teamData}
        selectedUserId={selectedUserId}
        onSelectUser={setSelectedUserId}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        {selectedUser ? (
          <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <img src={selectedUser.avatar} alt={selectedUser.name} className="w-14 h-14 rounded-full" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h1>
                        <p className="text-md text-gray-500">{selectedUser.designation}</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <PlusIcon className="w-5 h-5"/>
                    <span>Create New Task</span>
                </button>
            </div>
            <UserTaskList tasks={selectedUser.tasks} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <UserIcon className="w-16 h-16 text-gray-300 mx-auto" />
              <p className="text-gray-500 text-lg mt-4">Select a team member to view their details.</p>
            </div>
          </div>
        )}
      </main>
      <UserInfoPanel user={selectedUser} />
    </div>
  );
};

export default TeamPage; 