import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration
// These should be set as environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'stealthweb-53767',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

// Validate Firebase config
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain) {
  console.warn('Firebase configuration is incomplete. Please check your .env file.');
}

// Initialize Firebase
let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

try {
  if (getApps().length === 0) {
    if (firebaseConfig.apiKey && firebaseConfig.authDomain) {
      app = initializeApp(firebaseConfig);
    } else {
      console.warn('Firebase not initialized: Missing API key or auth domain');
    }
  } else {
    app = getApps()[0];
  }
  
  if (app) {
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Don't throw - allow app to continue without Firebase
}

// Initialize Firebase services
// Note: These will throw if Firebase is not properly initialized
// Make sure to set up your .env file with Firebase credentials
export const auth: Auth = authInstance as Auth;
export const db: Firestore = dbInstance as Firestore;
export const storage: FirebaseStorage = storageInstance as FirebaseStorage;

export default app;
