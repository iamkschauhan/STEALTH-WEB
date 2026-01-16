import React from 'react';
import { AppStateProvider, useAppState, AuthView } from './context/AppState';
import { SplashView } from './views/auth/SplashView';
import { SignUpView } from './views/auth/SignUpView';
import { LoginView } from './views/auth/LoginView';
import { EmailVerificationView } from './views/auth/EmailVerificationView';
import { ForgotPasswordView } from './views/auth/ForgotPasswordView';
import { MainTabView } from './views/MainTabView';
import { AccountView } from './views/main/AccountView';

const AppContent: React.FC = () => {
  const {
    showMainTabView,
    showAccountView,
    currentAuthView,
    setCurrentAuthView,
    showEmailVerification,
    login,
    verifyEmail,
    completeAccountSetup,
    isLoading,
  } = useAppState();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (showMainTabView) {
    return <MainTabView />;
  }

  if (showAccountView) {
    return <AccountView />;
  }

  switch (currentAuthView) {
    case AuthView.SPLASH:
      return (
        <SplashView
          onComplete={() => setCurrentAuthView(AuthView.SIGNUP)}
        />
      );
    case AuthView.SIGNUP:
      return (
        <SignUpView
          showLogin={() => setCurrentAuthView(AuthView.LOGIN)}
          showEmailVerification={showEmailVerification}
        />
      );
    case AuthView.LOGIN:
      return (
        <LoginView
          showSignUp={() => setCurrentAuthView(AuthView.SIGNUP)}
          onLogin={login}
          showForgotPassword={() => setCurrentAuthView(AuthView.FORGOT_PASSWORD)}
        />
      );
    case AuthView.EMAIL_VERIFICATION:
      return (
        <EmailVerificationView
          onBack={() => setCurrentAuthView(AuthView.SIGNUP)}
          onVerify={verifyEmail}
        />
      );
    case AuthView.FORGOT_PASSWORD:
      return (
        <ForgotPasswordView
          onBack={() => setCurrentAuthView(AuthView.LOGIN)}
        />
      );
    default:
      return (
        <SplashView
          onComplete={() => setCurrentAuthView(AuthView.SIGNUP)}
        />
      );
  }
};

const App: React.FC = () => {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
};

export default App;
