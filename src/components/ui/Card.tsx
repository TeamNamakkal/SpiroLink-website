import { ReactNode, useEffect, useRef, useState } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  reveal?: boolean;
  revealDelay?: number;
}

export function Card({
  children,
  className = '',
  hoverable = false,
  reveal = false,
  revealDelay = 0,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(!reveal);

  useEffect(() => {
    if (!reveal) return;

    const element = cardRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setIsVisible(true), revealDelay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -6% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [reveal, revealDelay]);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-lg shadow-md transition-all duration-300 ease-out transform-gpu will-change-transform ${
        hoverable ? 'hover:-translate-y-1 hover:shadow-xl' : ''
      } ${reveal ? `transition-opacity ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}` : ''} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
}

export function CardImage({ src, alt }: CardImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover rounded-t-lg"
    />
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
