"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BookCard } from "@/components/book-card";
import { EmailCapture } from "@/components/email-capture";
import { FaqSection } from "@/components/faq-section";
import { BookModal } from "@/components/book-modal";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ChevronDown, BookOpen, Eye, Heart } from "lucide-react";
import { booksData, type BookData } from "@/lib/books-data";

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

// ─── Book Data imported from shared file ───

export default function HomePage() {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBookModal = (book: BookData) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300); // wait for animation
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Dark romantic atmosphere"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        {/* Atmospheric orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blood/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-midnight/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="mb-6">
              <h2 className="logo-text text-3xl md:text-4xl uppercase">
                Kartix
              </h2>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto mt-2" />
            </motion.div>

            <motion.p variants={fadeInUp} className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-medium">
              Dark Romance Author
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4 text-glow-red leading-[0.9]"
            >
              Kartix Vale
            </motion.h1>

            <motion.div variants={fadeInUp} className="divider-gold w-48 md:w-64 mx-auto my-6" />

            <motion.p
              variants={fadeInUp}
              className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground/80 italic mb-8"
            >
              &ldquo;Love was never meant to be safe&rdquo;
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a href="#featured-book">
                <Button
                  size="lg"
                  className="bg-blood-light hover:bg-blood text-white font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105"
                  data-track="explore-darkness"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore the Darkness
                </Button>
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-md mx-auto">
              <p className="text-muted-foreground text-sm mb-3">
                Get a free chapter from the latest release
              </p>
              <EmailCapture source="hero" variant="hero" />
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <a href="#featured-book" className="text-muted-foreground/50 hover:text-blood-light transition-colors">
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED BOOK SECTION ===== */}
      <section id="featured-book" className="py-16 md:py-24 bg-gradient-dark relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                Featured Release
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Enter the Fae Court
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <BookCard
                title={booksData[0].title}
                coverUrl={booksData[0].coverUrl}
                genre={booksData[0].genre}
                price={booksData[0].price}
                amazonUrl={booksData[0].amazonUrl}
                featured
                description={booksData[0].description[0] + " " + booksData[0].description[1]}
                onBookClick={() => openBookModal(booksData[0])}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION DIVIDER IMAGE ===== */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src="/section-divider.png"
          alt="Dark forest path"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      {/* ===== MORE BOOKS SECTION ===== */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                The Collection
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                More From the Darkness
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
            >
              {booksData.map((book, i) => (
                <motion.div key={book.title} variants={fadeInUp}>
                  <BookCard
                    title={book.title}
                    coverUrl={book.coverUrl}
                    genre={book.genre}
                    price={book.price}
                    amazonUrl={book.amazonUrl}
                    onBookClick={() => openBookModal(book)}
                  />
                </motion.div>
              ))}
              {/* Coming Soon placeholder */}
              <motion.div variants={fadeInUp}>
                <BookCard
                  title="Title to be revealed"
                  coverUrl="/coming-soon-cover.svg"
                  genre="Coming Soon"
                  comingSoon
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT THE AUTHOR SECTION ===== */}
      <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-midnight/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blood/5 rounded-full blur-3xl" />
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
                The Mind Behind the Words
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                The Author
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Mysterious emblem with text logo */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-midnight via-blood/20 to-midnight flex items-center justify-center border border-gold/20 relative overflow-hidden shadow-[0_0_40px_rgba(139,0,0,0.2)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="relative logo-text text-3xl md:text-4xl uppercase">
                    Kartix
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="text-center md:text-left">
                <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-4">
                  Kartix Vale writes dark romance that lives in the space between love and obsession,
                  safety and ruin. Drawing from the shadows of fae courts, gothic manors, and the
                  monsters we love, every story asks the same question:{" "}
                  <span className="text-blood-light italic font-serif">
                    What would you sacrifice for love?
                  </span>
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  Based nowhere in particular. Writing from the dark.
                </p>
                <a href="#email-capture">
                  <Button
                    variant="outline"
                    className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
                    data-track="subscribe-about"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Subscribe for Updates
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== GENRE HIGHLIGHT SECTION ===== */}
      <section className="py-16 md:py-20 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
                Worlds of Dark Romance
              </h2>
              <div className="divider-gold w-24 mx-auto" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {[
                { title: "Dark Fae", desc: "Courts of shadow and thorn", icon: "\uD83E\uDEB7" },
                { title: "Paranormal", desc: "Beyond the veil of reality", icon: "\uD83D\uDC41\uFE0F" },
                { title: "Gothic", desc: "Manors, moors, and madness", icon: "\uD83C\uDFF0" },
                { title: "Fantasy", desc: "Magic-woven obsessions", icon: "\u2694\uFE0F" },
                { title: "Mystery", desc: "Love hides in the dark", icon: "\uD83D\uDD11" },
                { title: "Demons & Fae", desc: "Where monsters love deepest", icon: "\uD83D\uDD25" },
              ].map((genre) => (
                <motion.div
                  key={genre.title}
                  variants={fadeInUp}
                  className="card-dark rounded-xl p-5 text-center group hover:border-blood/30 hover:shadow-[0_0_20px_rgba(139,0,0,0.15)] transition-all duration-300"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {genre.icon}
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-1">
                    {genre.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{genre.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== EMAIL CAPTURE SECTION WITH BACKGROUND ===== */}
      <section id="email-capture" className="relative py-16 md:py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/newsletter-bg.png"
            alt="Dark letter and candle"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0a0a0a]" />
        </div>

        <div className="max-w-xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <EmailCapture source="email-section" variant="card" />
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <FaqSection />

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 md:py-24 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blood/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Heart className="h-10 w-10 text-blood-light mx-auto mb-6" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
            >
              Ready to Fall Into the Dark?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto"
            >
              Your next obsession is one click away. Start reading Thorns of the Fae Thorne today for just $2.99.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a
                href="https://www.amazon.com/dp/B0H1BTKZ4M"
                target="_blank"
                rel="noopener noreferrer"
                data-track="buy-amazon-cta"
              >
                <Button className="bg-blood-light hover:bg-blood text-white font-semibold px-10 h-14 text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,20,60,0.5)] hover:scale-105">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Read Now — $2.99 on Amazon
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#050505] border-t border-border py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            {/* Logo in footer */}
            <div className="mb-4">
              <span className="logo-text text-xl uppercase">
                Kartix
              </span>
            </div>
            <p className="font-serif text-lg text-foreground/60 italic mb-4">
              &ldquo;Love was never meant to be safe&rdquo;
            </p>
            <div className="divider-gold w-16 mx-auto mb-6" />
            <nav className="flex justify-center gap-6 mb-6" aria-label="Footer navigation">
              <a href="/" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Home
              </a>
              <a href="#featured-book" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Books
              </a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                FAQ
              </a>
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

      {/* ===== BOOK MODAL ===== */}
      <BookModal
        isOpen={isModalOpen}
        onClose={closeModal}
        book={selectedBook}
      />
    </main>
  );
}
