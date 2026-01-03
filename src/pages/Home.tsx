import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Leaf, Shield } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Section, SectionHeading } from '../components/ui/Section';
import { useI18n } from '../i18n/I18nProvider';
import StayTuned from '../components/StayTuned';

const rotate3dClasses = ['rotate-3d-1', 'rotate-3d-2', 'rotate-3d-3', 'rotate-3d-4', 'rotate-3d-5'];

const getRotateClass = (idx: number) => {
  return rotate3dClasses[idx % rotate3dClasses.length];
};

// Hook for interactive scrolling with auto-resume
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const handleScroll = () => {
      setIsAnimating(false);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsAnimating(true);
      }, 3000);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return { ref, isAnimating };
};

export default function Home() {
  const { t } = useI18n();
  const ponRef = useScrollAnimation();
  const microwaveRef = useScrollAnimation();
  const opticalRef = useScrollAnimation();
  const whyChooseRef = useScrollAnimation();

  return (
    <>
      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* SPIROLINK Hero - Enhanced Design */}
      <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-40 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-green-500/10 pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-400/30 text-sm font-semibold text-green-300">
              🚀 Enterprise Solutions
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              {t('homeHeroTitle')}
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
              {t('homeHeroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/services">
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-green-500/50 transition-all">
                  {t('exploreOurServices')} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="border-2 border-green-400/50 text-green-300 hover:bg-green-400/10 px-8 py-3 rounded-lg font-semibold transition-all">
                  {t('getInTouch')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur-3xl opacity-20 -z-10" />
            <StayTuned />
          </div>
        </div>
      </Section>

      {/* START: PON & FTTH MODULE - HOME PAGE OVERVIEW */}
      <Section className="bg-white relative">
        <SectionHeading
          title={t('homePoNFtthTitle')}
          subtitle={t('homePoNFtthSubtitle')}
          centered={true}
        />
        <div className="mt-12 overflow-x-auto rounded-2xl scroll-smooth" ref={ponRef.ref}>
          <div className={`flex gap-6 ${ponRef.isAnimating ? 'slide-left-right' : ''} pb-4`}>
            {[
              { title: t('homePoNFtthNetworkPlanningTitle'), desc: t('homePoNFtthNetworkPlanningDesc'), icon: '🗺️' },
              { title: t('homePoNFtthTechnologyDesignTitle'), desc: t('homePoNFtthTechnologyDesignDesc'), icon: '⚙️' },
              { title: t('homePoNFtthOdnEngineeringTitle'), desc: t('homePoNFtthOdnEngineeringDesc'), icon: '🔧' },
              { title: t('homePoNFtthCapacityTitle'), desc: t('homePoNFtthCapacityDesc'), icon: '📊' },
              { title: t('homePoNFtthMigrationTitle'), desc: t('homePoNFtthMigrationDesc'), icon: '🔄' }
            ].map((item, idx) => (
              <div key={idx} className={`group relative ${getRotateClass(idx)} flex-shrink-0 w-80 transition-all duration-500 hover:scale-105`}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 to-blue-500/15 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-green-400/70 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col backdrop-blur-sm">
                  <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-125">{item.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow group-hover:text-slate-700 transition-colors duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/pon-ftth">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
              {t('homePoNFtthViewFullBtn')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>
      {/* END: PON & FTTH MODULE - HOME PAGE OVERVIEW */}

      {/* START: Microwave Network Module - HOME PAGE OVERVIEW */}
      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <SectionHeading
          title={t('homeMicrowaveTitle')}
          subtitle={t('homeMicrowaveSubtitle')}
          centered={true}
          dark={true}
        />
        <div className="mt-12 overflow-x-auto rounded-2xl scroll-smooth" ref={microwaveRef.ref}>
          <div className={`flex gap-6 ${microwaveRef.isAnimating ? 'slide-left-right' : ''} pb-4`}>
            {[
              { title: t('homeMicrowavePlanningTitle'), desc: t('homeMicrowavePlanningDesc'), icon: '📋' },
              { title: t('homeMicrowaveLinkTitle'), desc: t('homeMicrowaveLinkDesc'), icon: '🔗' },
              { title: t('homeMicrowaveRegulatoryTitle'), desc: t('homeMicrowaveRegulatoryDesc'), icon: '⚖️' },
              { title: t('homeMicrowaveImplementationTitle'), desc: t('homeMicrowaveImplementationDesc'), icon: '🛠️' }
            ].map((item, idx) => (
              <div key={idx} className={`group relative ${getRotateClass(idx)} flex-shrink-0 w-80 transition-all duration-500 hover:scale-105`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/50 hover:border-blue-400/70 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 h-full flex flex-col backdrop-blur-sm">
                  <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-125">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed flex-grow group-hover:text-slate-100 transition-colors duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/microwave-network">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
              {t('homePoNFtthViewFullBtn')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>
      {/* END: Microwave Network Module - HOME PAGE OVERVIEW */}

      {/* START: Long-Haul Optical Network Module - HOME PAGE OVERVIEW */}
      <Section className="bg-white">
        <SectionHeading
          title={t('homeOpticalTitle')}
          subtitle={t('homeOpticalSubtitle')}
          centered={true}
        />
        <div className="mt-12 overflow-x-auto rounded-2xl scroll-smooth" ref={opticalRef.ref}>
          <div className={`flex gap-6 ${opticalRef.isAnimating ? 'slide-left-right' : ''} pb-4`}>
            {[
              { title: t('homeOpticalRouteTitle'), desc: t('homeOpticalRouteDesc'), icon: '🛣️' },
              { title: t('homeOpticalDwdmTitle'), desc: t('homeOpticalDwdmDesc'), icon: '📡' },
              { title: t('homeOpticalLinkBudgetTitle'), desc: t('homeOpticalLinkBudgetDesc'), icon: '⚡' },
              { title: t('homeOpticalResilienceTitle'), desc: t('homeOpticalResilienceDesc'), icon: '🛡️' },
              { title: t('homeOpticalMigrationTitle'), desc: t('homeOpticalMigrationDesc'), icon: '🚀' }
            ].map((item, idx) => (
              <div key={idx} className={`group relative ${getRotateClass(idx)} flex-shrink-0 w-80 transition-all duration-500 hover:scale-105`}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-red-500/15 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-orange-400/70 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 h-full flex flex-col backdrop-blur-sm">
                  <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-125">{item.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow group-hover:text-slate-700 transition-colors duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/optical-long-haul">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
              {t('homePoNFtthViewFullBtn')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>
      {/* END: Long-Haul Optical Network Module - HOME PAGE OVERVIEW */}

      {/* START: Enterprise Wi-Fi Network Module - HOME PAGE OVERVIEW */}
      <Section className="bg-gradient-to-br from-purple-900 via-slate-900 to-slate-800 text-white">
        <SectionHeading
          title={t('homeWifiTitle')}
          subtitle={t('homeWifiSubtitle')}
          centered={true}
          dark={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-12 max-w-2xl mx-auto">
          <div className="group relative rotate-3d-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">📶</div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('homeWifiDesignTitle')}</h3>
              <p className="text-slate-300 leading-relaxed">{t('homeWifiDesignDesc')}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/wifi-network">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
              {t('homePoNFtthViewFullBtn')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>
      {/* END: Enterprise Wi-Fi Network Module - HOME PAGE OVERVIEW */}
      <Section className="bg-gradient-to-br from-white to-slate-50 py-24">
        <SectionHeading
          title={t('homeWhyChooseTitle')}
          subtitle={t('homeWhyChooseSubtitle')}
          centered={true}
        />
        <div className="mt-12 overflow-x-auto rounded-2xl scroll-smooth" ref={whyChooseRef.ref}>
          <div className={`flex gap-8 ${whyChooseRef.isAnimating ? 'slide-left-right' : ''} pb-4`}>
            {[
              { title: t('homeInnovativeTitle'), desc: t('homeInnovativeDesc'), icon: <Zap className="w-8 h-8 text-amber-500" /> },
              { title: t('homeSustainableTitle'), desc: t('homeSustainableDesc'), icon: <Leaf className="w-8 h-8 text-green-500" /> },
              { title: t('homeExpertTitle'), desc: t('homeExpertDesc'), icon: <Shield className="w-8 h-8 text-blue-500" /> }
            ].map((item, idx) => (
              <div key={idx} className={`group relative overflow-hidden ${getRotateClass(idx)} flex-shrink-0 w-96 transition-all duration-500 hover:scale-105`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl border border-slate-200 hover:border-green-400/50 bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 h-full flex flex-col">
                  <div className="mb-4 p-3 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg w-fit group-hover:from-slate-200 group-hover:to-slate-100 transition-all duration-300">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-green-700 transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow group-hover:text-slate-700 transition-colors duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action - GET STARTED */}
      <Section className="bg-gradient-to-r from-slate-900 via-green-900 to-slate-900 text-white py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-green-500/10 pointer-events-none" />
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-300 via-blue-300 to-green-300 bg-clip-text text-transparent">
            {t('homeGetStartedTitle')}
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-green-100 leading-relaxed">
            {t('homeGetStartedDescription')}
          </p>
          <ul className="text-lg mb-12 space-y-3 text-green-100 inline-block text-left">
            <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>{t('homeFreeConsultation')}</li>
            <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>{t('homeNetworkAssessment')}</li>
            <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>{t('homeProjectScoping')}</li>
            <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>{t('homeTechnicalDiscussion')}</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/contact">
              <button className="px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-500/50 transition-all inline-flex items-center justify-center gap-2 hover:-translate-y-1">
                {t('homeContactUsBtn')} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button
              onClick={() => alert(t('homeQuoteComingSoon'))}
              className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-green-400 text-green-300 hover:bg-green-400/10 shadow-lg hover:shadow-green-500/50 transition-all inline-flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              {t('homeRequestQuoteBtn')} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Section>
      </div>
    </>
  );
}
