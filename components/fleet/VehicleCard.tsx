'use client';

import React from 'react';
import Image from 'next/image';
import { Fuel, Gauge, User, Calendar, CreditCard, FileText, Truck } from 'lucide-react';
import { Vehicle, WeightCategory } from '@/types/fleet';
import { BrandLogo } from './BrandLogo';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  const fuelPct = Math.round((vehicle.currentFuelLiters / vehicle.fuelCapacityLiters) * 100);

  // Status Styling: A floating circular dot followed by text in the exact same color, with no bounding container or background
  const getStatusBadge = () => {
    switch (vehicle.status) {
      case 'available':
        return (
          <div className="flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold text-emerald-600">جاهزة ومتاحة</span>
          </div>
        );
      case 'on_mission':
        return (
          <div className="flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span className="text-xs font-bold text-sky-600">في مأمورية</span>
          </div>
        );
      case 'maintenance':
        return (
          <div className="flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-bold text-amber-600">في الصيانة</span>
          </div>
        );
    }
  };

  // Weight Category Badge: Truck icon + weight text with ERPNext blue theme (#0089FF)
  const getWeightBadge = (weight: WeightCategory) => {
    const label =
      weight === 'heavy'
        ? 'مركبة ثقيلة'
        : weight === 'medium'
        ? 'مركبة متوسطة'
        : 'مركبة خفيفة';

    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#0089FF] bg-[#0089FF]/10 px-2.5 py-0.5 rounded-full border border-[#0089FF]/25 shadow-2xs">
        <Truck className="w-3.5 h-3.5 text-[#0089FF]" />
        <span>{label}</span>
      </span>
    );
  };

  const getFuelColor = (pct: number) => {
    if (pct <= 25) return 'bg-rose-500';
    if (pct <= 50) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className="tank-card bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer group"
    >
      <div>
        {/* Top Weight (ERPNext Blue with Truck icon) & Status Bar (Dot + "في الصيانة") */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {getWeightBadge(vehicle.weightCategory || 'heavy')}
          {getStatusBadge()}
        </div>

        {/* Brand Logo & Clean Name Header (ID completely hidden) */}
        <div className="flex items-center gap-3 mb-3.5">
          {/* Official Manufacturer Brand Logo */}
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center p-2 shadow-sm shrink-0 border border-slate-800 group-hover:scale-105 transition-transform">
            <BrandLogo brandKey={vehicle.brandKey || 'mercedes'} size={28} />
          </div>

          {/* Clean Name (e.g. Volvo FH16 / Mercedes-Benz Actros 3340) */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-black text-slate-900 line-clamp-1 group-hover:text-[#0089FF] transition-colors">
              {vehicle.name}
            </h3>
            <p className="text-[11px] font-semibold text-slate-400 truncate">
              {vehicle.brand}
            </p>
          </div>
        </div>

        {/* Fuel Gauge Bar */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3">
          <div className="flex justify-between items-center text-xs font-semibold mb-1">
            <span className="flex items-center gap-1 text-slate-600">
              <Fuel className="w-3.5 h-3.5 text-slate-400" />
              مستوى الوقود ({vehicle.fuelType})
            </span>
            <span className="font-extrabold text-slate-900">{fuelPct}%</span>
          </div>
          <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${getFuelColor(fuelPct)}`}
              style={{ width: `${fuelPct}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mt-1">
            <span>{vehicle.currentFuelLiters} لتر</span>
            <span>السعة: {vehicle.fuelCapacityLiters} لتر</span>
          </div>
        </div>

        {/* 4 Small Spec Components: Odometer, Max Load, Model Year, Plate Number */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-700 mb-3">
          {/* 1. Odometer */}
          <div className="flex items-center gap-1.5 bg-slate-50/90 p-2 rounded-xl border border-slate-100">
            <Gauge className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{vehicle.odometerKm.toLocaleString()} كم</span>
          </div>

          {/* 2. Max Load */}
          <div className="flex items-center gap-1.5 bg-slate-50/90 p-2 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold shrink-0">الحمولة:</span>
            <span className="truncate">{vehicle.maxLoadTon} طن</span>
          </div>

          {/* 3. Model Year */}
          <div className="flex items-center gap-1.5 bg-slate-50/90 p-2 rounded-xl border border-slate-100">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[10px] text-slate-400 font-bold">موديل:</span>
            <span>{vehicle.modelYear}</span>
          </div>

          {/* 4. License Plate */}
          <div className="flex items-center gap-1.5 bg-slate-50/90 p-2 rounded-xl border border-slate-100">
            <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[10px] font-black text-slate-800 bg-slate-200/90 px-1.5 py-0.5 rounded border border-slate-300 shadow-2xs truncate">
              {vehicle.plateNumber}
            </span>
          </div>
        </div>

        {/* Dedicated Description Space Under The Small Components */}
        <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100/90 mb-3 text-right">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 mb-0.5">
            <FileText className="w-3 h-3 text-slate-400" />
            <span>الوصف:</span>
          </div>
          <p className="text-[11px] font-semibold text-slate-600 line-clamp-2 leading-relaxed">
            {vehicle.description || 'لا يوجد وصف تفصيلي مسجل للمركبة.'}
          </p>
        </div>
      </div>

      {/* Driver & Action Footer */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        {vehicle.driver ? (
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
              <Image
                src={vehicle.driver.avatarUrl}
                alt={vehicle.driver.name}
                fill
                sizes="24px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[11px] font-bold text-slate-700 truncate max-w-[130px]">
              {vehicle.driver.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-bold">
            <User className="w-3 h-3 text-slate-300" />
            <span>سائق غير معين</span>
          </div>
        )}

        <span className="text-[11px] font-extrabold text-slate-900 group-hover:text-[#0089FF] transition-colors flex items-center gap-0.5 shrink-0">
          تفاصيل الشاحنة ←
        </span>
      </div>
    </div>
  );
}
