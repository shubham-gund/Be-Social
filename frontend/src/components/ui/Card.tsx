// Card Component
import React from "react"
import { cn } from "../../lib/utils"
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow transition-colors",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"