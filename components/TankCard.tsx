'use client';

import React from 'react';
import { Tank } from '@/types/tank';
import { getLiquidY } from '@/data/tanks-data';

interface TankCardProps {
  tank: Tank;
  onSelect: (tank: Tank) => void;
}

export function TankCard({ tank, onSelect }: TankCardProps) {
  return (
    <div
      onClick={() => onSelect(tank)}
      className="tank-card rounded-3xl p-5 flex flex-col justify-between h-[340px] relative overflow-hidden group cursor-pointer"
    >
      {/* Tank Top Info */}
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
              {tank.name}
            </h3>
            <span className="text-xs text-slate-400 font-mono font-bold">{tank.subTitle}</span>
          </div>
          {/* Percentage Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/70 text-xs font-bold text-slate-800 shadow-sm">
            <span className={`w-2 h-2 rounded-full ${tank.dotColorClass} ${tank.percentage > 70 ? 'animate-pulse' : ''}`}></span>
            <span className="font-sans font-black">{tank.percentage}%</span>
          </div>
        </div>

        {/* Tank 3D-style SVG Illustration */}
        <div className="relative w-full h-32 my-2 flex items-center justify-center">
          <svg className="w-full h-full drop-shadow-md group-hover:scale-105 transition-transform duration-300" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="104" width="22" height="12" rx="2" fill="#475569" />
            <rect x="143" y="104" width="22" height="12" rx="2" fill="#475569" />
            <line x1="25" y1="116" x2="175" y2="116" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

            {/* Outer shell */}
            <rect x="25" y="24" width="150" height="82" rx="38" fill={`url(#tankGrad-${tank.id})`} stroke="#cbd5e1" strokeWidth="2" />

            {/* Liquid Clip with Animated Waves and Bubbles */}
            <clipPath id={`liquidClip-${tank.id}`}>
              <rect x="26" y="25" width="148" height="80" rx="37" />
            </clipPath>
            <g clipPath={`url(#liquidClip-${tank.id})`}>
              {/* Background secondary wave for depth */}
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

              {/* Foreground primary animated wave */}
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

              {/* Top specular shine / fluid crest reflection */}
              <path
                d={`M 30 ${Math.max(30, getLiquidY(tank.percentage) + 2)} Q 100 ${Math.max(26, getLiquidY(tank.percentage) - 4)} 170 ${Math.max(30, getLiquidY(tank.percentage) + 2)}`}
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* Micro Bubbles inside fluid */}
              <circle cx="55" cy={Math.min(95, getLiquidY(tank.percentage) + 25)} r="2" fill="white" className="bubble-1" opacity="0.6" />
              <circle cx="115" cy={Math.min(98, getLiquidY(tank.percentage) + 32)} r="2.5" fill="white" className="bubble-2" opacity="0.5" />
              <circle cx="145" cy={Math.min(96, getLiquidY(tank.percentage) + 20)} r="1.5" fill="white" className="bubble-3" opacity="0.7" />
            </g>

            {/* Metal rings & ladder */}
            <path d="M 68 25 V 105" stroke="#94a3b8" strokeWidth="2.5" opacity="0.6" />
            <path d="M 132 25 V 105" stroke="#94a3b8" strokeWidth="2.5" opacity="0.6" />
            <path d="M 94 18 H 106" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="96" y1="18" x2="96" y2="104" stroke="#64748b" strokeWidth="1.8" />
            <line x1="104" y1="18" x2="104" y2="104" stroke="#64748b" strokeWidth="1.8" />
            <line x1="96" y1="32" x2="104" y2="32" stroke="#64748b" strokeWidth="1.5" />
            <line x1="96" y1="50" x2="104" y2="50" stroke="#64748b" strokeWidth="1.5" />
            <line x1="96" y1="68" x2="104" y2="68" stroke="#64748b" strokeWidth="1.5" />
            <line x1="96" y1="86" x2="104" y2="86" stroke="#64748b" strokeWidth="1.5" />

            <defs>
              <linearGradient id={`tankGrad-${tank.id}`} x1="100" y1="20" x2="100" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f8fafc" />
                <stop offset="0.3" stopColor="#e2e8f0" />
                <stop offset="0.7" stopColor="#cbd5e1" />
                <stop offset="1" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id={`dieselLiquid-${tank.id}`} x1="100" y1="44" x2="100" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="0.5" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id={`petrolLiquid-${tank.id}`} x1="100" y1="64" x2="100" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fb7185" />
                <stop offset="0.4" stopColor="#f43f5e" />
                <stop offset="1" stopColor="#e11d48" />
              </linearGradient>
              <linearGradient id={`superLiquid-${tank.id}`} x1="100" y1="36" x2="100" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="0.5" stopColor="#10b981" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
              <linearGradient id={`blueLiquid-${tank.id}`} x1="100" y1="52" x2="100" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60a5fa" />
                <stop offset="0.5" stopColor="#3b82f6" />
                <stop offset="1" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Tank Bottom Data */}
      <div className="relative pt-2">
        <div
          className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-xl pointer-events-none ${
            tank.category === 'diesel'
              ? 'bg-gradient-to-tr from-amber-400/25 to-amber-200/40'
              : tank.id === 'F-002'
              ? 'bg-gradient-to-tr from-rose-400/25 to-rose-200/40'
              : tank.id === 'F-003'
              ? 'bg-gradient-to-tr from-emerald-400/25 to-teal-200/40'
              : 'bg-gradient-to-tr from-blue-400/25 to-sky-200/40'
          }`}
        ></div>
        <div className="relative z-10 flex flex-col items-start w-full">
          <span className="text-2xl font-black text-slate-900 leading-none">{tank.currentAmount}</span>
          <div className="flex items-center justify-between w-full mt-1.5 text-xs text-slate-400 font-semibold">
            <span>لتر متاح</span>
            <span>من {tank.totalCapacity}</span>
          </div>
          <div className="w-full mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span className={tank.statusColorClass}>{tank.statusText}</span>
            <span className="hover:text-slate-900">تفاصيل الخزان ←</span>
          </div>
        </div>
      </div>
    </div>
  );
}
