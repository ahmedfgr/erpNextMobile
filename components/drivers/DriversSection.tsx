'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Search, CheckCircle2, Clock, Calendar, AlertCircle } from 'lucide-react';
import { DriverInfo, Vehicle } from '@/types/fleet';
import { DriverCard } from './DriverCard';

interface DriversSectionProps {
  drivers: DriverInfo[];
  vehicles: Vehicle[];
  onOpenAddDriver: () => void;
  onCallDriver: (driver: DriverInfo) => void;
  onSelectVehicle: (vehicleId: string) => void;
}

export function DriversSection({
  drivers,
  onOpenAddDriver,
  onCallDriver,
  onSelectVehicle,
}: DriversSectionProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'on_mission' | 'on_leave'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalDrivers = drivers.length;
  const availableDrivers = drivers.filter((d) => d.status === 'available').length;
  const onMissionDrivers = drivers.filter((d) => d.status === 'on_mission').length;
  const onLeaveDrivers = drivers.filter((d) => d.status === 'on_leave').length;

  const filteredDrivers = drivers.filter((d) => {
    const matchesStatus = filterStatus === 'all' || d.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q) ||
      d.phone.includes(q) ||
      d.licenseNumber.toLowerCase().includes(q) ||
      (d.assignedVehicleName && d.assignedVehicleName.toLowerCase().includes(q)) ||
      (d.assignedVehiclePlate && d.assignedVehiclePlate.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* 4 KPI Metrics for Drivers */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[145px] sm:h-[155px]">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              طاقم التشغيل
            </span>
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">إجمالي السائقين</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-3xl font-black text-slate-900">{totalDrivers}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold">سائق معتمد</span>
            </div>
          </div>
        </div>

        <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[145px] sm:h-[155px]">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              متاح للتحرك
            </span>
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">على رأس العمل</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-3xl font-black text-emerald-600">{availableDrivers}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold">سائق متاح</span>
            </div>
          </div>
        </div>

        <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[145px] sm:h-[155px]">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
              مأموريات نشطة
            </span>
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">في مأمورية ميدانية</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-3xl font-black text-sky-600">{onMissionDrivers}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold">على الطريق</span>
            </div>
          </div>
        </div>

        <div className="kpi-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between min-h-[145px] sm:h-[155px]">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
              إجازات رسمية
            </span>
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block mb-0.5">سائقون في إجازة</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-3xl font-black text-amber-600">{onLeaveDrivers}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold">سائق</span>
            </div>
          </div>
        </div>
      </section>

      {/* Control Header & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              إدارة السائقين والمشغلين الميدانيين
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              متابعة السائقين، رخص القيادة، وتعيين الشاحنات والمركبات المخصصة
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddDriver}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>إضافة سائق جديد</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'كافة السائقين' },
            { id: 'available', label: 'المتاحين للعمل' },
            { id: 'on_mission', label: 'في مأمورية' },
            { id: 'on_leave', label: 'في إجازة' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as typeof filterStatus)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم، الرخصة، أو لوحة الشاحنة..."
            className="w-full bg-white text-xs font-semibold text-slate-800 placeholder-slate-400 pr-9 pl-3 py-1.5 rounded-full border border-slate-200 focus:outline-none focus:border-slate-400 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Drivers Cards Grid */}
      {filteredDrivers.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-600">لا يوجد سائقون مطابقون لمعايير البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {filteredDrivers.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onCallDriver={onCallDriver}
              onSelectVehicle={onSelectVehicle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
