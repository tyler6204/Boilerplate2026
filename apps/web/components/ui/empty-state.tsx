"use client"

import * as React from "react"
import { cn } from "./lib/utils"
import { IconMoodEmpty } from "@tabler/icons-react"
import type { Icon } from "@tabler/icons-react"



interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
  icon?: Icon
  size?: "sm" | "md" | "lg"
  className?: string
}

export function EmptyState({
  title,
  description,
  action,
  icon: Icon = IconMoodEmpty,
  size = "md",
  className,
}: EmptyStateProps) {
  const sizes = {
    sm: { container: "py-6", icon: "size-5", title: "text-sm", desc: "text-xs" },
    md: { container: "py-8", icon: "size-6", title: "text-base", desc: "text-xs" },
    lg: { container: "py-12", icon: "size-7", title: "text-lg", desc: "text-sm" },
  } as const

  const s = sizes[size]

  return (
    <div className={cn("flex w-full flex-col items-center justify-center text-center", s.container, className)}>
      <div className="mb-2 rounded-full bg-muted p-2 text-foreground-secondary-secondary">
        <Icon className={s.icon} />
      </div>
      <div className={cn("font-medium", s.title)}>{title}</div>
      {description ? (
        <div className={cn("mt-0.5 text-foreground-secondary-secondary", s.desc)}>{description}</div>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  )
}

export default EmptyState


