"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "../../lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // MARK: Brand label styling with subtle brand accent
        "flex items-center gap-2 text-sm leading-none font-medium select-none text-foreground",
        // MARK: Disabled states with consistent opacity
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        // MARK: Optional brand accent for required fields or important labels
        "has-[.required]:text-brand/90",
        className
      )}
      {...props}
    />
  )
}

export { Label }
