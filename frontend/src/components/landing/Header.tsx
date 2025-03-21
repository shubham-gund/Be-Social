import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggler from '../common/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" }
  };

  const getHeaderBgClass = () => {
    switch (theme) {
      case 'light': return 'bg-gradient-to-b from-white to-gray-100';
      case 'dark': return 'bg-gradient-to-b from-gray-900 to-black';
      case 'forest': return 'bg-gradient-to-b from-green-900 to-green-800';
      default: return 'bg-gradient-to-b from-black to-gray-900';
    }
  };

  const getTextColorClass = () => theme === 'light' ? 'text-gray-800' : 'text-white';
  const getBorderColorClass = () => theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  // Hide navigation links on login and signup pages
  const hideNavLinks = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className={`fixed w-full top-0 z-50 ${getHeaderBgClass()} ${getTextColorClass()} border-b ${getBorderColorClass()} drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]`}> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Bee-Social
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          {!hideNavLinks && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#features" className={`hover:text-purple-400 transition-colors duration-200 ${getTextColorClass()}`}>Features</a>
                <a href="#ai-tools" className={`hover:text-purple-400 transition-colors duration-200 ${getTextColorClass()}`}>AI Tools</a>
                <a href="#testimonials" className={`hover:text-purple-400 transition-colors duration-200 ${getTextColorClass()}`}>Testimonials</a>
                <a href="#pricing" className={`hover:text-purple-400 transition-colors duration-200 ${getTextColorClass()}`}>Pricing</a>
              </div>
            </div>
          )}

          {/* Desktop: Sign Up Button & Theme Toggle */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-200 text-white"
            >
              Sign Up
            </Link>

            <div className="pb-1">
              <ThemeToggler />
            </div> 
          </div>

          {/* Mobile: Hamburger Menu & Theme Toggle */}
          {!hideNavLinks && (
            <div className="md:hidden flex items-center">
              {/* Theme Toggle Button in Mobile */}
              <div className='pb-2'>
                <ThemeToggler />  
              </div>

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                className={`inline-flex items-center justify-center p-2 rounded-md ${getTextColorClass()} hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500`}
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && !hideNavLinks && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${getHeaderBgClass()} border-b ${getBorderColorClass()}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className={`block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 transition-colors duration-200 ${getTextColorClass()}`}>Features</a>
              <a href="#ai-tools" className={`block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 transition-colors duration-200 ${getTextColorClass()}`}>AI Tools</a>
              <a href="#testimonials" className={`block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 transition-colors duration-200 ${getTextColorClass()}`}>Testimonials</a>
              <a href="#pricing" className={`block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 transition-colors duration-200 ${getTextColorClass()}`}>Pricing</a>
              
              {/* Show Sign Up button in mobile menu */}
              <Link to="/signup" className="block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-200 text-white">
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
