'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TableBuilder from '@/components/TableBuilder';
import PageHeader from '@/components/elements/PageHeader';
import users from '@/data/users.json';
import Image from 'next/image';

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
};

const UsersPage = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const handleRowClick = (userId: string) => {
    router.push(`/business-desk/users/${userId}`);
  };

  const filteredUsers = selectedRole === 'all' 
    ? users.users 
    : users.users.filter(user => user.role === selectedRole);

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (_value: unknown, item: User) => (
        <div className="flex items-center gap-3">
          <Image
            src={item.avatar || '/default-avatar.png'}
            alt={item.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <div 
              className="font-medium text-blue-600 cursor-pointer hover:text-blue-800"
              onClick={() => handleRowClick(item.id)}
            >
              {item.name}
            </div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value: unknown) => (
        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
          {(value as string).replace('_', ' ').toUpperCase()}
        </span>
      ),
    },
    {
      key: 'skills',
      label: 'Skills',
      render: (_value: unknown, item: User) => (
        <div className="flex flex-wrap gap-1">
          {item.skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
          {item.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">
              +{item.skills.length - 3} more
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: unknown) => (
        <span className={`inline-block px-2 py-1 rounded-full text-sm ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {(value as string).toUpperCase()}
        </span>
      ),
    },
    {
      key: 'performance',
      label: 'Performance',
      sortable: true,
      render: (_value: unknown, item: User) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Rating:</span>
            <span className="text-sm">{item.performance.rating}/5.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Projects:</span>
            <span className="text-sm">{item.performance.completed_projects}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'join_date',
      label: 'Join Date',
      sortable: true,
      render: (value: unknown) => (
        <span>{new Date(value as string).toLocaleDateString()}</span>
      ),
    },
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'team_leader', label: 'Team Leader' },
    { value: 'designer', label: 'Designer' },
    { value: 'content_writer', label: 'Content Writer' },
    { value: 'video_maker', label: 'Video Maker' },
    { value: 'animator', label: 'Animator' },
    { value: 'seo_specialist', label: 'SEO Specialist' },
    { value: 'social_media_specialist', label: 'Social Media Specialist' },
    { value: 'media_buying_specialist', label: 'Media Buying Specialist' },
    { value: 'others', label: 'Others' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Users" />
        
        <div className="mt-6">
          <div className="mb-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {roleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <TableBuilder<User>
              columns={columns}
              data={filteredUsers}
              onRowClick={(item) => handleRowClick(item.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage; 