'use client';
// In the page there will be the details of the task. 

import { useState, useEffect } from 'react';
import TasksForm from '@/components/TasksForm';
import TaskDiscussion from '@/components/TaskDiscussion';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, DocumentArrowUpIcon, XCircleIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface TaskDetailsPageProps {
  params: Promise<{ id: string }>;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export default function TaskDetailsPage({ params }: TaskDetailsPageProps) {
  const [id, setId] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isAttachmentsCollapsed, setIsAttachmentsCollapsed] = useState(false);
  const [isDiscussionCollapsed, setIsDiscussionCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const handleBack = () => {
    router.push('/client-management/tasks');
  };

  const handleAddComment = (message: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: 'Current User',
      text: message,
      timestamp: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }));
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const removeFile = (fileId: string) => {
    setAttachments(attachments.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
                  // Handle delete logic here
                  router.push('/client-management/tasks');
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete Task</span>
            </button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Task Form */}
          <div className="lg:col-span-2">
            <TasksForm taskId={id} />
          </div>
          
          {/* Right Column - File Upload and Discussion */}
          <div className="lg:col-span-1 space-y-6">
            {/* Collapsible Attachments Component */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => setIsAttachmentsCollapsed(!isAttachmentsCollapsed)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                  Attachments ({attachments.length})
                </h3>
                {isAttachmentsCollapsed ? (
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {!isAttachmentsCollapsed && (
                <div className="px-6 pb-6 space-y-3">
                  {/* File List */}
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      {attachments.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center space-x-3">
                            <DocumentArrowUpIcon className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircleIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <DocumentArrowUpIcon className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="mt-2">
                        <span className="text-blue-600 hover:text-blue-500 font-medium text-sm">
                          Click to upload
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Images, PDFs, and documents
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Discussion Component */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => setIsDiscussionCollapsed(!isDiscussionCollapsed)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Discussion & History ({comments.length})
                </h3>
                {isDiscussionCollapsed ? (
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {!isDiscussionCollapsed && (
                <div className="px-6 pb-6">
                  <TaskDiscussion 
                    taskId={id}
                    comments={comments}
                    onAddComment={handleAddComment}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}