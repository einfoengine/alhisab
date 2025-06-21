'use client';

import React from 'react';
import PageHeader from '@/components/elements/PageHeader';
import TasksForm from '@/components/TasksForm';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const NewTaskPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/client-management/tasks');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="Create New Task" 
          actions={[
            {
              name: 'Back to Tasks',
              icon: ArrowLeftIcon,
              onClick: handleBack
            }
          ]}
        />
        <div className="mt-6">
          <TasksForm />
        </div>
      </div>
    </div>
  );
};

export default NewTaskPage; 