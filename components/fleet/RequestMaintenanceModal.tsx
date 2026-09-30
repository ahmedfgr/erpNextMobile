'use client';

import React, { useState } from 'react';
import { X, Wrench, Check } from 'lucide-react';
import { Vehicle } from '@/types/fleet';

interface RequestMaintenanceModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSubmitMaintenance: (
    vehicleId: string,
    issue: string,
    priority: 'low' | 'medium' | 'high' | 'critical',
    partsText: string
  ) => void;
}

export function RequestMaintenanceModal({
  vehicle,
  onClose,
  onSubmitMaintenance,
}: RequestMaintenanceModalProps) {
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [partsText, setPartsText] = useState('فلاتر ديزل وزيت أصلي');

  if (!vehicle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    onSubmitMaintenance(vehicle.id, issue, priority, partsText);
    onClose();
  };

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
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                طلب صيانة وإصلاح — {vehicle.code}
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
          {/* Issue Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              وصف العطل أو أعمال الصيانة المطلوبة
            </label>
            <textarea
              rows={3}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="مثال: فحص دوري، اهتزاز في المحرك، تسريب زيت، استبدال فحمات..."
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              مستوى الأهمية والخطورة
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs font-bold">
              {[
                { id: 'low', label: 'عادي' },
                { id: 'medium', label: 'متوسط' },
                { id: 'high', label: 'عاجل' },
                { id: 'critical', label: 'حرج' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPriority(p.id as typeof priority)}
                  className={`py-2 rounded-xl border text-center transition-all cursor-pointer ${
                    priority === p.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Warehouse Spare Parts */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              قطع الغيار المطلوبة من مستودع الشاحنات
            </label>
            <input
              type="text"
              value={partsText}
              onChange={(e) => setPartsText(e.target.value)}
              placeholder="مثال: فلتر ديزل، طقم بواجي، زيت محرك 15W40"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400"
            />
            <p className="text-[10px] text-slate-400 font-semibold mt-1">
              سيتم إرسال إشعار لمستودع قطع غيار الأسطول لتجهيز المواد فوراً.
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
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>إرسال أمر الصيانة</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
