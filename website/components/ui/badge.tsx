import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  // MARK: Base badge styling with brand integration
  "inline-flex items-center justify-center rounded-xl px-2.25 py-0.75 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-brand/20 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          // MARK: Brand primary variant with gradient
          "bg-linear-to-b from-brand to-brand/90 text-white shadow-brand/20 [a&]:hover:from-brand/95 [a&]:hover:to-brand/80",
        secondary:
          // MARK: Brand outline variant
          "bg-background/70 text-brand backdrop-blur-sm shadow-brand/20 [a&]:hover:bg-brand/5",
        destructive:
          "bg-destructive/90 text-white shadow-sm focus-visible:ring-2 focus-visible:ring-destructive/20 backdrop-blur-sm [a&]:active:bg-destructive/90",
        success:
          "bg-success/90 text-white shadow-sm [a&]:hover:bg-success/90 focus-visible:ring-2 focus-visible:ring-success/20 backdrop-blur-sm [a&]:active:bg-success/90",
        warning:
          "bg-warning/90 text-white shadow-sm [a&]:hover:bg-warning/90 focus-visible:ring-2 focus-visible:ring-warning/20 backdrop-blur-sm [a&]:active:bg-warning/90",
        outline:
          // MARK: Subtle outline with brand theming
          "border border-brand/30 bg-background/70 text-brand backdrop-blur-sm shadow-brand/20 [a&]:hover:bg-brand/5 [a&]:hover:text-brand",
        overlay:
          // MARK: Lightweight overlay badge (no blur for performance)
          "bg-brand text-white shadow-none transition-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
