# How to Deploy Firestore Rules

The Firestore security rules need to be deployed to Firebase for the app to work properly.

## Option 1: Using Firebase Console (Easiest)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/project/stealthweb-53767/firestore/rules

2. **Copy the Rules**
   - Open `firestore.rules` file in your project
   - Copy all the content

3. **Paste and Deploy**
   - Paste the rules into the Firebase Console editor
   - Click **"Publish"** button

## Option 2: Using Firebase CLI

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Deploy Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

## Current Rules Summary

The rules allow:
- ✅ Users to create their own profile (with matching `uid`)
- ✅ Users to update their own profile
- ✅ Users to read other users' profiles (for search/discovery)
- ✅ Users to delete their own profile

## After Deployment

Once the rules are deployed, try saving your profile again. The "Missing or insufficient permissions" error should be resolved.

## Troubleshooting

If you still get permission errors after deploying:
1. Make sure you're logged in (check Firebase Console → Authentication)
2. Verify the user's `uid` matches the document ID in Firestore
3. Check the browser console for more detailed error messages
