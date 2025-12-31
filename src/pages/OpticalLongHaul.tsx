import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';

// START: Long-Haul Optical Network Planning Page

export default function OpticalLongHaul() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Designing Resilient Optical Transport Networks for Long-Haul Infrastructure
          </h1>
          <p className="text-xl text-slate-700 mb-4 leading-relaxed">
            High-Capacity Fiber Optic Infrastructure For Global Connectivity
          </p>
          <p className="text-lg text-slate-700 mb-12 leading-relaxed">
            Designing scalable, high-performance longhaul optical networks for carriers, enterprises, and data center operators worldwide. From metro to ultra-longhaul deployments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <button
              onClick={() => alert('Portfolio: National Carrier Backbone (4,500 km), Multi-Data Center Interconnect (1,200 km), Regional ISP Upgrades, International Corridors. Contact us for detailed case studies.')}
              className="px-8 py-4 text-lg font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
            >
              View Our Portfolio <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Section>

      {/* Introduction */}
      <Section className="bg-white">
        <SectionHeading
          title="INTRODUCTION"
          subtitle="Optical Network Excellence"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-12">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Long-haul optical networks form the backbone of modern digital infrastructure, connecting cities, regions, data centers, and critical services across vast distances. Designing these networks requires far more than fiber availability—it demands rigorous engineering around signal integrity, availability, scalability, and operational risk.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            We specialize in planning and designing high-capacity optical fiber networks that form the backbone of modern telecommunications infrastructure. Our longhaul optical network solutions deliver terabit-scale capacity, ultra-low latency, and exceptional reliability for carriers, internet service providers, data center operators, and large enterprises requiring robust fiber connectivity across cities, regions, and continents.
          </p>
        </div>
      </Section>

      {/* Core Services */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50">
        <SectionHeading
          title="OUR CORE SERVICES"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Longhaul Network Planning & Design</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Route planning and fiber path optimization</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Network topology design (ring, mesh, linear)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Capacity planning and traffic engineering</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Geographic redundancy and diversity routing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Right-of-way analysis and feasibility studies</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">2. DWDM System Design</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Dense Wavelength Division Multiplexing architecture</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Channel planning and wavelength assignment</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Optical amplifier placement and design (EDFA, Raman)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Coherent optical transmission design (100G, 200G, 400G, 800G+)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Optical Link Budget Engineering</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>End-to-end power budget calculations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Loss budget analysis including fiber, splices, connectors</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Gain and span design optimization</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Regeneration and amplification site planning</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Network Resilience & Protection</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Protection schemes (1+1, 1:1, 1:N)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Optical layer restoration design</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Diverse path routing strategies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Service level agreement (SLA) optimization</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Migration & Upgrade Planning</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Legacy system assessment and modernization</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Technology refresh strategies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Capacity augmentation planning</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Minimal-disruption migration designs</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Industries We Serve */}
      <Section className="bg-white">
        <SectionHeading
          title="INDUSTRIES WE SERVE"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Telecommunications Carriers</h3>
            <p className="text-slate-700">Design national and international backbone networks, metro connectivity rings, inter-city transport systems, and carrier-grade infrastructure supporting millions of subscribers.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Internet Service Providers (ISPs)</h3>
            <p className="text-slate-700">Plan backbone infrastructure, peering connections, regional network expansion, and content delivery networks with competitive service levels.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Data Center Operators</h3>
            <p className="text-slate-700">Engineer inter-datacenter connectivity (DCI), disaster recovery links, cloud interconnection, and high-speed campus connectivity.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise & Corporate</h3>
            <p className="text-slate-700">Design dedicated fiber networks for multi-site corporations, financial institutions, healthcare systems, and education networks.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Content & Cloud Providers</h3>
            <p className="text-slate-700">Build infrastructure for CDNs, cloud service providers, video streaming platforms, and hyperscale cloud operators.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Government & Utilities</h3>
            <p className="text-slate-700">Engineer secure, dedicated optical networks for government agencies, energy providers, and critical national infrastructure.</p>
          </div>
        </div>
      </Section>

      {/* Design Methodology */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50">
        <SectionHeading
          title="OUR DESIGN APPROACH"
          centered={true}
        />
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">1. Requirements Gathering</h3>
            <p className="text-slate-700">Understanding your capacity needs, latency requirements, growth projections, budget parameters, geographic coverage, redundancy expectations, and service level objectives.</p>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">2. Route Analysis</h3>
            <p className="text-slate-700">Comprehensive assessment including fiber availability studies, right-of-way analysis, existing infrastructure evaluation, and geographic diversity options.</p>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">3. Network Architecture</h3>
            <p className="text-slate-700">Detailed design including topology selection, node placement optimization, equipment specifications, protection scheme design, and network management architecture.</p>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">4. Optical System Engineering</h3>
            <p className="text-slate-700">Link budget calculations, DWDM channel planning, amplifier site design, dispersion compensation, wavelength assignment, and coherent modem configuration.</p>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">5. Economic Analysis</h3>
            <p className="text-slate-700">Capital expenditure modeling, operational cost projections, ROI calculations, build-vs-lease analysis, and phased deployment options.</p>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">6. Technical Documentation</h3>
            <p className="text-slate-700">Complete design packages including network diagrams, equipment lists, fiber specifications, splice schedules, test plans, and commissioning procedures.</p>
          </div>
        </div>
      </Section>

      {/* Technical Capabilities */}
      <Section className="bg-white">
        <SectionHeading
          title="TECHNICAL CAPABILITIES"
          centered={true}
        />
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Transmission Technologies</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>100G, 200G, 400G, 800G coherent optical</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Advanced modulation formats (DP-QPSK, DP-16QAM, DP-64QAM)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Flexible grid and super-channel design</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Alien wavelength support</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Network Reach</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Metro:</strong> Up to 80 km (amplified)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Regional:</strong> 80-600 km</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Longhaul:</strong> 600-2,500 km</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span><strong>Ultra-longhaul:</strong> 2,500+ km</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Fiber Types</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>G.652 (Standard Single-Mode)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>G.653 (Dispersion-Shifted)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>G.654 (Cut-off Shifted)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>G.655 (Non-Zero Dispersion-Shifted)</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Capacity Planning</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Single fiber: Up to 25+ Tbps (C+L band)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Multi-fiber systems: 100+ Tbps</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Scalable wavelength addition</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Pay-as-you-grow architectures</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Network Types */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50">
        <SectionHeading
          title="NETWORK TYPES WE DESIGN"
          centered={true}
        />
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Metro Optical Networks</h3>
            <p className="text-slate-700">High-density urban networks connecting central offices, cell sites, enterprise locations, and access networks with low-latency, high-capacity fiber rings.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Regional Networks</h3>
            <p className="text-slate-700">Mid-haul networks spanning 80-600 km connecting cities, data centers, and carrier points of presence within geographic regions.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-3">National Backbone</h3>
            <p className="text-slate-700">Long-haul networks spanning countries and regions, forming the core transport infrastructure for carriers and national network operators.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Data Center Interconnect (DCI)</h3>
            <p className="text-slate-700">Dedicated high-capacity links between data centers for storage replication, disaster recovery, cloud interconnection, and distributed computing.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Private Enterprise Networks</h3>
            <p className="text-slate-700">Dedicated fiber infrastructure for corporations, financial institutions, healthcare systems, and government agencies requiring secure private connectivity.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-3">International Corridors</h3>
            <p className="text-slate-700">Ultra-long-haul networks crossing borders and continents, connecting submarine cable landing stations and international gateway facilities.</p>
          </div>
        </div>
      </Section>

      {/* Key Considerations */}
      <Section className="bg-white">
        <SectionHeading
          title="KEY DESIGN CONSIDERATIONS"
          centered={true}
        />
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Capacity & Scalability</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Current and 10-year traffic forecasts</li>
              <li>• Modular capacity addition strategies</li>
              <li>• Line system upgrade paths</li>
              <li>• Wavelength addition without service disruption</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Latency Optimization</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Direct routing vs. cost-optimized paths</li>
              <li>• Geographic route selection</li>
              <li>• Processing and equipment delay budgets</li>
              <li>• Ultra-low latency requirements (finance, gaming)</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Reliability & Availability</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Target availability (99.9%, 99.99%, 99.999%)</li>
              <li>• Geographic diversity requirements</li>
              <li>• Equipment and fiber protection schemes</li>
              <li>• Mean time to repair (MTTR) considerations</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Cost Efficiency</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Build vs. lease analysis</li>
              <li>• Shared infrastructure opportunities</li>
              <li>• Equipment cost optimization</li>
              <li>• Operational expense reduction strategies</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50">
        <SectionHeading
          title="WHY CHOOSE OUR OPTICAL NETWORK SOLUTIONS"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-12">
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Terabit-Scale Expertise</h3>
                <p className="text-slate-700">Proven experience designing networks from 100G to multi-terabit capacity per fiber</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Advanced DWDM Knowledge</h3>
                <p className="text-slate-700">Deep expertise in latest coherent optical technologies and wavelength multiplexing systems</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Vendor-Neutral Design</h3>
                <p className="text-slate-700">Objective recommendations across leading optical equipment manufacturers</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Future-Proof Architecture</h3>
                <p className="text-slate-700">Scalable designs accommodating 10+ year technology evolution</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Cost Optimization</h3>
                <p className="text-slate-700">Balanced designs minimizing capex and opex while meeting performance targets</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Global Standards Compliance</h3>
                <p className="text-slate-700">Adherence to ITU-T, IEEE, OIF, and industry best practices</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Rapid Network Deployment</h3>
                <p className="text-slate-700">Streamlined planning processes reducing time-to-service</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Comprehensive Documentation</h3>
                <p className="text-slate-700">Complete technical deliverables for seamless implementation</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Project Lifecycle Support */}
      <Section className="bg-white">
        <SectionHeading
          title="PROJECT LIFECYCLE SUPPORT"
          centered={true}
        />
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Pre-Planning Phase</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Feasibility studies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Technology assessments</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Preliminary route analysis</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Budget estimation</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Design Phase</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Detailed engineering</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Equipment selection</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Vendor negotiations support</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Permitting assistance</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Implementation Phase</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Installation oversight</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Quality assurance</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Commissioning support</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Acceptance testing</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Operations Phase</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Performance monitoring design</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Optimization recommendations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Capacity expansion planning</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Technology refresh strategies</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Case Studies */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50">
        <SectionHeading
          title="CASE STUDY EXAMPLES"
          centered={true}
        />
        <div className="max-w-4xl mx-auto mt-12 space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-3">National Carrier Backbone Expansion</h3>
            <p className="text-slate-700">Designed 4,500 km coherent 400G backbone network across 12 major cities, delivering 9.6 Tbps capacity with 99.999% availability and diverse routing.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Data Center Interconnect</h3>
            <p className="text-slate-700">Engineered 200G DCI network connecting 8 hyperscale data centers across 1,200 km with sub-2ms latency for real-time replication and distributed computing.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Regional ISP Network Upgrade</h3>
            <p className="text-slate-700">Migrated legacy 10G DWDM system to flexible grid 200G architecture, quadrupling capacity while reducing cost-per-bit by 65%.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-3">International Corridor Design</h3>
            <p className="text-slate-700">Planned 2,800 km ultra-longhaul C+L band system delivering 15 Tbps between submarine cable landing stations with alien wavelength support.</p>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section className="bg-white">
        <SectionHeading
          title="FREQUENTLY ASKED QUESTIONS"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-12 space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-2">Q: What's the typical timeline for optical network design projects?</h3>
            <p className="text-slate-700">A: Projects range from 4-16 weeks depending on network complexity, geographic scope, and level of detail required.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-2">Q: What's the difference between metro, regional, and longhaul?</h3>
            <p className="text-slate-700">A: Metro networks serve urban areas up to 80 km, regional networks span 80-600 km, longhaul covers 600-2,500 km, and ultra-longhaul extends beyond 2,500 km.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-2">Q: Can you design networks using existing fiber infrastructure?</h3>
            <p className="text-slate-700">A: Yes, we specialize in both greenfield designs and brownfield upgrades leveraging existing fiber assets.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-2">Q: Do you support submarine cable integration?</h3>
            <p className="text-slate-700">A: Yes, we design terrestrial networks that interface with submarine cable systems at landing stations.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-2">Q: What capacity can modern optical networks support?</h3>
            <p className="text-slate-700">A: Current technology supports 100-800G per wavelength, with 96+ wavelengths per fiber, achieving 25+ Tbps per fiber pair in C+L band systems.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-2">Q: How do you ensure network redundancy?</h3>
            <p className="text-slate-700">A: We design diverse routing, implement protection switching, specify redundant equipment, and plan geographic diversity to meet your availability targets.</p>
          </div>
        </div>
      </Section>

      {/* Get Started CTA */}
      <Section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Next-Generation Optical Infrastructure?</h2>
          <p className="text-xl mb-12">
            Contact us today for complimentary feasibility assessment, network capacity analysis, route and topology recommendations, project scoping and quotation, and technical consultation with our optical engineering team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="text-green-600 hover:bg-gray-50 shadow-lg hover:shadow-xl px-8 py-4 text-lg font-semibold">
                Contact Us <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <button
              onClick={() => alert('Proposal request submitted. Our team will contact you within 24 hours with customized options.')}
              className="px-8 py-4 text-lg font-semibold rounded-lg bg-white text-green-600 hover:bg-gray-50 active:scale-95 shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
            >
              Request Proposal <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => alert('Scheduling consultation. Select your preferred time slot below.')}
              className="px-8 py-4 text-lg font-semibold rounded-lg bg-white text-green-600 hover:bg-gray-50 active:scale-95 shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
            >
              Schedule Consultation <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Section>

      {/* Download Resources */}
      <Section className="bg-white">
        <SectionHeading
          title="DOWNLOAD RESOURCES"
          centered={true}
        />
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => alert('White Paper: "Planning High-Capacity Optical Networks" - Download starting...')}
            className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg hover:shadow-lg transition-shadow text-left cursor-pointer"
          >
            <h3 className="font-bold text-slate-900 mb-2">📄 White Paper</h3>
            <p className="text-slate-700">"Planning High-Capacity Optical Networks"</p>
          </button>

          <button
            onClick={() => alert('Guide: "DWDM System Design Best Practices" - Download starting...')}
            className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg hover:shadow-lg transition-shadow text-left cursor-pointer"
          >
            <h3 className="font-bold text-slate-900 mb-2">📋 Guide</h3>
            <p className="text-slate-700">"DWDM System Design Best Practices"</p>
          </button>

          <button
            onClick={() => alert('Checklist: "Longhaul Network Planning Considerations" - Download starting...')}
            className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg hover:shadow-lg transition-shadow text-left cursor-pointer"
          >
            <h3 className="font-bold text-slate-900 mb-2">✓ Checklist</h3>
            <p className="text-slate-700">"Longhaul Network Planning Considerations"</p>
          </button>

          <button
            onClick={() => alert('Case Studies: "Successful Optical Network Deployments" - Download starting...')}
            className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg hover:shadow-lg transition-shadow text-left cursor-pointer"
          >
            <h3 className="font-bold text-slate-900 mb-2">📊 Case Studies</h3>
            <p className="text-slate-700">"Successful Optical Network Deployments"</p>
          </button>
        </div>
      </Section>

      {/* Contact Info Footer */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50">
        <SectionHeading
          title="Let's Talk"
          subtitle="Optical Network Excellence"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-12">
          <p className="text-lg text-slate-700 text-center mb-8">
            If you are planning, upgrading, or operating a long-haul optical transport network, we can support your engineering and planning objectives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a href="mailto:hello@spirolink.com" className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Email</h3>
              <p className="text-green-600 hover:text-green-700 font-medium">hello@spirolink.com</p>
            </a>

            <a href="tel:+15551234567" className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Phone</h3>
              <p className="text-green-600 hover:text-green-700 font-medium">(555) 123-4567</p>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

// END: Long-Haul Optical Network Planning Page

