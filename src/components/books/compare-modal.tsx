"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  GitCompare,
  Check,
  Plus,
  ExternalLink,
  BookOpen,
  Sparkles,
  Clock,
  BookText,
  AlertTriangle,
} from "lucide-react";
import { booksData, bookToSlug, type BookData } from "@/lib/books-data";

// ============================================================
// Module-level compare state + subscription pattern
// Allows multiple components (book cards, modal, floating button)
// to share the same compare selection without prop drilling.
// ============================================================
let compareState: string[] = [];
const compareListeners = new Set<(slugs: string[]) => void>();

function notifyCompareListeners() {
  const snapshot = [...compareState];
  compareListeners.forEach((listener) => listener(snapshot));
}

function setCompareState(updater: (prev: string[]) => string[]) {
  compareState = updater(compareState);
  notifyCompareListeners();
}

// ============================================================
// Hook for managing compare state (shared across components)
// ============================================================
export function useCompare() {
  const [slugs, setSlugs] = useState<string[]>(compareState);

  useEffect(() => {
    compareListeners.add(setSlugs);
    setSlugs([...compareState]);
    return () => {
      compareListeners.delete(setSlugs);
    };
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    setCompareState((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length < 3) {
        return [...prev, slug];
      }
      return prev;
    });
  }, []);

  const removeSlug = useCallback((slug: string) => {
    setCompareState((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clearAll = useCallback(() => {
    setCompareState(() => []);
  }, []);

  return {
    slugs,
    count: slugs.length,
    toggleCompare,
    removeSlug,
    clearAll,
  };
}

// ============================================================
// Compare trigger button — drop into book cards / book detail
// ============================================================
export function CompareButton({
  slug,
  title,
  variant = "compact",
  className,
}: {
  slug: string;
  title: string;
  variant?: "compact" | "default";
  className?: string;
}) {
  const { slugs, toggleCompare } = useCompare();
  const isSelected = slugs.includes(slug);
  const isFull = slugs.length >= 3 && !isSelected;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFull) return;
    toggleCompare(slug);
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isFull}
        className={`relative h-7 w-7 flex items-center justify-center rounded-sm border transition-all duration-300 focus-ring ${
          isSelected
            ? "border-gold/60 text-gold bg-gold/15"
            : isFull
              ? "border-border/40 text-muted-foreground/40 cursor-not-allowed"
              : "border-border text-muted-foreground hover:text-gold hover:border-gold/40"
        } ${className || ""}`}
        aria-label={
          isSelected
            ? `Remove ${title} from comparison`
            : `Add ${title} to comparison`
        }
        title={
          isSelected
            ? "In comparison"
            : isFull
              ? "Comparison full (max 3)"
              : "Add to compare"
        }
      >
        {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isFull}
      className={`relative h-10 px-4 inline-flex items-center gap-2 rounded-md border transition-all duration-300 focus-ring ${
        isSelected
          ? "border-gold/60 text-gold bg-gold/10"
          : isFull
            ? "border-border/40 text-muted-foreground/40 cursor-not-allowed"
            : "border-border text-muted-foreground hover:text-gold hover:border-gold/40"
      } ${className || ""}`}
      aria-label={
        isSelected
          ? `Remove ${title} from comparison`
          : `Add ${title} to comparison`
      }
      title={
        isSelected
          ? "In comparison"
          : isFull
            ? "Comparison full (max 3)"
            : "Add to compare"
      }
    >
      {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      <span className="text-xs font-display tracking-[0.15em] uppercase">
        {isSelected ? "Added" : "Compare"}
      </span>
    </button>
  );
}

// ============================================================
// Book comparison modal
// Shows 2-3 selected books side-by-side with their metadata.
// ============================================================
export function CompareModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { slugs, removeSlug, count } = useCompare();

  const selectedBooks = useMemo(() => {
    return slugs
      .map((slug) => booksData.find((b) => bookToSlug(b.title) === slug))
      .filter((b): b is BookData => b !== undefined);
  }, [slugs]);

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[80] flex items-start justify-center pt-[5vh] px-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-6xl max-h-[88vh] rounded-md border border-gold/30 bg-card shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/60 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center">
                <GitCompare className="h-4 w-4 text-gold" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-foreground leading-tight">
                  Compare Books
                </h2>
                <p className="text-[10px] font-display tracking-[0.2em] uppercase text-muted-foreground">
                  {count} of 3 selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-ring"
              aria-label="Close compare"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body — comparison grid */}
          <div className="overflow-y-auto flex-1 p-5">
            {selectedBooks.length === 0 ? (
              <div className="text-center py-12">
                <GitCompare className="h-10 w-10 text-gold/30 mx-auto mb-4" />
                <p className="font-serif italic text-lg text-muted-foreground mb-2">
                  No books selected for comparison
                </p>
                <p className="text-sm text-muted-foreground">
                  Add books to compare using the compare button on any book card.
                </p>
              </div>
            ) : (
              <div
                className="grid gap-5"
                style={{
                  gridTemplateColumns: `repeat(${selectedBooks.length}, minmax(0, 1fr))`,
                }}
              >
                {selectedBooks.map((book) => (
                  <CompareColumn
                    key={book.title}
                    book={book}
                    onRemove={() => removeSlug(bookToSlug(book.title))}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================
// Single comparison column — one book's full metadata
// ============================================================
function CompareColumn({
  book,
  onRemove,
}: {
  book: BookData;
  onRemove: () => void;
}) {
  const detailHref = `/books/${bookToSlug(book.title)}`;

  return (
    <div className="flex flex-col">
      {/* Cover + remove */}
      <div className="relative mb-4">
        <Link
          href={detailHref}
          className="block relative aspect-[2/3] rounded-sm overflow-hidden cover-shadow cover-shadow-hover focus-ring"
        >
          <Image
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {book.kindleUnlimited && (
            <span className="absolute top-2 right-2 font-display text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 bg-gold/95 text-ink rounded-sm font-semibold">
              KU
            </span>
          )}
        </Link>
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-ink border border-blood/40 text-blood-light hover:bg-blood hover:text-ivory transition-colors focus-ring"
          aria-label={`Remove ${book.title} from comparison`}
          title="Remove"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Title */}
      <Link href={detailHref} className="block focus-ring rounded-sm">
        <h3 className="font-serif text-base md:text-lg text-foreground leading-tight hover:text-gold transition-colors line-clamp-3 mb-1">
          {book.title}
        </h3>
      </Link>
      {book.subtitle && (
        <p className="text-[11px] text-muted-foreground italic line-clamp-2 mb-3">
          {book.subtitle}
        </p>
      )}

      {/* Metadata rows */}
      <div className="space-y-1 text-xs mb-4">
        <CompareRow
          icon={<Sparkles className="h-3 w-3" />}
          label="Genre"
          value={book.genre}
        />
        <CompareRow
          icon={<BookOpen className="h-3 w-3" />}
          label="Series"
          value={
            book.series === "Standalone"
              ? "Standalone"
              : `${book.series}${book.seriesNumber ? ` · Bk ${book.seriesNumber}` : ""}`
          }
        />
        {book.pageCount && (
          <CompareRow
            icon={<BookText className="h-3 w-3" />}
            label="Pages"
            value={String(book.pageCount)}
          />
        )}
        <CompareRow
          icon={<Clock className="h-3 w-3" />}
          label="Read time"
          value={`~${Math.ceil((book.pageCount || 320) / 60)}h`}
        />
        <CompareRow
          icon={<Check className="h-3 w-3" />}
          label="KU"
          value={book.kindleUnlimited ? "Yes" : "No"}
        />
      </div>

      {/* Hook */}
      {book.hook && (
        <blockquote className="font-serif italic text-xs text-gold/90 leading-snug border-l-2 border-gold/40 pl-2.5 mb-4 line-clamp-4">
          &ldquo;{book.hook}&rdquo;
        </blockquote>
      )}

      {/* What to expect — first 3 items */}
      {book.whatToExpect.length > 0 && (
        <div className="mb-4">
          <p className="font-display text-[9px] tracking-[0.2em] uppercase text-gold/60 mb-1.5">
            What to Expect
          </p>
          <ul className="space-y-1">
            {book.whatToExpect.slice(0, 3).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[11px] text-foreground/70"
              >
                <span className="text-gold/60 mt-0.5">·</span>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content warning badge */}
      {book.contentWarning && (
        <div className="mb-4 flex items-start gap-1.5 p-2 rounded-sm border border-gold/20 bg-gold/5">
          <AlertTriangle className="h-3 w-3 text-gold/70 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground line-clamp-2">
            {book.contentWarning}
          </p>
        </div>
      )}

      {/* Price + Buy */}
      <div className="mt-auto space-y-2">
        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <button
            type="button"
            className="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-md text-xs font-display tracking-wider uppercase font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(160,24,24,0.4)]"
            style={{ backgroundColor: "#5c0a0a", color: "#f6efe4" }}
          >
            <ExternalLink className="h-3 w-3" />
            Buy · {book.price}
          </button>
        </a>
        <Link
          href={detailHref}
          className="block w-full h-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors text-[10px] font-display tracking-[0.15em] uppercase focus-ring"
        >
          Full Details
        </Link>
      </div>
    </div>
  );
}

function CompareRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-1 border-b border-border/30">
      <span className="flex items-center gap-1.5 text-muted-foreground flex-shrink-0">
        <span className="text-gold/60">{icon}</span>
        <span className="font-display tracking-[0.1em] uppercase text-[9px]">
          {label}
        </span>
      </span>
      <span className="text-foreground/85 text-right text-xs font-medium truncate">
        {value}
      </span>
    </div>
  );
}

// ============================================================
// Floating compare button — appears when books are selected
// ============================================================
export function CompareFloatingButton({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const { count, slugs } = useCompare();

  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={onOpen}
        className="fixed bottom-6 left-20 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-ink/90 dark:bg-card/90 border border-gold/40 text-gold backdrop-blur-md shadow-xl shadow-black/40 hover:border-gold/60 hover:shadow-gold/20 transition-all duration-300 focus-ring"
        aria-label={`Open comparison (${count} books)`}
      >
        <GitCompare className="h-4 w-4" />
        <span className="font-display text-xs tracking-[0.15em] uppercase">
          Compare
        </span>
        <span className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-gold text-ink text-[10px] font-bold">
          {count}
        </span>
      </motion.button>
    </AnimatePresence>
  );
}
