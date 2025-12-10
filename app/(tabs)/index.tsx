import { router } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Trip } from '@/constants/trips';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTrips } from '@/hooks/use-trips';

/**
 * Onglet "Voyages" : liste des trips.
 * Pour l'instant on affiche des données mockées,
 * plus tard on se branchera sur une API / backend.
 */
export default function TripsListScreen() {
  const { trips } = useTrips();
  const colorSheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Trip }) => (
    <TouchableOpacity
      style={[
        styles.tripCard,
        colorSheme === 'dark' && styles.tripCardDark,
      ]}
      onPress={() =>
        router.push({
          pathname: '/trip',
          params: { id: item.id },
        })
      }>
      <ThemedText type="defaultSemiBold" style={styles.tripTitle}>
        {item.title}
      </ThemedText>
      <ThemedText style={styles.tripSubtitle}>{item.country}</ThemedText>
      <ThemedText style={styles.tripDates}>
        {item.startDate} → {item.endDate}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView
      style={[
        styles.container,
        { paddingTop: insets.top + 8 },
      ]}
    >
      <ThemedView style={styles.headerRow}>
        <ThemedText type="title" style={styles.heading}>
          Mes voyages
        </ThemedText>
        <Pressable onPress={() => router.push('/trip-new')}>
          <ThemedText type="link">+ Ajouter</ThemedText>
        </Pressable>
      </ThemedView>

      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {},
  listContent: {
    paddingBottom: 16,
  },
  tripCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff', // clair
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tripCardDark: {
    backgroundColor: '#111827', // foncé pour dark mode
  },
  tripTitle: {
    marginBottom: 4,
  },
  tripSubtitle: {
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 12,
    opacity: 0.7,
  },
});
