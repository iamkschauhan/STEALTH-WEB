import React from 'react';
import { useAppState } from '../context/AppState';

interface ProfileViewProps {
  onClose: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onClose }) => {
  const { currentUser, userProfile } = useAppState();

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
          <h1 className="text-lg font-semibold text-text-primary">My Profile</h1>
          <div className="w-6" />
        </div>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="bg-surface-dark rounded-card p-6">
            <div className="flex flex-col items-center">
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
                {userProfile?.firstName || currentUser?.displayName || 'User'}
              </h1>
              {userProfile?.username && (
                <p className="text-base text-text-secondary mb-2">@{userProfile.username}</p>
              )}
              {currentUser?.email && (
                <p className="text-sm text-text-faded">{currentUser.email}</p>
              )}
              {calculateAge() && (
                <p className="text-sm text-text-secondary mt-2">{calculateAge()} years old</p>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <ProfileSection title="Basic Information" icon="person">
            <ProfileField label="First Name" value={userProfile?.firstName || 'Not set'} />
            <ProfileField label="Username" value={userProfile?.username ? `@${userProfile.username}` : 'Not set'} />
            <ProfileField label="Email" value={currentUser?.email || 'Not set'} />
            <ProfileField label="Phone Number" value={userProfile?.phoneNumber || 'Not set'} />
            <ProfileField label="Sex" value={userProfile?.sex || 'Not set'} />
            <ProfileField label="Birthday" value={formatBirthday()} />
            {calculateAge() && <ProfileField label="Age" value={`${calculateAge()} years`} />}
            <ProfileField label="Current City" value={userProfile?.currentCity || 'Not set'} />
            <ProfileField label="Home City" value={userProfile?.homeCity || 'Not set'} />
            <ProfileField label="Education" value={userProfile?.education || 'Not set'} />
            <ProfileField label="Occupation" value={userProfile?.occupation || 'Not set'} />
            <ProfileField label="Relationship Status" value={userProfile?.relationship || 'Not set'} />
            
            {userProfile?.spokenLanguages && userProfile.spokenLanguages.length > 0 && (
              <div className="py-2">
                <label className="text-sm text-text-secondary mb-2 block">I Speak</label>
                <div className="flex flex-wrap gap-2">
                  {userProfile.spokenLanguages.map((lang, index) => (
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
                  {userProfile.learningLanguages.map((lang, index) => (
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
                    {userProfile.interests.map((interest, index) => (
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

          {/* I Want to Meet */}
          {(userProfile?.meetSex || userProfile?.ageMin || userProfile?.ageMax || userProfile?.meetCountry || userProfile?.meetLanguage || userProfile?.meetGoals?.length) && (
            <ProfileSection title="I Want to Meet" icon="magnifyingglass">
              {userProfile?.meetSex && (
                <ProfileField label="Sex Preference" value={userProfile.meetSex} />
              )}

              {(userProfile?.ageMin || userProfile?.ageMax) && (
                <ProfileField
                  label="Age Range"
                  value={userProfile.ageMin && userProfile.ageMax ? `${userProfile.ageMin} - ${userProfile.ageMax} years` : 'Not set'}
                />
              )}

              {userProfile?.meetCountry && (
                <ProfileField label="Country Preference" value={userProfile.meetCountry} />
              )}

              {userProfile?.meetLanguage && (
                <ProfileField label="Language Preference" value={userProfile.meetLanguage} />
              )}

              {userProfile?.meetGoals && userProfile.meetGoals.length > 0 && (
                <div className="py-2">
                  <label className="text-sm text-text-secondary mb-2 block">Goals</label>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.meetGoals.map((goal, index) => (
                      <span key={index} className="px-3 py-1.5 bg-orange rounded-full text-sm font-medium text-text-primary">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {userProfile?.onlyMatchingCanContact !== undefined && (
                <ProfileField
                  label="Contact Preference"
                  value={userProfile.onlyMatchingCanContact ? 'Only matching users can contact me' : 'Everyone can contact me'}
                />
              )}
            </ProfileSection>
          )}

          {/* Empty State if no profile data */}
          {!userProfile?.firstName && !userProfile?.username && (
            <div className="bg-surface-dark rounded-card p-8 text-center">
              <svg className="w-16 h-16 text-text-faded mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-base text-text-secondary mb-4">Your profile is empty</p>
              <p className="text-sm text-text-faded">Go to Edit Profile to add your information</p>
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
      case 'magnifyingglass':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
