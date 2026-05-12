"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { blogPosts, BlogPost, getPublishedPosts } from "@/lib/blog-data";
import { BlogBuyCTA, BlogMultiBookCTA } from "@/components/blog/blog-buy-cta";
import { ArrowLeft, BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// CTA injection positions per blog slug
// Each blog gets different CTAs at strategic points in the content
const BLOG_CTA_CONFIG: Record<string, Array<{ afterHeading: string; component: JSX.Element }>> = {
  "what-is-dark-romance": [],
  "best-dark-fae-romance-books": [],
  "enemies-to-lovers-dark-romance": [],
  "beneath-the-veil-reading-order": [],
  "slow-burn-romance-why-the-wait": [],
  "best-enemies-to-lovers-dark-romance-books": [],
  "best-mafia-romance-books": [],
  "what-is-mafia-romance": [],
  "best-bully-romance-books": [],
  "dark-romance-content-warnings": [],
  "best-dark-romance-kindle-unlimited": [],
  "best-stalker-romance-books": [],
};

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const relatedPosts = getPublishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Inject CTAs into blog content at strategic positions
  const contentWithCTAs = injectCTAs(post.slug, post.content);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== ARTICLE HEADER ===== */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-dark overflow-hidden">
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
            {/* Back to blog link */}
            <motion.div variants={fadeInUp} className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blood-light transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to The Dark Library
              </Link>
            </motion.div>

            {/* Category Badge */}
            <motion.div variants={fadeInUp} className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${post.categoryColor}`}>
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6"
            >
              {post.title}
            </motion.h1>

            {/* Meta: Date + Read Time */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </motion.div>

            <motion.div variants={fadeInUp} className="divider-gold w-full mt-8" />
          </motion.div>
        </div>
      </section>

      {/* ===== ARTICLE BODY ===== */}
      <section className="py-12 md:py-16 bg-gradient-dark relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.article
              variants={fadeInUp}
              className="prose-dark"
              dangerouslySetInnerHTML={{ __html: contentWithCTAs }}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== BOTTOM CTA: BIG BUY SECTION ===== */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: "rgba(139, 0, 0, 0.06)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blood/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <BlogBuyCTA
            variant="primary"
            bookSlug="the-gotham-reapers-bride"
            context="Ready to experience dark romance?"
          />
        </div>
      </section>

      {/* ===== RELATED ARTICLES ===== */}
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
                Keep Reading
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                Related Articles
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {relatedPosts.map((related) => (
                <motion.div key={related.slug} variants={fadeInUp} className="flex">
                  <Link href={`/blog/${related.slug}`} className="block group w-full">
                    <article className="card-dark rounded-xl p-5 flex flex-col h-full hover:border-blood/30 hover:shadow-[0_0_25px_rgba(139,0,0,0.15)] transition-all duration-300">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${related.categoryColor} mb-3 w-fit`}>
                        {related.category}
                      </span>
                      <h3 className="font-serif text-base text-foreground mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-snug">
                        {related.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3 flex-grow line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-blood-light text-xs font-medium group-hover:gap-3 transition-all duration-300">
                        Read article
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Internal link to books page */}
            <motion.div variants={fadeInUp} className="text-center mt-10">
              <Link href="/books">
                <Button variant="blood" className="font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Browse All Books
                </Button>
              </Link>
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
              <Link href="/" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Home
              </Link>
              <Link href="/books" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Books
              </Link>
              <Link href="/free-reads" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Free Reads
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                About
              </Link>
            </nav>
            <p className="text-xs text-muted-foreground/50">
              &copy; 2025 Kartix Vale. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/40 mt-1">
              All books available on Amazon
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ===== CTA INJECTION ENGINE =====
// Injects HTML-based CTAs directly into blog content at strategic positions

