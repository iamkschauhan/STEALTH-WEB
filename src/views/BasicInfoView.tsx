import React, { useState, useEffect } from 'react';
import { PickerSheetView } from '../components/PickerSheetView';
import { CitySelectionView } from './CitySelectionView';
import { MultiLanguageSelectionView } from './MultiLanguageSelectionView';
import { useAppState } from '../context/AppState';
import { createUserProfile, updateUserProfile } from '../services/firestoreService';

interface BasicInfoViewProps {
  onClose: () => void;
}

interface SignupData {
  fullName?: string;
  email?: string;
  birthDate?: string; // Format: DD/MM/YYYY
  phoneNumber?: string;
  uid?: string;
}

// Helper function to parse birth date from DD/MM/YYYY format
const parseBirthDate = (birthDate: string): { day: string; month: string; year: string } | null => {
  if (!birthDate || !/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
    return null;
  }
  const [day, month, year] = birthDate.split('/');
  
  // Map month number to month abbreviation
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = parseInt(month, 10) - 1;
  const monthAbbr = monthIndex >= 0 && monthIndex < 12 ? monthNames[monthIndex] : 'Jan';
  
  return {
    day: day,
    month: monthAbbr,
    year: year,
  };
};

// Helper function to get signup data from localStorage
const getSignupData = (): SignupData | null => {
  try {
    const signupDataStr = localStorage.getItem('signupData');
    if (signupDataStr) {
      return JSON.parse(signupDataStr);
    }
  } catch (error) {
    console.error('Error parsing signup data:', error);
  }
  return null;
};

