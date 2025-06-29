import React, { useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function InternalTab() {
  const [internalData, setInternalData] = useState({
    department: '',
    processCount: '',
    complianceScore: '',
    efficiencyRating: '',
    employeeSatisfaction: '',
    trainingCompletion: '',
    recommendations: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setInternalData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserGroupIcon className="w-5 h-5 mr-2 text-amber-600" />
          Internal Audit
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              value={internalData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Department name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Process Count</label>
              <input
                type="number"
                value={internalData.processCount}
                onChange={(e) => handleInputChange('processCount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Score (%)</label>
              <input
                type="number"
                step="0.01"
                value={internalData.complianceScore}
                onChange={(e) => handleInputChange('complianceScore', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Efficiency Rating</label>
              <select
                value={internalData.efficiencyRating}
                onChange={(e) => handleInputChange('efficiencyRating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select rating</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Satisfaction (%)</label>
              <input
                type="number"
                step="0.01"
                value={internalData.employeeSatisfaction}
                onChange={(e) => handleInputChange('employeeSatisfaction', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Internal Audit Recommendations</label>
            <textarea
              rows={4}
              value={internalData.recommendations}
              onChange={(e) => handleInputChange('recommendations', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Recommendations for improving internal processes..."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 