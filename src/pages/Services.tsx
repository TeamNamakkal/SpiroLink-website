import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nProvider';

export default function Services() {
  const { t } = useI18n();
  
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-40 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-green-500/10 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-400/30 text-sm font-semibold text-green-300 mb-6">
            🚀 Our Service Offerings
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-6">
            {t('servicesPageTitle')}
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            {t('servicesPageDescription')}
          </p>
        </div>
      </Section>

      {/* START: PON & FTTH MODULE - SERVICES PAGE SUMMARY */}
      <Section className="bg-white">
        <SectionHeading
          title="PON & FTTH Network Planning"
          subtitle="Technical Excellence"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12">
          {[
            { title: 'Network Planning', desc: 'Comprehensive demand forecasting and market analysis', icon: '🗺️' },
            { title: 'Technology Design', desc: 'PON technology selection and architecture design', icon: '⚙️' },
            { title: 'ODN Engineering', desc: 'Optical distribution network design and optimization', icon: '🔧' },
            { title: 'Capacity Planning', desc: 'Homes passed and coverage analysis', icon: '📊' },
            { title: 'Migration Support', desc: 'Legacy network migration and upgrade pathways', icon: '🔄' }
          ].map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-green-400/50 transition-all duration-300 h-full flex flex-col">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/pon-ftth">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
              {t('servicesViewCompleteBtn')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>
      {/* END: PON & FTTH MODULE - SERVICES PAGE SUMMARY */}

      {/* START: Microwave Network Module - SERVICES PAGE */}
      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <SectionHeading
          title="Microwave Network Design"
          subtitle="Wireless Connectivity Excellence"
          centered={true}
          dark={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { title: 'Network Planning', desc: 'Comprehensive site surveys and path analysis', icon: '📋' },
            { title: 'Link Engineering', desc: 'Point-to-point and point-to-multipoint solutions', icon: '🔗' },
            { title: 'Regulatory', desc: 'Frequency licensing coordination and compliance', icon: '⚖️' },
            { title: 'Implementation', desc: 'Installation oversight and commissioning support', icon: '🛠️' }
          ].map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed flex-grow">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
                {t('servicesGetStartedBtn')} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/microwave-network">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
                {t('servicesViewCompleteBtn')} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>
      {/* END: Microwave Network Module - SERVICES PAGE */}

      {/* START: Long-Haul Optical Network Module - SERVICES PAGE */}
      <Section className="bg-white">
        <SectionHeading
          title="Long-Haul Optical Networks"
          subtitle="Backbone Infrastructure Excellence"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12">
          {[
            { title: 'Route Planning', desc: 'Network planning and fiber path optimization', icon: '🛣️' },
            { title: 'DWDM Design', desc: 'Dense wavelength division multiplexing architecture', icon: '📡' },
            { title: 'Link Budget', desc: 'Optical link budget engineering and optimization', icon: '⚡' },
            { title: 'Resilience', desc: 'Network resilience and protection scheme design', icon: '🛡️' },
            { title: 'Migration', desc: 'Legacy system upgrades and capacity expansion', icon: '🚀' }
          ].map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-orange-400/50 transition-all duration-300 h-full flex flex-col">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/optical-long-haul">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
              {t('servicesViewCompleteBtn')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>
      {/* END: Long-Haul Optical Network Module - SERVICES PAGE */}

      {/* START: Enterprise Wi-Fi Network Module - SERVICES PAGE */}
      <Section className="bg-gradient-to-br from-purple-900 via-slate-900 to-slate-800 text-white">
        <SectionHeading
          title="Enterprise Wi-Fi Networks"
          subtitle="Wireless Excellence"
          centered={true}
          dark={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-12 max-w-2xl mx-auto">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">📶</div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('servicesWifiDesignTitle')}</h3>
              <p className="text-slate-300 leading-relaxed">Enterprise Wi-Fi network design, Wi-Fi 6/6E/7 planning, security implementation, and performance optimization for organizations of all sizes.</p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/wifi-network">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
              {t('servicesViewCompleteBtn')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>
      {/* END: Enterprise Wi-Fi Network Module - SERVICES PAGE */}

      <Section className="bg-white py-24">
        <SectionHeading
          title="Why Partner With Us"
          subtitle="Expertise & Excellence"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
          {[
            { title: 'Expert Team', desc: 'Deep technical expertise across all network technologies', icon: '👥', color: 'from-green-50' },
            { title: 'Proven Method', desc: 'Systematic design approach ensuring quality outcomes', icon: '✓', color: 'from-blue-50' },
            { title: 'Full Documentation', desc: 'Complete technical deliverables for implementation', icon: '📋', color: 'from-purple-50' }
          ].map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className={`relative p-8 rounded-xl border border-slate-200 hover:border-green-400/30 bg-gradient-to-br ${item.color} to-slate-100 transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:-translate-y-1`}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-to-r from-slate-900 via-green-900 to-slate-900 text-white py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-green-500/10 pointer-events-none" />
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-300 via-blue-300 to-green-300 bg-clip-text text-transparent">
            Ready to Transform Your Network?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-green-100 leading-relaxed">
            Let's discuss how our services can drive your business growth.
          </p>
          <Link to="/contact">
            <button className="px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-500/50 transition-all inline-flex items-center justify-center gap-2 hover:-translate-y-1">
              Contact Us <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </Section>
    </>
  );
}
