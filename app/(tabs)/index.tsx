import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CountryFlag } from '@/components/country-flag';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Trip } from '@/constants/trips';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTrips } from '@/hooks/use-trips';
import { useUserProfile } from '@/hooks/use-user-profile';
// import { useTranslation } from '@/hooks/use-translation';

type SortDirection = 'asc' | 'desc';
type TripFilter = 'all' | 'favorites' | 'upcoming' | 'ongoing' | 'finished';

function getTripStatus(
  trip: Trip
): 'upcoming' | 'ongoing' | 'finished' {
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

function getInitials(name: string) {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '🙂';
  return parts
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Onglet "Voyages" : liste des trips.
 */
export default function TripsListScreen() {
  const { trips, toggleFavorite } = useTrips();
  const { profile } = useUserProfile();
  // const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const [sortDirection, setSortDirection] =
    useState<SortDirection>('desc');
  const [activeFilter, setActiveFilter] =
    useState<TripFilter>('all');
  const [search, setSearch] = useState('');

  const filteredTrips = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...trips];

    // 1) filtre thématique
    list = list.filter((trip) => {
      const status = getTripStatus(trip);

      if (activeFilter === 'favorites' && !trip.isFavorite)
        return false;
      if (activeFilter === 'upcoming' && status !== 'upcoming')
        return false;
      if (activeFilter === 'ongoing' && status !== 'ongoing')
        return false;
      if (activeFilter === 'finished' && status !== 'finished')
        return false;

      return true;
    });

    // 2) recherche (titre, pays, villes)
    if (q) {
      list = list.filter((trip) => {
        const haystack = [
          trip.title,
          trip.country,
          ...(trip.cities ?? []),
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(q);
      });
    }

    // 3) tri : favoris d’abord, puis date de début asc/desc
    list.sort((a, b) => {
      const favA = a.isFavorite ? 1 : 0;
      const favB = b.isFavorite ? 1 : 0;

      if (favA !== favB) return favB - favA;

      const cmp = a.startDate.localeCompare(b.startDate);
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [trips, activeFilter, search, sortDirection]);

  const toggleSort = () => {
    setSortDirection((prev) =>
      prev === 'asc' ? 'desc' : 'asc'
    );
  };

  const renderItem = ({ item }: { item: Trip }) => {
    const status = getTripStatus(item);

    return (
      <TouchableOpacity
        style={[
          styles.tripCard,
          colorScheme === 'dark' && styles.tripCardDark,
        ]}
        onPress={() =>
          router.push({
            pathname: '/trip',
            params: { id: item.id },
          })
        }
      >
        <View style={styles.cardRow}>
          <View style={styles.cardText}>
            {/* Titre + étoile favoris */}
            <View style={styles.tripHeaderRow}>
              <ThemedText
                type="defaultSemiBold"
                style={styles.tripTitle}
              >
                {item.title}
              </ThemedText>

              <Pressable
                hitSlop={8}
                onPress={() => toggleFavorite(item.id)}
              >
                <ThemedText
                  style={[
                    styles.favoriteIcon,
                    item.isFavorite &&
                      styles.favoriteIconActive,
                  ]}
                >
                  {item.isFavorite ? '★' : '☆'}
                </ThemedText>
              </Pressable>
            </View>

            {/* Pays + badge roadtrip */}
            <View style={styles.countryRow}>
              <ThemedText style={styles.tripSubtitle}>
                {item.country}
              </ThemedText>
              {item.isRoadtrip && (
                <View style={styles.roadtripBadge}>
                  <ThemedText
                    style={styles.roadtripBadgeText}
                  >
                    ROADTRIP
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Dates + badge statut */}
            <View style={styles.bottomRow}>
              <ThemedText style={styles.tripDates}>
                {item.startDate} → {item.endDate}
              </ThemedText>

              <View
                style={[
                  styles.statusBadge,
                  status === 'upcoming' &&
                    styles.statusUpcoming,
                  status === 'ongoing' &&
                    styles.statusOngoing,
                  status === 'finished' &&
                    styles.statusFinished,
                ]}
              >
                <ThemedText style={styles.statusText}>
                  {status === 'upcoming'
                    ? 'À venir'
                    : status === 'ongoing'
                    ? 'En cours'
                    : 'Terminé'}
                </ThemedText>
              </View>
            </View>
          </View>

          <CountryFlag
            countryCode={item.countryCode}
            countryName={item.country}
            size={40}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView
      style={[
        styles.container,
        { paddingTop: insets.top + 8 },
      ]}
    >
      {/* Header + actions */}
      <ThemedView style={styles.headerRow}>
        <ThemedText type="title" style={styles.heading}>
          Mes voyages
        </ThemedText>

        <View style={styles.headerRightRow}>
          {/* Avatar profil */}
        <Pressable
            onPress={() => router.push('/profile')}
            hitSlop={8}
          >
            <View style={styles.avatarSmall}>
              {profile.avatarUrl ? (
                <Image
                  source={{ uri: profile.avatarUrl }}
                  style={styles.avatarSmallImage}
                />
              ) : (
                <ThemedText style={styles.avatarSmallText}>
                  {getInitials(profile.name)}
                </ThemedText>
              )}
            </View>
          </Pressable>


          <Pressable onPress={toggleSort}>
            <ThemedText type="link">
              {sortDirection === 'asc'
                ? 'Tri ↑'
                : 'Tri ↓'}
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => router.push('/trip-new')}>
            <ThemedText type="link">+ Ajouter</ThemedText>
          </Pressable>
        </View>
      </ThemedView>

      {/* Barre de recherche */}
      <TextInput
        style={[
          styles.searchInput,
          colorScheme === 'dark' && styles.searchInputDark,
        ]}
        placeholder="Rechercher un voyage (pays, ville, titre)..."
        placeholderTextColor={
          colorScheme === 'dark' ? '#6B7280' : '#9CA3AF'
        }
        value={search}
        onChangeText={setSearch}
      />

      {/* Filtres thématiques */}
      <View style={styles.filtersRow}>
        {[
          { key: 'all', label: 'Tous' },
          { key: 'favorites', label: 'Favoris' },
          { key: 'upcoming', label: 'À venir' },
          { key: 'ongoing', label: 'En cours' },
          { key: 'finished', label: 'Terminés' },
        ].map((filter) => {
          const active =
            activeFilter === (filter.key as TripFilter);
          return (
            <Pressable
              key={filter.key}
              onPress={() =>
                setActiveFilter(filter.key as TripFilter)
              }
              style={[
                styles.filterChip,
                active && styles.filterChipActive,
              ]}
            >
              <ThemedText
                style={[
                  styles.filterChipText,
                  active && styles.filterChipTextActive,
                ]}
              >
                {filter.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredTrips}
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
  headerRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heading: {},
  listContent: {
    paddingBottom: 16,
  },

  // Recherche + filtres
  searchInput: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  searchInputDark: {
    borderColor: '#4B5563',
    backgroundColor: '#111827',
    color: '#F9FAFB',
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5563',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterChipText: {
    fontSize: 13,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Cartes de voyages
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
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardText: {
    flex: 1,
    paddingRight: 8,
  },
  tripHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tripTitle: {
    marginBottom: 4,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  roadtripBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  roadtripBadgeText: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  tripSubtitle: {
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 12,
    opacity: 0.7,
  },
  favoriteIcon: {
    fontSize: 18,
    opacity: 0.6,
  },
  favoriteIconActive: {
    opacity: 1,
  },

  // Statut du voyage
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  statusUpcoming: {
    borderColor: '#2563EB',
  },
  statusOngoing: {
    borderColor: '#22c55e',
  },
  statusFinished: {
    borderColor: '#6B7280',
  },
  statusText: {
    fontSize: 11,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B5563',
    overflow: 'hidden',
  },
  avatarSmallText: {
    fontSize: 14,
    fontWeight: '600',
  },
  avatarSmallImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});