import React from 'react';

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="messages-layout">
      {/* Add any layout-specific components like headers or sidebars here */}
      {children}
    </div>
  );
}
