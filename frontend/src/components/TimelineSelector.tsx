'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

export type TimelineView = 'monthly' | 'weekly';

export interface TimelineSelectorProps {
  currentDate: Date;
  view: TimelineView;
  onDateChange: (date: Date) => void;
  onViewChange: (view: TimelineView) => void;
  taskCount: number;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({
  currentDate,
  view,
  onDateChange,
  onViewChange,
  taskCount,
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1)); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
    endOfWeek.setHours(23, 59, 59, 999);

    const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' });
    const startDay = startOfWeek.getDate();
    const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });
    const endDay = endOfWeek.getDate();
    const year = startOfWeek.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    }
    
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
  };

  const navigatePrevious = () => {
    const newDate = new Date(selectedDate);
    if (view === 'monthly') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(selectedDate);
    if (view === 'monthly') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const quickNavigate = (monthsOffset: number) => {
    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() + monthsOffset);
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    onDateChange(today);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={navigatePrevious}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            title={`Previous ${view === 'monthly' ? 'month' : 'week'}`}
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-gray-700" />
            <span className="text-base font-semibold text-gray-800 w-48 text-center">
              {view === 'monthly' ? formatMonth(selectedDate) : formatWeek(selectedDate)}
            </span>
          </div>
          
          <button
            onClick={navigateNext}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            title={`Next ${view === 'monthly' ? 'month' : 'week'}`}
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="flex-1 flex justify-center items-center gap-4">
          <div className="flex items-center gap-4 text-sm font-medium">
            {view === 'monthly' && [-2, -1, 0, 1, 2].map((offset) => {
              const date = new Date();
              date.setMonth(date.getMonth() + offset);
              const isCurrent = selectedDate.getMonth() === date.getMonth() && 
                               selectedDate.getFullYear() === date.getFullYear();
              
              if (isCurrent) {
                return (
                  <button
                    key={offset}
                    onClick={() => quickNavigate(offset)}
                    className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 border border-blue-200"
                  >
                    {formatMonth(date)}
                  </button>
                );
              }
              return (
                <button
                  key={offset}
                  onClick={() => quickNavigate(offset)}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {formatMonth(date)}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={goToToday}
            className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200 hover:bg-green-100 transition-colors"
          >
            Today
          </button>
        </div>

        {/* View Toggle & Task Count */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            <span className="font-bold text-gray-700">{taskCount}</span> tasks
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewChange('monthly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                view === 'monthly'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              Monthly
            </button>
            <button
              onClick={() => onViewChange('weekly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                view === 'weekly'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              Weekly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSelector; 