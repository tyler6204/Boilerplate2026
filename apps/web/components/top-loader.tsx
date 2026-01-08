"use client"

import NextTopLoader from "nextjs-toploader"

export function TopLoader() {
  const color = '#AB21DE'

  return (
    <>
      <div suppressHydrationWarning>
        <NextTopLoader
          showSpinner={false}
          color={color}
        />
      </div>
    </>
  )
}
