import { Tank } from '@/types/tank';

export const TANKS_DATA: Tank[] = [
  {
    id: 'F-001',
    name: 'ديزل',
    subTitle: 'F-001 • خزان رئيسي',
    category: 'diesel',
    percentage: 78,
    currentAmount: '78,000',
    totalCapacity: '100,000 لتر',
    statusText: '● الضخ طبيعي',
    statusColorClass: 'text-emerald-600',
    dotColorClass: 'bg-[#10b981]',
    temp: '24.5°C',
    flowRate: '950 لتر/ساعة',
    type: 'ديزل ممتاز',
  },
  {
    id: 'F-002',
    name: 'بنزين 91',
    subTitle: 'F-002 • مضخة A',
    category: 'gasoline',
    percentage: 45,
    currentAmount: '45,000',
    totalCapacity: '100,000 لتر',
    statusText: '● يحتاج مراقبة',
    statusColorClass: 'text-amber-600',
    dotColorClass: 'bg-[#f59e0b]',
    temp: '23.8°C',
    flowRate: '620 لتر/ساعة',
    type: 'بنزين 91',
  },
  {
    id: 'F-003',
    name: 'بنزين 95',
    subTitle: 'F-003 • مضخة B',
    category: 'gasoline',
    percentage: 88,
    currentAmount: '88,500',
    totalCapacity: '100,000 لتر',
    statusText: '● سعة ممتازة',
    statusColorClass: 'text-emerald-600',
    dotColorClass: 'bg-[#10b981]',
    temp: '22.1°C',
    flowRate: '1,100 لتر/ساعة',
    type: 'بنزين 95 سوبر',
  },
  {
    id: 'F-004',
    name: 'زيت هيدروليك',
    subTitle: 'F-004 • مخزن المواد',
    category: 'heavy',
    percentage: 64,
    currentAmount: '32,000',
    totalCapacity: '50,000 لتر',
    statusText: '● توريد صناعي',
    statusColorClass: 'text-blue-600',
    dotColorClass: 'bg-[#3b82f6]',
    temp: '28.0°C',
    flowRate: '300 لتر/ساعة',
    type: 'زيت هيدروليك 68',
  },
];

// Helper to calculate wave liquid Y position based on percentage (25px is 100%, 105px is 0%)
export function getLiquidY(percentage: number): number {
  const topY = 28;
  const bottomY = 100;
  return Math.round(bottomY - ((percentage / 100) * (bottomY - topY)));
}
