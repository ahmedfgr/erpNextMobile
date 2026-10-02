import { VehicleBrandKey } from './fleet';

export type CostCategory = 'fuel' | 'maintenance' | 'parts' | 'all';

export interface VehicleMonthlyCost {
  vehicleId: string;
  vehicleName: string;
  plateNumber: string;
  brandKey: VehicleBrandKey;
  fuelCost: number;
  fuelLiters: number;
  maintenanceCost: number;
  maintenanceOperationsCount: number;
  totalCost: number;
}

export interface MonthlyCostReportData {
  monthId: string; // e.g. "2026-09"
  monthLabel: string; // e.g. "سبتمبر 2026"
  totalFuelCost: number;
  totalFuelLiters: number;
  totalMaintenanceCost: number;
  totalMaintenanceOperations: number;
  grandTotalCost: number;
  vehiclesCostBreakdown: VehicleMonthlyCost[];
}
