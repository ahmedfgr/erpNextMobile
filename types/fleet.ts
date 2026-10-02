export type VehicleType = 'heavy_truck' | 'fuel_tanker' | 'equipment' | 'service_car';

export type WeightCategory = 'heavy' | 'medium' | 'light';

export type VehicleBrandKey = 'mercedes' | 'volvo' | 'toyota' | 'caterpillar' | 'hyundai' | 'man' | 'isuzu';

export type VehicleStatus = 'available' | 'on_mission' | 'maintenance';

export type DriverStatus = 'available' | 'on_mission' | 'on_leave';

export interface DriverInfo {
  id: string; // Used internally, hidden from UI
  name: string;
  phone: string;
  nationalId: string;
  licenseNumber: string;
  avatarUrl: string;
  status: DriverStatus;
  joinDate: string;
  assignedVehicleId?: string;
  assignedVehicleName?: string;
  assignedVehiclePlate?: string;
  assignedVehicleBrandKey?: VehicleBrandKey;
  experienceYears: number;
}

export interface RefuelingRecord {
  id: string;
  tankId: string;
  tankName: string;
  liters: number;
  date: string;
  time?: string;
  cost: number;
  fuelType: string;
  odometerReading: number;
}

export interface MaintenanceRequest {
  id: string;
  date: string;
  time?: string;
  issueDescription: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed';
  warehousePartsRequired: {
    partName: string;
    partCode: string;
    quantity: number;
  }[];
  costEstimate?: number;
}

export interface TripMission {
  id: string;
  destination: string;
  purpose: string;
  cargoType: string;
  cargoWeightTon: number;
  driverName: string;
  departureDate: string;
  expectedReturnDate: string;
  status: 'active' | 'completed' | 'scheduled';
  startOdometer: number;
  endOdometer?: number;
}

export interface Vehicle {
  id: string;
  code: string;
  plateNumber: string;
  name: string;
  brand: string;
  brandKey: VehicleBrandKey;
  weightCategory: WeightCategory;
  modelYear: number;
  type: VehicleType;
  description: string;
  status: VehicleStatus;
  driver?: DriverInfo;
  
  // Fuel & Tank Specs
  fuelCapacityLiters: number;
  currentFuelLiters: number;
  fuelType: 'ديزل ممتاز' | 'بنزين 95' | 'ديزل صناعي';
  fuelEfficiencyKmPerLiter: number;
  
  // Odometer & Specs
  odometerKm: number;
  maxLoadTon: number;
  lastServiceDate: string;
  nextServiceKm: number;
  
  // Relations
  recentMissions: TripMission[];
  maintenanceHistory: MaintenanceRequest[];
  refuelHistory: RefuelingRecord[];
}
