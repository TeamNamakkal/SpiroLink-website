import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ServiceHero, ServiceSection, ServiceCard, CTA } from '../components/ServiceDetailLayout';

const rotate3dClasses = ['rotate-3d-1', 'rotate-3d-2', 'rotate-3d-3', 'rotate-3d-4', 'rotate-3d-5'];
const getRotateClass = (idx: number) => rotate3dClasses[idx % rotate3dClasses.length];

export default function PonFtth() {
  return (
    <>
      <ServiceHero
        title="PON & FTTH Network Planning Services"
        description="Comprehensive fiber-to-the-home and passive optical network design for broadband operators and service providers"
        badge="FTTH Network Planning"
        badgeIcon="🌐"
        themeColor="cyan"
      />

      <Section className="bg-white relative py-20">
        <SectionHeading
          title="FTTH Network Planning"
          subtitle="End-to-End Broadband Infrastructure"
          centered={true}
        />
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 slide-left-right">
            {[
              { title: "Geographic Assessment", desc: "Market analysis, demographic mapping, fiber availability evaluation, and service territory planning", icon: "📍", color: "from-cyan-50 to-blue-50", border: "border-cyan-200" },
              { title: "Route Planning", desc: "Optimal fiber routes, utility coordination, environmental assessment, and cost optimization", icon: "🗺️", color: "from-blue-50 to-indigo-50", border: "border-blue-200" },
              { title: "Network Design", desc: "PON topology selection, splitter placement, service area segmentation, and capacity planning", icon: "📊", color: "from-sky-50 to-cyan-50", border: "border-sky-200" },
              { title: "Economic Modeling", desc: "Investment analysis, ROI calculations, subsidy optimization, and financial feasibility studies", icon: "💰", color: "from-cyan-50 to-sky-50", border: "border-cyan-200" }
            ].map((item, idx) => (
              <div key={idx} className={`group relative ${getRotateClass(idx)} flex-shrink-0 w-80`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`relative p-6 bg-gradient-to-br ${item.color} rounded-xl border ${item.border} hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col card-glow`}>
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <ServiceSection title="PON Technology Design" subtitle="Passive Optical Network Engineering" isDark themeColor="cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard icon="🔀" title="PON Architecture Selection" description="GPON vs EPON vs XGS-PON evaluation, split ratios, reach analysis, and upgrade pathways" isDark={true} />
          <ServiceCard icon="📡" title="Optical Distribution Network" description="ODN design, splitter placement, fiber segment planning, and performance optimization" isDark={true} />
          <ServiceCard icon="⚡" title="Optical Line Terminal" description="OLT placement, redundancy design, uplink capacity, and interconnection strategy" isDark={true} />
          <ServiceCard icon="🏠" title="Optical Network Terminal" description="ONT placement optimization, subscriber access design, and multi-dwelling solutions" isDark={true} />
        </div>
      </ServiceSection>

      <ServiceSection title="ODN Engineering" subtitle="Optical Distribution Network Planning">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard icon="🌳" title="Fiber Routing" description="Underground/aerial routing decisions, duct availability, conduit planning, and environmental impact assessment" isDark={false} />
          <ServiceCard icon="🔌" title="Splitter Strategy" description="Splitter staging, passive component placement, distribution point design, and access optimization" isDark={false} />
          <ServiceCard icon="📏" title="Span Optimization" description="Fiber distance calculations, power budget analysis, attenuation management, and signal integrity" isDark={false} />
          <ServiceCard icon="🛡️" title="Redundancy Design" description="Network resilience, backup pathways, protection switching, and disaster recovery planning" isDark={false} />
        </div>
      </ServiceSection>

      <ServiceSection title="Capacity & Coverage Planning" subtitle="Growth & Service Territory Design" isDark themeColor="cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard icon="📈" title="Subscriber Growth" description="Demand forecasting, address density analysis, service adoption modeling, and capacity headroom planning" isDark={true} />
          <ServiceCard icon="🏘️" title="Service Territory Segmentation" description="Service area optimization, customer density zones, network segmentation, and multi-fiber strategies" isDark={true} />
          <ServiceCard icon="🔄" title="Network Staging" description="Phased deployment planning, construction sequencing, economic deployment order, and milestone planning" isDark={true} />
          <ServiceCard icon="💾" title="Bandwidth Capacity" description="Video, broadband, voice provisioning, service offering design, and future technology accommodation" isDark={true} />
        </div>
      </ServiceSection>

      <ServiceSection title="Network Migration" subtitle="Transitioning to FTTH Infrastructure">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard icon="🔄" title="Legacy System Transition" description="Copper to fiber migration planning, service continuity, customer transition strategy, and parallel operations" isDark={false} />
          <ServiceCard icon="🎯" title="Technology Upgrades" description="PON generation evolution, bandwidth upgrades, feature enhancement planning, and backward compatibility" isDark={false} />
          <ServiceCard icon="👥" title="Service Migration" description="Customer activation sequencing, service availability management, support during transition, and churn mitigation" isDark={false} />
          <ServiceCard icon="📊" title="Performance Optimization" description="Network tuning, OLT optimization, splitter load balancing, and ongoing capacity monitoring" isDark={false} />
        </div>
      </ServiceSection>

      <ServiceSection title="Our Design Methodology" subtitle="Proven 6-Phase Approach" themeColor="cyan">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>1</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Service Territory Analysis</h4>
                <p className="text-slate-700">Comprehensive market assessment including demographics, address density, service demand, and economic opportunity identification.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>2</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Network Architecture Selection</h4>
                <p className="text-slate-700">PON technology evaluation, topology design, fiber reach optimization, and infrastructure capacity planning for target market.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>3</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Detailed ODN Design</h4>
                <p className="text-slate-700">Fiber routing engineering, splitter placement, distribution point design, and all ODN component specifications.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>4</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Feasibility & Economics</h4>
                <p className="text-slate-700">Cost estimation, investment modeling, ROI analysis, grant opportunity identification, and financial sustainability assessment.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>5</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Staging & Implementation Planning</h4>
                <p className="text-slate-700">Phased construction roadmap, deployment sequencing, timeline development, resource planning, and milestone definition.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>6</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Documentation & Support</h4>
                <p className="text-slate-700">Complete technical specifications, vendor requirements, RFP support, implementation guidance, and commissioning oversight.</p>
              </div>
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="PON Technologies" subtitle="GPON, EPON, XGS-PON & Beyond" isDark={false} themeColor="cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard icon="🟢" title="GPON (10 Gbps)" description="ITU-T standard, 1.244/2.488 Gbps downstream, mature technology, widespread vendor ecosystem" isDark={false} />
          <ServiceCard icon="🔵" title="EPON (10 Gbps)" description="IEEE standard, 1.25 Gbps symmetric, Ethernet native, cost-effective deployment model" isDark={false} />
          <ServiceCard icon="⚡" title="XGS-PON (10 Gbps)" description="Next-generation GPON, 10 Gbps downstream, backward compatible, ultra-high bandwidth capacity" isDark={false} />
          <ServiceCard icon="🚀" title="Future Technologies" description="NG-PON2 (40 Gbps), emerging fiber technologies, upgradable infrastructure design" isDark={false} />
        </div>
      </ServiceSection>

      <ServiceSection title="Network Capabilities" subtitle="Advanced Feature Support" isDark themeColor="cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Service Offerings</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Residential broadband service</li>
              <li>• Business class connectivity</li>
              <li>• IPTV delivery capability</li>
              <li>• VoIP provisioning support</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Performance Metrics</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Ultra-low latency (&lt;5ms)</li>
              <li>• High reliability (99.9%+)</li>
              <li>• Symmetric bandwidth provisioning</li>
              <li>• Quality of service (QoS) management</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Network Management</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Real-time monitoring systems</li>
              <li>• Proactive fault detection</li>
              <li>• Performance analytics</li>
              <li>• Automated provisioning</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Network Evolution</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Technology upgrade pathways</li>
              <li>• Capacity expansion capability</li>
              <li>• Future-proofing infrastructure</li>
              <li>• Long-term scalability</li>
            </ul>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Industries & Use Cases" subtitle="Who We Serve" isDark themeColor="cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Fiber-to-the-Home (FTTH)</h3>
            <p className="text-slate-700 text-sm">Residential broadband networks delivering high-speed connectivity to individual homes and small businesses.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Multi-Dwelling Units (MDU)</h3>
            <p className="text-slate-700 text-sm">Apartments, condos, and multi-tenant buildings with shared fiber infrastructure and optimized cost structure.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Smart Cities</h3>
            <p className="text-slate-700 text-sm">Public broadband networks supporting IoT, smart grid, public safety, and smart city service delivery.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Rural Broadband</h3>
            <p className="text-slate-700 text-sm">Underserved areas with federal/state funding utilizing FTTH for economic development and digital inclusion.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Enterprise Campus</h3>
            <p className="text-slate-700 text-sm">Large organizations and corporate campuses deploying fiber for internal connectivity and external services.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Municipal Networks</h3>
            <p className="text-slate-700 text-sm">Public utility networks operated by cities and municipalities for community broadband service delivery.</p>
          </div>
        </div>
      </ServiceSection>

      <Section className="bg-white relative py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready for Your FTTH Network?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Contact us today for network planning, technology selection, detailed design, feasibility analysis, and full implementation support for your PON and FTTH initiative.
          </p>
          <Link to="/contact">
            <Button className="text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all" style={{backgroundColor: '#0C94CE'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a7aa0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C94CE'}>
              Request a Consultation <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>

      <CTA
        title="Ready to Deploy Your Fiber-to-the-Home Network?"
        description="Contact us for network planning, PON technology selection, detailed ODN design, feasibility analysis, and full implementation services"
      />
    </>
  );
}
