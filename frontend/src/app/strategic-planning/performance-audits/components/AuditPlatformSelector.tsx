import React, { useState } from 'react';

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface AuditPlatformSelectorProps {
  platforms: Platform[];
  onChange: (selected: string[]) => void;
  children?: (selected: string[]) => React.ReactNode;
}

const AuditPlatformSelector: React.FC<AuditPlatformSelectorProps> = ({ platforms, onChange, children }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      const next = prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId];
      onChange(next);
      return next;
    });
  };

  return (
    <div>
      <div className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.id);
            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => handleToggle(platform.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left flex items-center gap-2 font-medium text-base shadow-sm focus:outline-none
                  ${isSelected ? 'border-green-500 bg-green-50 text-green-900' : 'border-gray-200 text-gray-800 hover:border-green-300 bg-white'}`}
              >
                <Icon className="h-5 w-5 mr-2" />
                <span>{platform.name}</span>
                {isSelected && <span className="ml-auto text-green-600">&#10003;</span>}
              </button>
            );
          })}
        </div>
      </div>
      {selectedPlatforms.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 mb-4">
          <h3 className="font-medium text-green-900 mb-2 text-sm">Selected Platforms ({selectedPlatforms.length})</h3>
          <div className="flex flex-wrap gap-2">
            {selectedPlatforms.map((platformId) => {
              const platform = platforms.find(p => p.id === platformId);
              return (
                <span key={platformId} className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {platform?.name || platformId}
                </span>
              );
            })}
          </div>
        </div>
      )}
      {/* Render forms or children below */}
      {children ? children(selectedPlatforms) : null}
    </div>
  );
};

export default AuditPlatformSelector; 