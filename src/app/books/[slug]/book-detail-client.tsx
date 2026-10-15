"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SaveButton } from "@/components/reading-list/save-button";
import { CompareButton } from "@/components/books/compare-modal";
import type { BookData } from "@/lib/books-data";
import { bookToSlug } from "@/lib/books-data";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  BookOpen,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookText,
  Sparkles,
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

interface BookDetailClientProps {
  book: BookData;
  relatedBooks: BookData[];
  nextBook?: BookData;
  previousBook?: BookData;
}

export default function BookDetailClient({
  book,
  relatedBooks,
  nextBook,
  previousBook,
}: BookDetailClientProps) {

  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Navbar />

      {/* ============================================================
          HERO — cover + meta side-by-side
          ============================================================ */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-ink">
        {/* Background image — atmospheric, low opacity */}
        <div className="absolute inset-0">
          <Image
            src="/images/manor-atmosphere.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-cover object-center opacity-25"
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,9,7,0.65) 0%, rgba(12,9,7,0.50) 30%, rgba(12,9,7,0.85) 100%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial="hidden"
            animate="visible"
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
            <span className="text-gold truncate max-w-[180px] sm:max-w-xs">
              {book.title}
            </span>
          </motion.nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
          >
            {/* Cover */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-5 flex justify-center lg:justify-start"
            >
              <div className="relative w-64 sm:w-72 md:w-80 aspect-[2/3] rounded-sm overflow-hidden cover-shadow cover-shadow-hover">
                <Image
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}${book.subtitle ? ` — ${book.subtitle}` : ""}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 33vw"
                />
                {book.kindleUnlimited && (
                  <span className="absolute top-3 right-3 font-display text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 bg-gold/95 text-ink rounded-sm font-semibold">
                    Kindle Unlimited
                  </span>
                )}
              </div>
            </motion.div>

            {/* Meta */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-7 flex flex-col"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border-gold/40 text-gold bg-gold/5"
                >
                  {book.genre}
                </Badge>
                {book.series && book.series !== "Standalone" && (
                  <Badge
                    variant="outline"
                    className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border-blood/40 text-blood-light dark:text-gold bg-blood/5 dark:bg-gold/5"
                  >
                    {book.series}
                    {book.seriesNumber !== undefined
                      ? ` · ${book.seriesNumber === 0 ? "Prequel" : `Book ${book.seriesNumber}`}`
                      : ""}
                  </Badge>
                )}
                {book.series === "Standalone" && (
                  <Badge
                    variant="outline"
                    className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border-border text-muted-foreground"
                  >
                    Standalone Novel
                  </Badge>
                )}
                {book.pageCount && (
                  <Badge
                    variant="outline"
                    className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border-border text-muted-foreground flex items-center gap-1"
                  >
                    <BookText className="h-3 w-3" />
                    {book.pageCount} pages
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] mb-3 text-glow-soft">
                {book.title}
              </h1>

              {book.subtitle && (
                <p className="font-body text-lg md:text-xl text-gold/80 italic mb-5">
                  {book.subtitle}
                </p>
              )}

              {/* Hook */}
              {book.hook && (
                <blockquote className="font-serif italic text-xl md:text-2xl text-foreground/90 leading-snug border-l-2 border-gold/60 pl-5 my-5 max-w-2xl">
                  &ldquo;{book.hook}&rdquo;
                </blockquote>
              )}

              {/* Price + Buy CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Buy ${book.title} on Amazon`}
                >
                  <Button
                    variant="oxblood"
                    className="h-12 px-8 text-sm tracking-wider uppercase font-semibold w-full sm:w-auto"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buy on Amazon · {book.price}
                  </Button>
                </a>
                {book.kindleUnlimited && (
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="gold"
                      className="h-12 px-8 text-sm tracking-wider uppercase font-semibold"
                    >
                      Read on Kindle Unlimited
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}
                {/* Save to reading list */}
                <SaveButton
                  kind="book"
                  slug={bookToSlug(book.title)}
                  title={book.title}
                  href={`/books/${bookToSlug(book.title)}`}
                  className="h-12"
                />
                {/* Add to comparison */}
                <CompareButton
                  slug={bookToSlug(book.title)}
                  title={book.title}
                  variant="default"
                  className="h-12"
                />
              </div>

              {/* Reading meta line */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-gold/70" />
                  By Kartix Vale
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gold/70" />
                  {book.pageCount
                    ? `~${Math.ceil(book.pageCount / 60)} hour read`
                    : "Full-length novel"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-gold/70" />
                  18+ Mature
                </span>
              </div>

              {/* Series navigation */}
              {(nextBook || previousBook) && (
                <div className="mt-8 pt-6 border-t border-border/40">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-display text-[10px] tracking-[0.3em] uppercase text-gold">
                      Series Navigation
                    </p>
                    <Link
                      href={`/books/series/${book.series!.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}`}
                      className="text-[10px] font-display tracking-[0.2em] uppercase text-gold/70 hover:text-gold transition-colors focus-ring rounded-sm flex items-center gap-1"
                    >
                      View Series Guide
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {previousBook ? (
                      <Link
                        href={`/books/${bookToSlug(previousBook.title)}`}
                        className="group flex items-center gap-3 p-3 rounded-md border border-border/50 hover:border-gold/40 transition-colors focus-ring"
                      >
                        <ArrowLeft className="h-4 w-4 text-gold/70 group-hover:-translate-x-1 transition-transform" />
                        <div className="text-left">
                          <p className="text-[9px] font-display tracking-[0.2em] uppercase text-muted-foreground">
                            Previous
                          </p>
                          <p className="text-xs text-foreground truncate">{previousBook.title}</p>
                        </div>
                      </Link>
                    ) : (
                      <div />
                    )}
                    {nextBook ? (
                      <Link
                        href={`/books/${bookToSlug(nextBook.title)}`}
                        className="group flex items-center gap-3 p-3 rounded-md border border-border/50 hover:border-gold/40 transition-colors focus-ring sm:justify-end text-right"
                      >
                        <div>
                          <p className="text-[9px] font-display tracking-[0.2em] uppercase text-muted-foreground">
                            Next
                          </p>
                          <p className="text-xs text-foreground truncate">{nextBook.title}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gold/70 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SYNOPSIS — full description
          ============================================================ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-8">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
                Synopsis
              </p>
              <div className="divider-gold w-16" />
            </motion.div>

            <motion.div variants={fadeUp} className="prose-editorial max-w-none">
              {book.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </motion.div>

            {/* What to expect */}
            {book.whatToExpect.length > 0 && (
              <motion.div variants={fadeUp} className="mt-12 pt-8 border-t border-border/40">
                <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-4">
                  What to Expect
                </p>
                <ul className="space-y-2.5">
                  {book.whatToExpect.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-body text-base text-foreground/85"
                    >
                      <CheckCircle2 className="h-4 w-4 text-gold/70 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Content warning */}
            {book.contentWarning && (
              <motion.div
                variants={fadeUp}
                className="mt-10 p-5 rounded-md border border-blood/30 dark:border-gold/20 bg-blood/5 dark:bg-gold/5"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blood-light dark:text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display text-[10px] tracking-[0.3em] uppercase text-blood-light dark:text-gold mb-2">
                      Content Warning
                    </p>
                    <p className="font-body text-sm text-foreground/80 leading-relaxed">
                      {book.contentWarning}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          BUY CTA — strong, final
          ============================================================ */}
      <section className="py-16 md:py-20 bg-section-alt relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(160,24,24,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
              Begin Reading
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl md:text-4xl text-foreground mb-4 leading-tight"
            >
              Read {book.title} today
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto mb-5" />
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Available now on Amazon{book.kindleUnlimited ? " and enrolled in Kindle Unlimited." : "."}{" "}
              {book.series && book.series !== "Standalone"
                ? `${book.series} · ${book.seriesNumber === 0 ? "Prequel" : `Book ${book.seriesNumber}`}.`
                : "A standalone novel — read in any order."}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="oxblood"
                  className="h-12 px-8 text-sm tracking-wider uppercase font-semibold"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Buy on Amazon · {book.price}
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
          RELATED BOOKS
          ============================================================ */}
      {relatedBooks.length > 0 && (
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-10">
                <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
                  {book.series && book.series !== "Standalone"
                    ? `More from ${book.series}`
                    : "Continue Reading"}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                  {book.series && book.series !== "Standalone"
                    ? "Read the rest of the series"
                    : "Books you may also enjoy"}
                </h2>
                <div className="divider-gold w-16 mt-3" />
              </motion.div>

              <motion.div
                variants={stagger}
                className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6"
              >
                {relatedBooks.map((related) => (
                  <motion.div key={related.title} variants={fadeUp}>
                    <Link
                      href={`/books/${bookToSlug(related.title)}`}
                      className="group block focus-ring rounded-sm"
                    >
                      <div className="relative aspect-[2/3] rounded-sm overflow-hidden cover-shadow cover-shadow-hover">
                        <Image
                          src={related.coverUrl}
                          alt={`Cover of ${related.title}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {related.seriesNumber !== undefined &&
                          related.series !== "Standalone" && (
                            <span className="absolute top-2 left-2 font-display text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 bg-ink/80 text-gold border border-gold/30 rounded-sm">
                              {related.seriesNumber === 0
                                ? "Prequel"
                                : `Book ${related.seriesNumber}`}
                            </span>
                          )}
                        {related.kindleUnlimited && (
                          <span className="absolute top-2 right-2 font-display text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 bg-gold/95 text-ink rounded-sm font-semibold">
                            KU
                          </span>
                        )}
                      </div>
                      <p className="font-serif text-sm text-foreground mt-3 line-clamp-2 group-hover:text-gold transition-colors leading-tight">
                        {related.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1 italic">
                        {related.genre}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />

      {/* Modal for related book previews (optional click) */}
    </main>
  );
}