function injectCTAs(slug: string, content: string): string {
  // Different CTA strategies for different blog posts
  const ctaStrategies: Record<string, Array<{ afterH2Index: number; html: string }>> = {
    "what-is-dark-romance": [
      {
        afterH2Index: 2, // After "Why Readers Love Dark Romance"
        html: buildPrimaryCTA("the-gotham-reapers-bride", "Ready to experience dark romance?"),
      },
      {
        afterH2Index: 3, // After "Where to Start"
        html: buildMultiBookCTA(
          ["the-gotham-reapers-bride", "a-bargain-in-shadows", "thorns-of-the-fae-thorne"],
          "Start Reading Now"
        ),
      },
    ],
    "best-dark-fae-romance-books": [
      {
        afterH2Index: 2, // After a few book entries
        html: buildPrimaryCTA("thorns-of-the-fae-thorne", "The #1 slow burn dark fae romance"),
      },
      {
        afterH2Index: 5, // After more entries
        html: buildSecondaryCTA("thorns-of-the-fae-thorne", "Experience the devastating slow burn"),
      },
      {
        afterH2Index: 8, // Near the end
        html: buildSecondaryCTA("thorns-of-the-fae-thorne", "Ready for Thorns of the Fae Thorne?"),
      },
    ],
    "enemies-to-lovers-dark-romance": [
      {
        afterH2Index: 2, // After "What Dark Romance Adds"
        html: buildPrimaryCTA("the-gotham-reapers-bride", "Enemies to lovers at its darkest"),
      },
      {
        afterH2Index: 4, // After "Books That Nail It"
        html: buildMultiBookCTA(
          ["thorns-of-the-fae-thorne", "a-bargain-in-shadows"],
          "Feel the Enmity Burn"
        ),
      },
    ],
    "beneath-the-veil-reading-order": [
      {
        afterH2Index: 2, // After "Book One"
        html: buildSecondaryCTA("a-bargain-in-shadows", "Start the series now"),
      },
      {
        afterH2Index: 4, // After "Book Three"
        html: buildSecondaryCTA("a-crown-of-ashes", "Continue the journey"),
      },
      {
        afterH2Index: 6, // After "Can You Read Them As Standalones?"
        html: buildMultiBookCTA(
          ["a-bargain-in-shadows", "the-unholy-reverie", "a-crown-of-ashes"],
          "Begin the Descent"
        ),
      },
    ],
    "slow-burn-romance-why-the-wait": [
      {
        afterH2Index: 2, // After "Why Dark Romance Slow Burns Hit Harder"
        html: buildPrimaryCTA("thorns-of-the-fae-thorne", "The ultimate slow burn awaits"),
      },
      {
        afterH2Index: 4, // After "The Touch-Starved Trope"
        html: buildSecondaryCTA("the-gotham-reapers-bride", "Slow burn gothic romance"),
      },
    ],
    "best-enemies-to-lovers-dark-romance-books": [
      {
        afterH2Index: 3,
        html: buildPrimaryCTA("thorns-of-the-fae-thorne", "The #1 slow burn enemies to lovers"),
      },
      {
        afterH2Index: 6,
        html: buildSecondaryCTA("a-bargain-in-shadows", "Enemies to lovers, gothic style"),
      },
    ],
    "best-mafia-romance-books": [
      {
        afterH2Index: 3,
        html: buildPrimaryCTA("the-gotham-reapers-bride", "Dark romance with dangerous secrets"),
      },
      {
        afterH2Index: 6,
        html: buildSecondaryCTA("a-bargain-in-shadows", "Marriage of convenience goes dark"),
      },
    ],
    "what-is-mafia-romance": [
      {
        afterH2Index: 2,
        html: buildPrimaryCTA("the-gotham-reapers-bride", "A gothic take on mafia romance"),
      },
      {
        afterH2Index: 4,
        html: buildMultiBookCTA(
          ["the-gotham-reapers-bride", "a-bargain-in-shadows"],
          "Start Your Dark Romance Journey"
        ),
      },
    ],
    "best-bully-romance-books": [
      {
        afterH2Index: 3,
        html: buildPrimaryCTA("thorns-of-the-fae-thorne", "Dark romance with reluctant bonds"),
      },
      {
        afterH2Index: 6,
        html: buildSecondaryCTA("the-gotham-reapers-bride", "Dark romance at its most intense"),
      },
    ],
    "dark-romance-content-warnings": [
      {
        afterH2Index: 3,
        html: buildMultiBookCTA(
          ["thorns-of-the-fae-thorne", "the-gotham-reapers-bride", "a-bargain-in-shadows"],
          "Dark Romance With Clear Content Warnings"
        ),
      },
    ],
    "best-dark-romance-kindle-unlimited": [
      {
        afterH2Index: 2,
        html: buildPrimaryCTA("thorns-of-the-fae-thorne", "Free on Kindle Unlimited"),
      },
      {
        afterH2Index: 5,
        html: buildMultiBookCTA(
          ["thorns-of-the-fae-thorne", "the-gotham-reapers-bride", "a-bargain-in-shadows"],
          "All on Kindle Unlimited"
        ),
      },
    ],
    "best-stalker-romance-books": [
      {
        afterH2Index: 3,
        html: buildPrimaryCTA("thorns-of-the-fae-thorne", "Obsessive devotion at its darkest"),
      },
      {
        afterH2Index: 6,
        html: buildSecondaryCTA("the-gotham-reapers-bride", "A watcher in the shadows"),
      },
    ],
  };

  const strategy = ctaStrategies[slug];
  if (!strategy || strategy.length === 0) {
    // Default: add a primary CTA after the 2nd h2
    return injectAfterH2(content, [
      { afterH2Index: 2, html: buildPrimaryCTA("the-gotham-reapers-bride", "Ready for the full experience?") },
    ]);
  }

  return injectAfterH2(content, strategy);
}

