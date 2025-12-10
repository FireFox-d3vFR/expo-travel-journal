import React, { createContext, useContext, useState } from 'react';
import { Trip, MOCK_TRIPS } from '@/constants/trips';

type TripsContextType = {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export function TripsProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);

  const addTrip = (tripData: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      id: String(Date.now()), // simple id pour l’instant
      ...tripData,
    };
    // on ajoute le dernier voyage en haut de la liste
    setTrips((prev) => [newTrip, ...prev]);
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip }}>
      {children}
    </TripsContext.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripsContext);
  if (!ctx) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return ctx;
}
