import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTrips } from '@/hooks/use-trips';

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

function formatToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function TripDetailScreen() {
  const params = useLocalSearchParams();
  const tripId = params.id as string | undefined;

  const { trips, addTripNote } = useTrips();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const trip = trips.find((t) => t.id === tripId);
  const notes = trip?.notes ?? [];

  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (!trip || !noteText.trim()) return;

    addTripNote(trip.id, {
      date: formatToday(),
      text: noteText.trim(),
    });
    setNoteText('');
  };

  return (
    <>
      <Stack.Screen options={{ title: trip ? trip.title : 'Voyage' }} />
      {!trip ? (
        <ThemedView style={styles.container}>
          <ThemedText>Voyage introuvable.</ThemedText>
        </ThemedView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.container}>
            {/* Infos principales */}
            <ThemedText type="title">{trip.title}</ThemedText>
            <ThemedText style={styles.country}>{trip.country}</ThemedText>
            {trip.cities && trip.cities.length > 0 && (
              <View style={styles.citiesContainer}>
                {trip.cities.map((city) => (
                  <View key={city} style={styles.cityChip}>
                    <ThemedText style={styles.cityChipText}>{city}</ThemedText>
                  </View>
                ))}
              </View>
            )}
            <ThemedText style={styles.dates}>
              {trip.startDate} → {trip.endDate}
            </ThemedText>

            {/* Photos */}
            <ThemedText type="subtitle" style={styles.sectionTitle}>
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

            {/* Journal de bord */}
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Journal de bord
            </ThemedText>

            {notes.length === 0 ? (
              <ThemedText style={styles.emptyText}>
                Aucune note pour le moment. Ajoute ta première impression de voyage !
              </ThemedText>
            ) : (
              notes.map((note) => (
                <ThemedView key={note.id} style={styles.noteCard}>
                  <ThemedText style={styles.noteDate}>{note.date}</ThemedText>
                  <ThemedText>{note.text}</ThemedText>
                </ThemedView>
              ))
            )}

            {/* Formulaire nouvelle note */}
            <ThemedText style={styles.addNoteLabel}>
              Ajouter une note
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                styles.textInput,
                isDark && styles.inputDark,
                isDark && styles.textInputDark,
              ]}
              placeholder="Raconte ta journée..."
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
              value={noteText}
              onChangeText={setNoteText}
              multiline
            />
            <Button title="Enregistrer la note" onPress={handleAddNote} />
          </ThemedView>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  country: {
    marginTop: 4,
  },
  citiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
    marginBottom: 4,
  },
  cityChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  cityChipText: {
    fontSize: 12,
  },
  cities: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 12,
    opacity: 0.9,
  },
  dates: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 12,
    opacity: 0.7,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
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
  emptyText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
  },
  noteCard: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  noteDate: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  addNoteLabel: {
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  inputDark: {
    borderColor: '#4B5563',
    backgroundColor: '#111827',
  },
  textInput: {
    color: '#111827',
  },
  textInputDark: {
    color: '#F9FAFB',
  },
});
