"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
      position={props.position ?? "top-center"}
      richColors={props.richColors ?? true}
      toastOptions={{
        ...props.toastOptions,
        classNames: {
          // Base toast container
          toast:
            "rounded-xl border shadow-xs backdrop-blur-sm data-[type=success]:shadow-green-600/10 data-[type=error]:shadow-error/10 data-[type=warning]:shadow-warning/10 data-[type=info]:shadow-info/10",
          title: "font-medium",
          description: "text-foreground-secondary",
          // Buttons inside toast
          actionButton:
            "border rounded-xl border-brand/20 text-brand hover:bg-brand/5 hover:border-brand/60 focus-visible:border-brand/20 focus-visible:ring-brand/20",
          cancelButton:
            "border rounded-xl border-background/20 text-foreground hover:bg-foreground/[0.06]",
          closeButton: "text-foreground-secondary hover:text-foreground",
          // Type-specific backgrounds/borders to match our design system
          success: "border-green-600/30 bg-success/10 text-green-700",
          error: "border-destructive/30 bg-destructive/10 text-destructive",
          warning: "border-warning/30 bg-warning/10 text-warning",
          info: "border-info/30 bg-info/10 text-info",
          loading: "border-foreground/10 bg-background/70 text-foreground",
          default: "border-brand/20 bg-background/70 text-foreground",
          // Allow consumers to override
          ...(props.toastOptions?.classNames ?? {}),
        },
      }}
    />
  )
}

export { Toaster }
