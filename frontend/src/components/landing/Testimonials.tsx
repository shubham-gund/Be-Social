import { ChevronLeft, ChevronRight, Users, Sun, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/utils'
import { useTheme } from '../../contexts/ThemeContext'

const stats = [
  { icon: Users, value: "1M+", label: "Chill People", quote: "Itne log kaha se aa gaye? 🤠" },
  { icon: Sun, value: "50K+", label: "Active Communities", quote: "Har vibe ka group hai! 💕" },
  { icon: MessageCircle, value: "10M+", label: "Daily Messages", quote: "Baatein toh ho rahi hai! 💫" }
]

const testimonials = [
  { avatar: "😎", name: "Chill Vibes Only", handle: "@chillbro", content: "Bro AI suggestions are literally reading my mind! 🚀", rating: 5 },
  { avatar: "✨", name: "Content Creator", handle: "@creative_vibes", content: "Caption generator ne game change kar diya! 💫", rating: 5 },
  { avatar: "🎯", name: "Community Leader", handle: "@vibe_master", content: "Found my tribe here! 🎯", rating: 5 }
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { theme } = useTheme();

  const next = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  const previous = () => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))

  return (
    <div className={cn("min-h-screen py-20 px-4 md:px-6", theme === "dark" ? "bg-black text-white" : "bg-white text-black")}> 
      <div className="max-w-6xl mx-auto">

        {/* Stats Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500">
            Join the Vibe Tribe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={cn("p-8 rounded-2xl border", theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-100 border-gray-300")}>
                <div className="text-center">
                  <stat.icon className="w-6 h-6 mx-auto text-purple-400 mb-4" />
                  <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                  <p className="mb-4">{stat.label}</p>
                  <p className={cn("text-sm p-3 rounded-xl", theme === "dark" ? "bg-zinc-800/50" : "bg-gray-200")}>{stat.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500">
            Vibe Check Reviews
          </h2>
          <div className="relative flex justify-center items-center gap-6">
            <button onClick={previous} className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className={cn("p-6 rounded-2xl border w-full max-w-2xl", theme === "dark" ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-100 border-gray-300")}>
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-2xl", theme === "dark" ? "bg-purple-500" : "bg-purple-200 text-purple-900")}>
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[currentTestimonial].handle}</p>
                </div>
              </div>
              <p className="mb-4">{testimonials[currentTestimonial].content}</p>
              <div className="flex justify-center gap-1">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>

            <button onClick={next} className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
