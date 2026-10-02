'use client';

import React from 'react';

interface CostBadgeProps {
  type: 'fuel' | 'maintenance' | 'total';
  label?: string;
}

export function CostBadge({ type, label }: CostBadgeProps) {
  const configs = {
    fuel: {
      defaultLabel: 'وقود ومحروقات',
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    },
    maintenance: {
      defaultLabel: 'صيانة وقطع غيار',
      classes: 'bg-amber-50 text-amber-700 border-amber-200/80',
    },
    total: {
      defaultLabel: 'إجمالي التكاليف',
      classes: 'bg-blue-50 text-[#0089FF] border-blue-200/80',
    },
  };

  const config = configs[type];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black border ${config.classes}`}
    >
      {label || config.defaultLabel}
    </span>
  );
}
