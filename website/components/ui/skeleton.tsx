import { cn } from "../../lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-foreground/15 rounded-md relative overflow-hidden",
        "before:absolute before:inset-0 before:w-full before:h-full",
        "before:bg-linear-to-r before:from-transparent before:via-background/40 before:to-transparent",
        "before:mix-blend-overlay before:animate-[shimmer_1.75s_infinite]",
        "dark:before:via-background/20 dark:before:mix-blend-screen",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
