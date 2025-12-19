import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
    Image,
    Platform,
    ToastAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Trip } from '@/constants/trips';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTrips } from '@/hooks/use-trips';
import { useUserProfile } from '@/hooks/use-user-profile';

type TripStatus = 'upcoming' | 'ongoing' | 'finished';

function getTripStatus(trip: Trip): TripStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (end < today) return 'finished';
  if (start > today) return 'upcoming';
  return 'ongoing';
}

function diffDays(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)) + 1);
}

export default function ProfileScreen() {
  const { profile, updateProfile } = useUserProfile();
  const { trips } = useTrips();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Stats voyages
  const totalTrips = trips.length;
  const finishedTrips = trips.filter(
    (t) => getTripStatus(t) === 'finished'
  ).length;
  const ongoingTrips = trips.filter(
    (t) => getTripStatus(t) === 'ongoing'
  ).length;
  const upcomingTrips = trips.filter(
    (t) => getTripStatus(t) === 'upcoming'
  ).length;

  const countriesVisited = new Set(trips.map((t) => t.country)).size;

  const totalDays = trips.reduce((sum, t) => {
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    return sum + diffDays(start, end);
  }, 0);

  // Formulaire profil
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email ?? '');
  const [homeCity, setHomeCity] = useState(profile.homeCity ?? '');
  const [homeCountry, setHomeCountry] = useState(
    profile.homeCountry ?? ''
  );
  const [bio, setBio] = useState(profile.bio ?? '');

  const handlePickAvatar = async () => {
    // Demande de permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission requise',
        'Nous avons besoin de la permission d\'accéder à ta galerie pour choisir une photo de profil.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (uri) {
      updateProfile({ avatarUrl: uri });
    }
  }

    const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Nom requis', 'Merci de renseigner un nom.');
      return;
    }

    updateProfile({
      name: name.trim(),
      email: email.trim() || undefined,
      homeCity: homeCity.trim() || undefined,
      homeCountry: homeCountry.trim() || undefined,
      bio: bio.trim() || undefined,
    });

    if (Platform.OS === 'android') {
      ToastAndroid.show('Profil mis à jour ✅', ToastAndroid.SHORT);
    } else {
      Alert.alert('Profil mis à jour', 'Tes informations ont été enregistrées ✅');
    }
  };

  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <>
      <Stack.Screen options={{ title: 'Profil' }} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.container}>
          {/* Header avatar + nom */}
          <View style={styles.headerRow}>
            <View style={styles.avatarLarge}>
              {profile.avatarUrl ? (
                <Image
                  source={{ uri: profile.avatarUrl }}
                  style={styles.avatarImage}
                />
              ) : (
                <ThemedText style={styles.avatarLargeText}>
                  {initials || '🙂'}
                </ThemedText>
              )}
            </View>
            <View style={styles.headerText}>
              <ThemedText type="title">
                {profile.name || 'Mon profil'}
              </ThemedText>
              {profile.homeCountry && (
                <ThemedText style={styles.headerSubtitle}>
                  Basé·e en {profile.homeCountry}
                </ThemedText>
              )}
              <ThemedText
                style={styles.changeAvatarLink}
                onPress={handlePickAvatar}
              >
                Changer la photo de profil
              </ThemedText>
            </View>
          </View>

          {/* Stats voyages */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Statistiques de voyage
          </ThemedText>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>
                {totalTrips}
              </ThemedText>
              <ThemedText style={styles.statLabel}>
                Voyages
              </ThemedText>
            </View>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>
                {countriesVisited}
              </ThemedText>
              <ThemedText style={styles.statLabel}>
                Pays visités
              </ThemedText>
            </View>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>
                {totalDays}
              </ThemedText>
              <ThemedText style={styles.statLabel}>
                Jours en voyage
              </ThemedText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <ThemedText style={styles.chip}>
              À venir : {upcomingTrips}
            </ThemedText>
            <ThemedText style={styles.chip}>
              En cours : {ongoingTrips}
            </ThemedText>
            <ThemedText style={styles.chip}>
              Terminés : {finishedTrips}
            </ThemedText>
          </View>

          {/* Formulaire profil */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Informations personnelles
          </ThemedText>

          <ThemedText>Nom affiché</ThemedText>
          <TextInput
            style={[
              styles.input,
              isDark && styles.inputDark,
            ]}
            value={name}
            onChangeText={setName}
            placeholder="Ton nom ou pseudo"
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          />

          <ThemedText>Email (optionnel)</ThemedText>
          <TextInput
            style={[
              styles.input,
              isDark && styles.inputDark,
            ]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="email@example.com"
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          />

          <ThemedText>Ville (optionnel)</ThemedText>
          <TextInput
            style={[
              styles.input,
              isDark && styles.inputDark,
            ]}
            value={homeCity}
            onChangeText={setHomeCity}
            placeholder="Ta ville"
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          />

          <ThemedText>Pays (optionnel)</ThemedText>
          <TextInput
            style={[
              styles.input,
              isDark && styles.inputDark,
            ]}
            value={homeCountry}
            onChangeText={setHomeCountry}
            placeholder="Ton pays"
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          />

          <ThemedText>Bio (optionnel)</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              isDark && styles.inputDark,
            ]}
            value={bio}
            onChangeText={setBio}
            placeholder="Parle un peu de toi, de tes envies de voyages..."
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
            multiline
          />

          <View style={styles.saveButton}>
            <Button title="Enregistrer le profil" onPress={handleSave} />
          </View>
        </ThemedView>
      </ScrollView>
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
    paddingVertical: 16,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  chip: {
    fontSize: 11,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5563',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  inputDark: {
    borderColor: '#4B5563',
    backgroundColor: '#111827',
    color: '#F9FAFB',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 8,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D4ED8',
    overflow: 'hidden',
  },
  avatarLargeText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerText: {
    flex: 1,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
    opacity: 0.8,
  },
  changeAvatarLink: {
    marginTop: 4,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});