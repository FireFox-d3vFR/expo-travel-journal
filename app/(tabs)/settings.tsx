import { Stack } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSettings } from '@/hooks/use-settings';
import { useTranslation } from '@/hooks/use-translation';

export default function SettingsScreen() {
  const { theme, setTheme, language, setLanguage } = useSettings();
  const { t } = useTranslation();

  const themeOptions = [
    { key: 'system' as const, labelKey: 'settings.theme.system' },
    { key: 'light' as const, labelKey: 'settings.theme.light' },
    { key: 'dark' as const, labelKey: 'settings.theme.dark' },
  ];

  const languageOptions = [
    { key: 'fr' as const, labelKey: 'settings.language.fr' },
    { key: 'en' as const, labelKey: 'settings.language.en' },
  ];

  return (
    <>
      <Stack.Screen options={{ title: t('settings.title') }} />
      <ThemedView style={styles.container}>
        {/* Section thème */}
        <ThemedText type="title" style={styles.sectionTitle}>
          {t('settings.appearanceTitle')}
        </ThemedText>
        <ThemedText style={styles.sectionSubtitle}>
          {t('settings.appearanceDescription')}
        </ThemedText>

        <View style={styles.chipsRow}>
          {themeOptions.map((opt) => {
            const active = theme === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setTheme(opt.key)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    active && styles.chipTextActive,
                  ]}
                >
                  {t(opt.labelKey as any)}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        {/* Section langue */}
        <ThemedText type="title" style={styles.sectionTitle}>
          {t('settings.languageTitle')}
        </ThemedText>
        <ThemedText style={styles.sectionSubtitle}>
          {t('settings.languageDescription')}
        </ThemedText>

        <View style={styles.chipsRow}>
          {languageOptions.map((opt) => {
            const active = language === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setLanguage(opt.key)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    active && styles.chipTextActive,
                  ]}
                >
                  {t(opt.labelKey as any)}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        <ThemedText style={styles.helperText}>
          {t('settings.languageNote')}
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
