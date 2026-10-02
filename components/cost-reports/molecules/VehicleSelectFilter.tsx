'use client';

import React from 'react';
import { Truck } from 'lucide-react';
import { Vehicle } from '@/types/fleet';
import { BrandLogo } from '@/components/fleet/BrandLogo';

interface VehicleSelectFilterProps {
  vehicles: Vehicle[];
  selectedVehicleId: string; // 'all' or vehicle id
  onSelectVehicle: (vehicleId: string) => void;
}

export function VehicleSelectFilter({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
}: VehicleSelectFilterProps) {
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Visual Identity & Selected Truck Badge */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center p-2 shrink-0 border border-slate-800 shadow-2xs">
          {selectedVehicle ? (
            <BrandLogo brandKey={selectedVehicle.brandKey} size={22} />
          ) : (
            <Truck className="w-5 h-5 text-[#0089FF]" />
          )}
        </div>

        <div>
          <span className="text-[11px] font-bold text-slate-400 block">تصفية بحسب الشاحنة</span>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black text-slate-900">
              {selectedVehicle ? selectedVehicle.name : 'الأسطول'}
            </h4>
            {selectedVehicle && (
              <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {selectedVehicle.plateNumber}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modern Filter Dropdown (حذف النص المطلوب) */}
      <div className="flex items-center gap-2 self-stretch sm:self-auto">
        <div className="relative w-full sm:w-64">
          <select
            value={selectedVehicleId}
            onChange={(e) => onSelectVehicle(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/90 text-slate-800 text-xs sm:text-sm font-bold py-2.5 px-3 rounded-xl border border-slate-200/90 shadow-2xs outline-none cursor-pointer transition-all appearance-none pr-3 pl-8 focus:border-[#0089FF] focus:bg-white"
          >
            <option value="all">
              الأسطول ({vehicles.length})
            </option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} - ({v.plateNumber})
              </option>
            ))}
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
            ▼
          </div>
        </div>

        {selectedVehicleId !== 'all' && (
          <button
            onClick={() => onSelectVehicle('all')}
            className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer shrink-0"
            title="إلغاء التصفية"
          >
            إلغاء
          </button>
        )}
      </div>
    </div>
  );
}
