'use client';

import React, { useState, useEffect } from 'react';

export interface TimelineSelectorProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  taskCount: number;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({
  currentDate,
  onDateChange,
  taskCount,
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleMonthSelect = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };
  
  const generateMonths = () => {
    const months = [];
    const today = new Date();
    for (let i = -6; i <= 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      months.push(date);
    }
    return months;
  };
  
  const months = generateMonths();

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    onDateChange(today);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between gap-4">
        {/* Scrollable months container */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex items-center gap-4 text-sm font-medium">
            {months.map((month) => {
              const isCurrent = selectedDate.getMonth() === month.getMonth() && 
                               selectedDate.getFullYear() === month.getFullYear();
              
              return (
                <button
                  key={month.toISOString()}
                  onClick={() => handleMonthSelect(month)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${
                    isCurrent
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {formatMonth(month)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <button
            onClick={goToToday}
            className="px-3 py-1 text-gray-600 rounded-lg text-sm font-medium border bg-white hover:bg-gray-50 transition-colors"
          >
            Today
          </button>
          <div className="text-sm text-gray-500">
            <span className="font-bold text-gray-700">{taskCount}</span> tasks
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSelector; 