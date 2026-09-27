'use client';

import React, { useState } from 'react';
import { Download, Share } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showGenericGuide, setShowGenericGuide] = useState(false);

  // If already installed and running in standalone mode, suppress button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111928] hover:bg-slate-800 text-white rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer"
        title="تثبيت التطبيق على جهازك"
      >
        <Download className="w-3.5 h-3.5 text-amber-400" />
        <span>تثبيت التطبيق</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold transition-all cursor-pointer border border-slate-200/80"
          title="تثبيت التطبيق على أجهزة آبل"
        >
          <Share className="w-3.5 h-3.5 text-slate-600" />
          <span>تثبيت PWA</span>
        </button>

        {showIOSGuide && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowIOSGuide(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-right"
          >
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900">تثبيت التطبيق على iPhone / iPad</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="mt-4 space-y-3 text-xs text-slate-600 font-semibold leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                    1
                  </span>
                  <p>
                    اضغط على زر <strong>مشاركة (Share)</strong> في شريط متصفح Safari السفلي.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                    2
                  </span>
                  <p>
                    مرر لأسفل واختر <strong>إضافة إلى الصفحة الرئيسية (Add to Home Screen)</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                    3
                  </span>
                  <p>
                    اضغط <strong>إضافة (Add)</strong> لتشغيل التطبيق مثل تطبيق أصلي بدون متصفح.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-2xl bg-[#111928] py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
              >
                فهمت ذلك
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Generic fallback install guide button for other browsers / environments
  return (
    <>
      <button
        onClick={() => setShowGenericGuide(true)}
        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold transition-all cursor-pointer border border-slate-200"
        title="تثبيت التطبيق كـ PWA"
      >
        <Download className="w-3.5 h-3.5 text-slate-500" />
        <span>تثبيت PWA</span>
      </button>

      {showGenericGuide && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowGenericGuide(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-right"
        >
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">تثبيت تطبيق NAFA</h3>
              <button
                onClick={() => setShowGenericGuide(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 text-xs"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-600 font-semibold leading-relaxed">
              لتثبيت التطبيق على جهاز الكمبيوتر أو الجوال، اضغط على أيقونة التثبيت (🖥️ أو ⬇️) الموجودة في شريط عنوان المتصفح أو اختر <strong>تثبيت التطبيق</strong> من قائمة المتصفح.
            </p>
            <button
              onClick={() => setShowGenericGuide(false)}
              className="mt-5 w-full rounded-2xl bg-[#111928] py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
            >
              حسناً
            </button>
          </div>
        </div>
      )}
    </>
  );
}
