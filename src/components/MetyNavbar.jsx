import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

/**
 * METY Navbar Component
 * Replicates the Bootstrap navbar structure with Tailwind and METY brand tokens
 * 
 * @param {Object} props
 * @param {string} props.brandLogo - Path to brand logo image
 * @param {Array} props.navItems - Array of navigation items with {label, path, color}
 * @param {boolean} props.fixed - Whether navbar is fixed to top
 * @param {string} props.className - Additional CSS classes
 */
const MetyNavbar = ({ 
  brandLogo = "/mety-logo.svg",
  navItems = [
    { label: "Home", path: "/", color: "#20545c" },
    { label: "My Youthspan", path: "/myyouthspan", color: "#20545c" },
    { label: "Careers", path: "/careers", color: "#20545c" },
    { label: "News", path: "/news", color: "#20545c" },
    { label: "About", path: "/about", color: "#20545c" },
    { label: "Contact", path: "/contact", color: "#20545c" }
  ],
  fixed = true,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (fixed) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [fixed]);

  return (
    <nav 
      className={`
        ${fixed ? 'fixed top-0 left-0 right-0 z-50' : ''}
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'py-4 bg-brand-secondary shadow-lg' : 'py-6 bg-white'}
        ${className}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={brandLogo} 
              alt="METY Technology" 
              className={`transition-all duration-300 ${
                isScrolled ? 'h-8' : 'h-10'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="font-brandHeading text-sm font-medium uppercase tracking-wider transition-colors duration-200 hover:text-brand-accent"
                style={{ color: item.color }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-md text-brand-secondary hover:bg-brand-accent/10 transition-colors duration-200"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-brand-neutral/20">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="font-brandHeading text-sm font-medium uppercase tracking-wider transition-colors duration-200 hover:text-brand-accent"
                  style={{ color: item.color }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MetyNavbar;
