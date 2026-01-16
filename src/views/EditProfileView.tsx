import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PickerSheetView } from '../components/PickerSheetView';
import { CitySelectionView } from './CitySelectionView';
import { MultiLanguageSelectionView } from './MultiLanguageSelectionView';
import { useAppState } from '../context/AppState';
import { createUserProfile, updateUserProfile } from '../services/firestoreService';

interface EditProfileViewProps {
  onClose: () => void;
}

interface SignupData {
  fullName?: string;
  email?: string;
  birthDate?: string;
  phoneNumber?: string;
  uid?: string;
}

// Helper function to parse birth date from DD/MM/YYYY format
const parseBirthDate = (birthDate: string): { day: string; month: string; year: string } | null => {
  if (!birthDate || !/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
    return null;
  }
  const [day, month, year] = birthDate.split('/');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = parseInt(month, 10) - 1;
  const monthAbbr = monthIndex >= 0 && monthIndex < 12 ? monthNames[monthIndex] : 'Jan';
  return { day, month: monthAbbr, year };
};

const getSignupData = (): SignupData | null => {
  try {
    const signupDataStr = localStorage.getItem('signupData');
    if (signupDataStr) return JSON.parse(signupDataStr);
  } catch (error) {
    console.error('Error parsing signup data:', error);
  }
  return null;
};

