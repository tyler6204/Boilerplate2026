import Link from "next/link";

interface FooterProps {
  appName: string;
}

const FOOTER_LINKS = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Changelog", href: "#" },
    { name: "Roadmap", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Community", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" },
  ],
} as const;

export function Footer({ appName }: FooterProps) {
  return (
    <footer className="border-t border-border bg-background" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              {appName}
            </Link>
            <p className="text-sm text-foreground/50 max-w-xs leading-6">
              Ship faster. Build better. The toolkit that gets out of your way.
            </p>
          </div>

          {/* Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Product</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {FOOTER_LINKS.Product.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {FOOTER_LINKS.Company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Resources</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {FOOTER_LINKS.Resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Legal</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {FOOTER_LINKS.Legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-foreground/40">
            &copy; {new Date().getFullYear()} {appName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
