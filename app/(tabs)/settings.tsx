import { Stack } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSettings } from '@/hooks/use-settings';

export default function SettingsScreen() {
  const { theme, setTheme, language, setLanguage } = useSettings();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const themeOptions = [
    { key: 'system', label: 'Système' },
    { key: 'light', label: 'Clair' },
    { key: 'dark', label: 'Sombre' },
  ] as const;

  const languageOptions = [
    { key: 'fr', label: 'Français' },
    { key: 'en', label: 'English' },
  ] as const;

  return (
    <>
      <Stack.Screen options={{ title: 'Réglages' }} />
      <ThemedView style={styles.container}>
        {/* Section thème */}
        <ThemedText type="title" style={styles.sectionTitle}>
          Apparence
        </ThemedText>
        <ThemedText style={styles.sectionSubtitle}>
          Choisis comment l’application s’adapte au thème de ton téléphone.
        </ThemedText>

        <View style={styles.chipsRow}>
          {themeOptions.map((opt) => {
            const active = theme === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setTheme(opt.key)}
                style={[
                  styles.chip,
                  active && styles.chipActive,
                ]}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    active && styles.chipTextActive,
                  ]}
                >
                  {opt.label}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        {/* Section langue */}
        <ThemedText type="title" style={styles.sectionTitle}>
          Langue
        </ThemedText>
        <ThemedText style={styles.sectionSubtitle}>
          Langue principale de l’interface (FR / EN).
        </ThemedText>

        <View style={styles.chipsRow}>
          {languageOptions.map((opt) => {
            const active = language === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setLanguage(opt.key)}
                style={[
                  styles.chip,
                  active && styles.chipActive,
                ]}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    active && styles.chipTextActive,
                  ]}
                >
                  {opt.label}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        <ThemedText style={styles.helperText}>
          (Pour l’instant, le choix de langue est stocké dans les réglages. On
          pourra ensuite brancher une vraie traduction des textes FR/EN.)
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5563',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  chipText: {
    fontSize: 13,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  helperText: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 4,
  },
});
