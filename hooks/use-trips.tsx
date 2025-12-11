import { Activity, MOCK_TRIPS, Trip, TripNote } from '@/constants/trips';
import React, { createContext, useContext, useState } from 'react';

type TripsContextType = {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id' | 'notes' | 'activities'>) => void;
  addTripNote: (tripId: string, note: Omit<TripNote, 'id'>) => void;
  updateTripNote: (
    tripId: string,
    noteId: string,
    payload: { date: string; text: string }
  ) => void;
  deleteTripNote: (tripId: string, noteId: string) => void;
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

  const updateTripNote = (
    tripId: string,
    noteId: string,
    payload: { date: string; text: string }
  ) => {
    setTrips((current) =>
      current.map((trip) => {
        if (trip.id !== tripId) return trip;
        return {
          ...trip,
          notes: (trip.notes ?? []).map((note) =>
            note.id === noteId ? { ...note, ...payload } : note
          ),
        };
      })
    );
  };

  const deleteTripNote = (tripId: string, noteId: string) => {
    setTrips((current) =>
      current.map((trip) => {
        if (trip.id !== tripId) return trip;
        return {
          ...trip,
          notes: (trip.notes ?? []).filter((note) => note.id !== noteId),
        };
      })
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
        updateTripNote,
        deleteTripNote,
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
