"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconBrandApple, IconBrandGooglePlay } from "@tabler/icons-react";

interface CTAProps {
  appName: string;
}

export function CTA({ appName }: CTAProps) {
  return (
    <section id="download" className="py-24 sm:py-32 bg-foreground/[0.02]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 sm:p-12 lg:p-16">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M0 32V0h32" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center ">
            {/* Content */}
            <div>
              <h2 className="font-title font-bold tracking-tight sm:font-large-title text-balance">
                Start building today
              </h2>
              <p className="mt-4 font-body text-background/70 max-w-md leading-relaxed">
                Download {appName} and launch your mobile app in days, not months.
                Free to try, no credit card required.
              </p>

              {/* App store buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="h-14 px-5 bg-background text-foreground hover:bg-background/90 rounded-xl"
                  asChild
                >
                  <Link href="#" className="inline-flex items-center gap-3">
                    <IconBrandApple className="size-6" />
                    <span className="flex flex-col items-start">
                      <span className="font-caption font-normal opacity-70 leading-tight">
                        Download on the
                      </span>
                      <span className="font-footnote font-semibold leading-tight">
                        App Store
                      </span>
                    </span>
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-5 bg-background text-foreground hover:bg-background/90 rounded-xl"
                  asChild
                >
                  <Link href="#" className="inline-flex items-center gap-3">
                    <IconBrandGooglePlay className="size-5" />
                    <span className="flex flex-col items-start">
                      <span className="font-caption font-normal opacity-70 leading-tight">
                        Get it on
                      </span>
                      <span className="font-footnote font-semibold leading-tight">
                        Google Play
                      </span>
                    </span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 lg:justify-end">
              <div>
                <div className="font-display font-bold">50K+</div>
                <div className="font-footnote text-background/60 mt-1">Downloads</div>
              </div>
              <div>
                <div className="font-display font-bold">4.9</div>
                <div className="font-footnote text-background/60 mt-1">App Store Rating</div>
              </div>
              <div>
                <div className="font-display font-bold">99.9%</div>
                <div className="font-footnote text-background/60 mt-1">Uptime</div>
              </div>
              <div>
                <div className="font-display font-bold">&lt;50ms</div>
                <div className="font-footnote text-background/60 mt-1">Sync Latency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
