'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface MonthPickerProps {
  selectedMonth: string;
  onChange: (monthId: string) => void;
}

export function MonthPicker({ selectedMonth, onChange }: MonthPickerProps) {
  const months = [
    { id: '2026-09', label: 'سبتمبر 2026' },
    { id: '2026-08', label: 'أغسطس 2026' },
    { id: '2026-07', label: 'يوليو 2026' },
  ];

  return (
    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs">
      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
      <select
        value={selectedMonth}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 outline-none cursor-pointer"
      >
        {months.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
