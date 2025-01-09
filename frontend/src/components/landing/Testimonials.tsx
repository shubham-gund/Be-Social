'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Users, Sun, MessageCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
import { cn } from '../../lib/utils'

// Stats data
const stats = [
  {
    icon: Users,
    value: "1M+",
    label: "Chill People",
    quote: "Itne log kaha se aa gaye? 🤠"
  },
  {
    icon: Sun,
    value: "50K+",
    label: "Active Communities",
    quote: "Har vibe ka group hai! 💕"
  },
  {
    icon: MessageCircle,
    value: "10M+",
    label: "Daily Messages",
    quote: "Baatein toh ho rahi hai! 💫"
  }
]

// Testimonials data
const testimonials = [
  {
    avatar: "😎",
    name: "Chill Vibes Only",
    handle: "@chillbro",
    content: "Bro AI suggestions are literally reading my mind! Never had such smooth conversations before 🚀",
    rating: 5
  },
  {
    avatar: "✨",
    name: "Content Creator",
    handle: "@creative_vibes",
    content: "Caption generator ne game change kar diya! No more writer's block 💫",
    rating: 5
  },
  {
    avatar: "🎯",
    name: "Community Leader",
    handle: "@vibe_master",
    content: "Found my tribe here! Best community features ever seen 🎯",
    rating: 5
  }
]

const StatCard = ({ icon: Icon, value, label, quote }: {
  icon: React.ElementType;
  value: string;
  label: string;
  quote: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900/50 backdrop-blur p-8 rounded-2xl border border-zinc-800"
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-purple-500/10 mb-4">
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
        <motion.h3
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-4xl font-bold text-white mb-2"
        >
          {value}
        </motion.h3>
        <p className="text-zinc-400 mb-4">{label}</p>
        <p className="text-sm bg-zinc-800/50 p-3 rounded-xl text-white">{quote}</p>
      </div>
    </motion.div>
  )
}

const TestimonialCard = ({ testimonial, isActive }: {
  testimonial: typeof testimonials[0];
  isActive: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "bg-zinc-900/50 backdrop-blur p-6 rounded-2xl border border-zinc-800",
        "transition-all duration-300",
        isActive ? "border-purple-500/50" : "border-transparent"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-2xl">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-white">{testimonial.name}</h4>
          <p className="text-sm text-zinc-400">{testimonial.handle}</p>
        </div>
      </div>
      <p className="text-white mb-4">{testimonial.content}</p>
      <div className="flex justify-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const next = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }, [])

  const previous = useCallback(() => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }, [])

  return (
    <div id="testimonials" className="min-h-screen bg-black py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 mb-16">
            Join the Vibe Tribe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 mb-16">
            Vibe Check Reviews
          </h2>
          <div className="relative">
            <div className="flex justify-center items-center gap-6">
              <button
                onClick={previous}
                className="p-2 rounded-full bg-zinc-800/50 text-white hover:bg-zinc-700/50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="relative w-full max-w-2xl">
                <AnimatePresence mode="wait">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={cn(
                        "transition-all duration-500",
                        index === currentTestimonial ? "opacity-100" : "opacity-0 absolute inset-0"
                      )}
                    >
                      <TestimonialCard 
                        testimonial={testimonial} 
                        isActive={index === currentTestimonial} 
                      />
                    </div>
                  ))}
                </AnimatePresence>
              </div>

              <button
                onClick={next}
                className="p-2 rounded-full bg-zinc-800/50 text-white hover:bg-zinc-700/50 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

