import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GetStarted: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="get-started" className="py-20 bg-gradient-to-b from-purple-950 to-gray-900">
      <div className="container mx-auto px-6 sm:px-8 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Ready to Experience the Future of Social Media?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Join thousands of users already connecting smarter with BeSocial's AI-powered platform.
            Start your journey today!
          </p>
          <Link to={"/signup"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-full font-medium text-lg inline-flex items-center space-x-2 hover:from-purple-500 hover:to-blue-400"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">10K+</h3>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">1M+</h3>
              <p className="text-gray-300">AI-Generated Captions</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">5M+</h3>
              <p className="text-gray-300">Messages Sent</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
