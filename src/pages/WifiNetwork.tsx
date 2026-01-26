
import { Section, SectionHeading } from '../components/ui/Section';
import { ServiceHero, ServiceSection, CTA } from '../components/ServiceDetailLayout';

const rotate3dClasses = ['rotate-3d-1', 'rotate-3d-2', 'rotate-3d-3', 'rotate-3d-4', 'rotate-3d-5'];
const getRotateClass = (idx: number) => rotate3dClasses[idx % rotate3dClasses.length];

export default function WifiNetwork() {
  return (
    <>
      <ServiceHero
        title="Wi-Fi That Performs Under Real Load, Not Just on a Floor Plan"
        description="Modern Wi-Fi is no longer a convenience layer. It is core access infrastructure for business-critical applications, real-time operations, IoT, and user experience at scale. We design enterprise Wi-Fi networks that stay stable under real interference, real device density, and real roaming behavior—so performance remains predictable as your environment changes."
        badge="Enterprise Wi-Fi Infrastructure"
        badgeIcon="📶"
        themeColor="cyan"
      />

      <Section className="bg-white relative py-16">
        <SectionHeading
          title="Wi-Fi Networks: Engineered, Not Assumed"
          subtitle="The Reality of Modern Wireless Infrastructure"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-8">
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            Wi-Fi networks are expected to behave like wired networks—always on, low-latency, and secure—yet they operate in an RF environment that is constantly changing.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            Client devices, neighboring networks, building materials, and interference sources shift continuously, which is why Wi-Fi performance degrades even when hardware is new.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            Many Wi-Fi deployments are built around coverage assumptions instead of capacity, airtime efficiency, and security architecture. The result is congestion, unstable roaming, inconsistent user experience, and redesign costs that typically appear after go-live.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            At SpiroLink, we plan Wi-Fi as an engineered access system—RF design, capacity modeling, security policy, and operational readiness—so networks remain reliable under real-world usage.
          </p>
        </div>
      </Section>

      <ServiceSection title="Real-World Pain Points" subtitle="Why Wi-Fi Often Fails" isDark={false} themeColor="cyan">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Airtime Contention Over Signal Strength:</span> Most Wi-Fi problems are not caused by weak signal—they are caused by airtime contention, poor channel reuse, and unmanaged interference.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">High-Density Failures:</span> High user density environments fail when coverage planning ignores capacity and throughput per cell.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Roaming Instability:</span> Roaming issues often come from inconsistent RF boundaries, incorrect minimum data rates, and poorly tuned 802.11k/v/r behavior.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Security Gaps:</span> Security gaps appear when SSID sprawl replaces segmentation and when guest, IoT, and corporate traffic share the same trust boundary.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Interference Underestimation:</span> Performance becomes unpredictable when RF planning ignores interference such as neighboring APs, Bluetooth/IoT noise, microwaves, forklifts, and reflective layouts.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Post-Launch Costs:</span> Redesign becomes expensive because Wi-Fi failures usually surface after operations begin.</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Industries & Environments We Serve" subtitle="Enterprise Solutions Across Sectors">
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 slide-left-right">
            {[
              { title: "Corporate & Enterprise", desc: "Offices often perform well on day one, then degrade as meeting rooms, video calls, and hybrid work increase. We design Wi-Fi that remains stable across floors and density.", color: "from-cyan-50 to-blue-50", border: "border-cyan-200" },
              { title: "Healthcare Facilities", desc: "Clinical networks require reliability, mobility, and strong segmentation. We design Wi-Fi that supports medical devices and operations without tolerance for instability.", color: "from-blue-50 to-sky-50", border: "border-blue-200" },
              { title: "Education Institutions", desc: "Schools and campuses experience extreme concurrency and fast roaming. We engineer Wi-Fi for device density and airtime efficiency.", color: "from-sky-50 to-cyan-50", border: "border-sky-200" },
              { title: "Hospitality & Tourism", desc: "Guest Wi-Fi defines experience. We design consistent roaming and stable performance while isolating guest traffic from operations.", color: "from-cyan-50 to-indigo-50", border: "border-cyan-200" },
              { title: "Manufacturing & Warehousing", desc: "Industrial environments create reflections and interference. We design Wi-Fi that supports scanners, tablets, AGVs, and IoT reliably.", color: "from-indigo-50 to-blue-50", border: "border-indigo-200" },
              { title: "Public Venues & High-Density Spaces", desc: "High-density environments fail when designed for coverage instead of contention. We design Wi-Fi that controls airtime and channel reuse under peak load.", color: "from-slate-100 to-slate-200", border: "border-slate-300" }
            ].map((item, idx) => (
              <div key={idx} className={`group relative ${getRotateClass(idx)} flex-shrink-0 w-80`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`relative p-6 bg-gradient-to-br ${item.color} rounded-lg border ${item.border} hover:border-cyan-400/50 transition-all duration-300 card-glow`}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">{item.title}</h3>
                  <p className="text-slate-700 group-hover:text-slate-800 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="The SpiroLink Advantage" subtitle="How We Design Wi-Fi Networks" isDark themeColor="cyan">
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { title: 'Capacity-First RF Design', desc: 'We design for airtime and throughput, not just RSSI.' },
            { title: 'Roaming That Works Across Real Clients', desc: 'RF boundaries and minimum rate strategies tuned for mixed client environments.' },
            { title: 'Security Architecture Built In', desc: 'Segmentation, SSID strategy, and WPA3/802.1X planned from day one.' },
            { title: 'Predictive + Validation Discipline', desc: 'Predictive design validated against real conditions with documentation.' },
            { title: 'Vendor-Neutral by Principle', desc: 'Design driven by RF reality and operational goals, not vendor defaults.' },
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

      <ServiceSection title="Wi-Fi Technical Insights" subtitle="Key Concepts That Drive Better Design" themeColor="cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              step: '1',
              title: 'Signal Strength Isn\'t the Main Performance Metric',
              description: 'Wi-Fi performance is limited by airtime utilization, not RSSI.'
            },
            {
              step: '2',
              title: 'Co-Channel Interference Is Often Self-Inflicted',
              description: 'Too many APs on the same channel increases contention.'
            },
            {
              step: '3',
              title: '2.4 GHz Often Hurts More Than It Helps',
              description: 'Limited channels cause congestion and sticky clients.'
            },
            {
              step: '4',
              title: 'Roaming Failures Come From Basic Rate Strategy',
              description: 'Incorrect minimum rates cause late roaming and call drops.'
            },
            {
              step: '5',
              title: '6 GHz Isn\'t Automatically Better',
              description: 'Without client strategy, 5 GHz remains overloaded.'
            },
            {
              step: '6',
              title: 'DFS Channels Can Cause Instability',
              description: 'Radar events trigger forced channel changes.'
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

      <ServiceSection title="Validate Your Wi-Fi Design Before Users Do It for You" subtitle="Thinking-First Approach" isDark={false} themeColor="cyan">
        <div className="max-w-3xl mx-auto mt-8">
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            Most Wi-Fi problems appear only after go-live when downtime is not an option.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            If you are planning a new deployment, upgrading to Wi-Fi 6E/7, or troubleshooting instability, we can help validate RF design, capacity assumptions, segmentation, and roaming behavior before changes are locked in.
          </p>
        </div>
      </ServiceSection>

      <ServiceSection title="Wi-Fi FAQ" subtitle="Common Questions About Our Approach" isDark={false} themeColor="cyan">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you only design, or also install?</h3>
            <p className="text-slate-700">We focus on planning and design, with implementation-ready documentation.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you perform predictive and active surveys?</h3>
            <p className="text-slate-700">Yes. Predictive for planning, active for validation.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Can you design for voice and real-time applications?</h3>
            <p className="text-slate-700">Yes. QoS, airtime planning, and roaming tuning are included.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Can guest and IoT be secured properly?</h3>
            <p className="text-slate-700">Yes. Segmentation and access control without SSID sprawl.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do you support cloud-managed and controller-based Wi-Fi?</h3>
            <p className="text-slate-700">Yes. Cloud, on-prem, and hybrid architectures.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Why does Wi-Fi feel worse after adding APs?</h3>
            <p className="text-slate-700">Co-channel interference and poor channel reuse planning.</p>
          </div>
        </div>
      </ServiceSection>

      <CTA
        title="Start a Technical Discussion"
        description="Request a Design / Survey Review or discuss your Wi-Fi planning needs with our team"
      />
    </>
  );
}
