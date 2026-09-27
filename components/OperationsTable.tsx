'use client';

import React from 'react';

interface OperationsTableProps {
  onShowNotification: (msg: string) => void;
}

export function OperationsTable({ onShowNotification }: OperationsTableProps) {
  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-lg font-black text-slate-900">سجل حركات المواد والوقود الأخيرة</h3>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            عمليات التعبئة، الصرف، وفحص الجودة خلال الـ 24 ساعة الماضية
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowNotification('جاري تحميل التقرير الكامل بصيغة PDF')}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            تحميل PDF
          </button>
          <button
            onClick={() => onShowNotification('تم تحديث جدول الحركات')}
            className="px-3.5 py-1.5 bg-[#111928] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            إضافة حركة جديدة +
          </button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="text-slate-400 font-bold border-b border-slate-100 pb-3">
              <th className="py-3 px-3">رقم العملية</th>
              <th className="py-3 px-3">المادة / الخزان</th>
              <th className="py-3 px-3">نوع الحركة</th>
              <th className="py-3 px-3">الكمية</th>
              <th className="py-3 px-3">المشرف المسؤول</th>
              <th className="py-3 px-3">الوقت</th>
              <th className="py-3 px-3 text-center">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            <tr className="hover:bg-slate-50/80 transition-colors">
              <td className="py-3.5 px-3 font-mono font-bold text-slate-900">#TRX-8821</td>
              <td className="py-3.5 px-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="font-bold">ديزل ممتاز (F-001)</span>
              </td>
              <td className="py-3.5 px-3 text-emerald-600 font-bold">تعبئة وتوريد</td>
              <td className="py-3.5 px-3 font-bold text-slate-900">12,000 لتر</td>
              <td className="py-3.5 px-3 text-slate-600">أحمد الغامدي</td>
              <td className="py-3.5 px-3 text-slate-400">اليوم 06:45 ص</td>
              <td className="py-3.5 px-3 text-center">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  مكتملة
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition-colors">
              <td className="py-3.5 px-3 font-mono font-bold text-slate-900">#TRX-8820</td>
              <td className="py-3.5 px-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="font-bold">بنزين 91 (F-002)</span>
              </td>
              <td className="py-3.5 px-3 text-amber-600 font-bold">صرف أسطول النقل</td>
              <td className="py-3.5 px-3 font-bold text-slate-900">3,450 لتر</td>
              <td className="py-3.5 px-3 text-slate-600">سالم القحطاني</td>
              <td className="py-3.5 px-3 text-slate-400">اليوم 05:12 ص</td>
              <td className="py-3.5 px-3 text-center">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  مكتملة
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition-colors">
              <td className="py-3.5 px-3 font-mono font-bold text-slate-900">#TRX-8819</td>
              <td className="py-3.5 px-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="font-bold">فلاتر زيت صناعية (P-104)</span>
              </td>
              <td className="py-3.5 px-3 text-purple-600 font-bold">صرف صيانة دورية</td>
              <td className="py-3.5 px-3 font-bold text-slate-900">18 وحدة</td>
              <td className="py-3.5 px-3 text-slate-600">خالد العمري</td>
              <td className="py-3.5 px-3 text-slate-400">أمس 11:30 م</td>
              <td className="py-3.5 px-3 text-center">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                  مسجلة
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
