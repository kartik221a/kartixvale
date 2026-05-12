"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import { booksData } from "@/lib/books-data";

interface BlogBuyCTAProps {
  variant?: "primary" | "secondary" | "mini";
  bookSlug?: string; // specific book to feature; if omitted, features the latest
  context?: string; // e.g., "Ready to experience it?" — contextual hook text
}

// Map of slugs to match books-data entries
const SLUG_MAP: Record<string, number> = {
  "thorns-of-the-fae-thorne": 0,
  "the-gotham-reapers-bride": 1,
  "behind-the-veil": 2,
  "a-crown-of-ashes": 3,
  "the-unholy-reverie": 4,
  "crown-of-ash-and-tides": 5,
  "a-bargain-in-shadows": 6,
};

export function BlogBuyCTA({ variant = "primary", bookSlug, context }: BlogBuyCTAProps) {
  // Get the book to feature
  const bookIndex = bookSlug ? SLUG_MAP[bookSlug] : 1; // Default to Gotham Reaper's Bride
  const book = booksData[bookIndex] || booksData[1];

  if (!book) return null;

  // Primary: Full-width CTA box with cover, hook, and buttons
  if (variant === "primary") {
    return (
      <div className="my-8 not-prose rounded-xl border border-blood/25 overflow-hidden" style={{ backgroundColor: "rgba(139, 0, 0, 0.06)" }}>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 md:p-6">
          {/* Book cover */}
          <div className="flex-shrink-0 w-20 sm:w-24 self-center">
            <div className="aspect-[2/3] rounded-md overflow-hidden shadow-lg shadow-black/30">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow flex flex-col justify-center text-center sm:text-left">
            {context && (
              <p className="text-gold text-xs uppercase tracking-wider mb-2 font-medium">
                {context}
              </p>
            )}
            <h4 className="font-serif text-lg md:text-xl text-foreground mb-1 leading-snug">
              {book.title}
            </h4>
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
              <Badge className="bg-blood/20 text-blood-light border-blood/30 text-[10px] uppercase tracking-wider">
                {book.genre}
              </Badge>
              {book.kindleUnlimited && (
                <Badge className="bg-gold/15 text-gold border-gold/30 text-[10px] uppercase tracking-wider font-bold">
                  KU
                </Badge>
              )}
            </div>
            {book.hook && (
              <p className="text-muted-foreground text-sm italic mb-4 line-clamp-2">
                &ldquo;{book.hook}&rdquo;
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              {book.amazonUrl && (
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-blood-light hover:bg-blood text-white font-semibold px-6 h-10 text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,20,60,0.4)] hover:scale-105">
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    Buy on Amazon — {book.price}
                  </Button>
                </a>
              )}
              {book.freeReadSlug && (
                <Link href={`/free-reads/${book.freeReadSlug}`}>
                  <Button
                    variant="outline"
                    className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 h-10 text-sm"
                  >
                    <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                    Read Free
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Secondary: Compact inline CTA with just text + button
  if (variant === "secondary") {
    return (
      <div className="my-6 not-prose flex items-center gap-4 p-4 rounded-lg border border-gold/15" style={{ backgroundColor: "rgba(201, 168, 76, 0.04)" }}>
        <div className="flex-shrink-0 w-10">
          <div className="aspect-[2/3] rounded overflow-hidden shadow-md">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-foreground text-sm font-medium leading-snug">
            {context || `Read ${book.title}`}
          </p>
          <p className="text-muted-foreground text-xs">
            {book.price} on Amazon{book.kindleUnlimited ? " · Kindle Unlimited" : ""}
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          {book.freeReadSlug && (
            <Link href={`/free-reads/${book.freeReadSlug}`}>
              <Button
                variant="ghost"
                className="text-gold/70 hover:text-gold hover:bg-gold/10 text-xs h-8 px-2"
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Free
              </Button>
            </Link>
          )}
          {book.amazonUrl && (
            <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-blood-light hover:bg-blood text-white font-semibold h-8 px-4 text-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]">
                <ExternalLink className="h-3 w-3 mr-1" />
                Buy
              </Button>
            </a>
          )}
        </div>
      </div>
    );
  }

  // Mini: Small text-only CTA (for mid-paragraph injection)
  return (
    <span className="not-prose inline-flex items-center gap-1.5">
      {book.amazonUrl ? (
        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blood-light hover:text-blood transition-colors text-sm font-medium underline underline-offset-2 decoration-blood/30 hover:decoration-blood/60"
        >
          {book.title}
          <ExternalLink className="h-3 w-3" />
        </a>
      ) : (
        <span className="text-blood-light text-sm font-medium">{book.title}</span>
      )}
    </span>
  );
}

// Multi-book CTA: Shows 2-3 books in a row
export function BlogMultiBookCTA({ bookSlugs, context }: { bookSlugs: string[]; context?: string }) {
  const featuredBooks = bookSlugs
    .map((slug) => booksData[SLUG_MAP[slug]])
    .filter(Boolean)
    .slice(0, 3);

  if (featuredBooks.length === 0) return null;

  return (
    <div className="my-8 not-prose rounded-xl border border-blood/20 overflow-hidden" style={{ backgroundColor: "rgba(139, 0, 0, 0.04)" }}>
      <div className="p-5 md:p-6">
        {context && (
          <p className="text-gold text-xs uppercase tracking-wider mb-4 font-medium text-center">
            {context}
          </p>
        )}
        <div className={`grid gap-4 ${featuredBooks.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : featuredBooks.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {featuredBooks.map((book) => (
            <div key={book.title} className="flex gap-3 p-3 rounded-lg bg-black/20 border border-border/20">
              <div className="flex-shrink-0 w-14">
                <div className="aspect-[2/3] rounded overflow-hidden shadow-md">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow min-w-0 flex flex-col justify-center">
                <h5 className="font-serif text-sm text-foreground leading-snug line-clamp-2 mb-1">
                  {book.title}
                </h5>
                <div className="flex items-center gap-1.5 mb-2">
                  <Badge className="bg-blood/15 text-blood-light border-blood/20 text-[8px] uppercase tracking-wider py-0">
                    {book.genre}
                  </Badge>
                  {book.kindleUnlimited && (
                    <Badge className="bg-gold/15 text-gold border-gold/20 text-[8px] uppercase tracking-wider py-0 font-bold">
                      KU
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {book.amazonUrl && (
                    <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-blood-light hover:bg-blood text-white font-semibold h-7 px-3 text-[10px] transition-all duration-300">
                        <ExternalLink className="h-2.5 w-2.5 mr-1" />
                        {book.price}
                      </Button>
                    </a>
                  )}
                  {book.freeReadSlug && (
                    <Link href={`/free-reads/${book.freeReadSlug}`}>
                      <Button variant="ghost" className="text-gold/60 hover:text-gold hover:bg-gold/10 text-[10px] h-7 px-2">
                        <BookOpen className="h-2.5 w-2.5 mr-0.5" />
                        Free
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
