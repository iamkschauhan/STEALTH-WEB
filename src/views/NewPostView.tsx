import React, { useState } from 'react';
import { PickerSheetView } from '../components/PickerSheetView';

interface NewPostViewProps {
  onClose: () => void;
  onPost?: () => void;
}

export const NewPostView: React.FC<NewPostViewProps> = ({ onClose, onPost }) => {
  const [postText, setPostText] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState('Public');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showVisibilityPicker, setShowVisibilityPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const visibilityOptions = ['Public', 'Friends', 'Private'];
  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic',
    'Hindi', 'Turkish', 'Polish', 'Swedish', 'Norwegian', 'Danish',
    'Finnish', 'Greek', 'Czech', 'Romanian', 'Hungarian', 'Thai',
    'Vietnamese', 'Indonesian', 'Malay', 'Tagalog', 'Hebrew', 'Urdu',
  ];

  const handlePost = () => {
    if (postText.trim()) {
      // Handle post submission
      console.log('Posting:', { postText, selectedVisibility, selectedLanguage });
      if (onPost) {
        onPost();
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-dark-bg flex flex-col">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between px-screen-padding pt-[60px] pb-6">
        <button
          onClick={onClose}
          className="text-orange"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-lg font-semibold text-text-primary">New post</h1>

        <button
          onClick={handlePost}
          disabled={!postText.trim()}
          className={`${!postText.trim() ? 'text-text-faded' : 'text-orange'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>

      {/* Text input area */}
      <div className="flex-1 relative">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Enter text..."
          className="w-full h-full bg-transparent text-text-primary text-base font-normal px-6 py-6 outline-none resize-none placeholder:text-text-faded"
        />
      </div>

      {/* Bottom control bar */}
      <div className="flex items-center gap-3 px-screen-padding py-4 bg-dark-bg border-t border-white/10">
        {/* Visibility dropdown */}
        <button
          onClick={() => setShowVisibilityPicker(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-surface-dark rounded-full"
        >
          <span className="text-sm font-medium text-text-primary">{selectedVisibility}</span>
          <svg className="w-3 h-3 text-text-faded" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Language dropdown */}
        <button
          onClick={() => setShowLanguagePicker(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-surface-dark rounded-full"
        >
          <span className="text-sm font-medium text-text-primary">{selectedLanguage}</span>
          <svg className="w-3 h-3 text-text-faded" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="flex-1" />

        {/* Camera button */}
        <button
          onClick={() => {
            // Handle camera
            console.log('Camera clicked');
          }}
          className="w-11 h-11 rounded-full bg-surface-dark flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm6.5-6.5v-2c0-.83-.67-1.5-1.5-1.5h-3l-1.5-1.5H9L7.5 5.5H4.5c-.83 0-1.5.67-1.5 1.5v2H1v10h20V9h-2.5zm-1 0H4.5v-2h3l1.5 1.5h5l1.5-1.5h3v2z" />
          </svg>
        </button>

        {/* GIF button */}
        <button
          onClick={() => {
            // Handle GIF
            console.log('GIF clicked');
          }}
          className="px-4 py-2.5 text-sm font-semibold text-text-primary"
        >
          GIF
        </button>
      </div>

      {/* Visibility Picker Sheet */}
      <PickerSheetView
        title="Visibility"
        items={visibilityOptions}
        selectedItem={selectedVisibility}
        isPresented={showVisibilityPicker}
        onSelect={(item) => setSelectedVisibility(item)}
        onClose={() => setShowVisibilityPicker(false)}
      />

      {/* Language Picker Sheet */}
      <PickerSheetView
        title="Language"
        items={languageOptions}
        selectedItem={selectedLanguage}
        isPresented={showLanguagePicker}
        onSelect={(item) => setSelectedLanguage(item)}
        onClose={() => setShowLanguagePicker(false)}
      />
    </div>
  );
};
