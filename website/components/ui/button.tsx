"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-brand/20 focus-visible:border-brand/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:outline-0",
  {
    variants: {
      variant: {
        brandDestructive:
          "relative overflow-hidden border rounded-xl border-background/20 bg-linear-to-b from-destructive to-destructive/90 text-white shadow-sm hover:from-destructive/95 hover:to-destructive/80 focus-visible:ring-destructive/20 focus-visible:ring-2 focus-visible:border-destructive/20 active:scale-[0.98] active:from-destructive/90 active:to-destructive/70 backdrop-blur-sm",
        brandLightDestructive:
          "relative overflow-hidden border rounded-xl border-background/20 bg-linear-to-b from-error/90 to-error/80 text-white shadow-sm hover:from-error/95 hover:to-error/90 focus-visible:ring-destructive/20 focus-visible:border-destructive/20 focus-visible:ring-2 active:scale-[0.98] active:from-error/95 active:to-error/70 backdrop-blur-sm",
        destructiveOutline:
          "border rounded-xl border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive/15 hover:border-destructive/60 focus-visible:ring-destructive/20 focus-visible:border-destructive/20 focus-visible:ring-2 shadow-xs active:scale-[0.98] backdrop-blur-sm",
        brandAccent:
          "relative overflow-hidden border rounded-xl border-background/20 bg-linear-to-b from-brand to-brand/90 text-background shadow-sm hover:from-brand/95 hover:to-brand/80 focus-visible:border-brand/20 focus-visible:ring-2 active:scale-[0.98] active:from-brand/90 active:to-brand/70 backdrop-blur-sm",
        success:
          "relative overflow-hidden border rounded-xl border-green-600/20 bg-linear-to-b from-green-600 to-green-600/90 text-white shadow-sm hover:from-green-600/95 hover:to-green-600/80 focus-visible:ring-green-600/20 focus-visible:border-green-600/20 focus-visible:ring-2 active:scale-[0.98] active:from-green-600/90 active:to-green-600/70 backdrop-blur-sm",
        successOutline:
          "border rounded-xl border-green-600/30 text-green-700 bg-success/10 hover:bg-success/30 hover:border-green-600/60 focus-visible:ring-green-600/20 focus-visible:border-green-600/20 focus-visible:ring-2 shadow-xs active:scale-[0.98] backdrop-blur-sm",
        brandGhost:
          "rounded-xl bg-transparent text-brand hover:bg-brand/5 active:scale-[0.98] focus-visible:ring-brand/20 focus-visible:ring-2 focus-visible:border-brand/20",
        brandOutline:
          "border rounded-xl border-brand/20 text-brand hover:bg-brand/5 hover:border-brand/60 focus-visible:border-brand/20 focus-visible:ring-brand/20 focus-visible:ring-2 shadow-xs active:scale-[0.98] shadow-brand/20 backdrop-blur-sm",
        brandLink: "text-brand underline-offset-2 hover:underline decoration-brand/70 hover:text-brand/90 focus-visible:ring-brand/20 focus-visible:ring-2",
        link: "text-foreground underline-offset-2 hover:underline decoration-foreground/70 hover:text-foreground/90 focus-visible:ring-foreground/20 focus-visible:ring-2",
        plain:
          "focus-visible:ring-brand/20 focus-visible:ring-2 focus-visible:border-brand/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-8 rounded-md",
        link: "",
      },
    },
    defaultVariants: {
      variant: "brandAccent",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
