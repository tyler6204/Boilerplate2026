"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "../../lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // MARK: Segmented picker style matching settings page
        "inline-flex items-center gap-1 rounded-full border border-brand/20 p-1",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // MARK: Base button styles with sm size
        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-brand/20 focus-visible:border-brand/20 cursor-pointer",
        "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        // MARK: Segmented picker styling - rounded-full and border-none override
        "rounded-full px-4 border-none",
        // MARK: Active state - brandAccent variant styles
        "data-[state=active]:relative data-[state=active]:overflow-hidden data-[state=active]:border data-[state=active]:border-background/20 data-[state=active]:bg-linear-to-b data-[state=active]:from-brand data-[state=active]:to-brand/90 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:hover:from-brand/95 data-[state=active]:hover:to-brand/80 data-[state=active]:focus-visible:border-brand/20 data-[state=active]:active:scale-[0.98] data-[state=active]:active:from-brand/90 data-[state=active]:active:to-brand/70 data-[state=active]:backdrop-blur-sm",
        // MARK: Inactive state - brandLink variant styles
        "data-[state=inactive]:text-brand data-[state=inactive]:underline-offset-2 data-[state=inactive]:decoration-brand/70 data-[state=inactive]:hover:text-brand/90 data-[state=inactive]:hover:no-underline data-[state=inactive]:hover:opacity-70",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
