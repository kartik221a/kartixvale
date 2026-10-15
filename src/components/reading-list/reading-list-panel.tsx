"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Bookmark, X, Trash2, BookOpen, FileText, ArrowRight, BookMarked } from "lucide-react";
import { useReadingList } from "@/hooks/use-reading-list";
import { booksData, bookToSlug } from "@/lib/books-data";

// ============================================================
// Reading list panel — floating button + slide-in drawer
// Shows saved books + articles, with remove + clear-all
// ============================================================
export function ReadingListPanel() {
  const { items, count, mounted, removeItem, clearAll } = useReadingList();
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Show floating button after scrolling down a bit
  useEffect(() => {
    const onScroll = () => {
      setShowButton(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Listen for open event from navbar (dispatched via custom event)
  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener("kartixvale:open-reading-list", onOpen);
    return () => window.removeEventListener("kartixvale:open-reading-list", onOpen);
  }, []);

  // Build a lookup of book covers by slug for display
  const bookCoverMap = new Map(
    booksData.map((b) => [bookToSlug(b.title), b.coverUrl])
  );

  // Don't render anything until mounted (avoids hydration mismatch)
  if (!mounted) return null;

  return (
    <>
      {/* Floating button — bottom right, appears after scroll */}
      <AnimatePresence>
        {showButton && count > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-ink/90 dark:bg-card/90 border border-gold/40 text-gold backdrop-blur-md shadow-xl shadow-black/40 hover:border-gold/60 hover:shadow-gold/20 transition-all duration-300 focus-ring"
            aria-label={`Open reading list (${count} saved)`}
          >
            <Bookmark className="h-4 w-4 fill-gold/30" />
            <span className="font-display text-xs tracking-[0.15em] uppercase">
              Reading List
            </span>
            <span className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-gold text-ink text-[10px] font-bold">
              {count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70]"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />

            {/* Panel — slides in from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-card border-l border-gold/20 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <BookMarked className="h-5 w-5 text-gold" />
                  <div>
                    <h2 className="font-serif text-lg text-foreground leading-tight">
                      Reading List
                    </h2>
                    <p className="text-[10px] font-display tracking-[0.2em] uppercase text-muted-foreground">
                      {count} {count === 1 ? "item" : "items"} saved
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-ring"
                  aria-label="Close reading list"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {count === 0 ? (
                  <div className="p-8 text-center">
                    <Bookmark className="h-10 w-10 text-gold/30 mx-auto mb-4" />
                    <p className="font-serif text-lg text-muted-foreground italic mb-2">
                      Your reading list is empty
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Save books and articles by tapping the bookmark icon.
                      They&apos;ll appear here for quick access — even after you
                      close your browser.
                    </p>
                    <Link
                      href="/books"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-md border border-gold/30 text-gold hover:bg-gold/10 transition-colors text-xs font-display tracking-[0.15em] uppercase focus-ring"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Browse Books
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-border/30">
                    {items.map((item) => {
                      const bookCover = item.kind === "book"
                        ? bookCoverMap.get(item.slug)
                        : undefined;
                      return (
                        <li
                          key={`${item.kind}-${item.slug}`}
                          className="group flex items-center gap-3 p-4 hover:bg-muted/20 transition-colors"
                        >
                          {/* Thumbnail */}
                          {bookCover ? (
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="relative w-10 h-14 rounded-sm overflow-hidden flex-shrink-0 cover-shadow focus-ring"
                            >
                              <Image
                                src={bookCover}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </Link>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="w-10 h-14 rounded-sm border border-border/60 flex items-center justify-center flex-shrink-0 bg-muted/30 focus-ring"
                            >
                              <FileText className="h-4 w-4 text-gold/60" />
                            </Link>
                          )}

                          {/* Title + meta */}
                          <div className="flex-1 min-w-0">
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block font-serif text-sm text-foreground leading-tight group-hover:text-gold transition-colors line-clamp-2 focus-ring rounded-sm"
                            >
                              {item.title}
                            </Link>
                            <p className="text-[9px] font-display tracking-[0.2em] uppercase text-muted-foreground mt-1">
                              {item.kind === "book" ? "Book" : "Article"}
                            </p>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => removeItem(item.kind, item.slug)}
                            className="w-8 h-8 flex items-center justify-center rounded-sm text-muted-foreground hover:text-blood-light hover:bg-blood/10 transition-colors flex-shrink-0 focus-ring"
                            aria-label={`Remove ${item.title} from reading list`}
                            title="Remove"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {count > 0 && (
                <div className="p-4 border-t border-border/40 flex items-center justify-between">
                  <button
                    onClick={clearAll}
                    className="inline-flex items-center gap-1.5 text-[10px] font-display tracking-[0.2em] uppercase text-muted-foreground hover:text-blood-light transition-colors focus-ring rounded-sm"
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear All
                  </button>
                  <Link
                    href={items[0]?.href || "/books"}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 text-[10px] font-display tracking-[0.2em] uppercase text-gold hover:text-foreground transition-colors focus-ring rounded-sm"
                  >
                    Continue Reading
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
