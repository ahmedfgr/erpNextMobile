'use client';

import React from 'react';

interface PageHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function PageHeader({
  isRefreshing,
  onRefresh,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center gap-2.5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">المخازن والمستودعات</h1>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200">
          مباشر • Live
        </span>
      </div>

      <button
        onClick={onRefresh}
        title="تحديث البيانات"
        className={`p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 active:scale-95 transition-all cursor-pointer ${
          isRefreshing ? 'rotate-180 duration-500' : ''
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  );
}
