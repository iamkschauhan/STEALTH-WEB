import React, { useState } from 'react';
import { FilterDropdownField } from '../components/FilterDropdownField';
import { PickerSheetView } from '../components/PickerSheetView';
import { CountrySelectionView } from './CountrySelectionView';
import { ContinentSelectionView } from './ContinentSelectionView';
import { CitySelectionView } from './CitySelectionView';

interface FiltersViewProps {
  onClose: () => void;
}

export const FiltersView: React.FC<FiltersViewProps> = ({ onClose }) => {
  const [selectedLearning, setSelectedLearning] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCurrentCity, setSelectedCurrentCity] = useState('');
  const [selectedHomeCountry, setSelectedHomeCountry] = useState('');
  const [onlyOnlineUsers, setOnlyOnlineUsers] = useState(false);
  const [sortBy, setSortBy] = useState('Last login');

  const [showLearningPicker, setShowLearningPicker] = useState(false);
  const [showContinentPicker, setShowContinentPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showCurrentCityPicker, setShowCurrentCityPicker] = useState(false);
  const [showHomeCountryPicker, setShowHomeCountryPicker] = useState(false);
  const [showSortByPicker, setShowSortByPicker] = useState(false);

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Dutch',
    'Russian',
    'Chinese',
    'Japanese',
  ];


  const sortByOptions = ['Last login', 'Newest', 'Oldest', 'Most active', 'Alphabetical'];

  const handleReset = () => {
    setSelectedLearning('');
    setSelectedContinent('');
    setSelectedCountry('');
    setSelectedCurrentCity('');
    setSelectedHomeCountry('');
    setOnlyOnlineUsers(false);
    setSortBy('Last login');
  };

  const handleShowResults = () => {
    // Handle show results
    console.log('Show results with filters:', {
      selectedLearning,
      selectedContinent,
      selectedCountry,
      selectedCurrentCity,
      selectedHomeCountry,
      onlyOnlineUsers,
      sortBy,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-dark-bg flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1 overflow-hidden">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between px-screen-padding pt-[60px] pb-10">
          <button onClick={onClose} className="text-orange">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-text-primary">Filters</h1>
          <button onClick={handleReset} className="text-sm font-medium text-orange">
            Reset
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 px-screen-padding pb-6">
          {/* Learning Section */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-text-primary">Learning</h2>
            <button
              onClick={() => setShowLearningPicker(true)}
              className="w-full flex items-center justify-between px-5 py-4 bg-surface-dark rounded-card"
            >
              <span className={`text-base ${selectedLearning ? 'text-text-primary' : 'text-text-faded'}`}>
                {selectedLearning || 'Choose...'}
              </span>
              <svg className="w-3.5 h-3.5 text-text-faded" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-text-faded uppercase">LOCATION</h2>
            <div className="space-y-4">
              <FilterDropdownField
                label="Continent"
                value={selectedContinent}
                onClick={() => setShowContinentPicker(true)}
              />
              <FilterDropdownField
                label="Country"
                value={selectedCountry}
                onClick={() => setShowCountryPicker(true)}
              />
              <FilterDropdownField
                label="Current city"
                value={selectedCurrentCity}
                onClick={() => setShowCurrentCityPicker(true)}
              />
              <FilterDropdownField
                label="Home Country"
                value={selectedHomeCountry}
                onClick={() => setShowHomeCountryPicker(true)}
              />
            </div>
          </div>

          {/* Other Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-text-faded uppercase">OTHER</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOnlyOnlineUsers(!onlyOnlineUsers)}
                className="flex-shrink-0"
              >
                {onlyOnlineUsers ? (
                  <svg className="w-5 h-5 text-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-text-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <span className="text-base text-text-primary">Only online users</span>
            </div>
          </div>

          {/* Display Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-text-faded uppercase">DISPLAY</h2>
            <FilterDropdownField
              label="Sort by"
              value={sortBy}
              onClick={() => setShowSortByPicker(true)}
            />
          </div>
        </div>

        {/* Show results button */}
        <div className="px-screen-padding pb-10">
          <button
            onClick={handleShowResults}
            className="w-full gradient-primary text-text-primary rounded-pill py-3 text-lg font-semibold"
          >
            Show results
          </button>
        </div>
      </div>

      {/* Pickers */}
      <PickerSheetView
        title="Language"
        items={languageOptions}
        selectedItem={selectedLearning}
        isPresented={showLearningPicker}
        onSelect={(item) => setSelectedLearning(item)}
        onClose={() => setShowLearningPicker(false)}
      />

      <ContinentSelectionView
        selectedContinent={selectedContinent}
        isPresented={showContinentPicker}
        onSelect={setSelectedContinent}
        onClose={() => setShowContinentPicker(false)}
      />

      <CountrySelectionView
        selectedCountry={selectedCountry}
        isPresented={showCountryPicker}
        onSelect={setSelectedCountry}
        onClose={() => setShowCountryPicker(false)}
      />

      <CitySelectionView
        selectedCity={selectedCurrentCity}
        isPresented={showCurrentCityPicker}
        onSelect={setSelectedCurrentCity}
        onClose={() => setShowCurrentCityPicker(false)}
      />

      <CountrySelectionView
        selectedCountry={selectedHomeCountry}
        isPresented={showHomeCountryPicker}
        onSelect={setSelectedHomeCountry}
        onClose={() => setShowHomeCountryPicker(false)}
      />

      <PickerSheetView
        title="Sort by"
        items={sortByOptions}
        selectedItem={sortBy}
        isPresented={showSortByPicker}
        onSelect={(item) => setSortBy(item)}
        onClose={() => setShowSortByPicker(false)}
      />
    </div>
  );
};
