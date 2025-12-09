import React from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MOCK_TRIPS } from '@/constants/trips';

/**
 * Photos mockées pour les voyages.
 * Plus tard, on les récupérera depuis l'API.
 */
const MOCK_PHOTOS = [
  {
    id: 'p1',
    uri: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    caption: 'Cascade au lever du soleil',
  },
  {
    id: 'p2',
    uri: 'https://images.pexels.com/photos/210307/pexels-photo-210307.jpeg',
    caption: 'Route perdue dans la nature',
  },
];

export default function TripDetailScreen() {
  const params = useLocalSearchParams();
  const tripId = params.id as string | undefined;

  const trip = MOCK_TRIPS.find((t) => t.id === tripId);

  // On peut configurer le header ici (titre dynamique)
  return (
    <>
      <Stack.Screen
        options={{
          title: trip ? trip.title : 'Voyage',
        }}
      />
      <ThemedView style={styles.container}>
        {!trip ? (
          <ThemedText>Voyage introuvable.</ThemedText>
        ) : (
          <>
            <ThemedText type="title">{trip.title}</ThemedText>
            <ThemedText style={styles.country}>{trip.country}</ThemedText>
            <ThemedText style={styles.dates}>
              {trip.startDate} → {trip.endDate}
            </ThemedText>

            <ThemedText type="subtitle" style={styles.photosTitle}>
              Photos
            </ThemedText>

            <FlatList
              data={MOCK_PHOTOS}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <ThemedView style={styles.photoCard}>
                  <Image source={{ uri: item.uri }} style={styles.photo} />
                  <ThemedText style={styles.caption}>{item.caption}</ThemedText>
                </ThemedView>
              )}
            />
          </>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  country: {
    marginTop: 4,
  },
  dates: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 12,
    opacity: 0.7,
  },
  photosTitle: {
    marginBottom: 8,
    marginTop: 8,
  },
  photoCard: {
    marginRight: 12,
    width: 220,
  },
  photo: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  caption: {
    marginTop: 4,
    fontSize: 12,
  },
});
