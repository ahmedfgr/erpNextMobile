'use client';

import React, { useState } from 'react';
import { Truck, Wrench, ArrowUpRight, ArrowDownLeft, Clock, FileSpreadsheet } from 'lucide-react';
import { BrandLogo } from './fleet/BrandLogo';
import { VehicleBrandKey } from '@/types/fleet';

interface OperationsTableProps {
  onShowNotification: (msg: string) => void;
}

interface FuelOperation {
  id: string;
  materialTank: string;
  type: 'supply' | 'dispense';
  typeLabel: string;
  dotColor: string;
  quantity: string;
  vehicleName: string;
  vehiclePlate: string;
  vehicleBrandKey: VehicleBrandKey;
  time: string;
  status: 'completed' | 'in_progress';
}

interface MaintenanceOperation {
  id: string;
  vehicleName: string;
  vehiclePlate: string;
  vehicleBrandKey: VehicleBrandKey;
  issueOrParts: string;
  warehouseParts: string;
  cost: string;
  time: string;
  status: 'completed' | 'in_progress' | 'pending';
}

const INITIAL_FUEL_OPERATIONS: FuelOperation[] = [
  {
    id: '#TRX-8821',
    materialTank: 'ديزل ممتاز (خزان A1)',
    type: 'supply',
    typeLabel: 'توريد للمخزن',
    dotColor: 'bg-amber-500',
    quantity: '12,000 لتر',
    vehicleName: 'فولفو FH16',
    vehiclePlate: 'ر س ط - 6119',
    vehicleBrandKey: 'volvo',
    time: 'اليوم 06:45 ص',
    status: 'completed',
  },
  {
    id: '#TRX-8820',
    materialTank: 'ديزل ممتاز (خزان A1)',
    type: 'dispense',
    typeLabel: 'صرف تموين شاحنة',
    dotColor: 'bg-emerald-500',
    quantity: '450 لتر',
    vehicleName: 'مرسيدس-بنز أكتروس 3340',
    vehiclePlate: 'أ ب د - 4589',
    vehicleBrandKey: 'mercedes',
    time: 'اليوم 05:12 ص',
    status: 'completed',
  },
  {
    id: '#TRX-8819',
    materialTank: 'ديزل صناعي (خزان C1)',
    type: 'dispense',
    typeLabel: 'تغذية آلية إنشائية',
    dotColor: 'bg-blue-500',
    quantity: '210 لتر',
    vehicleName: 'كاتربيلر CAT 966L',
    vehiclePlate: 'ل م ن - 5520',
    vehicleBrandKey: 'caterpillar',
    time: 'اليوم 03:30 ص',
    status: 'completed',
  },
  {
    id: '#TRX-8818',
    materialTank: 'بنزين 91 (خزان B1)',
    type: 'dispense',
    typeLabel: 'صرف دورية إشراف',
    dotColor: 'bg-rose-500',
    quantity: '65 لتر',
    vehicleName: 'تويوتا هايلوكس 4x4',
    vehiclePlate: 'ع هـ و - 9034',
    vehicleBrandKey: 'toyota',
    time: 'أمس 11:20 م',
    status: 'completed',
  },
  {
    id: '#TRX-8817',
    materialTank: 'ديزل ممتاز (خزان A1)',
    type: 'dispense',
    typeLabel: 'صرف شاحنة توزيع',
    dotColor: 'bg-amber-500',
    quantity: '120 لتر',
    vehicleName: 'هيونداي مايتي EX8',
    vehiclePlate: 'س ط ع - 3841',
    vehicleBrandKey: 'hyundai',
    time: 'أمس 08:40 م',
    status: 'completed',
  },
];

const INITIAL_MAINTENANCE_OPERATIONS: MaintenanceOperation[] = [
  {
    id: '#MNT-4402',
    vehicleName: 'كاتربيلر CAT 966L',
    vehiclePlate: 'ل م ن - 5520',
    vehicleBrandKey: 'caterpillar',
    issueOrParts: 'إصلاح تسريب هيدروليك وفحص مضخة الديزل',
    warehouseParts: 'لي هيدروليك ضغط عالي + برميل زيت 68',
    cost: '2,100 ر.س',
    time: 'اليوم 08:15 ص',
    status: 'in_progress',
  },
  {
    id: '#MNT-4398',
    vehicleName: 'مرسيدس-بنز أكتروس 3340',
    vehiclePlate: 'أ ب د - 4589',
    vehicleBrandKey: 'mercedes',
    issueOrParts: 'صيانة دورية 80,000 كم وتبديل فحمات',
    warehouseParts: 'فلاتر ديزل أصلية + طقم أقمشة فرامل أمامي',
    cost: '1,450 ر.س',
    time: 'أمس 04:30 م',
    status: 'completed',
  },
  {
    id: '#MNT-4395',
    vehicleName: 'فولفو FH16',
    vehiclePlate: 'ر س ط - 6119',
    vehicleBrandKey: 'volvo',
    issueOrParts: 'معايرة صمامات تفريغ صهريج الوقود والعداد الرقمي',
    warehouseParts: 'حشوات عزل صمامات تفريغ 3 إنش',
    cost: '850 ر.س',
    time: '28 سبتمبر 02:00 م',
    status: 'completed',
  },
];