// Inject HTML blocks after specific <h2> occurrences in content
function injectAfterH2(content: string, injections: Array<{ afterH2Index: number; html: string }>): string {
  // Find all <h2> positions
  const h2Positions: number[] = [];
  let searchPos = 0;
  while (true) {
    const pos = content.indexOf("<h2>", searchPos);
    if (pos === -1) break;
    h2Positions.push(pos);
    searchPos = pos + 4;
  }

  if (h2Positions.length === 0) return content;

  // Find the </h2> after each <h2>, then find the next </p> after that to inject after the paragraph
  const injectPoints: Array<{ position: number; html: string }> = [];

  for (const injection of injections) {
    const h2Idx = injection.afterH2Index - 1; // Convert to 0-based
    if (h2Idx >= 0 && h2Idx < h2Positions.length) {
      // Find the closing </h2>
      const h2Close = content.indexOf("</h2>", h2Positions[h2Idx]);
      if (h2Close !== -1) {
        // Find the end of the next paragraph after the h2
        const nextParaClose = content.indexOf("</p>", h2Close);
        if (nextParaClose !== -1) {
          injectPoints.push({
            position: nextParaClose + 4, // After </p>
            html: injection.html,
          });
        }
      }
    }
  }

  // Sort by position descending so we inject from the end (positions don't shift)
  injectPoints.sort((a, b) => b.position - a.position);

  let result = content;
  for (const point of injectPoints) {
    result = result.slice(0, point.position) + "\n" + point.html + "\n" + result.slice(point.position);
  }

  return result;
}

// ===== CTA HTML BUILDERS =====
// These generate HTML that gets injected into blog content directly
// This avoids React component rendering issues with dangerouslySetInnerHTML

function buildPrimaryCTA(bookSlug: string, context: string): string {
  const SLUG_MAP: Record<string, { title: string; cover: string; price: string; amazon: string; genre: string; ku: boolean; freeSlug?: string }> = {
    "thorns-of-the-fae-thorne": {
      title: "Thorns of the Fae Thorne",
      cover: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
      price: "$2.99",
      amazon: "https://www.amazon.com/dp/B0H1BTKZ4M",
      genre: "Dark Fae Romance",
      ku: true,
      freeSlug: undefined, // No free read yet
    },
    "the-gotham-reapers-bride": {
      title: "The Gotham Reaper\u2019s Bride",
      cover: "https://m.media-amazon.com/images/I/61+jamW5fJL._SL1499_.jpg",
      price: "$2.99",
      amazon: "https://www.amazon.com/dp/B0GZZN42ZH",
      genre: "Gothic Romance",
      ku: true,
      freeSlug: "the-gotham-reapers-bride",
    },
    "a-bargain-in-shadows": {
      title: "A Bargain in Shadows",
      cover: "https://m.media-amazon.com/images/I/610eFf4cJYL._SL1499_.jpg",
      price: "$5.99",
      amazon: "https://www.amazon.com/dp/B0GWZQ8QDM",
      genre: "Gothic Romance",
      ku: true,
      freeSlug: undefined,
    },
    "a-crown-of-ashes": {
      title: "A Crown of Ashes",
      cover: "https://m.media-amazon.com/images/I/71LQrdTVsgL._SL1499_.jpg",
      price: "$5.99",
      amazon: "https://www.amazon.com/dp/B0GY9H2W2R",
      genre: "Dark Fantasy Thriller",
      ku: true,
      freeSlug: undefined,
    },
  };

  const book = SLUG_MAP[bookSlug];
  if (!book) return "";

  return `
<div class="not-prose my-8 rounded-xl border border-[rgba(139,0,0,0.25)] overflow-hidden" style="background-color:rgba(139,0,0,0.06)">
  <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 md:p-6">
    <div class="flex-shrink-0 w-20 sm:w-24 self-center">
      <div class="aspect-[2/3] rounded-md overflow-hidden shadow-lg">
        <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="flex-grow flex flex-col justify-center text-center sm:text-left">
      <p class="text-[#C9A84C] text-xs uppercase tracking-wider mb-2 font-medium">${context}</p>
      <h4 class="font-serif text-lg md:text-xl text-foreground mb-1 leading-snug">${book.title}</h4>
      <div class="flex items-center gap-2 justify-center sm:justify-start mb-3">
        <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-[rgba(139,0,0,0.2)] text-[#dc143c] border border-[rgba(139,0,0,0.3)]">${book.genre}</span>
        ${book.ku ? '<span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[rgba(201,168,76,0.15)] text-[#C9A84C] border border-[rgba(201,168,76,0.3)]">KU</span>' : ''}
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        <a href="${book.amazon}" target="_blank" rel="noopener noreferrer" style="background-color:#DC143C;color:#ffffff" onmouseenter="this.style.backgroundColor='#8B0000';this.style.color='#ffffff'" onmouseleave="this.style.backgroundColor='#DC143C';this.style.color='#ffffff'" class="inline-flex items-center justify-center gap-1.5 px-6 h-10 text-sm font-semibold rounded-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,20,60,0.4)] hover:scale-105 no-underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
          Buy on Amazon — ${book.price}
        </a>
        ${book.freeSlug ? `<a href="/free-reads/${book.freeSlug}" class="inline-flex items-center justify-center gap-1.5 px-5 h-10 text-sm border border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] rounded-md transition-all duration-300 no-underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          Read Free
        </a>` : ''}
      </div>
    </div>
  </div>
</div>`;
}

