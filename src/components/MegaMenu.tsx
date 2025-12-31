import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface MegaMenuProps {
  itemLabel: string;
  isOpen: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ itemLabel, isOpen }) => {
  // Only show mega menu for Services
  if (!isOpen || itemLabel !== 'Services') {
    return null;
  }

  const services = [
    {
      title: 'PON & FTTH Planning',
      description: 'Fiber access network design and engineering',
      href: '/pon-ftth',
    },
    {
      title: 'Microwave Network Design',
      description: 'Carrier-grade wireless network solutions',
      href: '/microwave-network',
    },
    {
      title: 'Long-Haul Optical Networks',
      description: 'Backbone fiber transport planning',
      href: '/optical-long-haul',
    },
    {
      title: 'Wi-Fi Network Solutions',
      description: 'Wireless infrastructure planning',
      href: '/wifi-network',
    },
  ];

  return (
    <div
      className={`absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg ${styles.megaMenuEnter}`}
      style={{
        width: '100vw',
        left: 'calc(-50vw + 50%)',
        zIndex: 40,
      }}
      role="menu"
      aria-label="Services submenu"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-4 gap-8 py-12">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="group py-4 transition-colors duration-200 hover:opacity-80"
              role="menuitem"
            >
              <h3 className="text-gray-900 text-sm font-semibold mb-2 group-hover:text-black">
                {service.title}
              </h3>
              <p className="text-gray-600 text-xs leading-snug group-hover:text-gray-700">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
