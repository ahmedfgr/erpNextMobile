'use client';

import React from 'react';
import { VehicleBrandKey } from '@/types/fleet';

interface BrandLogoProps {
  brandKey: VehicleBrandKey;
  className?: string;
  size?: number;
}

export function BrandLogo({ brandKey, className = '', size = 28 }: BrandLogoProps) {
  switch (brandKey) {
    case 'mercedes':
      // Mercedes-Benz iconic 3-point star in circle
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
        >
          <circle cx="50" cy="50" r="44" />
          <path d="M50 10 L50 50 L18 78" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 50 L82 78" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 10 L46 48 L18 78 L50 54 L82 78 L54 48 Z" fill="currentColor" opacity="0.9" />
        </svg>
      );

    case 'toyota':
      // Toyota classic 3-oval emblem
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke="currentColor"
        >
          <ellipse cx="50" cy="50" rx="44" ry="32" strokeWidth="6" />
          <ellipse cx="50" cy="38" rx="22" ry="12" strokeWidth="6" />
          <path d="M50 26 C43 38 43 65 50 78 C57 65 57 38 50 26 Z" fill="currentColor" />
        </svg>
      );

    case 'volvo':
      // Volvo diagonal arrow through circle
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke="currentColor"
        >
          <circle cx="48" cy="52" r="36" strokeWidth="7" />
          <path d="M48 52 L82 18" strokeWidth="8" strokeLinecap="round" />
          <polyline points="66,18 82,18 82,34" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="22" y="44" width="52" height="16" rx="3" fill="currentColor" />
          <text x="48" y="56" fill="#fff" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            VOLVO
          </text>
        </svg>
      );

    case 'caterpillar':
      // Caterpillar CAT bold lettering with yellow triangle
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
        >
          <polygon points="12,74 88,74 50,22" fill="#FDB813" />
          <rect x="6" y="52" width="88" height="30" rx="5" fill="#111" />
          <text
            x="50"
            y="73"
            fill="#FDB813"
            fontSize="22"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="Arial Black, Impact, sans-serif"
            letterSpacing="1"
          >
            CAT
          </text>
        </svg>
      );

    case 'hyundai':
      // Hyundai slanted oval with stylized 'H'
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke="currentColor"
        >
          <ellipse cx="50" cy="50" rx="44" ry="30" strokeWidth="6" transform="rotate(-15 50 50)" />
          <path
            d="M32 68 C38 48 38 32 36 28 C48 42 62 42 68 32 C66 48 66 65 72 70"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M36 50 C46 47 54 47 67 48" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'man':
      // MAN truck logo
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="currentColor"
        >
          <rect x="8" y="32" width="84" height="36" rx="6" fill="#1f2937" />
          <text
            x="50"
            y="58"
            fill="#ffffff"
            fontSize="20"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            letterSpacing="2"
          >
            MAN
          </text>
          <path d="M25 72 L75 72" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'isuzu':
      // Isuzu two pillar stylized red logo
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
        >
          <path d="M30 25 L45 25 L45 75 L30 75 Z" fill="#E50012" />
          <path d="M55 25 L70 25 L70 75 L55 75 Z" fill="#E50012" />
          <rect x="18" y="70" width="64" height="8" rx="2" fill="#111" />
        </svg>
      );

    default:
      return (
        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-700">
          LOG
        </div>
      );
  }
}
