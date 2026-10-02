'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { CurrencyDisplay } from '../atoms/CurrencyDisplay';
import { CostBadge } from '../atoms/CostBadge';

interface MonthlyCostMetricCardProps {
  title: string;
  amount: number;
  badgeType: 'fuel' | 'maintenance' | 'total';
  badgeLabel?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  secondaryText: string;
  percentage?: number;
}

export function MonthlyCostMetricCard({
  title,
  amount,
  badgeType,
  badgeLabel,
  icon: Icon,
  iconBg,
  iconColor,
  secondaryText,
  percentage,
}: MonthlyCostMetricCardProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between min-h-[145px]">
      <div className="flex items-start justify-between gap-2">
        <div className={`w-10 h-10 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
          <Icon className="w-5 h-5" />
        </div>
        <CostBadge type={badgeType} label={badgeLabel} />
      </div>

      <div className="mt-3">
        <span className="text-xs font-semibold text-slate-500 block mb-1">{title}</span>
        <div className="flex items-baseline justify-between gap-2">
          <CurrencyDisplay amount={amount} size="xl" />
          {percentage !== undefined && (
            <span className="text-xs font-black text-slate-400">
              {percentage}% من الإجمالي
            </span>
          )}
        </div>
        <p className="text-[11px] font-bold text-slate-400 mt-1">{secondaryText}</p>
      </div>
    </div>
  );
}