export const BasicInfoView: React.FC<BasicInfoViewProps> = ({ onClose }) => {
  const { currentUser, userProfile, refreshUserProfile } = useAppState();
  
  // Get signup data from localStorage
  const signupData = getSignupData();
  const parsedBirthDate = signupData?.birthDate ? parseBirthDate(signupData.birthDate) : null;
  
  // Initialize state with priority: userProfile > signupData > defaults
  const [firstName, setFirstName] = useState(
    userProfile?.firstName || signupData?.fullName || ''
  );
  const [username, setUsername] = useState(userProfile?.username || '');
  const [currentCity, setCurrentCity] = useState(userProfile?.currentCity || '');
  const [homeCity, setHomeCity] = useState(userProfile?.homeCity || '');
  const [selectedSex, setSelectedSex] = useState(userProfile?.sex || 'Male');
  const [selectedDay, setSelectedDay] = useState(
    userProfile?.birthday?.day || parsedBirthDate?.day || '12'
  );
  const [selectedMonth, setSelectedMonth] = useState(
    userProfile?.birthday?.month || parsedBirthDate?.month || 'Mar'
  );
  const [selectedYear, setSelectedYear] = useState(
    userProfile?.birthday?.year || parsedBirthDate?.year || '1995'
  );
  const [education, setEducation] = useState(userProfile?.education || '');
  const [occupation, setOccupation] = useState(userProfile?.occupation || '');
  const [relationship, setRelationship] = useState(userProfile?.relationship || '');
  const [spokenLanguages, setSpokenLanguages] = useState<string[]>(userProfile?.spokenLanguages || []);
  const [learningLanguages, setLearningLanguages] = useState<string[]>(userProfile?.learningLanguages || []);
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || signupData?.phoneNumber || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Update fields when userProfile loads (if it wasn't available initially)
  useEffect(() => {
    if (userProfile && !userProfile.firstName && signupData?.fullName) {
      setFirstName(signupData.fullName);
    }
    if (userProfile && !userProfile.birthday && parsedBirthDate) {
      setSelectedDay(parsedBirthDate.day);
      setSelectedMonth(parsedBirthDate.month);
      setSelectedYear(parsedBirthDate.year);
    }
    if (userProfile && !userProfile.phoneNumber && signupData?.phoneNumber) {
      setPhoneNumber(signupData.phoneNumber);
    }
  }, [userProfile, signupData, parsedBirthDate]);

  const [showCurrentCityPicker, setShowCurrentCityPicker] = useState(false);
  const [showHomeCityPicker, setShowHomeCityPicker] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showEducationPicker, setShowEducationPicker] = useState(false);
  const [showRelationshipPicker, setShowRelationshipPicker] = useState(false);
  const [showSpokenLanguagesPicker, setShowSpokenLanguagesPicker] = useState(false);
  const [showLearningLanguagesPicker, setShowLearningLanguagesPicker] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = Array.from({ length: 61 }, (_, i) => String(2010 - i));
  const educationOptions = ['High School', 'Bachelor degree', 'Master degree', 'PhD', 'Other'];
  const relationshipOptions = ['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed'];

  const handleSave = async () => {
    if (!currentUser) {
      setError('You must be logged in to save your profile');
      return;
    }

    if (!firstName.trim()) {
      setError('First name is required');
      return;
    }

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const profileData = {
        email: currentUser.email || signupData?.email || '',
        firstName: firstName.trim(),
        username: username.trim(),
        currentCity: currentCity.trim() || undefined,
        homeCity: homeCity.trim() || undefined,
        sex: selectedSex,
        birthday: {
          day: selectedDay,
          month: selectedMonth,
          year: selectedYear,
        },
        education: education || undefined,
        occupation: occupation.trim() || undefined,
        relationship: relationship || undefined,
        spokenLanguages,
        learningLanguages,
        phoneNumber: phoneNumber.trim() || undefined,
      };

      if (userProfile) {
        // Update existing profile
        await updateUserProfile(currentUser.uid, profileData);
      } else {
        // Create new profile
        await createUserProfile(currentUser.uid, profileData);
      }

      // Clear signup data from localStorage after successful save
      localStorage.removeItem('signupData');

      // Refresh user profile in context
      await refreshUserProfile();
      onClose();
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setError(error.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

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
            <h1 className="text-lg font-semibold text-text-primary">Basic info</h1>
            <div className="w-5" />
          </div>

          {/* First Name */}
          <FormField label="First name" value={firstName} onChange={setFirstName} />

          {/* Username */}
          <FormField label="Username" value={username} onChange={setUsername} />

          {/* Phone Number */}
          <FormField 
            label="Phone Number" 
            value={phoneNumber} 
            onChange={setPhoneNumber}
          />

          {/* Current City */}
          <FormDropdownField
            label="Select your current city"
            value={currentCity}
            onClick={() => setShowCurrentCityPicker(true)}
          />

          {/* Home City */}
          <FormDropdownField
            label="Select your home city"
            value={homeCity}
            onClick={() => setShowHomeCityPicker(true)}
          />

          {/* Sex */}
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

          {/* Birthday */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">Birthday</h2>
            <div className="flex gap-3">
              <FormDropdownField
                label=""
                value={selectedDay}
                onClick={() => setShowDayPicker(true)}
                compact
              />
              <FormDropdownField
                label=""
                value={selectedMonth}
                onClick={() => setShowMonthPicker(true)}
                compact
              />
              <FormDropdownField
                label=""
                value={selectedYear}
                onClick={() => setShowYearPicker(true)}
                compact
              />
            </div>
          </div>

          {/* Education */}
          <FormDropdownField
            label="Education details"
            value={education}
            onClick={() => setShowEducationPicker(true)}
          />

          {/* Occupation */}
          <FormField label="Occupation" value={occupation} onChange={setOccupation} />

          {/* Relationship */}
          <FormDropdownField
            label="Relationship"
            value={relationship}
            onClick={() => setShowRelationshipPicker(true)}
          />

          {/* I speak */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">I speak</h2>
            <div className="flex items-center gap-2 flex-wrap px-5 py-4 bg-surface-dark rounded-card">
              {spokenLanguages.map((language) => (
                <LanguageTag key={language} text={language} />
              ))}
              {spokenLanguages.length < 3 && (
                <div className="px-3 py-2 bg-dark-bg rounded-full border border-white/10">
                  <span className="text-sm font-medium text-text-primary">
                    {3 - spokenLanguages.length}+
                  </span>
                </div>
              )}
              <button
                onClick={() => setShowSpokenLanguagesPicker(true)}
                className="ml-auto text-text-faded hover:text-text-primary transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* I am learning */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-text-primary">I am learning</h2>
            <div className="flex items-center gap-2 flex-wrap px-5 py-4 bg-surface-dark rounded-card">
              {learningLanguages.map((language) => (
                <LanguageTag key={language} text={language} />
              ))}
              <button
                onClick={() => setShowLearningLanguagesPicker(true)}
                className="ml-auto text-text-faded hover:text-text-primary transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-card">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Save button */}
          <div className="pb-10">
            <button
              onClick={handleSave}
              disabled={isSaving || !firstName.trim() || !username.trim()}
              className="w-full gradient-primary text-text-primary rounded-pill py-3.5 text-button font-semibold hover:opacity-90 transition-opacity active:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Pickers */}
      <CitySelectionView
        selectedCity={currentCity}
        isPresented={showCurrentCityPicker}
        onSelect={setCurrentCity}
        onClose={() => setShowCurrentCityPicker(false)}
      />

      <CitySelectionView
        selectedCity={homeCity}
        isPresented={showHomeCityPicker}
        onSelect={setHomeCity}
        onClose={() => setShowHomeCityPicker(false)}
      />

      <PickerSheetView
        title="Day"
        items={days}
        selectedItem={selectedDay}
        isPresented={showDayPicker}
        onSelect={setSelectedDay}
        onClose={() => setShowDayPicker(false)}
      />

      <PickerSheetView
        title="Month"
        items={months}
        selectedItem={selectedMonth}
        isPresented={showMonthPicker}
        onSelect={setSelectedMonth}
        onClose={() => setShowMonthPicker(false)}
      />

      <PickerSheetView
        title="Year"
        items={years}
        selectedItem={selectedYear}
        isPresented={showYearPicker}
        onSelect={setSelectedYear}
        onClose={() => setShowYearPicker(false)}
      />

      <PickerSheetView
        title="Education"
        items={educationOptions}
        selectedItem={education}
        isPresented={showEducationPicker}
        onSelect={setEducation}
        onClose={() => setShowEducationPicker(false)}
      />

      <PickerSheetView
        title="Relationship"
        items={relationshipOptions}
        selectedItem={relationship}
        isPresented={showRelationshipPicker}
        onSelect={setRelationship}
        onClose={() => setShowRelationshipPicker(false)}
      />

      <MultiLanguageSelectionView
        selectedLanguages={spokenLanguages}
        isPresented={showSpokenLanguagesPicker}
        onSelect={setSpokenLanguages}
        onClose={() => setShowSpokenLanguagesPicker(false)}
      />

      <MultiLanguageSelectionView
        selectedLanguages={learningLanguages}
        isPresented={showLearningLanguagesPicker}
        onSelect={setLearningLanguages}
        onClose={() => setShowLearningLanguagesPicker(false)}
      />
    </div>
  );
};

// Form Field Component
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="text-base font-semibold text-text-primary">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-dark rounded-card px-5 py-4 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
      />
    </div>
  );
};

