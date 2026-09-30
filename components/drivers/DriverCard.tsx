'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, UserX } from 'lucide-react';
import { DriverInfo } from '@/types/fleet';
import { BrandLogo } from '@/components/fleet/BrandLogo';

interface DriverCardProps {
  driver: DriverInfo;
  onCallDriver: (driver: DriverInfo) => void;
  onSelectVehicle?: (vehicleId: string) => void;
}

export function DriverCard({ driver, onCallDriver, onSelectVehicle }: DriverCardProps) {
  // Status Badge: Floating circular dot followed by text in the exact same color, with no bounding container or background
  const getStatusBadge = () => {
    switch (driver.status) {
      case 'available':
        return (
          <div className="flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold text-emerald-600">متاح للعمل</span>
          </div>
        );
      case 'on_mission':
        return (
          <div className="flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span className="text-xs font-bold text-sky-600">في مأمورية</span>
          </div>
        );
      case 'on_leave':
        return (
          <div className="flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-xs font-bold text-amber-600">في إجازة</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: Avatar & Name & Floating Status */}
        <div className="flex items-start justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 shadow-xs shrink-0">
              <Image
                src={driver.avatarUrl}
                alt={driver.name}
                fill
                sizes="48px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 line-clamp-1">
                {driver.name}
              </h3>
              <p className="text-[11px] font-semibold text-slate-400">
                رخصة قيادة: <span className="font-bold text-slate-600">{driver.licenseNumber}</span>
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Assigned Vehicle Component: Brand Logo, Truck Name Only, Plate Number */}
        <div className="bg-slate-50/90 rounded-2xl p-3 border border-slate-100/90 mb-3.5">
          <span className="text-[10px] font-bold text-slate-400 block mb-1.5">
            المركبة أو الشاحنة المخصصة:
          </span>

          {driver.assignedVehicleName ? (
            <div
              onClick={() => driver.assignedVehicleId && onSelectVehicle && onSelectVehicle(driver.assignedVehicleId)}
              className="flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-100/90 p-2 rounded-xl transition-all border border-slate-100"
            >
              {/* Manufacturer Brand Logo and Clean Vehicle Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center p-1.5 shrink-0 shadow-2xs border border-slate-800">
                  <BrandLogo brandKey={driver.assignedVehicleBrandKey || 'mercedes'} size={18} />
                </div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                  {driver.assignedVehicleName}
                </h4>
              </div>

              {/* Preserved Metallic License Plate */}
              {driver.assignedVehiclePlate && (
                <span className="text-[11px] font-black text-slate-800 bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 px-2 py-0.5 rounded-md shadow-2xs shrink-0 tracking-wider">
                  {driver.assignedVehiclePlate}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold py-1 px-1">
              <UserX className="w-4 h-4 text-slate-300" />
              <span>لا توجد شاحنة مخصصة حالياً (سائق احتياطي)</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Contact & Call Action */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <span className="text-xs font-semibold text-slate-600 truncate" dir="ltr">
          {driver.phone}
        </span>

        {/* Call Driver Button */}
        <button
          onClick={() => onCallDriver(driver)}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-black border border-[#0089FF]/40 hover:border-[#0089FF] transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <div className="w-5 h-5 rounded-full bg-[#0089FF]/10 flex items-center justify-center shrink-0">
            <Phone className="w-3 h-3 text-[#0089FF]" />
          </div>
          <span className="text-slate-900 text-xs font-black">اتصال بالسائق</span>
        </button>
      </div>
    </div>
  );
}
