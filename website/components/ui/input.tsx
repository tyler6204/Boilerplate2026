import * as React from "react"

import { cn } from "../../lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // MARK: Brand input styling to match card and accordion components
        "file:text-foreground placeholder:text-foreground-secondary/70 selection:bg-brand selection:text-white",
        "border border-brand/20 bg-background/70 text-foreground",
        "flex h-9 w-full min-w-0 rounded-xl px-3 py-1 text-base shadow-xs shadow-brand/20",
        "outline-none",
        // MARK: File input styling
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // MARK: Interactive states with brand theming
        "hover:border-brand/60 hover:bg-brand/5",
        "focus-visible:border-brand focus-visible:ring-brand/20 focus-visible:ring-[3px] focus-visible:bg-brand/5",
        // MARK: Error states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // MARK: Disabled states
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
