'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MonthPicker } from '../atoms/MonthPicker';

interface CostSummaryHeaderProps {
  selectedMonth: string;
  onMonthChange: (monthId: string) => void;
  onBack: () => void;
}

export function CostSummaryHeader({
  selectedMonth,
  onMonthChange,
  onBack,
}: CostSummaryHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 mb-2">
      {/* Return button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200/90 shadow-2xs transition-all active:scale-95 cursor-pointer"
        title="العودة لإدارة الأسطول"
      >
        <ArrowRight className="w-4 h-4 text-slate-700" />
        <span>العودة للأسطول</span>
      </button>

      {/* Month Selector */}
      <MonthPicker selectedMonth={selectedMonth} onChange={onMonthChange} />
    </div>
  );
}
