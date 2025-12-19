# Expo Travel Journal

Projet mobile créé avec Expo & React Native pour gérer et partager des carnets de voyage.

## Présentation

`Expo-Travel-Journal` est une application mobile (Expo) qui permet de créer, visualiser et partager des carnets de voyage. Le projet fournit une base structurée avec navigation par onglets, écrans de profil, d'exploration et de création de voyage.

## Fonctionnalités

- Créer de nouveaux voyages (titre, description, photos, destinations)
- Liste et détail des voyages
- Écran de profil utilisateur
- Navigation par onglets (Explore, Trips, Profile, Settings)
- Support iOS / Android via Expo

## Stack technique

- React Native (TypeScript)
- Expo (managed workflow)
- Hooks personnalisés pour données et thèmes
- Structure de composants réutilisables (components/ et components/ui/)

## Prérequis

- Node.js (>= 14 recommandé)
- npm ou yarn
- Expo CLI (optionnel globalement): `npm install -g expo-cli` ou utiliser `npx expo`

## Installation

1. Cloner le dépôt :

```
git clone <repo-url>
cd expo-travel-journal
```

2. Installer les dépendances :

Avec npm :

```
npm install
```

Avec yarn :

```
yarn install
```

## Lancer le projet (Expo)

Lancer le serveur Metro :

```
npm run start
# ou
yarn start
```

Puis ouvrir l'application :

- Scanner le QR code avec l'application Expo Go (iOS/Android) sur votre téléphone
- Ou lancer un simulateur :
  - iOS : `i` (sur macOS avec Xcode installé)
  - Android : `a` (avec un AVD Android configuré)

Pour démarrer via npx (si `expo-cli` n'est pas installé globalement) :

```
npx expo start
```

## Scripts utiles

- `npm run start` / `yarn start` : démarre Expo Metro
- `npm run ios` / `yarn ios` : lance sur simulateur iOS (macOS seulement)
- `npm run android` / `yarn android` : lance sur AVD Android
- `npm run web` / `yarn web` : lance la version web (si configurée)

Vérifiez le `package.json` pour la liste complète des scripts.

## Structure du projet (extraits)

- `app/` : écrans et navigation (ex : `trip.tsx`, `trip-new.tsx`, `modal.tsx`)
- `components/` : composants réutilisables (UI, icônes, helpers)
- `assets/images/` : images statiques
- `constants/` : thèmes et données statiques
- `hooks/` : hooks personnalisés (`use-trips.tsx`, `use-settings.tsx`, ...)
- `scripts/` : scripts utilitaires (ex: `reset-project.js`)

Consultez le code pour plus de détails sur chaque écran.

## Contribution

1. Créer une branche de feature :

```
git checkout -b feat/ma-fonctionnalite
```

2. Faire vos changements, tester et ouvrir une PR vers la branche principale.

Merci de documenter les changements importants et d'ajouter des captures d'écran si nécessaire.

## Tests & Qualité

Le projet ne contient pas (encore) de suite de tests intégrée. Pour ajouter des tests, envisagez Jest + React Native Testing Library.

## Déploiement

Utilisez les outils Expo pour build & publish : `eas build` / `expo build` selon votre configuration (EAS recommandé pour builds production).

## Ressources utiles

- Docs Expo : https://docs.expo.dev
- React Native : https://reactnative.dev