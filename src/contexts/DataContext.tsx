import React, { createContext, useContext, useState, useEffect } from 'react';
import { Package, Reservation, Vehicle, Feedback, UserRole } from '../types';
import { useAuth } from './AuthContext';

interface DataContextType {
  packages: Package[];
  vehicles: Vehicle[];
  reservations: Reservation[];
  feedback: Feedback[];
  loading: boolean;
  addReservation: (reservation: Omit<Reservation, 'id'>) => Promise<boolean>;
  cancelReservation: (id: string) => Promise<boolean>;
  addPackage: (pkg: Omit<Package, 'id'>) => Promise<boolean>;
  updatePackage: (id: string, data: Partial<Package>) => Promise<boolean>;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<boolean>;
  updateVehicle: (id: string, data: Partial<Vehicle>) => Promise<boolean>;
  addFeedback: (feedback: Omit<Feedback, 'id'>) => Promise<boolean>;
  getUserReservations: (userId: string) => Reservation[];
  getAvailableTimeSlots: (date: Date) => { time: string; instructorId: string; vehicleId: string }[];
  purchasePackage: (userId: string, packageId: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initialize sample data if it doesn't exist
    if (!localStorage.getItem('packages')) {
      const initialPackages: Package[] = [
        {
          id: 'pkg-1',
          name: 'Permis B - 20h',
          description: 'Forfait basique de 20 heures de conduite',
          price: 799,
          hours: 20,
          type: 'B',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'pkg-2',
          name: 'Permis B - 30h',
          description: 'Forfait standard de 30 heures de conduite',
          price: 1099,
          hours: 30,
          type: 'B',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'pkg-3',
          name: 'Code de la route',
          description: 'Préparation à l\'examen du code de la route',
          price: 299,
          hours: 0,
          type: 'CODE',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('packages', JSON.stringify(initialPackages));
    }

    if (!localStorage.getItem('vehicles')) {
      const initialVehicles: Vehicle[] = [
        {
          id: 'veh-1',
          model: 'Renault Clio',
          year: 2022,
          transmission: 'Manuel',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'veh-2',
          model: 'Peugeot 208',
          year: 2021,
          transmission: 'Automatique',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('vehicles', JSON.stringify(initialVehicles));
    }

    if (!localStorage.getItem('reservations')) {
      localStorage.setItem('reservations', JSON.stringify([]));
    }

    if (!localStorage.getItem('feedback')) {
      localStorage.setItem('feedback', JSON.stringify([]));
    }

    if (!localStorage.getItem('userPackages')) {
      localStorage.setItem('userPackages', JSON.stringify([]));
    }

    // Load data from localStorage
    setPackages(JSON.parse(localStorage.getItem('packages') || '[]'));
    setVehicles(JSON.parse(localStorage.getItem('vehicles') || '[]'));
    setReservations(JSON.parse(localStorage.getItem('reservations') || '[]'));
    setFeedback(JSON.parse(localStorage.getItem('feedback') || '[]'));

    setLoading(false);
  }, []);

  const addReservation = async (reservation: Omit<Reservation, 'id'>): Promise<boolean> => {
    if (!user) return false;

    const newReservation: Reservation = {
      ...reservation,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    return true;
  };

  const cancelReservation = async (id: string): Promise<boolean> => {
    if (!user) return false;

    const updatedReservations = reservations.filter(res => res.id !== id);
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    return true;
  };

  const addPackage = async (pkg: Omit<Package, 'id'>): Promise<boolean> => {
    if (!user || user.role !== UserRole.ADMIN) return false;

    const newPackage: Package = {
      ...pkg,
      id: `pkg-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updatedPackages = [...packages, newPackage];
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    return true;
  };

  const updatePackage = async (id: string, data: Partial<Package>): Promise<boolean> => {
    if (!user || user.role !== UserRole.ADMIN) return false;

    const updatedPackages = packages.map(pkg => 
      pkg.id === id ? { ...pkg, ...data } : pkg
    );
    
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    return true;
  };

  const addVehicle = async (vehicle: Omit<Vehicle, 'id'>): Promise<boolean> => {
    if (!user || user.role !== UserRole.ADMIN) return false;

    const newVehicle: Vehicle = {
      ...vehicle,
      id: `veh-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
    return true;
  };

  const updateVehicle = async (id: string, data: Partial<Vehicle>): Promise<boolean> => {
    if (!user || user.role !== UserRole.ADMIN) return false;

    const updatedVehicles = vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, ...data } : vehicle
    );
    
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
    return true;
  };

  const addFeedback = async (feedbackData: Omit<Feedback, 'id'>): Promise<boolean> => {
    if (!user) return false;

    const newFeedback: Feedback = {
      ...feedbackData,
      id: `fbk-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updatedFeedback = [...feedback, newFeedback];
    setFeedback(updatedFeedback);
    localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
    return true;
  };

  const getUserReservations = (userId: string): Reservation[] => {
    return reservations.filter(res => 
      res.clientId === userId || res.instructorId === userId
    );
  };

  const getAvailableTimeSlots = (date: Date): { time: string; instructorId: string; vehicleId: string }[] => {
    // Create a set of all available time slots
    const dateString = date.toISOString().split('T')[0];
    
    // Get all instructors
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const instructors = users.filter((u: any) => u.role === UserRole.INSTRUCTOR);
    
    // Generate all possible time slots for all instructors
    const allSlots: { time: string; instructorId: string; vehicleId: string }[] = [];
    
    instructors.forEach((instructor: any) => {
      // Each instructor can have slots from 8am to 7pm
      for (let hour = 8; hour < 19; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        
        // Each instructor randomly gets assigned to a vehicle for each slot
        const randomVehicleIndex = Math.floor(Math.random() * vehicles.length);
        
        allSlots.push({
          time,
          instructorId: instructor.id,
          vehicleId: vehicles[randomVehicleIndex]?.id || '',
        });
      }
    });
    
    // Filter out already booked slots
    const bookedSlots = reservations
      .filter(res => res.date.startsWith(dateString))
      .map(res => `${res.instructorId}-${res.time}`);
    
    return allSlots.filter(slot => 
      !bookedSlots.includes(`${slot.instructorId}-${slot.time}`)
    );
  };

  const purchasePackage = async (userId: string, packageId: string): Promise<boolean> => {
    if (!user) return false;
    
    const userPackages = JSON.parse(localStorage.getItem('userPackages') || '[]');
    
    userPackages.push({
      userId,
      packageId,
      purchaseDate: new Date().toISOString(),
      hoursUsed: 0,
    });
    
    localStorage.setItem('userPackages', JSON.stringify(userPackages));
    return true;
  };

  return (
    <DataContext.Provider value={{
      packages,
      vehicles,
      reservations,
      feedback,
      loading,
      addReservation,
      cancelReservation,
      addPackage,
      updatePackage,
      addVehicle,
      updateVehicle,
      addFeedback,
      getUserReservations,
      getAvailableTimeSlots,
      purchasePackage,
    }}>
      {children}
    </DataContext.Provider>
  );
};