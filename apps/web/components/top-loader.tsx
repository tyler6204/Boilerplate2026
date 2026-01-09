"use client"

import NextTopLoader from "nextjs-toploader"

export function TopLoader() {
  // Uses CSS variable for primary color from theme
  // In light mode: near black, in dark mode: near white
  // This matches the foreground color defined in theme.web.css
  return (
    <div suppressHydrationWarning>
      <NextTopLoader
        showSpinner={false}
        color="var(--primary)"
        shadow={false}
      />
    </div>
  )
}
