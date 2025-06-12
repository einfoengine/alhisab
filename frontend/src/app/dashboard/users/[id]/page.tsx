'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import PageHeader from '@/components/elements/PageHeader';
import users from '@/data/users.json';
import projects from '@/data/projects.json';
import Image from 'next/image';

const UserDetailsPage = () => {
  const params = useParams();
  const userId = params?.id as string;
  
  const user = users.users.find(u => u.id === userId);
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">User not found</h1>
          <p className="mt-2 text-gray-600">The user you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const userProjects = projects.projects.filter(p => user.projects.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="User Details" />
        
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-6">
                <Image
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.name}&apos;s Profile</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                <p className="mt-2 text-gray-600">{user.bio}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900">Assigned Projects</h3>
              <div className="mt-4 space-y-4">
                {userProjects.map(project => (
                  <div 
                    key={project.id}
                    className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Phone</span>
                  <p className="mt-1 text-gray-900">{user.phone}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Email</span>
                  <p className="mt-1 text-gray-900">{user.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Join Date</span>
                  <p className="mt-1 text-gray-900">
                    {new Date(user.join_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Rating</span>
                    <span className="text-sm font-medium text-gray-900">
                      {user.performance.rating}/5.0
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(user.performance.rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Completed Projects</span>
                    <span className="text-sm font-medium text-gray-900">
                      {user.performance.completed_projects}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">On-time Delivery</span>
                    <span className="text-sm font-medium text-gray-900">
                      {user.performance.on_time_delivery}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${user.performance.on_time_delivery}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage; 