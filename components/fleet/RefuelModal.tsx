'use client';

import React, { useState } from 'react';
import { X, Fuel, Check } from 'lucide-react';
import { Vehicle } from '@/types/fleet';
import { TANKS_DATA } from '@/data/tanks-data';

interface RefuelModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSubmitRefuel: (vehicleId: string, tankId: string, liters: number) => void;
}

export function RefuelModal({ vehicle, onClose, onSubmitRefuel }: RefuelModalProps) {
  const neededLiters = vehicle ? Math.max(0, vehicle.fuelCapacityLiters - vehicle.currentFuelLiters) : 50;
  const [liters, setLiters] = useState<number>(neededLiters > 0 ? neededLiters : 50);
  const [selectedTankId, setSelectedTankId] = useState<string>(TANKS_DATA[0].id);

  if (!vehicle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (liters <= 0) return;
    onSubmitRefuel(vehicle.id, selectedTankId, liters);
    onClose();
  };

  const selectedTank = TANKS_DATA.find((t) => t.id === selectedTankId) || TANKS_DATA[0];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-right animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Fuel className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                تعبئة وقود — {vehicle.code}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500">
                {vehicle.name} ({vehicle.plateNumber})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Current Status Box */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 block font-medium">الوقود الحالي / السعة</span>
              <span className="font-extrabold text-slate-900">
                {vehicle.currentFuelLiters} / {vehicle.fuelCapacityLiters} لتر
              </span>
            </div>
            <div className="text-left">
              <span className="text-slate-500 block font-medium">نوع الوقود المطلوب</span>
              <span className="font-extrabold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                {vehicle.fuelType}
              </span>
            </div>
          </div>

          {/* Select Source Tank */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              اختيار خزان التزويد من المستودع
            </label>
            <select
              value={selectedTankId}
              onChange={(e) => setSelectedTankId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400"
            >
              {TANKS_DATA.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.id}) — متوفر: {t.currentAmount} لتر ({t.type})
                </option>
              ))}
            </select>
          </div>

          {/* Liters Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">كمية الوقود المراد تعبئتها (لتر)</label>
              <button
                type="button"
                onClick={() => setLiters(neededLiters)}
                className="text-[11px] font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                تعبئة كاملة ({neededLiters} لتر)
              </button>
            </div>
            <input
              type="number"
              min={1}
              max={neededLiters > 0 ? neededLiters : vehicle.fuelCapacityLiters}
              value={liters}
              onChange={(e) => setLiters(Number(e.target.value))}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-400"
            />
            <p className="text-[10px] text-slate-400 font-semibold mt-1">
              سيتم خصم الكمية فورياً من {selectedTank.name} وتحديث رصيد الشاحنة.
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>تأكيد صرف وتعبئة الوقود</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
