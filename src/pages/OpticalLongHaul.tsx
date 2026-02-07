import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ServiceHero, ServiceSection, CTA } from '../components/ServiceDetailLayout';

const rotate3dClasses = ['rotate-3d-1', 'rotate-3d-2', 'rotate-3d-3', 'rotate-3d-4', 'rotate-3d-5'];
const getRotateClass = (idx: number) => rotate3dClasses[idx % rotate3dClasses.length];

export default function OpticalLongHaul() {
  return (
    <>
      <ServiceHero
        title="Optical Networks Designed to Perform Long After Day One"
        description="Optical networks are built to last decades, but many are designed only for initial turn-up. We design long-haul and backbone optical systems with margins, scale, and operational reality in mind—so they continue to perform as traffic, distances, and complexity grow."
        badge="Long-Haul Optical Infrastructure"
        badgeIcon=""
        themeColor="cyan"
      />

      <Section className="bg-white relative py-16">
        <SectionHeading
          title="The Hidden Complexity of Optical Networks"
          subtitle="Why Initial Design Matters for Decades"
          centered={true}
        />
        <div className="text-center max-w-3xl mx-auto mt-8">
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            In reality, many optical networks are designed primarily to meet day-one requirements. As traffic grows, routes extend, or new wavelengths are added, hidden limitations begin to surface—loss margins tighten, OSNR degrades, and amplification strategies that once worked no longer scale cleanly.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Because fiber infrastructure is permanent, correcting these design decisions later becomes expensive, disruptive, and operationally risky.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            At SpiroLink, we design long-haul optical networks with long-term performance in mind. Our focus is not just on initial turn-up, but on building optical systems that continue to operate predictably as capacity, distance, and complexity increase over time.
          </p>
        </div>
      </Section>

      <ServiceSection title="Why Optical Networks Become Risky Over Time" subtitle="Hidden Constraints That Surface Later" isDark={false}>
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-slate-700"><span className="font-semibold">Initial Turn-Up Success Masks Long-Term Issues:</span> Optical networks often perform well at initial turn-up, but hidden constraints surface as traffic grows and spans are extended.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-slate-700"><span className="font-semibold">Loss Budgets Are Gradually Consumed:</span> Loss budgets are gradually consumed by splices, connectors, fiber aging, and undocumented changes, leaving little margin for future expansion.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-slate-700"><span className="font-semibold">OSNR Degradation Is Underestimated:</span> OSNR degradation is frequently underestimated, especially when adding higher-order modulation formats or increasing channel counts.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-slate-700"><span className="font-semibold">Amplification Strategies Don't Scale:</span> Amplification strategies that work for early deployments often fail to scale cleanly as wavelengths, distances, or bands are added.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-slate-700"><span className="font-semibold">Documentation Drift Causes Operational Risk:</span> Poor or outdated documentation makes troubleshooting slow and risky years after deployment, when original design assumptions are no longer visible.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-slate-700"><span className="font-semibold">Redesign Costs Mount Quickly:</span> Because fiber infrastructure is permanent, correcting design shortcomings later becomes costly, disruptive, and operationally complex.</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Where We Take Responsibility" subtitle="Sectors Dependent on Optical Performance">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-12 overflow-hidden">
          <div className="col-span-full overflow-x-hidden">
            <div className="flex gap-6 slide-left-right">
              {[
                { title: "Telecommunications & Mobile Operators", desc: "National and regional optical backbones must scale continuously while supporting strict availability targets. We design long-haul and metro optical transport that accommodates traffic growth, new wavelengths, and evolving modulation without forcing disruptive redesigns later.", icon: "📡", color: "from-blue-50 to-cyan-50", border: "border-blue-200" },
                { title: "Internet Service Providers (ISPs)", desc: "ISPs rely on optical backbone networks to expand coverage, peer efficiently, and support rising bandwidth demand. We design fiber and DWDM systems that scale predictably, helping ISPs grow capacity without eroding margins or operational stability.", icon: "🌐", color: "from-cyan-50 to-sky-50", border: "border-cyan-200" },
                { title: "Data Center & Cloud Operators", desc: "Inter–data center connectivity demands high capacity, low latency, and absolute predictability. We design optical transport for DCI environments that supports large-scale replication, cloud interconnection, and future capacity upgrades without compromising performance.", icon: "🏢", color: "from-sky-50 to-blue-50", border: "border-sky-200" },
                { title: "Enterprise & Corporate Networks", desc: "Large enterprises depend on private optical networks for mission-critical applications across multiple sites. We design resilient optical transport that balances security, capacity, and long-term operational simplicity as enterprise needs evolve.", icon: "💼", color: "from-blue-50 to-indigo-50", border: "border-blue-200" },
                { title: "Utilities & Critical Infrastructure", desc: "Optical networks supporting power grids, pipelines, and control systems must operate continuously under harsh conditions. We design transport networks with resilience and margin built in, ensuring critical services remain connected even as infrastructure ages.", icon: "⚡", color: "from-indigo-50 to-cyan-50", border: "border-indigo-200" },
                { title: "Research, Education & Public Sector", desc: "Research and public-sector networks demand high-capacity connectivity for collaboration, data movement, and national infrastructure. We design optical systems that support sustained growth and long service lifecycles, not short-term capacity spikes.", icon: "🔬", color: "from-cyan-50 to-indigo-50", border: "border-cyan-200" }
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
        </div>
      </ServiceSection>

      <ServiceSection title="The SpiroLink Advantage" subtitle="How We Design Optical Networks" themeColor="cyan">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>1</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Designed Beyond Day One</h4>
                <p className="text-slate-700">Many optical networks are engineered to meet initial turn-up targets. We design for what happens later—when spans are extended, wavelengths are added, and margins begin to erode. Our designs anticipate growth before it becomes a problem.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>2</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Margin-Driven Engineering</h4>
                <p className="text-slate-700">We treat optical margins as operational insurance, not theoretical numbers. Loss budgets, OSNR, dispersion, and nonlinear effects are engineered conservatively so networks remain stable under real traffic conditions, not just lab assumptions.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>3</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Amplification and Line System Discipline</h4>
                <p className="text-slate-700">Amplifier placement, gain strategy, and line system design matter more than raw capacity. We focus on balanced EDFA and Raman strategies that scale cleanly as channels, bands, and modulation formats evolve.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>4</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Growth Without Redesign</h4>
                <p className="text-slate-700">Optical networks should scale without forcing disruptive rebuilds. We design wavelength plans, ROADM architectures, and spectrum usage so capacity can grow incrementally without destabilizing existing services.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>5</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Vendor-Neutral by Principle</h4>
                <p className="text-slate-700">Our designs are driven by engineering constraints and operational goals, not by vendor alignment. This allows our clients to select platforms that fit their environment today while preserving flexibility tomorrow.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>6</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Documentation That Survives Time</h4>
                <p className="text-slate-700">Poor documentation is one of the most common causes of optical outages years later. We deliver clear, auditable design documentation so future teams can understand, operate, and evolve the network with confidence.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: '#0C94CE'}}>7</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Ownership Mindset</h4>
                <p className="text-slate-700">We work as long-term partners, taking shared responsibility for how optical networks perform over their lifecycle—not just how they are initially deployed.</p>
              </div>
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Did You Know? — Optical Network Insights" subtitle="Key Concepts That Drive Better Design" isDark={false} themeColor="cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">OSNR Is the Real Bottleneck</h3>
            <p className="text-slate-700 text-sm mb-3"><span className="font-semibold">Did you know?</span> Most optical networks hit OSNR limits before fiber loss limits.</p>
            <p className="text-slate-700 text-sm"><span className="font-semibold">Engineering insight:</span> As channel counts increase or higher-order modulation is introduced, OSNR degrades faster than expected. Networks often fail to scale not because fiber is exhausted, but because noise accumulation was underestimated during initial design.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Fiber Ages, Margins Shrink</h3>
            <p className="text-slate-700 text-sm mb-3"><span className="font-semibold">Did you know?</span> Optical margins silently erode over time—even without fiber cuts.</p>
            <p className="text-slate-700 text-sm"><span className="font-semibold">Engineering insight:</span> Microbends, splice degradation, connector contamination, and temperature variation gradually consume loss and OSNR margins. Designs that work comfortably on day one may struggle years later if aging is not accounted for.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Amplifier Placement Matters More Than Gain</h3>
            <p className="text-slate-700 text-sm mb-3"><span className="font-semibold">Did you know?</span> More amplifier gain does not fix a poorly designed line system.</p>
            <p className="text-slate-700 text-sm"><span className="font-semibold">Engineering insight:</span> EDFA and Raman placement, span length balance, and gain tilt management determine long-term stability. Improper amplification strategies amplify noise and nonlinear effects, limiting future scalability.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Coherent Optics Don't Eliminate Dispersion Planning</h3>
            <p className="text-slate-700 text-sm mb-3"><span className="font-semibold">Did you know?</span> Chromatic dispersion still matters—even with modern coherent optics.</p>
            <p className="text-slate-700 text-sm"><span className="font-semibold">Engineering insight:</span> While coherent receivers compensate dispersion digitally, excessive unmanaged dispersion increases DSP complexity, power consumption, and reduces OSNR tolerance—especially on ultra-long-haul paths.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">ROADM Design Determines Upgrade Pain</h3>
            <p className="text-slate-700 text-sm mb-3"><span className="font-semibold">Did you know?</span> Many optical upgrades fail because of ROADM architecture, not fiber.</p>
            <p className="text-slate-700 text-sm"><span className="font-semibold">Engineering insight:</span> Fixed or poorly planned ROADM designs constrain wavelength flexibility and force disruptive upgrades later. CDC-F ROADM planning enables capacity growth without service impact.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Nonlinear Effects Limit Scale Before Hardware Does</h3>
            <p className="text-slate-700 text-sm mb-3"><span className="font-semibold">Did you know?</span> Fiber nonlinearities often cap capacity before transceivers do.</p>
            <p className="text-slate-700 text-sm"><span className="font-semibold">Engineering insight:</span> SPM, XPM, and FWM increase rapidly as channel density grows. Without careful launch power control and spectrum planning, nonlinear penalties silently limit achievable reach and modulation.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Documentation Drift Causes More Outages Than Fiber Cuts</h3>
            <p className="text-slate-700 text-sm mb-3"><span className="font-semibold">Did you know?</span> Many optical outages occur because design intent is lost—not because fiber fails.</p>
            <p className="text-slate-700 text-sm"><span className="font-semibold">Engineering insight:</span> When documentation diverges from reality, troubleshooting becomes slow and risky. Clear, lifecycle-grade documentation is as critical as the optical design itself.</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Review Your Optical Design Before Growth Makes It Expensive" subtitle="Thinking-First Approach" isDark={false} themeColor="cyan">
        <div className="max-w-3xl mx-auto mt-8">
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            Optical networks rarely fail at turn-up.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            They fail later—when traffic grows, spans extend, and margins quietly disappear.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            Before committing to new builds, upgrades, or additional wavelengths, it helps to review whether the optical design will scale cleanly over time.
          </p>
        </div>
      </ServiceSection>

      <ServiceSection title="Optical Network Planning FAQ" subtitle="Common Questions About Our Approach" isDark={false} themeColor="cyan">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you work on existing optical networks or only new builds?</h3>
            <p className="text-slate-700">We support both. Many of our engagements involve reviewing and optimizing existing fiber and DWDM networks before upgrades or capacity expansion.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Are your optical designs vendor-neutral?</h3>
            <p className="text-slate-700">Yes. Our designs are driven by engineering constraints, operational goals, and long-term scalability—not vendor alignment.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Can you review third-party or legacy optical designs?</h3>
            <p className="text-slate-700">Absolutely. We frequently assess designs created by vendors or integrators to identify scaling risks, margin limitations, and documentation gaps before changes are implemented.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you support DWDM, ROADM, and OTN-based architectures?</h3>
            <p className="text-slate-700">Yes. We design across DWDM, ROADM, and OTN layers, focusing on clean integration and long-term operational stability.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Is optical planning only relevant for very large networks?</h3>
            <p className="text-slate-700">No. Optical planning becomes critical whenever capacity growth, long distances, or high availability are required—regardless of network size.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you provide equipment, fiber, or installation services?</h3>
            <p className="text-slate-700">We focus on planning and design. We can support implementation through documentation, technical guidance, and coordination with qualified installation partners.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Can you help with long-term growth and migration planning?</h3>
            <p className="text-slate-700">Yes. We regularly design multi-year evolution plans that allow capacity to grow without forcing disruptive redesigns or service interruptions.</p>
          </div>
        </div>
      </ServiceSection>



      <CTA
        title="Discuss Your Optical Transport Challenges"
        description="Review an existing or planned optical design, or discuss your long-haul network planning needs with our team"
      />
    </>
  );
}

