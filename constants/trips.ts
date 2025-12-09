export type Trip = {
    id: string;
    title: string;
    country: string;
    startDate: string;
    endDate: string;
};

export const MOCK_TRIPS: Trip[] = [
{
    id: '1',
    title: 'Roadtrip en Islande',
    country: 'Islande',
    startDate: '2024-06-10',
    endDate: '2024-06-20',
  },
  {
    id: '2',
    title: 'Découverte du Japon',
    country: 'Japon',
    startDate: '2023-04-02',
    endDate: '2023-04-15',
  },
];