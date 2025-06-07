"use client";

import React from 'react';
import TableBuilder, { TableRow } from '@/components/TableBuilder';
import messages from '@/data/messages.json';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

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
    { key: 'sender', label: 'Sender', accessor: 'sender', filterable: true },
    { key: 'subject', label: 'Subject', accessor: 'subject' },
    { key: 'date', label: 'Date', accessor: 'date' },
    { key: 'type', label: 'Type', accessor: 'type', filterable: true },
    { key: 'tags', label: 'Tags', accessor: 'tags', filterable: true },
    { key: 'actions', label: 'Actions', accessor: 'actions', render: (_value: unknown, item: TableRow) => (
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => console.log('Reply to:', item.sender)}
        >
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </button>
      ) },
  ];

  const handleSelectionChange = (selectedItems: TableRow[]) => {
    console.log('Selected Items:', selectedItems);
  };

  const handleRowClick = (item: TableRow) => {
    router.push(`/dashboard/messages/${item.id}`);
  };

  return (
    <div className="nt-component nt-messages">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <TableBuilder 
        columns={tableColumns} 
        data={tableData} 
        selectable={true} // Enable row selection
        onSelectionChange={handleSelectionChange} // Handle selection changes
        onRowClick={handleRowClick} // Make rows clickable
      />
    </div>
  );
};

export default MessagesPage;
