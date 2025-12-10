export type TripNote = {
    id: string;
    date: string;
    text: string;
}

export type Trip = {
    id: string;
    title: string;
    country: string;  // nom affiché (France, Japon, etc.)
    countryCode?: string; // code ISO2 pour les drapeaux (FR, JP, etc.)
    startDate: string;
    endDate: string;
    isRoadtrip?: boolean;
    cities?: string[];
    notes?: TripNote[];
};

export const MOCK_TRIPS: Trip[] = [
{
    id: '1',
    title: 'Roadtrip en Islande',
    country: 'Islande',
    countryCode: 'IS',
    startDate: '2024-06-10',
    endDate: '2024-06-20',
    notes: [
      {
        id: 'n1',
        date: '2024-06-11',
        text: 'Arrivée à Reykjavik, balade dans le centre-ville.',
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
    notes: [
      {
        id: 'n2',
        date: '2023-04-03',
        text: 'Visite du quartier d’Asakusa et du temple Sensō-ji.',
      },
    ],
  },
  {
    id: '3',
    title: 'Baguette',
    country: 'France',
    countryCode: 'FR',
    startDate: '2026-01-01',
    endDate: '2025-12-23',
    isRoadtrip: true,
    cities: ['Paris', 'Lyon', 'Marseille'],
    notes: [],
  }
];