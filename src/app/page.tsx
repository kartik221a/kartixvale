"use client";


import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/books/book-card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Feather,
  Flame,
  Ghost,
  Moon,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import {
  booksData,
  featuredBooks,
  bookSeries,
} from "@/lib/books-data";

// ============================================================
// Motion variants — restrained, editorial
// ============================================================
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

// ============================================================
// Worlds / genres to highlight
// ============================================================
const worlds = [
  {
    title: "Dark Romance",
    description:
      "Love under pressure. Morally grey characters, obsession, and the cost of wanting someone you shouldn't.",
    icon: Flame,
    href: "/books",
  },
  {
    title: "Gothic Romance",
    description:
      "Atmospheric manors, marriage of convenience, and secrets older than the houses that hold them.",
    icon: Ghost,
    href: "/books",
  },
  {
    title: "Paranormal Romance",
    description:
      "Fated mates, wolf shifters, and the ancient bonds that choose their vessels without permission.",
    icon: Moon,
    href: "/books",
  },
  {
    title: "Dark Fantasy",
    description:
      "Curses, gods, drowned memories, and the price of forbidden magic in worlds built on ruins.",
    icon: Sparkles,
    href: "/books",
  },
];

// ============================================================
// Page
// ============================================================
export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Navbar />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Atmospheric background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-atmosphere.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Color grading overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,9,7,0.55) 0%, rgba(12,9,7,0.45) 35%, rgba(12,9,7,0.70) 75%, rgba(12,9,7,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(92,10,10,0.35) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 80% 70%, rgba(184,146,74,0.18) 0%, transparent 55%)",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(12,9,7,0.55) 100%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="font-display text-[11px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-6"
            >
              Dark Romance · Gothic · Paranormal
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1] text-foreground text-glow-soft"
            >
              Love was never
              <br />
              <span className="italic text-gold">meant</span> to be safe.
            </motion.h1>

            {/* Divider */}
            <motion.div
              variants={fadeUp}
              className="divider-ornament w-64 mx-auto my-8"
            />

            {/* Subhead */}
            <motion.p
              variants={fadeUp}
              className="font-body text-lg sm:text-xl md:text-2xl text-foreground/85 max-w-2xl mx-auto leading-relaxed"
            >
              The novels of Kartix Vale — atmospheric, morally grey, and unflinching
              about the rooms most romances only glance into on the way somewhere safer.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
            >
              <Link href="/books" className="block w-full sm:w-auto">
                <Button
                  variant="oxblood"
                  className="w-full sm:w-auto h-12 px-8 text-sm tracking-wider uppercase font-semibold"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explore the Books
                </Button>
              </Link>
              <Link href="/blog/what-is-dark-romance" className="block w-full sm:w-auto">
                <Button
                  variant="gold"
                  className="w-full sm:w-auto h-12 px-8 text-sm tracking-wider uppercase font-semibold"
                >
                  Read the Journal
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <span className="font-display text-[10px] tracking-[0.3em] uppercase">
              Begin
            </span>
            <ChevronDown className="h-3 w-3" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================
          FEATURED BOOKS — editorial composition
          ============================================================ */}
      <section className="relative py-20 md:py-32 bg-gradient-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {/* Section header */}
            <motion.div variants={fadeUp} className="text-center mb-14 md:mb-20">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                The Collection
              </p>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
                Featured Works
              </h2>
              <div className="divider-gold w-24 mx-auto" />
              <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
                A curated entry into the catalogue. Series openers, standalones, and
                recent releases — each a doorway into a different shade of dark.
              </p>
            </motion.div>

            {/* Featured grid — 6 books */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8"
            >
              {featuredBooks.map((book) => (
                <motion.div key={book.title} variants={fadeUp}>
                  <BookCard book={book} compact />
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="text-center mt-14">
              <Link href="/books">
                <Button variant="gold" className="h-12 px-8 text-sm tracking-wider uppercase font-semibold">
                  View All {booksData.length} Books
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          EXPLORE THE WORLDS — genres
          ============================================================ */}
      <section className="relative py-20 md:py-28 bg-section-alt overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(160,24,24,0.06) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(184,146,74,0.05) 0%, transparent 35%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                The Atmospheres
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4 leading-tight">
                Explore the Worlds
              </h2>
              <div className="divider-gold w-24 mx-auto" />
              <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
                Every Kartix Vale novel belongs to one of these atmospheres —
                each one a different way to fall into the dark.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {worlds.map((world) => {
                const Icon = world.icon;
                return (
                  <motion.div key={world.title} variants={fadeUp}>
                    <Link
                      href={world.href}
                      className="group block h-full card-dark rounded-md p-6 md:p-8 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_40px_-12px_rgba(184,146,74,0.2)] focus-ring"
                    >
                      <Icon className="h-7 w-7 text-gold mb-4 transition-transform duration-500 group-hover:scale-110" />
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 leading-tight">
                        {world.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {world.description}
                      </p>
                      <div className="mt-5 flex items-center text-[11px] font-display tracking-[0.2em] uppercase text-gold/70 group-hover:text-gold transition-colors">
                        Discover
                        <ArrowRight className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SERIES SPOTLIGHT — Beneath the Veil feature
          ============================================================ */}
      {bookSeries[0] && (
        <section className="relative py-20 md:py-32 bg-gradient-dark overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Series covers */}
              <motion.div variants={fadeUp} className="lg:col-span-7">
                <div className="grid grid-cols-4 gap-3 md:gap-5">
                  {bookSeries[0].books.map((book, i) => (
                    <Link
                      key={book.title}
                      href={book.amazonUrl || "/books"}
                      target={book.amazonUrl ? "_blank" : undefined}
                      rel={book.amazonUrl ? "noopener noreferrer" : undefined}
                      className="group block relative aspect-[2/3] rounded-sm overflow-hidden cover-shadow cover-shadow-hover focus-ring"
                    >
                      <Image
                        src={book.coverUrl}
                        alt={`Cover of ${book.title}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 25vw, 14vw"
                      />
                      <div className="absolute top-2 left-2 font-display text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 bg-ink/80 text-gold border border-gold/30 rounded-sm">
                        {i + 1}
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Series description */}
              <motion.div variants={fadeUp} className="lg:col-span-5">
                <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                  The Series · Complete
                </p>
                <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5 leading-tight">
                  Beneath the Veil
                </h2>
                <div className="divider-gold w-16 mb-6" />
                <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed mb-4">
                  {bookSeries[0].description}
                </p>

                {/* Reading order */}
                <div className="mt-6 mb-7">
                  <p className="font-display text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-3">
                    Reading Order
                  </p>
                  <ol className="space-y-1.5">
                    {bookSeries[0].books.map((book, i) => (
                      <li
                        key={book.title}
                        className="flex items-baseline gap-3 text-sm text-foreground/80"
                      >
                        <span className="font-display text-gold text-xs w-4">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{book.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <Link href="/books#beneath-the-veil">
                  <Button variant="oxblood" className="h-12 px-8 text-sm tracking-wider uppercase font-semibold">
                    View Series
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ============================================================
          EDITORIAL — latest articles
          ============================================================ */}
      <section className="relative py-20 md:py-32 bg-section-alt overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                The Journal
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4 leading-tight">
                From the Dark Library
              </h2>
              <div className="divider-gold w-24 mx-auto" />
              <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
                Longform essays on dark romance — the genre, the tropes, and the
                books that define it.
              </p>
            </motion.div>

            {/* Featured article 1 — primary */}
            <motion.article variants={fadeUp} className="mb-6">
              <Link
                href="/blog/what-is-dark-romance"
                className="group block grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 card-dark rounded-md p-6 md:p-10 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_60px_-20px_rgba(184,146,74,0.25)] focus-ring"
              >
                {/* Article meta / index */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-display text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 bg-blood/15 text-blood-light dark:text-gold border border-gold/30 rounded-sm">
                        Genre Guide
                      </span>
                      <span className="font-body text-sm text-muted-foreground italic">
                        12 min read
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight mb-4 group-hover:text-gold transition-colors duration-300">
                      What Is Dark Romance?
                    </h3>
                    <p className="font-body italic text-base text-blood-light dark:text-gold/90 mb-5">
                      A reader's guide to the genre, its tropes, and its dark allure.
                    </p>
                  </div>
                  <div className="flex items-center text-[11px] font-display tracking-[0.3em] uppercase text-gold">
                    Read Article
                    <ArrowRight className="h-3 w-3 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="lg:col-span-8 lg:border-l lg:border-border/40 lg:pl-12">
                  <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed mb-4">
                    <span className="font-serif text-2xl md:text-3xl text-gold float-left mr-2 leading-none mt-1">
                      R
                    </span>
                    omance, as a genre, has always been more interested in desire than in
                    polite conversation. It leans toward the unstable, the unspoken, the
                    things people do in private that they would not describe at dinner.
                  </p>
                  <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed mb-4">
                    Dark romance is what happens when a writer stops apologizing for that
                    interest — when the story turns its full attention to the rooms most
                    romances only glance into on their way somewhere safer.
                  </p>
                  <p className="font-body text-base text-muted-foreground italic">
                    The mechanics matter too, and we will get to them. But the genre is
                    easier to recognize than to fence in...
                  </p>
                </div>
              </Link>
            </motion.article>

            {/* Featured article 2 — secondary */}
            <motion.article variants={fadeUp}>
              <Link
                href="/blog/enemies-to-lovers-dark-romance"
                className="group block grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 card-dark rounded-md p-6 md:p-10 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_60px_-20px_rgba(184,146,74,0.25)] focus-ring"
              >
                <div className="lg:col-span-8 lg:order-1 order-2 lg:border-r lg:border-border/40 lg:pr-12">
                  <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed mb-4">
                    <span className="font-serif text-2xl md:text-3xl text-gold float-left mr-2 leading-none mt-1">
                      E
                    </span>
                    nemies to lovers is the crown jewel of dark romance. Two people who
                    should hate each other — who do hate each other — slowly (or
                    devastatingly quickly) discovering that the line between hatred and
                    desire is thinner than anyone admits.
                  </p>
                  <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed mb-4">
                    The reason it works so well in dark romance is that the stakes are
                    real. These aren't mild disagreements over coffee orders. These are
                    people on opposite sides of a war, a conspiracy, a curse. The love
                    that grows between them isn't convenient — it's a transgression.
                  </p>
                  <p className="font-body text-base text-muted-foreground italic">
                    And that's what makes it irresistible...
                  </p>
                </div>

                <div className="lg:col-span-4 lg:order-2 order-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-display text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 bg-gold/15 text-gold border border-gold/30 rounded-sm">
                        Trope Breakdown
                      </span>
                      <span className="font-body text-sm text-muted-foreground italic">
                        15 min read
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight mb-4 group-hover:text-gold transition-colors duration-300">
                      Enemies to Lvers in Dark Romance
                    </h3>
                    <p className="font-body italic text-base text-blood-light dark:text-gold/90 mb-5">
                      Why the trope works at its darkest.
                    </p>
                  </div>
                  <div className="flex items-center text-[11px] font-display tracking-[0.3em] uppercase text-gold">
                    Read Article
                    <ArrowRight className="h-3 w-3 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>

            {/* View all articles CTA */}
            <motion.div variants={fadeUp} className="mt-10 text-center">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="h-11 px-7 text-xs tracking-[0.2em] uppercase font-semibold border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50"
                >
                  View All Articles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          ABOUT THE AUTHOR — concise, understated
          ============================================================ */}
      <section className="relative py-20 md:py-28 bg-gradient-dark overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <Feather className="h-8 w-8 text-gold mx-auto" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3"
            >
              The Author
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl md:text-5xl text-foreground mb-5 leading-tight"
            >
              Kartix Vale
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto mb-8" />
            <motion.p
              variants={fadeUp}
              className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed mb-4"
            >
              Kartix Vale writes emotionally intense novels filled with dangerous
              chemistry, morally grey characters, slow-burning desire, and cinematic
              worlds that linger long after the last page.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8"
            >
              The catalogue moves between dark romance, gothic fiction, paranormal
              romance, and dark fantasy — bound together by an insistence on writing
              love under pressure, and on earning its endings rather than assuming them.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/about">
                <Button variant="gold" className="h-11 px-7 text-sm tracking-wider uppercase font-semibold">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <a
                href="https://www.amazon.com/author/kartixvale"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-11 px-7 text-sm tracking-wider uppercase font-semibold border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50"
                >
                  Amazon Author Page
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          NEWSLETTER (existing integration preserved)
          ============================================================ */}

      <Footer />

      {/* ============================================================
          BOOK MODAL
          ============================================================ */}
    </main>
  );
}
