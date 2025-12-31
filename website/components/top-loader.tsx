"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import NextTopLoader from "nextjs-toploader"
import { getThemeColor, oklchToHex } from "@shared/constants/theme"

export function TopLoader() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Set mounted to true after initial render to avoid hydration mismatch
  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true)
    })
  }, [])

  // Use resolvedTheme if available and mounted, otherwise default to "light" for SSR
  const theme = mounted && resolvedTheme ? resolvedTheme : "light"
  const color = oklchToHex(getThemeColor("brand", theme))

  return (
    <>
      {mounted && (
        <div suppressHydrationWarning>
          <NextTopLoader
            showSpinner={false}
            color={color}
          />
        </div>
      )}
    </>
  )
}
