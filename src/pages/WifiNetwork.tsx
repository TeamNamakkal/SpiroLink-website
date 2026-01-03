
import { Section, SectionHeading } from '../components/ui/Section';
import { ServiceHero, ServiceSection, ServiceCard, CTA } from '../components/ServiceDetailLayout';

const rotate3dClasses = ['rotate-3d-1', 'rotate-3d-2', 'rotate-3d-3', 'rotate-3d-4', 'rotate-3d-5'];
const getRotateClass = (idx: number) => rotate3dClasses[idx % rotate3dClasses.length];

export default function WifiNetwork() {
  return (
    <>
      <ServiceHero
        title="Enterprise Wi-Fi Network Design Services"
        description="Professional wireless network planning delivering predictable performance, scalability, and operational reliability for organizations of all sizes"
        badge="Enterprise Wi-Fi Infrastructure"
        badgeIcon="📶"
        themeColor="purple"
      />

      <Section className="bg-white relative py-16">
        <SectionHeading
          title="Enterprise Wi-Fi Network Design"
          subtitle="Professional Wireless Infrastructure Planning"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-8">
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            We design Wi-Fi networks that perform consistently under real load, real interference, and real 
            usage patterns. Our approach integrates RF engineering, network architecture, security, and 
            operational resilience into comprehensive designs that meet your specific requirements.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            Whether supporting corporate campuses, healthcare facilities, educational institutions, 
            hospitality venues, manufacturing environments, or public spaces, we deliver reliable wireless 
            infrastructure that scales with your business needs.
          </p>
        </div>
      </Section>

      <ServiceSection title="Core Services" subtitle="Technical Expertise" isDark={false} themeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ServiceCard 
            icon="📡"
            title="Enterprise Wi-Fi Network Design"
            description="Site surveys, RF coverage planning, AP placement optimization, channel and power planning, controller architecture, roaming and handoff optimization"
          />
          <ServiceCard 
            icon="⚡"
            title="Wi-Fi 6/6E/7 Planning"
            description="802.11ax implementation, 6 GHz spectrum planning, Wi-Fi 7 readiness, OFDMA and MU-MIMO optimization, Target Wake Time for IoT, WPA3 security"
          />
          <ServiceCard 
            icon="🔒"
            title="Network Security & Policy Design"
            description="Secure SSID architecture, WPA3-Enterprise, 802.1X authentication, guest network isolation, role-based access control, compliance planning"
          />
          <ServiceCard 
            icon="📊"
            title="Wi-Fi Performance & Migration"
            description="RF interference analysis, spectrum management, application performance monitoring, legacy system assessment, phased deployment planning, ROI analysis"
          />
        </div>
      </ServiceSection>

      <ServiceSection title="Industries & Environments We Serve" subtitle="Enterprise Solutions Across Sectors">
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 slide-left-right">
            {[
              { title: "Corporate & Enterprise", desc: "Headquarters, regional offices, multi-floor buildings, open office layouts, and distributed campus environments supporting BYOD.", color: "from-purple-50 to-indigo-50", border: "border-purple-200" },
              { title: "Healthcare Facilities", desc: "Hospitals, medical centers, clinics, and medical campuses supporting clinical applications, medical devices, and RTLS systems.", color: "from-rose-50 to-pink-50", border: "border-rose-200" },
              { title: "Education Institutions", desc: "K-12 schools, colleges, universities, libraries, and research facilities enabling digital learning and 1:1 device programs.", color: "from-blue-50 to-purple-50", border: "border-blue-200" },
              { title: "Hospitality & Tourism", desc: "Hotels, resorts, casinos, theme parks, and restaurants delivering seamless guest experiences and operational efficiency.", color: "from-amber-50 to-orange-50", border: "border-amber-200" },
              { title: "Retail & Commercial", desc: "Retail stores, shopping malls, restaurants, and commercial buildings supporting point-of-sale and customer engagement.", color: "from-lime-50 to-green-50", border: "border-lime-200" },
              { title: "Manufacturing & Warehousing", desc: "Factories, distribution centers, and logistics facilities supporting mobile devices, AGVs, and industrial IoT systems.", color: "from-slate-100 to-slate-200", border: "border-slate-300" }
            ].map((item, idx) => (
              <div key={idx} className={`group relative ${getRotateClass(idx)} flex-shrink-0 w-80`}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`relative p-6 bg-gradient-to-br ${item.color} rounded-lg border ${item.border} hover:border-purple-400/50 transition-all duration-300 card-glow`}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">{item.title}</h3>
                  <p className="text-slate-700 group-hover:text-slate-800 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Why Choose Our Wi-Fi Planning Services" subtitle="What Sets Us Apart" isDark themeColor="purple">
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { title: 'RF Engineering Excellence', desc: 'Deep expertise in radio frequency design, propagation modeling, and interference mitigation' },
            { title: 'Latest Technology Expertise', desc: 'Certified in Wi-Fi 6/6E/7 design and implementation best practices' },
            { title: 'Vendor-Neutral Approach', desc: 'Objective recommendations across all major enterprise Wi-Fi platforms' },
            { title: 'High-Density Specialization', desc: 'Proven track record designing networks supporting thousands of concurrent users' },
            { title: 'Security-First Design', desc: 'Comprehensive security architecture integrated from initial planning' },
            { title: 'Predictive Accuracy', desc: 'Advanced modeling tools ensuring design meets real-world performance requirements' },
            { title: 'Future-Proof Architecture', desc: 'Scalable designs accommodating growth and technology evolution' },
            { title: 'Comprehensive Documentation', desc: 'Detailed deliverables enabling seamless implementation and management' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 bg-slate-800/50 p-4 rounded-lg">
              <span className="text-purple-300 font-bold text-xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection title="Our Design Approach" subtitle="Structured Process for Reliable Results" themeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              step: '1',
              title: 'Requirements Analysis',
              description: 'Understanding your coverage areas, user density, application requirements, security policies, and budget parameters.'
            },
            {
              step: '2',
              title: 'Site Survey & Assessment',
              description: 'Conducting predictive and active site surveys including RF measurements, interference analysis, and building assessment.'
            },
            {
              step: '3',
              title: 'RF Design & Modeling',
              description: 'Creating detailed heat maps, AP placement plans, channel assignments, and interference mitigation strategies.'
            },
            {
              step: '4',
              title: 'Network Architecture',
              description: 'Designing controller placement, management systems, authentication infrastructure, and network segmentation.'
            },
            {
              step: '5',
              title: 'Security Planning',
              description: 'Implementing authentication methods, encryption standards, and compliance requirements for your industry.'
            },
            {
              step: '6',
              title: 'Documentation & Implementation',
              description: 'Delivering comprehensive design packages, equipment specifications, and validation procedures.'
            },
          ].map((phase, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  {phase.step}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">{phase.title}</h4>
                  <p className="text-slate-700 text-sm">{phase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection title="Technical Capabilities" subtitle="Advanced Wireless Engineering" isDark={false} themeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Wi-Fi Standards & Technologies</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Wi-Fi 7 (802.11be): 46 Gbps, 320 MHz channels</li>
              <li>• Wi-Fi 6E (802.11ax 6GHz): Clean spectrum, reduced interference</li>
              <li>• Wi-Fi 6 (802.11ax): OFDMA, MU-MIMO, TWT</li>
              <li>• Frequency bands: 2.4 GHz, 5 GHz, 6 GHz</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Advanced Features & Protocols</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Fast roaming (802.11r, k, v)</li>
              <li>• Band steering and client steering</li>
              <li>• WPA3-Enterprise (802.1X/EAP)</li>
              <li>• Enhanced Open (OWE)</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Coverage & Capacity Planning</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Indoor office environments</li>
              <li>• Outdoor campus areas</li>
              <li>• Warehouse and industrial spaces</li>
              <li>• Concurrent user calculations</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Network Architectures</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Centralized controller architecture</li>
              <li>• Cloud-managed Wi-Fi solutions</li>
              <li>• Distributed/autonomous architecture</li>
              <li>• Scalability for growth</li>
            </ul>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Design Deliverables" subtitle="Complete Documentation for Implementation" themeColor="purple">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-3">Site Survey & Analysis Reports</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• RF coverage heat maps</li>
                <li>• Signal strength analysis</li>
                <li>• Interference assessment</li>
                <li>• Spectrum analysis results</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-3">Network Design Documentation</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Network architecture diagrams</li>
                <li>• AP placement plans with coordinates</li>
                <li>• Channel and power assignment tables</li>
                <li>• Controller specifications</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-3">Equipment & Implementation</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Bill of materials with part numbers</li>
                <li>• Equipment specifications</li>
                <li>• Power and cabling requirements</li>
                <li>• Installation guidelines</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-3">Validation & Support</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Post-deployment validation survey</li>
                <li>• Performance testing criteria</li>
                <li>• Acceptance procedures</li>
                <li>• Capacity expansion planning</li>
              </ul>
            </div>
          </div>
        </div>
      </ServiceSection>

      <CTA
        title="Transform Your Wireless Infrastructure"
        description="Contact us for site surveys, RF design, security planning, equipment recommendations, and full implementation support"
      />
    </>
  );
}