export function OperationsTable({ onShowNotification }: OperationsTableProps) {
  const [activeTab, setActiveTab] = useState<'fuel' | 'maintenance'>('fuel');

  return (
    <section className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {activeTab === 'fuel' ? 'سجل حركات المواد والوقود الأخيرة' : 'سجل طلبات وعمليات الصيانة للمستودع والأسطول'}
            </h3>
            <span className="text-[10px] font-bold text-[#0089FF] bg-[#0089FF]/10 px-2 py-0.5 rounded-full border border-[#0089FF]/20">
              محدث لحظياً
            </span>
          </div>
          <p className="text-xs text-slate-400 font-semibold">
            {activeTab === 'fuel'
              ? 'متابعة تفصيلية لرقم العملية، المادة، الكميات، والمركبة المستفيدة والوقت'
              : 'متابعة أوامر الصيانة، القطع المصروفة من المستودع، التكاليف والمركبات المحددة'}
          </p>
        </div>

        {/* Action Controls & Tab Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Tab Switcher */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/70">
            <button
              onClick={() => setActiveTab('fuel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'fuel'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
              <span>حركات الوقود والمواد</span>
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'maintenance'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-amber-600" />
              <span>عمليات الصيانة والقطع</span>
            </button>
          </div>

          <button
            onClick={() => onShowNotification('تم تصدير سجل الحركات إلى ملف Excel بنجاح')}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/80 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>تصدير</span>
          </button>
        </div>
      </div>

      {/* Table 1: Fuel & Material Movement */}
      {activeTab === 'fuel' && (
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="text-slate-400 font-bold border-b border-slate-100 pb-3">
                <th className="py-3 px-3">رقم العملية</th>
                <th className="py-3 px-3">المادة أو الخزان</th>
                <th className="py-3 px-3">الكمية</th>
                <th className="py-3 px-3">العربة أو الشاحنة أو المركبة المحددة</th>
                <th className="py-3 px-3">الوقت</th>
                <th className="py-3 px-3 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {INITIAL_FUEL_OPERATIONS.map((op) => (
                <tr key={op.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* رقم العملية */}
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {op.id}
                  </td>

                  {/* المادة أو الخزان */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${op.dotColor} shrink-0`}></span>
                      <span className="font-bold text-slate-900">{op.materialTank}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold block mr-4.5">
                      {op.typeLabel}
                    </span>
                  </td>

                  {/* الكمية */}
                  <td className="py-3.5 px-3 font-black text-slate-900 whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      {op.type === 'supply' ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <ArrowDownLeft className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span>{op.quantity}</span>
                    </span>
                  </td>

                  {/* العربة أو الشاحنة المحددة */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center p-1 shrink-0">
                        <BrandLogo brandKey={op.vehicleBrandKey} size={16} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-black text-slate-900 block truncate">{op.vehicleName}</span>
                        <span className="text-[10px] font-black text-slate-800 bg-slate-200/80 border border-slate-300 px-1.5 py-0.2 rounded shadow-2xs inline-block">
                          {op.vehiclePlate}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* الوقت */}
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{op.time}</span>
                    </div>
                  </td>

                  {/* الحالة */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      مكتملة
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table 2: Maintenance Operations */}
      {activeTab === 'maintenance' && (
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="text-slate-400 font-bold border-b border-slate-100 pb-3">
                <th className="py-3 px-3">رقم العملية</th>
                <th className="py-3 px-3">العربة أو الشاحنة أو المركبة المحددة</th>
                <th className="py-3 px-3">نوع الصيانة / القطع المصروفة من المستودع</th>
                <th className="py-3 px-3">التكلفة</th>
                <th className="py-3 px-3">الوقت</th>
                <th className="py-3 px-3 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {INITIAL_MAINTENANCE_OPERATIONS.map((mnt) => (
                <tr key={mnt.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* رقم العملية */}
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {mnt.id}
                  </td>

                  {/* العربة أو الشاحنة المحددة */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center p-1 shrink-0">
                        <BrandLogo brandKey={mnt.vehicleBrandKey} size={16} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-black text-slate-900 block truncate">{mnt.vehicleName}</span>
                        <span className="text-[10px] font-black text-slate-800 bg-slate-200/80 border border-slate-300 px-1.5 py-0.2 rounded shadow-2xs inline-block">
                          {mnt.vehiclePlate}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* نوع الصيانة والقطع */}
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-slate-900">{mnt.issueOrParts}</p>
                    <p className="text-[10px] text-slate-500 font-medium">القطع: {mnt.warehouseParts}</p>
                  </td>

                  {/* التكلفة */}
                  <td className="py-3.5 px-3 font-black text-slate-900 whitespace-nowrap">
                    {mnt.cost}
                  </td>

                  {/* الوقت */}
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{mnt.time}</span>
                    </div>
                  </td>

                  {/* الحالة */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        mnt.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {mnt.status === 'completed' ? 'تمت بنجاح' : 'جارية بالورشة'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
