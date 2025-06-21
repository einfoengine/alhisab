'use client';

import React from 'react';

export default function ChessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="chess-layout">
      {children}
    </div>
  );
} 