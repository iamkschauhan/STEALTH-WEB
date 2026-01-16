# Firebase Setup Guide

This guide will help you set up Firebase for the Stealth Web App.

## Prerequisites

1. A Firebase project (already configured: `stealth-app-2025`)
2. Firebase CLI installed (optional, for deployment)

## Setup Steps

### 1. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `stealth-app-2025`
3. Click the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click on the web icon `</>` to add a web app (if not already added)
7. Copy the Firebase configuration object

### 2. Create Environment File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### 3. Add Firebase Configuration

Edit `.env` and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=stealth-app-2025.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=stealth-app-2025
VITE_FIREBASE_STORAGE_BUCKET=stealth-app-2025.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Enable Firebase Services

#### Authentication

1. Go to Firebase Console → Authentication
2. Click "Get started"
3. Enable "Email/Password" authentication
4. (Optional) Enable "Google" and "Apple" sign-in providers

#### Firestore Database

1. Go to Firebase Console → Firestore Database
2. Click "Create database"
3. Start in **test mode** for development (or production mode with proper rules)
4. Choose a location for your database

#### Storage

1. Go to Firebase Console → Storage
2. Click "Get started"
3. Start in **test mode** for development
4. Choose a location (same as Firestore recommended)

### 5. Configure Firestore Security Rules

Update `firestore.rules` with appropriate rules for your app:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Posts collection
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Messages collection
    match /messages/{messageId} {
      allow read, write: if request.auth != null && 
        (resource.data.senderId == request.auth.uid || resource.data.receiverId == request.auth.uid);
    }
  }
}
```

### 6. Configure Storage Security Rules

Update `storage.rules` with appropriate rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile images
    match /users/{userId}/profile/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Post images
    match /posts/{userId}/{postId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 7. Test the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Try signing up a new user
3. Check Firebase Console to verify:
   - User appears in Authentication
   - User document created in Firestore `users` collection

## Firebase Services Used

### Authentication (`authService.ts`)
- Email/Password sign up
- Email/Password sign in
- Email verification
- Password reset
- Sign out

### Firestore (`firestoreService.ts`)
- User profiles
- Posts
- Messages/Conversations
- Notifications

### Storage (`storageService.ts`)
- Profile images
- Post images
- Message attachments

## User Flow with Firebase

1. **Sign Up**: Creates Firebase Auth user → Sends verification email
2. **Email Verification**: User clicks link → Email verified → Profile setup
3. **Profile Setup**: Saves user data to Firestore `users` collection
4. **Login**: Authenticates with Firebase → Loads user profile from Firestore
5. **Main App**: Uses Firestore for posts, messages, etc.

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/api-key-not-valid)"**
   - Check your `.env` file has correct API key
   - Restart dev server after changing `.env`

2. **"Permission denied" errors**
   - Check Firestore/Storage security rules
   - Ensure user is authenticated

3. **Email verification not working**
   - Check Firebase Console → Authentication → Templates
   - Verify email action URL is configured

4. **Storage upload fails**
   - Check Storage rules
   - Verify file size limits
   - Check CORS configuration

## Next Steps

- Set up proper security rules for production
- Configure email templates in Firebase Console
- Set up Firebase Hosting for deployment
- Add error monitoring (Firebase Crashlytics)
- Configure analytics (Firebase Analytics)
