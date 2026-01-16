import React, { useState } from 'react';
import { NewPostView } from '../NewPostView';
import { FiltersView } from '../FiltersView';
import { EmptyStateView } from '../../components/EmptyStateView';

export const HomeView: React.FC = () => {
  const [isGlobalMode, setIsGlobalMode] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { icon: 'square.grid.2x2', name: 'Posts' },
    { icon: 'person.2.fill', name: 'People' },
    { icon: 'camera.fill', name: 'Photos' },
    { icon: 'location.fill', name: 'Location' },
  ];

  const users = [
    { name: 'Raisa', age: 29, country: 'Indonesia', flag: '🇮🇩', content: 'Added 1 photo to album "Album of me"' },
    { name: 'Jose Figueroa', age: 33, country: 'Colombia', flag: '🇨🇴', content: 'Vivir para servir 👍' },
    { name: 'Sarah', age: 25, country: 'USA', flag: '🇺🇸', content: 'Beautiful day at the beach!' },
    { name: 'Ahmed', age: 31, country: 'Egypt', flag: '🇪🇬', content: 'New project update' },
    { name: 'Maria', age: 27, country: 'Spain', flag: '🇪🇸', content: 'Amazing sunset view' },
  ];

  const guestNames = ['Davg', 'Ratih', 'Eva', 'Funbi', 'Rina', 'Sarah'];
  const guestFlags = ['🇭🇷', '🇮🇩', '🇪🇬', '🇳🇬', '🇮🇩', '🇺🇸'];

  return (
    <div className="min-h-screen bg-dark-bg pt-[60px] pb-24 lg:pb-10">
      <div className="max-w-content md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-screen-padding md:px-6 lg:px-8">
        {/* Profile Header Section */}
        <ProfileHeaderSection />

        {/* My Recent Guests Section */}
        <RecentGuestsSection guestNames={guestNames} guestFlags={guestFlags} />

        {/* What's new input section */}
        <WhatsNewInputSection onTap={() => setShowNewPost(true)} />

        {/* Global/Friends Toggle */}
        <GlobalFriendsToggle
          isGlobalMode={isGlobalMode}
          onToggle={setIsGlobalMode}
          onFiltersClick={() => setShowFilters(true)}
        />

        {/* Content Filter Bar */}
        <ContentFilterBar selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} filters={filters} />

        {/* Content based on filter */}
        {selectedFilter === 1 ? (
          <div className="pb-24">
            <EmptyStateView
              icon="person.2.fill"
              title="No posts yet"
              message="When people post, you'll see them here"
            />
          </div>
        ) : selectedFilter === 2 ? (
          <div className="pb-24">
            <EmptyStateView
              icon="camera.fill"
              title="No photos yet"
              message="Photos shared by users will appear here"
            />
          </div>
        ) : selectedFilter === 3 ? (
          <div className="pb-24">
            <EmptyStateView
              icon="location.fill"
              title="No locations yet"
              message="Location-based posts will appear here"
            />
          </div>
        ) : (
          // Feed Posts
          <div className="pb-24 space-y-6">
            {users.map((user, index) => (
              <FeedPostCard key={index} user={user} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <NewPostView
          onClose={() => setShowNewPost(false)}
          onPost={() => console.log('New post created')}
        />
      )}

      {/* Filters Modal */}
      {showFilters && <FiltersView onClose={() => setShowFilters(false)} />}
    </div>
  );
};

// Profile Header Section
const ProfileHeaderSection: React.FC = () => {
  return (
    <div className="flex items-center gap-4 pb-6">
      {/* Profile Picture with Flag */}
      <div className="relative flex-shrink-0">
        <div className="w-[60px] h-[60px] rounded-full gradient-primary flex items-center justify-center">
          <svg className="w-[30px] h-[30px] text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        {/* Flag overlay */}
        <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 rounded-full gradient-primary flex items-center justify-center border-2 border-dark-bg">
          <span className="text-xs">🇮🇳</span>
        </div>
      </div>

      {/* Location and Progress */}
      <div className="flex-1 space-y-2">
        {/* Location */}
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span className="text-base font-semibold text-text-primary">Bhopal</span>
          <span className="text-sm">🇮🇳</span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-label">Profile 63% complete</span>
          </div>
          <div className="relative h-1.5 bg-surface-dark rounded-sm overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full gradient-blue rounded-sm"
              style={{ width: '63%' }}
            />
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <button className="text-base font-semibold text-text-primary">Edit</button>
    </div>
  );
};

// Recent Guests Section
interface RecentGuestsSectionProps {
  guestNames: string[];
  guestFlags: string[];
}

const RecentGuestsSection: React.FC<RecentGuestsSectionProps> = ({ guestNames, guestFlags }) => {
  const guestCount = 2;

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-base font-semibold text-text-primary">My recent guests</span>
          <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-xs font-bold text-white">{guestCount}</span>
          </div>
        </div>
        <svg className="w-3.5 h-3.5 text-text-faded" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Guest Profiles */}
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {guestNames.map((name, index) => (
            <div key={index} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="relative">
                <div
                  className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to bottom right, rgb(255, ${128 + index * 5}, 0), rgb(255, ${204 + index * 5}, 0))`,
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 bg-surface-dark rounded-full flex items-center justify-center border-2 border-dark-bg">
                  <span className="text-xs">{guestFlags[index % guestFlags.length]}</span>
                </div>
              </div>
              <span className="text-xs font-medium text-text-primary">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// What's New Input Section
interface WhatsNewInputSectionProps {
  onTap: () => void;
}

const WhatsNewInputSection: React.FC<WhatsNewInputSectionProps> = ({ onTap }) => {
  return (
    <div className="pb-6">
      <button
        onClick={onTap}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-surface-dark rounded-pill"
      >
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
          <svg className="w-4.5 h-4.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <span className="flex-1 text-left text-base text-text-faded">What's new with you?</span>
        <svg className="w-5 h-5 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm6.5-6.5v-2c0-.83-.67-1.5-1.5-1.5h-3l-1.5-1.5H9L7.5 5.5H4.5c-.83 0-1.5.67-1.5 1.5v2H1v10h20V9h-2.5zm-1 0H4.5v-2h3l1.5 1.5h5l1.5-1.5h3v2z" />
        </svg>
      </button>
    </div>
  );
};

// Global/Friends Toggle
interface GlobalFriendsToggleProps {
  isGlobalMode: boolean;
  onToggle: (value: boolean) => void;
  onFiltersClick: () => void;
}

const GlobalFriendsToggle: React.FC<GlobalFriendsToggleProps> = ({
  isGlobalMode,
  onToggle,
  onFiltersClick,
}) => {
  return (
    <div className="pb-4">
      <div className="flex items-center gap-3 px-4 py-3 bg-surface-dark rounded-pill">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-base font-medium text-text-primary">Global</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isGlobalMode}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange" />
        </label>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
          <span className="text-base font-medium text-text-primary">Friends</span>
        </div>
        <div className="flex-1" />
        <button onClick={onFiltersClick} className="text-text-secondary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Content Filter Bar
interface ContentFilterBarProps {
  selectedFilter: number;
  onFilterChange: (index: number) => void;
  filters: Array<{ icon: string; name: string }>;
}

const ContentFilterBar: React.FC<ContentFilterBarProps> = ({
  selectedFilter,
  onFilterChange,
  filters,
}) => {
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'square.grid.2x2': (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
        </svg>
      ),
      'person.2.fill': (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      'camera.fill': (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm6.5-6.5v-2c0-.83-.67-1.5-1.5-1.5h-3l-1.5-1.5H9L7.5 5.5H4.5c-.83 0-1.5.67-1.5 1.5v2H1v10h20V9h-2.5zm-1 0H4.5v-2h3l1.5 1.5h5l1.5-1.5h3v2z" />
        </svg>
      ),
      'location.fill': (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
    };
    return iconMap[iconName] || null;
  };

  return (
    <div className="pb-6">
      <div className="flex items-center gap-6">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => onFilterChange(index)}
            className="flex flex-col items-center gap-1"
          >
            <div className={selectedFilter === index ? 'text-orange' : 'text-text-icon'}>
              {getIcon(filter.icon)}
            </div>
            {selectedFilter === index && <div className="w-[30px] h-0.5 bg-orange" />}
          </button>
        ))}
      </div>
    </div>
  );
};

// Feed Post Card
interface FeedPostCardProps {
  user: { name: string; age: number; country: string; flag: string; content: string };
  index: number;
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({ user, index }) => {
  return (
    <div className="bg-surface-dark rounded-card p-4 space-y-3">
      {/* User Info Header */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(to bottom right, rgb(255, ${128 + index * 5}, 0), rgb(255, ${204 + index * 5}, 0))`,
            }}
          >
            <svg className="w-[22px] h-[22px] text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-text-primary">
            {user.name} {user.age}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-xs">{user.flag}</span>
            <span className="text-sm text-text-secondary">{user.country}</span>
          </div>
        </div>
        <button className="text-text-faded">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <p className="text-[15px] text-text-primary">{user.content}</p>

      {/* Post Image */}
      <div className="w-full h-[300px] rounded-[22px] bg-gradient-to-br from-surface-dark to-dark-bg flex items-center justify-center">
        <svg className="w-10 h-10 text-text-faded opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      </div>

      {/* Timestamp and Actions */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-faded">{12 + index * 5} seconds ago</span>
        <div className="flex items-center gap-4">
          <button className="text-text-secondary">
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="text-text-secondary">
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
