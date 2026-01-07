import { Metadata } from "next";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Testimonials } from "./components/testimonials";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Tempo";
const APP_DESCRIPTION = "Ship faster. Build better. The toolkit that gets out of your way.";

export const metadata: Metadata = {
  title: `${APP_NAME} — ${APP_DESCRIPTION}`,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar appName={APP_NAME} />
      <main>
        <Hero appName={APP_NAME} />
        <Features />
        <Testimonials />
        <CTA appName={APP_NAME} />
      </main>
      <Footer appName={APP_NAME} />
    </div>
  );
}
