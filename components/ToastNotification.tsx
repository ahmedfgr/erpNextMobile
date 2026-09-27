'use client';

import React from 'react';

interface ToastNotificationProps {
  message: string | null;
}

export function ToastNotification({ message }: ToastNotificationProps) {
  return (
    <div
      className={`fixed bottom-16 sm:bottom-6 left-4 sm:left-6 z-50 bg-[#111928] text-white px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-3 transition-all duration-300 pointer-events-none ${
        message ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
    >
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
      <span>{message || ''}</span>
    </div>
  );
}
