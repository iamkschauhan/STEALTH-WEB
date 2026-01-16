import React, { useState } from 'react';
import { PickerSheetView } from '../components/PickerSheetView';
import { CountrySelectionView } from './CountrySelectionView';

// Import countries list for "Any country" picker
const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'Italy', 'Spain', 'Netherlands', 'India', 'Japan', 'China', 'Brazil', 'Mexico',
  'Russia', 'South Korea', 'Indonesia', 'Turkey', 'Saudi Arabia', 'Argentina',
];

interface IWantToMeetViewProps {
  onClose: () => void;
}

export const IWantToMeetView: React.FC<IWantToMeetViewProps> = ({ onClose }) => {
  const [selectedSex, setSelectedSex] = useState('Female');
  const [ageMin, setAgeMin] = useState(16);
  const [ageMax, setAgeMax] = useState(24);
  const [selectedCountry, setSelectedCountry] = useState('Any country');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose...');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Postal Pen Pals', 'Language practice']);
  const [onlyMatchingCanContact, setOnlyMatchingCanContact] = useState(true);

  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showGoalsPicker, setShowGoalsPicker] = useState(false);

  const goals = [
    'Postal Pen Pals',
    'Language practice',
    'Travel buddies',
    'Cultural exchange',
    'Friendship',
    'Dating',
    'Business networking',
  ];


  const languageOptions = [
    'Choose...',
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
    'Korean',
    'Arabic',
    'Hindi',
  ];

  const handleSave = () => {
    // Handle save
    console.log('Save preferences:', {
      selectedSex,
      ageRange: `${ageMin}-${ageMax}`,
      selectedCountry,
      selectedLanguage,
      selectedGoals,
      onlyMatchingCanContact,
    });
    onClose();
  };

  const handleToggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const ageRange = ageMax - ageMin;
  const ageRangePercent = (ageRange / 50) * 100;
  const ageMinPercent = ((ageMin - 16) / 50) * 100;

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
            <h1 className="text-lg font-semibold text-text-primary">I want to meet...</h1>
            <div className="w-5" />
          </div>

          {/* Sex Selection */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Sex</h2>
            <div className="flex gap-3">
              <SexButton
                symbol="♂"
                title="Male"
                isSelected={selectedSex === 'Male'}
                onClick={() => setSelectedSex('Male')}
              />
              <SexButton
                symbol="♀"
                title="Female"
                isSelected={selectedSex === 'Female'}
                onClick={() => setSelectedSex('Female')}
              />
            </div>
          </div>

          {/* Age Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-text-primary">Age</h2>
              <span className="text-base text-text-secondary">
                {ageMin} - {ageMax}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-text-faded">
                <span>{ageMin}</span>
                <span>{ageMax}</span>
              </div>
              <div className="relative h-8">
                {/* Track */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-dark rounded-sm -translate-y-1/2" />
                {/* Active range */}
                <div
                  className="absolute top-1/2 h-1 bg-orange rounded-sm -translate-y-1/2"
                  style={{
                    left: `${ageMinPercent}%`,
                    width: `${ageRangePercent}%`,
                  }}
                />
                {/* Min thumb */}
                <input
                  type="range"
                  min="16"
                  max="66"
                  value={ageMin}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value);
                    if (newMin < ageMax) setAgeMin(newMin);
                  }}
                  className="absolute top-1/2 left-0 w-full h-1 opacity-0 cursor-pointer -translate-y-1/2 z-10"
                />
                {/* Max thumb */}
                <input
                  type="range"
                  min="16"
                  max="66"
                  value={ageMax}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    if (newMax > ageMin) setAgeMax(newMax);
                  }}
                  className="absolute top-1/2 left-0 w-full h-1 opacity-0 cursor-pointer -translate-y-1/2 z-10"
                />
              </div>
            </div>
          </div>

          {/* Countries Selection */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Countries</h2>
            <button
              onClick={() => setShowCountryPicker(true)}
              className="w-full flex items-center justify-between px-5 py-4 bg-surface-dark rounded-card hover:opacity-90 transition-opacity active:opacity-75"
            >
              <span className="text-input text-text-primary">{selectedCountry}</span>
              <svg className="w-3.5 h-3.5 text-text-faded flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Speakers of Selection */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Speakers of</h2>
            <button
              onClick={() => setShowLanguagePicker(true)}
              className="w-full flex items-center justify-between px-5 py-4 bg-surface-dark rounded-card hover:opacity-90 transition-opacity active:opacity-75"
            >
              <span
                className={`text-input ${
                  selectedLanguage === 'Choose...' ? 'text-text-faded' : 'text-text-primary'
                }`}
              >
                {selectedLanguage}
              </span>
              <svg className="w-3.5 h-3.5 text-text-faded flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Goals Selection */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Goals</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {selectedGoals.slice(0, 3).map((goal) => (
                <GoalTag key={goal} text={goal} />
              ))}
              {selectedGoals.length > 3 && (
                <div className="px-3 py-2 bg-orange rounded-full">
                  <span className="text-sm font-medium text-text-primary">
                    {selectedGoals.length - 3}+
                  </span>
                </div>
              )}
              <button
                onClick={() => setShowGoalsPicker(true)}
                className="ml-auto text-text-faded hover:text-text-primary transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Info Text */}
          <div>
            <div className="bg-surface-dark rounded-card p-4">
              <p className="text-sm text-text-secondary leading-relaxed">
                These preferences appear on your profile but do not limit who can contact you. You
                can set filters by editing your filter settings or applying these preferences as
                filters below
              </p>
            </div>
          </div>

          {/* Contact Preference */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOnlyMatchingCanContact(!onlyMatchingCanContact)}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              {onlyMatchingCanContact ? (
                <svg className="w-5 h-5 text-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <p className="text-base text-text-primary">
              Only users who meet this criteria can contact me
            </p>
          </div>

          {/* Save Button */}
          <div className="pb-10">
            <button
              onClick={handleSave}
              className="w-full gradient-primary text-text-primary rounded-pill py-3.5 text-button font-semibold hover:opacity-90 transition-opacity active:opacity-75"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Country Picker - Using PickerSheetView with "Any country" option */}
      <PickerSheetView
        title="Countries"
        items={['Any country', ...countries.slice(0, 20)]} // Show first 20 countries + "Any country"
        selectedItem={selectedCountry}
        isPresented={showCountryPicker}
        onSelect={(item) => setSelectedCountry(item)}
        onClose={() => setShowCountryPicker(false)}
      />

      {/* Language Picker */}
      <PickerSheetView
        title="Language"
        items={languageOptions}
        selectedItem={selectedLanguage}
        isPresented={showLanguagePicker}
        onSelect={(item) => setSelectedLanguage(item)}
        onClose={() => setShowLanguagePicker(false)}
      />

      {/* Goals Picker */}
      {showGoalsPicker && (
        <MultiGoalSelectionView
          goals={goals}
          selectedGoals={selectedGoals}
          isPresented={showGoalsPicker}
          onSelect={setSelectedGoals}
          onClose={() => setShowGoalsPicker(false)}
        />
      )}
    </div>
  );
};