function buildSecondaryCTA(bookSlug: string, context: string): string {
  const SLUG_MAP: Record<string, { title: string; cover: string; price: string; amazon: string; ku: boolean; freeSlug?: string }> = {
    "thorns-of-the-fae-thorne": {
      title: "Thorns of the Fae Thorne",
      cover: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
      price: "$2.99",
      amazon: "https://www.amazon.com/dp/B0H1BTKZ4M",
      ku: true,
    },
    "the-gotham-reapers-bride": {
      title: "The Gotham Reaper\u2019s Bride",
      cover: "https://m.media-amazon.com/images/I/61+jamW5fJL._SL1499_.jpg",
      price: "$2.99",
      amazon: "https://www.amazon.com/dp/B0GZZN42ZH",
      ku: true,
      freeSlug: "the-gotham-reapers-bride",
    },
    "a-bargain-in-shadows": {
      title: "A Bargain in Shadows",
      cover: "https://m.media-amazon.com/images/I/610eFf4cJYL._SL1499_.jpg",
      price: "$5.99",
      amazon: "https://www.amazon.com/dp/B0GWZQ8QDM",
      ku: true,
    },
    "a-crown-of-ashes": {
      title: "A Crown of Ashes",
      cover: "https://m.media-amazon.com/images/I/71LQrdTVsgL._SL1499_.jpg",
      price: "$5.99",
      amazon: "https://www.amazon.com/dp/B0GY9H2W2R",
      ku: true,
    },
  };

  const book = SLUG_MAP[bookSlug];
  if (!book) return "";

  return `
<div class="not-prose my-6 flex items-center gap-4 p-4 rounded-lg border border-[rgba(201,168,76,0.15)]" style="background-color:rgba(201,168,76,0.04)">
  <div class="flex-shrink-0 w-10">
    <div class="aspect-[2/3] rounded overflow-hidden shadow-md">
      <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover" />
    </div>
  </div>
  <div class="flex-grow min-w-0">
    <p class="text-foreground text-sm font-medium leading-snug">${context}</p>
    <p class="text-muted-foreground text-xs">${book.price} on Amazon${book.ku ? " \u00B7 Kindle Unlimited" : ""}</p>
  </div>
  <div class="flex-shrink-0 flex items-center gap-2">
    ${book.freeSlug ? `<a href="/free-reads/${book.freeSlug}" class="inline-flex items-center justify-center gap-1 px-2 h-8 text-xs text-[#C9A84C]/70 hover:text-[#C9A84C] rounded transition-colors no-underline">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      Free
    </a>` : ''}
    <a href="${book.amazon}" target="_blank" rel="noopener noreferrer" style="background-color:#DC143C;color:#ffffff" onmouseenter="this.style.backgroundColor='#8B0000';this.style.color='#ffffff'" onmouseleave="this.style.backgroundColor='#DC143C';this.style.color='#ffffff'" class="inline-flex items-center justify-center gap-1 px-4 h-8 text-xs font-semibold rounded transition-all duration-300 no-underline">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
      Buy
    </a>
  </div>
</div>`;
}