export const EditProfileView: React.FC<EditProfileViewProps> = ({ onClose }) => {
  const { currentUser, userProfile, refreshUserProfile } = useAppState();
  const signupData = getSignupData();
  const parsedBirthDate = signupData?.birthDate ? parseBirthDate(signupData.birthDate) : null;

  // Basic Info State
  const [firstName, setFirstName] = useState(userProfile?.firstName || signupData?.fullName || '');
  const [username, setUsername] = useState(userProfile?.username || '');
  const [currentCity, setCurrentCity] = useState(userProfile?.currentCity || '');
  const [homeCity, setHomeCity] = useState(userProfile?.homeCity || '');
  const [selectedSex, setSelectedSex] = useState(userProfile?.sex || 'Male');
  const [selectedDay, setSelectedDay] = useState(userProfile?.birthday?.day || parsedBirthDate?.day || '12');
  const [selectedMonth, setSelectedMonth] = useState(userProfile?.birthday?.month || parsedBirthDate?.month || 'Mar');
  const [selectedYear, setSelectedYear] = useState(userProfile?.birthday?.year || parsedBirthDate?.year || '1995');
  const [education, setEducation] = useState(userProfile?.education || '');
  const [occupation, setOccupation] = useState(userProfile?.occupation || '');
  const [relationship, setRelationship] = useState(userProfile?.relationship || '');
  const [spokenLanguages, setSpokenLanguages] = useState<string[]>(userProfile?.spokenLanguages || []);
  const [learningLanguages, setLearningLanguages] = useState<string[]>(userProfile?.learningLanguages || []);
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || signupData?.phoneNumber || '');

  // Interests State
  const [about, setAbout] = useState(userProfile?.about || '');
  const [requests, setRequests] = useState(userProfile?.requests || '');
  const [interests, setInterests] = useState<string[]>(userProfile?.interests || []);
  const [music, setMusic] = useState(userProfile?.music || '');
  const [books, setBooks] = useState(userProfile?.books || '');
  const [movies, setMovies] = useState(userProfile?.movies || '');
  const [quotes, setQuotes] = useState(userProfile?.quotes || '');

  // I Want to Meet State
  const [meetSex, setMeetSex] = useState(userProfile?.meetSex || 'Female');
  const [ageMin, setAgeMin] = useState(userProfile?.ageMin || 16);
  const [ageMax, setAgeMax] = useState(userProfile?.ageMax || 24);
  const [selectedCountry, setSelectedCountry] = useState(userProfile?.meetCountry || 'Any country');
  const [selectedLanguage, setSelectedLanguage] = useState(userProfile?.meetLanguage || 'Choose...');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(userProfile?.meetGoals || ['Postal Pen Pals', 'Language practice']);
  const [onlyMatchingCanContact, setOnlyMatchingCanContact] = useState(userProfile?.onlyMatchingCanContact ?? true);

  // Auto-save state
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>('');

  // Pickers state
  const [showCurrentCityPicker, setShowCurrentCityPicker] = useState(false);
  const [showHomeCityPicker, setShowHomeCityPicker] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showEducationPicker, setShowEducationPicker] = useState(false);
  const [showRelationshipPicker, setShowRelationshipPicker] = useState(false);
  const [showSpokenLanguagesPicker, setShowSpokenLanguagesPicker] = useState(false);
  const [showLearningLanguagesPicker, setShowLearningLanguagesPicker] = useState(false);
  const [showInterestsPicker, setShowInterestsPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showGoalsPicker, setShowGoalsPicker] = useState(false);

  // Options
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = Array.from({ length: 61 }, (_, i) => String(2010 - i));
  const educationOptions = ['High School', 'Bachelor degree', 'Master degree', 'PhD', 'Other'];
  const relationshipOptions = ['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed'];
  const languageOptions = ['Choose...', 'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'];
  const goals = ['Postal Pen Pals', 'Language practice', 'Travel buddies', 'Cultural exchange', 'Friendship', 'Dating', 'Business networking'];
  const availableInterests = [
    'Coldplay', 'Software Development', 'Photography', 'Travel', 'Cooking', 'Reading', 'Music', 'Movies',
    'Sports', 'Gaming', 'Art', 'Writing', 'Dancing', 'Fitness', 'Yoga', 'Meditation', 'Technology',
    'Science', 'History', 'Philosophy', 'Nature', 'Animals', 'Fashion', 'Design', 'Programming',
    'Web Development', 'Mobile Apps', 'AI', 'Machine Learning', 'Blockchain', 'Cryptocurrency', 'Startups', 'Entrepreneurship',
  ];

  // Auto-save function with debouncing
  const autoSave = useCallback(async () => {
    if (!currentUser) return;

    // Create a snapshot of current data for comparison
    const currentData = JSON.stringify({
      firstName, username, currentCity, homeCity, selectedSex,
      selectedDay, selectedMonth, selectedYear, education, occupation,
      relationship, spokenLanguages, learningLanguages, phoneNumber,
      about, requests, interests, music, books, movies, quotes,
      meetSex, ageMin, ageMax, selectedCountry, selectedLanguage,
      selectedGoals, onlyMatchingCanContact,
    });

    // Don't save if nothing changed
    if (currentData === lastSavedRef.current) return;

    setSaveStatus('saving');

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
        about: about.trim() || undefined,
        requests: requests.trim() || undefined,
        interests,
        music: music.trim() || undefined,
        books: books.trim() || undefined,
        movies: movies.trim() || undefined,
        quotes: quotes.trim() || undefined,
        meetSex,
        ageMin,
        ageMax,
        meetCountry: selectedCountry !== 'Any country' ? selectedCountry : undefined,
        meetLanguage: selectedLanguage !== 'Choose...' ? selectedLanguage : undefined,
        meetGoals: selectedGoals,
        onlyMatchingCanContact,
      };

      if (userProfile) {
        await updateUserProfile(currentUser.uid, profileData);
      } else {
        await createUserProfile(currentUser.uid, profileData);
        // Clear signup data after first save
        localStorage.removeItem('signupData');
      }

      lastSavedRef.current = currentData;
      setSaveStatus('saved');
      await refreshUserProfile();

      // Reset saved status after 2 seconds
      setTimeout(() => {
        setSaveStatus((prev) => prev === 'saved' ? 'idle' : prev);
      }, 2000);
    } catch (error: any) {
      console.error('Error auto-saving profile:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }, [
    currentUser, userProfile, firstName, username, currentCity, homeCity, selectedSex,
    selectedDay, selectedMonth, selectedYear, education, occupation, relationship,
    spokenLanguages, learningLanguages, phoneNumber, about, requests, interests,
    music, books, movies, quotes, meetSex, ageMin, ageMax, selectedCountry,
    selectedLanguage, selectedGoals, onlyMatchingCanContact, signupData, refreshUserProfile
  ]);

  // Track if this is the initial load
  const isInitialLoad = useRef(true);

  // Debounced auto-save effect
  useEffect(() => {
    // Skip auto-save on initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      // Set initial saved state
      lastSavedRef.current = JSON.stringify({
        firstName, username, currentCity, homeCity, selectedSex,
        selectedDay, selectedMonth, selectedYear, education, occupation,
        relationship, spokenLanguages, learningLanguages, phoneNumber,
        about, requests, interests, music, books, movies, quotes,
        meetSex, ageMin, ageMax, selectedCountry, selectedLanguage,
        selectedGoals, onlyMatchingCanContact,
      });
      return;
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Don't auto-save if no user
    if (!currentUser) return;

    // Set new timeout for auto-save (1.5 seconds after last change)
    saveTimeoutRef.current = setTimeout(() => {
      autoSave();
    }, 1500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    firstName, username, currentCity, homeCity, selectedSex,
    selectedDay, selectedMonth, selectedYear, education, occupation,
    relationship, spokenLanguages, learningLanguages, phoneNumber,
    about, requests, interests, music, books, movies, quotes,
    meetSex, ageMin, ageMax, selectedCountry, selectedLanguage,
    selectedGoals, onlyMatchingCanContact, autoSave, currentUser
  ]);

  // Update fields when userProfile loads
  useEffect(() => {
    if (userProfile) {
      if (!firstName && userProfile.firstName) setFirstName(userProfile.firstName);
      if (!username && userProfile.username) setUsername(userProfile.username);
      if (!currentCity && userProfile.currentCity) setCurrentCity(userProfile.currentCity);
      if (!homeCity && userProfile.homeCity) setHomeCity(userProfile.homeCity);
      if (userProfile.sex) setSelectedSex(userProfile.sex);
      if (userProfile.birthday) {
        setSelectedDay(userProfile.birthday.day || '12');
        setSelectedMonth(userProfile.birthday.month || 'Mar');
        setSelectedYear(userProfile.birthday.year || '1995');
      }
      if (userProfile.education) setEducation(userProfile.education);
      if (userProfile.occupation) setOccupation(userProfile.occupation);
      if (userProfile.relationship) setRelationship(userProfile.relationship);
      if (userProfile.spokenLanguages) setSpokenLanguages(userProfile.spokenLanguages);
      if (userProfile.learningLanguages) setLearningLanguages(userProfile.learningLanguages);
      if (userProfile.phoneNumber) setPhoneNumber(userProfile.phoneNumber);
      if (userProfile.about) setAbout(userProfile.about);
      if (userProfile.requests) setRequests(userProfile.requests);
      if (userProfile.interests) setInterests(userProfile.interests);
      if (userProfile.music) setMusic(userProfile.music);
      if (userProfile.books) setBooks(userProfile.books);
      if (userProfile.movies) setMovies(userProfile.movies);
      if (userProfile.quotes) setQuotes(userProfile.quotes);
      if (userProfile.meetSex) setMeetSex(userProfile.meetSex);
      if (userProfile.ageMin) setAgeMin(userProfile.ageMin);
      if (userProfile.ageMax) setAgeMax(userProfile.ageMax);
      if (userProfile.meetCountry) setSelectedCountry(userProfile.meetCountry);
      if (userProfile.meetLanguage) setSelectedLanguage(userProfile.meetLanguage);
      if (userProfile.meetGoals) setSelectedGoals(userProfile.meetGoals);
      if (userProfile.onlyMatchingCanContact !== undefined) {
        setOnlyMatchingCanContact(userProfile.onlyMatchingCanContact);
      }
    }
  }, [userProfile]);

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className="w-4 h-4 border-2 border-orange border-t-transparent rounded-full animate-spin" />
        );
      case 'saved':
        return (
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Error saving';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-[60px] pb-24">
      <div className="max-w-content md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-screen-padding md:px-6 lg:px-8">
        {/* Navigation Bar with Save Status */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="text-orange hover:opacity-80 transition-opacity active:opacity-70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-text-primary">Edit profile</h1>
          <div className="flex items-center gap-2">
            {getSaveStatusIcon()}
            {saveStatus !== 'idle' && (
              <span className={`text-xs ${
                saveStatus === 'saved' ? 'text-green-500' :
                saveStatus === 'error' ? 'text-red-500' :
                'text-orange'
              }`}>
                {getSaveStatusText()}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-6 pb-10">
          {/* Basic Info Card */}
          <ProfileCard title="Basic Info" icon="text.justify.left">
            <div className="space-y-4">
              <FormField label="First name" value={firstName} onChange={setFirstName} />
              <FormField label="Username" value={username} onChange={setUsername} />
              <FormField label="Phone Number" value={phoneNumber} onChange={setPhoneNumber} />
              
              <FormDropdownField
                label="Select your current city"
                value={currentCity}
                onClick={() => setShowCurrentCityPicker(true)}
              />
              <FormDropdownField
                label="Select your home city"
                value={homeCity}
                onClick={() => setShowHomeCityPicker(true)}
              />

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">Sex</h3>
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

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">Birthday</h3>
                <div className="flex gap-3">
                  <FormDropdownField label="" value={selectedDay} onClick={() => setShowDayPicker(true)} compact />
                  <FormDropdownField label="" value={selectedMonth} onClick={() => setShowMonthPicker(true)} compact />
                  <FormDropdownField label="" value={selectedYear} onClick={() => setShowYearPicker(true)} compact />
                </div>
              </div>

              <FormDropdownField
                label="Education details"
                value={education}
                onClick={() => setShowEducationPicker(true)}
              />
              <FormField label="Occupation" value={occupation} onChange={setOccupation} />
              <FormDropdownField
                label="Relationship"
                value={relationship}
                onClick={() => setShowRelationshipPicker(true)}
              />

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">I speak</h3>
                <LanguageTagsContainer
                  languages={spokenLanguages}
                  onAdd={() => setShowSpokenLanguagesPicker(true)}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">I am learning</h3>
                <LanguageTagsContainer
                  languages={learningLanguages}
                  onAdd={() => setShowLearningLanguagesPicker(true)}
                />
              </div>
            </div>
          </ProfileCard>

          {/* Interests Card */}
          <ProfileCard title="Interests" icon="star.fill">
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">About</h3>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full min-h-[100px] bg-surface-dark rounded-card p-4 text-input text-text-primary outline-none resize-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">Requests</h3>
                <input
                  type="text"
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  className="w-full bg-surface-dark rounded-card px-5 py-4 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
                  placeholder="What are you looking for?"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">Interests</h3>
                <InterestTagsContainer
                  interests={interests}
                  onAdd={() => setShowInterestsPicker(true)}
                />
              </div>

              <FormField label="Music" value={music} onChange={setMusic} />
              <FormField label="Books" value={books} onChange={setBooks} />
              <FormField label="Movies" value={movies} onChange={setMovies} />
              <FormField label="Quotes" value={quotes} onChange={setQuotes} />
            </div>
          </ProfileCard>

          {/* I Want to Meet Card */}
          <ProfileCard title="I want to meet" icon="magnifyingglass">
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">Sex</h3>
                <div className="flex gap-3">
                  <SexButton
                    symbol="♂"
                    title="Male"
                    isSelected={meetSex === 'Male'}
                    onClick={() => setMeetSex('Male')}
                  />
                  <SexButton
                    symbol="♀"
                    title="Female"
                    isSelected={meetSex === 'Female'}
                    onClick={() => setMeetSex('Female')}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-text-primary">Age</h3>
                  <span className="text-base text-text-secondary">{ageMin} - {ageMax}</span>
                </div>
                <AgeRangeSlider
                  ageMin={ageMin}
                  ageMax={ageMax}
                  onAgeMinChange={setAgeMin}
                  onAgeMaxChange={setAgeMax}
                />
              </div>

              <FormDropdownField
                label="Countries"
                value={selectedCountry}
                onClick={() => setShowCountryPicker(true)}
              />
              <FormDropdownField
                label="Speakers of"
                value={selectedLanguage}
                onClick={() => setShowLanguagePicker(true)}
              />

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-text-primary">Goals</h3>
                <GoalTagsContainer
                  goals={selectedGoals}
                  onAdd={() => setShowGoalsPicker(true)}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
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
            </div>
          </ProfileCard>
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
      <PickerSheetView title="Day" items={days} selectedItem={selectedDay} isPresented={showDayPicker} onSelect={setSelectedDay} onClose={() => setShowDayPicker(false)} />
      <PickerSheetView title="Month" items={months} selectedItem={selectedMonth} isPresented={showMonthPicker} onSelect={setSelectedMonth} onClose={() => setShowMonthPicker(false)} />
      <PickerSheetView title="Year" items={years} selectedItem={selectedYear} isPresented={showYearPicker} onSelect={setSelectedYear} onClose={() => setShowYearPicker(false)} />
      <PickerSheetView title="Education" items={educationOptions} selectedItem={education} isPresented={showEducationPicker} onSelect={setEducation} onClose={() => setShowEducationPicker(false)} />
      <PickerSheetView title="Relationship" items={relationshipOptions} selectedItem={relationship} isPresented={showRelationshipPicker} onSelect={setRelationship} onClose={() => setShowRelationshipPicker(false)} />
      <MultiLanguageSelectionView selectedLanguages={spokenLanguages} isPresented={showSpokenLanguagesPicker} onSelect={setSpokenLanguages} onClose={() => setShowSpokenLanguagesPicker(false)} />
      <MultiLanguageSelectionView selectedLanguages={learningLanguages} isPresented={showLearningLanguagesPicker} onSelect={setLearningLanguages} onClose={() => setShowLearningLanguagesPicker(false)} />
      <MultiInterestSelectionView availableInterests={availableInterests} selectedInterests={interests} isPresented={showInterestsPicker} onSelect={setInterests} onClose={() => setShowInterestsPicker(false)} />
      <PickerSheetView title="Countries" items={['Any country', ...countries]} selectedItem={selectedCountry} isPresented={showCountryPicker} onSelect={setSelectedCountry} onClose={() => setShowCountryPicker(false)} />
      <PickerSheetView title="Language" items={languageOptions} selectedItem={selectedLanguage} isPresented={showLanguagePicker} onSelect={setSelectedLanguage} onClose={() => setShowLanguagePicker(false)} />
      <MultiGoalSelectionView goals={goals} selectedGoals={selectedGoals} isPresented={showGoalsPicker} onSelect={setSelectedGoals} onClose={() => setShowGoalsPicker(false)} />
    </div>
  );
};

// Profile Card Component
interface ProfileCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, icon, children }) => {
  const getIcon = () => {
    if (icon === 'text.justify.left') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    } else if (icon === 'star.fill') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    } else if (icon === 'magnifyingglass') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface-dark rounded-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-dark-bg rounded-xl flex items-center justify-center text-orange">
          {getIcon()}
        </div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      </div>
      {children}
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
        className="w-full bg-dark-bg rounded-card px-5 py-4 text-input text-text-primary outline-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
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

