"use client";

import { IconBolt, IconShield, IconDeviceMobile, IconChartBar, IconCloud, IconUsers } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

interface Feature {
  name: string;
  description: string;
  icon: Icon;
}

const FEATURES: Feature[] = [
  {
    name: "Lightning fast",
    description:
      "Built for speed from the ground up. Sub-second load times and instant interactions that feel native.",
    icon: IconBolt,
  },
  {
    name: "Bank-grade security",
    description:
      "End-to-end encryption, SOC 2 compliant, and regular security audits. Your data stays yours.",
    icon: IconShield,
  },
  {
    name: "Works everywhere",
    description:
      "Native apps for iOS and Android, plus a web app that works on any device. Sync happens instantly.",
    icon: IconDeviceMobile,
  },
  {
    name: "Built-in analytics",
    description:
      "Understand how your team works with actionable insights. No setup required, no third-party tools.",
    icon: IconChartBar,
  },
  {
    name: "Cloud-native",
    description:
      "Automatic backups, 99.99% uptime, and infrastructure that scales with you. Zero maintenance.",
    icon: IconCloud,
  },
  {
    name: "Team collaboration",
    description:
      "Real-time collaboration features that make remote work feel like you're in the same room.",
    icon: IconUsers,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="font-footnote font-medium text-brand tracking-wide uppercase">
            Everything you need
          </p>
          <h2 className="mt-2 font-title font-bold tracking-tight sm:font-large-title text-balance">
            Features that actually matter
          </h2>
          <p className="mt-4 font-body text-foreground/60 text-balance">
            No bloat. No feature creep. Just the tools you need to ship great products,
            designed to work together seamlessly.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.name} className="relative pl-12">
                <dt className="font-callout font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-lg bg-foreground [&_svg]:text-background">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 font-callout leading-7 text-foreground/60">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
