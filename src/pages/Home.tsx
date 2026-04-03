import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Section, SectionHeading } from '../components/ui/Section';
import { ImageCarousel } from '../components/ImageCarousel';
import { useI18n } from '../i18n/I18nProvider';
import StayTuned from '../components/StayTuned';
import Chatbot from '../components/Chatbot';
import { useState } from 'react';


export default function Home() {
  const { t } = useI18n();
  const [showBrochures, setShowBrochures] = useState(false);

  const brochures = [
    { name: '01.Microwave Services.pdf', label: 'Microwave Services' },
    { name: '02. Optical Design Services.pdf', label: 'Optical Design Services' },
    { name: '03.FTTH Design Service.pdf', label: 'FTTH Design Services' },
    { name: '04.WiFi network Design.pdf', label: 'WiFi Network Design' },
  ];

  return (
    <>
      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* NODALWIRE Hero - Original Design */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="mt-0 md:-mt-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 mb-4">
              {t('homeHeroTitle')}
            </h1>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              {t('homeHeroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <Button>
                  {t('exploreOurServices')} <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">{t('getInTouch')}</Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-col items-start sm:flex-row sm:items-center gap-4 sm:gap-6 text-slate-600 text-sm">
              <button className="hover:text-slate-900 transition-colors">Schedule Consultation</button>
              <span className="hidden sm:block text-slate-400">|</span>
              <div className="relative" onMouseEnter={() => setShowBrochures(true)} onMouseLeave={() => setShowBrochures(false)}>
                <button
                  onClick={() => setShowBrochures(!showBrochures)}
                  className={`relative text-sm font-medium py-2 px-1 transition-colors duration-200 flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 ${
                    showBrochures ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Brochure
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${
                      showBrochures ? 'rotate-180' : ''
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
                  <div className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-slate-900" style={{
                    transform: showBrochures ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease'
                  }} />
                </button>
                {showBrochures && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-20 min-w-max">
                    {brochures.map((brochure) => (
                      <a
                        key={brochure.name}
                        href={`/brochures/${brochure.name}`}
                        download
                        className="block px-4 py-2 text-slate-900 hover:bg-slate-100 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {brochure.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <span className="hidden sm:block text-slate-400">|</span>
              <button className="hover:text-slate-900 transition-colors">Case Study</button>
            </div>
          </div>
          <div className="hidden md:block">
            <StayTuned />
          </div>
        </div>
      </Section>
      </div>

      {/* Ericsson-Style Solutions Section - FULL WIDTH IMAGE BAND */}
      <div style={{ width: '100vw', height: '480px', position: 'relative', left: '50%', transform: 'translateX(-50%)', overflow: 'hidden' }}>
        <ImageCarousel
          className="h-full rounded-none shadow-none"
          style={{ aspectRatio: 'auto', height: '100%', maxWidth: 'none' }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>


      <Section className="bg-slate-50">
        <SectionHeading
          title={t('homeWhyChooseTitle')}
          subtitle={t('homeWhyChooseSubtitle')}
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card hoverable reveal revealDelay={0} className="bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('homeInnovativeTitle')}</h3>
              <p className="text-slate-600">{t('homeInnovativeDesc')}</p>
            </CardContent>
          </Card>
          <Card hoverable reveal revealDelay={120} className="bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('homeSustainableTitle')}</h3>
              <p className="text-slate-600">{t('homeSustainableDesc')}</p>
            </CardContent>
          </Card>
          <Card hoverable reveal revealDelay={240} className="bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('homeExpertTitle')}</h3>
              <p className="text-slate-600">{t('homeExpertDesc')}</p>
            </CardContent>
          </Card>
        </div>
      </Section>
      </div>
      <Chatbot />
    </>
  );
}
