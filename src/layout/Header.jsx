import React from "react";
import { useDispatch } from "react-redux";
import { openSettings } from "../store/slices/settingsSlice";
import { returnHome } from "../store/slices/stageSlice";
import { Link } from "react-router-dom";
import classNames from "classnames";

// Semantic class constants - MyYouthspan branding
const headerContainerClasses = "sticky top-0 z-50 w-full bg-white shadow-md border-b border-neutral-light";
const headerContentClasses = "flex justify-between items-center h-24 px-10 max-w-7xl mx-auto";
const logoLinkClasses = "flex items-center gap-4 cursor-pointer group";
const logoImageClasses = "h-12 w-auto transition-transform duration-200 group-hover:scale-105";
const logoTextClasses = "text-primary font-semibold text-xl tracking-wide font-montserrat";
const navigationClasses = "flex items-center gap-8";
const navLinkClasses = classNames(
  "px-6 py-3 rounded-lg font-medium text-base tracking-wide font-sans",
  "text-neutral-medium hover:text-primary hover:bg-gray-50",
  "transition-all duration-200 hover:shadow-sm"
);

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className={headerContainerClasses}>
      <div className={headerContentClasses}>
        {/* MyYouthspan Logo/Title */}
        <Link to="/" className={logoLinkClasses} onClick={() => dispatch(returnHome())}>
          <img 
            src="/mety_technology_logo.png" 
            alt="MyYouthspan Technology" 
            className={logoImageClasses}
          />
                          <span className={logoTextClasses}>Frailty Tester</span>
        </Link>
        {/* Navigation Menu */}
        <nav className={navigationClasses}>
          <Link
            to="/"
            className={navLinkClasses}
            onClick={() => dispatch(returnHome())}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={navLinkClasses}
          >
            About
          </Link>
          <Link
            to="/settings"
            className={navLinkClasses}
          >
            Settings
          </Link>
          <Link
            to="/profile"
            className={navLinkClasses}
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;