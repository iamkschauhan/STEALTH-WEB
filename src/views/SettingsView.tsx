import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAppState } from '../context/AppState';
import { updateUserProfile, createUserProfile } from '../services/firestoreService';
import { TermsOfServiceView } from './legal/TermsOfServiceView';
import { PrivacyPolicyView } from './legal/PrivacyPolicyView';
import { CommunityGuidelinesView } from './legal/CommunityGuidelinesView';

interface SettingsViewProps {
  onClose: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onClose }) => {
  const { currentUser, userProfile, refreshUserProfile } = useAppState();
  
  // App Settings - Initialize from userProfile
  const [language, setLanguage] = useState(userProfile?.language || 'English');
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(userProfile?.theme || 'dark');
  const [autoPlayVideos, setAutoPlayVideos] = useState(userProfile?.autoPlayVideos ?? false);
  const [dataSaver, setDataSaver] = useState(userProfile?.dataSaver ?? false);

  // Auto-save state
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>('');
  const isInitialLoad = useRef(true);

  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showLegalDocument, setShowLegalDocument] = useState<'terms' | 'privacy' | 'guidelines' | null>(null);

  const languages = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese', 'Korean', 'Arabic'];
  const themes = ['Dark', 'Light', 'Auto'];

  // Update fields when userProfile loads
  useEffect(() => {
    if (userProfile) {
      if (userProfile.language) setLanguage(userProfile.language);
      if (userProfile.theme) setTheme(userProfile.theme);
      if (userProfile.autoPlayVideos !== undefined) setAutoPlayVideos(userProfile.autoPlayVideos);
      if (userProfile.dataSaver !== undefined) setDataSaver(userProfile.dataSaver);
    }
  }, [userProfile]);

  // Auto-save function with debouncing
  const autoSave = useCallback(async () => {
    if (!currentUser) return;

    // Create a snapshot of current data for comparison
    const currentData = JSON.stringify({
      language,
      theme,
      autoPlayVideos,
      dataSaver,
    });

    // Don't save if nothing changed
    if (currentData === lastSavedRef.current) return;

    setSaveStatus('saving');

    try {
      const settingsData = {
        language,
        theme,
        autoPlayVideos,
        dataSaver,
      };

      if (userProfile) {
        await updateUserProfile(currentUser.uid, settingsData);
      } else {
        // If no profile exists, create one with just app settings
        await createUserProfile(currentUser.uid, {
          email: currentUser.email || '',
          ...settingsData,
        });
      }

      lastSavedRef.current = currentData;
      setSaveStatus('saved');
      await refreshUserProfile();

      // Reset saved status after 2 seconds
      setTimeout(() => {
        setSaveStatus((prev) => prev === 'saved' ? 'idle' : prev);
      }, 2000);
    } catch (error: any) {
      console.error('Error auto-saving settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }, [
    currentUser,
    userProfile,
    language,
    theme,
    autoPlayVideos,
    dataSaver,
    refreshUserProfile,
  ]);

  // Debounced auto-save effect
  useEffect(() => {
    // Skip auto-save on initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      // Set initial saved state
      lastSavedRef.current = JSON.stringify({
        language,
        theme,
        autoPlayVideos,
        dataSaver,
      });
      return;
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Don't auto-save if no user
    if (!currentUser) return;

    // Set new timeout for auto-save (1.5 seconds after last change)
    saveTimeoutRef.current = setTimeout(() => {
      autoSave();
    }, 1500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    language,
    theme,
    autoPlayVideos,
    dataSaver,
    autoSave,
    currentUser,
  ]);

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className="w-4 h-4 border-2 border-orange border-t-transparent rounded-full animate-spin" />
        );
      case 'saved':
        return (
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Error saving';
      default:
        return '';
    }
  };

  // Show legal document views
  if (showLegalDocument === 'terms') {
    return <TermsOfServiceView onClose={() => setShowLegalDocument(null)} />;
  }
  if (showLegalDocument === 'privacy') {
    return <PrivacyPolicyView onClose={() => setShowLegalDocument(null)} />;
  }
  if (showLegalDocument === 'guidelines') {
    return <CommunityGuidelinesView onClose={() => setShowLegalDocument(null)} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-[60px] pb-24">
      <div className="max-w-content md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-screen-padding md:px-6 lg:px-8">
        {/* Navigation Bar with Save Status */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="text-orange hover:opacity-80 transition-opacity active:opacity-70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-text-primary">Settings</h1>
          <div className="flex items-center gap-2">
            {getSaveStatusIcon()}
            {saveStatus !== 'idle' && (
              <span className={`text-xs ${
                saveStatus === 'saved' ? 'text-green-500' :
                saveStatus === 'error' ? 'text-red-500' :
                'text-orange'
              }`}>
                {getSaveStatusText()}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* App Preferences Section */}
          <SettingsCard title="App Preferences" icon="gearshape">
            <div className="space-y-4">
              <DropdownOption
                label="Language"
                value={language}
                onClick={() => setShowLanguagePicker(true)}
              />
              <DropdownOption
                label="Theme"
                value={theme === 'auto' ? 'Auto' : theme.charAt(0).toUpperCase() + theme.slice(1)}
                onClick={() => setShowThemePicker(true)}
              />
              <ToggleOption
                label="Auto-play Videos"
                description="Automatically play videos in feed"
                isEnabled={autoPlayVideos}
                onChange={setAutoPlayVideos}
              />
              <ToggleOption
                label="Data Saver Mode"
                description="Reduce data usage by limiting image quality"
                isEnabled={dataSaver}
                onChange={setDataSaver}
              />
            </div>
          </SettingsCard>

          {/* Account Section */}
          <SettingsCard title="Account" icon="person">
            <div className="space-y-3">
              <InfoText
                label="Email"
                value={currentUser?.email || 'Not set'}
              />
              <InfoText
                label="Account Created"
                value={currentUser?.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'Unknown'}
              />
              <ActionButton
                title="Change Email"
                description="Update your email address"
                onClick={() => alert('Email change feature coming soon.')}
              />
              <ActionButton
                title="Change Password"
                description="Update your account password"
                onClick={() => alert('Password change feature coming soon. Use Forgot Password for now.')}
              />
            </div>
          </SettingsCard>

          {/* About Section */}
          <SettingsCard title="About" icon="info">
            <div className="space-y-3">
              <InfoText
                label="App Version"
                value="1.0.0"
              />
              <InfoText
                label="Platform"
                value="Web"
              />
              <LinkButton
                title="Terms of Service"
                description="Read our terms and conditions"
                onClick={() => setShowLegalDocument('terms')}
              />
              <LinkButton
                title="Privacy Policy"
                description="Learn how we protect your data"
                onClick={() => setShowLegalDocument('privacy')}
              />
              <LinkButton
                title="Community Guidelines"
                description="Understand our community standards"
                onClick={() => setShowLegalDocument('guidelines')}
              />
              <LinkButton
                title="Report a Problem"
                description="Help us improve by reporting issues"
                onClick={() => alert('Report feature coming soon. Contact support@stealthweb.com for now.')}
              />
            </div>
          </SettingsCard>
        </div>
      </div>

      {/* Language Picker */}
      {showLanguagePicker && (
        <PickerSheet
          title="Select Language"
          items={languages}
          selectedItem={language}
          onSelect={setLanguage}
          onClose={() => setShowLanguagePicker(false)}
        />
      )}

      {/* Theme Picker */}
      {showThemePicker && (
        <PickerSheet
          title="Select Theme"
          items={themes}
          selectedItem={theme === 'auto' ? 'Auto' : theme.charAt(0).toUpperCase() + theme.slice(1)}
          onSelect={(value) => {
            const themeMap: Record<string, 'light' | 'dark' | 'auto'> = {
              'Dark': 'dark',
              'Light': 'light',
              'Auto': 'auto',
            };
            setTheme(themeMap[value] || 'dark');
          }}
          onClose={() => setShowThemePicker(false)}
        />
      )}
    </div>
  );
};

// Settings Card Component
interface SettingsCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, icon, children }) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (icon) {
      case 'bell':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        );
      case 'gearshape':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36 2.54c.59.24 1.13.56 1.62.94l2.39-.96c.22-.08.47 0 .59.22l1.92 3.32c.12.22.07.47-.12.61l-2.01 1.58c.05.3.07.62.07.94s-.02.64-.07.94l2.03 1.58c.18.14.23.41.12.61l-1.92 3.32c-.12.22-.37.29-.59.22l-2.39-.96c-.5.38-1.03.7-1.62.94l-.36 2.54c-.05.24-.24.41-.48.41h-3.84c-.24 0-.43-.17-.47-.41l-.36-2.54c-.59-.24-1.13-.57-1.62-.94l-2.39.96c-.22.08-.47 0-.59-.22L2.74 19.13c-.12-.21-.08-.47.12-.61l2.03-1.58c-.05-.3-.07-.62-.07-.94s.02-.64.07-.94L2.86 13.06c-.18-.14-.23-.41-.12-.61l1.92-3.32c.12-.22.37-.29.59-.22l2.39.96c.5-.38 1.03-.7 1.62-.94l.36-2.54c.05-.24.24-.41.48-.41h3.84c.24 0 .44.17.47.41l.36 2.54c.59.24 1.13.56 1.62.94l2.39-.96c.22-.08.47 0 .59.22l1.92 3.32c.12.22.07.47-.12.61l-2.01 1.58zm-7.14 1.06c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
          </svg>
        );
      case 'person':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        );
      case 'info':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface-dark rounded-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-dark-bg rounded-xl flex items-center justify-center text-orange">
          {getIcon()}
        </div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      </div>
      {children}
    </div>
  );
};

