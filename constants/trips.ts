export type TripNote = {
    id: string;
    date: string;
    text: string;
}

export type Activity = {
    id: string;
    title: string;
    date: string;
    time?: string;
    location?: string;
    description?: string;
}

export type Trip = {
    id: string;
    title: string;
    country: string;  // nom affiché (France, Japon, etc.)
    countryCode?: string; // code ISO2 pour les drapeaux (FR, JP, etc.)
    startDate: string;
    endDate: string;
    isRoadtrip?: boolean;
    isFavorite?: boolean;
    cities?: string[];
    notes?: TripNote[];
    activities?: Activity[];
};

export const MOCK_TRIPS: Trip[] = [
{
    id: '1',
    title: 'Roadtrip en Islande',
    country: 'Islande',
    countryCode: 'IS',
    startDate: '2024-06-10',
    endDate: '2024-06-20',
    isRoadtrip: false,
    isFavorite: true,
    cities: [],
    notes: [
      {
        id: 'n1',
        date: '2024-06-11',
        text: 'Arrivée à Reykjavik, balade dans le centre-ville.',
      },
    ],
    activities: [
      {
        id: 'a1',
        title: 'Blue Lagoon',
        date: '2024-06-11',
        time: '10:00',
        location: 'Grindavík',
      },
      {
        id: 'a2',
        title: 'Randonnée au Skaftafell',
        date: '2024-06-13',
        time: '09:00',
        location: 'Parc national du Vatnajökull',
      },
    ],
  },
  {
    id: '2',
    title: 'Découverte du Japon',
    country: 'Japon',
    countryCode: 'JP',
    startDate: '2023-04-02',
    endDate: '2023-04-15',
    isRoadtrip: false,
    isFavorite: false,
    cities: [],
    notes: [
      {
        id: 'n2',
        date: '2023-04-03',
        text: 'Visite du quartier d’Asakusa et du temple Sensō-ji.',
      },
    ],
    activities: [
      {
        id: 'a3',
        title: 'Visite du Fushimi Inari',
        date: '2023-04-06',
        time: '14:00',
        location: 'Kyoto',
      },
    ],
  },
  {
    id: '3',
    title: 'Baguette in Paris',
    country: 'France',
    countryCode: 'FR',
    startDate: '2026-01-01',
    endDate: '2026-01-23',
    isRoadtrip: true,
    isFavorite: true,
    cities: ['Paris', 'Lyon', 'Marseille'],
    notes: [],
    activities: [],
  },
  {
    id: '4',
    title: 'Vamos a España',
    country: 'Espagne',
    countryCode: 'ES',
    startDate: '2025-12-10',
    endDate: '2025-12-24',
    isRoadtrip: true,
    isFavorite: false,
    cities: ['Madrid', 'Barcelone', 'Séville'],
    notes: [],
    activities: [],
  }
];