"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

interface HeroProps {
  appName: string;
}

export function Hero({ appName }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <p className="font-footnote font-medium text-brand mb-6 tracking-wide uppercase">
            Now available on iOS & Android
          </p>

          {/* Main headline */}
          <h1 className="font-display font-bold tracking-tight sm:font-display-2xl lg:font-display-4xl text-balance">
            Build products people actually want to use
          </h1>

          {/* Subheadline */}
          <p className="mt-6 font-body leading-8 text-foreground/60 max-w-2xl mx-auto text-balance">
            Stop wrestling with complexity. {appName} gives you the foundation to ship fast,
            iterate faster, and focus on what matters—your users.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 font-callout font-medium"
              asChild
            >
              <Link href="#cta">
                Start free trial
                <IconArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 px-8 font-callout font-medium text-foreground/70 hover:text-foreground"
              asChild
            >
              <Link href="#features">See how it works</Link>
            </Button>
          </div>

          {/* Social proof */}
          <p className="mt-12 font-footnote text-foreground/40">
            Trusted by 10,000+ teams worldwide
          </p>

          {/* Logo cloud */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-50 grayscale">
            {["Vercel", "Stripe", "Linear", "Notion", "Figma"].map((company) => (
              <span
                key={company}
                className="font-footnote font-semibold tracking-tight text-foreground/60"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-brand/10 to-transparent opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}
