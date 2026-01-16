#!/bin/bash

# Firestore Rules Deployment Script
# This script will deploy the Firestore security rules to Firebase

echo "🚀 Deploying Firestore Rules..."
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed."
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

# Check if logged in
if ! firebase projects:list &> /dev/null; then
    echo "⚠️  Not logged in to Firebase. Please run: firebase login"
    echo ""
    echo "After logging in, run this script again."
    exit 1
fi

# Deploy Firestore rules
echo "📤 Deploying rules to project: stealthweb-53767"
firebase deploy --only firestore:rules --project stealthweb-53767

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Firestore rules deployed successfully!"
    echo "You can now save user profiles without permission errors."
else
    echo ""
    echo "❌ Deployment failed. Please check the error above."
    exit 1
fi
