import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ServiceHero, ServiceSection, InfoCard, CTA } from '../components/ServiceDetailLayout';

const rotate3dClasses = ['rotate-3d-1', 'rotate-3d-2', 'rotate-3d-3', 'rotate-3d-4', 'rotate-3d-5'];
const getRotateClass = (idx: number) => rotate3dClasses[idx % rotate3dClasses.length];

const RevealCard = ({ title, didYouKnow, engineeringInsight }: { title: string; didYouKnow: string; engineeringInsight: string }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  if (isRevealed) {
    return (
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 p-6 rounded-lg border border-blue-400 h-full flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-white mb-4 text-lg">Engineering Insight</h3>
          <div className="border-b border-blue-400 mb-4"></div>
          <p className="text-blue-50 text-sm leading-relaxed">{engineeringInsight}</p>
        </div>
        <button
          onClick={() => setIsRevealed(false)}
          className="text-blue-100 text-sm mt-6 hover:text-white transition-colors italic"
        >
          Hide technical detail
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 p-6 rounded-lg border border-blue-300 h-full flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-blue-900 mb-4 text-lg">{title}</h3>
        <p className="text-slate-700 text-sm mb-3">
          <span className="font-semibold">Did you know?</span> {didYouKnow}
        </p>
        <p className="text-slate-700 text-sm italic">without laying a single fiber strand.</p>
      </div>
      <button
        onClick={() => setIsRevealed(true)}
        className="text-blue-600 text-sm mt-6 hover:text-blue-800 transition-colors font-semibold"
      >
        See the engineering behind this →
      </button>
    </div>
  );
};

export default function MicrowaveNetwork() {
  return (
    <>
      <ServiceHero
        title="When Networks Can't Wait for Fiber, We Engineer Certainty."
        description="We design carrier-grade microwave networks for environments where fiber is delayed, impractical, or financially uncertain. We treat our customers as partners and approach every network as if we own its outcome."
        badge="Wireless Networks"
        badgeIcon="📡"
        themeColor="cyan"
      />

      <Section className="bg-white relative py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            Delays, terrain, permitting, and environmental constraints often slow deployments. In many cases, teams are also unsure whether a large fiber investment will deliver the expected return. Yet the expectation remains unchanged: high availability, predictable performance, and timely delivery.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            Whether supporting a 5G rollout, connecting critical infrastructure, or extending networks into remote locations, waiting years or committing to uncertain ROI is rarely an option. At SpiroLink, we help bridge this gap by designing carrier-grade microwave networks that deliver resilience and performance where fiber alone is delayed, impractical, or financially uncertain.
          </p>
        </div>
        <SectionHeading
          title="Why Network Rollouts Get Stuck"
          subtitle="Hidden Constraints That Surface"
          centered={true}
        />
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 slide-left-right">
            {[
              { title: "Permits & Regulatory Delays", desc: "Permits, site access, and regulatory approvals often take far longer than expected, even after technical designs are complete.", icon: "📋", color: "from-blue-50 to-cyan-50", border: "border-blue-200" },
              { title: "Fiber Build Timelines", desc: "Fiber build timelines can stretch into years, and teams are not always confident the investment will deliver the expected return.", icon: "⏰", color: "from-cyan-50 to-sky-50", border: "border-cyan-200" },
              { title: "Terrain & Environment", desc: "Urban density, difficult terrain, water crossings, and protected environments can make trenching impractical or unacceptable.", icon: "🏞️", color: "from-sky-50 to-blue-50", border: "border-sky-200" },
              { title: "Resilience & Risk", desc: "Networks built on a single underground path remain exposed to physical disruption, leaving little room for true resilience.", icon: "🔐", color: "from-blue-50 to-indigo-50", border: "border-indigo-200" }
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

      <ServiceSection title="Where We Take Responsibility" subtitle="Sectors We Support">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <InfoCard icon={null} title="Internet Service Providers (ISPs)" description="ISPs face constant pressure to expand coverage while controlling costs and maintaining service quality. We help design microwave connectivity where fiber is delayed or impractical, enabling steady growth without introducing instability or future rework." />
          <InfoCard icon={null} title="Utilities & Energy" description="Utility networks carry operational data where outages can affect safety, compliance, and service continuity. We design microwave connectivity for grids, substations, pipelines, and renewable sites with availability and resilience as the priority." />
          <InfoCard icon={null} title="Transportation & Infrastructure" description="Transportation systems depend on continuous communication across wide, distributed environments. We design microwave networks that support railways, highways, ports, and transit systems reliably." />
          <InfoCard icon={null} title="Healthcare" description="Healthcare networks support systems where delays or outages directly impact patient care. We design microwave connectivity for hospital campuses, remote clinics, and telemedicine environments." />
          <InfoCard icon={null} title="Enterprise & Corporate Networks" description="Enterprises often need reliable connectivity between campuses, remote offices, and industrial facilities where fiber access is constrained. We design microwave networks that integrate smoothly with enterprise IT environments." />
          <InfoCard icon={null} title="5G & Mobile Rollouts" description="Supporting 5G infrastructure deployments where rapid, reliable backhaul is essential. We design carrier-grade microwave solutions that meet strict availability targets." />
        </div>
      </ServiceSection>

      <ServiceSection title="Did You Know? — Microwave Network Insights" subtitle="Key Concepts That Drive Better Design" isDark={false} themeColor="cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <RevealCard
            title="40 Gbps+ Capacity"
            didYouKnow="Modern microwave links can deliver 40 Gbps+ capacity"
            engineeringInsight="Using multiband aggregation, dual polarization (XPIC), and E-band spectrum (70/80 GHz), microwave systems achieve fiber-class throughput. When engineered correctly, these links meet strict availability targets and integrate seamlessly with IP/MPLS backhaul."
          />
          <RevealCard
            title="Near-LOS (nLOS) Reality"
            didYouKnow="Microwave links don't always require perfect line-of-sight."
            engineeringInsight="With near-line-of-sight design, diffraction, reflections, and advanced link budgeting close paths once considered impossible. Careful Fresnel clearance analysis and adaptive modulation allow stable operation in constrained terrain."
          />
          <RevealCard
            title="MIMO & Polarization Gain"
            didYouKnow="Microwave uses MIMO and polarization techniques similar to advanced wireless systems."
            engineeringInsight="Modern microwave radios use dual polarization and XPIC (Cross-Polarization Interference Cancellation) to transmit parallel data streams. This effectively doubles capacity without consuming additional spectrum."
          />
          <RevealCard
            title="Latency Advantage"
            didYouKnow="Microwave can sometimes deliver lower latency than fiber."
            engineeringInsight="Radio waves travel directly through air along the shortest path, while fiber routes follow indirect rights-of-way. For certain topologies, microwave introduces fewer hops and lower end-to-end latency."
          />
          <RevealCard
            title="Adaptive Modulation"
            didYouKnow="Microwave bandwidth adjusts dynamically — it doesn't fail suddenly."
            engineeringInsight="Using adaptive modulation and coding (AMC), microwave links gracefully reduce throughput under rain or atmospheric stress instead of dropping completely. Services degrade predictably rather than catastrophically."
          />
          <RevealCard
            title="Point-to-Point Practicality"
            didYouKnow="Microwave solves small, practical problems — not just large networks."
            engineeringInsight="Short point-to-point links connect warehouses, farms, barns, and isolated buildings where trenching makes no sense. These links deploy quickly and can be upgraded without permanent impact."
          />
          <RevealCard
            title="Controlled Environments"
            didYouKnow="Wireless links are sometimes used inside data centers and campuses."
            engineeringInsight="In controlled environments, short-range wireless links provide temporary interconnects, rapid expansion, or redundancy paths. This is especially useful during migrations, upgrades, or phased builds."
          />
          <RevealCard
            title="Primary Live Traffic"
            didYouKnow="Microwave frequently carries primary live traffic, not just backup paths."
            engineeringInsight="In many regions, microwave backhaul supports live 4G/5G traffic, enterprise services, and utility control systems with strict availability targets. Reliability depends on engineering discipline."
          />
        </div>
      </ServiceSection>

      <ServiceSection title="The SpiroLink Advantage" subtitle="How We Design Microwave Networks" themeColor="cyan">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>1</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Engineering Ownership</h4>
                <p className="text-slate-700">We treat every microwave network as if we own its outcome. Reliability depends on engineering discipline, not luck or hoping for good weather.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>2</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Fade Margin & Resilience</h4>
                <p className="text-slate-700">We design for real-world conditions: rain, fading, multipath, and interference. Our link budgets include practical margins so networks remain operational in adverse conditions.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>3</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Technology & Spectrum Planning</h4>
                <p className="text-slate-700">From 6 GHz to E-band (86 GHz), we design using the right spectrum and technology for your deployment. Multiband aggregation, MIMO, and adaptive modulation scale capacity without compromise.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>4</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Vendor-Neutral Design</h4>
                <p className="text-slate-700">Our designs are driven by engineering requirements, not vendor alignment. This preserves flexibility and ensures recommendations fit your environment and budget.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>5</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Regulatory & Compliance Partnership</h4>
                <p className="text-slate-700">We handle frequency coordination, regulatory documentation, and licensing support across multiple jurisdictions. Complexity in permitting and spectrum doesn't slow our designs.</p>
              </div>
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Frequently Asked Questions" subtitle="Common Questions About Our Approach" isDark={false} themeColor="cyan">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you work alongside our existing vendors or teams?</h3>
            <p className="text-slate-700">Yes. We regularly work as an extension of internal teams and alongside existing vendors, focusing on design quality, integration, and long-term performance rather than replacing established relationships.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Is microwave intended as a temporary or permanent solution?</h3>
            <p className="text-slate-700">Microwave can be engineered as either. When designed correctly, it often serves as a long-term primary path or a resilient complement to fiber, not just a stopgap.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Can you review or optimize an existing microwave or fiber design?</h3>
            <p className="text-slate-700">Yes. We frequently assess existing designs to identify performance risks, integration gaps, and opportunities for improvement before changes are committed.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you support hybrid fiber–microwave architectures?</h3>
            <p className="text-slate-700">Absolutely. Many modern networks rely on hybrid designs, and we specialize in integrating microwave cleanly with fiber and IP/MPLS environments.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Are your services vendor-neutral?</h3>
            <p className="text-slate-700">Yes. Our recommendations are based on technical fit, operational requirements, and long-term outcomes — not vendor alignment.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you provide installation services?</h3>
            <p className="text-slate-700">We focus on design and engineering services, but provide comprehensive implementation support and can recommend qualified installation partners.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Can you help with frequency licensing?</h3>
            <p className="text-slate-700">Yes, we provide frequency coordination services and prepare all necessary documentation for regulatory applications.</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Let's Talk Before You Commit" subtitle="Free Initial Consultation" isDark={false} themeColor="cyan">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-700 text-lg leading-relaxed mb-8 text-center">
            Not every network problem needs a build. Sometimes it needs clearer thinking before committing.
          </p>
          <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 space-y-4">
            <div className="flex gap-3 items-start">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <div>
                <h4 className="font-semibold text-slate-900">Free initial consultation</h4>
                <p className="text-slate-600 text-sm">Discuss your connectivity challenges, network goals, and constraints</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <div>
                <h4 className="font-semibold text-slate-900">Network feasibility assessment</h4>
                <p className="text-slate-600 text-sm">Initial technical evaluation to determine microwave suitability</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <div>
                <h4 className="font-semibold text-slate-900">Project scoping and quotation</h4>
                <p className="text-slate-600 text-sm">Clear cost and timeline estimates for your specific deployment</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <div>
                <h4 className="font-semibold text-slate-900">Technical discussions with our engineering team</h4>
                <p className="text-slate-600 text-sm">Direct access to microwave specialists who understand your industry</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <div>
                <h4 className="font-semibold text-slate-900">ROI and rollout risk considerations</h4>
                <p className="text-slate-600 text-sm">Analysis of financial impact and deployment risk before commitment</p>
              </div>
            </div>
          </div>
        </div>
      </ServiceSection>



      <CTA
        title="Let's Talk Before You Commit."
        description="Free initial consultation, network feasibility assessment, and technical discussions with our engineering team"
      />
    </>
  );
}
