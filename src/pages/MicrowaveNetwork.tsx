import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';

export default function MicrowaveNetwork() {
  return (
    <>
      {/* START: Microwave Network Module */}
      
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">MICROWAVE NETWORK DESIGN SERVICES</h1>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            Microwave networks are a proven, high-reliability communication solution for environments where fiber is unavailable, delayed, cost-prohibitive, or operationally risky. At SpiroLink, we design carrier-grade microwave networks that deliver high availability, predictable performance, and long-term operational resilience across diverse industries.
          </p>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            Our approach goes beyond individual radio links. We design end-to-end microwave systems that integrate seamlessly with fiber, IP/MPLS, and enterprise networks—ensuring reliability, scalability, and sustainability.
          </p>
          <p className="text-xl text-slate-700 mb-12 leading-relaxed">
            Delivering reliable, high-capacity microwave network solutions across telecommunications, utilities, transportation, and enterprise sectors worldwide. Whether you're a mobile operator expanding your backhaul network, a utility company monitoring power grids, or an enterprise connecting remote facilities, our expertise ensures reliable, high-performance wireless connectivity tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <button
              onClick={() => alert('Case studies: Premium microwave network deployments for Telecom operators, Utility companies, and Enterprise clients. Contact us for detailed technical case studies.')}
              className="px-8 py-4 text-lg font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
            >
              View Case Studies <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Section>

      {/* OUR CORE SERVICES */}
      <Section className="bg-white">
        <SectionHeading
          title="OUR CORE SERVICES"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Network Planning & Design</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Comprehensive site surveys and path analysis</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Frequency planning and spectrum optimization</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Link budget calculations and performance modeling</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Network topology design and optimization</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Interference analysis and mitigation strategies</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Microwave Link Engineering</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Point-to-point and point-to-multipoint solutions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Licensed and unlicensed band expertise (6 GHz to 86 GHz)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Capacity planning from 10 Mbps to multi-gigabit links</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Weather impact analysis and fade margin calculations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Redundancy and resilience design</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Regulatory & Compliance</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Frequency licensing coordination and application support</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Regulatory compliance documentation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>International standards adherence (ITU, ETSI, FCC)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Spectrum management consulting</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Cross-border frequency coordination</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Implementation Support</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Detailed technical documentation and specifications</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Equipment selection and vendor evaluation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Installation supervision and quality assurance</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Network commissioning and acceptance testing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Performance optimization and troubleshooting</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* INDUSTRIES WE SERVE */}
      <Section className="bg-slate-50">
        <SectionHeading
          title="INDUSTRIES WE SERVE"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Telecommunications & Mobile Operators</h3>
            <p className="text-slate-700">Design and optimize 4G/5G backhaul networks, inter-cell site connectivity, core network links, and rural coverage expansion. We understand the demanding requirements of mobile operators and deliver solutions that support high-capacity, low-latency communications.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Internet Service Providers (ISPs)</h3>
            <p className="text-slate-700">Enable last-mile connectivity, backbone infrastructure, fixed wireless access networks, and rural broadband deployment. Our designs help ISPs expand coverage economically while maintaining service quality.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Utilities & Energy Sector</h3>
            <p className="text-slate-700">Connect power grid monitoring systems, SCADA networks, smart grid communications, pipeline monitoring, substation interconnections, and renewable energy sites (wind farms, solar plants). Ensure reliable communication for critical infrastructure.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Transportation & Logistics</h3>
            <p className="text-slate-700">Support railway communication systems, highway monitoring networks, port and airport communications, traffic management systems, and metro/transit authority networks with resilient wireless connectivity.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Banking & Finance</h3>
            <p className="text-slate-700">Provide reliable connectivity for branch interconnections, ATM networks, data center redundancy links, and high-frequency trading networks where uptime is critical.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Media & Broadcasting</h3>
            <p className="text-slate-700">Engineer studio-to-transmitter links (STL), outside broadcast connections, news gathering backhaul, and live event coverage solutions with the bandwidth and reliability broadcasters demand.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise & Corporate</h3>
            <p className="text-slate-700">Connect campus facilities, building-to-building links, remote offices, and manufacturing plants with dedicated microwave solutions.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Healthcare</h3>
            <p className="text-slate-700">Design hospital campus networks, telemedicine connectivity, multi-facility healthcare systems, and remote clinic connections that support critical healthcare operations.</p>
          </div>
        </div>
      </Section>

      {/* WHY CHOOSE OUR MICROWAVE SOLUTIONS */}
      <Section className="bg-white">
        <SectionHeading
          title="WHY CHOOSE OUR MICROWAVE SOLUTIONS"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
          <div className="flex gap-4 items-start">
            <span className="text-green-600 text-2xl font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Proven Multi-Industry Expertise</h4>
              <p className="text-slate-700">Deep experience across telecommunications, utilities, government, enterprise, and specialized sectors worldwide</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-green-600 text-2xl font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Cost-Effective Solutions</h4>
              <p className="text-slate-700">Optimized designs that maximize ROI while meeting performance requirements</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-green-600 text-2xl font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Future-Proof Designs</h4>
              <p className="text-slate-700">Scalable infrastructure supporting bandwidth growth and evolving technology standards</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-green-600 text-2xl font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">All-Weather Reliability</h4>
              <p className="text-slate-700">Comprehensive fade margin analysis ensuring performance in rain, fog, and extreme conditions</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-green-600 text-2xl font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Rapid Deployment</h4>
              <p className="text-slate-700">Streamlined design processes and project management for accelerated implementation timelines</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-green-600 text-2xl font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Comprehensive Support</h4>
              <p className="text-slate-700">From initial planning through commissioning and ongoing optimization</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-green-600 text-2xl font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Regulatory Navigation</h4>
              <p className="text-slate-700">Expert guidance through complex licensing and compliance requirements across jurisdictions</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-green-600 text-2xl font-bold flex-shrink-0">✓</span>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Vendor-Neutral Approach</h4>
              <p className="text-slate-700">Objective equipment recommendations based on your specific technical and budgetary needs</p>
            </div>
          </div>
        </div>
      </Section>

      {/* OUR DESIGN APPROACH */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50">
        <SectionHeading
          title="OUR DESIGN APPROACH"
          centered={true}
        />
        <div className="max-w-4xl mx-auto mt-12">
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Requirements Analysis</h4>
                <p className="text-slate-700">We begin by understanding your connectivity requirements, bandwidth needs, coverage areas, budget constraints, and regulatory environment.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Site Assessment</h4>
                <p className="text-slate-700">Comprehensive surveys including terrain analysis, line-of-sight verification, interference studies, and environmental considerations.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Network Design</h4>
                <p className="text-slate-700">Detailed engineering including frequency planning, link budget analysis, capacity modeling, redundancy design, and equipment specifications.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Documentation</h4>
                <p className="text-slate-700">Complete technical deliverables including network diagrams, equipment lists, installation specifications, frequency applications, and test procedures.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Implementation Support</h4>
                <p className="text-slate-700">Ongoing assistance during procurement, installation, commissioning, and optimization phases.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TECHNICAL CAPABILITIES */}
      <Section className="bg-white">
        <SectionHeading
          title="TECHNICAL CAPABILITIES"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h4 className="text-xl font-bold text-slate-900 mb-4">Frequency Bands</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>6 GHz to 86 GHz coverage</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Licensed spectrum (including coordination services)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Unlicensed spectrum (5 GHz, 60 GHz, etc.)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Multi-band hybrid solutions</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h4 className="text-xl font-bold text-slate-900 mb-4">Capacity Range</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>10 Mbps to 10+ Gbps per link</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Aggregated multi-link solutions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Adaptive modulation support</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Traffic engineering and QoS design</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h4 className="text-xl font-bold text-slate-900 mb-4">Standards & Compliance</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>ITU-R recommendations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>ETSI standards</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>FCC regulations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Regional regulatory frameworks</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Industry-specific requirements</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <h4 className="text-xl font-bold text-slate-900 mb-4">Network Architectures</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Point-to-point links</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Point-to-multipoint systems</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Ring and mesh topologies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Hybrid fiber-microwave networks</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* WHAT YOU GET */}
      <Section className="bg-slate-50">
        <SectionHeading
          title="WHAT YOU GET"
          subtitle="Comprehensive Design Package"
          centered={true}
        />
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Network topology diagrams</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Detailed link budget calculations</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Frequency and channel plans</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Equipment specifications and bill of materials</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Installation and mounting specifications</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Path profile analysis with Fresnel zone clearance</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Interference analysis reports</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Regulatory documentation and frequency applications</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Project timeline and implementation plan</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold">→</span>
              <span className="text-slate-700">Testing and commissioning procedures</span>
            </div>
          </div>
        </div>
      </Section>

      {/* GET STARTED */}
      <Section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">GET STARTED</h2>
          <p className="text-xl mb-12 text-green-50">
            Ready to build reliable wireless infrastructure for your organization? Contact us today for:
          </p>
          <ul className="text-lg mb-12 space-y-2 text-green-100">
            <li>✓ Free initial consultation</li>
            <li>✓ Network feasibility assessment</li>
            <li>✓ Project scoping and quotation</li>
            <li>✓ Technical discussions with our engineering team</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="text-green-600 hover:bg-gray-50 shadow-lg hover:shadow-xl px-8 py-4 text-lg font-semibold">
                Contact Us <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <button
              onClick={() => alert('Request a Quote functionality coming soon. Contact us directly at hello@spirolink.com')}
              className="px-8 py-4 text-lg font-semibold rounded-lg bg-white text-green-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
            >
              Request a Quote <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <Section className="bg-white">
        <SectionHeading
          title="FREQUENTLY ASKED QUESTIONS"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-12 space-y-6">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Q: How long does a typical microwave network design project take?</h4>
            <p className="text-slate-700">A: Project timelines vary based on complexity, but typical designs range from 2-8 weeks depending on network size and regulatory requirements.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Q: Do you only work with mobile operators?</h4>
            <p className="text-slate-700">A: No, we serve diverse industries including telecommunications, utilities, transportation, government, enterprise, and more.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Q: What frequency bands do you work with?</h4>
            <p className="text-slate-700">A: We design networks across all common microwave bands from 6 GHz to 86 GHz, both licensed and unlicensed.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Q: Do you provide installation services?</h4>
            <p className="text-slate-700">A: We focus on design and engineering services, but provide comprehensive implementation support and can recommend qualified installation partners.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Q: Can you help with frequency licensing?</h4>
            <p className="text-slate-700">A: Yes, we provide frequency coordination services and prepare all necessary documentation for regulatory applications.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Q: What geographic areas do you serve?</h4>
            <p className="text-slate-700">A: We work with clients globally and have experience with regulatory frameworks worldwide.</p>
          </div>
        </div>
      </Section>

      {/* CONTACT SECTION */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50">
        <SectionHeading
          title="READY FOR YOUR MICROWAVE NETWORK SOLUTION?"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600 flex items-center gap-4">
            <Mail className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900">Email</h4>
              <p className="text-slate-700">spirolink.com</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border-l-4 border-green-600 flex items-center gap-4">
            <Phone className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900">Phone</h4>
              <p className="text-slate-700">(555) 789-0123</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link to="/contact">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Send Us a Message <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* PLACEHOLDER SECTIONS */}
      <div className="hidden">
        {/* YouTube Videos Placeholder - Link when videos are ready */}
        {/* <a href="https://youtube.com/channel/YOUR_CHANNEL">Video Resources</a> */}
        
        {/* Optimization Page Placeholder - Link when optimization page is created */}
        {/* <Link to="/microwave-network-optimization">Network Optimization</Link> */}
        
        {/* Case Studies Placeholder - Link when case studies are available */}
        {/* <Link to="/case-studies">View Case Studies</Link> */}
      </div>

      {/* END: Microwave Network Module */}
    </>
  );
}
