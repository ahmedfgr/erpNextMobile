'use client';

import React, { useState } from 'react';
import { Truck, Plus, Send, Search, Filter } from 'lucide-react';
import { Vehicle, VehicleType } from '@/types/fleet';
import { VehicleCard } from './VehicleCard';

interface FleetSectionProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenAddVehicle: () => void;
  onOpenCreateMission: () => void;
}

export function FleetSection({
  vehicles,
  onSelectVehicle,
  onOpenAddVehicle,
  onOpenCreateMission,
}: FleetSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | VehicleType>('all');
  const [fleetSearch, setFleetSearch] = useState('');

  const filterTabs: { id: 'all' | VehicleType; label: string }[] = [
    { id: 'all', label: 'كافة المركبات' },
    { id: 'heavy_truck', label: 'شاحنات ثقيلة' },
    { id: 'fuel_tanker', label: 'صهاريج الوقود' },
    { id: 'equipment', label: 'آليات ومعدات' },
    { id: 'service_car', label: 'سيارات الخدمة' },
  ];

  const filtered = vehicles.filter((v) => {
    const matchesType = activeFilter === 'all' || v.type === activeFilter;
    const q = fleetSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.code.toLowerCase().includes(q) ||
      v.plateNumber.toLowerCase().includes(q) ||
      v.brand.toLowerCase().includes(q) ||
      (v.driver && v.driver.name.toLowerCase().includes(q));

    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Section Header Controls & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              أسطول الشاحنات والآليات الميدانية
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              متابعة الوقود، الرحلات، المأموريات، وطلبات صيانة الأسطول
            </p>
          </div>
        </div>

        {/* Action Buttons: Add Vehicle & Create Mission */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCreateMission}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>تصريح مأمورية</span>
          </button>

          <button
            onClick={onOpenAddVehicle}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة شاحنة</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={fleetSearch}
            onChange={(e) => setFleetSearch(e.target.value)}
            placeholder="بحث عن شاحنة، لوحة، سائق..."
            className="w-full bg-white text-xs font-semibold text-slate-800 placeholder-slate-400 pr-9 pl-3 py-1.5 rounded-full border border-slate-200 focus:outline-none focus:border-slate-400 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Vehicles Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
          <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-600">لا توجد مركبات مطابقة لمعايير البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
