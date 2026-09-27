'use client';

import React from 'react';
import { Users, Factory, Calculator } from 'lucide-react';

interface BottomNavProps {
  onShowNotification: (msg: string) => void;
}

export function BottomNav({ onShowNotification }: BottomNavProps) {
  const navItems = [
    {
      name: 'الموارد البشرية',
      icon: Users,
    },
    {
      name: 'التصنيع',
      icon: Factory,
    },
    {
      name: 'المحاسبة',
      icon: Calculator,
    },
  ];

  return (
    <div className="fixed bottom-3 sm:bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav
        className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[50px] border border-slate-200/80 shadow-lg shadow-slate-200/50 px-2 sm:px-3 py-1.5 flex items-center gap-1 sm:gap-2 transition-all"
        aria-label="شريط التنقل السفلي"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => onShowNotification(`الانتقال إلى قسم: ${item.name}`)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
