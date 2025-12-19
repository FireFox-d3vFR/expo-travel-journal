import { useSettings } from './use-settings';

const translations = {
  fr: {
    // Tabs
    'tabs.trips': 'Voyages',
    'tabs.explore': 'Explorer',
    'tabs.profile': 'Profil',
    'tabs.settings': 'Réglages',

    // Liste des voyages
    'trips.title': 'Mes voyages',
    'trips.searchPlaceholder': 'Rechercher un voyage (pays, ville, titre)...',
    'trips.filter.all': 'Tous',
    'trips.filter.favorites': 'Favoris',
    'trips.filter.upcoming': 'À venir',
    'trips.filter.ongoing': 'En cours',
    'trips.filter.finished': 'Terminés',
    'trips.sort.asc': 'Tri ↑',
    'trips.sort.desc': 'Tri ↓',
    'trip.badge.roadtrip': 'ROADTRIP',
    'trips.addButton': '+ Ajouter',

    'tripStatus.upcoming': 'À venir',
    'tripStatus.ongoing': 'En cours',
    'tripStatus.finished': 'Terminé',

    // Nouveau voyage
    'tripNew.title': 'Nouveau voyage',

    'tripNew.field.title': 'Titre',
    'tripNew.field.titlePlaceholder': 'Roadtrip en Islande',
    'tripNew.field.country': 'Pays',
    'tripNew.field.countryPlaceholder': 'Sélectionner un pays',
    'tripNew.field.roadtrip': 'Roadtrip',
    'tripNew.field.cities': 'Étapes (villes)',
    'tripNew.field.citiesEdit': 'Ajouter / modifier les villes',
    'tripNew.field.citiesPlaceholder': 'Sélectionner des villes',
    'tripNew.field.startDate': 'Date de début',
    'tripNew.field.endDate': 'Date de fin',
    'tripNew.field.datePlaceholder': 'Sélectionner une date',

    'tripNew.errors.missingFields.title': 'Champs manquants',
    'tripNew.errors.missingFields.message':
      'Merci de renseigner le titre, le pays et les dates.',
    'tripNew.errors.missingCities.title': 'Villes manquantes',
    'tripNew.errors.missingCities.message':
      'Pour un roadtrip, sélectionne au moins une ville.',
    'tripNew.errors.missingCountry.title': 'Pays manquant',
    'tripNew.errors.missingCountry.message': 'Choisis d’abord un pays.',

    'tripNew.countryModal.title': 'Choisir un pays',
    'tripNew.countryModal.searchPlaceholder': 'Rechercher un pays',
    'tripNew.countryModal.loading': 'Chargement des pays...',

    'tripNew.citiesModal.titlePrefix': 'Villes de',
    'tripNew.citiesModal.searchPlaceholder': 'Rechercher une ville',
    'tripNew.citiesModal.loading': 'Chargement des villes...',
    'tripNew.citiesModal.selectedCountSuffix': 'ville(s) sélectionnée(s)',

    'tripNew.actions.save': 'Enregistrer',
    'tripNew.actions.close': 'Fermer',
    'tripNew.actions.confirm': 'Valider',

        // Écran détail de voyage
    'trip.detail.fallbackTitle': 'Voyage',
    'trip.detail.notFound': 'Voyage introuvable.',
    'trip.detail.citiesLabel': 'Étapes',
    'trip.detail.photosTitle': 'Photos',

    // Statut d'activité
    'activityStatus.today': "Aujourd'hui",
    'activityStatus.upcoming': 'À venir',
    'activityStatus.past': 'Passé',

    // Activités (détail voyage)
    'trip.activities.title': 'Activités',
    'trip.activities.empty':
      'Aucune activité pour le moment. Ajoute la première étape de ton voyage !',
    'trip.activities.actions.add': 'Ajouter',
    'trip.activities.actions.edit': 'Modifier',
    'trip.activities.actions.delete': 'Supprimer',
    'trip.activities.actions.save': 'Enregistrer',

    'trip.activities.errors.missingFields.title': 'Champs manquants',
    'trip.activities.errors.missingFields.message':
      'Merci de renseigner au minimum un titre et une date.',

    'trip.activities.delete.title': 'Supprimer cette activité ?',
    'trip.activities.delete.messagePrefix': '“',
    'trip.activities.delete.messageSuffix': '” sera définitivement supprimée.',

    'trip.activities.modal.editTitle': 'Modifier une activité',
    'trip.activities.modal.createTitle': 'Nouvelle activité',
    'trip.activities.modal.forTripPrefix': 'Pour le voyage :',

    'trip.activities.form.title': 'Titre',
    'trip.activities.form.titlePlaceholder': 'Visite du musée...',
    'trip.activities.form.date': 'Date',
    'trip.activities.form.datePlaceholder': 'Sélectionner une date',
    'trip.activities.form.timeOptional': 'Heure (optionnel)',
    'trip.activities.form.timePlaceholder': 'Sélectionner une heure',
    'trip.activities.form.locationOptional': 'Lieu (optionnel)',
    'trip.activities.form.locationPlaceholder': 'Ville, lieu précis...',
    'trip.activities.form.descriptionOptional': 'Description (optionnel)',
    'trip.activities.form.descriptionPlaceholder': "Détails sur l’activité...",

    // Journal de bord
    'trip.journal.title': 'Journal de bord',
    'trip.journal.empty':
      'Aucune note pour le moment. Ajoute ta première impression de voyage !',
    'trip.journal.addLabel': 'Ajouter une note',
    'trip.journal.placeholder': 'Raconte ta journée...',
    'trip.journal.actions.save': 'Enregistrer la note',
    'trip.journal.actions.edit': 'Modifier',
    'trip.journal.actions.delete': 'Supprimer',

    'trip.journal.summary.one': '1 note enregistrée',
    'trip.journal.summary.other': '{count} notes enregistrées',

    'trip.journal.errors.missingFields.title': 'Champs manquants',
    'trip.journal.errors.missingFields.message':
      'Merci de renseigner au minimum une date et un texte.',

    'trip.journal.delete.title': 'Supprimer cette note ?',

    'trip.journal.modal.editTitle': 'Modifier une note',
    'trip.journal.modal.forTripPrefix': 'Pour le voyage :',
    'trip.journal.form.date': 'Date',
    'trip.journal.form.datePlaceholder': 'Sélectionner une date',
    'trip.journal.form.text': 'Texte',

    // Actions génériques
    'common.actions.cancel': 'Annuler',
    'common.actions.delete': 'Supprimer',
    'common.actions.save': 'Enregistrer',


    // Réglages
    'settings.title': 'Réglages',
    'settings.appearanceTitle': 'Apparence',
    'settings.appearanceDescription':
      'Choisis comment l’application s’adapte au thème de ton téléphone.',
    'settings.theme.system': 'Système',
    'settings.theme.light': 'Clair',
    'settings.theme.dark': 'Sombre',

    'settings.languageTitle': 'Langue',
    'settings.languageDescription': 'Langue principale de l’interface (FR / EN).',
    'settings.language.fr': 'Français',
    'settings.language.en': 'English',
    'settings.languageNote':
      "Pour l’instant, le choix de langue est stocké dans les réglages. On pourra ensuite brancher une vraie traduction des textes FR/EN.",

    // Exploration
    'explore.title': 'Explorer',
    'explore.subtitle': 'Un aperçu de tes aventures.',
    'explore.stats.trips': 'Voyages',
    'explore.stats.days': 'Jours en voyage',
    'explore.nextTrip.title': 'Prochain voyage',
    'explore.nextTrip.none': 'Aucun voyage à venir pour le moment.',
    'explore.longestTrip.title': 'Voyage le plus long',
    'explore.longestTrip.days': 'jours',
    'explore.longestTrip.none': 'Ajoute un voyage pour voir cette statistique.',
    'explore.summary.title': 'Résumé',
    'explore.summary.empty':
    'Commence par ajouter ton premier voyage dans l’onglet Voyages.',
    'explore.summary.part1': 'Tu as déjà enregistré',
    'explore.summary.part2': 'voyage(s) pour un total de',
    'explore.summary.part3': 'jours sur les routes. Continue à explorer le monde !',

    // Profil
    'profile.title': 'Profil',
    'profile.header.defaultName': 'Mon profil',
    'profile.header.basedInPrefix': 'Basé·e en',
    'profile.header.changeAvatar': 'Changer la photo de profil',

    'profile.stats.title': 'Statistiques de voyage',
    'profile.stats.trips': 'Voyages',
    'profile.stats.countries': 'Pays visités',
    'profile.stats.days': 'Jours en voyage',
    'profile.stats.upcoming': 'À venir',
    'profile.stats.ongoing': 'En cours',
    'profile.stats.finished': 'Terminés',

    'profile.form.title': 'Informations personnelles',
    'profile.form.displayName': 'Nom affiché',
    'profile.form.displayNamePlaceholder': 'Ton nom ou pseudo',
    'profile.form.email': 'Email (optionnel)',
    'profile.form.emailPlaceholder': 'email@example.com',
    'profile.form.city': 'Ville (optionnel)',
    'profile.form.cityPlaceholder': 'Ta ville',
    'profile.form.country': 'Pays (optionnel)',
    'profile.form.countryPlaceholder': 'Ton pays',
    'profile.form.bio': 'Bio (optionnel)',
    'profile.form.bioPlaceholder':
    'Parle un peu de toi, de tes envies de voyages...',
    'profile.form.saveButton': 'Enregistrer le profil',

    'profile.avatar.permissionTitle': 'Permission requise',
    'profile.avatar.permissionMessage':
    "Nous avons besoin de la permission d'accéder à ta galerie pour choisir une photo de profil.",

    'profile.save.missingNameTitle': 'Nom requis',
    'profile.save.missingNameMessage': 'Merci de renseigner un nom.',
    'profile.save.successTitle': 'Profil mis à jour',
    'profile.save.successMessage': 'Tes informations ont été enregistrées ✅',
    'profile.save.successToast': 'Profil mis à jour ✅',

    'trip.detail.shareButton': 'Partager',

    'trip.detail.delete.title': 'Supprimer ce voyage ?',
    'trip.detail.delete.message':
      'Ce voyage et toutes ses données (activités, notes) seront définitivement supprimés.',
    'trip.detail.delete.button': 'Supprimer ce voyage',
  },

  en: {
    // Tabs
    'tabs.trips': 'Trips',
    'tabs.explore': 'Explore',
    'tabs.profile': 'Profile',
    'tabs.settings': 'Settings',

    // Trips list
    'trips.title': 'My trips',
    'trips.searchPlaceholder': 'Search a trip (country, city, title)...',
    'trips.filter.all': 'All',
    'trips.filter.favorites': 'Favorites',
    'trips.filter.upcoming': 'Upcoming',
    'trips.filter.ongoing': 'Ongoing',
    'trips.filter.finished': 'Finished',
    'trips.sort.asc': 'Sort ↑',
    'trips.sort.desc': 'Sort ↓',

    'tripStatus.upcoming': 'Upcoming',
    'tripStatus.ongoing': 'Ongoing',
    'tripStatus.finished': 'Finished',
    'trip.badge.roadtrip': 'ROADTRIP',
    'trips.addButton': '+ Add',

    // New trip
    'tripNew.title': 'New trip',

    'tripNew.field.title': 'Title',
    'tripNew.field.titlePlaceholder': 'Roadtrip in Iceland',
    'tripNew.field.country': 'Country',
    'tripNew.field.countryPlaceholder': 'Select a country',
    'tripNew.field.roadtrip': 'Roadtrip',
    'tripNew.field.cities': 'Stops (cities)',
    'tripNew.field.citiesEdit': 'Add / edit cities',
    'tripNew.field.citiesPlaceholder': 'Select cities',
    'tripNew.field.startDate': 'Start date',
    'tripNew.field.endDate': 'End date',
    'tripNew.field.datePlaceholder': 'Select a date',

    'tripNew.errors.missingFields.title': 'Missing fields',
    'tripNew.errors.missingFields.message':
      'Please fill in the title, country and dates.',
    'tripNew.errors.missingCities.title': 'Missing cities',
    'tripNew.errors.missingCities.message':
      'For a roadtrip, select at least one city.',
    'tripNew.errors.missingCountry.title': 'Missing country',
    'tripNew.errors.missingCountry.message': 'Please choose a country first.',

    'tripNew.countryModal.title': 'Choose a country',
    'tripNew.countryModal.searchPlaceholder': 'Search a country',
    'tripNew.countryModal.loading': 'Loading countries...',

    'tripNew.citiesModal.titlePrefix': 'Cities in',
    'tripNew.citiesModal.searchPlaceholder': 'Search a city',
    'tripNew.citiesModal.loading': 'Loading cities...',
    'tripNew.citiesModal.selectedCountSuffix': 'selected city(ies)',

    'tripNew.actions.save': 'Save',
    'tripNew.actions.close': 'Close',
    'tripNew.actions.confirm': 'Confirm',

        // Trip detail screen
    'trip.detail.fallbackTitle': 'Trip',
    'trip.detail.notFound': 'Trip not found.',
    'trip.detail.citiesLabel': 'Stops',
    'trip.detail.photosTitle': 'Photos',

    // Activity status
    'activityStatus.today': 'Today',
    'activityStatus.upcoming': 'Upcoming',
    'activityStatus.past': 'Past',

    // Activities (trip detail)
    'trip.activities.title': 'Activities',
    'trip.activities.empty':
      'No activity yet. Add the first step of your trip!',
    'trip.activities.actions.add': 'Add',
    'trip.activities.actions.edit': 'Edit',
    'trip.activities.actions.delete': 'Delete',
    'trip.activities.actions.save': 'Save',

    'trip.activities.errors.missingFields.title': 'Missing fields',
    'trip.activities.errors.missingFields.message':
      'Please provide at least a title and a date.',

    'trip.activities.delete.title': 'Delete this activity?',
    'trip.activities.delete.messagePrefix': '“',
    'trip.activities.delete.messageSuffix': '” will be permanently deleted.',

    'trip.activities.modal.editTitle': 'Edit activity',
    'trip.activities.modal.createTitle': 'New activity',
    'trip.activities.modal.forTripPrefix': 'For trip:',

    'trip.activities.form.title': 'Title',
    'trip.activities.form.titlePlaceholder': 'Visit the museum...',
    'trip.activities.form.date': 'Date',
    'trip.activities.form.datePlaceholder': 'Select a date',
    'trip.activities.form.timeOptional': 'Time (optional)',
    'trip.activities.form.timePlaceholder': 'Select a time',
    'trip.activities.form.locationOptional': 'Location (optional)',
    'trip.activities.form.locationPlaceholder': 'City, exact place...',
    'trip.activities.form.descriptionOptional': 'Description (optional)',
    'trip.activities.form.descriptionPlaceholder': 'Details about the activity...',

    // Journal
    'trip.journal.title': 'Travel journal',
    'trip.journal.empty':
      'No note yet. Add your first travel impression!',
    'trip.journal.addLabel': 'Add a note',
    'trip.journal.placeholder': 'Tell about your day...',
    'trip.journal.actions.save': 'Save note',
    'trip.journal.actions.edit': 'Edit',
    'trip.journal.actions.delete': 'Delete',

    'trip.journal.summary.one': '1 note saved',
    'trip.journal.summary.other': '{count} notes saved',

    'trip.journal.errors.missingFields.title': 'Missing fields',
    'trip.journal.errors.missingFields.message':
      'Please provide at least a date and some text.',

    'trip.journal.delete.title': 'Delete this note?',

    'trip.journal.modal.editTitle': 'Edit note',
    'trip.journal.modal.forTripPrefix': 'For trip:',
    'trip.journal.form.date': 'Date',
    'trip.journal.form.datePlaceholder': 'Select a date',
    'trip.journal.form.text': 'Text',

    // Generic actions
    'common.actions.cancel': 'Cancel',
    'common.actions.delete': 'Delete',
    'common.actions.save': 'Save',

    // Settings
    'settings.title': 'Settings',
    'settings.appearanceTitle': 'Appearance',
    'settings.appearanceDescription':
      'Choose how the app adapts to your phone theme.',
    'settings.theme.system': 'System',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',

    'settings.languageTitle': 'Language',
    'settings.languageDescription': 'Main interface language (FR / EN).',
    'settings.language.fr': 'French',
    'settings.language.en': 'English',
    'settings.languageNote':
      'For now, the selected language is only stored in settings. We could later plug real translations everywhere.',

    // Explore
    'explore.title': 'Explore',
    'explore.subtitle': 'An overview of your adventures.',
    'explore.stats.trips': 'Trips',
    'explore.stats.days': 'Days traveling',
    'explore.nextTrip.title': 'Next trip',
    'explore.nextTrip.none': 'No upcoming trip yet.',
    'explore.longestTrip.title': 'Longest trip',
    'explore.longestTrip.days': 'days',
    'explore.longestTrip.none': 'Add a trip to see this statistic.',
    'explore.summary.title': 'Summary',
    'explore.summary.empty':
    'Start by adding your first trip in the Trips tab.',
    'explore.summary.part1': 'You have already recorded',
    'explore.summary.part2': 'trip(s) for a total of',
    'explore.summary.part3': 'days on the road. Keep exploring the world!',

    // Profile
    'profile.title': 'Profile',
    'profile.header.defaultName': 'My profile',
    'profile.header.basedInPrefix': 'Based in',
    'profile.header.changeAvatar': 'Change profile picture',

    'profile.stats.title': 'Travel statistics',
    'profile.stats.trips': 'Trips',
    'profile.stats.countries': 'Countries visited',
    'profile.stats.days': 'Days traveling',
    'profile.stats.upcoming': 'Upcoming',
    'profile.stats.ongoing': 'Ongoing',
    'profile.stats.finished': 'Finished',

    'profile.form.title': 'Personal information',
    'profile.form.displayName': 'Display name',
    'profile.form.displayNamePlaceholder': 'Your name or nickname',
    'profile.form.email': 'Email (optional)',
    'profile.form.emailPlaceholder': 'email@example.com',
    'profile.form.city': 'City (optional)',
    'profile.form.cityPlaceholder': 'Your city',
    'profile.form.country': 'Country (optional)',
    'profile.form.countryPlaceholder': 'Your country',
    'profile.form.bio': 'Bio (optional)',
    'profile.form.bioPlaceholder':
    'Tell a bit about yourself and your travel plans...',
    'profile.form.saveButton': 'Save profile',

    'profile.avatar.permissionTitle': 'Permission required',
    'profile.avatar.permissionMessage':
    'We need access to your gallery to choose a profile picture.',
    'profile.save.missingNameTitle': 'Name required',
    'profile.save.missingNameMessage': 'Please enter a name.',
    'profile.save.successTitle': 'Profile updated',
    'profile.save.successMessage': 'Your information has been saved ✅',
    'profile.save.successToast': 'Profile updated ✅',

    'trip.detail.shareButton': 'Share',

    'trip.detail.delete.title': 'Delete this trip?',
    'trip.detail.delete.message':
      'This trip and all its data (activities, notes) will be permanently deleted.',
    'trip.detail.delete.button': 'Delete this trip',

  },
} as const;

export type TranslationKey = keyof typeof translations.fr;

export function useTranslation() {
  const { language } = useSettings();
  const lang = language ?? 'fr';

  const t = (key: TranslationKey): string => {
    const dict = translations[lang as 'fr' | 'en'] ?? translations.fr;
    // petit cast pour TS, mais runtime safe
    return (dict as any)[key] ?? (translations.fr as any)[key] ?? key;
  };

  return { t, lang };
}