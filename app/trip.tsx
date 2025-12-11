import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Activity } from '@/constants/trips';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTrips } from '@/hooks/use-trips';

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

function formatDate(date: Date | null) {
  if (!date) return '';
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function formatTime(date: Date | null) {
  if (!date) return;
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

function parseTimeToDate(time?: string): Date | null {
  if (!time) return null;
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(h || 0, m || 0, 0, 0);
  return d;
}

type ActivityStatus = 'past' | 'today' | 'upcoming';

function getActivityStatus(dateStr: string): ActivityStatus {
  const today = new Date();
  const activityDate = new Date(dateStr);

  today.setHours(0, 0, 0, 0);
  activityDate.setHours(0, 0, 0, 0);

  if (activityDate.getTime() === today.getTime()) {
    return 'today';
  }
  if (activityDate.getTime() < today.getTime()) {
    return 'past';
  }
  return 'upcoming';
}

function formatActivityDay(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// ✅ statut d’un voyage (Terminé / En cours / À venir)
type TripStatus = 'past' | 'current' | 'upcoming';

function getTripStatus(trip: { startDate: string; endDate: string }): TripStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (end < today) return 'past';
  if (start > today) return 'upcoming';
  return 'current';
}

function getTripStatusLabel(status: TripStatus) {
  switch (status) {
    case 'past':
      return 'Terminé';
    case 'current':
      return 'En cours';
    case 'upcoming':
      return 'À venir';
  }
}

export default function TripDetailScreen() {
  const params = useLocalSearchParams();
  const tripId = params.id as string | undefined;

  const {
    trips,
    addTripNote,
    updateTripNote,
    deleteTripNote,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleFavorite,
  } = useTrips();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const trip = trips.find((t) => t.id === tripId);
  const notes = trip?.notes ?? [];
  const activities = trip?.activities ?? [];

  // ✅ notes triées par date (la plus récente en haut)
  const sortedNotes = [...notes].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  const tripStatus = trip ? getTripStatus(trip) : null;

  // Journal de bord
  const [noteText, setNoteText] = useState('');
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<{
    id: string;
    date: string;
    text: string;
  } | null>(null);
  const [noteFormDate, setNoteFormDate] = useState<Date | null>(null);
  const [showNoteDatePicker, setShowNoteDatePicker] = useState(false);
  const [noteFormText, setNoteFormText] = useState('');

  // Activités - modal
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [activityTitle, setActivityTitle] = useState('');
  const [activityLocation, setActivityLocation] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityDate, setActivityDate] = useState<Date | null>(null);
  const [activityTime, setActivityTime] = useState<Date | null>(null);
  const [showActivityDatePicker, setShowActivityDatePicker] = useState(false);
  const [showActivityTimePicker, setShowActivityTimePicker] = useState(false);

  const handleAddNote = () => {
    if (!trip || !noteText.trim()) return;

    addTripNote(trip.id, {
      date: formatToday(),
      text: noteText.trim(),
    });
    setNoteText('');
  };

  const openEditNote = (note: { id: string; date: string; text: string }) => {
    setEditingNote(note);
    setNoteFormDate(new Date(note.date));
    setNoteFormText(note.text);
    setNoteModalVisible(true);
  };

  const handleSaveNoteEdit = () => {
    if (!trip || !editingNote) return;

    const dateStr = formatDate(noteFormDate);
    const text = noteFormText.trim();

    if (!dateStr || !text) {
      Alert.alert(
        'Champs manquants',
        'Merci de renseigner au minimum une date et un texte.'
      );
      return;
    }

    updateTripNote(trip.id, editingNote.id, {
      date: dateStr,
      text,
    });

    setNoteModalVisible(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (note: {
    id: string;
    date: string;
    text: string;
  }) => {
    if (!trip) return;

    Alert.alert(
      'Supprimer cette note ?',
      `“${note.text.slice(0, 40)}${note.text.length > 40 ? '…' : ''}”`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => deleteTripNote(trip.id, note.id),
        },
      ]
    );
  };

  const openCreateActivity = () => {
    if (!trip) return;

    setEditingActivity(null);
    setActivityTitle('');
    setActivityLocation('');
    setActivityDescription('');
    setActivityDate(new Date(trip.startDate));
    setActivityTime(null);
    setActivityModalVisible(true);
  };

  const openEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setActivityTitle(activity.title);
    setActivityLocation(activity.location ?? '');
    setActivityDescription(activity.description ?? '');
    setActivityDate(activity.date ? new Date(activity.date) : new Date());
    setActivityTime(parseTimeToDate(activity.time));
    setActivityModalVisible(true);
  };

  const handleSaveActivity = () => {
    if (!trip) return;

    const dateStr = formatDate(activityDate);
    const timeStr = formatTime(activityTime);

    if (!activityTitle.trim() || !dateStr) {
      Alert.alert(
        'Champs manquants',
        'Merci de renseigner au minimum un titre et une date.'
      );
      return;
    }

    const payload = {
      title: activityTitle.trim(),
      date: dateStr,
      time: timeStr,
      location: activityLocation.trim() || undefined,
      description: activityDescription.trim() || undefined,
    };

    if (editingActivity) {
      updateActivity(trip.id, editingActivity.id, payload);
    } else {
      addActivity(trip.id, payload);
    }

    setActivityModalVisible(false);
  };

  const handleDeleteActivity = (activity: Activity) => {
    if (!trip) return;

    Alert.alert(
      'Supprimer cette activité ?',
      `“${activity.title}” sera définitivement supprimée.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => deleteActivity(trip.id, activity.id),
        },
      ]
    );
  };

  const sortedActivities = [...activities].sort((a, b) => {
    const aDate = new Date(
      `${a.date}T${a.time ? a.time : '00:00'}`
    ).getTime();
    const bDate = new Date(
      `${b.date}T${b.time ? b.time : '00:00'}`
    ).getTime();
    return aDate - bDate;
  });

  const groupedActivities = sortedActivities.reduce<
    { date: string; label: string; items: Activity[] }[]
  >((groups, activity) => {
    const existing = groups.find((g) => g.date === activity.date);
    const label = formatActivityDay(activity.date);

    if (existing) {
      existing.items.push(activity);
    } else {
      groups.push({ date: activity.date, label, items: [activity] });
    }
    return groups;
  }, []);

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
            <View style={styles.tripDetailHeaderRow}>
              <ThemedText type="title">{trip.title}</ThemedText>

              <Pressable
                hitSlop={8}
                onPress={() => toggleFavorite(trip.id)}
              >
                <ThemedText
                  style={[
                    styles.favoriteIcon,
                    trip.isFavorite && styles.favoriteIconActive,
                  ]}
                >
                  {trip.isFavorite ? '★' : '☆'}
                </ThemedText>
              </Pressable>
            </View>

            <View style={styles.detailMetaRow}>
              <ThemedText style={styles.country}>📍 {trip.country}</ThemedText>

              {tripStatus && (
                <View
                  style={[
                    styles.statusBadge,
                    tripStatus === 'current' && styles.statusBadgeCurrent,
                    tripStatus === 'upcoming' && styles.statusBadgeUpcoming,
                    tripStatus === 'past' && styles.statusBadgePast,
                  ]}
                >
                  <ThemedText style={styles.statusBadgeText}>
                    {getTripStatusLabel(tripStatus)}
                  </ThemedText>
                </View>
              )}
            </View>

            {trip.cities && trip.cities.length > 0 && (
              <View style={styles.citiesSection}>
                <ThemedText style={styles.citiesLabel}>Étapes</ThemedText>
                <View style={styles.citiesContainer}>
                  {trip.cities.map((city) => (
                    <View key={city} style={styles.cityChip}>
                      <ThemedText style={styles.cityChipText}>{city}</ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <ThemedText style={styles.dates}>
              {trip.startDate} → {trip.endDate}
            </ThemedText>

            {/* Photos */}
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              📷 Photos
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

            {/* Activités */}
            <View style={styles.sectionHeaderRow}>
              <ThemedText type="subtitle">📆 Activités</ThemedText>
              <Pressable onPress={openCreateActivity}>
                <ThemedText type="link"> Ajouter</ThemedText>
              </Pressable>
            </View>

            {groupedActivities.length === 0 ? (
              <ThemedText style={styles.emptyText}>
                Aucune activité pour le moment. Ajoute la première étape de ton
                voyage !
              </ThemedText>
            ) : (
              groupedActivities.map((group) => (
                <View key={group.date} style={styles.activityDayBlock}>
                  <ThemedText style={styles.activityDayTitle}>
                    {group.label}
                  </ThemedText>

                  {group.items.map((activity) => {
                    const status = getActivityStatus(activity.date);

                    return (
                      <ThemedView key={activity.id} style={styles.activityCard}>
                        <View style={styles.activityHeaderRow}>
                          <ThemedText
                            type="defaultSemiBold"
                            style={styles.activityTitle}
                          >
                            {activity.title}
                          </ThemedText>

                          <View
                            style={[
                              styles.activityStatusBadge,
                              status === 'today' && styles.activityStatusToday,
                              status === 'upcoming' &&
                                styles.activityStatusUpcoming,
                              status === 'past' && styles.activityStatusPast,
                            ]}
                          >
                            <ThemedText style={styles.activityStatusText}>
                              {status === 'today'
                                ? "Aujourd'hui"
                                : status === 'upcoming'
                                ? 'À venir'
                                : 'Passé'}
                            </ThemedText>
                          </View>
                        </View>

                        <ThemedText style={styles.activityMeta}>
                          {activity.date}
                          {activity.time ? ` · ${activity.time}` : ''}
                        </ThemedText>
                        {activity.location && (
                          <ThemedText style={styles.activityMeta}>
                            {activity.location}
                          </ThemedText>
                        )}
                        {activity.description && (
                          <ThemedText style={styles.activityDescription}>
                            {activity.description}
                          </ThemedText>
                        )}

                        <View style={styles.activityActionsRow}>
                          <Pressable
                            onPress={() => openEditActivity(activity)}
                            style={styles.activityAction}
                          >
                            <ThemedText style={styles.activityActionText}>
                              ✏️ Modifier
                            </ThemedText>
                          </Pressable>
                          <Pressable
                            onPress={() => handleDeleteActivity(activity)}
                            style={styles.activityAction}
                          >
                            <ThemedText style={styles.activityDeleteText}>
                              🗑 Supprimer
                            </ThemedText>
                          </Pressable>
                        </View>
                      </ThemedView>
                    );
                  })}
                </View>
              ))
            )}

            {/* Journal de bord */}
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              📒 Journal de bord
            </ThemedText>

            {sortedNotes.length > 0 && (
              <ThemedText style={styles.journalSummary}>
                {sortedNotes.length} note
                {sortedNotes.length > 1 ? 's' : ''} enregistrée
                {sortedNotes.length > 1 ? 's' : ''}
              </ThemedText>
            )}

            {sortedNotes.length === 0 ? (
              <ThemedText style={styles.emptyText}>
                Aucune note pour le moment. Ajoute ta première impression de
                voyage !
              </ThemedText>
            ) : (
              sortedNotes.map((note) => (
                <ThemedView key={note.id} style={styles.noteCard}>
                  <ThemedText style={styles.noteDate}>{note.date}</ThemedText>
                  <ThemedText>{note.text}</ThemedText>

                  <View style={styles.activityActionsRow}>
                    <Pressable
                      onPress={() => openEditNote(note)}
                      style={styles.activityAction}
                    >
                      <ThemedText style={styles.activityActionText}>
                        ✏️ Modifier
                      </ThemedText>
                    </Pressable>
                    <Pressable
                      onPress={() => handleDeleteNote(note)}
                      style={styles.activityAction}
                    >
                      <ThemedText style={styles.activityDeleteText}>
                        🗑 Supprimer
                      </ThemedText>
                    </Pressable>
                  </View>
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

      {/* Modal activité */}
      <Modal
        visible={activityModalVisible}
        animationType="slide"
        onRequestClose={() => setActivityModalVisible(false)}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedText type="title" style={styles.modalTitle}>
            {editingActivity ? 'Modifier une activité' : 'Nouvelle activité'}
          </ThemedText>

          {trip && (
            <ThemedText style={styles.modalSubtitle}>
              Pour le voyage : {trip.title}
            </ThemedText>
          )}

          <ThemedText>Titre</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textInput,
              isDark && styles.inputDark,
              isDark && styles.textInputDark,
            ]}
            value={activityTitle}
            onChangeText={setActivityTitle}
            placeholder="Visite du musée..."
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          />

          <ThemedText>Date</ThemedText>
          <Pressable
            onPress={() => setShowActivityDatePicker(true)}
            style={[styles.input, isDark && styles.inputDark]}
          >
            <ThemedText>
              {activityDate
                ? formatDate(activityDate)
                : 'Sélectionner une date'}
            </ThemedText>
          </Pressable>
          {showActivityDatePicker && (
            <DateTimePicker
              value={activityDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={trip ? new Date(trip.startDate) : undefined}
              maximumDate={trip ? new Date(trip.endDate) : undefined}
              onChange={(event: DateTimePickerEvent, date?: Date) => {
                if (Platform.OS !== 'ios') setShowActivityDatePicker(false);
                if (date) setActivityDate(date);
              }}
            />
          )}

          <ThemedText>Heure (optionnel)</ThemedText>
          <Pressable
            onPress={() => setShowActivityTimePicker(true)}
            style={[styles.input, isDark && styles.inputDark]}
          >
            <ThemedText>
              {activityTime
                ? formatTime(activityTime)
                : 'Sélectionner une heure'}
            </ThemedText>
          </Pressable>
          {showActivityTimePicker && (
            <DateTimePicker
              value={activityTime || new Date()}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event: DateTimePickerEvent, date?: Date) => {
                if (Platform.OS !== 'ios') setShowActivityTimePicker(false);
                if (date) setActivityTime(date);
              }}
            />
          )}

          <ThemedText>Lieu (optionnel)</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textInput,
              isDark && styles.inputDark,
              isDark && styles.textInputDark,
            ]}
            value={activityLocation}
            onChangeText={setActivityLocation}
            placeholder="Ville, lieu précis..."
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          />

          <ThemedText>Description (optionnel)</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textInput,
              isDark && styles.inputDark,
              isDark && styles.textInputDark,
              { minHeight: 60, textAlignVertical: 'top' },
            ]}
            value={activityDescription}
            onChangeText={setActivityDescription}
            placeholder="Détails sur l’activité..."
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
            multiline
          />

          <View style={styles.modalButtonsRow}>
            <Button
              title="Annuler"
              onPress={() => setActivityModalVisible(false)}
            />
            <Button
              title={editingActivity ? 'Enregistrer' : 'Ajouter'}
              onPress={handleSaveActivity}
            />
          </View>
        </ThemedView>
      </Modal>

      {/* Modal note (édition) */}
      <Modal
        visible={noteModalVisible}
        animationType="slide"
        onRequestClose={() => {
          setNoteModalVisible(false);
          setEditingNote(null);
        }}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedText type="title" style={styles.modalTitle}>
            Modifier une note
          </ThemedText>

          {trip && (
            <ThemedText style={styles.modalSubtitle}>
              Pour le voyage : {trip.title}
            </ThemedText>
          )}

          <ThemedText>Date</ThemedText>
          <Pressable
            onPress={() => setShowNoteDatePicker(true)}
            style={[styles.input, isDark && styles.inputDark]}
          >
            <ThemedText>
              {noteFormDate
                ? formatDate(noteFormDate)
                : 'Sélectionner une date'}
            </ThemedText>
          </Pressable>
          {showNoteDatePicker && (
            <DateTimePicker
              value={noteFormDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={trip ? new Date(trip.startDate) : undefined}
              maximumDate={trip ? new Date(trip.endDate) : undefined}
              onChange={(event: DateTimePickerEvent, date?: Date) => {
                if (Platform.OS !== 'ios') setShowNoteDatePicker(false);
                if (date) setNoteFormDate(date);
              }}
            />
          )}

          <ThemedText>Texte</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textInput,
              isDark && styles.inputDark,
              isDark && styles.textInputDark,
              { minHeight: 80, textAlignVertical: 'top' },
            ]}
            value={noteFormText}
            onChangeText={setNoteFormText}
            placeholder="Raconte ta journée..."
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
            multiline
          />

          <View style={styles.modalButtonsRow}>
            <Button
              title="Annuler"
              onPress={() => {
                setNoteModalVisible(false);
                setEditingNote(null);
              }}
            />
            <Button title="Enregistrer" onPress={handleSaveNoteEdit} />
          </View>
        </ThemedView>
      </Modal>
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
  tripDetailHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  country: {
    marginTop: 0,
  },
  favoriteIcon: {
    fontSize: 22,
    opacity: 0.6,
  },
  favoriteIconActive: {
    opacity: 1,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  statusBadgeText: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  statusBadgeCurrent: {
    borderColor: '#22c55e',
  },
  statusBadgeUpcoming: {
    borderColor: '#3b82f6',
  },
  statusBadgePast: {
    borderColor: '#6b7280',
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  activityDayBlock: {
    marginBottom: 12,
  },
  activityDayTitle: {
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  activityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  activityStatusBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  activityStatusText: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  activityStatusToday: {
    borderColor: '#22c55e',
  },
  activityStatusUpcoming: {
    borderColor: '#3b82f6',
  },
  activityStatusPast: {
    borderColor: '#6b7280',
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
  activityCard: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
    gap: 2,
  },
  activityTitle: {
    marginBottom: 2,
  },
  activityMeta: {
    fontSize: 12,
    opacity: 0.8,
  },
  activityDescription: {
    marginTop: 4,
    fontSize: 12,
  },
  activityActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 6,
  },
  activityAction: {
    paddingVertical: 4,
  },
  activityActionText: {
    fontSize: 12,
  },
  activityDeleteText: {
    fontSize: 12,
    color: '#f97373',
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
  modalContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    gap: 8,
  },
  modalTitle: {
    marginBottom: 12,
  },
  modalSubtitle: {
    marginBottom: 12,
    opacity: 0.8,
    fontSize: 14,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  citiesSection: {
    marginTop: 6,
    marginBottom: 4,
    gap: 4,
  },
  citiesLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  journalSummary: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
  },
});
