import { Link } from "react-router-dom";

const Header = () => (
  <nav className="fixed w-full z-50 bg-neutral-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0 flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate__animated animate__fadeIn">
            Bee-Social
          </span>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-center space-x-8">
            <a href="#features" className="hover:text-purple-400 transition-colors duration-200">Features</a>
            <a href="#ai-tools" className="hover:text-purple-400 transition-colors duration-200">AI Tools</a>
            <a href="#community" className="hover:text-purple-400 transition-colors duration-200">Community</a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors duration-200">Pricing</a>
            <Link to="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-200">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;