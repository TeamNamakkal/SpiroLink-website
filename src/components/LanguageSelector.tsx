import { useRef, useEffect, useState } from 'react';
import { useI18n, SUPPORTED_LANGUAGES } from '../i18n/I18nProvider';

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLanguageName = SUPPORTED_LANGUAGES.find(
    (lang) => lang.code === language
  )?.name || 'English';

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

  const handleLanguageSelect = (langCode: typeof language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex text-white text-sm font-medium hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 px-3 py-2 rounded items-center gap-1"
        aria-label={`${t('language')}: ${currentLanguageName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {currentLanguageName}
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-40"
          role="listbox"
        >
          <ul>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-800 transition-colors ${
                    language === lang.code
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-200'
                  }`}
                  role="option"
                  aria-selected={language === lang.code}
                >
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
