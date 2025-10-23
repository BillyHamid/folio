#!/bin/bash

# Script de lancement de l'application bancaire Flutter

echo "🏦 BankApp - Application Bancaire Flutter"
echo "========================================"

# Vérifier si Flutter est dans le PATH
if ! command -v flutter &> /dev/null; then
    echo "⚠️  Flutter n'est pas trouvé dans le PATH"
    echo "📁 Ajout de Flutter au PATH..."
    export PATH="$PATH:/workspace/flutter/bin"
fi

# Vérifier la version de Flutter
echo "🔍 Vérification de Flutter..."
flutter --version

# Installer les dépendances
echo ""
echo "📦 Installation des dépendances..."
flutter pub get

# Analyser le code
echo ""
echo "🔍 Analyse du code..."
flutter analyze

if [ $? -eq 0 ]; then
    echo "✅ Analyse terminée sans erreur"
else
    echo "❌ Erreurs détectées lors de l'analyse"
    exit 1
fi

# Afficher les informations de connexion
echo ""
echo "🔑 Informations de connexion pour la démonstration :"
echo "   Email: demo@bank.com"
echo "   Mot de passe: demo123"
echo ""

# Lancer l'application
echo "🚀 Lancement de l'application..."
echo "   (Assurez-vous qu'un émulateur est démarré ou qu'un appareil est connecté)"
echo ""

flutter run