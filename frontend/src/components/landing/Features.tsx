import * as React from 'react'
import { motion, useInView } from "framer-motion"
import { Bot, Sparkles, MessageCircle, Zap, Users, Wand2 } from 'lucide-react'
import { Card } from '../ui/Card'

interface Feature {
  icon: React.ElementType
  title: string
  description: string
  quote: string
  emoji?: string
}

const features: Feature[] = [
  {
    icon: Bot,
    title: "AI Chat Assistant",
    description: "Get instant responses and suggestions powered by advanced AI technology.",
    quote: "Bro AI itna smart hai, conversation carry kar leta hai",
    emoji: "😎"
  },
  {
    icon: Sparkles,
    title: "Smart Captions",
    description: "Generate engaging captions for your posts using AI-powered suggestions.",
    quote: "Caption ke liye dimaag nahi lagana padta",
    emoji: "💕"
  },
  {
    icon: MessageCircle,
    title: "Quick Replies",
    description: "Respond faster with intelligent reply suggestions based on context.",
    quote: "Reply me bhi sigma bante hai",
    emoji: "💪"
  },
  {
    icon: Zap,
    title: "Real-time Messaging",
    description: "Connect instantly with friends through seamless real-time messaging.",
    quote: "Messaging smooth like butter",
    emoji: "⚡"
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Create and join communities with like-minded individuals.",
    quote: "Apni public, apna zone",
    emoji: "🎯"
  },
  {
    icon: Wand2,
    title: "AI Content Enhancement",
    description: "Enhance your content with AI-powered editing and suggestions.",
    quote: "Content ko next level pe le jaao",
    emoji: "✨"
  }
]

export default function Features() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div id='features' className="min-h-screen bg-black pt-4">
      <section ref={ref} className="w-full py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 mb-4">
              Features that Pass the Vibe Check
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div 
                  key={index} 
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full p-6 bg-zinc-900/50 backdrop-blur border-zinc-800 group-hover:bg-zinc-900/70 group-hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="p-4 rounded-xl bg-zinc-800/50 text-white backdrop-blur-sm group-hover:bg-zinc-800/70 transition-colors duration-300">
                      <p className="flex items-center gap-2 text-sm">
                        {feature.quote} 
                        {feature.emoji && (
                          <span className="animate-bounce">{feature.emoji}</span>
                        )}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}