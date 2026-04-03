import { ReactNode, useEffect, useRef, useState } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`py-24 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-out will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

type RevealDirection = 'left' | 'right';

function RevealText({
  children,
  from = 'left',
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  from?: RevealDirection;
  className?: string;
  delay?: number;
}) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    let timeoutId: number | undefined;

    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [delay]);

  const hiddenTranslate = from === 'left' ? '-translate-x-5' : 'translate-x-5';

  return (
    <span
      ref={textRef}
      className={`inline-block overflow-hidden transition-all duration-500 ease-out will-change-transform ${
        isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${hiddenTranslate}`
      } ${className}`}
    >
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true, dark = false }: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = headingRef.current;

    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={headingRef} className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>
        <RevealText from="left">{title}</RevealText>
      </h2>
      <div
        className={`h-0.5 bg-current/20 rounded-full mb-4 mx-auto transition-all duration-500 ease-out origin-center ${
          isVisible ? 'w-20 opacity-100' : 'w-0 opacity-0'
        } ${centered ? '' : 'mx-0'}`}
        style={{ color: dark ? 'white' : '#0f172a' }}
      />
      {subtitle && (
        <p className={`text-lg ${dark ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mx-auto leading-relaxed`}>
          <RevealText from="right" delay={120}>
            {subtitle}
          </RevealText>
        </p>
      )}
    </div>
  );
}
