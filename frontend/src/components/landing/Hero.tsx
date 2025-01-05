import { motion } from 'framer-motion';
import { MessageSquareText, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen pt-20 flex items-center bg-gradient-to-b from-purple-950 to-black via-slate-900
 w-full p-20">
      <div className="w-full px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Section: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}  // Ensure this triggers every time the element enters the viewport
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Connect Smarter with
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {" "}AI-Powered{" "}
              </span>
              Social Media
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Experience social networking enhanced by AI. Get smart replies, AI-generated captions,
              and real-time messaging that makes connecting more meaningful.
            </p>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-full font-medium text-lg"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-medium text-lg"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Right Section: Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}  // Ensure this triggers every time the element enters the viewport
            transition={{ duration: 0.8 }}
            className="relative w-full"
          >
            <img
              src="https://media.istockphoto.com/id/1474046056/photo/young-businessman-in-suit-using-smartphone-global-big-data-connection-concept-through-virtual.jpg?s=612x612&w=0&k=20&c=toCQgau1xZePNkvnmzU_eAlyEMfezM5FR1AxuY4UBm0="
              alt="AI Social Connection"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <MessageSquareText className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
