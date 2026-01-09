"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { ThemeDropdown } from "@/components/theme-switcher";

interface NavbarProps {
  appName: string;
}

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Customers" },
  { href: "#download", label: "Download" },
] as const;

export function Navbar({ appName }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16"
        aria-label="Global"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background font-bold font-footnote">
              {appName.charAt(0)}
            </span>
          </div>
          <span className="font-title3 font-semibold tracking-tight">
            {appName}
          </span>
        </Link>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeDropdown />
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu2 className="size-5" />
          </Button>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 font-footnote font-medium text-foreground/60 transition-colors hover:text-foreground rounded-lg hover:bg-foreground/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <ThemeDropdown />
          <Button
            size="sm"
            className="h-9 px-4 bg-foreground text-background hover:bg-foreground/90 font-footnote font-medium rounded-lg"
            asChild
          >
            <Link href="#download">Get the App</Link>
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
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-4 sm:max-w-sm sm:border-l sm:border-border">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="size-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold font-footnote">
                  {appName.charAt(0)}
                </span>
              </div>
              <span className="font-title3 font-semibold tracking-tight">
                {appName}
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/70"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <IconX className="size-5" />
            </Button>
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-1 py-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-4 py-3 font-callout font-medium text-foreground/80 hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Button
                  className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-callout font-medium rounded-lg"
                  asChild
                >
                  <Link href="#download" onClick={() => setMobileMenuOpen(false)}>
                    Get the App
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
