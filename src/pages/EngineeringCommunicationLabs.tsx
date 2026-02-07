import { Section, SectionHeading } from '../components/ui/Section';
import { ServiceHero, ServiceSection, CTA } from '../components/ServiceDetailLayout';

const rotate3dClasses = ['rotate-3d-1', 'rotate-3d-2', 'rotate-3d-3', 'rotate-3d-4', 'rotate-3d-5'];
const getRotateClass = (idx: number) => rotate3dClasses[idx % rotate3dClasses.length];

export default function EngineeringCommunicationLabs() {
  return (
    <>
      <ServiceHero
        title="Industry-Grade Communication & Networking Labs for Engineering Institutions"
        description="Bridging Classroom Theory with Real-World Engineering Practice. The future engineer must build and operate real-world communication systems, not just understand them. We design and deploy industry-grade laboratories that give students hands-on exposure and industry-ready skills."
        badge="Engineering Communication & Networking Labs"
        badgeIcon=""
        themeColor="cyan"
      />

      <Section className="bg-white relative py-16">
        <SectionHeading
          title="Engineering Programs Prepared for Real-World Technology Environments"
          subtitle="Complete Learning Ecosystems for Academic Institutions"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-8">
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            Engineering programs today aim to prepare graduates for real-world technology environments, where communication networks, wireless systems, cloud infrastructure, and automation platforms form the backbone of industry operations. However, bridging theoretical learning with practical engineering exposure requires modern laboratory infrastructure, structured experiments, and industry-aligned training frameworks.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            SpiroLink designs and delivers advanced communication and networking laboratories that replicate real industry environments inside academic institutions. We provide not just equipment, but complete learning ecosystems—hardware, software, curriculum, faculty enablement, and ongoing support—so students graduate with hands-on engineering competence, not just academic knowledge.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            Our laboratory solutions are engineered to align with current industry practices across telecom, networking, cloud, IoT, cybersecurity, and automation domains, ensuring institutions meet accreditation expectations, improve placement outcomes, and build strong industry partnerships.
          </p>
        </div>
      </Section>

      <ServiceSection title="The Challenge: Bridging Academic Learning and Industry Practice" subtitle="The Gap Between Theory and Real-World Operations" isDark={false} themeColor="cyan">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Laboratory Infrastructure Lags Behind Industry:</span> Lab infrastructure often lags behind industry by several years due to procurement cycles, funding approvals, and curriculum update timelines.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Theory Without Hands-On Exposure:</span> Students understand theory but have limited structured exposure to configuring real routers, radios, fiber systems, cloud platforms, and security appliances at scale.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Demonstration Labs vs. Hands-On Learning:</span> Labs are frequently designed for demonstrations rather than continuous hands-on experimentation for every student.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Faculty Knowledge Gaps:</span> Faculty development cycles often trail industry deployment cycles, limiting exposure to emerging platforms and operational practices.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Accreditation & Placement Pressure:</span> Modern accreditation frameworks increasingly evaluate experiential learning outcomes, industry alignment, and infrastructure maturity. Recruiters expect graduates with hands-on skills, lab project portfolios, and familiarity with real engineering workflows.</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Where SpiroLink Takes Responsibility" subtitle="Complete Laboratory System Delivery" isDark={false} themeColor="cyan">
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 slide-left-right">
            {[
              { title: "End-to-End Laboratory Architecture & Design", desc: "We design lab layouts, power and networking architecture, rack planning, and student workflow models optimized for learning and scalability.", color: "from-cyan-50 to-blue-50", border: "border-cyan-200" },
              { title: "Industry-Standard Equipment Sourcing", desc: "We procure vendor-certified, industry-relevant hardware and software platforms aligned with current telecom, networking, cloud, and automation deployments.", color: "from-blue-50 to-sky-50", border: "border-blue-200" },
              { title: "Installation, Integration, and Commissioning", desc: "We install, configure, integrate, and validate all systems, delivering fully operational labs with acceptance testing and performance benchmarks.", color: "from-sky-50 to-cyan-50", border: "border-sky-200" },
              { title: "Industry-Aligned Curriculum & Experiment Design", desc: "We develop structured experiments, course modules, and hands-on workflows mapped to real-world engineering roles and certification frameworks.", color: "from-cyan-50 to-indigo-50", border: "border-cyan-200" },
              { title: "Faculty Enablement & Certification Support", desc: "We train faculty on equipment operation, teaching methodologies, troubleshooting, and industry best practices, with optional certification pathways.", color: "from-indigo-50 to-blue-50", border: "border-indigo-200" },
              { title: "Student Workshops & Industry Projects", desc: "We conduct bootcamps, project mentorship programs, industry challenges, and guided capstone project frameworks to accelerate job readiness.", color: "from-slate-100 to-slate-200", border: "border-slate-300" }
            ].map((item, idx) => (
              <div key={idx} className={`group relative ${getRotateClass(idx)} flex-shrink-0 w-80`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`relative p-6 bg-gradient-to-br ${item.color} rounded-lg border ${item.border} hover:border-cyan-400/50 transition-all duration-300 card-glow`}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">{item.title}</h3>
                  <p className="text-slate-700 group-hover:text-slate-800 transition-colors text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Core Industry-Focused Lab Domains" subtitle="Modular and Scalable Labs Aligned with Real Industry Verticals" isDark={false} themeColor="cyan">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700">• Microwave & Wireless Backhaul Networks • Satellite & Remote Connectivity Systems • Advanced WiFi 6/6E/7 Wireless Engineering • Fiber Optics, GPON & XGS-PON Systems</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700">• GIS-Based Telecom Network Planning • Private 5G & Edge Computing Networks • Software-Defined Networking & Network Automation • Network Security & SOC Training Labs</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700">• Cloud Infrastructure & Hybrid Networking • Industrial Automation & IIoT Systems • Smart City & Public Infrastructure Networks • Broadcast, Streaming & Media Networks</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="The SpiroLink Advantage" subtitle="Engineering Education Labs" isDark themeColor="cyan">
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { title: 'Industry-Embedded Engineering Education', desc: 'We design labs based on real operator, vendor, and enterprise deployments, not textbooks.' },
            { title: 'Curriculum + Equipment + Faculty Enablement', desc: 'Most vendors sell hardware. We deliver learning outcomes, documentation, training, and industry readiness.' },
            { title: 'Vendor-Neutral Architecture', desc: 'We recommend technology based on educational outcomes and budget, not vendor incentives.' },
            { title: 'Accreditation-Ready Infrastructure', desc: 'Designed to meet NBA, NAAC, ABET, NIRF, and global ranking criteria.' },
            { title: 'Placement-Oriented Learning', desc: 'Experiments mapped directly to telecom, networking, cloud, cybersecurity, and automation job roles.' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 bg-slate-800/50 p-4 rounded-lg">
              <span className="font-bold text-xl flex-shrink-0" style={{color: '#0C94CE'}}>✓</span>
              <div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection title="Design Approach" subtitle="Six Phases to Industry-Ready Labs" isDark={false} themeColor="cyan">
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              step: '1',
              title: 'Academic & Infrastructure Assessment',
              description: 'Program structure and enrollment analysis, existing lab evaluation, accreditation and placement objectives, budget and roadmap alignment'
            },
            {
              step: '2',
              title: 'Lab Architecture & Curriculum Design',
              description: 'Lab topology and floor layout, equipment specifications and BOM, experiment frameworks and learning outcomes, phased deployment roadmap'
            },
            {
              step: '3',
              title: 'Deployment & Commissioning',
              description: 'Equipment procurement and installation, network integration and testing, safety, power, and cooling compliance, documentation and acceptance testing'
            },
            {
              step: '4',
              title: 'Faculty Enablement',
              description: 'Intensive hands-on faculty training, teaching methodology frameworks, certification support, continuous knowledge updates'
            },
            {
              step: '5',
              title: 'Student Industry Exposure',
              description: 'Workshops and bootcamps, industry project mentorship, internship and placement preparation'
            },
            {
              step: '6',
              title: 'Ongoing Support',
              description: 'Preventive maintenance, technology refresh planning, utilization analytics and learning outcome tracking'
            },
          ].map((phase, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 text-white rounded-full flex items-center justify-center font-bold" style={{backgroundColor: '#0C94CE'}}>
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

      <ServiceSection title="Engineering Lab FAQ" subtitle="Common Questions About Our Laboratory Solutions" isDark={false} themeColor="cyan">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do we need to deploy everything at once?</h3>
            <p className="text-slate-700">No. Labs are designed modularly. Institutions can start with core labs and expand in phases.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Will faculty be able to teach these advanced labs?</h3>
            <p className="text-slate-700">Yes. Faculty training is a core part of our engagement, with ongoing technical support.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">How do we handle technology obsolescence?</h3>
            <p className="text-slate-700">We provide lifecycle planning and modular upgrade architecture to avoid full lab replacement.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you provide curriculum and lab manuals?</h3>
            <p className="text-slate-700">Yes. Full syllabus, experiments, manuals, and assessment frameworks are included.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Can labs support research and PhD programs?</h3>
            <p className="text-slate-700">Yes. We design research-grade labs with SDRs, emulators, HPC platforms, and testbeds.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you help with government grants?</h3>
            <p className="text-slate-700">Yes. We provide technical documentation and proposal support for TEQIP, MODROBS, NSF, and state grants.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">What is the typical deployment timeline?</h3>
            <p className="text-slate-700">3–6 months depending on scale, with phased acceleration options.</p>
          </div>
        </div>
      </ServiceSection>

      <CTA
        title="Build Industry-Ready Engineers, Not Just Graduates"
        description="If your institution wants to improve placements, accreditation scores, and research output, we can design a practical lab roadmap aligned to your budget and academic goals."
      />
    </>
  );
}