// Toggle Option Component
interface ToggleOptionProps {
  label: string;
  description: string;
  isEnabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ label, description, isEnabled, onChange }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-card hover:bg-dark-bg/50 transition-colors">
      <div className="flex-1">
        <div className="text-base font-medium text-text-primary">{label}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
      <button
        onClick={() => onChange(!isEnabled)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
          isEnabled ? 'bg-orange' : 'bg-text-faded'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

// Dropdown Option Component
interface DropdownOptionProps {
  label: string;
  value: string;
  onClick: () => void;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({ label, value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-card hover:bg-dark-bg/50 transition-colors"
    >
      <div className="text-left">
        <div className="text-base font-medium text-text-primary">{label}</div>
        <div className="text-sm text-text-secondary mt-1">{value}</div>
      </div>
      <svg className="w-4 h-4 text-text-faded flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

// Info Text Component
interface InfoTextProps {
  label: string;
  value: string;
}

const InfoText: React.FC<InfoTextProps> = ({ label, value }) => {
  return (
    <div className="p-3 rounded-card">
      <div className="text-sm text-text-secondary">{label}</div>
      <div className="text-base font-medium text-text-primary mt-1">{value}</div>
    </div>
  );
};

// Link Button Component
interface LinkButtonProps {
  title: string;
  description: string;
  onClick: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-dark-bg rounded-card hover:opacity-90 transition-opacity active:opacity-75"
    >
      <div className="text-left">
        <div className="text-base font-medium text-text-primary">{title}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
      <svg className="w-4 h-4 text-text-faded flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

// Action Button Component
interface ActionButtonProps {
  title: string;
  description: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-dark-bg rounded-card hover:opacity-90 transition-opacity active:opacity-75"
    >
      <div className="text-left">
        <div className="text-base font-medium text-text-primary">{title}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
      <svg className="w-4 h-4 text-text-faded flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

// Picker Sheet Component
interface PickerSheetProps {
  title: string;
  items: string[];
  selectedItem: string;
  onSelect: (item: string) => void;
  onClose: () => void;
}

const PickerSheet: React.FC<PickerSheetProps> = ({ title, items, selectedItem, onSelect, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[50]" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-dark-bg rounded-t-[24px] shadow-2xl max-h-[80vh] flex flex-col animate-slide-up">
        <div className="flex justify-center pt-3 pb-5">
          <div className="w-9 h-1 bg-white/30 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-screen-padding pb-5">
          <h2 className="text-xl font-bold text-text-primary">{title}</h2>
          <button onClick={onClose} className="text-text-icon">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.64c.39.39.39 1.02 0 1.41L13.41 12l3.23 3.23c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 13.41l-3.23 3.23c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.36 8.77c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l3.23-3.23c.39-.39 1.02-.39 1.41 0z" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pb-5">
          <div className="space-y-0">
            {items.map((item, index) => (
              <div key={item}>
                <button
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-screen-padding py-3.5 hover:bg-white/5 transition-colors"
                >
                  <span className="text-[17px] font-normal text-text-primary">{item}</span>
                  {item === selectedItem && (
                    <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
                {index < items.length - 1 && <div className="h-px bg-white/10 ml-screen-padding" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
