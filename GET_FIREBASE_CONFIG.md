# How to Get Firebase Configuration

## Quick Steps

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: **stealth-app-2025**

2. **Open Project Settings**
   - Click the gear icon ⚙️ next to "Project Overview"
   - Select "Project settings"

3. **Get Web App Configuration**
   - Scroll down to "Your apps" section
   - If you see a web app (</> icon), click on it
   - If no web app exists:
     - Click "Add app" → Select Web icon (</>)
     - Register your app (nickname: "stealth-web")
     - Click "Register app"

4. **Copy Configuration Values**
   - You'll see a config object like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "stealth-app-2025.firebaseapp.com",
     projectId: "stealth-app-2025",
     storageBucket: "stealth-app-2025.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123",
     measurementId: "G-XXXXXXXXXX"
   };
   ```

5. **Update .env File**
   - Open `.env` file in the project root
   - Replace the placeholder values with your actual Firebase config:
   
   ```env
   VITE_FIREBASE_API_KEY=AIza... (from apiKey)
   VITE_FIREBASE_AUTH_DOMAIN=stealth-app-2025.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=stealth-app-2025
   VITE_FIREBASE_STORAGE_BUCKET=stealth-app-2025.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789 (from messagingSenderId)
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123 (from appId)
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX (from measurementId, optional)
   ```

6. **Restart Dev Server**
   - Stop the current dev server (Ctrl+C)
   - Run `npm run dev` again
   - The Firebase error should be resolved!

## Visual Guide

```
Firebase Console
  └─> Project: stealth-app-2025
      └─> ⚙️ Project Settings
          └─> Your apps
              └─> Web app (</>)
                  └─> Config object
                      └─> Copy values to .env
```

## Troubleshooting

- **"Project not found"**: Make sure you're logged into the correct Google account
- **"No web app"**: Create one by clicking "Add app" → Web icon
- **Still getting errors**: 
  - Make sure `.env` file is in the project root (same folder as `package.json`)
  - Restart the dev server after updating `.env`
  - Check that all values are copied correctly (no extra spaces/quotes)
