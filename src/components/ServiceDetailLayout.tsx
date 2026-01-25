import { ReactNode } from 'react';
import { Section, SectionHeading } from './ui/Section';

interface ServiceHeroProps {
  title: string;
  description: string;
  badge: string;
  badgeIcon: string;
  themeColor: 'green' | 'cyan' | 'orange' | 'purple';
}

interface ServiceSectionProps {
  title: string;
  subtitle?: string;
  isDark?: boolean;
  themeColor?: 'green' | 'cyan' | 'orange' | 'purple';
  children: ReactNode;
}

const themeMap = {
  green: {
    gradient: 'from-green-500/10 via-blue-500/10 to-green-500/10',
    text: 'from-green-400 via-blue-400 to-green-400',
    badge: 'from-green-500/20 to-blue-500/20',
    badgeBorder: 'border-green-400/30',
    badgeText: 'text-green-300',
    card: 'hover:border-green-400/50',
    dark: 'from-slate-800 to-slate-700',
    darkBorder: 'border-slate-600/50',
    darkHover: 'hover:border-green-400/50',
  },
  cyan: {
    gradient: 'from-cyan-500/10 via-blue-500/10 to-cyan-500/10',
    text: 'from-cyan-400 via-blue-400 to-cyan-400',
    badge: 'from-cyan-500/20 to-blue-500/20',
    badgeBorder: 'border-cyan-400/30',
    badgeText: 'text-cyan-300',
    card: 'hover:border-cyan-400/50',
    dark: 'from-slate-800 to-slate-700',
    darkBorder: 'border-slate-600/50',
    darkHover: 'hover:border-cyan-400/50',
  },
  orange: {
    gradient: 'from-orange-500/10 via-red-500/10 to-orange-500/10',
    text: 'from-orange-300 via-red-300 to-orange-300',
    badge: 'from-orange-500/20 to-red-500/20',
    badgeBorder: 'border-orange-400/30',
    badgeText: 'text-orange-300',
    card: 'hover:border-orange-400/50',
    dark: 'from-slate-800 to-slate-700',
    darkBorder: 'border-slate-600/50',
    darkHover: 'hover:border-orange-400/50',
  },
  purple: {
    gradient: 'from-purple-500/10 via-pink-500/10 to-purple-500/10',
    text: 'from-purple-300 via-pink-300 to-purple-300',
    badge: 'from-purple-500/20 to-pink-500/20',
    badgeBorder: 'border-purple-400/30',
    badgeText: 'text-purple-300',
    card: 'hover:border-purple-400/50',
    dark: 'from-slate-800 to-slate-700',
    darkBorder: 'border-slate-600/50',
    darkHover: 'hover:border-purple-400/50',
  },
};

export function ServiceHero({ title, description, badge, badgeIcon, themeColor }: ServiceHeroProps) {
  const theme = themeMap[themeColor];
  return (
    <Section className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-40 overflow-hidden relative`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} pointer-events-none`} />
      <div className="relative z-10">
        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${theme.badge} rounded-full border ${theme.badgeBorder} text-sm font-semibold ${theme.badgeText} mb-6 tracking-tight`}>
          {badgeIcon} {badge}
        </div>
        <h1 className={`text-5xl md:text-6xl font-bold leading-tight text-white bg-gradient-to-r ${theme.text} bg-clip-text text-transparent mb-6`}>
          {title}
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-3xl\">
          {description}
        </p>
      </div>
    </Section>
  );
}

export function ServiceSection({ title, subtitle, isDark = false, themeColor = 'green', children }: ServiceSectionProps) {
  const bgClass = isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-white';
  return (
    <Section className={bgClass}>
      <SectionHeading
        title={title}
        subtitle={subtitle}
        centered={true}
        dark={isDark}
      />
      <div className="mt-16">
        {children}
      </div>
    </Section>
  );
}

export function ServiceCard({ icon, title, description, isDark = false }: { icon: string; title: string; description: string; isDark?: boolean }) {
  const bgGradient = isDark ? 'from-slate-800 to-slate-700' : 'from-slate-50 to-slate-100';
  const border = isDark ? 'border-slate-600/50' : 'border-slate-200';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const descColor = isDark ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className={`relative p-6 bg-gradient-to-br ${bgGradient} rounded-xl border ${border} hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className={`text-lg font-bold ${textColor} mb-3`}>{title}</h3>
        <p className={`text-sm ${descColor} leading-relaxed flex-grow`}>{description}</p>
      </div>
    </div>
  );
}

export function InfoCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border-l-4 border-sky-500">
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-700">{description}</p>
    </div>
  );
}

export function FeatureBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-lg">
      <h4 className="text-xl font-bold text-slate-900 mb-4">{title}</h4>
      <ul className="space-y-2 text-slate-700">
        {items.map((item, idx) => (
          <li key={idx}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

export function CTA({ title, description }: { title: string; description: string }) {
  return (
    <Section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-sky-500/10 pointer-events-none" />
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 bg-gradient-to-r from-sky-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-lg md:text-xl mb-12 text-sky-100 leading-relaxed">
          {description}
        </p>
      </div>
    </Section>
  );
}
