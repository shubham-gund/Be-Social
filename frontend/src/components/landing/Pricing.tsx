import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, MessageCircle, Bot, TrendingUp, BarChart3, Star} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../../contexts/ThemeContext";

function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs));
}

interface PricingFeature {
  icon: React.ElementType;
  text: string;
}

interface PricingTier {
  badge?: string;
  name: string;
  price: number;
  features: PricingFeature[];
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    badge: "Basic",
    name: "Casual Vibes",
    price: 9,
    features: [
      { icon: Sparkles, text: "Basic AI Caption Generation" },
      { icon: MessageCircle, text: "Smart Reply Suggestions" },
      { icon: Bot, text: "Limited AI Chatbot Access" },
    ],
  },
  {
    badge: "Popular",
    name: "Pro Vibes",
    price: 19,
    isPopular: true,
    features: [
      { icon: Sparkles, text: "Advanced AI Caption Generation" },
      { icon: MessageCircle, text: "Unlimited Smart Replies" },
      { icon: Bot, text: "Full AI Chatbot Access" },
      { icon: TrendingUp, text: "Trending Topics Analysis" },
      { icon: BarChart3, text: "Advanced Analytics" },
    ],
  },
  {
    badge: "Premium",
    name: "Ultimate Vibes",
    price: 29,
    features: [
      { icon: Sparkles, text: "Premium AI Features" },
      { icon: MessageCircle, text: "Priority Smart Replies" },
      { icon: Bot, text: "Advanced AI Assistant" },
      { icon: TrendingUp, text: "Content Strategy AI" },
      { icon: Star, text: "VIP Support" },
    ],
  },
];

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "gradient";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "w-full px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ease-out",
        variant === "default" ? "bg-purple-600 hover:bg-purple-500 text-white" : undefined,
        variant === "gradient" ? "bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white" : undefined,
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <div
        className={cn(
          "h-full rounded-2xl p-8 backdrop-blur transition-colors flex flex-col",
          tier.isPopular
            ? "bg-gradient-to-b from-purple-900 to-slate-950 border-2 border-purple-500/50"
            : "bg-gradient-to-b from-gray-900 to-gray-800 border-gray-800",
          tier.isPopular
            ? "bg-gradient-to-b from-purple-900 to-slate-950 border-2 border-purple-500/50"
            : "dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 dark:border-gray-800",
        )}
      >
        <div className="flex-1">
          {tier.badge && (
            <span
              className={cn(
                "px-3 py-1 text-xs rounded-full mb-4 inline-block",
                tier.isPopular
                  ? "bg-purple-500 text-white"
                  : "bg-zinc-800 text-zinc-400",
                "dark:bg-gray-700 dark:text-gray-300"
              )}
            >
              {tier.badge}
            </span>
          )}

          <h3 className="text-2xl font-bold text-white dark:text-gray-200 mb-2">{tier.name}</h3>
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold text-white dark:text-gray-100">${tier.price}</span>
            <span className="text-zinc-400 dark:text-gray-400 ml-2">/month</span>
          </div>

          <ul className="space-y-4 mb-8">
            {tier.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: featureIndex * 0.1 }}
                className="flex items-center gap-3 text-zinc-300 dark:text-gray-300"
              >
                <feature.icon className="w-5 h-5 text-purple-400 dark:text-purple-300" />
                <span>{feature.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <Button
          variant={tier.isPopular ? "gradient" : "default"}
          className="group relative overflow-hidden mt-auto"
        >
          <span className="relative z-10">Get Started</span>
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </Button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const {theme} = useTheme()

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <section id="pricing" className="w-full py-20 px-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Choose Your Vibe Level
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Level up your social game with AI-powered features that keep it chill ❄️
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
