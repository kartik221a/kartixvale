"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/reading-list/save-button";
import type { BlogPost } from "@/lib/blog-service";
import { featuredBooks } from "@/lib/books-data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  ExternalLink,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";

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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 800);
      // Reading progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active heading tracking — highlights current section in TOC
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Parse H2 headings from the post content
    const headingMatches = post.content.match(/<h2[^>]*id="([^"]+)"/g);
    if (!headingMatches) return;

    const headingIds: string[] = headingMatches
      .map((m) => m.match(/id="([^"]+)"/)?.[1])
      .filter((id): id is string => Boolean(id));

    if (headingIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveHeading(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headingIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [post.content]);

  // Parse TOC entries from post content's H2 headings (rendered HTML)
  // Used to build the sticky TOC sidebar on desktop
  const [tocEntries, setTocEntries] = useState<{ id: string; text: string }[]>([]);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const h2Elements = document.querySelectorAll("article.prose-editorial h2[id]");
    const entries: { id: string; text: string }[] = [];
    h2Elements.forEach((el) => {
      const id = el.getAttribute("id") || "";
      const text = (el.textContent || "").trim();
      if (id && text) entries.push({ id, text });
    });
    setTocEntries(entries);
  }, [post.content]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Navbar />

      {/* Reading progress bar — fixed at top of viewport */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-blood via-gold to-gold-bright transition-[width] duration-100 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* ============================================================
          ARTICLE HEADER — editorial masthead
          ============================================================ */}
      <section className="relative pt-32 pb-12 md:pt-44 md:pb-16 bg-gradient-ink overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(160,24,24,0.15) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 70% 80%, rgba(184,146,74,0.10) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(12,9,7,0.6) 100%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Breadcrumb */}
            <motion.nav
              variants={fadeUp}
              className="flex items-center gap-2 text-xs font-display tracking-[0.15em] uppercase text-muted-foreground mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span className="text-gold/40">/</span>
              <Link href="/blog" className="hover:text-gold transition-colors">
                The Dark Library
              </Link>
              <span className="text-gold/40">/</span>
              <span className="text-gold truncate">{post.category}</span>
            </motion.nav>

            {/* Category + reading meta */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span
                className="font-display text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 border rounded-sm"
                style={{
                  color: post.categoryColor,
                  borderColor: `${post.categoryColor}55`,
                  backgroundColor: `${post.categoryColor}15`,
                }}
              >
                {post.category}
              </span>
              <span className="font-body text-sm text-muted-foreground italic flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.1] text-foreground leading-tight mb-6 text-glow-soft"
            >
              {post.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              variants={fadeUp}
              className="font-body text-lg md:text-xl text-foreground/70 italic leading-relaxed mb-8"
            >
              {post.excerpt}
            </motion.p>

            <motion.div variants={fadeUp} className="divider-ornament w-full" />

            {/* Byline */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-blood/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-gold text-sm">KV</span>
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-sm text-foreground leading-tight">
                    Kartix Vale
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    Dark Romance Author
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <SaveButton
                  kind="article"
                  slug={post.slug}
                  title={post.title}
                  href={`/blog/${post.slug}`}
                />
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-display tracking-[0.15em] uppercase text-muted-foreground hover:text-gold transition-colors focus-ring rounded-sm"
                >
                  <ArrowLeft className="h-3 w-3" />
                  All Articles
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          ARTICLE BODY — readable editorial typography + sticky TOC sidebar
          ============================================================ */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sticky TOC sidebar — desktop only */}
            {tocEntries.length > 3 && (
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
                  <p className="font-display text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
                    On this page
                  </p>
                  <div className="divider-gold w-12 mb-4" />
                  <nav aria-label="Article table of contents">
                    <ul className="space-y-1 text-sm">
                      {tocEntries.map((entry) => (
                        <li key={entry.id}>
                          <a
                            href={`#${entry.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById(entry.id)
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }}
                            className={`block py-1 pl-3 border-l-2 transition-all duration-200 ${
                              activeHeading === entry.id
                                ? "border-gold text-gold font-medium"
                                : "border-border/40 text-muted-foreground hover:text-foreground hover:border-gold/40"
                            }`}
                          >
                            {entry.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}

            {/* Article content */}
            <div className={tocEntries.length > 3 ? "lg:col-span-9" : "lg:col-span-12"}>
              <div className="max-w-3xl mx-auto">
                <motion.article
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="prose-editorial"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Article footer — back to blog */}
                <div className="mt-16 pt-8 border-t border-border/40">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-display tracking-[0.15em] uppercase text-gold hover:text-foreground transition-colors focus-ring rounded-sm"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to The Dark Library
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BOOK RECOMMENDATIONS — natural connection to the catalogue
          ============================================================ */}
      <section className="py-16 md:py-24 bg-section-alt relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(160,24,24,0.10) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                Continue Into the Books
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 leading-tight">
                Explore dark romance with Kartix Vale
              </h2>
              <div className="divider-gold w-24 mx-auto mb-5" />
              <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A curated entry into the catalogue — the books that best exemplify
                the atmospheres this article describes. All on Amazon and Kindle
                Unlimited.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6"
            >
              {featuredBooks.slice(0, 6).map((book) => (
                <motion.div
                  key={book.title}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center"
                >
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative w-full aspect-[2/3] rounded-sm overflow-hidden cover-shadow cover-shadow-hover focus-ring"
                    aria-label={`Buy ${book.title} on Amazon`}
                  >
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%)",
                      }}
                    />
                    {book.kindleUnlimited && (
                      <span className="absolute top-2 right-2 font-display text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 bg-gold/95 text-ink rounded-sm font-semibold">
                        KU
                      </span>
                    )}
                  </a>
                  <p className="font-serif text-xs text-foreground leading-tight mt-2 line-clamp-2">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-gold/70 mt-0.5">{book.price}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="text-center mt-12">
              <Link href="/books">
                <Button variant="oxblood" className="h-12 px-8 text-sm tracking-wider uppercase font-semibold">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All {featuredBooks.length * 3 > 0 ? "17" : ""} Books
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          RELATED ARTICLES
          ============================================================ */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-10">
                <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
                  Keep Reading
                </p>
                <div className="divider-gold w-16" />
              </motion.div>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {relatedPosts.map((related) => (
                  <motion.div key={related.slug} variants={fadeUp}>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="group block h-full card-dark rounded-md p-5 transition-all duration-300 hover:border-gold/40 focus-ring"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className="font-display text-[9px] tracking-[0.3em] uppercase px-2 py-0.5 border rounded-sm"
                          style={{
                            color: related.categoryColor,
                            borderColor: `${related.categoryColor}55`,
                            backgroundColor: `${related.categoryColor}15`,
                          }}
                        >
                          {related.category}
                        </span>
                        <span className="text-xs text-muted-foreground italic">
                          {related.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-base text-foreground mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-3 leading-snug">
                        {related.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-gold text-xs font-display tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Read
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />

      {/* ============================================================
          BACK TO TOP — floating, appears after scroll
          ============================================================ */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-ink/80 dark:bg-card/80 border border-gold/30 text-gold hover:bg-ink hover:border-gold/50 transition-all duration-300 backdrop-blur-md focus-ring"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </main>
  );
}
