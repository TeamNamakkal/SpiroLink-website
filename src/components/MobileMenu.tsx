import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/auth';

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        overlayRef.current &&
        overlayRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        role="presentation"
        aria-hidden={!isOpen}
      />

      <nav
        ref={menuRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 w-64 bg-[#0b0b0b] shadow-2xl z-50 transition-all duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        aria-label="Mobile navigation"
        role="navigation"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="pt-20 px-6 pb-8">
          <div className="space-y-4 mb-8">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className={`${styles.mobileMenuItem}`}
                style={{
                  animationDelay: isOpen ? `${index * 0.05}s` : '0s',
                }}
              >
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block text-white text-base font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-800 my-6" />

          <div className="space-y-4">
            <button
              onClick={onClose}
              className={`w-full flex items-center gap-3 text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                styles.mobileMenuItem
              }`}
              style={{
                animationDelay: isOpen ? `${navItems.length * 0.05}s` : '0s',
              }}
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>

            <button
              onClick={onClose}
              className={`w-full text-left text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                styles.mobileMenuItem
              }`}
              style={{
                animationDelay: isOpen ? `${(navItems.length + 1) * 0.05}s` : '0s',
              }}
            >
              Language: IND
            </button>

            {!loading && (
              <>
                {user ? (
                  <>
                    <div className="text-white text-sm font-medium py-3 px-4 truncate">
                      {user.email}
                    </div>
                    <button
                      onClick={async () => {
                        await logout();
                        navigate('/');
                        onClose();
                      }}
                      className={`w-full text-left text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                        styles.mobileMenuItem
                      }`}
                      style={{
                        animationDelay: isOpen ? `${(navItems.length + 2) * 0.05}s` : '0s',
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/signin');
                      onClose();
                    }}
                    className={`w-full text-left text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                      styles.mobileMenuItem
                    }`}
                    style={{
                      animationDelay: isOpen ? `${(navItems.length + 2) * 0.05}s` : '0s',
                    }}
                  >
                    Sign In
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
