import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, Sparkles, MessageSquareText } from 'lucide-react';

export const AISection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,  // Ensures the animation triggers both when scrolling down and up
    threshold: 0.1,      // Trigger when 10% of the section is in view
  });

  return (
    <section id="ai-power" className="py-20 bg-gradient-to-b from-black to-purple-950 w-full px-20">
      <div className="w-full px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}  // Animation on view
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Powered by Advanced{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Smart Chat Assistant</h3>
                  <p className="text-gray-600">
                    Our AI chat assistant helps you maintain engaging conversations and suggests
                    relevant responses based on context.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Generated Captions</h3>
                  <p className="text-gray-600">
                    Create perfect captions for your posts with our AI-powered caption generator
                    that understands your content.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MessageSquareText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quick Reply Suggestions</h3>
                  <p className="text-gray-600">
                    Get intelligent reply suggestions that match your communication style and
                    maintain meaningful conversations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}  // Animation on view
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://media.istockphoto.com/id/1494104649/photo/ai-chatbot-artificial-intelligence-digital-concept.jpg?s=612x612&w=0&k=20&c=1Zq2sj3W0tWcpc-n1fVt4dQQOBGhtwcAk1H2eQ5MAbI="
              alt="AI Technology"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
