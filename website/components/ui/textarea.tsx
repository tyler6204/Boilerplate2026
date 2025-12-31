import * as React from "react"

import { cn } from "../../lib/utils"

function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Brand textarea styling to match input/card components
        "placeholder:text-foreground-secondary/70 selection:bg-brand selection:text-white",
        "border border-brand/20 bg-background/70 backdrop-blur-sm text-foreground",
        "flex w-full min-w-0 rounded-xl px-3 py-2 text-base shadow-xs shadow-brand/20",
        "transition-[border-color,box-shadow,background-color] outline-none",
        // Interactive states with brand theming
        "hover:border-brand/60 hover:bg-brand/5",
        "focus-visible:border-brand focus-visible:ring-brand/20 focus-visible:ring-[3px] focus-visible:bg-brand/5",
        // Error states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Disabled states
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Sizing
        "text-sm min-h-[100px]",
        className
      )}
      {...props}
    />
  )
}

export { TextArea }


