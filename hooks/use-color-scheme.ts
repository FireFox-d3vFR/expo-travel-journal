import { useColorScheme as useRNColorScheme } from 'react-native';
import { useSettings } from './use-settings';

export function useColorScheme() {
  const systemScheme = useRNColorScheme(); // 'light' | 'dark' | null
  const { theme } = useSettings();

  if (theme === 'light' || theme === 'dark') {
    return theme;
  }

  // theme === 'system'
  return systemScheme ?? 'light';
}
