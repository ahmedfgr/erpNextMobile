'use client';

import React, { useState } from 'react';
import { Fuel, Wrench, Calendar, Clock, LayoutGrid, Table as TableIcon } from 'lucide-react';

export interface CompactEventItem {
  id: string;
  type: 'refuel' | 'maintenance';
  quantityText: string;
  date: string;
  time: string;
}

interface CompactEventsViewProps {
  events: CompactEventItem[];
}

export function CompactEventsView({ events }: CompactEventsViewProps) {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 text-center">
        <p className="text-xs font-bold text-slate-400">
          لا توجد أحداث تعبئة وقود أو صيانة مسجلة لهذه الفترة
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
      {/* Header with View Toggle (Cards vs Table) */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-black text-slate-900">
            أحداث التعبئة والصيانة
          </h3>
          <span className="text-[11px] font-bold text-slate-400">
            ({events.length})
          </span>
        </div>

        {/* Toggle Controls: البطاقات الصغيرة vs الجدول */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="عرض البطاقات الصغيرة"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="text-[11px]">بطاقات</span>
          </button>

          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="عرض الجدول المختصر"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span className="text-[11px]">جدول</span>
          </button>
        </div>
      </div>

      {/* 1. Mode: البطاقات الصغيرة والمختصرة جداً */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {events.map((event) => {
            const isFuel = event.type === 'refuel';
            return (
              <div
                key={event.id}
                className="p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/80 flex items-center justify-between gap-3 transition-colors"
              >
                {/* نوع الحدث */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isFuel
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {isFuel ? (
                      <Fuel className="w-3.5 h-3.5" />
                    ) : (
                      <Wrench className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                        isFuel
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isFuel ? 'تعبئة وقود' : 'صيانة'}
                    </span>
                    {/* الكمية */}
                    <p className="text-xs font-black text-slate-900 mt-1">
                      {event.quantityText}
                    </p>
                  </div>
                </div>

                {/* الوقت والتاريخ */}
                <div className="text-left text-[11px] font-semibold text-slate-500 shrink-0">
                  <div className="flex items-center justify-end gap-1 text-slate-700 font-bold">
                    <Clock className="w-3 h-3 text-[#0089FF]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-0.5 text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Mode: الجدول المختصر (3 أعمدة فقط: نوع الحدث، الكمية، الوقت والتاريخ) */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold">
                <th className="py-2.5 px-3 rounded-r-lg">نوع الحدث</th>
                <th className="py-2.5 px-3">الكمية</th>
                <th className="py-2.5 px-3 rounded-l-lg text-left">الوقت والتاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((event) => {
                const isFuel = event.type === 'refuel';
                return (
                  <tr key={event.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* نوع الحدث */}
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded ${
                          isFuel
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isFuel ? (
                          <>
                            <Fuel className="w-3 h-3 text-emerald-600" />
                            تعبئة وقود
                          </>
                        ) : (
                          <>
                            <Wrench className="w-3 h-3 text-amber-600" />
                            صيانة
                          </>
                        )}
                      </span>
                    </td>

                    {/* الكمية */}
                    <td className="py-2.5 px-3 font-black text-slate-900">
                      {event.quantityText}
                    </td>

                    {/* الوقت والتاريخ */}
                    <td className="py-2.5 px-3 text-left">
                      <div className="inline-flex items-center gap-2 text-[11px] font-bold">
                        <span className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {event.time}
                        </span>
                        <span className="text-slate-400">{event.date}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
