import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  details: string[];
  image: string;
}

const projects: Project[] = [
  {
    title: "PON & FTTH Network Planning Services",
    subtitle: "Technical Excellence",
    image: "/assets/downloads/ftth.jpg",
    details: [
      "FTTH Network Planning: Service area analysis, topology selection, CO & hub planning",
      "PON Technology Design: GPON, XG-PON, XGS-PON, NG-PON2, EPON",
      "ODN Engineering: Split ratios, fiber routing, FDH, NAP, splice planning",
    ],
  },
  {
    title: "Microwave Network Design Services",
    subtitle: "Wireless Connectivity Excellence",
    image: "/assets/downloads/microwave.jpg",
    details: [
      "Network Planning & Design: Site surveys, frequency planning, link budget calculations",
      "Microwave Link Engineering: Point-to-point/multipoint, 6 GHz to 86 GHz",
      "Implementation Support: Technical documentation, equipment selection, installation supervision",
    ],
  },
  {
    title: "Long-Haul Optical Network Planning Services",
    subtitle: "Backbone Infrastructure Excellence",
    image: "/assets/downloads/optical.jpg",
    details: [
      "Long-haul Fiber Route Planning: Feasibility analysis, fiber path optimization",
      "DWDM System Design: Wavelength assignment, optical amplifier placement",
      "Network Resilience & Protection: Diverse routing, disaster recovery, SLA design",
    ],
  },
  {
    title: "Enterprise & Critical Wi-Fi Network Planning Services",
    subtitle: "Wireless Access Infrastructure Excellence",
    image: "/assets/downloads/wifi.jpg",
    details: [
      "Enterprise Wi-Fi Network Design: Site surveys, RF coverage planning",
      "Wi-Fi 6/6E/7 Planning: Next-generation implementation, 6 GHz spectrum",
      "Performance Optimization: RF interference analysis, spectrum management",
    ],
  },
];

export default function Rotating3DDashboard() {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationSpeed = 0.2;

  useEffect(() => {
    let animationFrame: number;
    const rotate = () => {
      setRotation((prev) => (prev + rotationSpeed) % 360);
      animationFrame = requestAnimationFrame(rotate);
    };
    rotate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const total = projects.length;
  const radius = 180;

  return (
    <div className="relative flex items-center justify-center bg-slate-900 min-h-[400px] p-4 perspective-1000 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full max-w-3xl h-[380px] flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {projects.map((project, index) => {
          const angle = (360 / total) * index + rotation;
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.sin(rad);
          const z = radius * Math.cos(rad);

          const scale = z > 0 ? 1 + z / 1000 : 0.75;
          const opacity = z > 0 ? 1 : 0.45;

          return (
            <div
              key={index}
              className="absolute w-72 bg-white rounded-3xl shadow-xl overflow-hidden"
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                opacity,
                zIndex: Math.round(z),
                boxShadow:
                  z > 0
                    ? "0 0 22px rgba(16,185,129,0.65), 0 0 45px rgba(16,185,129,0.35)"
                    : "0 0 10px rgba(0,0,0,0.25)",
                animation: "glow 2s ease-in-out infinite alternate",
              }}
            >
              {/* Image */}
              <div className="relative w-full h-36">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute top-2 left-2 text-white text-sm font-semibold">
                  {project.subtitle}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  {project.title}
                </h2>
                <ul className="text-left text-slate-700 list-disc list-inside space-y-1 max-h-24 overflow-y-auto text-sm">
                  {project.details.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Icon */}
              <div className="absolute top-2 right-2 w-7 h-7 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 10px rgba(16,185,129,0.6), 0 0 20px rgba(16,185,129,0.3); }
          100% { box-shadow: 0 0 18px rgba(16,185,129,0.8), 0 0 36px rgba(16,185,129,0.5); }
        }
      `}</style>
    </div>
  );
}
