import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Trip } from '@/constants/trips';
import { useTrips } from '@/hooks/use-trips';
import { useTranslation } from '@/hooks/use-translation';

function getTripDurationInDays(trip: Trip): number {
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const diffMs = end.getTime() - start.getTime();
  // +1 pour inclure le jour de début
  return Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);
}

export default function ExplorerScreen() {
  const { trips } = useTrips();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const totalTrips = trips.length;
  const totalDays = trips.reduce(
    (sum, trip) => sum + getTripDurationInDays(trip),
    0
  );

  const today = new Date();

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.startDate) > today
  );

  const nextTrip = upcomingTrips
    .slice()
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() -
        new Date(b.startDate).getTime()
    )[0];

  const longestTrip = trips
    .slice()
    .sort(
      (a, b) =>
        getTripDurationInDays(b) - getTripDurationInDays(a)
    )[0];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 8 },
      ]}
    >
      <ThemedText type="title" style={styles.heading}>
        {t('explore.title')}
      </ThemedText>

      <ThemedText style={styles.subHeading}>
        {t('explore.subtitle')}
      </ThemedText>

      {/* Stats principales */}
      <ThemedView style={styles.cardRow}>
        <ThemedView style={styles.statCard}>
          <ThemedText type="subtitle">
            {t('explore.stats.trips')}
          </ThemedText>
          <ThemedText type="title">
            {totalTrips}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.statCard}>
          <ThemedText type="subtitle">
            {t('explore.stats.days')}
          </ThemedText>
          <ThemedText type="title">
            {totalDays}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Prochain voyage */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">
          {t('explore.nextTrip.title')}
        </ThemedText>
        {nextTrip ? (
          <>
            <ThemedText type="defaultSemiBold">
              {nextTrip.title}
            </ThemedText>
            <ThemedText>
              {nextTrip.country}
            </ThemedText>
            <ThemedText style={styles.mutedText}>
              {nextTrip.startDate} → {nextTrip.endDate}
            </ThemedText>
          </>
        ) : (
          <ThemedText style={styles.mutedText}>
            {t('explore.nextTrip.none')}
          </ThemedText>
        )}
      </ThemedView>

      {/* Voyage le plus long */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">
          {t('explore.longestTrip.title')}
        </ThemedText>
        {longestTrip ? (
          <>
            <ThemedText type="defaultSemiBold">
              {longestTrip.title}
            </ThemedText>
            <ThemedText>
              {longestTrip.country}
            </ThemedText>
            <ThemedText style={styles.mutedText}>
              {getTripDurationInDays(longestTrip)}{' '}
              {t('explore.longestTrip.days')}
            </ThemedText>
          </>
        ) : (
          <ThemedText style={styles.mutedText}>
            {t('explore.longestTrip.none')}
          </ThemedText>
        )}
      </ThemedView>

      {/* Petit résumé */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">
          {t('explore.summary.title')}
        </ThemedText>

        {totalTrips === 0 ? (
          <ThemedText>
            {t('explore.summary.empty')}
          </ThemedText>
        ) : (
          <ThemedText>
            {t('explore.summary.part1')}{' '}
            {totalTrips}{' '}
            {t('explore.summary.part2')}{' '}
            {totalDays}{' '}
            {t('explore.summary.part3')}
          </ThemedText>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  heading: {
    marginBottom: 4,
  },
  subHeading: {
    marginBottom: 12,
    fontSize: 12,
    opacity: 0.8,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#374151',
    gap: 4,
  },
  card: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#374151',
    gap: 4,
  },
  mutedText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
