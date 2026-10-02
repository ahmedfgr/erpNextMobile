'use client';

import React from 'react';

interface CurrencyDisplayProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colorClass?: string;
  showCurrency?: boolean;
}

export function CurrencyDisplay({
  amount,
  size = 'md',
  colorClass = 'text-slate-900',
  showCurrency = true,
}: CurrencyDisplayProps) {
  const sizeClasses = {
    sm: 'text-xs sm:text-sm font-bold',
    md: 'text-sm sm:text-base font-black',
    lg: 'text-lg sm:text-xl font-black',
    xl: 'text-2xl sm:text-3xl font-black',
  };

  return (
    <span className={`inline-flex items-baseline gap-1 ${sizeClasses[size]} ${colorClass}`}>
      <span>{amount.toLocaleString('ar-SA')}</span>
      {showCurrency && (
        <span className="text-[10px] sm:text-xs font-bold text-slate-400">ر.س</span>
      )}
    </span>
  );
}
