'use client';

import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-4 right-4 z-50 flex items-center gap-2 rounded-2xl bg-amber-600/95 backdrop-blur-md px-4 py-2 text-xs font-bold text-white shadow-xl border border-amber-500/50 animate-bounce">
      <WifiOff className="w-4 h-4 text-white" />
      <span>وضع عدم الاتصال — يتم استخدام البيانات المحفوظة محلياً</span>
    </div>
  );
}
