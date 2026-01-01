import { useRef, useEffect, useState } from 'react';
import { COUNTRIES } from '../lib/countries';
import { useI18n } from '../i18n/I18nProvider';
import { detectUserCountry } from '../lib/geolocation';

const COUNTRY_STORAGE_KEY = 'spirolink_country';

export function CountrySelector() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    return localStorage.getItem(COUNTRY_STORAGE_KEY) || 'IN';
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCountryName = COUNTRIES.find(c => c.code === selectedCountry)?.name || 'India';

  // Detect user's location on component mount
  useEffect(() => {
    const detectLocation = async () => {
      setIsLoadingLocation(true);
      try {
        // Check if user has already set a preference
        const storedCountry = localStorage.getItem(COUNTRY_STORAGE_KEY);
        if (!storedCountry) {
          // No stored preference, try to detect location
          const detectedCountry = await detectUserCountry();
          if (detectedCountry && COUNTRIES.find(c => c.code === detectedCountry)) {
            setSelectedCountry(detectedCountry);
            localStorage.setItem(COUNTRY_STORAGE_KEY, detectedCountry);
          }
        }
      } catch (error) {
        console.warn('Location detection failed:', error);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    detectLocation();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    localStorage.setItem(COUNTRY_STORAGE_KEY, countryCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex text-white text-sm font-medium hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 px-3 py-2 rounded"
        aria-label={`${t('country')}: ${selectedCountryName} ${isLoadingLocation ? '(Detecting...)' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isLoadingLocation}
      >
        {isLoadingLocation ? '🌍' : selectedCountry}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-40"
          role="listbox"
        >
          {/* Search Input */}
          <div className="p-3 border-b border-gray-700">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t('selectCountry')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm"
              aria-label="Search countries"
            />
          </div>

          {/* Country List */}
          <ul className="max-h-64 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <li key={country.code}>
                  <button
                    onClick={() => handleCountrySelect(country.code)}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-800 transition-colors flex justify-between items-center ${
                      selectedCountry === country.code
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-200'
                    }`}
                    role="option"
                    aria-selected={selectedCountry === country.code}
                  >
                    <span>{country.name}</span>
                    <span className="text-xs opacity-70">{country.code}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-400 text-sm text-center">
                No countries found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
