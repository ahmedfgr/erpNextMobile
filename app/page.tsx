'use client';

import React, { useState } from 'react';
import { Tank, TankCategory } from '@/types/tank';
import { Vehicle, TripMission, DriverInfo } from '@/types/fleet';
import { TANKS_DATA } from '@/data/tanks-data';
import { INITIAL_VEHICLES, INITIAL_DRIVERS } from '@/data/fleet-data';
import { Header, MainNavTab } from '@/components/Header';
import { PageHeader } from '@/components/PageHeader';
import { KpiGrid } from '@/components/KpiGrid';
import { FuelSection } from '@/components/FuelSection';
import { OperationsTable } from '@/components/OperationsTable';
import { TankModal } from '@/components/TankModal';
import { ToastNotification } from '@/components/ToastNotification';
import { BottomNav } from '@/components/BottomNav';
import { OfflineIndicator } from '@/components/OfflineIndicator';

// Fleet Components
import { FleetKpiGrid } from '@/components/fleet/FleetKpiGrid';
import { FleetSection } from '@/components/fleet/FleetSection';
import { VehicleDetailsModal } from '@/components/fleet/VehicleDetailsModal';
import { AddVehicleModal } from '@/components/fleet/AddVehicleModal';
import { CreateMissionModal } from '@/components/fleet/CreateMissionModal';

