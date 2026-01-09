import { Metadata } from "next";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Testimonials } from "./components/testimonials";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";

// ============================================
// BOILERPLATE CONFIG - Change these values
// ============================================
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Tempo";
const APP_TAGLINE = "Ship your mobile app faster";
const APP_DESCRIPTION = `${APP_NAME} is the modern toolkit for building production-ready iOS and Android apps. Start with a solid foundation and focus on what makes your app unique.`;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://example.com";
const APP_TWITTER_HANDLE = "@yourapp";

// ============================================
// METADATA - SEO & Social
// ============================================
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "mobile app",
    "iOS app",
    "Android app",
    "React Native",
    "Expo",
    "mobile development",
    APP_NAME.toLowerCase(),
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  publisher: APP_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - ${APP_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
    site: APP_TWITTER_HANDLE,
    creator: APP_TWITTER_HANDLE,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: APP_URL,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground/10">
      <Navbar appName={APP_NAME} />
      <main>
        <Hero appName={APP_NAME} tagline={APP_TAGLINE} />
        <Features />
        <Testimonials />
        <CTA appName={APP_NAME} />
      </main>
      <Footer appName={APP_NAME} />
    </div>
  );
}
