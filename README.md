# Dream Mobile App

Dream Mobile App est une application mobile de journal de rêves qui permet aux utilisateurs de noter leurs rêves, d'enregistrer des détails importants comme l'état émotionnel, les personnages, les lieux, et bien plus encore.

L'application offre également des fonctionnalités de modification et de suppression des rêves enregistrés, ainsi qu'un affichage en mode accordéon pour une navigation simplifiée.

 ## Table des matières
 1. [Technologies utilisées](#technologies-utilisées)
 2. [Fonctionnalités](#fonctionnalités)
 3. [Installation](#installation)
 4. [Lancement de l'application](#lancement-de-lapplication)
 5. [Structure du projet](#structure-du-projet)
 6.  [Utilisation](#utilisation)
 7. [Auteurs](#auteurs) ---

## Technologies utilisées - 
**React Native** : pour le développement de l'application mobile. - 
**Expo** : pour une gestion simplifiée de l'environnement de développement. - 
**AsyncStorage** : pour le stockage local des données de rêve. - 
**React Navigation** : pour la navigation dans l'application. - 
**GitHub Actions** : pour l'intégration continue et le déploiement.

## Fonctionnalités -
**Formulaire de saisie de rêve** : l'utilisateur peut entrer un rêve, avec des détails tels que la date, l'heure, le type de rêve, les personnages, le lieu, et plus encore. - 
**Modification et suppression** : possibilité de modifier ou supprimer les rêves enregistrés. - 
**Affichage en accordéon** : affichage compact des rêves, avec un bouton pour développer chaque rêve et voir les détails. - 
**Notifications et profil** : affichage des notifications en attente et des informations de l'utilisateur sur la page profil.

## Installation Assurez-vous d'avoir **Node.js** et **npm** ou **yarn** installés sur votre machine. Ensuite :
1. **Clonez le dépôt :** ```bash git clone https://github.com/TrillaChan/dream_mobile_app.git cd dream_mobile_app
2. Installez les dépendances :
    npm install ou avec yarn : yarn install
4. Installez Expo CLI si ce n'est pas déjà fait :
   npm install -g expo -cli

## Lancement de l'application :

1. Lancez le serveur Expo :
   expo start

2. Simulateur ou périphérique réel :
  Pour lancer sur un simulateur iOS ou Android, choisissez l'option correspondante dans l'interface Expo qui s'ouvre dans votre navigateur.
  Pour lancer sur un appareil réel, téléchargez l'application Expo Go depuis l'App Store ou le Google Play Store, scannez le QR code affiché par Expo dans le navigateur, et l'application se lancera sur votre appareil.

## Structure du projet

.
├── app                   # Dossier des écrans de navigation de l'application
│   ├── (tabs)            # Navigation par onglets
│   │   ├── index.tsx     # Écran principal (formulaire de rêve)
│   │   ├── two.tsx       # Écran de liste des rêves
│   │   ├── three.tsx     # Écran profil utilisateur
│   └── _layout.tsx       # Layout de navigation globale
├── assets                # Ressources (images, icônes, etc.)
├── components            # Composants de l'application
│   ├── DreamForm.tsx     # Formulaire pour saisir un rêve
│   ├── DreamList.tsx     # Liste des rêves enregistrés
│   ├── DreamItem.tsx     # Composant d'affichage d'un rêve individuel
│   └── UserProfile.tsx   # Composant du profil utilisateur
├── constants             # Constantes de configuration (couleurs, etc.)
├── App.js                # Point d'entrée de l'application
├── app.json              # Configuration de l'application Expo
├── package.json          # Fichier de configuration npm
└── README.md             # Fichier README

## Utilisation
1. Saisir un rêve
  Allez sur l'onglet Formulaire pour entrer un nouveau rêve.
  Remplissez les différents champs : date, heure, type de rêve, intensité émotionnelle, personnages, etc.
  Appuyez sur Soumettre pour enregistrer le rêve.  
2. Afficher et gérer les rêves
  Allez sur l'onglet Liste des rêves pour voir tous les rêves enregistrés.
  Appuyez sur un rêve pour voir ses détails en mode accordéon.
  Utilisez le bouton Modifier pour éditer les informations ou Supprimer pour le supprimer.
3. Voir le profil utilisateur
  Allez sur l'onglet Mon compte pour voir votre profil utilisateur.
  Le profil affiche le nom de l'utilisateur et les notifications en attente.

## Auteurs
Ce projet a été développé par Paolo et Shaïna en SN2.

Merci d'utiliser Dream App ! 🎊
