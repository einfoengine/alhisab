"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ServiceForm from '@/components/ServiceForm';

const NewServicePage = () => {
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, unknown>) => {
    try {
      // Here you would typically make an API call to create the service
      console.log('New Service Data:', formData);
      // After successful creation, redirect to the services list
      router.push('/dashboard/services');
    } catch (error) {
      console.error('Error creating service:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Service</h1>
      <ServiceForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewServicePage;
