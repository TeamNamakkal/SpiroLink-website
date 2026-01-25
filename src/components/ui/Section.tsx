import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true, dark = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>{title}</h2>
      {subtitle && <p className={`text-lg ${dark ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mx-auto leading-relaxed`}>{subtitle}</p>}
    </div>
  );
}
