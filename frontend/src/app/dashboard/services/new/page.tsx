"use client";

import React from 'react';
import ServiceForm from '@/components/ServiceForm';

const NewServicePage = () => {
  const handleSubmit = (formData: Record<string, unknown>) => {
    // Logic to handle form submission, e.g., sending data to an API
    console.log('New Service Data:', formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Service</h1>
      <ServiceForm onSubmit={(formData: Record<string, unknown>) => handleSubmit(formData)} />
    </div>
  );
};

export default NewServicePage;
