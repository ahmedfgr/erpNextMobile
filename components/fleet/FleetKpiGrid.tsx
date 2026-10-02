'use client';

import React from 'react';
import { Truck, Navigation, Wrench, Fuel } from 'lucide-react';
import { Vehicle } from '@/types/fleet';

interface FleetKpiGridProps {
  vehicles: Vehicle[];
  onOpenCostReport?: () => void;
}

export function FleetKpiGrid({ vehicles, onOpenCostReport }: FleetKpiGridProps) {
  const totalVehicles = vehicles.length;
  const onMission = vehicles.filter((v) => v.status === 'on_mission').length;
  const inMaintenance = vehicles.filter((v) => v.status === 'maintenance').length;
  const totalFuelLiters = vehicles.reduce((sum, v) => sum + v.currentFuelLiters, 0);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
      {/* 1: إجمالي الأسطول */}
      <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[155px] sm:h-[165px] relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#eff1fe] flex items-center justify-center text-[#5856d6] shadow-sm">
            <Truck className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[#059669] font-bold flex items-center gap-0.5 text-[10px] sm:text-xs bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-100">
            جاهزية 85%
          </span>
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">إجمالي الشاحنات والآليات</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">{totalVehicles}</span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-bold">مركبة مسجلة</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1 sm:h-1.5 mt-1.5 sm:mt-2 overflow-hidden">
            <div className="bg-indigo-600 h-1 sm:h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      {/* 2: في مأمورية */}
      <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[155px] sm:h-[165px] relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shadow-sm">
            <Navigation className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <span className="text-sky-700 font-bold flex items-center gap-1 text-[10px] sm:text-xs bg-sky-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-sky-100">
            نشط الآن
          </span>
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">في مأموريات ورحلات</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-sky-700 tracking-tight">{onMission}</span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-bold">على الطريق</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-1.5 sm:mt-2">
            متابعة بنظام GPS الحي
          </p>
        </div>
      </div>

      {/* 3: في الصيانة */}
      <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[155px] sm:h-[165px] relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#fff2eb] flex items-center justify-center text-[#ea580c] shadow-sm">
            <Wrench className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <span className="text-amber-700 font-bold text-[10px] sm:text-xs bg-amber-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-100">
            تحت الإصلاح
          </span>
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">في ورشة الصيانة</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-amber-600 tracking-tight">{inMaintenance}</span>
            <span className="text-[10px] sm:text-xs text-amber-500 font-bold">شاحنة</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-1.5 sm:mt-2">
            بانتظار صرف قطع الغيار
          </p>
        </div>
      </div>

      {/* 4: وقود الأسطول - ينقل لتقرير التكاليف */}
      <div
        onClick={onOpenCostReport}
        className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[155px] sm:h-[165px] relative overflow-hidden group cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all active:scale-[0.99]"
        title="انقر لعرض تقرير التكاليف الشهرية للوقود والصيانة"
      >
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#ecfdf5] flex items-center justify-center text-[#059669] shadow-sm group-hover:scale-105 transition-transform">
            <Fuel className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <span className="text-emerald-700 font-bold text-[10px] sm:text-xs bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            تقرير التكاليف ←
          </span>
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">الوقود بخزانات الأسطول</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">{totalFuelLiters.toLocaleString()}</span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-bold">لتر ديزل/بنزين</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-emerald-600 font-bold mt-1.5 sm:mt-2 flex items-center gap-1">
            <span>انقر لمراجعة تكاليف الوقود والصيانة</span>
          </p>
        </div>
      </div>
    </section>
  );
}
