// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { TripsProvider } from '@/hooks/use-trips';
import { SettingsProvider } from '@/hooks/use-settings';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Composant interne : peut utiliser useColorScheme car il est SOUS SettingsProvider
function RootLayoutInner() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TripsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="trip-new" options={{ title: 'Nouveau voyage' }} />
        </Stack>
      </TripsProvider>

      {/* Tu peux laisser "auto" si tu préfères */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SettingsProvider>
      <RootLayoutInner />
    </SettingsProvider>
  );
}