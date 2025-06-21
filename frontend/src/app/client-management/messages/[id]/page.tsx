'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import messages from '@/data/messages.json';
import PageHeader from '@/components/elements/PageHeader';
import MessageForm from '@/components/MessageForm';

const MessageDetailsPage = () => {
  const params = useParams();
  const messageId = params?.id as string;
  const message = messages.find((msg) => String(msg.id) === messageId);
  const [isEditing, setIsEditing] = useState(false);

  if (!message) {
    return <div>Message not found</div>;
  }

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
          {/* <button onClick={handleReply} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.5 1.5 1.5-4.5L16.862 3.487z" />
            </svg>
          </button> */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-4 p-2 bg-blue-600 text-white rounded-full hover:bg-green-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487c.34-.34.8-.537 1.285-.537.485 0 .945.197 1.285.537l.081.081c.34.34.537.8.537 1.285 0 .485-.197.945-.537 1.285L8.978 17.688a4.5 4.5 0 01-1.591 1.03l-3.262 1.163 1.163-3.262a4.5 4.5 0 011.03-1.591L16.862 4.487z"
              />
            </svg>
          </button>
        </div>
        {isEditing && (
          <div className="mt-6">
            <MessageForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageDetailsPage;