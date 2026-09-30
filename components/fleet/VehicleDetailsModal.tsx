'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Fuel,
  Gauge,
  Calendar,
  Wrench,
  Navigation,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldAlert,
  Zap,
  Layers,
  FileText,
  CreditCard,
} from 'lucide-react';
import { Vehicle, WeightCategory } from '@/types/fleet';
import { RefuelModal } from './RefuelModal';
import { RequestMaintenanceModal } from './RequestMaintenanceModal';
import { BrandLogo } from './BrandLogo';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onRefuel: (vehicleId: string, tankId: string, liters: number) => void;
  onMaintenance: (
    vehicleId: string,
    issue: string,
    priority: 'low' | 'medium' | 'high' | 'critical',
    partsText: string
  ) => void;
}

export function VehicleDetailsModal({
  vehicle,
  onClose,
  onRefuel,
  onMaintenance,
}: VehicleDetailsModalProps) {
  const [showRefuel, setShowRefuel] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);

  if (!vehicle) return null;

  const fuelPct = Math.round((vehicle.currentFuelLiters / vehicle.fuelCapacityLiters) * 100);

  const getStatusBadge = () => {
    switch (vehicle.status) {
      case 'available':
        return (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            جاهزة ومتاحة
          </span>
        );
      case 'on_mission':
        return (
          <span className="flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            في مأمورية نشطة
          </span>
        );
      case 'maintenance':
        return (
          <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            في قسم الصيانة
          </span>
        );
    }
  };

  const getWeightBadge = (weight: WeightCategory) => {
    switch (weight) {
      case 'heavy':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
            <span>مركبة ثقيلة</span>
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>مركبة متوسطة</span>
          </span>
        );
      case 'light':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-black text-teal-900 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
            <Zap className="w-3.5 h-3.5 text-teal-600" />
            <span>مركبة خفيفة</span>
          </span>
        );
    }
  };

  return (
    <>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-right overflow-y-auto animate-in fade-in duration-200"
      >
        <div className="w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-100 relative my-8">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center p-2.5 shadow-md shrink-0 border border-slate-800">
                <BrandLogo brandKey={vehicle.brandKey || 'mercedes'} size={34} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-xl font-black text-slate-900">{vehicle.name}</h3>
                  {getWeightBadge(vehicle.weightCategory || 'heavy')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-800 bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 px-2 py-0.5 rounded-md shadow-2xs">
                    لوحة: {vehicle.plateNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{vehicle.brand} • موديل {vehicle.modelYear}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 my-4 text-right">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>الوصف والمهمة الرئيسية:</span>
            </div>
            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
              {vehicle.description || 'لا يوجد وصف مسجل'}
            </p>
          </div>

          {/* Quick Actions Row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setShowRefuel(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Fuel className="w-4 h-4" />
              <span>ملء وتعبئة وقود</span>
            </button>
            <button
              onClick={() => setShowMaintenance(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl text-xs font-black shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Wrench className="w-4 h-4" />
              <span>طلب صيانة وقطع غيار</span>
            </button>
          </div>

          {/* Technical Specs & Fuel Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {/* Fuel Details Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-emerald-600" />
                  حالة الوقود والنوع
                </span>
                <span className="text-xs font-extrabold text-emerald-700">{fuelPct}% ممتلئ</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${fuelPct}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-600 font-semibold pt-1">
                <span>الحالي: <strong>{vehicle.currentFuelLiters} لتر</strong></span>
                <span>السعة: <strong>{vehicle.fuelCapacityLiters} لتر</strong></span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>النوع: {vehicle.fuelType}</span>
                <span>الكفاءة: {vehicle.fuelEfficiencyKmPerLiter} كم/لتر</span>
              </div>
            </div>

            {/* Odometer & Service Info */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-slate-500" />
                  العداد والفحص الدوري
                </span>
                <span className="text-xs font-extrabold text-slate-900">{vehicle.odometerKm.toLocaleString()} كم</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">الحمولة القصوى:</span>
                  <span className="font-bold">{vehicle.maxLoadTon} طن</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">آخر صيانة:</span>
                  <span className="font-bold">{vehicle.lastServiceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الصيانة القادمة عند:</span>
                  <span className="font-bold text-amber-700">{vehicle.nextServiceKm.toLocaleString()} كم</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Driver Profile */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 mb-5">
            <h4 className="text-xs font-bold text-slate-700 mb-2">السائق المعتمد</h4>
            {vehicle.driver ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200">
                    <Image
                      src={vehicle.driver.avatarUrl}
                      alt={vehicle.driver.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">{vehicle.driver.name}</h5>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      رقم الرخصة: {vehicle.driver.licenseNumber} • هاتف: {vehicle.driver.phone}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  على رأس العمل
                </span>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-semibold">لم يتم تعيين سائق لهذه المركبة بعد.</p>
            )}
          </div>

          {/* Recent Missions & Trip History */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-sky-600" />
              آخر المأموريات والرحلات المعتمدة
            </h4>
            {vehicle.recentMissions.length === 0 ? (
              <p className="text-xs text-slate-400 font-semibold bg-slate-50 p-3 rounded-xl text-center">
                لا توجد مأموريات مسجلة حديثاً
              </p>
            ) : (
              <div className="space-y-2">
                {vehicle.recentMissions.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-black text-slate-900 block">{m.destination}</span>
                      <span className="text-slate-500 text-[11px]">{m.purpose} ({m.cargoWeightTon} طن)</span>
                    </div>
                    <div className="text-left">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          m.status === 'active'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {m.status === 'active' ? 'جارية الآن' : 'مكتملة'}
                      </span>
                      <div className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{m.departureDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-Modals */}
      {showRefuel && (
        <RefuelModal
          vehicle={vehicle}
          onClose={() => setShowRefuel(false)}
          onSubmitRefuel={onRefuel}
        />
      )}

      {showMaintenance && (
        <RequestMaintenanceModal
          vehicle={vehicle}
          onClose={() => setShowMaintenance(false)}
          onSubmitMaintenance={onMaintenance}
        />
      )}
    </>
  );
}
