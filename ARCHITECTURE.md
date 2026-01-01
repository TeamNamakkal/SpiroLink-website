# Architecture Overview

## Component Hierarchy

```
App
├── I18nProvider (wraps everything)
│   └── BrowserRouter
│       ├── Header
│       │   ├── Logo
│       │   ├── Navigation Menu
│       │   │   └── Uses t() from useI18n()
│       │   └── Right Actions
│       │       ├── LanguageSelector
│       │       │   └── Sets localStorage['spirolink_language']
│       │       ├── CountrySelector
│       │       │   └── Sets localStorage['spirolink_country']
│       │       └── Sign In Button
│       ├── Main Content (Routes)
│       │   └── Pages (can use useI18n() hook)
│       └── Footer
```

## Data Flow

### Language Selection Flow
```
User selects language
        ↓
LanguageSelector.tsx (onClick)
        ↓
setLanguage() from useI18n()
        ↓
I18nProvider updates state
        ↓
localStorage['spirolink_language'] = 'es'
        ↓
document.documentElement.lang = 'es'
        ↓
All components using t() re-render with new language
```

### Country Selection Flow
```
User selects country
        ↓
CountrySelector.tsx (onClick)
        ↓
localStorage['spirolink_country'] = 'FR'
        ↓
User's choice persists
        ↓
Component can read from localStorage when needed
```

## State Management

### I18n Context
```typescript
{
  language: 'en' | 'hi' | 'es' | 'fr' | 'ar' | 'de'
  setLanguage: (lang) => void
  t: (key) => string
}
```

### Storage
- **LocalStorage Key 1:** `spirolink_language`
  - Value: Language code ('en', 'hi', 'es', etc.)
  - Managed by: I18nProvider
  - Used by: All components with t() function

- **LocalStorage Key 2:** `spirolink_country`
  - Value: Country code ('IN', 'US', 'FR', etc.)
  - Managed by: CountrySelector
  - Used by: Components that need country-specific content

## Translation System

### Translation Files
```
translations.ts
├── en: { key1: 'English text', key2: 'More text', ... }
├── hi: { key1: 'हिन्दी पाठ', key2: 'अधिक पाठ', ... }
├── es: { key1: 'Texto en español', key2: 'Más texto', ... }
├── fr: { key1: 'Texte français', key2: 'Plus de texte', ... }
├── ar: { key1: 'النص العربي', key2: 'نص آخر', ... }
└── de: { key1: 'Deutscher Text', key2: 'Mehr Text', ... }
```

### How Translation Works
```
Component A calls t('home')
        ↓
useI18n() hook returns:
  translations[currentLanguage]['home']
        ↓
Returns English, Hindi, Spanish, etc. based on currentLanguage
        ↓
Component re-renders with translated text
```

## Component Dependencies

### LanguageSelector
```
LanguageSelector.tsx
├── imports: useI18n
├── imports: SUPPORTED_LANGUAGES
├── manages: dropdown state
├── reads: current language
├── updates: localStorage + language state
└── depends on: I18nProvider context
```

### CountrySelector
```
CountrySelector.tsx
├── imports: COUNTRIES from countries.ts
├── imports: useI18n (for labels only)
├── manages: dropdown state, search term
├── reads: selected country from localStorage
├── updates: localStorage['spirolink_country']
└── features: search/filter, keyboard nav, click-outside
```

### Header
```
Header.tsx
├── imports: useI18n
├── imports: CountrySelector
├── imports: LanguageSelector
├── uses: t() for navigation labels
├── uses: t() for "Sign In" button
└── manages: menu state, responsive behavior
```

## Key Design Decisions

### 1. Context API for i18n
- ✅ No external dependencies
- ✅ Built into React
- ✅ Simple provider pattern
- ✅ Easy to test

