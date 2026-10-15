"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { SaveButton } from "@/components/reading-list/save-button";
import { CompareButton } from "@/components/books/compare-modal";
import type { BookData } from "@/lib/books-data";
import { bookToSlug } from "@/lib/books-data";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: BookData;
  /** Compact = grid view (smaller title, smaller buy button) */
  compact?: boolean;
  /** Show full metadata (genre, KU badge, series number) */
  showMeta?: boolean;
  className?: string;
}

/**
 * Premium book cover card.
 * Designed to let the cover be the star — minimal chrome, restrained hover.
 * Clicking the cover navigates to /books/[slug] (book detail page).
 */
export function BookCard({
  book,
  compact = false,
  showMeta = true,
  className,
}: BookCardProps) {
  const detailHref = `/books/${bookToSlug(book.title)}`;

  return (
    <article
      className={cn(
        "group flex flex-col items-center text-center",
        className
      )}
    >
      {/* Cover — navigates to detail page */}
      <Link
        href={detailHref}
        className="relative block w-full aspect-[2/3] overflow-hidden rounded-sm cover-shadow cover-shadow-hover cursor-pointer focus-ring"
        aria-label={`View details for ${book.title}`}
      >
        <Image
          src={book.coverUrl}
          alt={`Cover of ${book.title}${book.subtitle ? ` — ${book.subtitle}` : ""}`}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            "group-hover:scale-[1.04]"
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        {/* Series number badge (top-left) */}
        {book.seriesNumber !== undefined && book.series !== "Standalone" && (
          <span className="absolute top-2 left-2 font-display text-[10px] tracking-[0.15em] uppercase px-2 py-1 bg-ink/80 text-gold border border-gold/30 rounded-sm">
            {book.seriesNumber === 0 ? "Prequel" : `Book ${book.seriesNumber}`}
          </span>
        )}
        {/* KU badge (top-right) */}
        {book.kindleUnlimited && (
          <span className="absolute top-2 right-2 font-display text-[9px] tracking-[0.15em] uppercase px-2 py-1 bg-gold/95 text-ink rounded-sm font-semibold">
            KU
          </span>
        )}
        {/* Hover hint */}
        <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-[10px] font-display tracking-[0.2em] uppercase text-ivory bg-ink/80 border border-gold/30 px-2.5 py-1 rounded-sm">
            View Details
          </span>
        </div>
      </Link>

      {/* Meta */}
      <div className={cn("w-full mt-3", compact ? "max-w-[180px]" : "max-w-[220px]")}>
        {showMeta && (
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <Badge
              variant="outline"
              className="text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5 border-gold/30 text-gold bg-transparent"
            >
              {book.genre}
            </Badge>
          </div>
        )}
        <Link href={detailHref} tabIndex={-1}>
          <h3
            className={cn(
              "font-serif text-foreground leading-tight transition-colors duration-200 hover:text-gold cursor-pointer",
              compact ? "text-xs line-clamp-2" : "text-sm line-clamp-2"
            )}
          >
            {book.title}
          </h3>
        </Link>
        {book.subtitle && !compact && (
          <p className="text-[11px] text-muted-foreground italic mt-1 line-clamp-1">
            {book.subtitle}
          </p>
        )}
        <div className="flex items-center justify-center gap-2 mt-2.5">
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1"
            aria-label={`Buy ${book.title} on Amazon`}
          >
            <Button
              variant="oxblood"
              size="sm"
              className="w-full h-7 text-[10px] tracking-wider uppercase font-semibold"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {book.price ? `Buy · ${book.price}` : "Buy"}
            </Button>
          </a>
          <Link
            href={detailHref}
            className="h-7 px-2.5 flex items-center justify-center rounded-sm border border-border text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors focus-ring text-[10px] font-display tracking-[0.1em] uppercase"
            aria-label={`View details for ${book.title}`}
          >
            Details
          </Link>
          <SaveButton
            kind="book"
            slug={bookToSlug(book.title)}
            title={book.title}
            href={detailHref}
            variant="compact"
          />
          <CompareButton slug={bookToSlug(book.title)} title={book.title} variant="compact" />
        </div>
      </div>
    </article>
  );
}
