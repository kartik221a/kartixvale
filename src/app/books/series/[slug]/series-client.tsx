"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/reading-list/save-button";
import { CompareButton } from "@/components/books/compare-modal";
import type { BookSeries } from "@/lib/books-data";
import { bookToSlug } from "@/lib/books-data";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  BookOpen,
  ListOrdered,
  CheckCircle2,
  Clock,
  BookText,
  Sparkles,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

function seriesToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface SeriesClientProps {
  series: BookSeries;
}

export default function SeriesClient({ series }: SeriesClientProps) {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Navbar />

      {/* ============================================================
          HERO — series masthead
          ============================================================ */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-gradient-ink">
        {/* Atmospheric background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(160,24,24,0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 70% 80%, rgba(184,146,74,0.12) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(12,9,7,0.6) 100%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Breadcrumb */}
            <motion.nav
              variants={fadeUp}
              className="flex items-center gap-2 text-xs font-display tracking-[0.15em] uppercase text-muted-foreground mb-10"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-gold/40" />
              <Link href="/books" className="hover:text-gold transition-colors">
                Books
              </Link>
              <ChevronRight className="h-3 w-3 text-gold/40" />
              <span className="text-gold truncate">{series.name}</span>
            </motion.nav>

            {/* Series badges */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-5"
            >
              <span className="font-display text-[11px] tracking-[0.4em] uppercase text-gold">
                Series Guide
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
              <span className="font-display text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 bg-muted/30 text-muted-foreground border border-border rounded-sm">
                {series.books.length} Books
              </span>
            </motion.div>

            {/* Series title */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-5 text-glow-soft"
            >
              {series.name}
            </motion.h1>

            <motion.div variants={fadeUp} className="divider-ornament w-64 mb-6" />

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="font-body text-lg md:text-xl text-foreground/80 max-w-3xl leading-relaxed"
            >
              {series.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center gap-3 mt-8"
            >
              <a
                href={series.books[0]?.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="oxblood"
                  className="h-12 px-8 text-sm tracking-wider uppercase font-semibold"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start the Series · {series.books[0]?.price}
                </Button>
              </a>
              <Link href="/books">
                <Button
                  variant="gold"
                  className="h-12 px-8 text-sm tracking-wider uppercase font-semibold"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Books
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          READING ORDER — visual timeline
          ============================================================ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                Reading Order
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                The Complete Path
              </h2>
              <div className="divider-gold w-16 mt-4" />
              <p className="font-body text-base md:text-lg text-muted-foreground mt-5 max-w-2xl leading-relaxed">
                {series.complete
                  ? `All ${series.books.length} books in the ${series.name} series, in the order they were meant to be read.`
                  : `The ${series.books.length} books published so far in the ${series.name} series, in reading order. More to come.`}
              </p>
            </motion.div>

            {/* Reading order timeline */}
            <motion.div
              variants={stagger}
              className="space-y-4"
            >
              {series.books.map((book, i) => (
                <motion.div
                  key={book.title}
                  variants={fadeUp}
                >
                  <Link
                    href={`/books/${bookToSlug(book.title)}`}
                    className="group block card-dark rounded-md p-4 md:p-6 hover:border-gold/40 transition-all duration-300 focus-ring"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      {/* Number badge */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gold/40 bg-gold/5 flex items-center justify-center">
                          <span className="font-display text-lg md:text-xl text-gold font-bold">
                            {book.seriesNumber === 0 ? "0" : i + 1}
                          </span>
                        </div>
                        {i < series.books.length - 1 && (
                          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-gold/40 to-transparent mt-2" />
                        )}
                      </div>

                      {/* Cover thumbnail */}
                      <div className="relative w-16 h-24 md:w-20 md:h-30 flex-shrink-0 rounded-sm overflow-hidden cover-shadow">
                        <Image
                          src={book.coverUrl}
                          alt={`Cover of ${book.title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="80px"
                        />
                      </div>

                      {/* Book info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display text-[9px] tracking-[0.2em] uppercase text-gold/60">
                            {book.seriesNumber === 0 ? "Prequel" : `Book ${i + 1}`}
                          </span>
                          {book.kindleUnlimited && (
                            <span className="font-display text-[8px] tracking-[0.15em] uppercase px-1.5 py-0.5 bg-gold/15 text-gold border border-gold/30 rounded-sm">
                              KU
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-lg md:text-xl text-foreground leading-tight group-hover:text-gold transition-colors mb-1">
                          {book.title}
                        </h3>
                        {book.subtitle && (
                          <p className="text-xs text-muted-foreground italic mb-2 line-clamp-1">
                            {book.subtitle}
                          </p>
                        )}
                        {book.hook && (
                          <p className="font-body text-sm text-foreground/60 italic line-clamp-1">
                            &ldquo;{book.hook}&rdquo;
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookText className="h-3 w-3" />
                            {book.genre}
                          </span>
                          {book.pageCount && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {book.pageCount}p
                            </span>
                          )}
                          <span className="text-gold/70 font-medium">
                            {book.price}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          BOOK GRID — all covers together
          ============================================================ */}
      <section className="py-16 md:py-24 bg-section-alt">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                The Collection
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                All {series.books.length} Covers
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={stagger}
              className={`grid grid-cols-2 ${
                series.books.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-2"
              } gap-6 md:gap-8`}
            >
              {series.books.map((book, i) => (
                <motion.div key={book.title} variants={fadeUp}>
                  <Link
                    href={`/books/${bookToSlug(book.title)}`}
                    className="group block focus-ring rounded-sm"
                  >
                    <div className="relative aspect-[2/3] rounded-sm overflow-hidden cover-shadow cover-shadow-hover">
                      <Image
                        src={book.coverUrl}
                        alt={`Cover of ${book.title}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                      <span className="absolute top-2 left-2 font-display text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 bg-ink/80 text-gold border border-gold/30 rounded-sm">
                        {book.seriesNumber === 0 ? "Prequel" : `Book ${i + 1}`}
                      </span>
                    </div>
                    <p className="font-serif text-sm text-foreground mt-3 line-clamp-2 group-hover:text-gold transition-colors leading-tight">
                      {book.title}
                    </p>
                    <p className="text-[10px] text-gold/70 mt-0.5">{book.price}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          BUNDLE CTA
          ============================================================ */}
      <section className="py-16 md:py-20 bg-gradient-dark relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(160,24,24,0.12) 0%, transparent 70%)",
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
              {series.complete ? "Complete Series Bundle" : "Read the Series"}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl md:text-4xl text-foreground mb-4 leading-tight"
            >
              Read all {series.books.length} books
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto mb-6" />
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
            >
              {series.complete
                ? `The complete ${series.name} series is available now on Amazon and enrolled in Kindle Unlimited. Start from Book 1 and fall all the way in.`
                : `The ${series.name} series is ongoing. Start from Book 1 and follow along as new books are published.`}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a
                href={series.books[0]?.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="oxblood"
                  className="h-12 px-8 text-sm tracking-wider uppercase font-semibold"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start from Book 1 · {series.books[0]?.price}
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

      {/* ============================================================
          BACK TO BOOKS
          ============================================================ */}
      <section className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-display tracking-[0.15em] uppercase text-gold hover:text-foreground transition-colors focus-ring rounded-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Books
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
