import React from 'react';
import { useAuditData } from '../AuditDataContext';
import MediaBuyingAuditResult from './MediaBuyingAuditResult';

interface Step3AuditDetailsProps {
  selectedAuditTypes: string[];
}

const prettifyLabel = (label: string) =>
  label
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, str => str.toUpperCase());

const Step3AuditDetails: React.FC<Step3AuditDetailsProps> = ({ selectedAuditTypes }) => {
  const { auditData } = useAuditData();
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Primary audit result</h1>
      <div className="text-sm text-gray-500 mb-6">Report Print Date: {formattedDate}</div>
      <div className="bg-white border border-blue-200 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">Types of audits done</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedAuditTypes.map(type => (
            <span
              key={type}
              className="inline-block rounded-full bg-blue-50 text-blue-700 px-3 py-1 font-medium text-sm mr-2 mb-2"
            >
              {prettifyLabel(type)}
            </span>
          ))}
        </div>
      </div>

      {/* Render Media Buying Audit Result if selected */}
      {selectedAuditTypes.includes('media_buying') && (
        <div className="bg-white border border-blue-200 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Media Buying Audit Results</h2>
          <MediaBuyingAuditResult data={auditData['media_buying'] || {}} />
        </div>
      )}
    </div>
  );
};

export default Step3AuditDetails;