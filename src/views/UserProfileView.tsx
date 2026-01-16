import React from 'react';
import { useAppState } from '../context/AppState';
import { getUserProfile } from '../services/firestoreService';

interface UserProfileViewProps {
  userId: string;
  profileData?: any; // Optional: pass profile data directly (for dummy profiles)
  onClose: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({ userId, profileData, onClose }) => {
  const { currentUser, userProfile: currentUserProfile } = useAppState();
  const [userProfile, setUserProfile] = React.useState<any>(profileData || null);
  const [loading, setLoading] = React.useState(!profileData);
  const [friendStatus, setFriendStatus] = React.useState<'none' | 'pending' | 'friends'>('none');

  React.useEffect(() => {
    const loadProfile = async () => {
      // If profile data is provided, use it directly
      if (profileData) {
        setUserProfile(profileData);
        setLoading(false);
        return;
      }

      try {
        // Try to load profile from Firestore
        const profile = await getUserProfile(userId);
        if (profile) {
          setUserProfile(profile);
        } else {
          // If profile doesn't exist (e.g., dummy profile), check if we have snapshot data
          // This would come from profile views
          console.warn('Profile not found, may be a dummy profile');
        }
        // TODO: Check friend status from Firestore
        // setFriendStatus(await checkFriendStatus(userId));
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Profile might not exist (dummy profile), continue with empty state
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadProfile();
    }
  }, [userId, profileData]);

  // Helper function to format birthday
  const formatBirthday = () => {
    if (!userProfile?.birthday) return 'Not set';
    const { day, month, year } = userProfile.birthday;
    if (day && month && year) {
      return `${day} ${month} ${year}`;
    }
    return 'Not set';
  };

  // Helper function to calculate age
  const calculateAge = () => {
    if (!userProfile?.birthday?.year) return null;
    const birthYear = parseInt(userProfile.birthday.year);
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const handleAddFriend = async () => {
    // TODO: Implement friend request functionality
    console.log('Add friend:', userId);
    setFriendStatus('pending');
    alert('Friend request sent!');
  };

  const handleSendHi = () => {
    // TODO: Navigate to messages or create a new conversation
    console.log('Send Hi to:', userId);
    alert('Opening conversation...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg pt-[60px] pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-dark-bg pt-[60px] pb-24">
        <div className="max-w-content md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-screen-padding md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onClose} className="text-orange hover:opacity-80 transition-opacity active:opacity-70">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-text-primary">Profile</h1>
            <div className="w-6" />
          </div>
          <div className="bg-surface-dark rounded-card p-8 text-center">
            <p className="text-base text-text-secondary">Profile not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-[60px] pb-24">
      <div className="max-w-content md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-screen-padding md:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="text-orange hover:opacity-80 transition-opacity active:opacity-70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-text-primary">Profile</h1>
          <div className="w-6" />
        </div>

        <div className="space-y-6">
          {/* Profile Header with Action Buttons */}
          <div className="bg-surface-dark rounded-card p-6 border-2 border-orange/30">
            <div className="flex flex-col items-center mb-6">
              {/* Profile image with gradient */}
              <div className="relative w-[120px] h-[120px] mb-4">
                <div className="absolute inset-0 rounded-full gradient-primary" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {userProfile?.profileImageUrl ? (
                    <img
                      src={userProfile.profileImageUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <svg className="w-[60px] h-[60px] text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Name and username */}
              <h1 className="text-2xl font-bold text-text-primary mb-1">
                {userProfile?.firstName || userProfile?.displayName || 'User'}
              </h1>
              {userProfile?.username && (
                <p className="text-base text-text-secondary mb-2">@{userProfile.username}</p>
              )}
              {userProfile?.email && userProfile?.showEmail && (
                <p className="text-sm text-text-faded">{userProfile.email}</p>
              )}
              {calculateAge() && (
                <p className="text-sm text-text-secondary mt-2">{calculateAge()} years old</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddFriend}
                disabled={friendStatus === 'pending' || friendStatus === 'friends'}
                className={`flex-1 flex items-center justify-center gap-2 rounded-pill py-3.5 text-button font-semibold transition-opacity active:opacity-75 ${
                  friendStatus === 'pending'
                    ? 'bg-surface-dark text-text-secondary cursor-not-allowed'
                    : friendStatus === 'friends'
                    ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                    : 'gradient-primary text-text-primary hover:opacity-90'
                }`}
              >
                {friendStatus === 'pending' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Request Sent</span>
                  </>
                ) : friendStatus === 'friends' ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Friends</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Friend</span>
                  </>
                )}
              </button>
              <button
                onClick={handleSendHi}
                className="flex-1 flex items-center justify-center gap-2 bg-surface-dark text-text-primary rounded-pill py-3.5 text-button font-semibold hover:opacity-90 transition-opacity active:opacity-75 border border-orange/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Send Hi</span>
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <ProfileSection title="Basic Information" icon="person">
            <ProfileField label="First Name" value={userProfile?.firstName || 'Not set'} />
            {userProfile?.username && (
              <ProfileField label="Username" value={`@${userProfile.username}`} />
            )}
            {userProfile?.email && userProfile?.showEmail && (
              <ProfileField label="Email" value={userProfile.email} />
            )}
            {userProfile?.phoneNumber && userProfile?.showPhone && (
              <ProfileField label="Phone Number" value={userProfile.phoneNumber} />
            )}
            {userProfile?.sex && (
              <ProfileField label="Sex" value={userProfile.sex} />
            )}
            {formatBirthday() !== 'Not set' && (
              <ProfileField label="Birthday" value={formatBirthday()} />
            )}
            {calculateAge() && <ProfileField label="Age" value={`${calculateAge()} years`} />}
            {userProfile?.currentCity && (
              <ProfileField label="Current City" value={userProfile.currentCity} />
            )}
            {userProfile?.homeCity && (
              <ProfileField label="Home City" value={userProfile.homeCity} />
            )}
            {userProfile?.education && (
              <ProfileField label="Education" value={userProfile.education} />
            )}
            {userProfile?.occupation && (
              <ProfileField label="Occupation" value={userProfile.occupation} />
            )}
            {userProfile?.relationship && (
              <ProfileField label="Relationship Status" value={userProfile.relationship} />
            )}
            
            {userProfile?.spokenLanguages && userProfile.spokenLanguages.length > 0 && (
              <div className="py-2">
                <label className="text-sm text-text-secondary mb-2 block">I Speak</label>
                <div className="flex flex-wrap gap-2">
                  {userProfile.spokenLanguages.map((lang: string, index: number) => (
                    <span key={index} className="px-3 py-1.5 bg-orange rounded-full text-sm font-medium text-text-primary">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {userProfile?.learningLanguages && userProfile.learningLanguages.length > 0 && (
              <div className="py-2">
                <label className="text-sm text-text-secondary mb-2 block">I Am Learning</label>
                <div className="flex flex-wrap gap-2">
                  {userProfile.learningLanguages.map((lang: string, index: number) => (
                    <span key={index} className="px-3 py-1.5 bg-orange rounded-full text-sm font-medium text-text-primary">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </ProfileSection>

          {/* About & Interests */}
          {(userProfile?.about || userProfile?.requests || userProfile?.interests?.length || userProfile?.music || userProfile?.books || userProfile?.movies || userProfile?.quotes) && (
            <ProfileSection title="About & Interests" icon="star">
              {userProfile?.about && (
                <div className="py-2">
                  <label className="text-sm text-text-secondary mb-2 block">About</label>
                  <p className="text-base text-text-primary leading-relaxed">{userProfile.about}</p>
                </div>
              )}

              {userProfile?.requests && (
                <div className="py-2">
                  <label className="text-sm text-text-secondary mb-2 block">Requests</label>
                  <p className="text-base text-text-primary leading-relaxed">{userProfile.requests}</p>
                </div>
              )}

              {userProfile?.interests && userProfile.interests.length > 0 && (
                <div className="py-2">
                  <label className="text-sm text-text-secondary mb-2 block">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.interests.map((interest: string, index: number) => (
                      <span key={index} className="px-3 py-1.5 bg-orange rounded-full text-sm font-medium text-text-primary">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {userProfile?.music && (
                <ProfileField label="Music" value={userProfile.music} />
              )}

              {userProfile?.books && (
                <ProfileField label="Books" value={userProfile.books} />
              )}

              {userProfile?.movies && (
                <ProfileField label="Movies" value={userProfile.movies} />
              )}

              {userProfile?.quotes && (
                <div className="py-2">
                  <label className="text-sm text-text-secondary mb-2 block">Favorite Quotes</label>
                  <p className="text-base text-text-primary leading-relaxed italic">"{userProfile.quotes}"</p>
                </div>
              )}
            </ProfileSection>
          )}

          {/* Empty State if no profile data */}
          {!userProfile?.firstName && !userProfile?.username && (
            <div className="bg-surface-dark rounded-card p-8 text-center border-2 border-orange/30">
              <svg className="w-16 h-16 text-text-faded mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-base text-text-secondary mb-4">This profile is empty</p>
              <p className="text-sm text-text-faded">No information available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Profile Section Component
interface ProfileSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, icon, children }) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (icon) {
      case 'person':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        );
      case 'star':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface-dark rounded-card p-6 border border-orange/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-dark-bg rounded-xl flex items-center justify-center text-orange">
          {getIcon()}
        </div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

// Profile Field Component
interface ProfileFieldProps {
  label: string;
  value: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => {
  if (!value || value === 'Not set') {
    return null;
  }

  return (
    <div className="py-2 border-b border-white/10 last:border-0">
      <div className="text-sm text-text-secondary mb-1">{label}</div>
      <div className="text-base font-medium text-text-primary">{value}</div>
    </div>
  );
};
