import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ServiceHero, ServiceSection, InfoCard, CTA } from '../components/ServiceDetailLayout';

const rotate3dClasses = ['rotate-3d-1', 'rotate-3d-2', 'rotate-3d-3', 'rotate-3d-4', 'rotate-3d-5'];
const getRotateClass = (idx: number) => rotate3dClasses[idx % rotate3dClasses.length];

export default function MicrowaveNetwork() {
  return (
    <>
      <ServiceHero
        title="Microwave Network Design Services"
        description="Point-to-point and point-to-multipoint wireless solutions for reliable, high-capacity connectivity across industries"
        badge="Wireless Networks"
        badgeIcon="📡"
        themeColor="cyan"
      />

      <Section className="bg-white relative py-20">
        <SectionHeading
          title="Network Planning & Engineering"
          subtitle="Comprehensive Site Surveys and Analysis"
          centered={true}
        />
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 slide-left-right">
            {[
              { title: "Site Survey & Path Analysis", desc: "Terrain and obstruction analysis, propagation modeling, link budget calculations, environmental assessment", icon: "📍", color: "from-sky-50 to-cyan-50", border: "border-sky-200" },
              { title: "Link Engineering", desc: "Point-to-point design, point-to-multipoint solutions, antenna selection & placement, redundancy strategies", icon: "🔗", color: "from-blue-50 to-cyan-50", border: "border-blue-200" },
              { title: "Regulatory & Compliance", desc: "Frequency licensing support, regulatory documentation, standards compliance (FCC, ETSI, ITU), spectrum coordination", icon: "⚖️", color: "from-cyan-50 to-teal-50", border: "border-cyan-200" },
              { title: "Implementation & Commissioning", desc: "Technical documentation, equipment specifications, installation supervision, performance testing", icon: "🛠️", color: "from-indigo-50 to-blue-50", border: "border-indigo-200" }
            ].map((item, idx) => (
              <div key={idx} className={`group relative ${getRotateClass(idx)} flex-shrink-0 w-80`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

      <ServiceSection title="Industries We Serve" subtitle="Sector-Specific Wireless Solutions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <InfoCard icon={null} title="Telecommunications & Mobile Operators" description="Design and optimize 4G/5G backhaul networks, inter-cell site connectivity, and core network links for high-capacity, low-latency communications." />
          <InfoCard icon={null} title="Internet Service Providers" description="Enable last-mile connectivity, backbone infrastructure, fixed wireless access networks, and rural broadband deployment." />
          <InfoCard icon={null} title="Utilities & Energy Sector" description="Connect power grid monitoring systems, SCADA networks, smart grid communications, and renewable energy sites with resilient wireless connectivity." />
          <InfoCard icon={null} title="Transportation & Logistics" description="Support railway communication systems, highway monitoring networks, port/airport communications, and traffic management systems." />
          <InfoCard icon={null} title="Banking & Finance" description="Provide reliable connectivity for branch interconnections, ATM networks, data center redundancy links, and trading networks." />
          <InfoCard icon={null} title="Media & Broadcasting" description="Engineer studio-to-transmitter links, outside broadcast connections, news gathering backhaul, and live event coverage solutions." />
          <InfoCard icon={null} title="Enterprise & Corporate" description="Connect campus facilities, building-to-building links, remote offices, and manufacturing plants with dedicated microwave solutions." />
          <InfoCard icon={null} title="Healthcare" description="Design hospital campus networks, telemedicine connectivity, multi-facility healthcare systems, and remote clinic connections." />
        </div>
      </ServiceSection>

      <ServiceSection title="Why Choose Our Microwave Solutions" subtitle="What Sets Us Apart" isDark themeColor="cyan">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-cyan-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Proven Multi-Industry Expertise</h4>
              <p className="text-slate-300 text-sm">Deep experience across telecommunications, utilities, government, enterprise, and specialized sectors worldwide</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-cyan-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Cost-Effective Solutions</h4>
              <p className="text-slate-300 text-sm">Optimized designs that maximize ROI while meeting performance requirements</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-cyan-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Future-Proof Designs</h4>
              <p className="text-slate-300 text-sm">Scalable infrastructure supporting bandwidth growth and evolving technology standards</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-cyan-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">All-Weather Reliability</h4>
              <p className="text-slate-300 text-sm">Comprehensive fade margin analysis ensuring performance in rain, fog, and extreme conditions</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-cyan-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Rapid Deployment</h4>
              <p className="text-slate-300 text-sm">Streamlined design processes and project management for accelerated implementation timelines</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-cyan-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Comprehensive Support</h4>
              <p className="text-slate-300 text-sm">From initial planning through commissioning and ongoing optimization</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-cyan-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Regulatory Navigation</h4>
              <p className="text-slate-300 text-sm">Expert guidance through complex licensing and compliance requirements across jurisdictions</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-cyan-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Vendor-Neutral Approach</h4>
              <p className="text-slate-300 text-sm">Objective equipment recommendations based on your specific technical and budgetary needs</p>
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Our Design Approach" subtitle="5-Step Process for Reliable Results" themeColor="cyan">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Requirements Analysis</h4>
                <p className="text-slate-700">We begin by understanding your connectivity requirements, bandwidth needs, coverage areas, budget constraints, and regulatory environment.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Site Assessment</h4>
                <p className="text-slate-700">Comprehensive surveys including terrain analysis, line-of-sight verification, interference studies, and environmental considerations.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Network Design</h4>
                <p className="text-slate-700">Detailed engineering including frequency planning, link budget analysis, capacity modeling, redundancy design, and equipment specifications.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Documentation</h4>
                <p className="text-slate-700">Complete technical deliverables including network diagrams, equipment lists, installation specifications, frequency applications, and test procedures.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Implementation Support</h4>
                <p className="text-slate-700">Ongoing assistance during procurement, installation, commissioning, and optimization phases.</p>
              </div>
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Technical Capabilities" subtitle="Advanced Microwave Engineering" isDark={false} themeColor="cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Frequency Bands</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• 6 GHz to 86 GHz coverage</li>
              <li>• Licensed spectrum with coordination</li>
              <li>• Unlicensed spectrum (5 GHz, 60 GHz)</li>
              <li>• Multi-band hybrid solutions</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Capacity Range</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• 10 Mbps to 10+ Gbps per link</li>
              <li>• Aggregated multi-link solutions</li>
              <li>• Adaptive modulation support</li>
              <li>• Traffic engineering and QoS</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Standards & Compliance</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• ITU-R recommendations</li>
              <li>• ETSI standards</li>
              <li>• FCC regulations</li>
              <li>• Regional regulatory frameworks</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Network Architectures</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Point-to-point links</li>
              <li>• Point-to-multipoint systems</li>
              <li>• Ring and mesh topologies</li>
              <li>• Hybrid fiber-microwave networks</li>
            </ul>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="What You Get" subtitle="Comprehensive Design Package" themeColor="cyan">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Network topology diagrams</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Detailed link budget calculations</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Frequency and channel plans</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Equipment specifications and BOMs</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Installation and mounting specifications</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Path profile analysis with Fresnel zones</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Interference analysis reports</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Regulatory documentation and applications</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Project timeline and implementation plan</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-cyan-600 font-bold">→</span>
              <span className="text-slate-700">Testing and commissioning procedures</span>
            </div>
          </div>
        </div>
      </ServiceSection>

      <Section className="bg-white relative py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready for Your Microwave Network Solution?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Contact us today for path analysis, link design, equipment recommendations, regulatory support, and full implementation services.
          </p>
          <Link to="/contact">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
              Request a Consultation <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>

      <CTA
        title="Ready to Build Your Microwave Network?"
        description="Contact us for path analysis, link design, equipment recommendations, regulatory support, and full implementation services"
      />
    </>
  );
}
