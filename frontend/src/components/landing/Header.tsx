import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
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

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-b from-black to-gray-900  text-white border-b border-gray-500 drop-shadow-[0 4px 6px rgba(255, 255, 255, 0.5)]"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to={"/"} className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate__animated animate__fadeIn">
              Bee-Social
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#features" className="hover:text-purple-400 transition-colors duration-200">Features</a>
              <a href="#ai-tools" className="hover:text-purple-400 transition-colors duration-200">AI Tools</a>
              <a href="#testimonials" className="hover:text-purple-400 transition-colors duration-200">Testimonials</a>
              <a href="#pricing" className="hover:text-purple-400 transition-colors duration-200">Pricing</a>
              <Link to="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-200">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 transition-colors duration-200 border-b">Features</a>
              <a href="#ai-tools" className="block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 transition-colors duration-200 border-b">AI Tools</a>
              <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 transition-colors duration-200 border-b">Testimonials</a>
              <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 transition-colors duration-200 border-b">Pricing</a>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 transition-colors duration-200 border-b">Login</Link>
              <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium  hover:opacity-90 transition-opacity duration-200 border-b">Sign Up</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;

