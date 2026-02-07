import { Section, SectionHeading } from '../components/ui/Section';
import { ServiceHero, ServiceSection, CTA } from '../components/ServiceDetailLayout';

const rotate3dClasses = ['rotate-3d-1', 'rotate-3d-2', 'rotate-3d-3', 'rotate-3d-4', 'rotate-3d-5'];
const getRotateClass = (idx: number) => rotate3dClasses[idx % rotate3dClasses.length];

export default function RemotePropertyConnectivity() {
  return (
    <>
      <ServiceHero
        title="Enterprise-Grade Connectivity for Properties Traditional ISPs Won't Serve"
        description="Reliable, high-speed connectivity for wedding venues, resorts, ranches, and remote properties—engineered as one integrated system"
        badge="Remote Property Connectivity Solutions"
        badgeIcon=""
        themeColor="cyan"
      />

      <Section className="bg-white relative py-16">
        <SectionHeading
          title="Your Remote Property Should Not Mean Remote From Reliable Internet"
          subtitle="Complete Connectivity for Multi-Building Properties"
          centered={true}
        />
        <div className="max-w-3xl mx-auto mt-8">
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            Your remote property should not mean remote from reliable internet. Today, guests expect Wi-Fi everywhere, staff depend on connectivity for coordination, and business operations (payments, bookings, security) rely on stable service—whether you run a ranch, wedding venue, winery, resort, or multi-building property.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            Traditional providers often will not extend cable or fiber to rural properties, and even when they will, the cost and timeline can be unrealistic. Many owners try quick fixes—extenders, consumer mesh kits, multiple hotspots—but performance becomes inconsistent when the property is large, buildings are spread out, or weekends bring heavy usage. The result is frustration, downtime risk, and reputational damage.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            SpiroLink delivers complete, property-wide connectivity as one engineered system—reliable internet, building-to-building links, enterprise Wi-Fi, phones, and security—designed to perform under real load and handed over with clear documentation. We use the right mix of technologies based on your location and layout, so the solution feels simple to operate and "just works."
          </p>
        </div>
      </Section>

      <ServiceSection title="The Challenge: Connectivity In Remote Locations" subtitle="Common Problems Our Clients Face" isDark={false} themeColor="cyan">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">No Internet Provider Will Serve Us:</span> Property too far from fiber infrastructure, cable companies won't extend service, DSL too slow and unreliable, cellular signal weak or non-existent.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">We Have Multiple Buildings Across Large Property:</span> Main venue 500+ feet from cottages or cabins, guest houses scattered across acres, barns, workshops, or event spaces need connectivity, traditional trenching for fiber prohibitively expensive.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">Our Guests Expect WiFi Everywhere:</span> Wedding parties need to share photos and videos, remote workers staying at retreats need reliable internet, guests streaming entertainment in rooms, event live-streaming for remote attendees.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">We Need Professional Communications:</span> Phone system for reservations and coordination, point-of-sale systems for bars/restaurants, security cameras across property, smart TVs and entertainment systems.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-slate-700"><span className="font-semibold">We Can't Afford Downtime:</span> Events booked months in advance, reputation depends on reliable service, payment processing requires internet, no technical staff on-site for troubleshooting.</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Who We Serve" subtitle="Properties Where Connectivity Must Perform Reliably Under Real-World Conditions" isDark={false} themeColor="cyan">
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 slide-left-right">
            {[
              { title: "Wedding & Event Venues", desc: "Connectivity fails when 200 guests show up and every phone starts uploading video. We design full-property Wi-Fi and backhaul so guest demand does not disrupt operations, payments, or staff coordination.", color: "from-cyan-50 to-blue-50", border: "border-cyan-200" },
              { title: "Resorts & Retreat Centers", desc: "Guests want \"remote\" but still expect video calls, streaming, and stable Wi-Fi. We build networks that deliver reliable connectivity while keeping the experience seamless and unobtrusive.", color: "from-blue-50 to-sky-50", border: "border-blue-200" },
              { title: "Wineries & Vineyards", desc: "POS, reservations, and event traffic need reliable internet across tasting rooms, outdoor spaces, and guest cottages. We design a single integrated network that stays stable under weekend peaks.", color: "from-sky-50 to-cyan-50", border: "border-sky-200" },
              { title: "RV Parks & Campgrounds", desc: "Coverage across large outdoor areas is the hard part, not the office router. We engineer backhaul plus outdoor Wi-Fi so guests get consistent service across sites and common areas.", color: "from-cyan-50 to-indigo-50", border: "border-cyan-200" },
              { title: "Ranches, Estates & Multi-Structure Properties", desc: "Multiple buildings, barns, and workshops typically run on disconnected networks. We unify the property using point-to-point links and segmented Wi-Fi so everything works as one system.", color: "from-indigo-50 to-blue-50", border: "border-indigo-200" },
              { title: "Remote Commercial Operations", desc: "Quarries, construction sites, and remote facilities need reliable connectivity for safety, operations, and coordination. We design resilient networks where downtime translates directly into operational loss.", color: "from-slate-100 to-slate-200", border: "border-slate-300" }
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

      <ServiceSection title="The SpiroLink Advantage" subtitle="Remote Connectivity" isDark themeColor="cyan">
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { title: 'One Integrated System, Not a Stack of Products', desc: 'We combine internet, backhaul, Wi-Fi, segmentation, and security into a single design with one operational owner.' },
            { title: 'Designed for Peak Weekends, Not Average Days', desc: 'We size and plan for real-world event loads, seasonal spikes, and simultaneous users—so performance does not collapse when it matters.' },
            { title: 'No-Trenching Expansion Model', desc: 'We use point-to-point wireless backhaul to connect buildings without construction disruption, long permits, or ongoing per-building fees.' },
            { title: 'Security by Architecture', desc: 'Guest, staff, operations, and payment systems are separated by design—reducing risk and improving reliability.' },
            { title: 'Thinking-First ROI', desc: 'If a fiber build-out is uncertain or financially risky, we design a phased, upgrade-ready network that gives you reliable connectivity now without locking you into the wrong long-term bet.' },
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

      <ServiceSection title="Get a Practical Connectivity Plan for Your Property" subtitle="First Steps" isDark={false} themeColor="cyan">
        <div className="max-w-3xl mx-auto mt-8">
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            If you have multiple buildings, weak ISP options, and guests expecting reliable Wi-Fi, we can assess feasibility and propose a resilient design.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            What we do first: map buildings, evaluate internet options, identify backhaul paths, and estimate peak capacity needs—then recommend the simplest architecture that will hold up operationally.
          </p>
        </div>
      </ServiceSection>

      <ServiceSection title="Remote Property Connectivity FAQ" subtitle="Common Questions About Our Approach" isDark={false} themeColor="cyan">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">We are in a remote area. Can we really get reliable internet?</h3>
            <p className="text-slate-700">Yes. Location does not limit connectivity anymore. Even if cable or fiber providers will not serve your property, we design solutions that bring stable, high-speed internet to remote farms, rural land, and large properties.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Will the internet work across the entire property, not just one building?</h3>
            <p className="text-slate-700">Yes. We design connectivity for the full property, not just a single office. Homes, barns, guest houses, halls, sheds, and outdoor areas can all be connected as one seamless network.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">We have multiple buildings spread far apart. Do we need to dig trenches?</h3>
            <p className="text-slate-700">No. In most cases, there is no digging or trenching required. Buildings are connected wirelessly in a secure and permanent way, saving cost, time, and disruption to land or landscaping.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Will guests or workers slow down the internet for everyone else?</h3>
            <p className="text-slate-700">No. The network is designed to manage usage automatically. Guest usage, staff operations, and business systems are separated so one group cannot affect the performance of another.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Can this support phones, cameras, payment machines, and smart devices?</h3>
            <p className="text-slate-700">Yes. The network supports: Internet for phones, laptops, and tablets, security cameras across the property, payment systems and booking tools, smart TVs, speakers, and automation devices. All are designed to work together reliably.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">What happens if the internet goes down during an event or busy day?</h3>
            <p className="text-slate-700">Our designs include redundancy and fail-safe planning. If one connection is disrupted, the system switches automatically so operations continue without interruption.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Do we need technical staff to manage this?</h3>
            <p className="text-slate-700">No. The system is designed to be simple to operate. We provide training, clear documentation, and optional remote monitoring so you are not dependent on on-site IT expertise.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Can this grow if we add more buildings or expand the property?</h3>
            <p className="text-slate-700">Yes. The network is built with expansion in mind. New buildings, guest areas, or operations can be added without redesigning everything from scratch.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Is this a temporary setup or a long-term solution?</h3>
            <p className="text-slate-700">This is a permanent infrastructure investment, not a temporary workaround. The system is engineered for years of reliable operation and adapts as your business grows.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">How long does it take to get everything working?</h3>
            <p className="text-slate-700">Most properties are fully connected within 4–8 weeks, depending on size and layout—far faster than traditional providers, which often take many months or never deliver.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">How do we get started?</h3>
            <p className="text-slate-700">We begin with a simple conversation: Understand your property layout, understand how you use the internet, identify what must work without fail. From there, we design the right solution—before you commit to anything.</p>
          </div>
        </div>
      </ServiceSection>

      <CTA
        title="Get a Practical Connectivity Plan for Your Property"
        description="If you have multiple buildings, weak ISP options, and guests expecting reliable Wi-Fi, we can assess feasibility and propose a resilient design."
      />
    </>
  );
}
