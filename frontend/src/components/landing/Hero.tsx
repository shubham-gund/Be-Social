import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const parallax = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeIn" } },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
  };
  return (
    <section id="hero" className="min-h-screen bg-black text-white pt-8 sm:pt-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Text Section */}
          <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="space-y-8" variants={textVariants}>
            <motion.h1
              className="text-4xl md:text-6xl font-bold"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                The Social App
              </span>
              <br />
              <span className="mt-2">for Chill❄️ People</span>
            </motion.h1>
            <motion.div
              className="bg-neutral-800 p-6 rounded-xl border border-purple-500/20 transform hover:-rotate-1 transition-transform duration-300"
              whileHover={{ rotate: -2, scale: 1.05 }}
            >
              <p className="text-xl italic text-gray-300">"kitne features the?"</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
                "Saare features the!" 🚀
              </p>
            </motion.div>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Join the vibe where AI meets social. Generate captions, get smart replies, and connect with your crew - all with that extra chill factor. ✨
            </motion.p>
            <div className="flex flex-wrap gap-4  ">
              <motion.button
                whileHover={buttonVariants.hover}
                className="bg-neutral-800 px-4 sm:px-8 py-4 rounded-full text-lg sm:text-xl font-semibold hover:bg-neutral-700 transition-colors duration-200 border border-purple-500/20"
              >
                See Features
              </motion.button>
              <motion.div
                whileHover={buttonVariants.hover}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-8 py-4 font-bold text-lg sm:text-xl  rounded-full hover:opacity-90 transition-opacity duration-200"
              >
                <Link to="/signup">Get Started!!</Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Image/Visual Section */}
          <motion.div
            className="relative flex justify-center items-center"
            variants={parallax}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 blur-3xl opacity-50"></div>
            <motion.div
              className="relative z-10 flex flex-col gap-6 p-6 bg-neutral-900 rounded-3xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="sm:p-4 rounded-lg flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center p-2">
                  <span className="text-2xl">🤖</span>
                </div>
                <p className="bg-gray-800 text-white font-semibold p-2 sm:p-4 rounded-xl">
                  Ready to keep it chill with AI-powered features? 😎
                </p>
              </motion.div>
              <motion.div
                className="relative flex items-center gap-3 sm:ml-6"
                whileHover={{ scale: 1.05 }}
              >
                <p className="w-9/12 sm:w-10/12 ml-3 sm:ml-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold p-2 sm:p-4">
                  Always keeping it cool with smart replies! 🚀
                </p>
                <div className="absolute  right-0 sm:right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-lg sm:text-2xl">✨</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
