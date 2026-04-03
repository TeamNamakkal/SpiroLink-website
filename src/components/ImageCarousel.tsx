import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images?: CarouselImage[];
  autoRotateInterval?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_IMAGES: CarouselImage[] = [
  { src: '/assets/downloads/ftth.jpg', alt: 'PON FTTH Network' },
  { src: '/assets/downloads/microwave.jpg', alt: 'Microwave Network' },
  { src: '/assets/downloads/optical.jpg', alt: 'Optical Long Haul' },
  { src: '/assets/downloads/wifi.jpg', alt: 'WiFi Network' },
];

export function ImageCarousel({
  images = DEFAULT_IMAGES,
  autoRotateInterval = 4000,
  className = '',
  style = {},
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length, autoRotateInterval]);

  useEffect(() => {
    if (!containerRef) return;

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
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(containerRef);

    return () => observer.disconnect();
  }, [containerRef]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsAutoPlay(true);
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsAutoPlay(true);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
    setIsAutoPlay(true);
  };

  return (
    <div
      ref={setContainerRef}
      className={`relative w-full bg-white rounded-2xl overflow-hidden shadow-lg ${className}`}
      style={{
        aspectRatio: '16/9',
        maxWidth: '100%',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 500ms ease-out, transform 500ms ease-out',
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {/* Images Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full"
              style={{ 
                objectFit: style.objectFit || 'cover',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
              loading={index === currentIndex ? 'eager' : 'lazy'}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 text-gray-900 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-blue-500"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 text-gray-900 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-blue-500"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full focus-visible:outline-2 focus-visible:outline-white ${
              index === currentIndex
                ? 'w-8 h-2.5 bg-white shadow-lg'
                : 'w-2.5 h-2.5 bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'page' : undefined}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