// Form Dropdown Field Component
interface FormDropdownFieldProps {
  label: string;
  value: string;
  onClick: () => void;
  compact?: boolean;
}

const FormDropdownField: React.FC<FormDropdownFieldProps> = ({
  label,
  value,
  onClick,
  compact = false,
}) => {
  return (
    <div className={`${compact ? 'flex-1' : ''} space-y-3`}>
      {label && <label className="text-base font-semibold text-text-primary">{label}</label>}
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-5 py-4 bg-surface-dark rounded-card hover:opacity-90 transition-opacity active:opacity-75 ${
          compact ? 'px-4' : ''
        }`}
      >
        <span className={`text-input ${value ? 'text-text-primary' : 'text-text-faded'}`}>
          {value || 'Choose...'}
        </span>
        <svg className="w-3.5 h-3.5 text-text-faded flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
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
        isSelected ? 'bg-orange' : 'bg-surface-dark'
      }`}
    >
      <span className="text-lg">{symbol}</span>
      <span className="text-base font-medium text-text-primary">{title}</span>
    </button>
  );
};

// Language Tag Component
interface LanguageTagProps {
  text: string;
}

const LanguageTag: React.FC<LanguageTagProps> = ({ text }) => {
  return (
    <div className="px-3 py-2 bg-orange rounded-full">
      <span className="text-sm font-medium text-text-primary">{text}</span>
    </div>
  );
};
