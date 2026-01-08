import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSettings } from "../store/slices/settingsSlice";
import { returnHome } from "../store/slices/stageSlice";
import { logoutUser, loadUserFromStorage } from "../store/slices/userSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import { LogOut, User, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Assessments", path: "/tests" },
    { name: "Subscription", path: "/subscription" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={classNames(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-gray-200/50 py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => dispatch(returnHome())}
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-105">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className={classNames(
            "text-xl font-bold font-montserrat tracking-tight transition-colors",
            scrolled ? "text-gray-800" : "text-gray-800" // Always dark for readability unless on dark hero
          )}>
            FrailtyTester
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={classNames(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative group",
                isActive(link.path)
                  ? "text-green-600 bg-green-50"
                  : "text-gray-600 hover:text-green-600 hover:bg-gray-50/50"
              )}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-green-50 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          <div className="w-px h-6 bg-gray-200 mx-2"></div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                  {user?.name?.charAt(0) || <User className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                  {user?.name?.split(' ')[0] || 'Profile'}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-gray-600 hover:text-green-600 font-medium text-sm px-4 py-2 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all hover:-translate-y-0.5"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={classNames(
                    "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    isActive(link.path)
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5 text-green-600" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 p-2">
                    <Link
                      to="/login"
                      className="w-full text-center py-3 rounded-xl border border-gray-200 text-gray-700 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full text-center py-3 rounded-xl bg-green-600 text-white font-medium shadow-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;