/**
 * EXAMPLE: How to add internationalization to an existing page
 * 
 * This shows how to convert the Home page to use the i18n system.
 * You can apply the same pattern to all pages.
 */

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Section, SectionHeading } from '../components/ui/Section';
import StayTuned from '../components/StayTuned';
import { useI18n } from '../i18n/I18nProvider'; // <-- ADD THIS IMPORT

export default function HomeExample() {
  const { t } = useI18n(); // <-- ADD THIS HOOK

  return (
    <>
      {/* NODALWIRE Hero - With Internationalization */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Example 1: Simple text replacement */}
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              {t('home')} {/* Instead of hardcoded "Home" */}
            </h1>
            
            {/* Example 2: For multi-word content, add to translations.ts first */}
            {/* translations.ts should have: heroTitle: 'Innovative & Sustainable Digital Solutions' */}
            {/* Then use: {t('heroTitle')} */}

            <p className="text-xl text-slate-700 mb-8">
              NODALWIRE transforms your vision into powerful digital products. We build modern,
              scalable solutions that drive growth and efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                {/* Use translated 'services' key */}
                <Button>
                  {t('services')} <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">{t('contact')}</Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <StayTuned 
              title="Stay Tuned" 
              subtitle="This dashboard is under development. Something amazing is coming soon!" 
            />
          </div>
        </div>
      </Section>

      {/* PON & FTTH Section with Translations */}
      <Section className="bg-white">
        <SectionHeading
          title={t('ponFtth')} {/* Translated section title */}
          subtitle="Technical Excellence"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-12">
          <ul className="space-y-4 text-slate-700">
            {/* Add these keys to translations.ts for full i18n support */}
            <li className="flex gap-3">
              <span className="font-semibold text-green-600 flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold">{t('ponFtth')}:</span> 
                Service area analysis, topology selection, CO & hub planning
              </li>
            </ul>
        </div>
      </Section>
    </>
  );
}

/**
 * STEPS TO FULLY INTERNATIONALIZE A PAGE:
 * 
 * 1. Import useI18n hook:
 *    import { useI18n } from '../i18n/I18nProvider';
 * 
 * 2. Call the hook in your component:
 *    const { t } = useI18n();
 * 
 * 3. Identify all user-facing text strings
 * 
 * 4. Add new keys to src/i18n/translations.ts for ALL languages:
 *    en: { newKey: 'English text' }
 *    hi: { newKey: 'हिंदी पाठ' }
 *    es: { newKey: 'Texto en español' }
 *    fr: { newKey: 'Texte en français' }
 *    ar: { newKey: 'النص بالعربية' }
 *    de: { newKey: 'Deutscher Text' }
 * 
 * 5. Replace hardcoded strings with t('keyName'):
 *    Before: <h1>Home</h1>
 *    After:  <h1>{t('home')}</h1>
 * 
 * 6. Test with different languages to ensure translations display correctly
 * 
 * 7. For RTL languages (Arabic), add dir attribute:
 *    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
 * 
 * 8. Consider country-specific content using localStorage:
 *    const country = localStorage.getItem('nodalwire_country');
 *    if (country === 'IN') { /* Show India-specific content */ }
 */
