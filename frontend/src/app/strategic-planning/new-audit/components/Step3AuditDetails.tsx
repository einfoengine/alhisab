'use client';

import React from 'react';
import { useAuditData } from '../AuditDataContext';

interface Step3AuditDetailsProps {
  auditName: string;
  onAuditNameChange: (name: string) => void;
  clientName: string;
  onClientNameChange: (name: string) => void;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  auditNumber: string;
  onAuditNumberChange: (num: string) => void;
  auditDate: string;
  onAuditDateChange: (date: string) => void;
  selectedAuditTypes: string[];
  totalDuration: number;
  onBack: () => void;
  onFinish: () => void;
}

function prettifyLabel(label: string) {
  return label
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, str => str.toUpperCase());
}

const Step3AuditDetails: React.FC<Step3AuditDetailsProps> = ({
  auditName,
  onAuditNameChange,
  clientName,
  onClientNameChange,
  projectName,
  onProjectNameChange,
  auditNumber,
  onAuditNumberChange,
  auditDate,
  onAuditDateChange,
  selectedAuditTypes,
  totalDuration,
  onBack,
  onFinish
}) => {
  const { auditData } = useAuditData();

  const renderValue = (value: unknown): React.ReactNode => {
    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="text-gray-400">N/A</span>;
      return (
        <ul className="list-disc ml-6">
          {value.map((item, idx) => (
            <li key={idx}>{typeof item === 'object' && item !== null ? renderObject(item as Record<string, unknown>) : String(item)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object' && value !== null) {
      return renderObject(value as Record<string, unknown>);
    } else if (value === null || value === undefined || value === "") {
      return <span className="text-gray-400">N/A</span>;
    } else {
      return <span>{String(value)}</span>;
    }
  };

  const renderObject = (obj: Record<string, unknown>): React.ReactNode => (
    <table className="min-w-full border mb-4">
      <tbody>
        {Object.entries(obj).map(([key, value], idx) => (
          <tr key={idx} className="border-b">
            <td className="font-medium px-2 py-1 align-top whitespace-nowrap">{prettifyLabel(key)}:</td>
            <td className="px-2 py-1">{renderValue(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Digital Marketing Audit Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Audit Name</label>
            <input className="w-full border rounded px-2 py-1" value={auditName} onChange={e => onAuditNameChange(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Client Name</label>
            <input className="w-full border rounded px-2 py-1" value={clientName} onChange={e => onClientNameChange(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Project Name</label>
            <input className="w-full border rounded px-2 py-1" value={projectName} onChange={e => onProjectNameChange(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Audit Number</label>
            <input className="w-full border rounded px-2 py-1" value={auditNumber} onChange={e => onAuditNumberChange(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Audit Date</label>
            <input type="date" className="w-full border rounded px-2 py-1" value={auditDate} onChange={e => onAuditDateChange(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Estimated Duration</label>
            <input className="w-full border rounded px-2 py-1" value={totalDuration + ' hours'} disabled />
          </div>
        </div>
      </div>

      {selectedAuditTypes.map(type => (
        <div key={type} className="mb-8">
          <h3 className="text-xl font-semibold mb-3">{prettifyLabel(type)}</h3>
          {auditData[type] ? renderObject(auditData[type] as Record<string, unknown>) : <div className="text-gray-400">No data entered.</div>}
        </div>
      ))}

      <div className="flex justify-between mt-8 pt-6 border-t">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onFinish}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Finish & Save
        </button>
      </div>
    </div>
  );
};

export default Step3AuditDetails;
