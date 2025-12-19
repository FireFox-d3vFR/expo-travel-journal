// import { useSettings } from './use-settings';

// const translations = {
//   fr: {
//     // Tabs
//     'tabs.trips': 'Voyages',
//     'tabs.explore': 'Explorer',
//     'tabs.profile': 'Profil',
//     'tabs.settings': 'Réglages',

//     // Liste des voyages
//     'trips.title': 'Mes voyages',
//     'trips.searchPlaceholder':
//       'Rechercher un voyage (pays, ville, titre)...',
//     'trips.filter.all': 'Tous',
//     'trips.filter.favorites': 'Favoris',
//     'trips.filter.upcoming': 'À venir',
//     'trips.filter.ongoing': 'En cours',
//     'trips.filter.finished': 'Terminés',
//     'trips.sort.asc': 'Tri ↑',
//     'trips.sort.desc': 'Tri ↓',

//     'tripStatus.upcoming': 'À venir',
//     'tripStatus.ongoing': 'En cours',
//     'tripStatus.finished': 'Terminé',

//     // Réglages
//     'settings.title': 'Réglages',
//     'settings.appearanceTitle': 'Apparence',
//     'settings.appearanceDescription':
//       'Choisis comment l’application s’adapte au thème de ton téléphone.',
//     'settings.theme.system': 'Système',
//     'settings.theme.light': 'Clair',
//     'settings.theme.dark': 'Sombre',

//     'settings.languageTitle': 'Langue',
//     'settings.languageDescription':
//       'Langue principale de l’interface (FR / EN).',
//     'settings.language.fr': 'Français',
//     'settings.language.en': 'English',
//     'settings.languageNote':
//       "Pour l’instant, le choix de langue est stocké dans les réglages. On pourra ensuite brancher une vraie traduction des textes FR/EN.",
//   },

//   en: {
//     // Tabs
//     'tabs.trips': 'Trips',
//     'tabs.explore': 'Explore',
//     'tabs.profile': 'Profile',
//     'tabs.settings': 'Settings',

//     // Trips list
//     'trips.title': 'My trips',
//     'trips.searchPlaceholder':
//       'Search a trip (country, city, title)...',
//     'trips.filter.all': 'All',
//     'trips.filter.favorites': 'Favorites',
//     'trips.filter.upcoming': 'Upcoming',
//     'trips.filter.ongoing': 'Ongoing',
//     'trips.filter.finished': 'Finished',
//     'trips.sort.asc': 'Sort ↑',
//     'trips.sort.desc': 'Sort ↓',

//     'tripStatus.upcoming': 'Upcoming',
//     'tripStatus.ongoing': 'Ongoing',
//     'tripStatus.finished': 'Finished',

//     // Settings
//     'settings.title': 'Settings',
//     'settings.appearanceTitle': 'Appearance',
//     'settings.appearanceDescription':
//       'Choose how the app adapts to your phone theme.',
//     'settings.theme.system': 'System',
//     'settings.theme.light': 'Light',
//     'settings.theme.dark': 'Dark',

//     'settings.languageTitle': 'Language',
//     'settings.languageDescription':
//       'Main interface language (FR / EN).',
//     'settings.language.fr': 'French',
//     'settings.language.en': 'English',
//     'settings.languageNote':
//       'For now, the selected language is only stored in settings. We could later plug real translations everywhere.',
//   },
// } as const;

// export type TranslationKey = keyof typeof translations.fr;

// export function useTranslation() {
//   const { settings } = useSettings();
//   const lang = settings.language ?? 'fr';

//   const t = (key: TranslationKey): string => {
//     const dict = translations[lang] ?? translations.fr;
//     return dict[key] ?? translations.fr[key] ?? key;
//   };

//   return { t, lang };
// }
