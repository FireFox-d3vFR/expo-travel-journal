import React, { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTrips } from '@/hooks/use-trips';
import { useColorScheme } from '@/hooks/use-color-scheme';

function formatDate(date: Date | null) {
  if (!date) return '';
  // toISOString() → "YYYY-MM-DDTHH:mm:ss..." → on garde juste la date
  return date.toISOString().slice(0, 10);
}

export default function NewTripScreen() {
  const { addTrip } = useTrips();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleChangeStart = (event: DateTimePickerEvent, date?: Date) => {
    // sur Android, on ferme le picker après choix
    if (Platform.OS !== 'ios') {
      setShowStartPicker(false);
    }
    if (date) setStartDate(date);
  };

  const handleChangeEnd = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS !== 'ios') {
      setShowEndPicker(false);
    }
    if (date) setEndDate(date);
  };

  const handleSave = () => {
    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);

    if (!title || !country || !startDateStr || !endDateStr) {
      Alert.alert('Champs manquants', 'Merci de remplir tous les champs.');
      return;
    }

    addTrip({
      title,
      country,
      startDate: startDateStr,
      endDate: endDateStr,
    });

    router.replace('/');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Nouveau voyage' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.heading}>
          Nouveau voyage
        </ThemedText>

        <ThemedText>Titre</ThemedText>
        <TextInput
          style={[
            styles.input,
            styles.textInput,
            isDark && styles.inputDark,
            isDark && styles.textInputDark,
          ]}
          value={title}
          onChangeText={setTitle}
          placeholder="Roadtrip en Islande"
          placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
        />

        <ThemedText>Pays</ThemedText>
        <TextInput
          style={[
            styles.input,
            styles.textInput,
            isDark && styles.inputDark,
            isDark && styles.textInputDark,
          ]}
          value={country}
          onChangeText={setCountry}
          placeholder="Islande"
          placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
        />

        <ThemedText>Date de début</ThemedText>
        <Pressable
          onPress={() => setShowStartPicker(true)}
          style={[styles.input, isDark && styles.inputDark]}>
          <ThemedText>
            {startDate ? formatDate(startDate) : 'Sélectionner une date'}
          </ThemedText>
        </Pressable>
        {showStartPicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChangeStart}
          />
        )}

        <ThemedText>Date de fin</ThemedText>
        <Pressable
          onPress={() => setShowEndPicker(true)}
          style={[styles.input, isDark && styles.inputDark]}>
          <ThemedText>
            {endDate ? formatDate(endDate) : 'Sélectionner une date'}
          </ThemedText>
        </Pressable>
        {showEndPicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChangeEnd}
          />
        )}

        <Button title="Enregistrer" onPress={handleSave} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 8,
  },
  heading: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
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
