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
      className={`absolute top-full bg-white border-t border-gray-200 shadow-lg ${styles.megaMenuEnter}`}
      style={{
        left: 0,
        width: '500px',
        zIndex: 40,
      }}
      role="menu"
      aria-label="Services submenu"
    >
      <div className="p-6">
        <div className="space-y-4">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 no-wrap"
              role="menuitem"
            >
              <h3 className="text-gray-900 text-sm font-bold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                {service.title}
              </h3>
              <p className="text-gray-600 text-xs leading-snug line-clamp-2">
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
