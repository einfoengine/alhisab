'use client';
import React, { useState } from 'react';
import Sidebar, { SidebarMenuGroup } from '../../components/sidebars/Sidebar';
import { CalendarDaysIcon, ClockIcon, BellIcon, HomeIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import PageHeader from '@/components/elements/PageHeader';
import StatsGrid from '@/components/StatsGrid';
import RecentActivities from '@/components/RecentActivities';
import ReactCalendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './calendar.module.css';

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
      { name: 'Blog Posts', href: '/calendar/content/blog-posts', icon: DocumentTextIcon },
      { name: 'Social Posts', href: '/calendar/content/social-posts', icon: ChartBarIcon },
      { name: 'Email Campaigns', href: '/calendar/content/email-campaigns', icon: BellIcon },
      { name: 'Ad Campaigns', href: '/calendar/content/ad-campaigns', icon: CalendarDaysIcon },
    ],
  },
];

const stats = [
  {
    name: 'Upcoming Events',
    value: '5',
    change: '+2 this week',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Scheduled Posts',
    value: '8',
    change: '+3 this week',
    icon: ChartBarIcon,
  },
  {
    name: 'Pending Approvals',
    value: '3',
    change: '-1 this week',
    icon: DocumentTextIcon,
  },
  {
    name: 'Meetings',
    value: '4',
    change: '+1 this week',
    icon: ClockIcon,
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'Content',
    description: 'Scheduled blog post "SEO Trends 2024"',
    time: '1 hour ago',
  },
  {
    id: 2,
    type: 'Meeting',
    description: 'Client meeting with Acme Corp confirmed',
    time: '3 hours ago',
  },
  {
    id: 3,
    type: 'Approval',
    description: 'Social post for Product Launch approved',
    time: 'Today',
  },
  {
    id: 4,
    type: 'Reminder',
    description: 'Reminder set for Email Campaign review',
    time: 'Yesterday',
  },
];

const viewModes = [
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
  { label: 'Day', value: 'day' },
  { label: 'Year', value: 'year' },
];

// Sample event data
const events = [
  { id: 1, date: '2024-07-01', title: 'Client Meeting', type: 'meeting' },
  { id: 2, date: '2024-07-01', title: 'Blog Post: Summer Trends', type: 'content' },
  { id: 3, date: '2024-07-03', title: 'Social Post: Product Launch', type: 'content' },
  { id: 4, date: '2024-07-05', title: 'Ad Campaign Starts', type: 'ad' },
  { id: 5, date: '2024-07-05', title: 'Email Campaign Review', type: 'email' },
  { id: 6, date: '2024-07-10', title: 'Team Meeting', type: 'meeting' },
];

function getEventsForDate(date: Date) {
  const d = date.toISOString().slice(0, 10);
  return events.filter(e => e.date === d);
}

const CalendarPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'year'>('month');

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value && value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
    }
  };

  // Helper for week view: get start of week (Sunday)
  function getStartOfWeek(date: Date) {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }

  // Helper for week view: get all days in week
  function getWeekDays(date: Date) {
    const start = getStartOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menuGroups={calendarMenuGroups}
        title="Calendar"
        version="v1.0.0"
      />
      <main className={`flex-1 bg-gray-50 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="nt-page nt-calendar max-w-6xl mx-auto py-8 px-4">
          <PageHeader title="Calendar" />
          <StatsGrid stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
                <div className="flex space-x-2 mb-6">
                  {viewModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setViewMode(mode.value as 'month' | 'week' | 'day' | 'year')}
                      className={`px-4 py-2 rounded-md font-medium transition-colors border border-blue-100 shadow-sm
                        ${viewMode === mode.value ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
                {viewMode === 'month' && (
                  <>
                    <div className="w-full">
                      <ReactCalendar
                        onChange={handleDateChange}
                        value={date}
                        className={`w-full ${styles.reactCalendar}`}
                        view="month"
                        tileContent={({ date: tileDate }) => {
                          const dayEvents = getEventsForDate(tileDate);
                          return dayEvents.length > 0 ? (
                            <div className="flex justify-center mt-1">
                              {dayEvents.slice(0, 3).map(ev => (
                                <span key={ev.id} className={`inline-block w-2 h-2 rounded-full mx-0.5 ${ev.type === 'meeting' ? 'bg-blue-500' : ev.type === 'content' ? 'bg-green-500' : ev.type === 'ad' ? 'bg-yellow-500' : 'bg-pink-500'}`}></span>
                              ))}
                              {dayEvents.length > 3 && <span className="text-xs text-gray-400 ml-1">+{dayEvents.length - 3}</span>}
                            </div>
                          ) : null;
                        }}
                      />
                    </div>
                    <div className="mt-4 text-blue-700 font-medium">
                      Selected date: {date.toLocaleDateString()}
                    </div>
                    {/* Event list for selected day */}
                    <div className="mt-4 w-full">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Events for {date.toLocaleDateString()}:</h3>
                      {getEventsForDate(date).length === 0 ? (
                        <div className="text-gray-400">No events for this day.</div>
                      ) : (
                        <ul className="space-y-2">
                          {getEventsForDate(date).map(ev => (
                            <li key={ev.id} className="bg-blue-50 border-l-4 border-blue-400 rounded p-2 flex items-center">
                              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${ev.type === 'meeting' ? 'bg-blue-500' : ev.type === 'content' ? 'bg-green-500' : ev.type === 'ad' ? 'bg-yellow-500' : 'bg-pink-500'}`}></span>
                              <span className="text-blue-900 font-medium">{ev.title}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}
                {viewMode === 'year' && (
                  <div className="w-full">
                    <ReactCalendar
                      onChange={handleDateChange}
                      value={date}
                      className={`w-full ${styles.reactCalendar}`}
                      view="year"
                    />
                    <div className="mt-4 text-blue-700 font-medium">
                      Selected year: {date.getFullYear()}
                    </div>
                  </div>
                )}
                {viewMode === 'week' && (
                  <div className="w-full">
                    <div className="flex justify-between mb-2 text-blue-900 font-semibold">
                      {getWeekDays(date).map((d) => (
                        <div key={d.toDateString()} className="flex-1 text-center">
                          {d.toLocaleDateString(undefined, { weekday: 'short' })}<br />
                          <span className={`inline-block mt-1 px-2 py-1 rounded-full ${d.toDateString() === date.toDateString() ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-900'}`}>{d.getDate()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-48 flex items-center justify-center text-blue-700 font-semibold bg-blue-50 rounded-lg">
                      Weekly view for week of {getWeekDays(date)[0].toLocaleDateString()}
                    </div>
                  </div>
                )}
                {viewMode === 'day' && (
                  <div className="w-full">
                    <div className="flex justify-center mb-2">
                      <span className="text-blue-900 font-semibold text-lg bg-blue-100 px-4 py-2 rounded-full">
                        {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="h-48 flex items-center justify-center text-blue-700 font-semibold bg-blue-50 rounded-lg">
                      Daily view for {date.toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <RecentActivities activities={recentActivity} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage; 