"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { ThemeDropdown } from "@/components/theme-switcher";

interface NavbarProps {
  appName: string;
}

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Customers" },
  { href: "#pricing", label: "Pricing" },
] as const;

export function Navbar({ appName }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="font-title3 font-semibold tracking-tight">{appName}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeDropdown />
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu2 className="size-6" />
          </Button>
        </div>

        <div className="hidden lg:flex lg:gap-x-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-footnote font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-2">
          <ThemeDropdown />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90" asChild>
            <Link href="#cta">Get started</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-border">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-title3 font-semibold tracking-tight">{appName}</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/70"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <IconX className="size-6" />
            </Button>
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-1 py-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="-mx-3 block rounded-lg px-3 py-3 font-callout font-medium text-foreground/80 hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-3">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 font-callout font-medium text-foreground/80 hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90" asChild>
                  <Link href="#cta" onClick={() => setMobileMenuOpen(false)}>
                    Get started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
