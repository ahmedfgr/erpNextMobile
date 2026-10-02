'use client';

import React, { useState, useMemo } from 'react';
import { Fuel, Wrench, WalletCards, TrendingUp } from 'lucide-react';
import { Vehicle } from '@/types/fleet';
import { computeMonthlyCostReport } from '@/lib/cost-calculations';
import { CostSummaryHeader } from './molecules/CostSummaryHeader';
import { MonthlyCostMetricCard } from './molecules/MonthlyCostMetricCard';
import { VehicleSelectFilter } from './molecules/VehicleSelectFilter';
import { CompactEventsView, CompactEventItem } from './molecules/CompactEventsView';
import { CurrencyDisplay } from './atoms/CurrencyDisplay';

interface MonthlyCostReportViewProps {
  vehicles: Vehicle[];
  onBack: () => void;
}

export function MonthlyCostReportView({ vehicles, onBack }: MonthlyCostReportViewProps) {
  const [selectedMonth, setSelectedMonth] = useState('2026-09');
  const [selectedVehicleId, setSelectedVehicleId] = useState('all');

  // Compute standard report for all vehicles for the selected month
  const report = useMemo(
    () => computeMonthlyCostReport(vehicles, selectedMonth),
    [vehicles, selectedMonth]
  );

  // Filter breakdown based on selected vehicle
  const displayedBreakdown = useMemo(() => {
    if (selectedVehicleId === 'all') {
      return report.vehiclesCostBreakdown;
    }
    return report.vehiclesCostBreakdown.filter((v) => v.vehicleId === selectedVehicleId);
  }, [report, selectedVehicleId]);

  // Dynamic Metrics based on selected vehicle filter
  const currentFuelCost = useMemo(() => {
    return displayedBreakdown.reduce((sum, v) => sum + v.fuelCost, 0);
  }, [displayedBreakdown]);

  const currentFuelLiters = useMemo(() => {
    return displayedBreakdown.reduce((sum, v) => sum + v.fuelLiters, 0);
  }, [displayedBreakdown]);

  const currentMaintenanceCost = useMemo(() => {
    return displayedBreakdown.reduce((sum, v) => sum + v.maintenanceCost, 0);
  }, [displayedBreakdown]);

  const currentMaintenanceOps = useMemo(() => {
    return displayedBreakdown.reduce((sum, v) => sum + v.maintenanceOperationsCount, 0);
  }, [displayedBreakdown]);

  const currentGrandTotalCost = currentFuelCost + currentMaintenanceCost;

  // Cost Distribution dynamic percentages
  const fuelPct = currentGrandTotalCost > 0
    ? Math.round((currentFuelCost / currentGrandTotalCost) * 100)
    : 0;

  const maintPct = currentGrandTotalCost > 0
    ? Math.round((currentMaintenanceCost / currentGrandTotalCost) * 100)
    : 0;

  // Selected vehicle metadata for display
  const selectedVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === selectedVehicleId);
  }, [vehicles, selectedVehicleId]);

  // Build compact events strictly focused on: type, quantity, date, time
  const compactEvents: CompactEventItem[] = useMemo(() => {
    const events: CompactEventItem[] = [];

    const targetVehicles = selectedVehicleId === 'all'
      ? vehicles
      : vehicles.filter((v) => v.id === selectedVehicleId);

    targetVehicles.forEach((veh) => {
      // 1. Refuel records
      (veh.refuelHistory || []).forEach((r) => {
        if (r.date.startsWith(selectedMonth)) {
          events.push({
            id: `rf-${r.id}`,
            type: 'refuel',
            quantityText: `${r.liters.toLocaleString()} لتر`,
            date: r.date,
            time: r.time || '09:00 ص',
          });
        }
      });

      // 2. Maintenance records
      (veh.maintenanceHistory || []).forEach((m) => {
        if (m.date.startsWith(selectedMonth)) {
          const partsQty = (m.warehousePartsRequired || []).reduce(
            (sum, p) => sum + (p.quantity || 1),
            0
          );
          events.push({
            id: `mnt-${m.id}`,
            type: 'maintenance',
            quantityText: partsQty > 0 ? `${partsQty} قطع مستبدلة` : '1 عملية صيانة',
            date: m.date,
            time: m.time || '11:00 ص',
          });
        }
      });
    });

    // Sort newest to oldest by date
    return events.sort((a, b) => b.date.localeCompare(a.date));
  }, [vehicles, selectedMonth, selectedVehicleId]);

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 1. Header Molecule (Cleaned: no titles, no download button) */}
      <CostSummaryHeader
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onBack={onBack}
      />

      {/* 2. Vehicle Filter Dropdown Molecule (Modern design & requested text removed) */}
      <VehicleSelectFilter
        vehicles={vehicles}
        selectedVehicleId={selectedVehicleId}
        onSelectVehicle={setSelectedVehicleId}
      />

      {/* 3. Primary Financial KPIs (بطاقتين في الصف بدلا من واحدة) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Card 1: Fuel */}
        <MonthlyCostMetricCard
          title={selectedVehicle ? `وقود (${selectedVehicle.name})` : 'إجمالي تكاليف الوقود'}
          amount={currentFuelCost}
          badgeType="fuel"
          badgeLabel="وقود الديزل"
          icon={Fuel}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          secondaryText={`${currentFuelLiters.toLocaleString()} لتر تم استهلاكها`}
          percentage={fuelPct}
        />

        {/* Card 2: Maintenance */}
        <MonthlyCostMetricCard
          title={selectedVehicle ? `صيانة (${selectedVehicle.name})` : 'إجمالي تكاليف الصيانة'}
          amount={currentMaintenanceCost}
          badgeType="maintenance"
          badgeLabel="ورشة وإصلاحات"
          icon={Wrench}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          secondaryText={`${currentMaintenanceOps} أوامر صيانة معتمدة`}
          percentage={maintPct}
        />
      </div>

      {/* 4. Cost Distribution Comparison Bar (Reacts to the Vehicle Filter) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-black text-slate-900">
              توزيع التكاليف بين الوقود والصيانة{' '}
              {selectedVehicle && (
                <span className="text-[#0089FF]">({selectedVehicle.name})</span>
              )}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">
              المصروف الكلي:
            </span>
            <CurrencyDisplay amount={currentGrandTotalCost} size="sm" colorClass="text-slate-900 font-black" />
          </div>
        </div>

        {/* Visual Progress Ratio */}
        <div className="w-full bg-slate-100 rounded-full h-3.5 flex overflow-hidden p-0.5">
          <div
            className="bg-emerald-500 h-full rounded-r-full transition-all duration-500"
            style={{ width: `${fuelPct}%` }}
            title={`الوقود: ${fuelPct}%`}
          ></div>
          <div
            className="bg-amber-500 h-full rounded-l-full transition-all duration-500"
            style={{ width: `${maintPct}%` }}
            title={`الصيانة: ${maintPct}%`}
          ></div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-3 text-xs font-bold text-slate-600 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>نسبة الوقود ({fuelPct}%) - </span>
            <CurrencyDisplay amount={currentFuelCost} size="sm" colorClass="text-emerald-700" />
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>نسبة الصيانة ({maintPct}%) - </span>
            <CurrencyDisplay amount={currentMaintenanceCost} size="sm" colorClass="text-amber-700" />
          </div>
        </div>
      </div>

      {/* 5. Compact Events View: Cards & Table with toggle */}
      <CompactEventsView events={compactEvents} />
    </div>
  );
}
