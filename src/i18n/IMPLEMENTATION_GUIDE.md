/**
 * i18n IMPLEMENTATION GUIDE
 * 
 * This guide shows how to use the internationalization (i18n) system throughout the app.
 */

// ============================================================================
// 1. BASIC USAGE IN COMPONENTS
// ============================================================================

// In any React component, import and use the hook:
import { useI18n } from '../i18n/I18nProvider';

export function MyComponent() {
  const { t, language, setLanguage } = useI18n();

  return (
    <div>
      {/* Get translated text using the key */}
      <h1>{t('home')}</h1>
      <p>{t('selectLanguage')}</p>

      {/* Current language is always available */}
      <p>Current language: {language}</p>

      {/* You can programmatically change language */}
      <button onClick={() => setLanguage('es')}>Switch to Spanish</button>
    </div>
  );
}

// ============================================================================
// 2. ADDING NEW TRANSLATIONS
// ============================================================================

// Add new keys to src/i18n/translations.ts

export const translations = {
  en: {
    // ... existing keys ...
    myNewKey: 'Your English text here',
  },
  hi: {
    // ... existing keys ...
    myNewKey: 'आपका हिंदी पाठ यहाँ',
  },
  es: {
    // ... existing keys ...
    myNewKey: 'Su texto en español aquí',
  },
  // ... other languages ...
};

// ============================================================================
// 3. ACCESSING COUNTRY INFORMATION
// ============================================================================

// To get the selected country in a component:
import { useState, useEffect } from 'react';

export function CountryAwareComponent() {
  const [country, setCountry] = useState<string>('IN');

  useEffect(() => {
    // Get from localStorage whenever it changes
    const stored = localStorage.getItem('nodalwire_country');
    if (stored) setCountry(stored);

    // Listen for storage changes (for multi-tab support)
    const handleStorage = () => {
      const updated = localStorage.getItem('nodalwire_country');
      if (updated) setCountry(updated);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return <div>Selected country: {country}</div>;
}

// Or import the utility function:
import { getCountryName } from '../lib/countries';

const countryName = getCountryName('IN'); // Returns 'India'

// ============================================================================
// 4. COMBINING LANGUAGE + COUNTRY
// ============================================================================

export function GlobalAwareComponent() {
  const { t, language } = useI18n();
  const [country, setCountry] = useState('IN');

  useEffect(() => {
    const stored = localStorage.getItem('nodalwire_country');
    if (stored) setCountry(stored);
  }, []);

  return (
    <div>
      <h1>{t('home')}</h1>
      <p>Language: {language}, Country: {country}</p>
      {/* Content can now adapt to both language and country */}
    </div>
  );
}

// ============================================================================
// 5. LOCALSTORAGE KEYS
// ============================================================================

const LANGUAGE_STORAGE_KEY = 'nodalwire_language'; // Set in I18nProvider.tsx
const COUNTRY_STORAGE_KEY = 'nodalwire_country';   // Set in CountrySelector.tsx

// These persist across page refreshes and browser sessions

// ============================================================================
// 6. SUPPORTED LANGUAGES
// ============================================================================

import { SUPPORTED_LANGUAGES } from '../i18n/I18nProvider';

// SUPPORTED_LANGUAGES is an array:
// [
//   { code: 'en', name: 'English' },
//   { code: 'hi', name: 'हिन्दी' },
//   { code: 'es', name: 'Español' },
//   { code: 'fr', name: 'Français' },
//   { code: 'ar', name: 'العربية' },
//   { code: 'de', name: 'Deutsch' },
// ]

SUPPORTED_LANGUAGES.forEach(lang => {
  console.log(`${lang.code}: ${lang.name}`);
});

// ============================================================================
// 7. RTL SUPPORT FOR ARABIC
// ============================================================================

// The system automatically sets document.documentElement.lang
// When Arabic is selected, you may want to add RTL styling:

export function RtlAwareComponent() {
  const { language } = useI18n();
  const isRtl = language === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Component content */}
    </div>
  );
}

// ============================================================================
// 8. AVAILABLE TRANSLATION KEYS
// ============================================================================

// From src/i18n/translations.ts:
// home, services, resources, contact, signIn, language, country,
// ponFtth, microwaveNetwork, opticalLongHaul, wifiNetwork,
// about, privacy, terms,
// selectLanguage, selectCountry

// To add more keys, simply add them to all language objects in translations.ts

// ============================================================================
// 9. BEST PRACTICES
// ============================================================================

// DO:
// ✓ Use useI18n() hook in components that need translations
// ✓ Add keys to translations.ts in ALL supported languages
// ✓ Use the t() function with correct key names
// ✓ Keep translation keys consistent and meaningful

// DON'T:
// ✗ Hardcode text strings in components (use translations instead)
// ✗ Add a key to only some languages (always add to all)
// ✗ Use complex HTML in translation strings (use components instead)
// ✗ Forget that translations are case-sensitive

// ============================================================================
// 10. ADDING A NEW LANGUAGE
// ============================================================================

// Step 1: Add translations to src/i18n/translations.ts
// Step 2: Add language to SUPPORTED_LANGUAGES array in I18nProvider.tsx
// Step 3: Make sure all keys are translated for the new language

// Example: Adding Portuguese (pt)
// 1. In translations.ts:
//    pt: {
//      home: 'Inicial',
//      services: 'Serviços',
//      // ... all other keys ...
//    }
// 2. In I18nProvider.tsx:
//    { code: 'pt', name: 'Português' },

// ============================================================================
