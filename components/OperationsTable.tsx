'use client';

import React, { useState } from 'react';
import { Warehouse, ArrowUpRight, ArrowDownLeft, Clock, FileSpreadsheet, Layers } from 'lucide-react';

interface OperationsTableProps {
  onShowNotification: (msg: string) => void;
}

interface WarehouseMovement {
  id: string;
  material: string; // اسم المادة مختصر
  warehouseTank: string; // على مستوى المخزن
  type: 'supply' | 'dispense';
  typeLabel: string;
  dotColor: string;
  quantity: string;
  dateTime: string; // وقت وتاريخ مختصر محصور في خانة واحدة
  status: 'completed' | 'in_progress';
}

const INITIAL_WAREHOUSE_MOVEMENTS: WarehouseMovement[] = [
  {
    id: '1',
    material: 'ديزل ممتاز',
    warehouseTank: 'خزان الديزل الرئيسي A1',
    type: 'supply',
    typeLabel: 'توريد للمخزن',
    dotColor: 'bg-emerald-500',
    quantity: '12,000 لتر',
    dateTime: 'اليوم • 06:45 ص',
    status: 'completed',
  },
  {
    id: '2',
    material: 'ديزل ممتاز',
    warehouseTank: 'خزان الديزل الرئيسي A1',
    type: 'dispense',
    typeLabel: 'صرف مخزني',
    dotColor: 'bg-amber-500',
    quantity: '450 لتر',
    dateTime: 'اليوم • 05:12 ص',
    status: 'completed',
  },
  {
    id: '3',
    material: 'ديزل صناعي',
    warehouseTank: 'خزان المعدات والآليات C1',
    type: 'dispense',
    typeLabel: 'صرف مخزني',
    dotColor: 'bg-blue-500',
    quantity: '210 لتر',
    dateTime: 'اليوم • 03:30 ص',
    status: 'completed',
  },
  {
    id: '4',
    material: 'بنزين 91',
    warehouseTank: 'خزان البنزين الفرعي B1',
    type: 'dispense',
    typeLabel: 'صرف مخزني',
    dotColor: 'bg-rose-500',
    quantity: '65 لتر',
    dateTime: 'أمس • 11:20 م',
    status: 'completed',
  },
  {
    id: '5',
    material: 'مواد كيميائية',
    warehouseTank: 'مستودع الكيماويات والمذيبات 02',
    type: 'supply',
    typeLabel: 'توريد للمخزن',
    dotColor: 'bg-purple-500',
    quantity: '1,500 كجم',
    dateTime: 'أمس • 09:30 م',
    status: 'completed',
  },
  {
    id: '6',
    material: 'زيوت هيدروليك',
    warehouseTank: 'مستودع الزيوت والشحوم 01',
    type: 'dispense',
    typeLabel: 'صرف مخزني',
    dotColor: 'bg-amber-600',
    quantity: '200 لتر',
    dateTime: 'أمس • 08:40 م',
    status: 'completed',
  },
  {
    id: '7',
    material: 'بنزين 91',
    warehouseTank: 'خزان البنزين الفرعي B1',
    type: 'supply',
    typeLabel: 'توريد للمخزن',
    dotColor: 'bg-emerald-500',
    quantity: '8,000 لتر',
    dateTime: '29 سبت • 02:15 م',
    status: 'completed',
  },
];

export function OperationsTable({ onShowNotification }: OperationsTableProps) {
  const [filterType, setFilterType] = useState<'all' | 'supply' | 'dispense'>('all');

  const filteredMovements = INITIAL_WAREHOUSE_MOVEMENTS.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <section className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              سجل حركات المخازن
            </h3>
            <span className="text-[10px] font-bold text-[#0089FF] bg-[#0089FF]/10 px-2 py-0.5 rounded-full border border-[#0089FF]/20">
              محدث لحظياً
            </span>
          </div>
        </div>

        {/* Action Controls & Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Movement Type Filter */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/70">
            <button
              onClick={() => setFilterType('all')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>الكل</span>
            </button>
            <button
              onClick={() => setFilterType('supply')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'supply'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
              <span>توريد للمخزن</span>
            </button>
            <button
              onClick={() => setFilterType('dispense')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'dispense'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5 text-amber-600" />
              <span>صرف من المخزن</span>
            </button>
          </div>

          <button
            onClick={() => onShowNotification('تم تصدير سجل حركات المخازن بنجاح')}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/80 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>تصدير</span>
          </button>
        </div>
      </div>

      {/* Warehouse Movements Table (بدون رقم العملية + وقت وتاريخ مختصر محصور في خانة واحدة) */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="text-slate-400 font-bold border-b border-slate-100 pb-3">
              <th className="py-3 px-3">المادة</th>
              <th className="py-3 px-3">المخزن / الخزان</th>
              <th className="py-3 px-3">نوع الحركة</th>
              <th className="py-3 px-3">الكمية</th>
              <th className="py-3 px-3">الوقت والتاريخ</th>
              <th className="py-3 px-3 text-center">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {filteredMovements.map((op) => (
              <tr key={op.id} className="hover:bg-slate-50/80 transition-colors">
                {/* المادة */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${op.dotColor} shrink-0`}></span>
                    <span className="font-black text-slate-900">{op.material}</span>
                  </div>
                </td>

                {/* المخزن / الخزان */}
                <td className="py-3.5 px-3 whitespace-nowrap text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Warehouse className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold">{op.warehouseTank}</span>
                  </div>
                </td>

                {/* نوع الحركة */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      op.type === 'supply'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {op.type === 'supply' ? (
                      <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <ArrowDownLeft className="w-3 h-3 text-amber-600" />
                    )}
                    <span>{op.typeLabel}</span>
                  </span>
                </td>

                {/* الكمية */}
                <td className="py-3.5 px-3 font-black text-slate-900 whitespace-nowrap">
                  {op.quantity}
                </td>

                {/* الوقت والتاريخ محصور في خانة واحدة ومختصر */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200/90 text-slate-700 font-bold text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{op.dateTime}</span>
                  </span>
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
    </section>
  );
}
