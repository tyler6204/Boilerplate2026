"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { IconChevronDown } from "@tabler/icons-react"

import { cn } from "../../lib/utils"

function Collapsible({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn(
        // MARK: Brand container styling
        className
      )}
      {...props}
    />
  )
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      suppressHydrationWarning
      className={cn(
        // MARK: Interactive trigger with brand theming
        "flex w-full items-center justify-between rounded-xl text-left text-sm font-medium outline-none transition-all text-brand",
        // Focus and hover states
        "focus-visible:underline",
        "hover:underline cursor-pointer",
        // Ensure border is visible when open and rotate icon when open
        "border border-transparent [&[data-state=open]>svg]:rotate-180 data-[state=open]:border-b",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <IconChevronDown className="text-foreground-secondary pointer-events-none size-4 shrink-0 translate-y-0.25 transition-transform duration-200" />
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      suppressHydrationWarning
      className={cn(
        // MARK: Content with brand-themed styling
        "overflow-hidden text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
