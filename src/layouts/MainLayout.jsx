import React from 'react';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#2F241B] text-[#2F241B] relative flex flex-col justify-between">
      {/* Main room view */}
      <main className="flex-1 w-full relative z-1">
        {children}
      </main>
    </div>
  );
}
