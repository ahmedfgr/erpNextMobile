'use client';

import React, { useState } from 'react';
import { X, Send, Check } from 'lucide-react';
import { Vehicle, TripMission } from '@/types/fleet';

interface CreateMissionModalProps {
  isOpen: boolean;
  vehicles: Vehicle[];
  onClose: () => void;
  onCreateMission: (vehicleId: string, mission: TripMission) => void;
}

export function CreateMissionModal({
  isOpen,
  vehicles,
  onClose,
  onCreateMission,
}: CreateMissionModalProps) {
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id || '');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [cargoType, setCargoType] = useState('مواد إنشائية وقطع غيار');
  const [cargoWeightTon, setCargoWeightTon] = useState(15);
  const [departureDate, setDepartureDate] = useState('2026-10-01');
  const [expectedReturnDate, setExpectedReturnDate] = useState('2026-10-03');

  if (!isOpen) return null;

  const selectedVehicle = vehicles.find((v) => v.id === (vehicleId || vehicles[0]?.id)) || vehicles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !purpose || !selectedVehicle) return;

    const newMission: TripMission = {
      id: `MSN-${Math.floor(100 + Math.random() * 900)}`,
      destination,
      purpose,
      cargoType,
      cargoWeightTon: Number(cargoWeightTon),
      driverName: selectedVehicle.driver ? selectedVehicle.driver.name : 'سائق معتمد',
      departureDate,
      expectedReturnDate,
      status: 'active',
      startOdometer: selectedVehicle.odometerKm,
    };

    onCreateMission(selectedVehicle.id, newMission);
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-right overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-100 relative my-6">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">إصدار تصريح رحلة / مأمورية</h3>
              <p className="text-xs text-slate-500 font-semibold">تخصيص شاحنة وخط سير معتمد ومتابعة لوجستية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">اختيار الشاحنة للرحلة</label>
            <select
              value={vehicleId || selectedVehicle?.id}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none focus:border-slate-400"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.code} - {v.plateNumber}) — {v.status === 'available' ? '✓ جاهزة' : `(${v.status})`}
                </option>
              ))}
            </select>
            {selectedVehicle?.driver && (
              <p className="text-[11px] text-slate-500 font-semibold mt-1">
                السائق المعين: <strong>{selectedVehicle.driver.name}</strong> • سعة الوقود: {selectedVehicle.currentFuelLiters} لتر
              </p>
            )}
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">وجهة المأمورية وموقع الوصول</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="مثال: مشروع نيوم - الموقع الشمالي قطاع 4"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">الغرض من المأمورية والمهام</label>
            <textarea
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="مثال: نقل أنابيب خرسانية ومواد حديدية للموقع وتفريغ الحمولة"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نوع الحمولة</label>
              <input
                type="text"
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">وزن الحمولة (طن)</label>
              <input
                type="number"
                value={cargoWeightTon}
                onChange={(e) => setCargoWeightTon(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">تاريخ الانطلاق</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">العودة المتوقعة</label>
              <input
                type="date"
                value={expectedReturnDate}
                onChange={(e) => setExpectedReturnDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-amber-400" />
              <span>اعتماد وإصدار التصريح</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
