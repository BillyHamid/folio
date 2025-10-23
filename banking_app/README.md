# BankApp - Application Bancaire Flutter

Une application bancaire moderne développée avec Flutter, offrant une interface utilisateur élégante et des fonctionnalités bancaires essentielles.

## 📱 Fonctionnalités

### 🔐 Authentification
- Connexion sécurisée avec email et mot de passe
- Gestion des sessions utilisateur
- Déconnexion

### 🏠 Tableau de bord
- Vue d'ensemble des comptes
- Solde total en temps réel
- Revenus et dépenses mensuels
- Actions rapides (virements, cartes, statistiques)
- Transactions récentes

### 💳 Gestion des comptes
- Comptes courants, épargne, crédit et investissement
- Affichage des soldes et détails des comptes
- Interface moderne avec cartes colorées

### 💸 Transactions
- Historique complet des transactions
- Filtrage par catégories
- Affichage détaillé avec icônes et couleurs
- Catégories : Salaire, Achats, Alimentation, Transport, etc.

### 🏧 Cartes bancaires
- Affichage des cartes avec design réaliste
- Cartes de débit et crédit
- Support Visa, Mastercard, American Express
- Informations masquées pour la sécurité

### 💰 Virements
- Virements entre comptes
- Validation des montants et soldes
- Interface intuitive avec sélection de comptes
- Confirmation des opérations

### 👤 Profil utilisateur
- Informations personnelles
- Paramètres du compte
- Déconnexion sécurisée

## 🛠️ Technologies utilisées

- **Flutter** - Framework de développement mobile
- **Dart** - Langage de programmation
- **Provider** - Gestion d'état
- **Google Fonts** - Typographie moderne
- **Font Awesome** - Icônes
- **Shared Preferences** - Stockage local
- **Intl** - Internationalisation et formatage des dates

## 🚀 Installation et lancement

### Prérequis
- Flutter SDK (version 3.24.5 ou supérieure)
- Dart SDK
- Android Studio ou VS Code
- Émulateur Android/iOS ou appareil physique

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   cd /workspace/banking_app
   ```

2. **Installer les dépendances**
   ```bash
   flutter pub get
   ```

3. **Lancer l'application**
   ```bash
   flutter run
   ```

## 🔑 Compte de démonstration

Pour tester l'application, utilisez les identifiants suivants :

- **Email :** demo@bank.com
- **Mot de passe :** demo123

## 📁 Structure du projet

```
lib/
├── main.dart                 # Point d'entrée de l'application
├── models/                   # Modèles de données
│   ├── user.dart
│   ├── account.dart
│   ├── transaction.dart
│   └── card.dart
├── providers/                # Gestion d'état avec Provider
│   ├── auth_provider.dart
│   └── banking_provider.dart
├── screens/                  # Écrans de l'application
│   ├── login_screen.dart
│   ├── dashboard_screen.dart
│   ├── transactions_screen.dart
│   ├── profile_screen.dart
│   ├── cards_screen.dart
│   └── transfer_screen.dart
├── services/                 # Services métier
│   ├── auth_service.dart
│   └── banking_service.dart
└── widgets/                  # Composants réutilisables
    ├── account_card.dart
    ├── transaction_item.dart
    └── quick_action_button.dart
```

## 🎨 Design et UX

L'application utilise un design moderne avec :
- **Couleurs principales :** Bleu (#1E3A8A) et variations
- **Typographie :** Google Fonts (Poppins)
- **Interface :** Material Design 3
- **Animations :** Transitions fluides
- **Responsive :** Adaptation aux différentes tailles d'écran

## 📊 Données d'exemple

L'application inclut des données de démonstration :
- 3 comptes (Courant, Épargne, Crédit)
- Historique de transactions réalistes
- 2 cartes bancaires (Visa et Mastercard)
- Utilisateur de test avec profil complet

## 🔒 Sécurité

- Authentification simulée avec validation
- Masquage des numéros de carte
- Gestion sécurisée des sessions
- Validation des formulaires

## 🚧 Fonctionnalités futures

- [ ] Notifications push
- [ ] Graphiques et statistiques avancées
- [ ] Paiements mobiles
- [ ] Chat support client
- [ ] Biométrie (empreinte/Face ID)
- [ ] Mode sombre
- [ ] Multi-devises
- [ ] Planification de virements

## 📱 Compatibilité

- **Android :** API 21+ (Android 5.0+)
- **iOS :** iOS 12.0+
- **Web :** Support expérimental

## 🤝 Contribution

Cette application est un projet de démonstration. Pour contribuer :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement

---

**BankApp** - Votre banque digitale moderne 🏦✨