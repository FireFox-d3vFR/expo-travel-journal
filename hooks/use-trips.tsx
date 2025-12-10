import { MOCK_TRIPS, Trip, TripNote } from '@/constants/trips';
import React, { createContext, useContext, useState } from 'react';

type TripsContextType = {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  addTripNote: (tripId: string, note: Omit<TripNote, 'id'>) => void;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export function TripsProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);

  const addTrip = (tripData: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      id: String(Date.now()), // simple id pour l’instant
      notes: [],
      ...tripData,
    };
    // on ajoute le dernier voyage en haut de la liste
    setTrips((prev) => [newTrip, ...prev]);
  };

  const addTripNote = (tripId: string, noteData: Omit<TripNote, 'id'>) => {
    const newNote: TripNote = {
      id: String(Date.now()),
      ...noteData,
    }

    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              notes: [newNote, ...(trip.notes ?? [])],  // dernière note en haut
            }
          : trip
      )
    );
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip, addTripNote }}>
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
