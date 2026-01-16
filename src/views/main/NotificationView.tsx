import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppState';
import { getUserNotifications, getProfileViews, Notification, ProfileView, markNotificationAsRead, getUserProfile } from '../../services/firestoreService';
import { UserProfileView } from '../UserProfileView';

export const NotificationView: React.FC = () => {
  const { currentUser, userProfile } = useAppState();
  const [selectedTab, setSelectedTab] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profileViews, setProfileViews] = useState<ProfileView[]>([]);
  const [viewerProfiles, setViewerProfiles] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedProfileData, setSelectedProfileData] = useState<any>(null);

  // Load notifications and profile views
  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;

      setLoading(true);
      try {
        // Load notifications
        const userNotifications = await getUserNotifications(currentUser.uid);
        setNotifications(userNotifications);

        // Load profile views
        const views = await getProfileViews(currentUser.uid);
        setProfileViews(views);

        // Load viewer profiles
        const profileMap: Record<string, any> = {};
        for (const view of views) {
          const profileKey = view.viewerUserId || view.id || `view_${Date.now()}`;
          if (!profileMap[profileKey]) {
            if (view.viewerUserId) {
              try {
                const profile = await getUserProfile(view.viewerUserId);
                if (profile) {
                  profileMap[profileKey] = profile;
                } else if (view.viewerProfile) {
                  // Use snapshot if profile doesn't exist
                  profileMap[profileKey] = view.viewerProfile;
                }
              } catch (error) {
                console.error('Error loading viewer profile:', error);
                // Use snapshot if available
                if (view.viewerProfile) {
                  profileMap[profileKey] = view.viewerProfile;
                }
              }
            } else if (view.viewerProfile) {
              // Use snapshot if viewerUserId is not available
              profileMap[profileKey] = view.viewerProfile;
            }
          }
        }
        setViewerProfiles(profileMap);
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read && notification.id) {
      await markNotificationAsRead(notification.id);
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
    }

    // Navigate based on notification type
    if (notification.relatedUserId) {
      setSelectedUserId(notification.relatedUserId);
    }
  };

  const handleProfileViewClick = (view: ProfileView, viewerProfile: any) => {
    // If we have profile data from snapshot, pass it directly
    if (viewerProfile && viewerProfile.uid) {
      setSelectedUserId(viewerProfile.uid);
      setSelectedProfileData(viewerProfile);
    } else if (view.viewerUserId) {
      setSelectedUserId(view.viewerUserId);
      setSelectedProfileData(null);
    }
  };

  // Filter notifications based on user's notification settings
  const filteredNotifications = notifications.filter(notification => {
    if (!userProfile) return true;

    switch (notification.type) {
      case 'message':
        return userProfile.newMessageNotifications !== false;
      case 'friend_request':
        return userProfile.friendRequestNotifications !== false;
      case 'friend_accept':
        return userProfile.friendAcceptNotifications !== false;
      case 'post_like':
        return userProfile.postLikeNotifications !== false;
      case 'post_comment':
        return userProfile.postCommentNotifications !== false;
      case 'post_share':
        return userProfile.postShareNotifications !== false;
      case 'mention':
        return userProfile.mentionNotifications !== false;
      case 'profile_view':
        return userProfile.profileViewNotifications !== false;
      case 'follow':
        return userProfile.followNotifications !== false;
      default:
        return true;
    }
  });

  if (selectedUserId) {
    return (
      <UserProfileView
        userId={selectedUserId}
        profileData={selectedProfileData}
        onClose={() => {
          setSelectedUserId(null);
          setSelectedProfileData(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-[60px] pb-24 lg:pb-10">
      <div className="max-w-content md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-screen-padding md:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-[28px] font-bold text-text-primary mb-5">
          Notifications
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-8 mb-6">
          <TabButton
            title="All"
            isSelected={selectedTab === 0}
            onClick={() => setSelectedTab(0)}
          />
          <TabButton
            title="Views"
            isSelected={selectedTab === 1}
            onClick={() => setSelectedTab(1)}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-24 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading...</p>
            </div>
          </div>
        ) : selectedTab === 0 ? (
          // All tab - Notifications list
          <div className="pb-24">
            {filteredNotifications.length === 0 ? (
              <div className="py-24">
                <EmptyStateView
                  icon="bell.fill"
                  title="No notifications"
                  message="Your notifications will appear here"
                />
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleNotificationClick(notification)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          // Views tab - Grid of profiles
          <div className="pb-24">
            {profileViews.length === 0 ? (
              <div className="py-24">
                <EmptyStateView
                  icon="eye.fill"
                  title="No profile views yet"
                  message="When someone views your profile, they'll appear here"
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {profileViews.map((view, index) => {
                  const viewerProfile = viewerProfiles[view.viewerUserId] || view.viewerProfile;
                  const profileUserId = view.viewerUserId || (viewerProfile as any)?.uid || view.id;
                  return (
                    <ProfileGridViewItem
                      key={view.id || index}
                      view={view}
                      viewerProfile={viewerProfile}
                      profileUserId={profileUserId}
                      onClick={() => handleProfileViewClick(view, viewerProfile)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Notification Item Component
interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const getNotificationIcon = () => {
    const iconClass = "w-5 h-5";
    switch (notification.type) {
      case 'message':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'friend_request':
      case 'friend_accept':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        );
      case 'post_like':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'post_comment':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'profile_view':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        );
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-4 p-4 bg-surface-dark rounded-card hover:opacity-90 transition-opacity active:opacity-75 text-left ${
        !notification.read ? 'border-l-4 border-orange' : ''
      }`}
    >
      <div className="w-10 h-10 bg-dark-bg rounded-xl flex items-center justify-center text-orange flex-shrink-0">
        {getNotificationIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-base font-medium text-text-primary mb-1">{notification.title}</h3>
            <p className="text-sm text-text-secondary line-clamp-2">{notification.message}</p>
          </div>
          {!notification.read && (
            <div className="w-2 h-2 bg-orange rounded-full flex-shrink-0 mt-1" />
          )}
        </div>
        {notification.createdAt && (
          <p className="text-xs text-text-faded mt-2">{formatTime(notification.createdAt)}</p>
        )}
      </div>
    </button>
  );
};

// Profile Grid View Item Component
interface ProfileGridViewItemProps {
  view: ProfileView;
  viewerProfile: any;
  profileUserId?: string;
  onClick: () => void;
}

const ProfileGridViewItem: React.FC<ProfileGridViewItemProps> = ({ view, viewerProfile, profileUserId, onClick }) => {
  const profile = viewerProfile;
  const name = profile?.firstName || profile?.displayName || profile?.username || 'Unknown';
  const country = profile?.currentCity || profile?.homeCity || '';
  
  // Get country flag emoji (simplified - you can enhance this)
  const getCountryFlag = (countryName: string) => {
    // This is a simplified version - you can add a proper country-to-flag mapping
    const countryFlags: Record<string, string> = {
      'India': '🇮🇳',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Brazil': '🇧🇷',
      'Indonesia': '🇮🇩',
      'Dominican Republic': '🇩🇴',
      'Nigeria': '🇳🇬',
      'Sweden': '🇸🇪',
      'Italy': '🇮🇹',
      'Mexico': '🇲🇽',
      'Spain': '🇪🇸',
      'Germany': '🇩🇪',
    };
    return countryFlags[countryName] || '🌍';
  };

  const flag = country ? getCountryFlag(country) : '🌍';
  const index = Math.floor(Math.random() * 20); // For gradient variation

  // Create gradient variation based on index
  const gradientStart = `rgb(255, ${128 + index * 5}, 0)`;
  const gradientEnd = `rgb(255, ${204 + index * 5}, 0)`;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 hover:opacity-90 transition-opacity active:opacity-75"
    >
      <div className="relative">
        {/* Profile Picture */}
        <div
          className="w-[70px] h-[70px] rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: profile?.profileImageUrl ? 'transparent' : `linear-gradient(to bottom right, ${gradientStart}, ${gradientEnd})`,
          }}
        >
          {profile?.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
        {/* Flag overlay */}
        {flag && (
          <div className="absolute -bottom-0.5 -left-0.5 w-[22px] h-[22px] bg-surface-dark rounded-full flex items-center justify-center border-2 border-dark-bg">
            <span className="text-sm">{flag}</span>
          </div>
        )}
      </div>
      {/* Name */}
      <span className="text-xs font-medium text-text-primary text-center line-clamp-1 max-w-full">
        {name}
      </span>
    </button>
  );
};

// Tab Button Component
interface TabButtonProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ title, isSelected, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      <span
        className={`text-base font-medium ${
          isSelected ? 'text-text-primary' : 'text-text-faded'
        }`}
      >
        {title}
      </span>
      {isSelected && (
        <div className="w-10 h-0.5 bg-orange" />
      )}
    </button>
  );
};

// Empty State Component
interface EmptyStateViewProps {
  icon: string;
  title: string;
  message: string;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({ icon, title, message }) => {
  const getIcon = () => {
    if (icon === 'bell.fill') {
      return (
        <svg className="w-16 h-16 text-text-faded opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
      );
    } else if (icon === 'eye.fill') {
      return (
        <svg className="w-16 h-16 text-text-faded opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">{getIcon()}</div>
      <h2 className="text-xl font-semibold text-text-secondary mb-2">{title}</h2>
      <p className="text-text-faded text-sm">{message}</p>
    </div>
  );
};
