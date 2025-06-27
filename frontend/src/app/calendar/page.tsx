'use client';
import React, { useState } from 'react';
import Sidebar, { SidebarMenuGroup } from '../../components/sidebars/Sidebar';
import { CalendarDaysIcon, ClockIcon, BellIcon, HomeIcon } from '@heroicons/react/24/outline';

const calendarMenuGroups: SidebarMenuGroup[] = [
  {
    name: 'Main',
    icon: HomeIcon,
    items: [
      { name: 'Calendar Home', href: '/calendar', icon: HomeIcon },
    ],
  },
  {
    name: 'Events',
    icon: CalendarDaysIcon,
    items: [
      { name: 'All Events', href: '/calendar/events', icon: CalendarDaysIcon },
      { name: 'Add Event', href: '/calendar/events/new', icon: CalendarDaysIcon },
    ],
  },
  {
    name: 'Meetings',
    icon: ClockIcon,
    items: [
      { name: 'All Meetings', href: '/calendar/meetings', icon: ClockIcon },
      { name: 'Add Meeting', href: '/calendar/meetings/new', icon: ClockIcon },
    ],
  },
  {
    name: 'Reminders',
    icon: BellIcon,
    items: [
      { name: 'All Reminders', href: '/calendar/reminders', icon: BellIcon },
      { name: 'Add Reminder', href: '/calendar/reminders/new', icon: BellIcon },
    ],
  },
  {
    name: 'Content Calendar',
    icon: CalendarDaysIcon,
    items: [
      { name: 'Blog Posts', href: '/calendar/content/blog-posts', icon: CalendarDaysIcon },
      { name: 'Social Posts', href: '/calendar/content/social-posts', icon: CalendarDaysIcon },
      { name: 'Email Campaigns', href: '/calendar/content/email-campaigns', icon: CalendarDaysIcon },
      { name: 'Ad Campaigns', href: '/calendar/content/ad-campaigns', icon: CalendarDaysIcon },
    ],
  },
];

const CalendarPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menuGroups={calendarMenuGroups}
        title="Calendar"
        version="v1.0.0"
      />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-5xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Digital Marketing Calendar</h1>
          <p className="text-gray-700 mb-8">Welcome to your all-in-one calendar for managing digital marketing events, content, campaigns, and team collaboration.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col items-center">
              <CalendarDaysIcon className="w-8 h-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-900">5</div>
              <div className="text-gray-600">Upcoming Events</div>
            </div>
            <div className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col items-center">
              <BellIcon className="w-8 h-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-900">8</div>
              <div className="text-gray-600">Scheduled Posts</div>
            </div>
            <div className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col items-center">
              <ClockIcon className="w-8 h-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-900">3</div>
              <div className="text-gray-600">Pending Approvals</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow border border-blue-100 p-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">What you can do here</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Schedule and manage marketing events, meetings, and reminders</li>
              <li>Plan and track blog posts, social media, email, and ad campaigns</li>
              <li>Assign tasks and meetings to team members</li>
              <li>Get reminders for deadlines and approvals</li>
              <li>Collaborate with your team and clients in real time</li>
              <li>View all your digital marketing activities in one place</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage; 