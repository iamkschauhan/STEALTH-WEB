import React, { useState, useEffect } from 'react';

interface Language {
  name: string;
  proficient: boolean;
}

interface UserProfile {
  id: number;
  name: string;
  age: number;
  gender: string;
  location: string;
  flag: string;
  bio: string;
  languages: Language[];
  currentLocation: string;
  isOnline: boolean;
}

export const SearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [users, setUsers] = useState<UserProfile[]>([]);

  // Mock user data matching iOS app
  const mockUsers: UserProfile[] = [
    {
      id: 1,
      name: 'Cryptmaster',
      age: 46,
      gender: '♂',
      location: 'Voorburg, Netherlands',
      flag: '🇳🇱',
      bio: 'Here are ten original and interesting questions and if you read my profile give and answer to one of them.',
      languages: [
        { name: 'Dutch', proficient: true },
        { name: 'English', proficient: true },
      ],
      currentLocation: 'Voorburg, Netherlands',
      isOnline: true,
    },
    {
      id: 2,
      name: 'Amaan',
      age: 28,
      gender: '♂',
      location: 'Karachi, Pakistan',
      flag: '🇵🇰',
      bio: 'Travel enthusiast and language learner',
      languages: [
        { name: 'Urdu', proficient: true },
        { name: 'English', proficient: false },
        { name: 'Chinese', proficient: false },
      ],
      currentLocation: 'Karachi, Pakistan',
      isOnline: true,
    },
    {
      id: 3,
      name: 'Sarah',
      age: 25,
      gender: '♀',
      location: 'Amsterdam, Netherlands',
      flag: '🇳🇱',
      bio: 'Photographer and explorer',
      languages: [
        { name: 'Dutch', proficient: true },
        { name: 'English', proficient: true },
      ],
      currentLocation: 'Amsterdam, Netherlands',
      isOnline: false,
    },
    {
      id: 4,
      name: 'David',
      age: 32,
      gender: '♂',
      location: 'Berlin, Germany',
      flag: '🇩🇪',
      bio: 'Tech enthusiast and music lover',
      languages: [
        { name: 'German', proficient: true },
        { name: 'English', proficient: true },
        { name: 'French', proficient: false },
      ],
      currentLocation: 'Berlin, Germany',
      isOnline: true,
    },
    {
      id: 5,
      name: 'Maria',
      age: 27,
      gender: '♀',
      location: 'Barcelona, Spain',
      flag: '🇪🇸',
      bio: 'Artist and foodie',
      languages: [
        { name: 'Spanish', proficient: true },
        { name: 'Catalan', proficient: true },
        { name: 'English', proficient: true },
      ],
      currentLocation: 'Barcelona, Spain',
      isOnline: false,
    },
  ];

  useEffect(() => {
    let filtered = [...mockUsers];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply selected filter
    if (selectedFilter === 'Online') {
      filtered = filtered.filter(user => user.isOnline);
    } else if (selectedFilter === 'New') {
      // Sort by newest (for demo, just reverse)
      filtered = filtered.reverse();
    } else if (selectedFilter === 'Nearby') {
      // For demo, keep as is (would use location data in real app)
    }

    setUsers(filtered);
  }, [searchQuery, selectedFilter]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(selectedFilter === filter ? '' : filter);
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-[60px] pb-24 lg:pb-10">
      <div className="max-w-content md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-screen-padding md:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-[28px] font-bold text-text-primary mb-5">
          Search
        </h1>

        {/* Search bar */}
        <div className="mb-4">
          <div className="flex items-center gap-3 bg-surface-dark rounded-pill px-4 py-3.5">
            <svg className="w-4 h-4 text-text-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-text-primary text-input font-input outline-none placeholder:text-text-faded"
            />
            <button
              onClick={() => {
                // Handle filter
                console.log('Filter clicked');
              }}
              className="text-text-icon flex-shrink-0"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="mb-6 flex gap-3">
          <FilterButton
            title="Online"
            isSelected={selectedFilter === 'Online'}
            onClick={() => handleFilterClick('Online')}
          />
          <FilterButton
            title="New"
            isSelected={selectedFilter === 'New'}
            onClick={() => handleFilterClick('New')}
          />
          <FilterButton
            title="Nearby"
            isSelected={selectedFilter === 'Nearby'}
            onClick={() => handleFilterClick('Nearby')}
          />
        </div>

        {/* Content */}
        {searchQuery.trim() === '' ? (
          // Empty search state
          <div className="py-24">
            <EmptyStateView
              icon="magnifyingglass"
              title="Start searching"
              message="Enter keywords to find what you're looking for"
            />
          </div>
        ) : users.length === 0 ? (
          // No results found
          <div className="py-24">
            <EmptyStateView
              icon="magnifyingglass"
              title="No results found"
              message="Try adjusting your search or filters"
            />
          </div>
        ) : (
          // Search results - User Profile Cards
          <div className="space-y-4 pb-24 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 md:space-y-0">
            {users.map((user) => (
              <UserProfileCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Filter Button Component
interface FilterButtonProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ title, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
        isSelected
          ? 'bg-orange text-white'
          : 'bg-surface-dark text-text-secondary'
      }`}
    >
      {title}
    </button>
  );
};

// User Profile Card Component
interface UserProfileCardProps {
  user: UserProfile;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <div className="bg-surface-dark rounded-card p-4 space-y-4">
      {/* Profile Header */}
      <div className="flex items-start gap-3">
        {/* Profile Picture with Flag and Online Status */}
        <div className="relative flex-shrink-0">
          <div className="relative">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
              <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            {/* Online indicator */}
            {user.isOnline && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-bg" />
            )}
          </div>
          {/* Flag overlay */}
          <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-surface-dark rounded-full flex items-center justify-center border-2 border-dark-bg">
            <span className="text-sm">{user.flag}</span>
          </div>
        </div>

        {/* Name and Location */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <h3 className="text-lg font-semibold text-text-primary">
              {user.name} {user.age}
            </h3>
            <span className="text-text-secondary text-base">{user.gender}</span>
          </div>
          <p className="text-text-secondary text-sm">{user.location}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-text-secondary text-sm line-clamp-3">{user.bio}</p>

      {/* Language Skills */}
      <div className="flex items-center gap-2 flex-wrap">
        {user.languages.map((lang, index) => (
          <div key={index} className="flex items-center gap-1">
            <svg
              className={`w-3 h-3 ${lang.proficient ? 'text-green-500' : 'text-gray-500'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            <span className="text-text-secondary text-xs font-medium">{lang.name}</span>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-0.5 h-2 ${lang.proficient ? 'bg-green-500' : 'bg-gray-500'}`}
                />
              ))}
            </div>
          </div>
        ))}
        {user.languages.length < 3 && (
          <span className="text-text-faded text-xs font-medium">2+</span>
        )}
      </div>

      {/* Current Location */}
      <div className="flex items-center gap-1.5">
        <svg className="w-3 h-3 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <span className="text-text-secondary text-sm">
          Currently in {user.currentLocation}
        </span>
        <span className="text-xs">{user.flag}</span>
      </div>
    </div>
  );
};

// Empty State Component
interface EmptyStateViewProps {
  icon: string;
  title: string;
  message: string;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({ icon, title, message }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        <svg className="w-16 h-16 text-text-faded opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-text-secondary mb-2">{title}</h2>
      <p className="text-text-faded text-sm">{message}</p>
    </div>
  );
};
