import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import XSvg from '../svgs/Logo';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md w-full ">
      <nav className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <XSvg className="w-6 h-6 sm:w-8 sm:h-8 fill-base-content" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              - Social
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-purple-400 transition-colors text-sm lg:text-base"
            >
              Features
            </a>
            <a
              href="#ai-power"
              className="text-gray-300 hover:text-purple-400 transition-colors text-sm lg:text-base"
            >
              AI Power
            </a>
            <a
              href="#get-started"
              className="text-gray-300 hover:text-purple-400 transition-colors text-sm lg:text-base"
            >
              Get Started
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-lg text-sm lg:text-base"
              >
                Sign Up
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-lg text-sm lg:text-base"
              >
                Login
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden py-4 px-2"
          >
            <div className="flex flex-col space-y-4 w-full">
              <a
                href="#features"
                className="text-gray-300 hover:text-purple-400 transition-colors text-lg"
              >
                Features
              </a>
              <a
                href="#ai-power"
                className="text-gray-300 hover:text-purple-400 transition-colors text-lg"
              >
                AI Power
              </a>
              <a
                href="#get-started"
                className="text-gray-300 hover:text-purple-400 transition-colors text-lg"
              >
                Get Started
              </a>
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/signup" className="w-full">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-lg text-base"
                  >
                    Sign Up
                  </motion.button>
                </Link>
                <Link to="/login" className="w-full">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-lg text-base"
                  >
                    Login
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;