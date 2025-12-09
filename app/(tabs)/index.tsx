import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Trip, MOCK_TRIPS } from '@/constants/trips';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Onglet "Voyages" : liste des trips.
 * Pour l'instant on affiche des données mockées,
 * plus tard on se branchera sur une API / backend.
 */
export default function TripsListScreen() {
  const colorSheme = useColorScheme();

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
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>
        Mes voyages
      </ThemedText>
      <FlatList
        data={MOCK_TRIPS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

// Styles simples, façon "bootstrap" (pas de gros fichiers de thème)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  heading: {
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  tripCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tripCardDark: {
    backgroundColor: '#111827',
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