### 2. localStorage for Persistence
- ✅ Browser native, no backend needed
- ✅ Survives page refresh
- ✅ Survives browser restart
- ✅ Domain-specific (doesn't affect other sites)

### 3. Independent Language & Country
- ✅ User might speak English in Germany
- ✅ User might be in India but prefer Spanish
- ✅ No dependency between the two
- ✅ Stored separately, managed independently

### 4. Translation Keys vs Strings
- ✅ Centralized management
- ✅ Type-safe with TypeScript
- ✅ Easy to find missing translations
- ✅ Consistent across app
- ⚠️ Requires adding keys for new content

### 5. SearchableCountry Dropdown
- ✅ 250+ countries is too many to scroll
- ✅ Real-time filtering
- ✅ Search by country name or code
- ✅ Better UX

## Type Safety

### TypeScript Types
```typescript
// Language type
type Language = 'en' | 'hi' | 'es' | 'fr' | 'ar' | 'de'

// Translation key type
type TranslationKey = keyof typeof translations.en

// Country code type
type CountryCode = typeof COUNTRIES[number]['code']

// Country object
interface Country {
  code: CountryCode
  name: string
}
```

## Performance Considerations

### Optimizations
- ✅ useCallback for event handlers
- ✅ useRef for non-state DOM references
- ✅ useEffect for side effects
- ✅ Context only updates when language changes
- ✅ localStorage updates are minimal

### Bundle Size
- Minimal impact:
  - ~2KB for i18n system (translations grow with content)
  - ~3KB for country list
  - ~2KB for selectors
  - Total: ~7KB additional (before compression)

## Accessibility Features

### Keyboard Navigation
```
Tab         → Focus next element
Shift+Tab   → Focus previous element
Enter/Space → Open dropdown / Select item
Escape      → Close dropdown
ArrowDown   → Next option
ArrowUp     → Previous option
```

### ARIA Attributes
```html
<button aria-label="Language: English">
  English
</button>

<div role="listbox">
  <button role="option" aria-selected="true">
    Selected option
  </button>
</div>
```

### Screen Reader Support
- ✅ Proper ARIA roles
- ✅ Labels on all controls
- ✅ Semantic HTML
- ✅ Language attribute on document

## Internationalization Standards

### Standards Followed
- ISO 639-1 for language codes (en, hi, es, etc.)
- ISO 3166-1 for country codes (IN, US, FR, etc.)
- BCP 47 for language tags
- WAI-ARIA for accessibility

### Future RTL Considerations
- Arabic already supported with `dir="rtl"`
- Can be extended to Hebrew, Farsi, etc.
- CSS can respond to `[dir="rtl"]` attribute
- Layout should be direction-agnostic

## Testing Strategy

### Unit Tests (Not Included - Add These)
```
- useI18n hook
- Translation key lookups
- Language persistence
- Country persistence
```

### Integration Tests (Not Included - Add These)
```
- Language selector functionality
- Country selector functionality
- Header component integration
- localStorage persistence across tabs
```

### Manual Testing
```
- Change language → UI updates
- Refresh page → Language persists
- Change country → Language unchanged
- Refresh page → Country persists
- Keyboard navigation works
- Mobile responsiveness
- Search filters countries
```

## Deployment Checklist

- ✅ Build passes (`npm run build`)
- ✅ TypeScript compiles (`npm run typecheck`)
- ✅ No console errors
- ✅ localStorage working
- ✅ All languages display correctly
- ✅ No missing translation keys
- ✅ Keyboard navigation tested
- ✅ Mobile tested
- ✅ RTL (Arabic) tested

## Future Enhancement Opportunities

1. **Server-Side Translations**
   - Fetch translations from API instead of bundled
   - Better for large apps with many languages
   - Can update translations without rebuilding

2. **Pluralization & Formatting**
   - Handle plurals properly (1 item vs 2 items)
   - Date/currency formatting per locale
   - Number formatting (1.234,56 vs 1,234.56)

3. **Translation Management**
   - Use external service like Crowdin
   - Community translations
   - Translation workflow management

4. **Analytics**
   - Track language selection
   - Track country selection
   - Optimize for most-used combinations

5. **Server-Side Rendering**
   - SSR with i18n
   - URL-based language selection (en.example.com)
   - SEO optimization per language

6. **Cookie-Based Persistence**
   - Send preference to server
   - Better for analytics
   - Works across subdomains

---

This architecture is:
- ✅ Scalable (easy to add languages/content)
- ✅ Maintainable (clear separation of concerns)
- ✅ Testable (components are isolated)
- ✅ Performant (minimal re-renders)
- ✅ Accessible (WCAG compliant)
- ✅ Type-safe (full TypeScript support)
