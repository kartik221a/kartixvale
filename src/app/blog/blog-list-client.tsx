"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/blog-service";
import { Clock, ArrowRight, BookOpen, Feather } from "lucide-react";

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
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
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

/**
 * Extract the opening paragraphs of an article from its Markdown content.
 * Strips TOC lists, frontmatter, headings, and Markdown formatting to return clean prose.
 * Used by the blog landing featured article panel for dynamic opening text.
 */
function extractOpeningPassage(content: string, paragraphCount = 2): string[] {
  // Remove the TOC section if present (starts with "## Table of Contents" and ends at next ## or end of section)
  const withoutToc = content.replace(/^##\s+Table of Contents[\s\S]*?(?=^##\s)/m, "");

  // Split into blocks by double newlines
  const blocks = withoutToc.split(/\n\s*\n/);

  const paragraphs: string[] = [];
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    // Skip headings
    if (/^#{1,6}\s/.test(trimmed)) continue;
    // Skip TOC list items (start with - or * and look like links)
    if (/^[-*]\s+\[/.test(trimmed)) continue;
    // Skip blockquotes (start with >)
    if (/^>/.test(trimmed)) continue;
    // Skip YAML frontmatter
    if (/^---/.test(trimmed)) continue;
    // Skip list-only blocks
    if (/^[-*]\s/m.test(trimmed) && trimmed.split("\n").every((l) => /^[-*]\s/.test(l.trim()) || !l.trim())) continue;

    // Clean Markdown inline formatting
    const cleaned = trimmed
      // Remove links, keep text: [text](url) → text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Bold: **text** → text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      // Italic: *text* → text (be careful with bold already removed)
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "$1")
      // Inline code: `text` → text
      .replace(/`([^`]+)`/g, "$1")
      .trim();

    if (cleaned.length > 60) {
      paragraphs.push(cleaned);
    }
    if (paragraphs.length >= paragraphCount) break;
  }

  return paragraphs;
}

interface BlogListClientProps {
  posts: BlogPost[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [featured, ...rest] = posts;
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Extract unique categories from all posts
  const categories = useMemo(() => {
    const seen = new Map<string, string>(); // category -> color
    posts.forEach((p) => {
      if (!seen.has(p.category)) {
        seen.set(p.category, p.categoryColor);
      }
    });
    return Array.from(seen.entries()).map(([name, color]) => ({ name, color }));
  }, [posts]);

  // Filter the "rest" (non-featured) posts by category
  const filteredRest = useMemo(() => {
    if (categoryFilter === "all") return rest;
    return rest.filter((p) => p.category === categoryFilter);
  }, [rest, categoryFilter]);

  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Navbar />

      {/* ============================================================
          EDITORIAL MASTHEAD
          ============================================================ */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden bg-gradient-ink">
        {/* Atmospheric backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(160,24,24,0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(184,146,74,0.10) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(12,9,7,0.6) 100%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-6">
              <Feather className="h-7 w-7 text-gold mx-auto" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-5"
            >
              Essays · Guides · Deep Dives
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] text-glow-soft"
            >
              The Dark Library
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-ornament w-64 mx-auto my-8" />
            <motion.p
              variants={fadeUp}
              className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed"
            >
              A longform journal on dark romance — the genre, its tropes, its
              neighbours, and the books that define it. Honest maps for readers
              who want a clearer language for what they&apos;re reading.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          FEATURED ARTICLE — full-bleed editorial
          ============================================================ */}
      {featured && (
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-8">
                <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
                  Featured · Latest
                </p>
                <div className="divider-gold w-16" />
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block card-dark rounded-md overflow-hidden hover:border-gold/40 transition-all duration-500 hover:shadow-[0_0_80px_-30px_rgba(184,146,74,0.4)] focus-ring"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Hero panel */}
                    <div className="lg:col-span-5 p-8 md:p-12 lg:p-14 flex flex-col justify-between bg-gradient-to-br from-card to-background relative overflow-hidden">
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 30% 20%, rgba(160,24,24,0.15) 0%, transparent 50%)",
                        }}
                      />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <span
                            className="font-display text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 border rounded-sm"
                            style={{
                              color: featured.categoryColor,
                              borderColor: `${featured.categoryColor}55`,
                              backgroundColor: `${featured.categoryColor}15`,
                            }}
                          >
                            {featured.category}
                          </span>
                          <span className="font-body text-sm text-muted-foreground italic">
                            {featured.readTime}
                          </span>
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight mb-4 group-hover:text-gold transition-colors duration-300">
                          {featured.title}
                        </h2>
                        <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed">
                          {featured.excerpt}
                        </p>
                      </div>
                      <div className="relative z-10 mt-8 flex items-center justify-between">
                        <span className="font-body text-sm text-muted-foreground italic">
                          {formatDate(featured.date)}
                        </span>
                        <span className="flex items-center text-[11px] font-display tracking-[0.3em] uppercase text-gold">
                          Read
                          <ArrowRight className="h-3 w-3 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>

                    {/* Opening passage panel — dynamically extracted from article content */}
                    <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 lg:border-l lg:border-border/40 bg-section-alt">
                      <div className="prose-editorial max-w-none">
                        <p className="font-serif italic text-xl md:text-2xl text-gold leading-relaxed mb-6">
                          &ldquo;{featured.excerpt}&rdquo;
                        </p>
                        {extractOpeningPassage(featured.content, 2).map((p, i) => (
                          <p key={i} className={i === 1 ? "text-muted-foreground" : ""}>
                            {p}
                          </p>
                        ))}
                        <p className="text-muted-foreground italic">
                          Tap through to read the full piece — {featured.readTime.toLowerCase()} of careful,
                          honest writing on dark romance, its tropes, its neighbours,
                          and the books that define it.
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ============================================================
          REMAINING ARTICLES GRID (empty state-aware)
          ============================================================ */}
      {rest.length > 0 && (
        <section className="py-16 md:py-20 bg-section-alt">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-6">
                <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
                  More from the Library
                </p>
                <div className="divider-gold w-16 mb-5" />
              </motion.div>

              {/* Category filter chips */}
              {categories.length > 1 && (
                <motion.div variants={fadeUp} className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8">
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className={`text-[10px] font-display tracking-[0.15em] uppercase px-2.5 py-1 rounded-full transition-colors whitespace-nowrap focus-ring ${
                      categoryFilter === "all"
                        ? "bg-gold/15 text-gold border border-gold/40"
                        : "text-muted-foreground border border-border/60 hover:text-foreground hover:border-foreground/40"
                    }`}
                  >
                    All ({rest.length})
                  </button>
                  {categories.map((cat) => {
                    const count = rest.filter((p) => p.category === cat.name).length;
                    if (count === 0) return null;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setCategoryFilter(cat.name)}
                        className={`text-[10px] font-display tracking-[0.15em] uppercase px-2.5 py-1 rounded-full transition-colors whitespace-nowrap focus-ring ${
                          categoryFilter === cat.name
                            ? "border text-foreground"
                            : "text-muted-foreground border border-border/60 hover:text-foreground hover:border-foreground/40"
                        }`}
                        style={
                          categoryFilter === cat.name
                            ? {
                                color: cat.color,
                                borderColor: `${cat.color}55`,
                                backgroundColor: `${cat.color}15`,
                              }
                            : undefined
                        }
                      >
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {/* Filtered articles grid */}
              {filteredRest.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-serif italic text-lg text-muted-foreground">
                    No articles in this category yet.
                  </p>
                </div>
              ) : (
                <motion.div
                  variants={stagger}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredRest.map((post) => (
                    <motion.div key={post.slug} variants={fadeUp}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group block h-full card-dark rounded-md p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_40px_-12px_rgba(184,146,74,0.2)] focus-ring"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <span
                            className="font-display text-[9px] tracking-[0.3em] uppercase px-2 py-1 border rounded-sm"
                            style={{
                              color: post.categoryColor,
                              borderColor: `${post.categoryColor}55`,
                              backgroundColor: `${post.categoryColor}15`,
                            }}
                          >
                          {post.category}
                        </span>
                        <span className="font-body text-xs text-muted-foreground italic">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-foreground leading-tight mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-3">
                        {post.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/40">
                        <span>{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Read
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ============================================================
          EMPTY STATE — when no posts
          ============================================================ */}
      {posts.length === 0 && (
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Feather className="h-10 w-10 text-gold mx-auto mb-6 opacity-60" />
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              The library is being written
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              The first essay is on its way. Meanwhile, explore the books —
              every one of them is a doorway into a different shade of dark.
            </p>
            <Link href="/books">
              <Button variant="oxblood" className="h-12 px-8 text-sm tracking-wider uppercase font-semibold">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse the Books
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* ============================================================
          READING CTA
          ============================================================ */}
      <section className="py-20 md:py-24 bg-section-alt relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(184,146,74,0.08) 0%, transparent 70%)",
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
              Continue Reading
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl md:text-5xl text-foreground mb-4 leading-tight"
            >
              Step into the books
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto mb-6" />
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
            >
              The journal speaks about the genre. The books live inside it.
              Seventeen novels, three series, and ten standalones — all on Amazon
              and Kindle Unlimited.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="/books">
                <Button variant="oxblood" className="h-12 px-8 text-sm tracking-wider uppercase font-semibold">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse the Catalogue
                </Button>
              </Link>
              <a
                href="https://www.amazon.com/author/kartixvale"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="gold" className="h-12 px-8 text-sm tracking-wider uppercase font-semibold">
                  Amazon Author Page
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
