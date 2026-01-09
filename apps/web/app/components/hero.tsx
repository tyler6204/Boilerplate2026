"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconBrandApple, IconBrandGooglePlay, IconPlayerPlay } from "@tabler/icons-react";

interface HeroProps {
  appName: string;
  tagline: string;
}

export function Hero({ appName, tagline }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-foreground/5 border border-border px-4 py-1.5 mb-8">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
              </span>
              <span className="font-footnote font-medium text-foreground/70">
                Now available on iOS & Android
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold tracking-tight text-balance lg:font-display-2xl">
              {tagline}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 font-body leading-relaxed text-foreground/60 max-w-lg mx-auto lg:mx-0 text-balance">
              The modern toolkit for building production-ready mobile apps.
              Start with a solid foundation and focus on what makes your app unique.
            </p>

            {/* App store buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button
                size="lg"
                className="h-14 w-full sm:w-auto px-5 bg-foreground text-background hover:bg-foreground/90 rounded-xl"
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
                className="h-14 w-full sm:w-auto px-5 rounded-xl border-border hover:bg-foreground/5"
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

            {/* Social proof */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="size-4 text-amber-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-footnote text-foreground/50">
                  4.9 rating
                </span>
              </div>

              <div className="hidden sm:block w-px h-4 bg-border" />

              {/* Downloads */}
              <span className="font-footnote text-foreground/50">
                50K+ downloads
              </span>
            </div>
          </div>

          {/* Right - Phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Phone frame - 10% smaller (again) */}
            <div className="relative">
              <div className="relative w-[226.8px] sm:w-[259.2px] aspect-[9/19] rounded-[2.43rem] bg-foreground/80 border border-foreground/90 p-[5.4px] shadow-2xl">
                {/* Inner screen */}
                <div className="relative w-full h-full rounded-[2.025rem] bg-background overflow-hidden border border-border">
                  {/* Status bar */}
                  <div className="absolute top-0 inset-x-0 h-[39.6px] flex items-center justify-center z-10">
                    {/* Dynamic island / notch */}
                    <div className="w-[81px] h-[22.5px] rounded-full bg-foreground" />
                  </div>

                  {/* App screenshot using placeholder.co */}
                  <Image
                    src="https://placehold.co/259x547/ffffff/1a1a1a?text=Your+App+Here&font=inter"
                    alt="App screenshot preview"
                    width={259}
                    height={547}
                    className="w-full h-full object-cover dark:hidden"
                    priority
                  />
                  <Image
                    src="https://placehold.co/259x547/f5f5f5/0a0a0a?text=Your+App+Here&font=inter"
                    alt="App screenshot preview"
                    width={259}
                    height={547}
                    className="w-full h-full object-cover hidden dark:block"
                    priority
                  />

                  {/* Bottom home indicator */}
                  <div className="absolute bottom-[7.2px] inset-x-0 flex justify-center">
                    <div className="w-[86.4px] h-[3.6px] rounded-full bg-foreground/30" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -left-4 top-1/4 px-[10.8px] py-[7.2px] rounded-xl bg-background border border-border shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="size-[28.8px] rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg className="size-[14.4px] text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-caption font-medium">Synced</div>
                    <div className="font-caption2 text-foreground/50">Just now</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-2/3 px-[10.8px] py-[7.2px] rounded-xl bg-background border border-border shadow-lg animate-float-delayed">
                <div className="flex items-center gap-2">
                  <IconPlayerPlay className="size-[14.4px] text-foreground/70" />
                  <span className="font-caption font-medium">Watch demo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 opacity-50">
        <span className="font-caption text-foreground/50">Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
}
