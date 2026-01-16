import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  User,
  UserCredential,
  updateProfile,
  onAuthStateChanged,
  AuthError,
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Check if auth is available
const isAuthAvailable = (): boolean => {
  try {
    // Try to access auth.app property - if it throws, auth is not initialized
    const _ = auth.app;
    return true;
  } catch {
    return false;
  }
};

export interface SignUpData {
  email: string;
  password: string;
  displayName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

/**
 * Sign up a new user
 */
export const signUp = async (data: SignUpData): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Update display name if provided
    if (data.displayName && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: data.displayName,
      });
    }

    // Send email verification
    if (userCredential.user) {
      await sendEmailVerification(userCredential.user);
    }

    return userCredential;
  } catch (error) {
    throw handleAuthError(error as AuthError);
  }
};

/**
 * Sign in an existing user
 */
export const signIn = async (data: LoginData): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return userCredential;
  } catch (error) {
    throw handleAuthError(error as AuthError);
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw handleAuthError(error as AuthError);
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw handleAuthError(error as AuthError);
  }
};

/**
 * Send email verification to current user
 */
export const sendVerificationEmail = async (): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
    } else {
      throw new Error('No user is currently signed in');
    }
  } catch (error) {
    throw handleAuthError(error as AuthError);
  }
};

/**
 * Get the current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Listen to authentication state changes
 */
export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  try {
    if (!isAuthAvailable()) {
      console.warn('Firebase Auth not available, calling callback with null');
      // Call callback with null immediately if auth is not available
      setTimeout(() => callback(null), 0);
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  } catch (error) {
    console.error('Error setting up auth state listener:', error);
    // Call callback with null and return no-op unsubscribe
    setTimeout(() => callback(null), 0);
    return () => {};
  }
};

/**
 * Check if user's email is verified
 */
export const isEmailVerified = (): boolean => {
  const user = auth.currentUser;
  return user?.emailVerified ?? false;
};

/**
 * Reload user data (useful after email verification)
 */
export const reloadUser = async (): Promise<void> => {
  const user = auth.currentUser;
  if (user) {
    await user.reload();
  }
};

/**
 * Handle Firebase auth errors and return user-friendly messages
 */
const handleAuthError = (error: AuthError): Error => {
  let message = 'An error occurred during authentication';

  switch (error.code) {
    case 'auth/email-already-in-use':
      message = 'This email is already registered';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address';
      break;
    case 'auth/operation-not-allowed':
      message = 'Operation not allowed';
      break;
    case 'auth/weak-password':
      message = 'Password is too weak';
      break;
    case 'auth/user-disabled':
      message = 'This account has been disabled';
      break;
    case 'auth/user-not-found':
      message = 'No account found with this email';
      break;
    case 'auth/wrong-password':
      message = 'Incorrect password';
      break;
    case 'auth/too-many-requests':
      message = 'Too many requests. Please try again later';
      break;
    case 'auth/network-request-failed':
      message = 'Network error. Please check your connection';
      break;
    default:
      message = error.message || 'An unexpected error occurred';
  }

  return new Error(message);
};
