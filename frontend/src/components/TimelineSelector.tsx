'use client';

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

export type TimelineView = 'monthly' | 'weekly';

export interface TimelineSelectorProps {
  currentDate: Date;
  view: TimelineView;
  onDateChange: (date: Date) => void;
  onViewChange: (view: TimelineView) => void;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({
  currentDate,
  view,
  onDateChange,
  onViewChange,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(currentDate);

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const startStr = startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `${startStr} - ${endStr}`;
  };

  const navigatePrevious = () => {
    const newDate = new Date(selectedMonth);
    if (view === 'monthly') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setSelectedMonth(newDate);
    onDateChange(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(selectedMonth);
    if (view === 'monthly') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setSelectedMonth(newDate);
    onDateChange(newDate);
  };

  const quickNavigate = (monthsOffset: number) => {
    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() + monthsOffset);
    setSelectedMonth(newDate);
    onDateChange(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedMonth(today);
    onDateChange(today);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Navigation Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={navigatePrevious}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title={`Previous ${view === 'monthly' ? 'month' : 'week'}`}
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">
              {view === 'monthly' ? formatMonth(selectedMonth) : formatWeek(selectedMonth)}
            </span>
          </div>
          
          <button
            onClick={navigateNext}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title={`Next ${view === 'monthly' ? 'month' : 'week'}`}
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const date = new Date();
              date.setMonth(date.getMonth() + offset);
              const isCurrent = selectedMonth.getMonth() === date.getMonth() && 
                               selectedMonth.getFullYear() === date.getFullYear();
              
              return (
                <button
                  key={offset}
                  onClick={() => quickNavigate(offset)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isCurrent
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  {formatMonth(date)}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={goToToday}
            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 transition-colors border border-green-200"
          >
            Today
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewChange('monthly')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
              view === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            Monthly
          </button>
          <button
            onClick={() => onViewChange('weekly')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
              view === 'weekly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ClockIcon className="w-4 h-4" />
            Weekly
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineSelector; 