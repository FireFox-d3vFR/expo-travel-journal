import React, { createContext, useContext, useState } from 'react';

export type ThemePreference = 'system' | 'light' | 'dark';
export type LanguagePreference = 'fr' | 'en';

type SettingsContextType = {
  theme: ThemePreference;
  language: LanguagePreference;
  setTheme: (value: ThemePreference) => void;
  setLanguage: (value: LanguagePreference) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemePreference>('system');
  const [language, setLanguage] = useState<LanguagePreference>('fr');

  return (
    <SettingsContext.Provider
      value={{ theme, language, setTheme, setLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}
