import React, { createContext, useContext, useState } from 'react';
import { Trip, TripNote, Activity, MOCK_TRIPS } from '@/constants/trips';

type TripsContextType = {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id' | 'notes' | 'activities'>) => void;
  addTripNote: (tripId: string, note: Omit<TripNote, 'id'>) => void;
  addActivity: (tripId: string, activity: Omit<Activity, 'id'>) => void;
  updateActivity: (
    tripId: string,
    activityId: string,
    patch: Partial<Omit<Activity, 'id'>>
  ) => void;
  deleteActivity: (tripId: string, activityId: string) => void;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export function TripsProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);

  const addTrip = (tripData: Omit<Trip, 'id' | 'notes' | 'activities'>) => {
    const newTrip: Trip = {
      id: String(Date.now()),
      notes: [],
      activities: [],
      ...tripData,
    };
    setTrips((prev) => [newTrip, ...prev]);
  };

  const addTripNote = (tripId: string, noteData: Omit<TripNote, 'id'>) => {
    const newNote: TripNote = {
      id: String(Date.now()),
      ...noteData,
    };

    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              notes: [newNote, ...(trip.notes ?? [])],
            }
          : trip
      )
    );
  };

  const addActivity = (tripId: string, activityData: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      id: String(Date.now()),
      ...activityData,
    };

    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              activities: [...(trip.activities ?? []), newActivity],
            }
          : trip
      )
    );
  };

  const updateActivity = (
    tripId: string,
    activityId: string,
    patch: Partial<Omit<Activity, 'id'>>
  ) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              activities: (trip.activities ?? []).map((activity) =>
                activity.id === activityId ? { ...activity, ...patch } : activity
              ),
            }
          : trip
      )
    );
  };

  const deleteActivity = (tripId: string, activityId: string) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              activities: (trip.activities ?? []).filter(
                (activity) => activity.id !== activityId
              ),
            }
          : trip
      )
    );
  };

  return (
    <TripsContext.Provider
      value={{
        trips,
        addTrip,
        addTripNote,
        addActivity,
        updateActivity,
        deleteActivity,
      }}
    >
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
