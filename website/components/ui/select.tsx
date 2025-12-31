"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react"

import { cn } from "../../lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      suppressHydrationWarning
      className={cn(
        // MARK: Brand select trigger styling to match input component
        "data-placeholder:text-foreground-secondary/70 [&_svg:not([class*='text-'])]:text-foreground-secondary selection:bg-brand selection:text-white",
        "border border-brand/20 bg-background/70 text-foreground",
        "flex w-fit items-center justify-between gap-2 rounded-xl px-3 py-1 text-base whitespace-nowrap shadow-xs shadow-brand/20",
        "outline-none cursor-pointer",
        // MARK: Interactive states with brand theming
        "hover:border-brand/60 hover:bg-brand/5",
        "focus-visible:border-brand focus-visible:ring-brand/20 focus-visible:ring-[3px] focus-visible:bg-brand/5",
        // MARK: Error states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // MARK: Disabled states
        "disabled:cursor-default disabled:opacity-50 disabled:pointer-events-none",
        // MARK: Size variants
        "data-[size=default]:h-9 data-[size=sm]:h-8",
        "text-sm",
        // MARK: Value and icon styling
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <IconChevronDown className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        suppressHydrationWarning
        className={cn(
          // MARK: Brand popover styling with backdrop blur and shadow
          "border border-brand/20 bg-background/70 text-foreground backdrop-blur-sm shadow-md shadow-brand/20",
          // MARK: Animation states
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          // MARK: Layout and positioning
          "relative z-100000 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xl",
          position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
            "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        // MARK: Select label styling with muted appearance
        "text-foreground-secondary px-2 py-1.5 text-xs font-medium",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // MARK: Brand select item styling with hover states
        "[&_svg:not([class*='text-'])]:text-foreground-secondary relative flex w-full items-center gap-2 rounded-lg py-1.5 pr-8 pl-2 text-sm outline-none select-none cursor-pointer",
        // MARK: Interactive states with brand theming
        "focus:bg-brand/5 focus:text-brand hover:bg-brand/5 hover:text-brand transition-colors",
        // MARK: Selected state highlighting
        "data-[state=checked]:bg-brand/10 data-[state=checked]:text-brand",
        // MARK: Disabled states
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        // MARK: Icon and text styling
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <IconCheck className="size-4 text-brand" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        // MARK: Brand separator with subtle brand tinting
        "bg-brand/10 pointer-events-none -mx-1 my-1 h-px",
        className
      )}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        // MARK: Scroll button with brand hover states
        "flex cursor-default items-center justify-center py-1 hover:bg-brand/5 transition-colors",
        className
      )}
      {...props}
    >
      <IconChevronUp className="size-4 text-foreground-secondary" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        // MARK: Scroll button with brand hover states
        "flex cursor-default items-center justify-center py-1 hover:bg-brand/5 transition-colors",
        className
      )}
      {...props}
    >
      <IconChevronDown className="size-4 text-foreground-secondary" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
