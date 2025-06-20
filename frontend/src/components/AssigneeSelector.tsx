'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import users from '@/data/users.json';

interface AssigneeSelectorProps {
  selectedAssignees: string[];
  onAssigneesChange: (assignees: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const AssigneeSelector: React.FC<AssigneeSelectorProps> = ({
  selectedAssignees,
  onAssigneesChange,
  placeholder = "Select assignees...",
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAssigneeToggle = (userId: string) => {
    const newAssignees = selectedAssignees.includes(userId)
      ? selectedAssignees.filter(id => id !== userId)
      : [...selectedAssignees, userId];
    onAssigneesChange(newAssignees);
  };

  const removeAssignee = (userId: string) => {
    onAssigneesChange(selectedAssignees.filter(id => id !== userId));
  };

  const filteredUsers = users.users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSelectedUsers = () => {
    return users.users.filter(user => selectedAssignees.includes(user.id));
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Assignees Display */}
      <div className="min-h-[40px] p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <div className="flex flex-wrap gap-2">
          {getSelectedUsers().map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
            >
              <img
                src={user.avatar || '/default-avatar.png'}
                alt={user.name}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-xs">{user.name}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeAssignee(user.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          
          {/* Dropdown Trigger */}
          {!disabled && (
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <span className="text-sm">
                {selectedAssignees.length === 0 ? placeholder : 'Add more...'}
              </span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>
          
          {/* User List */}
          <div className="p-2">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm">
                No users found
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-3 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleAssigneeToggle(user.id)}
                >
                  <img
                    src={user.avatar || '/default-avatar.png'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm flex-1">{user.name}</span>
                  {selectedAssignees.includes(user.id) && (
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssigneeSelector; 