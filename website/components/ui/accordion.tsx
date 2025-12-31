"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { IconChevronDown } from "@tabler/icons-react"

import { cn } from "../../lib/utils"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        // MARK: Container styling to match brand surface
        "rounded-xl border border-brand/20 bg-background/70 backdrop-blur-sm shadow-xs shadow-brand/20 mb-3 last:mb-0 data-[state=open]:border-brand/20  w-full",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // MARK: Trigger layout and interactive states
          "flex flex-1 items-start justify-between gap-4 rounded-xl px-4 py-2 text-left text-sm font-medium outline-none transition-all w-full",
          // Hover & open states
          // Only apply bg-brand/5 on hover when NOT open; underline when open
          "hover:bg-brand/5 data-[state=open]:rounded-b-none cursor-pointer data-[state=open]:border-brand/30",
          // Disabled state
          "disabled:pointer-events-none disabled:opacity-50",
          // Chevron rotation when open
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <IconChevronDown className="text-foreground-secondary pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down w-full"
      {...props}
    >
      <div className={cn(
        // MARK: Content spacing and subtle divider
        "px-4 pb-3 pt-2 text-foreground-secondary w-full",
        className
      )}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
