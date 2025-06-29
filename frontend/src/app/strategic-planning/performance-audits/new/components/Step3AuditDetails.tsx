import React from 'react';

interface Step3AuditDetailsProps {
  auditName: string;
  onAuditNameChange: (name: string) => void;
  selectedAuditTypes: string[];
  totalDuration: number;
}

export default function Step3AuditDetails({ 
  auditName, 
  onAuditNameChange, 
  selectedAuditTypes, 
  totalDuration 
}: Step3AuditDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Audit Details</h2>
        <p className="text-gray-600">Provide basic information about your audit</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="auditName" className="block text-sm font-medium text-gray-700 mb-2">
            Audit Name *
          </label>
          <input
            type="text"
            id="auditName"
            value={auditName}
            onChange={(e) => onAuditNameChange(e.target.value)}
            placeholder="e.g., Q1 2024 Marketing Performance Audit"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Audit Summary</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Audit Types:</span>
              <span className="font-medium">{selectedAuditTypes.length} selected</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Duration:</span>
              <span className="font-medium">{totalDuration} hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 