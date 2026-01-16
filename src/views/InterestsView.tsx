import React, { useState } from 'react';
import { MultiLanguageSelectionView } from './MultiLanguageSelectionView';

interface InterestsViewProps {
  onClose: () => void;
}

export const InterestsView: React.FC<InterestsViewProps> = ({ onClose }) => {
  const [about, setAbout] = useState('live life king size, i believe in peace ............');
  const [requests, setRequests] = useState('lets connect');
  const [interests, setInterests] = useState<string[]>(['Coldplay', 'Software Development']);
  const [music, setMusic] = useState('sufi');
  const [books, setBooks] = useState('fictional');
  const [movies, setMovies] = useState('romantic');
  const [quotes, setQuotes] = useState('');

  const [showInterestsPicker, setShowInterestsPicker] = useState(false);

  const availableInterests = [
    'Coldplay',
    'Software Development',
    'Photography',
    'Travel',
    'Cooking',
    'Reading',
    'Music',
    'Movies',
    'Sports',
    'Gaming',
    'Art',
    'Writing',
    'Dancing',
    'Fitness',
    'Yoga',
    'Meditation',
    'Technology',
    'Science',
    'History',
    'Philosophy',
    'Nature',
    'Animals',
    'Fashion',
    'Design',
    'Programming',
    'Web Development',
    'Mobile Apps',
    'AI',
    'Machine Learning',
    'Blockchain',
    'Cryptocurrency',
    'Startups',
    'Entrepreneurship',
  ];

  return (
    <div className="min-h-screen bg-dark-bg pt-[60px] pb-24">
      <div className="max-w-content md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-screen-padding md:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between pb-4">
            <button onClick={onClose} className="text-orange hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-text-primary">Interests</h1>
            <div className="w-5" />
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">About</h2>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full min-h-[100px] bg-surface-dark rounded-card p-4 text-input text-text-primary outline-none resize-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
              placeholder="Enter text..."
            />
          </div>

          {/* Requests Section */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Requests</h2>
            <input
              type="text"
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
              className="w-full bg-surface-dark rounded-card px-5 py-4 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
              placeholder="Enter text..."
            />
          </div>

          {/* Interests Section */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Interests</h2>
            <div className="flex items-center gap-2 flex-wrap px-5 py-4 bg-surface-dark rounded-card">
              {interests.map((interest) => (
                <InterestTag key={interest} text={interest} />
              ))}
              <button
                onClick={() => setShowInterestsPicker(true)}
                className="ml-auto text-text-faded hover:text-text-primary transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Music Section */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Music</h2>
            <input
              type="text"
              value={music}
              onChange={(e) => setMusic(e.target.value)}
              className="w-full bg-surface-dark rounded-card px-5 py-4 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
              placeholder="Enter text..."
            />
          </div>

          {/* Books Section */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Books</h2>
            <input
              type="text"
              value={books}
              onChange={(e) => setBooks(e.target.value)}
              className="w-full bg-surface-dark rounded-card px-5 py-4 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
              placeholder="Enter text..."
            />
          </div>

          {/* Movies Section */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Movies</h2>
            <input
              type="text"
              value={movies}
              onChange={(e) => setMovies(e.target.value)}
              className="w-full bg-surface-dark rounded-card px-5 py-4 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
              placeholder="Enter text..."
            />
          </div>

          {/* Quotes Section */}
          <div className="space-y-3 pb-10">
            <h2 className="text-base font-semibold text-text-primary">Quotes</h2>
            <input
              type="text"
              value={quotes}
              onChange={(e) => setQuotes(e.target.value)}
              className="w-full bg-surface-dark rounded-card px-5 py-4 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
              placeholder="Enter text..."
            />
          </div>
        </div>
      </div>

      {/* Interests Picker */}
      <MultiInterestSelectionView
        availableInterests={availableInterests}
        selectedInterests={interests}
        isPresented={showInterestsPicker}
        onSelect={setInterests}
        onClose={() => setShowInterestsPicker(false)}
      />
    </div>
  );
};

// Interest Tag Component
interface InterestTagProps {
  text: string;
}

const InterestTag: React.FC<InterestTagProps> = ({ text }) => {
  return (
    <div className="px-3 py-2 bg-orange rounded-full">
      <span className="text-sm font-medium text-text-primary">{text}</span>
    </div>
  );
};

// Multi Interest Selection View
interface MultiInterestSelectionViewProps {
  availableInterests: string[];
  selectedInterests: string[];
  isPresented: boolean;
  onSelect: (interests: string[]) => void;
  onClose: () => void;
}

const MultiInterestSelectionView: React.FC<MultiInterestSelectionViewProps> = ({
  availableInterests,
  selectedInterests,
  isPresented,
  onSelect,
  onClose,
}) => {
  const [searchText, setSearchText] = useState('');
  const [localSelected, setLocalSelected] = useState<string[]>(selectedInterests);

  React.useEffect(() => {
    setLocalSelected(selectedInterests);
  }, [selectedInterests, isPresented]);

  const filteredInterests = searchText
    ? availableInterests.filter((interest) =>
        interest.toLowerCase().includes(searchText.toLowerCase())
      )
    : availableInterests;

  const handleToggleInterest = (interest: string) => {
    const newSelected = localSelected.includes(interest)
      ? localSelected.filter((i) => i !== interest)
      : [...localSelected, interest];
    setLocalSelected(newSelected);
    onSelect(newSelected);
  };

  if (!isPresented) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[50]" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-dark-bg rounded-t-[24px] shadow-2xl max-h-[80vh] flex flex-col animate-slide-up">
        <div className="flex justify-center pt-3 pb-5">
          <div className="w-9 h-1 bg-white/30 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-screen-padding pb-5">
          <h2 className="text-xl font-bold text-text-primary">Interests</h2>
          <button onClick={onClose} className="text-text-icon">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.64c.39.39.39 1.02 0 1.41L13.41 12l3.23 3.23c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 13.41l-3.23 3.23c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.36 8.77c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l3.23-3.23c.39-.39 1.02-.39 1.41 0z" />
            </svg>
          </button>
        </div>
        <div className="px-screen-padding mb-6">
          <div className="flex items-center gap-3 bg-surface-dark rounded-pill px-4 py-3.5">
            <svg className="w-4 h-4 text-text-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 bg-transparent text-text-primary text-base outline-none placeholder:text-text-faded"
            />
            {searchText && (
              <button onClick={() => setSearchText('')} className="text-text-icon">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.64c.39.39.39 1.02 0 1.41L13.41 12l3.23 3.23c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 13.41l-3.23 3.23c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.36 8.77c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l3.23-3.23c.39-.39 1.02-.39 1.41 0z" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto pb-5">
          <div className="space-y-0">
            {filteredInterests.map((interest, index) => (
              <div key={interest}>
                <button
                  onClick={() => handleToggleInterest(interest)}
                  className="w-full flex items-center justify-between px-screen-padding py-3.5 hover:bg-white/5 transition-colors"
                >
                  <span className="text-[17px] font-normal text-text-primary">{interest}</span>
                  {localSelected.includes(interest) && (
                    <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
                {index < filteredInterests.length - 1 && (
                  <div className="h-px bg-white/10 ml-screen-padding" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
