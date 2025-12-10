import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Stack, router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native';

import { CountryFlag } from '@/components/country-flag';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCities } from '@/hooks/use-cities';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CountryOption, useCountries } from '@/hooks/use-countries';
import { useTrips } from '@/hooks/use-trips';

function formatDate(date: Date | null) {
  if (!date) return '';
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function NewTripScreen() {
  const { addTrip } = useTrips();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [title, setTitle] = useState('');

  // Pays
  const { countries, loading: loadingCountries, error: countriesError } =
    useCountries();
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );

  // Roadtrip
  const [isRoadtrip, setIsRoadtrip] = useState(false);
  const [citiesModalVisible, setCitiesModalVisible] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  // Dates
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const filteredCountries = useMemo(() => {
    const query = countrySearch.toLowerCase();
    if (!query) return countries;
    return countries.filter((c) =>
      c.name.toLowerCase().includes(query)
    );
  }, [countries, countrySearch]);

  // Villes du pays sélectionné (API)
  const {
    cities,
    loading: loadingCities,
    error: citiesError,
  } = useCities(selectedCountry?.name);

  const filteredCities = useMemo(() => {
    const q = citySearch.toLowerCase();
    if (!q) return cities;
    return cities.filter((name) => name.toLowerCase().includes(q));
  }, [cities, citySearch]);

  const handleChangeStart = (event: DateTimePickerEvent, date?: Date) => {
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

    if (!title || !selectedCountry || !startDateStr || !endDateStr) {
      Alert.alert(
        'Champs manquants',
        'Merci de renseigner le titre, le pays et les dates.'
      );
      return;
    }

    if (isRoadtrip && selectedCities.length === 0) {
      Alert.alert(
        'Villes manquantes',
        'Pour un roadtrip, sélectionne au moins une ville.'
      );
      return;
    }

    addTrip({
      title,
      country: selectedCountry.name,
      countryCode: selectedCountry.code,
      startDate: startDateStr,
      endDate: endDateStr,
      isRoadtrip,
      cities: isRoadtrip ? selectedCities : [],
    });

    router.replace('/');
  };

  const openCountryModal = () => {
    setCountrySearch('');
    setCountryModalVisible(true);
  };

  const selectCountry = (country: CountryOption) => {
    setSelectedCountry(country);
    setCountryModalVisible(false);
    // on reset les villes quand on change de pays
    setSelectedCities([]);
    setCitySearch('');
  };

  const openCitiesModal = () => {
    if (!selectedCountry) {
      Alert.alert('Pays manquant', 'Choisis d’abord un pays.');
      return;
    }
    setCitySearch('');
    setCitiesModalVisible(true);
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city]
    );
  };

  const isCitySelected = (city: string) =>
    selectedCities.includes(city);

  return (
    <>
      <Stack.Screen options={{ title: 'Nouveau voyage' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.heading}>
          Nouveau voyage
        </ThemedText>

        {/* Titre */}
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

        {/* Pays */}
        <ThemedText>Pays</ThemedText>
        <Pressable
          onPress={openCountryModal}
          style={[styles.input, styles.countryButton, isDark && styles.inputDark]}
        >
          <View style={styles.countryButtonContent}>
            {selectedCountry ? (
              <>
                <CountryFlag
                  countryCode={selectedCountry.code}
                  countryName={selectedCountry.name}
                  size={28}
                />
                <ThemedText style={styles.countryButtonText}>
                  {selectedCountry.name}
                </ThemedText>
              </>
            ) : (
              <ThemedText style={styles.countryPlaceholder}>
                Sélectionner un pays
              </ThemedText>
            )}
          </View>
        </Pressable>

        {/* Roadtrip */}
        <View style={styles.roadtripRow}>
          <ThemedText>Roadtrip</ThemedText>
          <Switch
            value={isRoadtrip}
            onValueChange={setIsRoadtrip}
          />
        </View>

        {isRoadtrip && selectedCountry && (
          <>
            <ThemedText>Étapes (villes)</ThemedText>
            <Pressable
              onPress={openCitiesModal}
              style={[styles.input, isDark && styles.inputDark]}
            >
              <ThemedText>
                {selectedCities.length > 0
                  ? 'Ajouter / modifier les villes'
                  : 'Sélectionner des villes'}
              </ThemedText>
            </Pressable>

            {selectedCities.length > 0 && (
              <View style={styles.selectedCitiesContainer}>
                {selectedCities.map((city) => (
                  <View key={city} style={styles.cityChip}>
                    <ThemedText style={styles.cityChipText}>{city}</ThemedText>
                    <Pressable onPress={() => toggleCity(city)}>
                      <ThemedText style={styles.cityChipRemove}>×</ThemedText>
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        {/* Dates */}
        <ThemedText>Date de début</ThemedText>
        <Pressable
          onPress={() => setShowStartPicker(true)}
          style={[styles.input, isDark && styles.inputDark]}
        >
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
          style={[styles.input, isDark && styles.inputDark]}
        >
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

      {/* Modal pays */}
      <Modal
        visible={countryModalVisible}
        animationType="slide"
        onRequestClose={() => setCountryModalVisible(false)}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedText type="title" style={styles.modalTitle}>
            Choisir un pays
          </ThemedText>

          {countriesError ? (
            <ThemedText style={styles.modalError}>
              {countriesError}
            </ThemedText>
          ) : (
            <>
              <TextInput
                style={[
                  styles.input,
                  styles.textInput,
                  isDark && styles.inputDark,
                  isDark && styles.textInputDark,
                  styles.searchInput,
                ]}
                placeholder="Rechercher un pays"
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={countrySearch}
                onChangeText={setCountrySearch}
              />

              {loadingCountries ? (
                <ThemedText style={styles.modalInfo}>
                  Chargement des pays...
                </ThemedText>
              ) : (
                <FlatList
                  data={filteredCountries}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => selectCountry(item)}
                      style={styles.countryItem}
                    >
                      <CountryFlag
                        countryCode={item.code}
                        countryName={item.name}
                        size={24}
                      />
                      <ThemedText style={styles.countryItemText}>
                        {item.name}
                      </ThemedText>
                    </Pressable>
                  )}
                />
              )}
            </>
          )}

          <View style={styles.modalFooter}>
            <Button
              title="Fermer"
              onPress={() => setCountryModalVisible(false)}
            />
          </View>
        </ThemedView>
      </Modal>

      {/* Modal villes */}
      <Modal
        visible={citiesModalVisible}
        animationType="slide"
        onRequestClose={() => setCitiesModalVisible(false)}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedText type="title" style={styles.modalTitle}>
            Villes de {selectedCountry?.name}
          </ThemedText>

          {citiesError ? (
            <ThemedText style={styles.modalError}>
              {citiesError}
            </ThemedText>
          ) : (
            <>
              <TextInput
                style={[
                  styles.input,
                  styles.textInput,
                  isDark && styles.inputDark,
                  isDark && styles.textInputDark,
                  styles.searchInput,
                ]}
                placeholder="Rechercher une ville"
                placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                value={citySearch}
                onChangeText={setCitySearch}
              />

              {loadingCities ? (
                <ThemedText style={styles.modalInfo}>
                  Chargement des villes...
                </ThemedText>
              ) : (
                <FlatList
                  data={filteredCities}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const selected = isCitySelected(item);
                    return (
                      <Pressable
                        onPress={() => toggleCity(item)}
                        style={[
                          styles.cityItem,
                          selected && styles.cityItemSelected,
                        ]}
                      >
                        <ThemedText
                          style={
                            selected
                              ? styles.cityItemSelectedText
                              : undefined
                          }
                        >
                          {item}
                        </ThemedText>
                      </Pressable>
                    );
                  }}
                />
              )}
            </>
          )}

          <View style={styles.modalFooter}>
            <ThemedText style={styles.modalInfo}>
              {selectedCities.length} ville(s) sélectionnée(s)
            </ThemedText>
            <Button
              title="Valider"
              onPress={() => setCitiesModalVisible(false)}
            />
          </View>
        </ThemedView>
      </Modal>
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
  countryButton: {
    justifyContent: 'center',
  },
  countryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryButtonText: {
    flex: 1,
  },
  countryPlaceholder: {
    opacity: 0.7,
  },
  roadtripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  selectedCitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  cityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  cityChipText: {
    fontSize: 12,
  },
  cityChipRemove: {
    fontSize: 12,
    opacity: 0.8,
  },
  // Modals
  modalContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    gap: 8,
  },
  modalTitle: {
    marginBottom: 8,
  },
  modalInfo: {
    marginTop: 8,
    opacity: 0.8,
  },
  modalError: {
    marginTop: 8,
    color: '#f87171',
  },
  searchInput: {
    marginTop: 8,
    marginBottom: 8,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  countryItemText: {
    flex: 1,
  },
  modalFooter: {
    marginTop: 8,
  },
  cityItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  cityItemSelected: {
    backgroundColor: '#2563EB',
  },
  cityItemSelectedText: {
    color: '#F9FAFB',
  },
});
