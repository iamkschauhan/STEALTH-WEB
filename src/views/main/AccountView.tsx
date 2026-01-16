import React, { useState } from 'react';
import { useAppState } from '../../context/AppState';
import { EditProfileView } from '../EditProfileView';
import { PrivacySettingsView } from '../PrivacySettingsView';
import { SettingsView } from '../SettingsView';
import { NotificationSettingsView } from '../NotificationSettingsView';
import { HelpSupportView } from '../HelpSupportView';
import { AboutView } from '../AboutView';
import { ProfileView } from '../ProfileView';

export const AccountView: React.FC = () => {
  const { logout, showAccountView, showMainTabView, completeAccountSetup, currentUser, userProfile } = useAppState();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  if (showEditProfile) {
    return <EditProfileView onClose={() => setShowEditProfile(false)} />;
  }

  if (showPrivacySettings) {
    return <PrivacySettingsView onClose={() => setShowPrivacySettings(false)} />;
  }

  if (showSettings) {
    return <SettingsView onClose={() => setShowSettings(false)} />;
  }

  if (showNotificationSettings) {
    return <NotificationSettingsView onClose={() => setShowNotificationSettings(false)} />;
  }

  if (showHelpSupport) {
    return <HelpSupportView onClose={() => setShowHelpSupport(false)} />;
  }

  if (showAbout) {
    return <AboutView onClose={() => setShowAbout(false)} />;
  }

  if (showProfile) {
    return <ProfileView onClose={() => setShowProfile(false)} />;
  }

  const menuItems = [
    {
      icon: 'person.fill',
      title: 'Edit Profile',
      action: () => setShowEditProfile(true),
    },
    {
      icon: 'lock.fill',
      title: 'Privacy & Security',
      action: () => setShowPrivacySettings(true),
    },
    {
      icon: 'bell.fill',
      title: 'Notifications',
      action: () => setShowNotificationSettings(true),
    },
    {
      icon: 'gearshape.fill',
      title: 'Settings',
      action: () => setShowSettings(true),
    },
    {
      icon: 'questionmark.circle.fill',
      title: 'Help & Support',
      action: () => setShowHelpSupport(true),
    },
    {
      icon: 'info.circle.fill',
      title: 'About',
      action: () => setShowAbout(true),
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'person.fill':
        return (
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        );
      case 'lock.fill':
        return (
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        );
      case 'bell.fill':
        return (
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        );
      case 'gearshape.fill':
        return (
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36 2.54c.59.24 1.13.56 1.62.94l2.39-.96c.22-.08.47 0 .59.22l1.92 3.32c.12.22.07.47-.12.61l-2.01 1.58c.05.3.07.62.07.94s-.02.64-.07.94l2.03 1.58c.18.14.23.41.12.61l-1.92 3.32c-.12.22-.37.29-.59.22l-2.39-.96c-.5.38-1.03.7-1.62.94l-.36 2.54c-.05.24-.24.41-.48.41h-3.84c-.24 0-.43-.17-.47-.41l-.36-2.54c-.59-.24-1.13-.57-1.62-.94l-2.39.96c-.22.08-.47 0-.59-.22L2.74 19.13c-.12-.21-.08-.47.12-.61l2.03-1.58c-.05-.3-.07-.62-.07-.94s.02-.64.07-.94L2.86 13.06c-.18-.14-.23-.41-.12-.61l1.92-3.32c.12-.22.37-.29.59-.22l2.39.96c.5-.38 1.03-.7 1.62-.94l.36-2.54c.05-.24.24-.41.48-.41h3.84c.24 0 .44.17.47.41l.36 2.54c.59.24 1.13.56 1.62.94l2.39-.96c.22-.08.47 0 .59.22l1.92 3.32c.12.22.07.47-.12.61l-2.01 1.58zm-7.14 1.06c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
          </svg>
        );
      case 'questionmark.circle.fill':
        return (
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
        );
      case 'info.circle.fill':
        return (
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-content md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-screen-padding md:px-6 lg:px-8">
        <div className="pt-[60px] pb-24">
          {/* Header with profile */}
          <div className="flex flex-col items-center space-y-5 pb-10">
            {/* Profile image with gradient - Clickable */}
            <button
              onClick={() => setShowProfile(true)}
              className="relative w-[100px] h-[100px] hover:opacity-90 transition-opacity active:opacity-75"
            >
              <div className="absolute inset-0 rounded-full gradient-primary" />
              <div className="absolute inset-0 flex items-center justify-center">
                {userProfile?.profileImageUrl ? (
                  <img
                    src={userProfile.profileImageUrl}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg className="w-[50px] h-[50px] text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
            </button>

            {/* Name and email - Clickable */}
            <button
              onClick={() => setShowProfile(true)}
              className="flex flex-col items-center space-y-1 hover:opacity-90 transition-opacity active:opacity-75"
            >
              <h1 className="text-2xl font-bold text-text-primary">
                {userProfile?.firstName || currentUser?.displayName || 'User'}
              </h1>
              <p className="text-base text-text-secondary">{currentUser?.email || 'No email'}</p>
            </button>
          </div>

          {/* Menu items */}
          <div className="space-y-3 mb-6">
            {menuItems.map((item) => (
              <AccountMenuItem
                key={item.title}
                icon={getIcon(item.icon)}
                title={item.title}
                onClick={item.action}
              />
            ))}
          </div>

          {/* Complete Setup button (only shown if coming from email verification) */}
          {showAccountView && !showMainTabView && (
            <div className="mb-4">
              <button
                onClick={async () => {
                  // Check if profile is complete
                  if (userProfile && userProfile.firstName && userProfile.username) {
                    completeAccountSetup();
                  } else {
                    // Profile incomplete, show message
                    alert('Please complete your profile first. Go to Edit Profile → Basic info and fill in your first name and username.');
                  }
                }}
                className="w-full gradient-primary text-text-primary rounded-pill py-4 text-button font-semibold hover:opacity-90 transition-opacity active:opacity-75"
              >
                Complete Setup & Go to Home
              </button>
            </div>
          )}

          {/* Logout button (only shown in main app, not during setup) */}
          {showMainTabView && (
            <div className="pb-[100px]">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 bg-surface-dark text-text-primary rounded-pill py-3.5 text-button font-semibold"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 12h-4v-2h4v-2h-4V9h4V7H9v10h6v-2z" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Account Menu Item Component
interface AccountMenuItemProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

const AccountMenuItem: React.FC<AccountMenuItemProps> = ({ icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-surface-dark rounded-card hover:opacity-90 transition-opacity active:opacity-75"
    >
      {/* Icon container */}
      <div className="w-11 h-11 bg-dark-bg rounded-xl flex items-center justify-center text-text-primary flex-shrink-0">
        {icon}
      </div>

      {/* Title */}
      <span className="flex-1 text-base font-medium text-text-primary text-left">{title}</span>

      {/* Chevron */}
      <svg className="w-3.5 h-3.5 text-text-faded flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};
