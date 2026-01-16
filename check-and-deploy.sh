#!/bin/bash

# Check Firestore Rules Deployment Status and Deploy if Needed

echo "🔍 Checking Firebase deployment status..."
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed."
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

# Check if logged in
echo "Checking authentication..."
if firebase projects:list &> /dev/null; then
    echo "✅ Authenticated with Firebase"
    echo ""
    
    # Show current project
    echo "Current project:"
    firebase use
    echo ""
    
    # Deploy Firestore rules
    echo "📤 Deploying Firestore rules..."
    firebase deploy --only firestore:rules --project stealthweb-53767
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Firestore rules deployed successfully!"
        echo ""
        echo "You can now:"
        echo "  - Save user profiles"
        echo "  - Update profiles"
        echo "  - All permission errors should be resolved"
    else
        echo ""
        echo "❌ Deployment failed. Please check the error above."
        exit 1
    fi
else
    echo "⚠️  Not logged in to Firebase."
    echo ""
    echo "Please run:"
    echo "  firebase login"
    echo ""
    echo "Then run this script again:"
    echo "  ./check-and-deploy.sh"
    exit 1
fi
