import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Trip } from "@/constants/trips";
import { useTrips } from "@/hooks/use-trips";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function getTripDurationInDays(trip: Trip): number {
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const diffMs = end.getTime() - start.getTime();
  // +1 pour inclure le jour de début
  return Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);
}

export default function ExplorerScreen() {
  const { trips } = useTrips();
  const insets = useSafeAreaInsets();

  const totalTrips = trips.length;
  const totalDays = trips.reduce((sum, trip) => sum + getTripDurationInDays(trip), 0);

  const today = new Date();

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.startDate) > today
  );

  const nextTrip = upcomingTrips.sort(
    (a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )[0];

  const longestTrip =
    trips.slice().sort(
      (a, b) => getTripDurationInDays(b) - getTripDurationInDays(a)
    )[0];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 8 },
      ]}
    >
      <ThemedText type="title" style={styles.heading}>
        Explorer
      </ThemedText>

      <ThemedText style={styles.subHeading}>
        Un aperçu de tes aventures.
      </ThemedText>

      {/* Stats principales */}
      <ThemedView style={styles.cardRow}>
        <ThemedView style={styles.statCard}>
          <ThemedText type="subtitle">Voyages</ThemedText>
          <ThemedText type="title">{totalTrips}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.statCard}>
          <ThemedText type="subtitle">Jours en voyage</ThemedText>
          <ThemedText type="title">{totalDays}</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Prochain voyage */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Prochain voyage</ThemedText>
        {nextTrip ? (
          <>
            <ThemedText type="defaultSemiBold">
              {nextTrip.title}
            </ThemedText>
            <ThemedText>{nextTrip.country}</ThemedText>
            <ThemedText style={styles.mutedText}>
              {nextTrip.startDate} → {nextTrip.endDate}
            </ThemedText>
          </>
        ) : (
          <ThemedText style={styles.mutedText}>
            Aucun voyage à venir pour le moment.
          </ThemedText>
        )}
      </ThemedView>

      {/* Voyage le plus long */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Voyage le plus long</ThemedText>
        {longestTrip ? (
          <>
            <ThemedText type="defaultSemiBold">
              {longestTrip.title}
            </ThemedText>
            <ThemedText>{longestTrip.country}</ThemedText>
            <ThemedText style={styles.mutedText}>
              {getTripDurationInDays(longestTrip)} jours
            </ThemedText>
          </>
        ) : (
          <ThemedText style={styles.mutedText}>
            Ajoute un voyage pour voir cette statistique.
          </ThemedText>
        )}
      </ThemedView>

      {/* Petit résumé */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Résumé</ThemedText>
        {totalTrips === 0 ? (
          <ThemedText>
            Commence par ajouter ton premier voyage dans l’onglet
            <ThemedText type="defaultSemiBold"> Voyages</ThemedText>.
          </ThemedText>
        ) : (
          <ThemedText>
            Tu as déjà enregistré {totalTrips} voyage(s) pour un total de{' '}
            {totalDays} jours sur les routes. Continue à explorer le monde !
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