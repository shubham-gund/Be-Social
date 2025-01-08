import * as React from 'react'
import { useState } from 'react'
import { motion, useInView } from "framer-motion"
import { Sparkles, Bot, Clock, Target, Activity } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Card } from '../ui/Card'

function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs))
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost'
  size?: 'default' | 'sm'
}>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export default function AISection() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [captions, setCaptions] = useState([
    "Living my best life, one vibe at a time 😎✨",
    "Keep it chill, keep it real 🎸",
    "Goals: Stay cool, stay winning 💫"
  ])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div id='ai-tools' className="min-h-screen bg-black p-6 md:p-12">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="p-4 pt-10 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            AI Magic At Your Fingertips
          </h1>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {/* Rest of the content remains the same, just changed animate prop to use isInView */}
          <motion.div variants={item}>
            <Card className="p-6 bg-zinc-900/50 backdrop-blur border-zinc-800">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-purple-400">Smart Chat Assistant</h2>
              </div>
              <div className="p-4 mb-4 mr-10 rounded-xl bg-zinc-800 border-zinc-700 text-white">
                Hey, need help with a caption!
              </div>
              <div className="ml-12 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl mb-4">
                <p className="text-white">I can help! What&apos;s the vibe you&apos;re going for? 😎</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {['Chill', 'Professional', 'Funny'].map((mood) => (
                  <Button
                    key={mood}
                    variant={selectedMood === mood ? "default" : "secondary"}
                    onClick={() => setSelectedMood(mood)}
                    className={cn(
                      "transition-all hover:scale-105",
                      selectedMood === mood 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-zinc-800 text-purple-400 hover:bg-zinc-700'
                    )}
                  >
                    <span className='p-2'>{mood}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="p-6 bg-zinc-900/50 backdrop-blur border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-semibold text-purple-400">Caption Generator</h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-purple-400 hover:text-purple-300"
                  onClick={() => {
                    setCaptions(prevCaptions => [
                      ...prevCaptions.slice(1),
                      `New caption ${Math.floor(Math.random() * 1000)} 🎉`
                    ])
                  }}
                >
                  Regenerate ↺
                </Button>
              </div>
              <div className="space-y-3">
                {captions.map((caption, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700/50 transition-colors text-white"
                  >
                    {caption}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6"
        >
          {[
            { icon: Clock, value: "500ms", label: "Average Response Time" },
            { icon: Target, value: "99.9%", label: "Accuracy Rate" },
            { icon: Activity, value: "24/7", label: "AI Availability" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Card className="p-6 text-center bg-zinc-900/50 backdrop-blur border-zinc-800">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {stat.value}
                </h3>
                <p className="text-zinc-400">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}