const FormDropdownField: React.FC<FormDropdownFieldProps> = ({ label, value, onClick, compact = false }) => {
  return (
    <div className={`${compact ? 'flex-1' : ''} space-y-3`}>
      {label && <label className="text-base font-semibold text-text-primary">{label}</label>}
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-5 py-4 bg-dark-bg rounded-card hover:opacity-90 transition-opacity active:opacity-75 ${compact ? 'px-4' : ''}`}
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
        isSelected ? 'bg-orange' : 'bg-dark-bg'
      }`}
    >
      <span className="text-lg">{symbol}</span>
      <span className="text-base font-medium text-text-primary">{title}</span>
    </button>
  );
};

// Language Tags Container
interface LanguageTagsContainerProps {
  languages: string[];
  onAdd: () => void;
}

const LanguageTagsContainer: React.FC<LanguageTagsContainerProps> = ({ languages, onAdd }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap px-5 py-4 bg-dark-bg rounded-card">
      {languages.map((language) => (
        <div key={language} className="px-3 py-2 bg-orange rounded-full">
          <span className="text-sm font-medium text-text-primary">{language}</span>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="ml-auto text-text-faded hover:text-text-primary transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

// Interest Tags Container
interface InterestTagsContainerProps {
  interests: string[];
  onAdd: () => void;
}

const InterestTagsContainer: React.FC<InterestTagsContainerProps> = ({ interests, onAdd }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap px-5 py-4 bg-dark-bg rounded-card">
      {interests.map((interest) => (
        <div key={interest} className="px-3 py-2 bg-orange rounded-full">
          <span className="text-sm font-medium text-text-primary">{interest}</span>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="ml-auto text-text-faded hover:text-text-primary transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

// Goal Tags Container
interface GoalTagsContainerProps {
  goals: string[];
  onAdd: () => void;
}

const GoalTagsContainer: React.FC<GoalTagsContainerProps> = ({ goals, onAdd }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {goals.slice(0, 3).map((goal) => (
        <div key={goal} className="px-3 py-2 bg-orange rounded-full">
          <span className="text-sm font-medium text-text-primary">{goal}</span>
        </div>
      ))}
      {goals.length > 3 && (
        <div className="px-3 py-2 bg-orange rounded-full">
          <span className="text-sm font-medium text-text-primary">{goals.length - 3}+</span>
        </div>
      )}
      <button
        onClick={onAdd}
        className="ml-auto text-text-faded hover:text-text-primary transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

// Age Range Slider Component
interface AgeRangeSliderProps {
  ageMin: number;
  ageMax: number;
  onAgeMinChange: (age: number) => void;
  onAgeMaxChange: (age: number) => void;
}

const AgeRangeSlider: React.FC<AgeRangeSliderProps> = ({ ageMin, ageMax, onAgeMinChange, onAgeMaxChange }) => {
  const ageRange = ageMax - ageMin;
  const ageRangePercent = (ageRange / 50) * 100;
  const ageMinPercent = ((ageMin - 16) / 50) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-text-faded">
        <span>{ageMin}</span>
        <span>{ageMax}</span>
      </div>
      <div className="relative h-8">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-dark rounded-sm -translate-y-1/2" />
        <div
          className="absolute top-1/2 h-1 bg-orange rounded-sm -translate-y-1/2"
          style={{
            left: `${ageMinPercent}%`,
            width: `${ageRangePercent}%`,
          }}
        />
        <input
          type="range"
          min="16"
          max="66"
          value={ageMin}
          onChange={(e) => {
            const newMin = parseInt(e.target.value);
            if (newMin < ageMax) onAgeMinChange(newMin);
          }}
          className="absolute top-1/2 left-0 w-full h-1 opacity-0 cursor-pointer -translate-y-1/2 z-10"
        />
        <input
          type="range"
          min="16"
          max="66"
          value={ageMax}
          onChange={(e) => {
            const newMax = parseInt(e.target.value);
            if (newMax > ageMin) onAgeMaxChange(newMax);
          }}
          className="absolute top-1/2 left-0 w-full h-1 opacity-0 cursor-pointer -translate-y-1/2 z-10"
        />
      </div>
    </div>
  );
};

// Multi Interest Selection View (from InterestsView)
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

// Multi Goal Selection View (from IWantToMeetView)
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

// Import countries for the picker
const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'Italy', 'Spain', 'Netherlands', 'India', 'Japan', 'China', 'Brazil', 'Mexico',
  'Russia', 'South Korea', 'Indonesia', 'Turkey', 'Saudi Arabia', 'Argentina',
];
