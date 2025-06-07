'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import messages from '@/data/messages.json';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const MessageDetailsPage = () => {
  const params = useParams();
  const messageId = params?.id as string;
  const message = messages.find((msg) => String(msg.id) === messageId);

  if (!message) {
    return <div>Message not found</div>;
  }

  const handleReply = () => {
    console.log('Reply to:', message.sender);
    // Here you can add logic to open a reply form or navigate to a reply page
  };

  return (
    <div className="nt-component nt-message-details">
      <Link href="/dashboard/messages" className="flex items-center text-blue-500 hover:text-blue-700 mb-4">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Messages
      </Link>
      <h1 className="text-2xl font-bold mb-4">{message.subject}</h1>
      <div className="mb-4">
        <p><strong>Sender:</strong> {message.sender}</p>
        <p><strong>Date:</strong> {new Date(message.timestamp).toLocaleDateString()}</p>
        <p><strong>Type:</strong> {message.type || 'undefined'}</p>
        <p><strong>Tags:</strong> {message.tags.join(', ')}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Content</h2>
        <p>{message.message}</p>
      </div>
      <button onClick={handleReply} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Reply
      </button>
    </div>
  );
};

export default MessageDetailsPage; 