// Sex Button Component
interface SexButtonProps {
  symbol: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const SexButton: React.FC<SexButtonProps> = ({ symbol, title, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center gap-2 py-3.5 px-4 rounded-card transition-colors hover:opacity-90 active:opacity-75 ${
        isSelected ? 'bg-accent-blue' : 'bg-surface-dark'
      }`}
    >
      <span className="text-lg">{symbol}</span>
      <span className="text-base font-medium text-text-primary">{title}</span>
    </button>
  );
};

// Goal Tag Component
interface GoalTagProps {
  text: string;
}

const GoalTag: React.FC<GoalTagProps> = ({ text }) => {
  return (
    <div className="px-3 py-2 bg-orange rounded-full">
      <span className="text-sm font-medium text-text-primary">{text}</span>
    </div>
  );
};

// Multi Goal Selection View
interface MultiGoalSelectionViewProps {
  goals: string[];
  selectedGoals: string[];
  isPresented: boolean;
  onSelect: (goals: string[]) => void;
  onClose: () => void;
}

const MultiGoalSelectionView: React.FC<MultiGoalSelectionViewProps> = ({
  goals,
  selectedGoals,
  isPresented,
  onSelect,
  onClose,
}) => {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedGoals);

  React.useEffect(() => {
    setLocalSelected(selectedGoals);
  }, [selectedGoals, isPresented]);

  const handleToggleGoal = (goal: string) => {
    const newSelected = localSelected.includes(goal)
      ? localSelected.filter((g) => g !== goal)
      : [...localSelected, goal];
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
          <h2 className="text-xl font-bold text-text-primary">Goals</h2>
          <button onClick={onClose} className="text-text-icon">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.64c.39.39.39 1.02 0 1.41L13.41 12l3.23 3.23c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 13.41l-3.23 3.23c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.36 8.77c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l3.23-3.23c.39-.39 1.02-.39 1.41 0z" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pb-5">
          <div className="space-y-0">
            {goals.map((goal, index) => (
              <div key={goal}>
                <button
                  onClick={() => handleToggleGoal(goal)}
                  className="w-full flex items-center justify-between px-screen-padding py-3.5 hover:bg-white/5 transition-colors"
                >
                  <span className="text-[17px] font-normal text-text-primary">{goal}</span>
                  {localSelected.includes(goal) && (
                    <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
                {index < goals.length - 1 && <div className="h-px bg-white/10 ml-screen-padding" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
