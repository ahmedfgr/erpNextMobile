'use client';

import React, { useState } from 'react';
import { X, Truck, Check } from 'lucide-react';
import { Vehicle, VehicleType, WeightCategory, VehicleBrandKey } from '@/types/fleet';
import { INITIAL_DRIVERS } from '@/data/fleet-data';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (newVehicle: Partial<Vehicle>) => void;
}

export function AddVehicleModal({ isOpen, onClose, onAddVehicle }: AddVehicleModalProps) {
  const [code, setCode] = useState('TRK-550');
  const [plateNumber, setPlateNumber] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('Mercedes-Benz Actros');
  const [brandKey, setBrandKey] = useState<VehicleBrandKey>('mercedes');
  const [weightCategory, setWeightCategory] = useState<WeightCategory>('heavy');
  const [modelYear, setModelYear] = useState(2024);
  const [type, setType] = useState<VehicleType>('heavy_truck');
  const [fuelCapacity, setFuelCapacity] = useState(400);
  const [fuelType, setFuelType] = useState<'ديزل ممتاز' | 'بنزين 95' | 'ديزل صناعي'>('ديزل ممتاز');
  const [odometerKm, setOdometerKm] = useState(15000);
  const [maxLoadTon, setMaxLoadTon] = useState(30);
  const [driverId, setDriverId] = useState(INITIAL_DRIVERS[0].id);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !plateNumber) return;

    const assignedDriver = INITIAL_DRIVERS.find((d) => d.id === driverId);

    onAddVehicle({
      id: `V-${Date.now()}`,
      code,
      plateNumber,
      name,
      description: description || 'مركبة أسطول مخصصة لعمليات النقل والتشغيل',
      brand,
      brandKey,
      weightCategory,
      modelYear,
      type,
      status: 'available',
      driver: assignedDriver,
      fuelCapacityLiters: Number(fuelCapacity),
      currentFuelLiters: Number(fuelCapacity) * 0.8,
      fuelType,
      fuelEfficiencyKmPerLiter: 3.5,
      odometerKm: Number(odometerKm),
      maxLoadTon: Number(maxLoadTon),
      lastServiceDate: '2026-09-01',
      nextServiceKm: Number(odometerKm) + 10000,
      recentMissions: [],
      maintenanceHistory: [],
      refuelHistory: [],
    });
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
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">إضافة شاحنة / آلية جديدة</h3>
              <p className="text-xs text-slate-500 font-semibold">تسجيل مركبة في أسطول ومستودعات الشركة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">اسم الشاحنة (الاسم التجاري)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: فولفو FH16"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-slate-400"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">رقم اللوحة المعدنية</label>
              <input
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="مثال: أ ب د - 4589"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">الوصف والمهمة التفصيلية</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مثال: صهريج توزيع وقود 32 ألف لتر مع مضخة تفريغ إلكترونية"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:border-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">الشركة المصنعة والشعار</label>
              <select
                value={brandKey}
                onChange={(e) => setBrandKey(e.target.value as VehicleBrandKey)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
              >
                <option value="volvo">Volvo (فولفو)</option>
                <option value="mercedes">Mercedes-Benz (مرسيدس)</option>
                <option value="toyota">Toyota (تويوتا)</option>
                <option value="caterpillar">Caterpillar CAT (كاتربيلر)</option>
                <option value="hyundai">Hyundai (هيونداي)</option>
                <option value="man">MAN (مان)</option>
                <option value="isuzu">Isuzu (إيسوزو)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">تصنيف وزن المركبة</label>
              <select
                value={weightCategory}
                onChange={(e) => setWeightCategory(e.target.value as WeightCategory)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
              >
                <option value="heavy">مركبة ثقيلة (Heavy)</option>
                <option value="medium">مركبة متوسطة (Medium)</option>
                <option value="light">مركبة خفيفة (Light)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">النوع والتصنيف</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as VehicleType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none"
              >
                <option value="heavy_truck">شاحنة نقل ثقيل</option>
                <option value="fuel_tanker">صهريج وقود</option>
                <option value="equipment">آلية ومعدة إنشائية</option>
                <option value="service_car">سيارة خدمة وإشراف</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">الماركة والموديل بالكامل</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">سنة الصنع</label>
              <input
                type="number"
                value={modelYear}
                onChange={(e) => setModelYear(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">سعة الخزان (لتر)</label>
              <input
                type="number"
                value={fuelCapacity}
                onChange={(e) => setFuelCapacity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">حمولة (طن)</label>
              <input
                type="number"
                value={maxLoadTon}
                onChange={(e) => setMaxLoadTon(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نوع الوقود</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as typeof fuelType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
              >
                <option value="ديزل ممتاز">ديزل ممتاز</option>
                <option value="ديزل صناعي">ديزل صناعي</option>
                <option value="بنزين 95">بنزين 95</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">تعيين السائق</label>
              <select
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
              >
                {INITIAL_DRIVERS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">قراءة العداد الحالية (كم)</label>
            <input
              type="number"
              value={odometerKm}
              onChange={(e) => setOdometerKm(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800"
            />
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
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>تسجيل الشاحنة في الأسطول</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
