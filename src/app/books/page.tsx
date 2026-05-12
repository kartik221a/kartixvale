"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/books/book-card";
import { BookModal } from "@/components/books/book-modal";
import { Navbar } from "@/components/layout/navbar";
import Particles from "@/components/reactbits/Particles";
import DecayCard from "@/components/reactbits/DecayCard";
import { booksData, beneathTheVeilSeries, standaloneNovels, type BookData } from "@/lib/books-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ListOrdered, ExternalLink } from "lucide-react";

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

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBookModal = (book: BookData) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/books-page-bg.png"
            alt="Dark library atmosphere"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        {/* Particle effect */}
        <div className="absolute inset-0 pointer-events-none">
          <Particles
            particleCount={60}
            particleSpread={8}
            speed={0.06}
            particleColors={["#8B0000", "#FFD700", "#4a0000"]}
            moveParticlesOnHover
            particleHoverFactor={0.3}
            alphaParticles
            particleBaseSize={50}
            sizeRandomness={1.5}
            cameraDistance={25}
            disableRotation={false}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-4 font-medium">
              Kartix Vale
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl sm:text-6xl md:text-7xl text-foreground text-glow-red mb-4"
            >
              The Collection
            </motion.h1>
            <motion.div variants={fadeInUp} className="divider-gold w-48 md:w-64 mx-auto my-6" />
            <motion.p
              variants={fadeInUp}
              className="font-serif text-xl md:text-2xl text-foreground/70 italic"
            >
              Every story. Every shadow. One click away.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== BENEATH THE VEIL SERIES ===== */}
      <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-midnight/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blood/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-6">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                The Series
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Beneath the Veil
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            {/* Reading Order Notice */}
            <motion.div
              variants={fadeInUp}
              className="card-dark rounded-xl p-5 md:p-6 mb-10 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-3">
                <ListOrdered className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-lg text-foreground">Reading Order</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                The Beneath the Veil series is best experienced in order. Each book builds on the last,
                deepening the mystery, the romance, and the darkness.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { num: "1", title: "A Bargain in Shadows" },
                  { num: "2", title: "The Unholy Reverie" },
                  { num: "3", title: "A Crown of Ashes" },
                  { num: "4", title: "Behind the Veil" },
                ].map((book, i) => (
                  <div key={book.num} className="flex items-center gap-2">
                    <Badge className="bg-blood/20 text-blood-light border-blood/30 text-xs">
                      {book.num}
                    </Badge>
                    <span className="text-xs md:text-sm text-foreground/70">{book.title}</span>
                    {i < 3 && <span className="text-gold/40 mx-1 hidden sm:inline">→</span>}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Series Books Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
            >
              {beneathTheVeilSeries.map((book) => (
                <motion.div key={book.title} variants={fadeInUp}>
                  <BookCard
                    title={book.title}
                    coverUrl={book.coverUrl}
                    genre={book.genre}
                    price={book.price}
                    amazonUrl={book.amazonUrl}
                    freeReadSlug={book.freeReadSlug}
                    onBookClick={() => openBookModal(book)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION DIVIDER ===== */}
      <div className="relative h-32 md:h-48 overflow-hidden">
        <Image
          src="/images/ornate-divider.png"
          alt="Dark atmospheric divider"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-section-alt" />
      </div>

      {/* ===== STANDALONE NOVELS ===== */}
      <section className="py-16 md:py-24 bg-section-alt relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blood/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                Complete Stories
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Standalone Novels
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
              <p className="text-muted-foreground text-sm mt-4 max-w-lg mx-auto">
                Each a world unto itself. Each a descent into darkness with no way out but through.
              </p>
            </motion.div>

            {/* DecayCard Grid for Standalone Novels */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
            >
              {standaloneNovels.map((book) => (
                <motion.div
                  key={book.title}
                  variants={fadeInUp}
                  className="flex flex-col items-center"
                >
                  {/* DecayCard - cover only, no overlay */}
                  <div
                    className="cursor-pointer group"
                    onClick={() => openBookModal(book)}
                  >
                    <DecayCard
                      width={220}
                      height={330}
                      image={book.coverUrl}
                      baseFrequency={0.015}
                      numOctaves={5}
                      seed={4}
                      maxDisplacement={300}
                      movementBound={30}
                    />
                  </div>
                  {/* Title + Buy below the card */}
                  <div className="mt-3 w-[220px] text-center">
                    <h3
                      className="font-serif text-sm text-foreground leading-tight line-clamp-2 mb-2 cursor-pointer hover:text-gold transition-colors duration-200"
                      onClick={() => openBookModal(book)}
                    >
                      {book.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {book.kindleUnlimited && (
                        <Badge className="bg-gold/15 text-gold border-gold/30 text-[9px] uppercase tracking-wider">
                          KU
                        </Badge>
                      )}
                      <Badge className="bg-blood/20 text-blood-light border-blood/30 text-[9px] uppercase tracking-wider">
                        {book.genre}
                      </Badge>
                    </div>
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="blood" className="w-full font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,20,60,0.3)] text-xs h-9">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Buy — {book.price}
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ALL BOOKS OVERVIEW ===== */}
      <section className="py-16 md:py-20 bg-gradient-dark">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                Complete Library
              </h2>
              <div className="divider-gold w-16 mx-auto" />
              <p className="text-muted-foreground text-sm mt-4">
                All {booksData.length} books in one view
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
            >
              {booksData.map((book) => (
                <motion.div key={book.title} variants={fadeInUp}>
                  <BookCard
                    title={book.title}
                    coverUrl={book.coverUrl}
                    genre={book.genre}
                    price={book.price}
                    amazonUrl={book.amazonUrl}
                    freeReadSlug={book.freeReadSlug}
                    onBookClick={() => openBookModal(book)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 bg-section-alt relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blood/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <BookOpen className="h-10 w-10 text-gold mx-auto mb-6" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl text-foreground mb-4"
            >
              Start Your Descent
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg mx-auto"
            >
              Begin with A Bargain in Shadows and fall into the Beneath the Veil series, or explore any standalone world.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.amazon.com/dp/B0GWZQ8QDM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="blood" className="font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.4)] hover:scale-105">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start the Series — $5.99
                </Button>
              </a>
              <Link href="/">
                <Button
                  variant="gold"
                  className="transition-all duration-300"
                >
                  Back to Home
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
              <Link href="/about" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                About
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Blog
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

      {/* ===== BOOK MODAL ===== */}
      <BookModal
        isOpen={isModalOpen}
        onClose={closeModal}
        book={selectedBook}
      />
    </main>
  );
}
