import { cva, type VariantProps } from "class-variance-authority"
import { type ViewProps, View } from "react-native"

import { Text } from "@/components/ui/text"
import { IconSymbol } from "@/components/icon"
import { cn } from "@/lib/utils"

function Empty({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return (
    <View
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return (
    <View
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: ViewProps & React.RefAttributes<View> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <View
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
    <Text
      data-slot="empty-title"
      className={cn("font-headline font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
    <Text
      data-slot="empty-description"
      className={cn(
        "font-body text-muted-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return (
    <View
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4",
        className
      )}
      {...props}
    />
  )
}

type EmptyStateProps = {
  title?: string
  description?: string
  icon?: string
  className?: string
}

function EmptyState({ title, description, icon, className }: EmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        {icon && (
          <EmptyMedia variant="icon">
            <IconSymbol name={icon} className="w-6 h-6" />
          </EmptyMedia>
        )}
        {title && <EmptyTitle>{title}</EmptyTitle>}
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
    </Empty>
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
  EmptyState,
}
