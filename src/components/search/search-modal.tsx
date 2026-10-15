"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import { booksData, bookToSlug, type BookData } from "@/lib/books-data";

// Static-only export for client bundle (no Turso on client).
// Articles are fetched lazily on first open via /api/search-blogs.
interface ArticleSearchResult {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
}

interface SearchHit {
  kind: "book" | "article";
  title: string;
  subtitle?: string;
  excerpt: string;
  href: string;
  meta?: string;
  coverUrl?: string;
}

// ============================================================
// Search modal — Ctrl+K / Cmd+K or click search icon in navbar
// ============================================================
export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [articles, setArticles] = useState<ArticleSearchResult[]>([]);
  const [articlesLoaded, setArticlesLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Lazy-load articles on first open
  useEffect(() => {
    if (!isOpen || articlesLoaded) return;
    fetch("/api/search-blogs", { cache: "force-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { posts: ArticleSearchResult[] }) => {
        setArticles(data.posts || []);
        setArticlesLoaded(true);
      })
      .catch(() => {
        // Silent failure — books still searchable
        setArticlesLoaded(true);
      });
  }, [isOpen, articlesLoaded]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Build search hits from query
  const hits: SearchHit[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const bookHits: SearchHit[] = booksData
      .filter((b) => {
        const haystack = [
          b.title,
          b.subtitle || "",
          b.genre,
          b.series || "",
          b.hook || "",
          b.description.join(" "),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6)
      .map((b: BookData) => ({
        kind: "book" as const,
        title: b.title,
        subtitle: b.subtitle,
        excerpt: b.hook || b.description[0] || "",
        href: `/books/${bookToSlug(b.title)}`,
        meta: b.genre,
        coverUrl: b.coverUrl,
      }));

    const articleHits: SearchHit[] = articles
      .filter((a) => {
        const haystack = [a.title, a.excerpt, a.category, a.slug].join(" ").toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 4)
      .map((a) => ({
        kind: "article" as const,
        title: a.title,
        excerpt: a.excerpt,
        href: `/blog/${a.slug}`,
        meta: `${a.category} · ${a.readTime}`,
      }));

    return [...bookHits, ...articleHits];
  }, [query, articles]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Esc to close, Up/Down to navigate, Enter to select
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, hits.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const hit = hits[activeIndex];
        if (hit) {
          router.push(hit.href);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, hits, activeIndex, router, onClose]);

  // Scroll active result into view
  useEffect(() => {
    if (!resultsRef.current || hits.length === 0) return;
    const activeEl = resultsRef.current.querySelector(`[data-index="${activeIndex}"]`);
    activeEl?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex, hits.length]);

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

  const handleHitClick = useCallback(
    (hit: SearchHit) => {
      router.push(hit.href);
      onClose();
    },
    [router, onClose]
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-[80] flex items-start justify-center pt-[10vh] px-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-2xl rounded-md border border-gold/30 bg-card shadow-2xl shadow-black/60 overflow-hidden"
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60">
            <Search className="h-4 w-4 text-gold/70 flex-shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books and articles…"
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
              aria-label="Search books and articles"
              autoComplete="off"
              spellCheck="false"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border border-border bg-muted/50 text-[10px] font-display tracking-[0.15em] uppercase text-muted-foreground">
              Esc
            </kbd>
            <button
              onClick={onClose}
              className="ml-1 w-7 h-7 flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-ring"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
            {query.trim() === "" ? (
              <div className="p-8 text-center">
                <Search className="h-8 w-8 text-gold/30 mx-auto mb-3" />
                <p className="font-serif text-lg text-muted-foreground italic">
                  Search the catalogue and the journal.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Try a title, a trope, a series, or a topic.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {["dark romance", "enemies to lovers", "gothic", "Beneath the Veil", "fated mates"].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className="text-[10px] font-display tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-border/60 text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors focus-ring"
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : hits.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-serif italic text-lg text-muted-foreground mb-1">
                  No matches for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-muted-foreground">
                  Try a different title, genre, series, or topic.
                </p>
              </div>
            ) : (
              <ul className="py-2">
                {hits.some((h) => h.kind === "book") && (
                  <li className="px-4 py-1.5">
                    <p className="font-display text-[9px] tracking-[0.3em] uppercase text-gold/60">
                      Books
                    </p>
                  </li>
                )}
                {hits.map((hit, i) => {
                  const showArticleHeader =
                    hit.kind === "article" &&
                    (i === 0 || hits[i - 1].kind !== "article");
                  return (
                    <div key={`${hit.kind}-${hit.href}`}>
                      {showArticleHeader && (
                        <li className="px-4 py-1.5 mt-2">
                          <p className="font-display text-[9px] tracking-[0.3em] uppercase text-gold/60">
                            Articles
                          </p>
                        </li>
                      )}
                      <li>
                        <button
                          data-index={i}
                          onClick={() => handleHitClick(hit)}
                          onMouseEnter={() => setActiveIndex(i)}
                          className={`group w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            activeIndex === i
                              ? "bg-gold/10 border-l-2 border-gold"
                              : "border-l-2 border-transparent hover:bg-muted/30"
                          }`}
                        >
                          {hit.coverUrl ? (
                            <div className="relative w-10 h-14 rounded-sm overflow-hidden flex-shrink-0 cover-shadow">
                              <Image
                                src={hit.coverUrl}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-14 rounded-sm border border-border/60 flex items-center justify-center flex-shrink-0 bg-muted/40">
                              <FileText className="h-4 w-4 text-gold/60" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="flex items-center gap-1 text-[9px] font-display tracking-[0.2em] uppercase text-gold/70 flex-shrink-0">
                                {hit.kind === "book" ? (
                                  <>
                                    <BookOpen className="h-3 w-3" />
                                    Book
                                  </>
                                ) : (
                                  <>
                                    <FileText className="h-3 w-3" />
                                    Article
                                  </>
                                )}
                              </span>
                              {hit.meta && (
                                <span className="text-[9px] text-muted-foreground truncate">
                                  · {hit.meta}
                                </span>
                              )}
                            </div>
                            <p className="font-serif text-sm text-foreground leading-tight mt-0.5 truncate">
                              {hit.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {hit.excerpt}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    </div>
                  );
                })}
                <li className="px-4 py-2 mt-1 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CornerDownLeft className="h-3 w-3" />
                    Open
                  </span>
                  <span className="font-display tracking-[0.15em] uppercase">
                    {hits.length} {hits.length === 1 ? "result" : "results"}
                  </span>
                </li>
              </ul>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================
// Search trigger button — drop into navbar
// ============================================================
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:text-gold hover:border-gold/40 transition-all duration-300 focus-ring"
      aria-label="Search books and articles"
      title="Search (Ctrl+K)"
    >
      <Search className="h-4 w-4" />
    </button>
  );
}
