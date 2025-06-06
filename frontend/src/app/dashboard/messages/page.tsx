"use client";

import React from 'react';
import TableBuilder, { TableRow } from '@/components/TableBuilder';
import messages from '@/data/messages.json';

const MessagesPage = () => {
  const tableData = messages.map((message) => ({
    id: message.id, // Include the id field for unique identification
    sender: message.sender,
    subject: message.subject,
    date: new Date(message.timestamp).toLocaleDateString(),
    type: message.type || 'undefined',
    tags: message.tags.join(', '), // Add tags as a comma-separated string
    actions: 'View / Delete',
  }));

  const tableColumns = [
    { key: 'sender', label: 'Sender', accessor: 'sender' },
    { key: 'subject', label: 'Subject', accessor: 'subject' },
    { key: 'date', label: 'Date', accessor: 'date' },
    { key: 'type', label: 'Type', accessor: 'type', filterable: true },
    { key: 'tags', label: 'Tags', accessor: 'tags', filterable: true }, // Add a column for tags
    { key: 'actions', label: 'Actions', accessor: 'actions' },
  ];

  const handleSelectionChange = (selectedItems: TableRow[]) => {
    console.log('Selected Items:', selectedItems);
  };

  return (
    <div className="nt-component nt-messages">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <TableBuilder 
        columns={tableColumns} 
        data={tableData} 
        selectable={true} // Enable row selection
        onSelectionChange={handleSelectionChange} // Handle selection changes
      />
    </div>
  );
};

export default MessagesPage;
