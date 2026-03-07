import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

const PRIMARY_COLOR = '#0C94CE';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  if (location.pathname === '/card') {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <span className="font-bold text-xl">NODALWIRE</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Innovative and sustainable digital solutions for modern businesses.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>contact@nodalwire.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 (617) 680-4300</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Registered Office: NodalWire LLC 8 THE GRN STE B DOVER, DE 19901</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8" style={{ borderColor: '#ffffff40' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} NODALWIRE. All rights reserved.
            </p>
              <div className="flex gap-4 items-center">
              <a
                href="#"
                className="text-gray-400 transition"
                aria-label="LinkedIn"
                style={{ color: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PRIMARY_COLOR)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition"
                aria-label="Twitter"
                style={{ color: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PRIMARY_COLOR)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition"
                aria-label="GitHub"
                style={{ color: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PRIMARY_COLOR)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
