import { useRef, useEffect, useState } from 'react';
import { COUNTRIES } from '../lib/countries';
import { useI18n } from '../i18n/I18nProvider';
import { detectUserCountry } from '../lib/geolocation';

const COUNTRY_STORAGE_KEY = 'nodalwire_country';

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
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const selectedCountryName = COUNTRIES.find(c => c.code === selectedCountry)?.name || 'India';

  // Detect user's location on component mount
  useEffect(() => {
    const detectLocation = async () => {
      setIsLoadingLocation(true);
      try {
        const storedCountry = localStorage.getItem(COUNTRY_STORAGE_KEY);
        
        // Always try to detect location, but prefer stored if available
        const detectedCountry = await detectUserCountry();
        
        if (detectedCountry && COUNTRIES.find(c => c.code === detectedCountry)) {
          // If no stored preference, or detection works, use detected country
          if (!storedCountry) {
            setSelectedCountry(detectedCountry);
            localStorage.setItem(COUNTRY_STORAGE_KEY, detectedCountry);
            console.log('Auto-detected country:', detectedCountry);
          }
        } else if (!storedCountry) {
          // Detection failed and no stored preference, keep default 'IN'
          console.log('Country detection failed, using default: IN');
        }
      } catch (error) {
        console.warn('Location detection error:', error);
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

  // Handle mouse enter (hover)
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  // Handle mouse leave (hover out)
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Small delay to allow mouse movement to dropdown
  };

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
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex text-gray-700 text-sm font-semibold hover:text-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 px-3 py-2 rounded items-center gap-1 hover:bg-gray-100"
        aria-label={`${t('country')}: ${selectedCountryName} ${isLoadingLocation ? '(Detecting...)' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isLoadingLocation}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h3a2 2 0 002-2v-1a2 2 0 012-2h2.049M8 7a4 4 0 100 8 4 4 0 000-8zM12.574 15.5a6 6 0 01-5.49.495m10.848 1.988A9 9 0 1112 3m6.574 12.5a6 6 0 01-5.49.495"
          />
        </svg>
        {isLoadingLocation ? '🌍' : selectedCountry}
        <span className="text-xs hidden sm:inline text-gray-600">({selectedCountryName})</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-40 top-full"
          role="listbox"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Search Input */}
          <div className="p-3 border-b border-gray-300">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t('selectCountry')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-white text-gray-900 rounded border border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm"
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
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors flex justify-between items-center ${
                      selectedCountry === country.code
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-700'
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
              <li className="px-4 py-3 text-gray-500 text-sm text-center">
                No countries found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
