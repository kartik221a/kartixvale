"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookCard } from "@/components/books/book-card";
import { BookModal } from "@/components/books/book-modal";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Search,
  X,
  ListOrdered,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import {
  booksData,
  bookSeries,
  standaloneNovels,
  type BookData,
} from "@/lib/books-data";

// ============================================================
// Motion variants
// ============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

// ============================================================
// Filter type
// ============================================================
type Filter = "all" | "series" | "standalones" | "ku";

// ============================================================
// Books page
// ============================================================
export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const openBookModal = (book: BookData) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  // Filter logic — applies to "All Books" view
  const filteredBooks = useMemo(() => {
    let books = booksData;

    if (filter === "series") {
      books = books.filter((b) => b.series !== "Standalone");
    } else if (filter === "standalones") {
      books = books.filter((b) => b.series === "Standalone");
    } else if (filter === "ku") {
      books = books.filter((b) => b.kindleUnlimited);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.subtitle?.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q) ||
          b.series?.toLowerCase().includes(q)
      );
    }

    return books;
  }, [filter, searchQuery]);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* ============================================================
          PAGE HERO — editorial masthead
          ============================================================ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-ink">
        {/* Atmospheric background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(160,24,24,0.15) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(184,146,74,0.10) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(12,9,7,0.6) 100%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-5"
            >
              The Collection · 17 Books · 3 Series
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] text-glow-soft"
            >
              The Kartix Vale
              <br />
              <span className="italic text-gold">Catalogue</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-ornament w-64 mx-auto my-8" />
            <motion.p
              variants={fadeUp}
              className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed"
            >
              Every book. Every series. Every shadow. Curated reading paths through
              dark romance, gothic fiction, and dark fantasy — with verified Amazon
              links and Kindle Unlimited availability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SEARCH + FILTER BAR
          ============================================================ */}
      <section className="sticky top-16 md:top-20 z-30 bg-overlay/95 backdrop-blur-md border-y border-border/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, genre, or series..."
              className="w-full h-10 pl-10 pr-9 bg-card border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus-ring"
              aria-label="Search books"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-sm focus-ring"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 text-xs font-display tracking-[0.15em] uppercase">
            {([
              { id: "all", label: `All (${booksData.length})` },
              { id: "series", label: "Series" },
              { id: "standalones", label: "Standalones" },
              { id: "ku", label: "Kindle U." },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-2 rounded-sm transition-colors focus-ring ${
                  filter === tab.id
                    ? "text-gold bg-gold/10 border border-gold/30"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SEARCH RESULTS (when searching or filtering)
          ============================================================ */}
      {searchQuery || filter !== "all" ? (
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                {filteredBooks.length} {filteredBooks.length === 1 ? "result" : "results"}
              </h2>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilter("all");
                }}
                className="text-xs font-display tracking-[0.2em] uppercase text-gold hover:text-foreground transition-colors focus-ring rounded-sm"
              >
                Reset
              </button>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-serif italic text-xl text-muted-foreground mb-2">
                  No books matched &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-sm text-muted-foreground">
                  Try a different title, genre, or series name.
                </p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
              >
                {filteredBooks.map((book) => (
                  <motion.div key={book.title} variants={fadeUp}>
                    <BookCard book={book} onBookClick={openBookModal} compact />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      ) : (
        <>
          {/* ============================================================
              SERIES SECTIONS
              ============================================================ */}
          {bookSeries.map((series) => (
            <section
              key={series.name}
              id={series.name.toLowerCase().replace(/\s+/g, "-")}
              className="relative py-20 md:py-28 bg-gradient-dark overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, rgba(160,24,24,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(184,146,74,0.05) 0%, transparent 40%)`,
                }}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={stagger}
                >
                  {/* Section header */}
                  <motion.div variants={fadeUp} className="mb-10 md:mb-14">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-display text-[11px] tracking-[0.4em] uppercase text-gold">
                        Series
                      </span>
                      {series.complete ? (
                        <span className="font-display text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 bg-gold/15 text-gold border border-gold/30 rounded-sm">
                          Complete
                        </span>
                      ) : (
                        <span className="font-display text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 bg-blood/15 text-blood-light dark:text-gold border border-gold/30 rounded-sm">
                          Ongoing
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                      {series.name}
                    </h2>
                    <div className="divider-gold w-24 mt-4" />
                    <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mt-5 leading-relaxed">
                      {series.description}
                    </p>
                  </motion.div>

                  {/* Reading order notice */}
                  <motion.div
                    variants={fadeUp}
                    className="card-dark rounded-md p-5 md:p-6 mb-10 max-w-3xl"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <ListOrdered className="h-5 w-5 text-gold" />
                      <h3 className="font-display text-xs tracking-[0.2em] uppercase text-foreground">
                        Reading Order
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {series.books.map((book, i) => (
                        <div key={book.title} className="flex items-center gap-2">
                          <span className="font-display text-[10px] tracking-[0.2em] uppercase px-2 py-1 bg-ink/80 dark:bg-card text-gold border border-gold/30 rounded-sm">
                            {book.seriesNumber === 0 ? "Prequel" : `Book ${i + 1}`}
                          </span>
                          <span className="text-sm text-foreground/80">{book.title}</span>
                          {i < series.books.length - 1 && (
                            <span className="text-gold/40 mx-1">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Books grid */}
                  <motion.div
                    variants={stagger}
                    className={`grid grid-cols-2 ${
                      series.books.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-2"
                    } gap-6 md:gap-8`}
                  >
                    {series.books.map((book) => (
                      <motion.div key={book.title} variants={fadeUp}>
                        <BookCard book={book} onBookClick={openBookModal} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </section>
          ))}

          {/* ============================================================
              STANDALONE NOVELS
              ============================================================ */}
          <section
            id="standalones"
            className="relative py-20 md:py-28 bg-section-alt overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 20%, rgba(184,146,74,0.06) 0%, transparent 40%), radial-gradient(circle at 30% 80%, rgba(160,24,24,0.06) 0%, transparent 40%)",
              }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
              >
                <motion.div variants={fadeUp} className="mb-10 md:mb-14 text-center">
                  <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                    Complete Stories
                  </p>
                  <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                    Standalone Novels
                  </h2>
                  <div className="divider-gold w-24 mx-auto mt-4" />
                  <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
                    Each a world unto itself. Each a descent into darkness with no
                    way out but through. Read in any order.
                  </p>
                </motion.div>

                <motion.div
                  variants={stagger}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
                >
                  {standaloneNovels.map((book) => (
                    <motion.div key={book.title} variants={fadeUp}>
                      <BookCard book={book} onBookClick={openBookModal} compact />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ============================================================
              COMPLETE LIBRARY OVERVIEW
              ============================================================ */}
          <section className="py-16 md:py-20 bg-gradient-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
              >
                <motion.div variants={fadeUp} className="text-center mb-10">
                  <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                    The Complete Library
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                    All {booksData.length} Books
                  </h2>
                  <div className="divider-gold w-16 mx-auto" />
                </motion.div>

                <motion.div
                  variants={stagger}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-5"
                >
                  {booksData.map((book) => (
                    <motion.div key={book.title} variants={fadeUp}>
                      <BookCard book={book} onBookClick={openBookModal} compact showMeta={false} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ============================================================
              CTA — where to begin
              ============================================================ */}
          <section className="py-20 md:py-24 bg-section-alt relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(160,24,24,0.10) 0%, transparent 70%)",
              }}
            />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
              >
                <motion.p
                  variants={fadeUp}
                  className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3"
                >
                  Where to Begin
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="font-serif text-3xl md:text-5xl text-foreground mb-4 leading-tight"
                >
                  Start Your Descent
                </motion.h2>
                <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto mb-6" />
                <motion.p
                  variants={fadeUp}
                  className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
                >
                  Begin with <em>A Bargain in Shadows</em> for the four-book
                  Beneath the Veil series, or pick any standalone and fall in.
                  Every book is enrolled in Kindle Unlimited.
                </motion.p>
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                  <a
                    href="https://www.amazon.com/dp/B0GWZQ8QDM"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="oxblood" className="h-12 px-8 text-sm tracking-wider uppercase font-semibold">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Begin the Series · $5.99
                    </Button>
                  </a>
                  <a
                    href="https://www.amazon.com/author/kartixvale"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="gold"
                      className="h-12 px-8 text-sm tracking-wider uppercase font-semibold"
                    >
                      Amazon Author Page
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      <Footer />

      {/* Book modal */}
      <BookModal isOpen={isModalOpen} onClose={closeModal} book={selectedBook} />
    </main>
  );
}