// Drivers Components
import { DriversSection } from '@/components/drivers/DriversSection';
import { AddDriverModal } from '@/components/drivers/AddDriverModal';

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState<MainNavTab>('tanks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TankCategory>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Tanks State
  const [tanksList, setTanksList] = useState<Tank[]>(TANKS_DATA);
  const [activeModalTank, setActiveModalTank] = useState<Tank | null>(null);

  // Fleet State
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isCreateMissionOpen, setIsCreateMissionOpen] = useState(false);

  // Drivers State
  const [drivers, setDrivers] = useState<DriverInfo[]>(INITIAL_DRIVERS);
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
    showNotification(
      currentTab === 'tanks'
        ? 'جاري مزامنة مؤشرات الخزانات والضغط...'
        : currentTab === 'fleet'
        ? 'جاري تحديث بيانات وتتبع الشاحنات والمأموريات...'
        : 'جاري تحديث سجلات السائقين وتوزيع الرحلات...'
    );
  };

  // Actions for Fleet
  const handleAddVehicle = (newVehicleData: Partial<Vehicle>) => {
    const newVehicle = newVehicleData as Vehicle;
    setVehicles((prev) => [newVehicle, ...prev]);

    // If assigned to a driver, link it in drivers list
    if (newVehicle.driver) {
      setDrivers((prevDrivers) =>
        prevDrivers.map((d) =>
          d.id === newVehicle.driver?.id
            ? {
                ...d,
                assignedVehicleId: newVehicle.id,
                assignedVehicleName: newVehicle.name,
                assignedVehiclePlate: newVehicle.plateNumber,
                assignedVehicleBrandKey: newVehicle.brandKey,
              }
            : d
        )
      );
    }

    showNotification(`تم تسجيل الشاحنة (${newVehicle.code} - ${newVehicle.plateNumber}) في الأسطول بنجاح`);
  };

  const handleCreateMission = (vehicleId: string, mission: TripMission) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId) {
          return {
            ...v,
            status: 'on_mission',
            recentMissions: [mission, ...v.recentMissions],
          };
        }
        return v;
      })
    );

    // Update driver status to on_mission
    setDrivers((prevDrivers) =>
      prevDrivers.map((d) =>
        d.assignedVehicleId === vehicleId ? { ...d, status: 'on_mission' } : d
      )
    );

    showNotification(`تم إصدار تصريح المأمورية بنجاح للمركبة إلى: ${mission.destination}`);
  };

  const handleRefuel = (vehicleId: string, tankId: string, liters: number) => {
    // 1. Update Tank in inventory
    setTanksList((prevTanks) =>
      prevTanks.map((t) => {
        if (t.id === tankId) {
          const currentNumeric = parseInt(t.currentAmount.replace(/,/g, ''), 10);
          const newNumeric = Math.max(0, currentNumeric - liters);
          return {
            ...t,
            currentAmount: newNumeric.toLocaleString(),
          };
        }
        return t;
      })
    );

    // 2. Update Vehicle fuel
    setVehicles((prevVehicles) =>
      prevVehicles.map((v) => {
        if (v.id === vehicleId) {
          const newFuel = Math.min(v.fuelCapacityLiters, v.currentFuelLiters + liters);
          const updated = {
            ...v,
            currentFuelLiters: newFuel,
          };
          if (selectedVehicle?.id === vehicleId) {
            setSelectedVehicle(updated);
          }
          return updated;
        }
        return v;
      })
    );

    showNotification(`تم بنجاح تزويد المركبة بـ ${liters} لتر وخصمها من الخزان المخزني`);
  };

  const handleMaintenance = (
    vehicleId: string,
    issue: string,
    priority: 'low' | 'medium' | 'high' | 'critical',
    partsText: string
  ) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((v) => {
        if (v.id === vehicleId) {
          const updated: Vehicle = {
            ...v,
            status: 'maintenance',
            maintenanceHistory: [
              {
                id: `MNT-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                issueDescription: issue,
                priority,
                status: 'in_progress',
                warehousePartsRequired: [
                  {
                    partName: partsText || 'قطع مستودع عامة',
                    partCode: 'WH-PRT',
                    quantity: 1,
                  },
                ],
              },
              ...v.maintenanceHistory,
            ],
          };
          if (selectedVehicle?.id === vehicleId) {
            setSelectedVehicle(updated);
          }
          return updated;
        }
        return v;
      })
    );

    showNotification(`تم تسجيل أمر الصيانة وحجز القطع من مستودع الشاحنات`);
  };

  // Actions for Drivers
  const handleAddDriver = (newDriver: DriverInfo) => {
    setDrivers((prev) => [newDriver, ...prev]);

    // If driver was assigned a vehicle, update the vehicle driver
    if (newDriver.assignedVehicleId) {
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) =>
          v.id === newDriver.assignedVehicleId ? { ...v, driver: newDriver } : v
        )
      );
    }

    showNotification(`تمت إضافة وتعيين السائق (${newDriver.name}) بنجاح`);
  };

  const handleCallDriver = (driver: DriverInfo) => {
    showNotification(`جاري الاتصال بالسائق ${driver.name} على الرقم (${driver.phone})...`);
  };

  const handleSelectVehicleFromDriver = (vehicleId: string) => {
    const v = vehicles.find((item) => item.id === vehicleId);
    if (v) {
      setSelectedVehicle(v);
    }
  };

  // Filtered Tanks for Tanks Tab
  const filteredTanks = tanksList.filter((tank) => {
    const matchesCategory = selectedCategory === 'all' || tank.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      tank.name.toLowerCase().includes(q) ||
      tank.id.toLowerCase().includes(q) ||
      tank.type.toLowerCase().includes(q) ||
      tank.subTitle.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  // Filtered Vehicles for Fleet Tab
  const filteredVehicles = vehicles.filter((v) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.code.toLowerCase().includes(q) ||
      v.plateNumber.toLowerCase().includes(q) ||
      v.brand.toLowerCase().includes(q) ||
      (v.driver && v.driver.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Header Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onShowNotification={showNotification}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 sm:pb-32 space-y-6">
        {/* Page Title & Controls */}
        <PageHeader
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />

        {/* Dynamic View: Tanks vs Fleet vs Drivers */}
        {currentTab === 'tanks' && (
          <>
            {/* 4 KPI Metrics Cards */}
            <KpiGrid onShowNotification={showNotification} />

            {/* Fuel Tanks Section */}
            <FuelSection
              tanks={filteredTanks}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectTank={setActiveModalTank}
            />

            {/* Recent Operations & Inventory Log */}
            <OperationsTable onShowNotification={showNotification} />
          </>
        )}

        {currentTab === 'fleet' && (
          <>
            {/* Fleet KPI Metrics Grid */}
            <FleetKpiGrid vehicles={vehicles} />

            {/* Fleet & Vehicles Section */}
            <FleetSection
              vehicles={filteredVehicles}
              onSelectVehicle={setSelectedVehicle}
              onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
              onOpenCreateMission={() => setIsCreateMissionOpen(true)}
            />
          </>
        )}

        {currentTab === 'drivers' && (
          <DriversSection
            drivers={drivers}
            vehicles={vehicles}
            onOpenAddDriver={() => setIsAddDriverOpen(true)}
            onCallDriver={handleCallDriver}
            onSelectVehicle={handleSelectVehicleFromDriver}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onShowNotification={showNotification}
      />

      {/* Sensor / Tank Details Modal */}
      <TankModal
        tank={activeModalTank}
        onClose={() => setActiveModalTank(null)}
        onShowNotification={showNotification}
      />

      {/* Vehicle Details Modal */}
      <VehicleDetailsModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onRefuel={handleRefuel}
        onMaintenance={handleMaintenance}
      />

      {/* Add Vehicle Modal */}
      <AddVehicleModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        onAddVehicle={handleAddVehicle}
      />

      {/* Create Mission Modal */}
      <CreateMissionModal
        isOpen={isCreateMissionOpen}
        vehicles={vehicles}
        onClose={() => setIsCreateMissionOpen(false)}
        onCreateMission={handleCreateMission}
      />

      {/* Add Driver Modal */}
      <AddDriverModal
        isOpen={isAddDriverOpen}
        vehicles={vehicles}
        onClose={() => setIsAddDriverOpen(false)}
        onAddDriver={handleAddDriver}
      />

      {/* Toast Notification Alert */}
      <ToastNotification message={toastMessage} />

      {/* Offline Status Warning Banner */}
      <OfflineIndicator />
    </div>
  );
}
