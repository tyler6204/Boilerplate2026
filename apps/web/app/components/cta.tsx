"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";

interface CTAProps {
  appName: string;
}

export function CTA({ appName: _appName }: CTAProps) {
  return (
    <section id="cta" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Ready to ship faster?
          </h2>
          <p className="mt-4 text-lg text-foreground/60 text-balance">
            Start your free 14-day trial. No credit card required.
            Cancel anytime.
          </p>

          {/* App store buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-14 w-full sm:w-auto px-6 bg-foreground text-background hover:bg-foreground/90"
              asChild
            >
              <Link href="#" className="inline-flex items-center gap-3">
                <Apple className="size-6" />
                <span className="flex flex-col items-start">
                  <span className="text-xs font-normal opacity-80">Download on the</span>
                  <span className="text-sm font-semibold">App Store</span>
                </span>
              </Link>
            </Button>

            <Button
              size="lg"
              className="h-14 w-full sm:w-auto px-6 bg-foreground text-background hover:bg-foreground/90"
              asChild
            >
              <Link href="#" className="inline-flex items-center gap-3">
                <Play className="size-6" />
                <span className="flex flex-col items-start">
                  <span className="text-xs font-normal opacity-80">Get it on</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </span>
              </Link>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-foreground/50">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" />
              Free 14-day trial
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" />
              Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
