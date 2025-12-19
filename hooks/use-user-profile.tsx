import React, { createContext, useContext, useState } from 'react';

export type UserProfile = {
  id: string;
  name: string;
  email?: string;
  homeCity?: string;
  homeCountry?: string;
  bio?: string;
  avatarUrl?: string;
};

type UserProfileContextType = {
  profile: UserProfile;
  updateProfile: (patch: Partial<UserProfile>) => void;
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'me',
  name: 'Voyageur·se',
  homeCountry: 'France',
  bio: 'Prêt·e à explorer le monde ✈️',
};

const UserProfileContext =
  createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const updateProfile = (patch: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error(
      'useUserProfile must be used within a UserProfileProvider'
    );
  }
  return ctx;
}
