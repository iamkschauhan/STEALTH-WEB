import React, { useState, useEffect } from 'react';

interface MultiLanguageSelectionViewProps {
  selectedLanguages: string[];
  isPresented: boolean;
  onSelect: (languages: string[]) => void;
  onClose: () => void;
}

const languages = [
  'Abkhazian', 'Afar', 'Afrikaans', 'Akan', 'Amharic', 'Arabic', 'Assamese',
  'Awadhi', 'Aymara', 'Azerbaijani', 'Bhojpuri', 'Maithili', 'Bashkir',
  'Balochi', 'Belarussian', 'Bihari', 'Bislama', 'Bosnian', 'Breton',
  'Bulgarian', 'Burmese', 'Catalan', 'Cebuano', 'Chewa', 'Chinese',
  'Corsican', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English',
  'Esperanto', 'Estonian', 'Ewe', 'Filipino', 'Finnish', 'French',
  'Galician', 'Georgian', 'German', 'Greek', 'Gujarati', 'Haitian Creole',
  'Hausa', 'Hawaiian', 'Hebrew', 'Hindi', 'Hmong', 'Hungarian', 'Icelandic',
  'Igbo', 'Indonesian', 'Irish', 'Italian', 'Japanese', 'Javanese',
  'Kannada', 'Kazakh', 'Khmer', 'Kinyarwanda', 'Korean', 'Kurdish',
  'Kyrgyz', 'Lao', 'Latin', 'Latvian', 'Lithuanian', 'Luxembourgish',
  'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Maori',
  'Marathi', 'Mongolian', 'Nepali', 'Norwegian', 'Nyanja', 'Odia',
  'Pashto', 'Persian', 'Polish', 'Portuguese', 'Punjabi', 'Romanian',
  'Russian', 'Samoan', 'Scots Gaelic', 'Serbian', 'Sesotho', 'Shona',
  'Sindhi', 'Sinhala', 'Slovak', 'Slovenian', 'Somali', 'Spanish',
  'Sundanese', 'Swahili', 'Swedish', 'Tajik', 'Tamil', 'Tatar',
  'Telugu', 'Thai', 'Turkish', 'Turkmen', 'Ukrainian', 'Urdu',
  'Uyghur', 'Uzbek', 'Vietnamese', 'Welsh', 'Xhosa', 'Yiddish',
  'Yoruba', 'Zulu',
];

export const MultiLanguageSelectionView: React.FC<MultiLanguageSelectionViewProps> = ({
  selectedLanguages,
  isPresented,
  onSelect,
  onClose,
}) => {
  const [searchText, setSearchText] = useState('');
  const [localSelected, setLocalSelected] = useState<string[]>(selectedLanguages);

  useEffect(() => {
    setLocalSelected(selectedLanguages);
  }, [selectedLanguages, isPresented]);

  const filteredLanguages = searchText
    ? languages.filter((lang) =>
        lang.toLowerCase().includes(searchText.toLowerCase())
      )
    : languages;

  const handleToggleLanguage = (language: string) => {
    const newSelected = localSelected.includes(language)
      ? localSelected.filter((l) => l !== language)
      : [...localSelected, language];
    setLocalSelected(newSelected);
    onSelect(newSelected);
  };

  if (!isPresented) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[50] transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-dark-bg rounded-t-[24px] shadow-2xl max-h-[80vh] flex flex-col animate-slide-up">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-5">
          <div className="w-9 h-1 bg-white/30 rounded-full" />
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between px-screen-padding pb-5">
          <h2 className="text-xl font-bold text-text-primary">Select Languages</h2>
          <button
            onClick={onClose}
            className="text-text-icon hover:text-text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.64c.39.39.39 1.02 0 1.41L13.41 12l3.23 3.23c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 13.41l-3.23 3.23c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.36 8.77c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l3.23-3.23c.39-.39 1.02-.39 1.41 0z" />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <div className="px-screen-padding mb-6">
          <div className="flex items-center gap-3 bg-surface-dark rounded-pill px-4 py-3.5">
            <svg className="w-4 h-4 text-text-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 bg-transparent text-text-primary text-base font-normal outline-none placeholder:text-text-faded"
            />
            {searchText && (
              <button
                onClick={() => setSearchText('')}
                className="text-text-icon"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.64c.39.39.39 1.02 0 1.41L13.41 12l3.23 3.23c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 13.41l-3.23 3.23c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.36 8.77c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l3.23-3.23c.39-.39 1.02-.39 1.41 0z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Language list */}
        <div className="flex-1 overflow-y-auto pb-5">
          <div className="space-y-0">
            {filteredLanguages.map((language, index) => (
              <div key={language}>
                <button
                  onClick={() => handleToggleLanguage(language)}
                  className="w-full flex items-center justify-between px-screen-padding py-3.5 hover:bg-white/5 transition-colors"
                >
                  <span className="text-[17px] font-normal text-text-primary">
                    {language}
                  </span>
                  {localSelected.includes(language) && (
                    <svg
                      className="w-4 h-4 text-orange"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
                {index < filteredLanguages.length - 1 && (
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
