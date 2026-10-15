"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Books", href: "/books" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Series",
    links: [
      { label: "Beneath the Veil", href: "/books#beneath-the-veil" },
      { label: "Crimson Shifters", href: "/books#crimson-shifters" },
      { label: "Starving Gods", href: "/books#starving-gods" },
      { label: "Standalones", href: "/books#standalones" },
    ],
  },
  {
    title: "Read",
    links: [
      { label: "Amazon Author Page", href: "https://www.amazon.com/author/kartixvale", external: true },
      { label: "Kindle Unlimited", href: "/books", internal: true },
      { label: "Latest Article", href: "/blog" },
      { label: "Genre Guide", href: "/blog/what-is-dark-romance" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-section-footer border-t border-border/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block focus-ring rounded-sm">
              <span className="wordmark text-lg md:text-xl text-foreground">
                Kartix&nbsp;Vale
              </span>
            </Link>
            <p className="font-serif italic text-foreground/70 mt-4 leading-relaxed max-w-sm">
              &ldquo;Love was never meant to be safe.&rdquo;
            </p>
            <div className="divider-gold w-16 mt-5" />
            <p className="text-sm text-muted-foreground mt-5 max-w-sm leading-relaxed">
              Dark romance, gothic fiction, and the atmospheres between them.
              Stories about love under pressure — earned, never assumed.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-2">
              <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 focus-ring rounded-sm"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm inline-block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Amazon column */}
          <div className="md:col-span-1">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Buy
            </h3>
            <a
              href="https://www.amazon.com/author/kartixvale"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 focus-ring rounded-sm"
            >
              Amazon
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Kartix Vale. All rights reserved.</p>
          <p className="text-muted-foreground/70">
            All books available on Amazon · Kindle Unlimited enrolled
          </p>
        </div>
      </div>
    </footer>
  );
}
