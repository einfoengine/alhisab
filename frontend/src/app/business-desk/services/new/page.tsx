"use client";

import React from 'react';
import FormServices from '@/components/FormServices';
import PageHeader from '@/components/elements/PageHeader';

export default function AddServicePage() {
  return (
    <div className="p-8">
      <PageHeader title="Add New Service" />
      <FormServices
        onSubmit={(values) => {
          // TODO: Implement actual add logic
          console.log('Add service:', values);
        }}
        submitLabel="Add Service"
      />
    </div>
  );
}
