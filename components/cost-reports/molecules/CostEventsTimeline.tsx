'use client';

import React from 'react';
import { Fuel, Wrench, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { CurrencyDisplay } from '../atoms/CurrencyDisplay';
import { BrandLogo } from '@/components/fleet/BrandLogo';
import { VehicleBrandKey } from '@/types/fleet';

export interface TimelineEvent {
  id: string;
  type: 'refuel' | 'maintenance';
  vehicleId: string;
  vehicleName: string;
  vehiclePlate: string;
  brandKey: VehicleBrandKey;
  date: string;
  time?: string;
  cost: number;
  description: string;
  liters?: number;
  sourceOrStatus?: string;
}

interface CostEventsTimelineProps {
  events: TimelineEvent[];
  selectedVehicleName?: string;
}

export function CostEventsTimeline({
  events,
  selectedVehicleName,
}: CostEventsTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/80 text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <h4 className="text-sm sm:text-base font-black text-slate-800">
          لا توجد عمليات مسجلة خلال هذا الشهر
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          {selectedVehicleName
            ? `لم يتم تسجيل أي عملية تعبئة وقود أو صيانة للشاحنة (${selectedVehicleName}) خلال هذه الفترة`
            : 'لم تسجل أي عمليات وقود أو صيانة خلال هذا الشهر المحدد'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            سجل وتاريخ الأحداث بالتفصيل (الوقت والتاريخ)
          </h3>
        </div>
        <span className="text-xs font-bold text-slate-400">
          {events.length} عملية موثقة
        </span>
      </div>

      <div className="space-y-3">
        {events.map((event) => {
          const isFuel = event.type === 'refuel';

          return (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/70 transition-colors gap-3"
            >
              {/* Event Type Icon & Details */}
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                    isFuel
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {isFuel ? (
                    <Fuel className="w-5 h-5" />
                  ) : (
                    <Wrench className="w-5 h-5" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded ${
                        isFuel
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isFuel ? 'تزويد وقود' : 'أمر صيانة'}
                    </span>

                    <h5 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                      {event.vehicleName}
                    </h5>

                    <span className="text-[10px] font-black text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {event.vehiclePlate}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    {event.description}
                  </p>

                  {/* Date and Time Stamps */}
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      <Clock className="w-3 h-3 text-[#0089FF]" />
                      <span className="font-black">{event.time || '10:00 ص'}</span>
                    </div>

                    {event.sourceOrStatus && (
                      <div className="flex items-center gap-1 text-slate-500 hidden sm:flex">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{event.sourceOrStatus}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Amount and Cost */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60 shrink-0">
                <CurrencyDisplay
                  amount={event.cost}
                  size="md"
                  colorClass={isFuel ? 'text-emerald-700' : 'text-amber-700'}
                />
                {event.liters !== undefined && (
                  <span className="text-[11px] font-bold text-slate-500">
                    {event.liters} لتر
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
