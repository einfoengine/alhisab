"use client";

import React from 'react';
import TableBuilder from '@/components/TableBuilder';
import messages from '@/data/messages.json';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/elements/PageHeader';

type MessageRow = {
  id: string | number;
  sender: string;
  subject: string;
  date: string;
  type: string;
  tags: string;
};

const MessagesPage = () => {
  const router = useRouter();

  const tableData = messages.map((message) => ({
    id: message.id, // Include the id field for unique identification
    sender: message.sender,
    subject: message.subject,
    date: new Date(message.timestamp).toLocaleDateString(),
    type: message.type || 'undefined',
    tags: message.tags.join(', '), // Add tags as a comma-separated string
  }));

  const tableColumns = [
    { 
      key: 'sender', 
      label: 'Sender', 
      filterable: true, 
      render: (_value: unknown, item: MessageRow) => (
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {item.sender?.charAt(0) || '?'}
            </span>
          </div>
          <span>{item.sender || 'Unknown'}</span>
        </div>
      ) 
    },
    { key: 'subject', label: 'Subject' },
    { key: 'date', label: 'Date' },
    { key: 'type', label: 'Type', filterable: true },
    { key: 'tags', label: 'Tags', filterable: true }
  ];

  const handleSelectionChange = (selectedItems: MessageRow[]) => {
    console.log('Selected Items:', selectedItems);
  };

  const handleRowClick = (item: MessageRow) => {
    router.push(`/business-desk/messages/${item.id}`);
  };

  return (
    <div className="nt-page nt-messages">
      <PageHeader title="Messages" />
      <div className="nt-page-container">
        <TableBuilder 
          columns={tableColumns} 
          data={tableData} 
          selectable={true} // Enable row selection
          onSelectionChange={handleSelectionChange} // Handle selection changes
          onRowClick={handleRowClick} // Make rows clickable
        />
      </div>
    </div>
  );
};

export default MessagesPage;
