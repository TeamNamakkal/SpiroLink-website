import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { CountrySelector } from './CountrySelector';
import { LanguageSelector } from './LanguageSelector';
import { useI18n } from '../i18n/I18nProvider';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/auth';

interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
  translationKey: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', translationKey: 'home' },
  { label: 'Services', href: '/services', translationKey: 'services' },
  { label: 'Resources', href: '/resources', translationKey: 'resources' },
  { label: 'Contact', href: '/contact', translationKey: 'contact' },
];

export function Header() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleMouseEnter = useCallback((itemLabel: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setActiveMenu(itemLabel);
  }, []);

  const handleMouseLeave = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150); // 150ms delay before closing
  }, []);

  const handleMenuItemClick = useCallback((e: React.KeyboardEvent, itemLabel: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveMenu(activeMenu === itemLabel ? null : itemLabel);
    }
  }, [activeMenu]);

  const handleMenuItemKeyDown = useCallback(
    (e: React.KeyboardEvent, itemLabel: string) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIndex = navItems.findIndex(item => item.label === itemLabel);
        const nextIndex = (currentIndex + 1) % navItems.length;
        navItems[nextIndex].label && setActiveMenu(navItems[nextIndex].label);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const currentIndex = navItems.findIndex(item => item.label === itemLabel);
        const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;
        navItems[prevIndex].label && setActiveMenu(navItems[prevIndex].label);
      }
    },
    []
  );
  
  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 h-[72px] z-50 transition-all duration-300 bg-white border-b border-gray-200`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-0 py-1"
              aria-label="SPIROLINK Home"
            >
              <img 
                src="/assets/downloads/logo.png" 
                alt="SPIROLINK" 
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 ml-8" aria-label="Main navigation">
            {navItems.map((item) => {
              const hasMenu = item.label === 'Services';
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasMenu && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasMenu && handleMouseLeave()}
                >
                  {hasMenu ? (
                    <button
                      onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                      onKeyDown={(e) => (handleMenuItemClick(e, item.label), handleMenuItemKeyDown(e, item.label))}
                      className={`navItem relative text-gray-700 text-sm font-medium leading-tight py-2 px-3 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded flex items-center gap-1 ${
                        styles.navItem
                      }`}
                      aria-expanded={activeMenu === item.label}
                      aria-haspopup="true"
                    >
                      {t(item.translationKey as any)}
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${
                          activeMenu === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                      <div className={styles.navUnderline} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`navItem relative text-gray-700 text-sm font-medium leading-tight py-2 px-3 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded flex items-center gap-1 block ${
                        styles.navItem
                      }`}
                    >
                      {t(item.translationKey as any)}
                      <div className={styles.navUnderline} />
                    </Link>
                  )}

                  {/* Mega Menu - Only for Services */}
                  {hasMenu && activeMenu === item.label && (
                    <div
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <MegaMenu
                        itemLabel={item.label}
                        isOpen={activeMenu === item.label}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Spacer - Pushes right actions to the right */}
          <div className="flex-1"></div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Country Selector */}
            <CountrySelector />

            {/* Sign In / User Menu */}
            {!loading && (
              <>
                {user ? (
                  <div className="hidden md:flex items-center gap-3">
                    <Link
                      to="/dashboard"
                      className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 px-3 py-1.5 rounded hover:bg-gray-100"
                      aria-label="Go to Dashboard"
                    >
                      Dashboard
                    </Link>
                    <span className="text-gray-700 text-sm font-medium truncate max-w-[150px]">
                      {user.email}
                    </span>
                    <button
                      onClick={async () => {
                        await logout();
                        navigate('/');
                      }}
                      className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 px-3 py-1.5 rounded hover:bg-gray-100"
                      aria-label={t('signOut') || 'Sign Out'}
                    >
                      {t('signOut') || 'Sign Out'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate('/signin')}
                    className="hidden md:flex text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 px-3 py-1.5 rounded hover:bg-gray-100"
                    aria-label={t('signIn')}
                  >
                    {t('signIn')}
                  </button>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 text-gray-700 hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 p-2"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobile && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navItems={navItems}
        />
      )}

      {/* Spacer for sticky header */}
      <div className="h-[72px]" />
    </>
  );
}
