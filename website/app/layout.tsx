import "./globals.css";
import { Metadata } from 'next'
import { Toaster } from "@/components/ui/sonner"
import { TopLoader } from "@/components/top-loader"
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import { ConvexClientProvider } from "@/components/convex-provider"

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "ENV NOT SET",
  description: process.env.NEXT_PUBLIC_APP_NAME || "ENV NOT SET",
};

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}>
        <ConvexClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <TopLoader />
            <Toaster />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}