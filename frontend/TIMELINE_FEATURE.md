# Timeline-Based Task Management Feature

## Overview

The timeline-based task management feature allows users to view and manage tasks based on specific time periods (monthly or weekly). This feature is particularly useful for project managers and teams who need to focus on tasks within specific timeframes.

## Features

### 1. Timeline Selector
- **Monthly View**: View tasks for a specific month
- **Weekly View**: View tasks for a specific week
- **Quick Navigation**: Jump to any month within a 5-month range
- **Today Button**: Quickly return to current date
- **Previous/Next Navigation**: Navigate through time periods

### 2. Task Filtering
- Tasks are automatically filtered based on the selected timeline
- Only tasks that overlap with the selected time period are displayed
- Timeline indicator shows current view and task count

### 3. Visual Indicators
- Timeline information is displayed above the kanban board
- Shows current time period and number of filtered tasks
- Clear visual distinction between monthly and weekly views

## How It Works

### Timeline Calculation
- **Monthly View**: Shows tasks that start, end, or overlap with the selected month
- **Weekly View**: Shows tasks that start, end, or overlap with the selected week (Sunday to Saturday)

### Task Filtering Logic
```typescript
// Monthly filtering
const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

// Weekly filtering
const startOfWeek = new Date(currentDate);
startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6);
```

## Usage

### Navigation
1. **Switch Views**: Use the Monthly/Weekly toggle buttons
2. **Navigate Time**: Use left/right arrow buttons or quick navigation buttons
3. **Go to Today**: Click the "Today" button to return to current date
4. **Quick Jump**: Click on any month button to jump to that month

### Task Management
- Tasks are automatically filtered based on the selected timeline
- Drag and drop functionality works with filtered tasks
- Add new tasks using the "+" button in each column
- Task status updates are preserved across timeline changes

## Components

### TimelineSelector
- Main timeline navigation component
- Handles date changes and view switching
- Provides quick navigation options

### TasksBoardView
- Enhanced with timeline filtering
- Shows timeline indicator when timeline is active
- Displays filtered task count

### ServiceTasksPage
- Integrates timeline selector with task board
- Manages timeline state and filtering logic
- Generates sample tasks across multiple months for demonstration

## Benefits

1. **Focused View**: Concentrate on tasks within specific time periods
2. **Better Planning**: Visualize workload distribution across months/weeks
3. **Improved Navigation**: Quick access to different time periods
4. **Enhanced Productivity**: Focus on relevant tasks without distraction

## Future Enhancements

- Calendar view integration
- Timeline-based task creation
- Export timeline data
- Team availability overlay
- Resource allocation visualization 