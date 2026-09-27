'use client';

import React from 'react';
import { Tank, TankCategory } from '@/types/tank';
import { TankCard } from './TankCard';

interface FuelSectionProps {
  tanks: Tank[];
  selectedCategory: TankCategory;
  onSelectCategory: (category: TankCategory) => void;
  onSelectTank: (tank: Tank) => void;
}

export function FuelSection({
  tanks,
  selectedCategory,
  onSelectCategory,
  onSelectTank,
}: FuelSectionProps) {
  return (
    <>
      {/* Fuel Section Header with Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">مستودع الوقود والخزانات</h2>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
            {tanks.length} من 4 خزانات
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#111928] text-white'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => onSelectCategory('diesel')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
              selectedCategory === 'diesel'
                ? 'bg-[#111928] text-white'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            ديزل
          </button>
          <button
            onClick={() => onSelectCategory('gasoline')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
              selectedCategory === 'gasoline'
                ? 'bg-[#111928] text-white'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            بنزين
          </button>
          <button
            onClick={() => onSelectCategory('heavy')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
              selectedCategory === 'heavy'
                ? 'bg-[#111928] text-white'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            زيوت ومواد
          </button>
        </div>
      </div>

      {/* Fuel Storage Tanks Responsive Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="tanksContainer">
        {tanks.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
            لا توجد خزانات مطابقة لمعايير البحث
          </div>
        ) : (
          tanks.map((tank) => (
            <TankCard key={tank.id} tank={tank} onSelect={onSelectTank} />
          ))
        )}
      </section>
    </>
  );
}