function buildMultiBookCTA(bookSlugs: string[], context: string): string {
  const SLUG_MAP: Record<string, { title: string; cover: string; price: string; amazon: string; genre: string; ku: boolean; freeSlug?: string }> = {
    "thorns-of-the-fae-thorne": {
      title: "Thorns of the Fae Thorne",
      cover: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
      price: "$2.99",
      amazon: "https://www.amazon.com/dp/B0H1BTKZ4M",
      genre: "Dark Fae Romance",
      ku: true,
    },
    "the-gotham-reapers-bride": {
      title: "The Gotham Reaper\u2019s Bride",
      cover: "https://m.media-amazon.com/images/I/61+jamW5fJL._SL1499_.jpg",
      price: "$2.99",
      amazon: "https://www.amazon.com/dp/B0GZZN42ZH",
      genre: "Gothic Romance",
      ku: true,
      freeSlug: "the-gotham-reapers-bride",
    },
    "a-bargain-in-shadows": {
      title: "A Bargain in Shadows",
      cover: "https://m.media-amazon.com/images/I/610eFf4cJYL._SL1499_.jpg",
      price: "$5.99",
      amazon: "https://www.amazon.com/dp/B0GWZQ8QDM",
      genre: "Gothic Romance",
      ku: true,
    },
    "a-crown-of-ashes": {
      title: "A Crown of Ashes",
      cover: "https://m.media-amazon.com/images/I/71LQrdTVsgL._SL1499_.jpg",
      price: "$5.99",
      amazon: "https://www.amazon.com/dp/B0GY9H2W2R",
      genre: "Dark Fantasy Thriller",
      ku: true,
    },
    "the-unholy-reverie": {
      title: "The Unholy Reverie",
      cover: "https://m.media-amazon.com/images/I/71tfd6o7v-L._SL1499_.jpg",
      price: "$5.99",
      amazon: "https://www.amazon.com/dp/B0GX7BLW1N",
      genre: "Supernatural Thriller",
      ku: true,
    },
  };

  const books = bookSlugs.map(s => SLUG_MAP[s]).filter(Boolean);
  if (books.length === 0) return "";

  const bookCards = books.map(book => `
    <div class="flex gap-3 p-3 rounded-lg bg-black/20 border border-[rgba(255,255,255,0.05)]">
      <div class="flex-shrink-0 w-14">
        <div class="aspect-[2/3] rounded overflow-hidden shadow-md">
          <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover" />
        </div>
      </div>
      <div class="flex-grow min-w-0 flex flex-col justify-center">
        <h5 class="font-serif text-sm text-foreground leading-snug line-clamp-2 mb-1">${book.title}</h5>
        <div class="flex items-center gap-1.5 mb-2">
          <span class="inline-block px-1.5 py-0 rounded-full text-[8px] font-medium uppercase tracking-wider bg-[rgba(139,0,0,0.15)] text-[#dc143c] border border-[rgba(139,0,0,0.2)]">${book.genre}</span>
          ${book.ku ? '<span class="inline-block px-1.5 py-0 rounded-full text-[8px] font-bold uppercase tracking-wider bg-[rgba(201,168,76,0.15)] text-[#C9A84C] border border-[rgba(201,168,76,0.2)]">KU</span>' : ''}
        </div>
        <div class="flex items-center gap-2">
          <a href="${book.amazon}" target="_blank" rel="noopener noreferrer" style="background-color:#DC143C;color:#ffffff" onmouseenter="this.style.backgroundColor='#8B0000';this.style.color='#ffffff'" onmouseleave="this.style.backgroundColor='#DC143C';this.style.color='#ffffff'" class="inline-flex items-center justify-center gap-1 px-3 h-7 text-[10px] font-semibold rounded transition-all duration-300 no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            ${book.price}
          </a>
          ${book.freeSlug ? `<a href="/free-reads/${book.freeSlug}" class="inline-flex items-center justify-center gap-0.5 px-2 h-7 text-[10px] text-[#C9A84C]/60 hover:text-[#C9A84C] rounded transition-colors no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Free
          </a>` : ''}
        </div>
      </div>
    </div>
  `).join("");

  return `
<div class="not-prose my-8 rounded-xl border border-[rgba(139,0,0,0.2)] overflow-hidden" style="background-color:rgba(139,0,0,0.04)">
  <div class="p-5 md:p-6">
    <p class="text-[#C9A84C] text-xs uppercase tracking-wider mb-4 font-medium text-center">${context}</p>
    <div class="grid gap-4 ${books.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : books.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}">
      ${bookCards}
    </div>
  </div>
</div>`;
}
