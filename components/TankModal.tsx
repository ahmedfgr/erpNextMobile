'use client';

import React from 'react';
import { Tank } from '@/types/tank';
import { getLiquidY } from '@/data/tanks-data';

interface TankModalProps {
  tank: Tank | null;
  onClose: () => void;
  onShowNotification: (msg: string) => void;
}

export function TankModal({ tank, onClose, onShowNotification }: TankModalProps) {
  if (!tank) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
    >
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-start pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-slate-900">خزان {tank.type}</h3>
              <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-700">
                {tank.id}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              بيانات الاستشعار والحساسات الفورية (IoT Telemetry)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Live Tank Animation in Modal */}
        <div className="relative w-full h-28 my-3 flex items-center justify-center bg-slate-50/60 rounded-2xl border border-slate-100 p-2">
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="104" width="22" height="12" rx="2" fill="#475569" />
            <rect x="143" y="104" width="22" height="12" rx="2" fill="#475569" />
            <line x1="25" y1="116" x2="175" y2="116" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

            <rect x="25" y="24" width="150" height="82" rx="38" fill={`url(#tankGrad-modal-${tank.id})`} stroke="#cbd5e1" strokeWidth="2" />

            <clipPath id={`liquidClip-modal-${tank.id}`}>
              <rect x="26" y="25" width="148" height="80" rx="37" />
            </clipPath>
            <g clipPath={`url(#liquidClip-modal-${tank.id})`}>
              <g className="liquid-wave-back" opacity="0.6">
                <path
                  d={`M -40 ${getLiquidY(tank.percentage) + 3} Q 10 ${getLiquidY(tank.percentage) - 5} 60 ${getLiquidY(tank.percentage) + 3} T 160 ${getLiquidY(tank.percentage) + 3} T 260 ${getLiquidY(tank.percentage) + 3} L 260 115 L -40 115 Z`}
                  fill={
                    tank.category === 'diesel'
                      ? `url(#dieselLiquid-${tank.id})`
                      : tank.id === 'F-002'
                      ? `url(#petrolLiquid-${tank.id})`
                      : tank.id === 'F-003'
                      ? `url(#superLiquid-${tank.id})`
                      : `url(#blueLiquid-${tank.id})`
                  }
                />
              </g>
              <g className="liquid-wave-front" opacity="0.95">
                <path
                  d={`M -40 ${getLiquidY(tank.percentage)} Q 15 ${getLiquidY(tank.percentage) + 5} 70 ${getLiquidY(tank.percentage)} T 180 ${getLiquidY(tank.percentage)} T 290 ${getLiquidY(tank.percentage)} L 290 115 L -40 115 Z`}
                  fill={
                    tank.category === 'diesel'
                      ? `url(#dieselLiquid-${tank.id})`
                      : tank.id === 'F-002'
                      ? `url(#petrolLiquid-${tank.id})`
                      : tank.id === 'F-003'
                      ? `url(#superLiquid-${tank.id})`
                      : `url(#blueLiquid-${tank.id})`
                  }
                />
              </g>
              <circle cx="55" cy={Math.min(95, getLiquidY(tank.percentage) + 25)} r="2" fill="white" className="bubble-1" opacity="0.6" />
              <circle cx="115" cy={Math.min(98, getLiquidY(tank.percentage) + 32)} r="2.5" fill="white" className="bubble-2" opacity="0.5" />
              <circle cx="145" cy={Math.min(96, getLiquidY(tank.percentage) + 20)} r="1.5" fill="white" className="bubble-3" opacity="0.7" />
            </g>

            <path d="M 68 25 V 105" stroke="#94a3b8" strokeWidth="2.5" opacity="0.6" />
            <path d="M 132 25 V 105" stroke="#94a3b8" strokeWidth="2.5" opacity="0.6" />
            <line x1="96" y1="18" x2="96" y2="104" stroke="#64748b" strokeWidth="1.8" />
            <line x1="104" y1="18" x2="104" y2="104" stroke="#64748b" strokeWidth="1.8" />

            <defs>
              <linearGradient id={`tankGrad-modal-${tank.id}`} x1="100" y1="20" x2="100" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f8fafc" />
                <stop offset="0.3" stopColor="#e2e8f0" />
                <stop offset="0.7" stopColor="#cbd5e1" />
                <stop offset="1" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Live metrics grid inside modal */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 block">الكمية المتاحة</span>
            <span className="text-base font-black text-slate-900 mt-1 block">
              {tank.currentAmount} لتر ({tank.percentage}%)
            </span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 block">درجة الحرارة</span>
            <span className="text-base font-black text-slate-900 mt-1 block font-mono">
              {tank.temp}
            </span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold text-slate-400 block">معدل التدفق</span>
            <span className="text-base font-black text-slate-900 mt-1 block font-mono">
              {tank.flowRate}
            </span>
          </div>
        </div>

        <div className="space-y-2.5 text-xs font-semibold text-slate-600 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
          <div className="flex justify-between">
            <span className="text-slate-400">السعة التصميمية القصوى:</span>
            <span className="text-slate-800 font-bold">{tank.totalCapacity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">آخر فحص معايرة وجودة:</span>
            <span className="text-slate-800 font-bold">أمس 14:00 - مطابق للمواصفات</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">نظام الإطفاء التلقائي:</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> نشط وجاهز
            </span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => {
              onClose();
              onShowNotification('تم إرسال أمر التوريد إلى غرفة التحكم بنجاح');
            }}
            className="flex-1 py-3 bg-[#111928] hover:bg-slate-800 text-white rounded-2xl font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            طلب توريد إضافي
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition-all cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
