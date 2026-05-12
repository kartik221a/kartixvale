"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { FreeReadBook } from "@/lib/free-reads-data";
import { freeReadBooks } from "@/lib/free-reads-data";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

interface FreeReadClientProps {
  book: FreeReadBook;
}

export default function FreeReadClient({ book }: FreeReadClientProps) {
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapter = book.chapters[currentChapter];
  const isFirstChapter = currentChapter === 0;
  const isLastChapter = currentChapter === book.chapters.length - 1;

  // Get other books (excluding current) for cross-promotion
  const otherBooks = freeReadBooks.filter((b) => b.slug !== book.slug).slice(0, 3);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== BOOK HEADER ===== */}
      <section className="relative pt-24 pb-8 md:pt-32 md:pb-10 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-midnight/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blood/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Back link */}
            <motion.div variants={fadeInUp} className="mb-6">
              <Link
                href="/free-reads"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blood-light transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Free Reads
              </Link>
            </motion.div>

            {/* Book info row */}
            <motion.div variants={fadeInUp} className="flex gap-5 md:gap-8 items-start">
              {/* Cover thumbnail */}
              <div className="flex-shrink-0 w-20 md:w-28 rounded-md overflow-hidden shadow-lg shadow-black/30">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <Badge className="bg-blood/20 text-blood-light border-blood/30 text-xs uppercase tracking-wider mb-2">
                  {book.genre}
                </Badge>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-2">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="text-muted-foreground text-sm italic mb-3">{book.subtitle}</p>
                )}
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  &ldquo;{book.hook}&rdquo;
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="divider-gold w-full mt-6" />
          </motion.div>
        </div>
      </section>

      {/* ===== CHAPTER NAVIGATION ===== */}
      <section className="bg-gradient-dark border-b border-border/30 sticky top-16 z-40 backdrop-blur-md bg-overlay/80">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => !isFirstChapter && setCurrentChapter(currentChapter - 1)}
              disabled={isFirstChapter}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isFirstChapter
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "text-muted-foreground hover:text-blood-light"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {book.chapters.map((ch, idx) => (
                <button
                  key={ch.number}
                  onClick={() => setCurrentChapter(idx)}
                  className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-300 ${
                    idx === currentChapter
                      ? "bg-blood-light text-white shadow-[0_0_15px_rgba(220,20,60,0.4)]"
                      : "bg-muted/30 text-muted-foreground hover:bg-blood/20 hover:text-blood-light"
                  }`}
                >
                  {ch.number}
                </button>
              ))}
              {/* Locked next chapter indicator */}
              <div className="w-8 h-8 rounded-full bg-muted/10 text-muted-foreground/30 flex items-center justify-center">
                <Lock className="h-3 w-3" />
              </div>
            </div>

            <button
              onClick={() => !isLastChapter && setCurrentChapter(currentChapter + 1)}
              disabled={isLastChapter}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isLastChapter
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "text-muted-foreground hover:text-blood-light"
              }`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== CHAPTER CONTENT ===== */}
      <section className="py-10 md:py-14 bg-gradient-dark relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Chapter heading */}
              <div className="text-center mb-8">
                <p className="text-gold/80 tracking-[0.3em] uppercase text-xs mb-2">
                  Free Preview
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                  {chapter.title}
                </h2>
              </div>

              {/* Chapter content */}
              <article
                className="prose-dark"
                dangerouslySetInnerHTML={{ __html: chapter.content }}
              />

              {/* ===== MID-READ CTA (shows after chapter content) ===== */}
              <div className="mt-10 mb-6 p-6 md:p-8 rounded-xl border border-blood/20 bg-blood/5 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blood/10 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 text-center">
                  <BookOpen className="h-8 w-8 text-blood-light mx-auto mb-4" />
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                    Want to Know What Happens Next?
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-md mx-auto">
                    The free chapters end here. The full story — every twist, every revelation, every devastating moment — is waiting on Amazon.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    {book.amazonUrl && (
                      <a
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-blood-light hover:bg-blood text-white font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Continue on Amazon — {book.price}
                        </Button>
                      </a>
                    )}
                    {book.kindleUnlimited && (
                      <p className="text-gold text-sm font-medium">
                        Also available on Kindle Unlimited
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
            <button
              onClick={() => !isFirstChapter && setCurrentChapter(currentChapter - 1)}
              disabled={isFirstChapter}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isFirstChapter
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "text-blood-light hover:text-blood"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              Previous Chapter
            </button>

            <span className="text-xs text-muted-foreground">
              Chapter {currentChapter + 1} of {book.chapters.length} (Free Preview)
            </span>

            <button
              onClick={() => !isLastChapter && setCurrentChapter(currentChapter + 1)}
              disabled={isLastChapter}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isLastChapter
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "text-blood-light hover:text-blood"
              }`}
            >
              Next Chapter
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== CROSS-PROMOTION: MORE FREE READS ===== */}
      <section className="py-16 md:py-20 bg-section-alt relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blood/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                More Free Reads
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                Try Another Book
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {otherBooks.map((other) => (
                <motion.div key={other.slug} variants={fadeInUp} className="flex">
                  <Link href={`/free-reads/${other.slug}`} className="block group w-full">
                    <article className="card-dark rounded-xl p-5 flex flex-col h-full hover:border-blood/30 hover:shadow-[0_0_25px_rgba(139,0,0,0.15)] transition-all duration-300">
                      <div className="flex gap-3 mb-3">
                        <div className="flex-shrink-0 w-12 rounded overflow-hidden">
                          <img
                            src={other.coverUrl}
                            alt={other.title}
                            className="w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-blood-light text-[10px] uppercase tracking-wider">
                            {other.genre}
                          </span>
                          <h3 className="font-serif text-sm text-foreground line-clamp-2 leading-snug group-hover:text-gold transition-colors">
                            {other.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3 flex-grow line-clamp-2 italic">
                        &ldquo;{other.hook}&rdquo;
                      </p>
                      <div className="flex items-center gap-2 text-blood-light text-xs font-medium group-hover:gap-3 transition-all duration-300">
                        <BookOpen className="h-3 w-3" />
                        Read {other.chapters.length} Free {other.chapters.length === 1 ? "Chapter" : "Chapters"}
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-section-footer border-t border-border py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-4">
              <span className="logo-text text-xl uppercase">Kartix</span>
            </div>
            <p className="font-serif text-lg text-foreground/60 italic mb-4">
              &ldquo;Love was never meant to be safe&rdquo;
            </p>
            <div className="divider-gold w-16 mx-auto mb-6" />
            <nav className="flex justify-center gap-6 mb-6" aria-label="Footer navigation">
              <Link href="/" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">Home</Link>
              <Link href="/books" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">Books</Link>
              <Link href="/free-reads" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">Free Reads</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">Blog</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">About</Link>
            </nav>
            <p className="text-xs text-muted-foreground/50">&copy; 2025 Kartix Vale. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
