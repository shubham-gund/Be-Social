import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquareText, Sparkles, Send, Image, Bot, Users, LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-purple-950 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-purple-100" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: Bot,
      title: "AI Chat Assistant",
      description: "Get instant responses and suggestions powered by advanced AI technology."
    },
    {
      icon: Image,
      title: "Smart Captions",
      description: "Generate engaging captions for your posts using AI-powered suggestions."
    },
    {
      icon: MessageSquareText,
      title: "Quick Replies",
      description: "Respond faster with intelligent reply suggestions based on context."
    },
    {
      icon: Send,
      title: "Real-time Messaging",
      description: "Connect instantly with friends through seamless real-time messaging."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Create and join communities with like-minded individuals."
    },
    {
      icon: Sparkles,
      title: "AI Content Enhancement",
      description: "Enhance your content with AI-powered editing and suggestions."
    }
  ];

  return (
    <section id="features" className="py-20 bg-black w-full">
      <div className="w-full px-6 sm:px-12 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}  
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful Features for Modern Social Connection
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            Experience the next generation of social networking with our AI-powered features
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;