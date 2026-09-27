'use client';

import React, { useState } from 'react';
import { Tank, TankCategory } from '@/types/tank';
import { TANKS_DATA } from '@/data/tanks-data';
import { Header } from '@/components/Header';
import { PageHeader } from '@/components/PageHeader';
import { KpiGrid } from '@/components/KpiGrid';
import { FuelSection } from '@/components/FuelSection';
import { OperationsTable } from '@/components/OperationsTable';
import { TankModal } from '@/components/TankModal';
import { ToastNotification } from '@/components/ToastNotification';
import { BottomNav } from '@/components/BottomNav';
import { OfflineIndicator } from '@/components/OfflineIndicator';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TankCategory>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal State
  const [activeModalTank, setActiveModalTank] = useState<Tank | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
    showNotification('جاري مزامنة مؤشرات الخزانات والضغط...');
  };

  const filteredTanks = TANKS_DATA.filter((tank) => {
    const matchesCategory = selectedCategory === 'all' || tank.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      tank.name.toLowerCase().includes(q) ||
      tank.id.toLowerCase().includes(q) ||
      tank.type.toLowerCase().includes(q) ||
      tank.subTitle.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Header Navigation */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onShowNotification={showNotification}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 sm:pb-24 space-y-6">
        {/* Page Title & Controls */}
        <PageHeader
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />

        {/* 4 KPI Metrics Cards */}
        <KpiGrid onShowNotification={showNotification} />

        {/* Fuel Tanks Section */}
        <FuelSection
          tanks={filteredTanks}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectTank={setActiveModalTank}
        />

        {/* Recent Operations & Inventory Log */}
        <OperationsTable onShowNotification={showNotification} />
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav onShowNotification={showNotification} />

      {/* Sensor / Tank Details Modal */}
      <TankModal
        tank={activeModalTank}
        onClose={() => setActiveModalTank(null)}
        onShowNotification={showNotification}
      />

      {/* Toast Notification Alert */}
      <ToastNotification message={toastMessage} />

      {/* Offline Status Warning Banner */}
      <OfflineIndicator />
    </div>
  );
}
