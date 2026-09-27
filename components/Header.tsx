'use client';

import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onShowNotification: (msg: string) => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  onShowNotification,
}: HeaderProps) {
  return (
    <header className="sticky top-2 sm:top-3 z-40 px-3 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-[50px] border border-slate-200/80 shadow-md shadow-slate-200/40 px-3.5 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between gap-3">
        {/* Brand & Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <button
            onClick={() => onShowNotification('تم تفعيل القائمة الجانبية للشاشات الصغيرة')}
            className="lg:hidden p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200/60 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
              <line x1="4" y1="7" x2="20" y2="7"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="17" x2="20" y2="17"></line>
            </svg>
          </button>

          {/* Brand Logo: NAFA */}
          <div className="flex items-center space-x-1 space-x-reverse font-black tracking-wider text-xl text-[#101b33] select-none">
            <span className="font-extrabold font-sans">N</span>
            <div className="relative font-sans font-extrabold">
              <span>A</span>
              <span className="absolute top-[2px] left-[4px] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-[#f97316]"></span>
            </div>
            <span className="font-extrabold font-sans">F</span>
            <div className="relative font-sans font-extrabold">
              <span>A</span>
              <span className="absolute top-[2px] left-[4px] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-[#f97316]"></span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 mr-4">
            <button className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white transition-colors cursor-pointer">
              المخازن والوقود
            </button>
            <button
              onClick={() => onShowNotification('الانتقال إلى حركات التوريد')}
              className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              حركات التوريد
            </button>
            <button
              onClick={() => onShowNotification('الانتقال إلى سجل الصرف')}
              className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              سجل الصرف
            </button>
            <button
              onClick={() => onShowNotification('الانتقال إلى التقارير التحليلية')}
              className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              التقارير التحليلية
            </button>
          </nav>
        </div>

        {/* Header Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-1 justify-end max-w-md">
          {/* Live Search Field */}
          <div className="relative w-full max-w-xs hidden sm:block">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="بحث عن خزان، مادة، كود..."
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 pr-9 pl-3 py-1.5 rounded-full text-xs font-semibold border border-transparent focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all text-right"
            />
          </div>

          {/* Quick Action: Export / Print */}
          <button
            onClick={() => onShowNotification('تم إعداد التقرير اليومي وتجهيزه للتحميل')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-full border border-slate-200 transition-colors shadow-sm cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>تصدير التقرير</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => onShowNotification('3 تنبيهات دورية: مستوى خزان F-002 يتطلب جدولة توريد')}
              className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all border border-slate-200/80 cursor-pointer"
              title="التنبيهات"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#ef4444] rounded-full ring-2 ring-white"></span>
          </div>

          {/* User Profile Pill */}
          <div
            onClick={() => onShowNotification('المستخدم النشط: م. أحمد الغامدي (مشرف عام)')}
            className="flex items-center gap-2 pl-0.5 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm border border-slate-200 relative bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="User Profile"
                  fill
                  sizes="32px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 bg-[#10b981] rounded-full ring-2 ring-white"></span>
            </div>
            <div className="hidden xl:block text-right">
              <p className="text-xs font-bold text-slate-900 leading-tight">م. أحمد الغامدي</p>
              <p className="text-[10px] text-slate-400 font-semibold">مدير تشغيل المستودعات</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
