import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ServiceHero, ServiceSection, InfoCard, CTA } from '../components/ServiceDetailLayout';

export default function OpticalLongHaul() {
  return (
    <>
      <ServiceHero
        title="Long-Haul Optical Network Planning Services"
        description="Designing high-capacity, resilient fiber optic networks for carriers, enterprises, and global infrastructure"
        badge="Long-Haul Optical Infrastructure"
        badgeIcon="🌍"
        themeColor="orange"
      />

      <Section className="bg-white relative py-16">
        <SectionHeading
          title="Professional Optical Network Planning"
          subtitle="Long-Haul Fiber Infrastructure"
          centered={true}
        />
        <div className="text-center max-w-3xl mx-auto mt-8">
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Long-haul optical networks form the backbone of modern digital infrastructure, connecting cities, regions, data centers, and critical services across vast distances. Designing these networks requires rigorous engineering around signal integrity, availability, scalability, and operational risk.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            We specialize in planning and designing high-capacity optical fiber networks that deliver terabit-scale capacity, ultra-low latency, and exceptional reliability for carriers, ISPs, data center operators, and large enterprises.
          </p>
        </div>
      </Section>

      <ServiceSection title="Network Design Services" subtitle="Comprehensive Planning & Engineering">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 hover:border-orange-400/50 transition-all">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Route Planning & Feasibility</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Geographic route analysis</li>
              <li>• Fiber availability assessment</li>
              <li>• Cost estimation & optimization</li>
              <li>• Regulatory pathway identification</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 hover:border-orange-400/50 transition-all">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">DWDM System Design</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Dense wavelength multiplexing</li>
              <li>• Transponder configuration</li>
              <li>• Amplification strategy</li>
              <li>• Channel planning</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 hover:border-orange-400/50 transition-all">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Link Budget & Optimization</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Optical loss analysis</li>
              <li>• Signal integrity assessment</li>
              <li>• Regenerator placement</li>
              <li>• Performance optimization</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 hover:border-orange-400/50 transition-all">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Resilience & Protection</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Redundancy architecture</li>
              <li>• Protection switching design</li>
              <li>• Mesh networking strategies</li>
              <li>• Disaster recovery planning</li>
            </ul>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Industries We Serve" subtitle="Sector-Specific Solutions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <InfoCard icon={null} title="Telecommunications Carriers" description="National and international backbone networks, international gateway systems, cross-border connectivity, and global internet exchange points." />
          <InfoCard icon={null} title="Internet Service Providers" description="High-capacity backbone infrastructure, regional fiber networks, data center interconnections, and content delivery networks." />
          <InfoCard icon={null} title="Data Center Operators" description="Campus-wide interconnections, multi-data center replication, disaster recovery links, and cloud infrastructure networks." />
          <InfoCard icon={null} title="Enterprise & Financial Services" description="Wide-area network backbones, branch office interconnections, trading network links, and business continuity systems." />
          <InfoCard icon={null} title="Cable & Broadcasting" description="Content distribution networks, broadcast centers, master control centers, and media transport networks." />
          <InfoCard icon={null} title="Government & Military" description="Secure government networks, strategic communications infrastructure, critical infrastructure protection, and classified networks." />
        </div>
      </ServiceSection>

      <ServiceSection title="Our Design Approach" subtitle="6-Phase Methodology" themeColor="orange">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Requirements & Objectives Analysis</h4>
                <p className="text-slate-700">Comprehensive assessment of capacity requirements, latency targets, availability needs, budget constraints, and future growth plans.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Route Selection & Feasibility</h4>
                <p className="text-slate-700">Geographic analysis, terrain assessment, fiber availability evaluation, environmental considerations, and cost-benefit optimization.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Optical System Design</h4>
                <p className="text-slate-700">DWDM configuration, transponder selection, regenerator placement, amplification strategy, and channel planning for terabit-scale capacity.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Link Budget & Performance Analysis</h4>
                <p className="text-slate-700">Comprehensive link budget calculations, signal integrity analysis, noise figure assessment, and margin optimization across all wavelengths.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Resilience & Redundancy Design</h4>
                <p className="text-slate-700">Protection switching architecture, mesh networking strategies, automatic recovery mechanisms, and disaster recovery procedures.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">6</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Implementation & Support</h4>
                <p className="text-slate-700">Detailed documentation, equipment specifications, site acquisition support, vendor selection, commissioning oversight, and ongoing optimization.</p>
              </div>
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Technical Capabilities" subtitle="Advanced Optical Engineering" isDark={false} themeColor="orange">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Capacity & Distance</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Terabit-scale systems (25+ Tbps)</li>
              <li>• Ultra-long-haul spans (2000+ km)</li>
              <li>• Regenerator-less configurations</li>
              <li>• Coherent optical technology</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Fiber & Infrastructure</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Single-mode fiber design</li>
              <li>• Dispersion management</li>
              <li>• ROADM architectures</li>
              <li>• Amplification strategies</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Standards & Compliance</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• ITU-T recommendations</li>
              <li>• International standards</li>
              <li>• Regional regulations</li>
              <li>• Industry best practices</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Routing & Protection</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• 1+1 Protection switching</li>
              <li>• Mesh restoration</li>
              <li>• Automatic protection (APS/PCS)</li>
              <li>• Multi-layer resilience</li>
            </ul>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Network Types We Design" subtitle="Specialized Solutions" themeColor="orange">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">National Carrier Backbones</h3>
            <p className="text-slate-700 text-sm">Nationwide mesh networks connecting major cities, regions, and critical infrastructure with redundancy and high availability requirements.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">International Corridors</h3>
            <p className="text-slate-700 text-sm">Cross-border systems connecting countries, continents, and global gateway points with regulatory compliance and geopolitical considerations.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Data Center Interconnects</h3>
            <p className="text-slate-700 text-sm">High-capacity links between data center campuses supporting replication, disaster recovery, and cloud service delivery across regions.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Content Distribution Networks</h3>
            <p className="text-slate-700 text-sm">Optimized fiber networks delivering video, streaming, and content services with high capacity and low latency for end users.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Submarine Cable Networks</h3>
            <p className="text-slate-700 text-sm">Undersea cable system design, landing station engineering, international gateway integration, and multi-operator requirements.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Enterprise Wide-Area Networks</h3>
            <p className="text-slate-700 text-sm">Private enterprise networks connecting global locations with dedicated capacity, security, and performance guarantees.</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Key Design Considerations" subtitle="Critical Success Factors" isDark themeColor="orange">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-orange-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Signal Integrity & Reach</h4>
              <p className="text-slate-300 text-sm">Comprehensive link budget analysis ensuring signal reaches destination with sufficient margin for aging fiber and environmental variations.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-orange-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Redundancy Architecture</h4>
              <p className="text-slate-300 text-sm">Diverse routing, protection switching mechanisms, and mesh topologies designed for survivability and rapid recovery from failures.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-orange-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Scalability & Growth</h4>
              <p className="text-slate-300 text-sm">Infrastructure supporting capacity upgrades without network redesign, enabling evolution from current to future needs over 10-15 year lifecycle.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-lg">
            <span className="text-orange-300 font-bold text-xl flex-shrink-0">✓</span>
            <div>
              <h4 className="font-semibold text-white">Cost Optimization</h4>
              <p className="text-slate-300 text-sm">Equipment selection, fiber routing, and site acquisition strategies optimized for total cost of ownership while maintaining performance and reliability.</p>
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Why Choose Our Optical Solutions" subtitle="What Sets Us Apart" themeColor="orange">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex gap-4 items-start">
            <span className="text-orange-600 font-bold text-xl flex-shrink-0">→</span>
            <div>
              <h4 className="font-semibold text-slate-900">Deep Technical Expertise</h4>
              <p className="text-slate-700 text-sm">Experience designing networks for major carriers, ISPs, data centers, and enterprises globally, spanning all network types and technologies.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-600 font-bold text-xl flex-shrink-0">→</span>
            <div>
              <h4 className="font-semibold text-slate-900">Proven Success Track Record</h4>
              <p className="text-slate-700 text-sm">Successfully delivered national backbones, international corridors, data center networks, and enterprise solutions operating reliably at scale.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-600 font-bold text-xl flex-shrink-0">→</span>
            <div>
              <h4 className="font-semibold text-slate-900">Cost-Effective Designs</h4>
              <p className="text-slate-700 text-sm">Optimized solutions that deliver required capacity and reliability while controlling capital expenditure and operational costs.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-600 font-bold text-xl flex-shrink-0">→</span>
            <div>
              <h4 className="font-semibold text-slate-900">Future-Ready Architecture</h4>
              <p className="text-slate-700 text-sm">Designs that accommodate evolving technologies, standards, and capacity requirements over network's 10-15 year lifespan.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-600 font-bold text-xl flex-shrink-0">→</span>
            <div>
              <h4 className="font-semibold text-slate-900">Regulatory & Compliance Navigation</h4>
              <p className="text-slate-700 text-sm">Expert guidance through international regulations, right-of-way requirements, environmental approvals, and licensing across jurisdictions.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-600 font-bold text-xl flex-shrink-0">→</span>
            <div>
              <h4 className="font-semibold text-slate-900">Comprehensive Documentation</h4>
              <p className="text-slate-700 text-sm">Complete technical specifications, vendor requirements, implementation roadmaps, and operational procedures for successful deployment.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-600 font-bold text-xl flex-shrink-0">→</span>
            <div>
              <h4 className="font-semibold text-slate-900">Ongoing Support & Optimization</h4>
              <p className="text-slate-700 text-sm">Deployment oversight, commissioning support, and post-launch optimization ensuring network achieves designed performance and reliability.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-600 font-bold text-xl flex-shrink-0">→</span>
            <div>
              <h4 className="font-semibold text-slate-900">Vendor-Neutral Approach</h4>
              <p className="text-slate-700 text-sm">Objective equipment recommendations and system architecture independent of vendor relationships, ensuring best value for your investment.</p>
            </div>
          </div>
        </div>
      </ServiceSection>

      <Section className="bg-white relative py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Transform Your Optical Infrastructure?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Contact us today for network planning, feasibility studies, system design, regulatory support, and full implementation services for your long-haul optical network.
          </p>
          <Link to="/contact">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all">
              Request a Consultation <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>

      <CTA
        title="Ready to Design Your Long-Haul Optical Network?"
        description="Contact us for network planning, feasibility studies, system design, equipment selection, regulatory support, and implementation services"
      />
    </>
  );
}

