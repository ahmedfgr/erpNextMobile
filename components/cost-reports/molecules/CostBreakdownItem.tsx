'use client';

import React from 'react';
import { BrandLogo } from '@/components/fleet/BrandLogo';
import { VehicleMonthlyCost } from '@/types/cost-reports';
import { CurrencyDisplay } from '../atoms/CurrencyDisplay';

interface CostBreakdownItemProps {
  item: VehicleMonthlyCost;
}

export function CostBreakdownItem({ item }: CostBreakdownItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all gap-3">
      {/* Vehicle Info: Brand Logo + Name + Plate */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center p-2 shrink-0 border border-slate-800 shadow-2xs">
          <BrandLogo brandKey={item.brandKey} size={22} />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-black text-slate-900 truncate">{item.vehicleName}</h4>
          <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 tracking-wider">
            {item.plateNumber}
          </span>
        </div>
      </div>

      {/* Cost Columns */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Fuel Cost */}
        <div className="bg-emerald-50/50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
          <span className="text-[10px] font-bold text-emerald-700 block mb-0.5">وقود</span>
          <CurrencyDisplay amount={item.fuelCost} size="sm" colorClass="text-emerald-700" />
          <span className="text-[10px] text-slate-400 block mt-0.5">{item.fuelLiters} لتر</span>
        </div>

        {/* Maintenance Cost */}
        <div className="bg-amber-50/50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
          <span className="text-[10px] font-bold text-amber-700 block mb-0.5">صيانة</span>
          <CurrencyDisplay amount={item.maintenanceCost} size="sm" colorClass="text-amber-700" />
          <span className="text-[10px] text-slate-400 block mt-0.5">{item.maintenanceOperationsCount} عمليات</span>
        </div>

        {/* Total Cost */}
        <div className="bg-slate-100/50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
          <span className="text-[10px] font-bold text-slate-600 block mb-0.5">الإجمالي</span>
          <CurrencyDisplay amount={item.totalCost} size="md" colorClass="text-slate-900" />
        </div>
      </div>
    </div>
  );
}
