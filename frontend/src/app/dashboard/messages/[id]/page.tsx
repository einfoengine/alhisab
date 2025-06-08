'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import messages from '@/data/messages.json';
import PageHeader from '@/components/elements/PageHeader';

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
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Message Details" />
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-medium text-gray-600">{message.sender.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{message.sender}</p>
              <p className="text-sm text-gray-500">sender@example.com</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 text-right">
            <p><strong>ID:</strong> {message.id}</p>
            <p><strong>Date:</strong> {new Date(message.timestamp).toLocaleDateString()}</p>
            <p><strong>Tags:</strong> {message.tags.join(', ')}</p>
          </div>
        </div>
        <h2 className="text-sm font-bold text-gray-900 mb-4">Subject: {message.subject}</h2>
        <div className="text-gray-700 leading-relaxed mb-6">
          <p>{message.message}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={handleReply} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.5 1.5 1.5-4.5L16.862 3.487z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailsPage;