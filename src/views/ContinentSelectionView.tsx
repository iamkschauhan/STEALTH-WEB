import React, { useState } from 'react';

interface ContinentSelectionViewProps {
  selectedContinent: string;
  isPresented: boolean;
  onSelect: (continent: string) => void;
  onClose: () => void;
}

const continents = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America',
];

export const ContinentSelectionView: React.FC<ContinentSelectionViewProps> = ({
  selectedContinent,
  isPresented,
  onSelect,
  onClose,
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredContinents = searchText
    ? continents.filter((continent) =>
        continent.toLowerCase().includes(searchText.toLowerCase())
      )
    : continents;

  const handleSelect = (continent: string) => {
    onSelect(continent);
    onClose();
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
          <h2 className="text-xl font-bold text-text-primary">Continent</h2>
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
            {filteredContinents.map((continent, index) => (
              <div key={continent}>
                <button
                  onClick={() => handleSelect(continent)}
                  className="w-full flex items-center justify-between px-screen-padding py-3.5 hover:bg-white/5 transition-colors"
                >
                  <span className="text-[17px] font-normal text-text-primary">{continent}</span>
                  {selectedContinent === continent && (
                    <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
                {index < filteredContinents.length - 1 && (
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
