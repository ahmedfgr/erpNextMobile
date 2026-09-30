'use client';

import React, { useState } from 'react';
import { X, UserPlus, Check } from 'lucide-react';
import { DriverInfo, Vehicle } from '@/types/fleet';

interface AddDriverModalProps {
  isOpen: boolean;
  vehicles: Vehicle[];
  onClose: () => void;
  onAddDriver: (newDriver: DriverInfo) => void;
}

export function AddDriverModal({ isOpen, vehicles, onClose, onAddDriver }: AddDriverModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('009665');
  const [nationalId, setNationalId] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [assignedVehicleId, setAssignedVehicleId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !licenseNumber.trim()) return;

    const matchedVehicle = vehicles.find((v) => v.id === assignedVehicleId);

    const newDriver: DriverInfo = {
      id: `DRV-0${Math.floor(10 + Math.random() * 90)}`,
      name: name.trim(),
      phone: phone.trim(),
      nationalId: nationalId.trim() || '2099887766',
      licenseNumber: licenseNumber.trim(),
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&w=120&q=80`,
      status: 'available',
      joinDate: '2026-10-01',
      experienceYears: 5,
      assignedVehicleId: matchedVehicle?.id,
      assignedVehicleName: matchedVehicle?.name,
      assignedVehiclePlate: matchedVehicle?.plateNumber,
      assignedVehicleBrandKey: matchedVehicle?.brandKey,
    };

    onAddDriver(newDriver);
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
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">إضافة سائق جديد للأسطول</h3>
              <p className="text-xs text-slate-500 font-semibold">تسجيل بيانات السائق وتعيين الشاحنة</p>
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
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">اسم السائق الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: حسام عبد العزيز الشامي"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">رقم الهاتف والتواصل</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="009665xxxxxxxx"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-slate-400"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">رقم رخصة القيادة</label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="مثال: DL-55410"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">رقم الهوية الوطنية / الإقامة</label>
            <input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="مثال: 2049182741"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">تعيين الشاحنة أو المركبة المخصصة</label>
            <select
              value={assignedVehicleId}
              onChange={(e) => setAssignedVehicleId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none focus:border-slate-400"
            >
              <option value="">بدون تعيين حالياً (سائق احتياط)</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} — لوحة: {v.plateNumber}
                </option>
              ))}
            </select>
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
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>إضافة وتعيين السائق</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
