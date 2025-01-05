import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import XSvg from '../svgs/Logo';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <nav className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <XSvg className='w-8 h-8 fill-base-content' />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              - Social
            </span>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#ai-power"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              AI Power
            </a>
            <a
              href="#get-started"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Sign Up Button */}
          <div className=''>
            <Link to={"/signup"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full font-medium shadow-lg mr-4"
              >
                Sign Up
              </motion.button>
            </Link>
            <Link to={"/login"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full font-medium shadow-lg"
              >
                Login
              </motion.button>
            </Link>
          </div>
          
        </div>
      </nav>
    </header>
  );
};
