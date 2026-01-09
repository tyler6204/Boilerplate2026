"use client";

import {
  IconBolt,
  IconShield,
  IconDeviceMobile,
  IconCloud,
  IconRefresh,
  IconPalette,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

interface Feature {
  name: string;
  description: string;
  icon: Icon;
  highlight?: boolean;
}

const FEATURES: Feature[] = [
  {
    name: "Lightning Performance",
    description:
      "Built for speed from the ground up. Sub-second load times and buttery-smooth 60fps animations that feel truly native.",
    icon: IconBolt,
    highlight: true,
  },
  {
    name: "Cross-Platform",
    description:
      "One codebase for iOS and Android. Native performance with React Native and Expo's modern toolchain.",
    icon: IconDeviceMobile,
  },
  {
    name: "Secure by Default",
    description:
      "End-to-end encryption, secure storage, and authentication patterns baked in from day one.",
    icon: IconShield,
  },
  {
    name: "Cloud Sync",
    description:
      "Real-time data synchronization powered by Convex. Your users' data, always up to date.",
    icon: IconCloud,
  },
  {
    name: "Hot Reloading",
    description:
      "See your changes instantly. Fast refresh preserves state while you iterate on your app.",
    icon: IconRefresh,
  },
  {
    name: "Theme System",
    description:
      "Light and dark modes out of the box. Customizable design tokens shared across platforms.",
    icon: IconPalette,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-foreground/[0.02]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-title font-bold tracking-tight sm:font-large-title">
            Everything you need to ship
          </h2>
          <p className="mt-4 font-body text-foreground/60 leading-relaxed">
            A complete foundation for building production-ready mobile apps.
            No boilerplate fatigue, just the good parts.
          </p>
        </div>

        {/* Feature grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.name}
              className={`group relative rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:border-foreground/20 hover:shadow-lg ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Icon */}
              <div className="mb-4 inline-flex items-center justify-center size-10 rounded-xl bg-foreground/5 border border-border group-hover:bg-foreground/10 transition-colors">
                <feature.icon className="size-5 text-foreground/70" />
              </div>

              {/* Content */}
              <h3 className="font-callout font-semibold mb-2">{feature.name}</h3>
              <p className="font-footnote text-foreground/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="size-4 text-foreground/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-footnote text-foreground/50">
            Plus TypeScript, ESLint, Prettier, and more configured out of the box.
          </p>
        </div>
      </div>
    </section>
  );
}
