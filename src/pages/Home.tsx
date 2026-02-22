import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Section, SectionHeading } from '../components/ui/Section';
import { useI18n } from '../i18n/I18nProvider';
import StayTuned from '../components/StayTuned';
import Chatbot from '../components/Chatbot';
import { useState, useEffect } from 'react';

const images = [
  { src: '/assets/downloads/ftth.jpg', alt: 'PON FTTH Network' },
  { src: '/assets/downloads/microwave.jpg', alt: 'Microwave Network' },
  { src: '/assets/downloads/optical.jpg', alt: 'Optical Long Haul' },
  { src: '/assets/downloads/wifi.jpg', alt: 'WiFi Network' },
];

function EricImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsAutoPlay(true);
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsAutoPlay(true);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Images Container */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.7s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              loading={index === currentIndex ? 'eager' : 'lazy'}
            />
            {/* Overlay Gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          padding: '8px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }}
      >
        <ChevronLeft style={{ width: '24px', height: '24px', color: '#1f2937' }} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          padding: '8px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }}
      >
        <ChevronRight style={{ width: '24px', height: '24px', color: '#1f2937' }} />
      </button>

      {/* Pagination Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          gap: '8px',
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlay(false);
              setCurrentIndex(index);
              setIsAutoPlay(true);
            }}
            style={{
              width: index === currentIndex ? '32px' : '10px',
              height: '10px',
              borderRadius: '5px',
              backgroundColor: 'white',
              border: 'none',
              cursor: 'pointer',
              opacity: index === currentIndex ? 1 : 0.6,
              transition: 'all 0.3s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}


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
        <EricImageSlider />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>


      <Section className="bg-slate-50">
        <SectionHeading
          title={t('homeWhyChooseTitle')}
          subtitle={t('homeWhyChooseSubtitle')}
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('homeInnovativeTitle')}</h3>
            <p className="text-slate-600">{t('homeInnovativeDesc')}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('homeSustainableTitle')}</h3>
            <p className="text-slate-600">{t('homeSustainableDesc')}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('homeExpertTitle')}</h3>
            <p className="text-slate-600">{t('homeExpertDesc')}</p>
          </div>
        </div>
      </Section>
      </div>
      <Chatbot />
    </>
  );
}
