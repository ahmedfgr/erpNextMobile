import { Vehicle } from '@/types/fleet';
import { MonthlyCostReportData, VehicleMonthlyCost } from '@/types/cost-reports';

export function computeMonthlyCostReport(
  vehicles: Vehicle[],
  monthId: string = '2026-09',
  monthLabel: string = 'سبتمبر 2026'
): MonthlyCostReportData {
  let totalFuelCost = 0;
  let totalFuelLiters = 0;
  let totalMaintenanceCost = 0;
  let totalMaintenanceOperations = 0;

  const vehiclesCostBreakdown: VehicleMonthlyCost[] = vehicles.map((v) => {
    // Fuel costs for the target month
    const matchingRefuels = (v.refuelHistory || []).filter((r) =>
      r.date.startsWith(monthId)
    );
    const vehicleFuelCost = matchingRefuels.reduce((sum, r) => sum + r.cost, 0);
    const vehicleFuelLiters = matchingRefuels.reduce((sum, r) => sum + r.liters, 0);

    // Maintenance costs for the target month
    const matchingMaintenances = (v.maintenanceHistory || []).filter((m) =>
      m.date.startsWith(monthId)
    );
    const vehicleMaintCost = matchingMaintenances.reduce(
      (sum, m) => sum + (m.costEstimate || 0),
      0
    );

    totalFuelCost += vehicleFuelCost;
    totalFuelLiters += vehicleFuelLiters;
    totalMaintenanceCost += vehicleMaintCost;
    totalMaintenanceOperations += matchingMaintenances.length;

    return {
      vehicleId: v.id,
      vehicleName: v.name,
      plateNumber: v.plateNumber,
      brandKey: v.brandKey || 'mercedes',
      fuelCost: vehicleFuelCost,
      fuelLiters: vehicleFuelLiters,
      maintenanceCost: vehicleMaintCost,
      maintenanceOperationsCount: matchingMaintenances.length,
      totalCost: vehicleFuelCost + vehicleMaintCost,
    };
  });

  return {
    monthId,
    monthLabel,
    totalFuelCost,
    totalFuelLiters,
    totalMaintenanceCost,
    totalMaintenanceOperations,
    grandTotalCost: totalFuelCost + totalMaintenanceCost,
    vehiclesCostBreakdown,
  };
}
