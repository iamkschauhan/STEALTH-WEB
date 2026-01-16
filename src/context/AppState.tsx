import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, signOutUser } from '../services/authService';
import { getUserProfile } from '../services/firestoreService';

export enum AuthView {
  SPLASH = 'splash',
  SIGNUP = 'signUp',
  LOGIN = 'login',
  EMAIL_VERIFICATION = 'emailVerification',
  FORGOT_PASSWORD = 'forgotPassword',
}

interface AppStateContextType {
  isAuthenticated: boolean;
  hasVerifiedEmail: boolean;
  currentAuthView: AuthView;
  showMainTabView: boolean;
  showAccountView: boolean;
  currentUser: User | null;
  userProfile: any | null;
  isLoading: boolean;
  login: () => void;
  signUp: () => void;
  showEmailVerification: () => void;
  verifyEmail: () => Promise<void>;
  completeAccountSetup: () => void;
  logout: () => Promise<void>;
  setCurrentAuthView: (view: AuthView) => void;
  refreshUserProfile: () => Promise<void>;
}

// Create a default context value to prevent undefined errors
const defaultContextValue: AppStateContextType = {
  isAuthenticated: false,
  hasVerifiedEmail: false,
  currentAuthView: AuthView.SPLASH,
  showMainTabView: false,
  showAccountView: false,
  currentUser: null,
  userProfile: null,
  isLoading: true,
  login: () => {},
  signUp: () => {},
  showEmailVerification: () => {},
  verifyEmail: async () => {},
  completeAccountSetup: () => {},
  logout: async () => {},
  setCurrentAuthView: () => {},
  refreshUserProfile: async () => {},
};

const AppStateContext = createContext<AppStateContextType>(defaultContextValue);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasVerifiedEmail, setHasVerifiedEmail] = useState(false);
  const [currentAuthView, setCurrentAuthView] = useState<AuthView>(AuthView.SPLASH);
  const [showMainTabView, setShowMainTabView] = useState(false);
  const [showAccountView, setShowAccountView] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let isMounted = true;
    
    const setupAuthListener = () => {
      try {
        unsubscribe = onAuthStateChange(async (user: User | null) => {
          if (!isMounted) return;
          
          setIsLoading(true);
        setIsLoading(true);
        
        try {
          if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
            setHasVerifiedEmail(user.emailVerified);
            
            // Check if user has completed profile setup
            try {
              const profile = await getUserProfile(user.uid);
              setUserProfile(profile);
              
              const isProfileComplete = profile && profile.firstName && profile.username;
              
              if (user.emailVerified) {
                if (isProfileComplete) {
                  // User has complete profile, go to main app
                  setShowMainTabView(true);
                  setShowAccountView(false);
                  setCurrentAuthView(AuthView.LOGIN);
                } else {
                  // Profile incomplete, show account setup
                  setShowMainTabView(false);
                  setShowAccountView(true);
                  setCurrentAuthView(AuthView.EMAIL_VERIFICATION);
                }
              } else {
                // Email not verified
                setShowMainTabView(false);
                setShowAccountView(false);
                setCurrentAuthView(AuthView.EMAIL_VERIFICATION);
              }
            } catch (error) {
              console.error('Error checking user profile:', error);
              // If profile doesn't exist, user needs to complete setup
              if (user.emailVerified) {
                setShowMainTabView(false);
                setShowAccountView(true);
                setCurrentAuthView(AuthView.EMAIL_VERIFICATION);
              }
            }
          } else {
            // No user, show splash/login
            setCurrentUser(null);
            setUserProfile(null);
            setIsAuthenticated(false);
            setHasVerifiedEmail(false);
            setShowMainTabView(false);
            setShowAccountView(false);
            setCurrentAuthView(AuthView.SPLASH);
          }
        } catch (error) {
          console.error('Error in auth state change handler:', error);
          if (isMounted) {
            setIsLoading(false);
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      });
      } catch (error) {
        console.error('Error setting up auth state listener:', error);
        if (isMounted) {
          setIsLoading(false);
          setCurrentAuthView(AuthView.SPLASH);
        }
      }
    };

    // Set initial state first to ensure provider renders
    setIsLoading(false);
    setCurrentAuthView(AuthView.SPLASH);
    
    // Then set up auth listener
    setupAuthListener();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setHasVerifiedEmail(true);
    setShowMainTabView(true);
    setCurrentAuthView(AuthView.LOGIN);
  };

  const signUp = () => {
    setCurrentAuthView(AuthView.SIGNUP);
  };

  const showEmailVerification = () => {
    setCurrentAuthView(AuthView.EMAIL_VERIFICATION);
  };

  const verifyEmail = async () => {
    try {
      const { reloadUser, isEmailVerified } = await import('../services/authService');
      await reloadUser();
      
      if (isEmailVerified()) {
        setHasVerifiedEmail(true);
        setIsAuthenticated(true);
        
        // Check if profile exists
        if (currentUser) {
          const profile = await getUserProfile(currentUser.uid);
          if (profile && profile.firstName && profile.username) {
            setShowMainTabView(true);
            setShowAccountView(false);
          } else {
            setShowAccountView(true);
            setShowMainTabView(false);
          }
        }
        setCurrentAuthView(AuthView.EMAIL_VERIFICATION);
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
    }
  };

  const completeAccountSetup = () => {
    setShowAccountView(false);
    setShowMainTabView(true);
  };

  const logout = async () => {
    try {
      await signOutUser();
      setIsAuthenticated(false);
      setHasVerifiedEmail(false);
      setShowMainTabView(false);
      setShowAccountView(false);
      setCurrentAuthView(AuthView.LOGIN);
      setCurrentUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const refreshUserProfile = async () => {
    if (currentUser) {
      try {
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error refreshing user profile:', error);
      }
    }
  };

  // Always provide a valid context value
  const contextValue: AppStateContextType = {
    isAuthenticated,
    hasVerifiedEmail,
    currentAuthView,
    showMainTabView,
    showAccountView,
    currentUser,
    userProfile,
    isLoading,
    login,
    signUp,
    showEmailVerification,
    verifyEmail,
    completeAccountSetup,
    logout,
    setCurrentAuthView,
    refreshUserProfile,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  return context;
};
