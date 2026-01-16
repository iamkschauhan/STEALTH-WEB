import React, { useState, useEffect } from 'react';

interface CountrySelectionViewProps {
  selectedCountry: string;
  isPresented: boolean;
  onSelect: (country: string) => void;
  onClose: () => void;
}

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
  'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
  'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China',
  'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus',
  'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
  'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia',
  'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
  'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
  'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali',
  'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
  'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
  'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea',
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
  'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
  'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
  'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
];

export const CountrySelectionView: React.FC<CountrySelectionViewProps> = ({
  selectedCountry,
  isPresented,
  onSelect,
  onClose,
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredCountries = searchText
    ? countries.filter((country) =>
        country.toLowerCase().includes(searchText.toLowerCase())
      )
    : countries;

  const handleSelect = (country: string) => {
    onSelect(country);
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
          <h2 className="text-xl font-bold text-text-primary">Country</h2>
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
            {filteredCountries.map((country, index) => (
              <div key={country}>
                <button
                  onClick={() => handleSelect(country)}
                  className="w-full flex items-center justify-between px-screen-padding py-3.5 hover:bg-white/5 transition-colors"
                >
                  <span className="text-[17px] font-normal text-text-primary">{country}</span>
                  {selectedCountry === country && (
                    <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
                {index < filteredCountries.length - 1 && (
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
