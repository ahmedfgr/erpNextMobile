export interface Tank {
  id: string;
  name: string;
  subTitle: string;
  category: 'diesel' | 'gasoline' | 'heavy';
  percentage: number;
  currentAmount: string;
  totalCapacity: string;
  statusText: string;
  statusColorClass: string;
  dotColorClass: string;
  temp: string;
  flowRate: string;
  type: string;
}

export type TankCategory = 'all' | 'diesel' | 'gasoline' | 'heavy';
