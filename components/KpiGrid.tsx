'use client';

import React from 'react';

interface KpiGridProps {
  onShowNotification: (msg: string) => void;
}

export function KpiGrid({ onShowNotification }: KpiGridProps) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
      {/* Card 1: إجمالي الوقود */}
      <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[155px] sm:h-[165px] relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#eff1fe] flex items-center justify-center text-[#5856d6] shadow-sm">
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17"></path>
              <path d="M13 10h4a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9l-3-3"></path>
              <line x1="7" y1="7" x2="9" y2="7"></line>
            </svg>
          </div>
          <span className="text-[#059669] font-bold flex items-center gap-0.5 text-[10px] sm:text-xs bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-100 [direction:ltr]">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#059669]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            +12%
          </span>
        </div>

        <div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">إجمالي مخزون الوقود</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">124,500</span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-bold">لتر</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 sm:h-1.5 mt-1.5 sm:mt-2 overflow-hidden">
            <div className="bg-indigo-600 h-1 sm:h-1.5 rounded-full transition-all duration-700" style={{ width: '72%' }}></div>
          </div>
        </div>
      </div>

      {/* Card 2: إجمالي المواد */}
      <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[155px] sm:h-[165px] relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#f0f3fa] flex items-center justify-center text-[#435370] shadow-sm">
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          {/* Mini Yellow Chart */}
          <div className="flex items-end gap-0.5 sm:gap-1 h-3.5 sm:h-4">
            <div className="w-1 bg-[#fbbf24] h-2 rounded-full"></div>
            <div className="w-1 bg-[#fbbf24] h-2.5 sm:h-3 rounded-full"></div>
            <div className="w-1 bg-[#f59e0b] h-3.5 sm:h-4 rounded-full"></div>
            <div className="w-1 bg-[#d97706] h-4 sm:h-5 rounded-full"></div>
          </div>
        </div>

        <div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">إجمالي المواد والقطع</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">320</span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-bold">صنف</span>
          </div>
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-1.5 sm:mt-2">
            <span className="hidden xs:inline">14 قسم</span>
            <span className="text-emerald-600 font-bold">98% متوفر</span>
          </div>
        </div>
      </div>

      {/* Card 3: عدد المستودعات */}
      <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[155px] sm:h-[165px] relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#fff2eb] flex items-center justify-center text-[#ea580c] shadow-sm">
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          {/* Mini Purple Chart */}
          <div className="flex items-end gap-0.5 sm:gap-1 h-3.5 sm:h-4">
            <div className="w-1 bg-[#c4b5fd] h-2 rounded-full"></div>
            <div className="w-1 bg-[#a78bfa] h-2.5 sm:h-3 rounded-full"></div>
            <div className="w-1 bg-[#8b5cf6] h-3.5 sm:h-4 rounded-full"></div>
            <div className="w-1 bg-[#7c3aed] h-4 sm:h-5 rounded-full"></div>
          </div>
        </div>

        <div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">عدد المستودعات</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">5</span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-bold">مواقع</span>
          </div>
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-1.5 sm:mt-2">
            <span>متصلة بالشبكة</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>
      </div>

      {/* Card 4: أصناف منخفضة */}
      <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[155px] sm:h-[165px] relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#fee8e8] flex items-center justify-center text-[#e11d48] shadow-sm">
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          {/* Mini Red Chart */}
          <div className="flex items-end gap-0.5 sm:gap-1 h-3.5 sm:h-4">
            <div className="w-1 bg-[#fca5a5] h-2 rounded-full"></div>
            <div className="w-1 bg-[#f87171] h-2.5 sm:h-3.5 rounded-full"></div>
            <div className="w-1 bg-[#ef4444] h-3.5 sm:h-4 rounded-full"></div>
            <div className="w-1 bg-[#dc2626] h-4 sm:h-5 rounded-full"></div>
          </div>
        </div>

        <div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">أصناف منخفضة</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-rose-600 tracking-tight">3</span>
            <span className="text-[10px] sm:text-xs text-rose-500 font-bold">تنبيه</span>
          </div>
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-1.5 sm:mt-2">
            <span>إعادة طلب</span>
            <button
              onClick={() => onShowNotification('تم إرسال إشعار طلب التوريد للموردين')}
              className="text-rose-600 hover:underline font-bold cursor-pointer"
            >
              توريد ←
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
