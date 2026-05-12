"use client";

import { useState, useEffect, useCallback } from "react";
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
  X,
  Mail,
  Sparkles,
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
  const [emailGatePassed, setEmailGatePassed] = useState(false);
  const [emailGateOpen, setEmailGateOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [exitPopupOpen, setExitPopupOpen] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);

  const chapter = book.chapters[currentChapter];
  const isFirstChapter = currentChapter === 0;
  const isLastChapter = book.chapters.length > 0 && currentChapter === book.chapters.length - 1;

  // The email gate appears after the Prologue (index 1)
  // Chapters: 0=Introduction, 1=Prologue, 2=Ch1, 3=Ch2, 4=Ch3, 5=Ch4
  const EMAIL_GATE_CHAPTER = 1;

  // Check if user already submitted email (localStorage)
  useEffect(() => {
    const storedEmail = localStorage.getItem("kv_email");
    if (storedEmail) {
      setEmailGatePassed(true);
      setEmailSubmitted(true);
      setEmail(storedEmail);
    }
  }, []);

  // Show sticky bar after scrolling past the chapter heading
  useEffect(() => {
    const handleScroll = () => {
      setStickyBarVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Exit-intent detection (desktop)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page
      if (e.clientY <= 0 && !exitPopupShown && !emailSubmitted) {
        setExitPopupOpen(true);
        setExitPopupShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [exitPopupShown, emailSubmitted]);

  // Handle chapter change — show email gate if needed
  const handleChapterChange = useCallback((newChapter: number) => {
    // If trying to go past the Prologue and email not submitted, show gate
    if (newChapter > EMAIL_GATE_CHAPTER && !emailGatePassed) {
      setEmailGateOpen(true);
      return;
    }
    setCurrentChapter(newChapter);
  }, [emailGatePassed, EMAIL_GATE_CHAPTER]);

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setEmailSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "free-read-gate" }),
      });
      // Both 200 (already subscribed) and 201 (new subscriber) are success
      if (res.ok) {
        setEmailSubmitted(true);
        setEmailGatePassed(true);
        localStorage.setItem("kv_email", email.trim().toLowerCase());
        // Close gate after a moment
        setTimeout(() => {
          setEmailGateOpen(false);
          setCurrentChapter(EMAIL_GATE_CHAPTER + 1);
        }, 1500);
      }
    } catch {
      // Still let them through even if API fails
      setEmailGatePassed(true);
      setEmailSubmitted(true);
      localStorage.setItem("kv_email", email.trim().toLowerCase());
      setTimeout(() => {
        setEmailGateOpen(false);
        setCurrentChapter(EMAIL_GATE_CHAPTER + 1);
      }, 1500);
    }
    setEmailSubmitting(false);
  };

  // Handle exit popup email submit
  const handleExitEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setEmailSubmitting(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent" }),
      });
    } catch {
      // Silently fail
    }
    setEmailSubmitted(true);
    setEmailGatePassed(true);
    localStorage.setItem("kv_email", email.trim().toLowerCase());
    setEmailSubmitting(false);
    setExitPopupOpen(false);
  };

  // Get other books (excluding current, only non-coming-soon) for cross-promotion
  const otherBooks = freeReadBooks.filter((b) => b.slug !== book.slug && !b.comingSoon).slice(0, 3);

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
              onClick={() => !isFirstChapter && handleChapterChange(currentChapter - 1)}
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
                  onClick={() => handleChapterChange(idx)}
                  className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-300 ${
                    idx === currentChapter
                      ? "bg-blood-light text-white shadow-[0_0_15px_rgba(220,20,60,0.4)]"
                      : idx > EMAIL_GATE_CHAPTER && !emailGatePassed
                        ? "bg-muted/10 text-muted-foreground/30 cursor-not-allowed"
                        : "bg-muted/30 text-muted-foreground hover:bg-blood/20 hover:text-blood-light"
                  }`}
                >
                  {idx <= EMAIL_GATE_CHAPTER || emailGatePassed ? (idx + 1) : <Lock className="h-3 w-3 mx-auto" />}
                </button>
              ))}
              {/* Locked next chapter indicator */}
              <div className="w-8 h-8 rounded-full bg-muted/10 text-muted-foreground/30 flex items-center justify-center">
                <Lock className="h-3 w-3" />
              </div>
            </div>

            <button
              onClick={() => !isLastChapter && handleChapterChange(currentChapter + 1)}
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
      <section className="py-10 md:py-14 bg-gradient-dark relative overflow-hidden pb-28">
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
              onClick={() => !isFirstChapter && handleChapterChange(currentChapter - 1)}
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
              onClick={() => !isLastChapter && handleChapterChange(currentChapter + 1)}
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

      {/* ===== STICKY BUY BAR ===== */}
      <AnimatePresence>
        {stickyBarVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-blood/20 backdrop-blur-xl"
            style={{ backgroundColor: "rgba(10, 2, 2, 0.92)" }}
          >
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0 w-10 h-14 rounded overflow-hidden shadow-md">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-foreground text-sm font-medium truncate">
                    Loving this story?
                  </p>
                  <p className="text-muted-foreground text-xs truncate">
                    The full book is on Amazon — {book.price}
                    {book.kindleUnlimited && " · KU"}
                  </p>
                </div>
              </div>
              {book.amazonUrl && (
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                >
                  <Button className="bg-blood-light hover:bg-blood text-white font-semibold px-6 h-10 text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,20,60,0.4)] hover:scale-105 whitespace-nowrap">
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    Get Full Book
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== EMAIL CAPTURE GATE MODAL ===== */}
      <AnimatePresence>
        {emailGateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-md w-full rounded-2xl border border-blood/30 overflow-hidden"
              style={{ backgroundColor: "rgba(20, 5, 5, 0.98)" }}
            >
              {/* Close button */}
              <button
                onClick={() => setEmailGateOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground/50 hover:text-foreground transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 text-center">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-blood/20 border border-blood/30 flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-blood-light" />
                </div>

                {!emailSubmitted ? (
                  <>
                    <h3 className="font-serif text-2xl text-foreground mb-2">
                      Keep Reading For Free
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                      Enter your email to unlock all chapters. I&apos;ll also notify you when new books drop — no spam, ever.
                    </p>

                    <form onSubmit={handleEmailSubmit} className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-blood/50 focus:ring-1 focus:ring-blood/30 transition-colors text-sm"
                      />
                      <Button
                        type="submit"
                        disabled={emailSubmitting}
                        className="w-full bg-blood-light hover:bg-blood text-white font-semibold h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)]"
                      >
                        {emailSubmitting ? (
                          "Unlocking..."
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Unlock Chapters 1-4
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-muted-foreground/40 text-[11px] mt-4">
                      Free forever. Unsubscribe anytime.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-700/30 flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-400 text-2xl">✓</span>
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-2">
                      Unlocked!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      All chapters are now yours. Happy reading...
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== EXIT-INTENT POPUP ===== */}
      <AnimatePresence>
        {exitPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-md w-full rounded-2xl border border-gold/30 overflow-hidden"
              style={{ backgroundColor: "rgba(20, 5, 5, 0.98)" }}
            >
              {/* Close button */}
              <button
                onClick={() => setExitPopupOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground/50 hover:text-foreground transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 text-center">
                {/* Book cover */}
                <div className="w-24 h-36 rounded-md overflow-hidden shadow-lg shadow-black/40 mx-auto mb-6">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-serif text-2xl text-foreground mb-2">
                  Don&apos;t Leave Without the Rest
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                  The full story of <em>{book.title}</em> is waiting on Amazon. {book.kindleUnlimited && "Read free with Kindle Unlimited. "}
                  {book.price && `Just ${book.price} to own forever.`}
                </p>

                <div className="space-y-3">
                  {book.amazonUrl && (
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-blood-light hover:bg-blood text-white font-semibold h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Get the Full Book — {book.price}
                      </Button>
                    </a>
                  )}

                  {!emailSubmitted && (
                    <div className="pt-3 border-t border-border/20">
                      <p className="text-muted-foreground/60 text-xs mb-3">
                        Or get notified about new releases:
                      </p>
                      <form onSubmit={handleExitEmailSubmit} className="flex gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="flex-1 px-3 py-2.5 rounded-lg bg-muted/20 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors text-sm"
                        />
                        <Button
                          type="submit"
                          disabled={emailSubmitting}
                          className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 font-medium px-4 h-10 text-sm transition-all duration-300"
                        >
                          {emailSubmitting ? "..." : "Notify Me"}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== CROSS-PROMOTION: MORE FREE READS ===== */}
      {otherBooks.length > 0 && (
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
      )}

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
