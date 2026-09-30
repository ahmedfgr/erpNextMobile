'use client';

import React from 'react';
import { Database, Truck, Users } from 'lucide-react';
import { MainNavTab } from './Header';

interface BottomNavProps {
  currentTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  onShowNotification?: (msg: string) => void;
}

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-50 px-4 pointer-events-none flex justify-center">
      {/* Floating Pill Container with ERPNext Blue theme on active */}
      <nav className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-xl shadow-slate-900/10 p-1.5 flex items-center gap-1 sm:gap-2 max-w-sm sm:max-w-md w-full justify-between transition-all">
        {/* Tab 1: المخازن والوقود */}
        <button
          onClick={() => onTabChange('tanks')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full transition-all cursor-pointer select-none active:scale-95 ${
            currentTab === 'tanks'
              ? 'text-[#0089FF] bg-[#0089FF]/10 font-black border border-[#0089FF]/20 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-bold'
          }`}
        >
          <Database className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${currentTab === 'tanks' ? 'text-[#0089FF]' : 'text-slate-400'}`} />
          <span className="text-xs sm:text-sm">المخازن</span>
        </button>

        {/* Tab 2: الشاحنات والأسطول */}
        <button
          onClick={() => onTabChange('fleet')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full transition-all cursor-pointer select-none active:scale-95 ${
            currentTab === 'fleet'
              ? 'text-[#0089FF] bg-[#0089FF]/10 font-black border border-[#0089FF]/20 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-bold'
          }`}
        >
          <Truck className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${currentTab === 'fleet' ? 'text-[#0089FF]' : 'text-slate-400'}`} />
          <span className="text-xs sm:text-sm">الأسطول</span>
        </button>

        {/* Tab 3: السائقين والمشغلين */}
        <button
          onClick={() => onTabChange('drivers')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full transition-all cursor-pointer select-none active:scale-95 ${
            currentTab === 'drivers'
              ? 'text-[#0089FF] bg-[#0089FF]/10 font-black border border-[#0089FF]/20 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-bold'
          }`}
        >
          <Users className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${currentTab === 'drivers' ? 'text-[#0089FF]' : 'text-slate-400'}`} />
          <span className="text-xs sm:text-sm">السائقين</span>
        </button>
      </nav>
    </div>
  );
}
