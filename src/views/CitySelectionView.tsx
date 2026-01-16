import React, { useState } from 'react';

interface CitySelectionViewProps {
  selectedCity: string;
  isPresented: boolean;
  onSelect: (city: string) => void;
  onClose: () => void;
}

const cities = [
  'Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Hyderabad, India',
  'Ahmedabad, India', 'Chennai, India', 'Kolkata, India', 'Pune, India',
  'Jaipur, India', 'Surat, India', 'Lucknow, India', 'Kanpur, India',
  'Nagpur, India', 'Indore, India', 'Thane, India', 'Bhopal, India',
  'Visakhapatnam, India', 'Patna, India', 'Vadodara, India', 'Ghaziabad, India',
  'New York, USA', 'Los Angeles, USA', 'Chicago, USA', 'Houston, USA',
  'Phoenix, USA', 'Philadelphia, USA', 'San Antonio, USA', 'San Diego, USA',
  'Dallas, USA', 'San Jose, USA', 'London, UK', 'Manchester, UK',
  'Birmingham, UK', 'Glasgow, UK', 'Liverpool, UK', 'Leeds, UK',
  'Paris, France', 'Lyon, France', 'Marseille, France', 'Toulouse, France',
  'Berlin, Germany', 'Munich, Germany', 'Hamburg, Germany', 'Frankfurt, Germany',
  'Tokyo, Japan', 'Osaka, Japan', 'Yokohama, Japan', 'Nagoya, Japan',
  'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia', 'Perth, Australia',
  'Toronto, Canada', 'Vancouver, Canada', 'Montreal, Canada', 'Calgary, Canada',
  'São Paulo, Brazil', 'Rio de Janeiro, Brazil', 'Brasília, Brazil', 'Salvador, Brazil',
  'Mexico City, Mexico', 'Guadalajara, Mexico', 'Monterrey, Mexico', 'Puebla, Mexico',
  'Buenos Aires, Argentina', 'Córdoba, Argentina', 'Rosario, Argentina', 'Mendoza, Argentina',
  'Moscow, Russia', 'Saint Petersburg, Russia', 'Novosibirsk, Russia', 'Yekaterinburg, Russia',
  'Istanbul, Turkey', 'Ankara, Turkey', 'Izmir, Turkey', 'Bursa, Turkey',
  'Cairo, Egypt', 'Alexandria, Egypt', 'Giza, Egypt', 'Shubra El Kheima, Egypt',
  'Jakarta, Indonesia', 'Surabaya, Indonesia', 'Bandung, Indonesia', 'Medan, Indonesia',
  'Bangkok, Thailand', 'Chiang Mai, Thailand', 'Pattaya, Thailand', 'Phuket, Thailand',
  'Seoul, South Korea', 'Busan, South Korea', 'Incheon, South Korea', 'Daegu, South Korea',
  'Beijing, China', 'Shanghai, China', 'Guangzhou, China', 'Shenzhen, China',
  'Dubai, UAE', 'Abu Dhabi, UAE', 'Sharjah, UAE', 'Al Ain, UAE',
  'Singapore', 'Kuala Lumpur, Malaysia', 'Manila, Philippines',
];

export const CitySelectionView: React.FC<CitySelectionViewProps> = ({
  selectedCity,
  isPresented,
  onSelect,
  onClose,
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredCities = searchText
    ? cities.filter((city) =>
        city.toLowerCase().includes(searchText.toLowerCase())
      )
    : cities;

  const handleSelect = (city: string) => {
    onSelect(city);
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
          <h2 className="text-xl font-bold text-text-primary">Select City</h2>
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
            {filteredCities.map((city, index) => (
              <div key={city}>
                <button
                  onClick={() => handleSelect(city)}
                  className="w-full flex items-center justify-between px-screen-padding py-3.5 hover:bg-white/5 transition-colors"
                >
                  <span className="text-[17px] font-normal text-text-primary">{city}</span>
                  {selectedCity === city && (
                    <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
                {index < filteredCities.length - 1 && (
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
