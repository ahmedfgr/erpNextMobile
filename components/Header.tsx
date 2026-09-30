'use client';

import React from 'react';
import Image from 'next/image';
import { LogOut, Building2 } from 'lucide-react';

export type MainNavTab = 'tanks' | 'fleet' | 'drivers';

interface HeaderProps {
  currentTab?: MainNavTab;
  onTabChange?: (tab: MainNavTab) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onShowNotification?: (msg: string) => void;
}

export function Header({ onShowNotification }: HeaderProps) {
  const handleLogout = () => {
    if (onShowNotification) {
      onShowNotification('تم تسجيل الخروج بنجاح من حساب فهد (شركة فال)');
    }
  };

  return (
    <header className="sticky top-2 sm:top-3 z-40 px-3 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-[50px] border border-slate-200/80 shadow-sm px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
        {/* Company Identity: FAAL | شركة فال */}
        <div className="flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs">
            <Building2 className="w-4 h-4 text-[#0089FF]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              FAAL
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-500">
              شركة فال
            </span>
          </div>
        </div>

        {/* User Profile & Logout Action */}
        <div className="flex items-center gap-3">
          {/* User Profile Pill */}
          <div
            onClick={() => onShowNotification && onShowNotification('المستخدم الحالي: فهد')}
            className="flex items-center gap-2 cursor-pointer group hover:opacity-90 transition-opacity"
          >
            <span className="text-xs sm:text-sm font-black text-slate-800">
              فهد
            </span>
            <div className="relative">
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden shadow-xs border border-slate-200 bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Profile"
                  fill
                  sizes="34px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 bg-[#0089FF] rounded-full ring-2 ring-white"></span>
            </div>
          </div>

          <div className="w-px h-5 bg-slate-200"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="تسجيل الخروج"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-all cursor-pointer active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تسجيل خروج</span>
          </button>
        </div>
      </div>
    </header>
  );
}
