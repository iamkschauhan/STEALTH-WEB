import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAppState } from '../context/AppState';
import { updateUserProfile, createUserProfile } from '../services/firestoreService';

interface NotificationSettingsViewProps {
  onClose: () => void;
}

export const NotificationSettingsView: React.FC<NotificationSettingsViewProps> = ({ onClose }) => {
  const { currentUser, userProfile, refreshUserProfile } = useAppState();
  
  // General Notification Settings
  const [pushNotifications, setPushNotifications] = useState(userProfile?.pushNotifications ?? true);
  const [emailNotifications, setEmailNotifications] = useState(userProfile?.emailNotifications ?? true);
  const [smsNotifications, setSmsNotifications] = useState(userProfile?.smsNotifications ?? false);
  
  // Message Notifications
  const [newMessageNotifications, setNewMessageNotifications] = useState(userProfile?.newMessageNotifications ?? true);
  const [messageSound, setMessageSound] = useState(userProfile?.messageSound ?? true);
  const [messagePreview, setMessagePreview] = useState(userProfile?.messagePreview ?? true);
  
  // Social Notifications
  const [friendRequestNotifications, setFriendRequestNotifications] = useState(userProfile?.friendRequestNotifications ?? true);
  const [friendAcceptNotifications, setFriendAcceptNotifications] = useState(userProfile?.friendAcceptNotifications ?? true);
  const [postLikeNotifications, setPostLikeNotifications] = useState(userProfile?.postLikeNotifications ?? true);
  const [postCommentNotifications, setPostCommentNotifications] = useState(userProfile?.postCommentNotifications ?? true);
  const [postShareNotifications, setPostShareNotifications] = useState(userProfile?.postShareNotifications ?? true);
  const [mentionNotifications, setMentionNotifications] = useState(userProfile?.mentionNotifications ?? true);
  
  // Profile Notifications
  const [profileViewNotifications, setProfileViewNotifications] = useState(userProfile?.profileViewNotifications ?? true);
  const [followNotifications, setFollowNotifications] = useState(userProfile?.followNotifications ?? true);
  
  // Activity Notifications
  const [activityReminders, setActivityReminders] = useState(userProfile?.activityReminders ?? true);
  const [weeklyDigest, setWeeklyDigest] = useState(userProfile?.weeklyDigest ?? false);
  const [newsletter, setNewsletter] = useState(userProfile?.newsletter ?? false);
  
  // Quiet Hours
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(userProfile?.quietHoursEnabled ?? false);
  const [quietHoursStart, setQuietHoursStart] = useState(userProfile?.quietHoursStart || '22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState(userProfile?.quietHoursEnd || '08:00');

  // Auto-save state
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>('');
  const isInitialLoad = useRef(true);

  // Update fields when userProfile loads
  useEffect(() => {
    if (userProfile) {
      if (userProfile.pushNotifications !== undefined) setPushNotifications(userProfile.pushNotifications);
      if (userProfile.emailNotifications !== undefined) setEmailNotifications(userProfile.emailNotifications);
      if (userProfile.smsNotifications !== undefined) setSmsNotifications(userProfile.smsNotifications);
      if (userProfile.newMessageNotifications !== undefined) setNewMessageNotifications(userProfile.newMessageNotifications);
      if (userProfile.messageSound !== undefined) setMessageSound(userProfile.messageSound);
      if (userProfile.messagePreview !== undefined) setMessagePreview(userProfile.messagePreview);
      if (userProfile.friendRequestNotifications !== undefined) setFriendRequestNotifications(userProfile.friendRequestNotifications);
      if (userProfile.friendAcceptNotifications !== undefined) setFriendAcceptNotifications(userProfile.friendAcceptNotifications);
      if (userProfile.postLikeNotifications !== undefined) setPostLikeNotifications(userProfile.postLikeNotifications);
      if (userProfile.postCommentNotifications !== undefined) setPostCommentNotifications(userProfile.postCommentNotifications);
      if (userProfile.postShareNotifications !== undefined) setPostShareNotifications(userProfile.postShareNotifications);
      if (userProfile.mentionNotifications !== undefined) setMentionNotifications(userProfile.mentionNotifications);
      if (userProfile.profileViewNotifications !== undefined) setProfileViewNotifications(userProfile.profileViewNotifications);
      if (userProfile.followNotifications !== undefined) setFollowNotifications(userProfile.followNotifications);
      if (userProfile.activityReminders !== undefined) setActivityReminders(userProfile.activityReminders);
      if (userProfile.weeklyDigest !== undefined) setWeeklyDigest(userProfile.weeklyDigest);
      if (userProfile.newsletter !== undefined) setNewsletter(userProfile.newsletter);
      if (userProfile.quietHoursEnabled !== undefined) setQuietHoursEnabled(userProfile.quietHoursEnabled);
      if (userProfile.quietHoursStart) setQuietHoursStart(userProfile.quietHoursStart);
      if (userProfile.quietHoursEnd) setQuietHoursEnd(userProfile.quietHoursEnd);
    }
  }, [userProfile]);

  // Auto-save function with debouncing
  const autoSave = useCallback(async () => {
    if (!currentUser) return;

    // Create a snapshot of current data for comparison
    const currentData = JSON.stringify({
      pushNotifications,
      emailNotifications,
      smsNotifications,
      newMessageNotifications,
      messageSound,
      messagePreview,
      friendRequestNotifications,
      friendAcceptNotifications,
      postLikeNotifications,
      postCommentNotifications,
      postShareNotifications,
      mentionNotifications,
      profileViewNotifications,
      followNotifications,
      activityReminders,
      weeklyDigest,
      newsletter,
      quietHoursEnabled,
      quietHoursStart,
      quietHoursEnd,
    });

    // Don't save if nothing changed
    if (currentData === lastSavedRef.current) return;

    setSaveStatus('saving');

    try {
      const notificationData = {
        pushNotifications,
        emailNotifications,
        smsNotifications,
        newMessageNotifications,
        messageSound,
        messagePreview,
        friendRequestNotifications,
        friendAcceptNotifications,
        postLikeNotifications,
        postCommentNotifications,
        postShareNotifications,
        mentionNotifications,
        profileViewNotifications,
        followNotifications,
        activityReminders,
        weeklyDigest,
        newsletter,
        quietHoursEnabled,
        quietHoursStart,
        quietHoursEnd,
      };

      if (userProfile) {
        await updateUserProfile(currentUser.uid, notificationData);
      } else {
        // If no profile exists, create one with just notification settings
        await createUserProfile(currentUser.uid, {
          email: currentUser.email || '',
          ...notificationData,
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
      console.error('Error auto-saving notification settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }, [
    currentUser,
    userProfile,
    pushNotifications,
    emailNotifications,
    smsNotifications,
    newMessageNotifications,
    messageSound,
    messagePreview,
    friendRequestNotifications,
    friendAcceptNotifications,
    postLikeNotifications,
    postCommentNotifications,
    postShareNotifications,
    mentionNotifications,
    profileViewNotifications,
    followNotifications,
    activityReminders,
    weeklyDigest,
    newsletter,
    quietHoursEnabled,
    quietHoursStart,
    quietHoursEnd,
    refreshUserProfile,
  ]);

  // Debounced auto-save effect
  useEffect(() => {
    // Skip auto-save on initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      // Set initial saved state
      lastSavedRef.current = JSON.stringify({
        pushNotifications,
        emailNotifications,
        smsNotifications,
        newMessageNotifications,
        messageSound,
        messagePreview,
        friendRequestNotifications,
        friendAcceptNotifications,
        postLikeNotifications,
        postCommentNotifications,
        postShareNotifications,
        mentionNotifications,
        profileViewNotifications,
        followNotifications,
        activityReminders,
        weeklyDigest,
        newsletter,
        quietHoursEnabled,
        quietHoursStart,
        quietHoursEnd,
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
    pushNotifications,
    emailNotifications,
    smsNotifications,
    newMessageNotifications,
    messageSound,
    messagePreview,
    friendRequestNotifications,
    friendAcceptNotifications,
    postLikeNotifications,
    postCommentNotifications,
    postShareNotifications,
    mentionNotifications,
    profileViewNotifications,
    followNotifications,
    activityReminders,
    weeklyDigest,
    newsletter,
    quietHoursEnabled,
    quietHoursStart,
    quietHoursEnd,
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
          <h1 className="text-lg font-semibold text-text-primary">Manage Notifications</h1>
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
          {/* General Notifications */}
          <SettingsCard title="General Notifications" icon="bell">
            <div className="space-y-4">
              <ToggleOption
                label="Push Notifications"
                description="Receive push notifications on your device"
                isEnabled={pushNotifications}
                onChange={setPushNotifications}
              />
              <ToggleOption
                label="Email Notifications"
                description="Receive notifications via email"
                isEnabled={emailNotifications}
                onChange={setEmailNotifications}
              />
              <ToggleOption
                label="SMS Notifications"
                description="Receive notifications via SMS (charges may apply)"
                isEnabled={smsNotifications}
                onChange={setSmsNotifications}
              />
            </div>
          </SettingsCard>

          {/* Message Notifications */}
          <SettingsCard title="Messages" icon="message">
            <div className="space-y-4">
              <ToggleOption
                label="New Messages"
                description="Get notified when you receive new messages"
                isEnabled={newMessageNotifications}
                onChange={setNewMessageNotifications}
              />
              <ToggleOption
                label="Message Sound"
                description="Play sound when receiving messages"
                isEnabled={messageSound}
                onChange={setMessageSound}
              />
              <ToggleOption
                label="Message Preview"
                description="Show message preview in notifications"
                isEnabled={messagePreview}
                onChange={setMessagePreview}
              />
            </div>
          </SettingsCard>

          {/* Social Notifications */}
          <SettingsCard title="Social Activity" icon="heart">
            <div className="space-y-4">
              <ToggleOption
                label="Friend Requests"
                description="Get notified about friend requests"
                isEnabled={friendRequestNotifications}
                onChange={setFriendRequestNotifications}
              />
              <ToggleOption
                label="Friend Acceptances"
                description="Get notified when someone accepts your friend request"
                isEnabled={friendAcceptNotifications}
                onChange={setFriendAcceptNotifications}
              />
              <ToggleOption
                label="Post Likes"
                description="Get notified when someone likes your post"
                isEnabled={postLikeNotifications}
                onChange={setPostLikeNotifications}
              />
              <ToggleOption
                label="Post Comments"
                description="Get notified when someone comments on your post"
                isEnabled={postCommentNotifications}
                onChange={setPostCommentNotifications}
              />
              <ToggleOption
                label="Post Shares"
                description="Get notified when someone shares your post"
                isEnabled={postShareNotifications}
                onChange={setPostShareNotifications}
              />
              <ToggleOption
                label="Mentions"
                description="Get notified when someone mentions you"
                isEnabled={mentionNotifications}
                onChange={setMentionNotifications}
              />
            </div>
          </SettingsCard>

          {/* Profile Notifications */}
          <SettingsCard title="Profile Activity" icon="eye">
            <div className="space-y-4">
              <ToggleOption
                label="Profile Views"
                description="Get notified when someone views your profile"
                isEnabled={profileViewNotifications}
                onChange={setProfileViewNotifications}
              />
              <ToggleOption
                label="New Followers"
                description="Get notified when someone follows you"
                isEnabled={followNotifications}
                onChange={setFollowNotifications}
              />
            </div>
          </SettingsCard>

          {/* Activity & Reminders */}
          <SettingsCard title="Activity & Reminders" icon="calendar">
            <div className="space-y-4">
              <ToggleOption
                label="Activity Reminders"
                description="Get reminders about your activity and engagement"
                isEnabled={activityReminders}
                onChange={setActivityReminders}
              />
              <ToggleOption
                label="Weekly Digest"
                description="Receive a weekly summary of your activity"
                isEnabled={weeklyDigest}
                onChange={setWeeklyDigest}
              />
              <ToggleOption
                label="Newsletter"
                description="Receive updates and news about the platform"
                isEnabled={newsletter}
                onChange={setNewsletter}
              />
            </div>
          </SettingsCard>

          {/* Quiet Hours */}
          <SettingsCard title="Quiet Hours" icon="moon">
            <div className="space-y-4">
              <ToggleOption
                label="Enable Quiet Hours"
                description="Mute notifications during specified hours"
                isEnabled={quietHoursEnabled}
                onChange={setQuietHoursEnabled}
              />
              {quietHoursEnabled && (
                <div className="space-y-3 pl-4 border-l-2 border-orange/30">
                  <div className="flex items-center gap-4">
                    <label className="text-base font-medium text-text-primary flex-shrink-0 w-24">Start Time</label>
                    <input
                      type="time"
                      value={quietHoursStart}
                      onChange={(e) => setQuietHoursStart(e.target.value)}
                      className="flex-1 bg-dark-bg rounded-card px-4 py-2 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-base font-medium text-text-primary flex-shrink-0 w-24">End Time</label>
                    <input
                      type="time"
                      value={quietHoursEnd}
                      onChange={(e) => setQuietHoursEnd(e.target.value)}
                      className="flex-1 bg-dark-bg rounded-card px-4 py-2 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30"
                    />
                  </div>
                  <p className="text-sm text-text-secondary mt-2">
                    Notifications will be muted during these hours. You'll still receive important notifications.
                  </p>
                </div>
              )}
            </div>
          </SettingsCard>
        </div>
      </div>
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
      case 'message':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'eye':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'moon':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
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
