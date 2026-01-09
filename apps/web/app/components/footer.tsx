import Link from "next/link";
import { IconBrandX, IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";
import { SOCIAL_URLS } from "@repo/constants/boilerplate";

interface FooterProps {
  appName: string;
}

const FOOTER_LINKS = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Download", href: "#download" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
} as const;

const SOCIAL_LINKS = [
  { name: "X", href: SOCIAL_URLS.X, icon: IconBrandX },
  { name: "Instagram", href: SOCIAL_URLS.INSTAGRAM, icon: IconBrandInstagram },
  { name: "TikTok", href: SOCIAL_URLS.TIKTOK, icon: IconBrandTiktok },
] as const;

export function Footer({ appName }: FooterProps) {
  return (
    <footer className="border-t border-border" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold font-footnote">
                  {appName.charAt(0)}
                </span>
              </div>
              <span className="font-title3 font-semibold tracking-tight">
                {appName}
              </span>
            </Link>
            <p className="mt-4 font-footnote text-foreground/50 max-w-xs leading-relaxed">
              The modern toolkit for building production-ready mobile apps.
              Ship faster, focus on what matters.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-lg border border-border flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/20 transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-footnote font-semibold">{category}</h3>
              <ul role="list" className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-footnote text-foreground/50 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-caption text-foreground/40">
            &copy; {new Date().getFullYear()} {appName}. All rights reserved.
          </p>
          <p className="font-caption text-foreground/40">
            Built with Next.js, Expo & Convex
          </p>
        </div>
      </div>
    </footer>
  );
}
