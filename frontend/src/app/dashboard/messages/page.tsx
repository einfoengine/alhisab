"use client";

import React from 'react';
import TableBuilder from '@/components/TableBuilder';
import messages from '@/data/messages.json';

const MessagesPage = () => {
  const tableData = messages.map((message) => ({
    sender: message.sender,
    subject: message.subject,
    date: new Date(message.timestamp).toLocaleDateString(),
    type: message.type || 'undefined',
    actions: 'View / Delete',
  }));

  const tableColumns = [
    { key: 'sender', label: 'Sender' },
    { key: 'subject', label: 'Subject' },
    { key: 'date', label: 'Date' },
    { key: 'type', label: 'Type' },
    { key: 'actions', label: 'Actions' },
  ];

  interface MessageSelection {
    sender: string;
    subject: string;
    date: string;
    type: string;
    actions: string;
  }

  const handleSelectionChange = (selectedItems: MessageSelection[]) => {
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
