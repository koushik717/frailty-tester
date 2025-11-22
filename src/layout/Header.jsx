import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSettings } from "../store/slices/settingsSlice";
import { returnHome } from "../store/slices/stageSlice";
import { logoutUser, loadUserFromStorage } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { LogOut } from "lucide-react";

// Semantic class constants - FrailtyTester branding
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
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Load user from localStorage on mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className={headerContainerClasses}>
      <div className={headerContentClasses}>
        {/* FrailtyTester Logo/Title */}
        <Link to="/" className={logoLinkClasses} onClick={() => dispatch(returnHome())}>
          <div className="h-12 w-12 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <span className={logoTextClasses}>FrailtyTester</span>
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
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className={navLinkClasses}
              >
                {user?.name || 'Profile'}
              </Link>
              <button
                onClick={handleLogout}
                className={classNames(navLinkClasses, "flex items-center gap-2")}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={navLinkClasses}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={classNames(navLinkClasses, "bg-primary text-white hover:bg-primary-dark hover:text-white px-8 shadow-md hover:shadow-lg")}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;