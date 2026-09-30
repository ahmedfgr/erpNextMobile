'use client';

import React from 'react';
import { MainNavTab } from './Header';

interface PageHeaderProps {
  currentTab?: MainNavTab;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export function PageHeader({
  currentTab = 'tanks',
}: PageHeaderProps) {
  // Title only based on the active tab
  const pageTitles: Record<MainNavTab, string> = {
    tanks: 'المخازن والمستودعات',
    fleet: 'إدارة الأسطول والشاحنات',
    drivers: 'إدارة السائقين وكادر العمل',
  };

  const title = pageTitles[currentTab] || 'المخازن والمستودعات';

  return (
    // Clean, minimalistic header: Title only, no icons, no live dot, no subtitle, no refresh button
    <div className="py-2.5 px-1">
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        {title}
      </h1>
    </div>
  );
}
