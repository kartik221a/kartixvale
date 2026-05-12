"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import Particles from "@/components/reactbits/Particles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { freeReadBooks } from "@/lib/free-reads-data";
import { BookOpen, ExternalLink, ArrowRight, Clock } from "lucide-react";

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

export default function FreeReadsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/books-page-bg.png"
            alt="Dark atmospheric reading room"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <Particles
            particleCount={40}
            particleSpread={8}
            speed={0.04}
            particleColors={["#8B0000", "#C9A84C", "#4a0000"]}
            moveParticlesOnHover
            particleHoverFactor={0.2}
            alphaParticles
            particleBaseSize={35}
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
            <motion.p variants={fadeInUp} className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-medium">
              Kartix Vale
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
            >
              Read Free Chapters
            </motion.h1>
            <motion.div variants={fadeInUp} className="divider-gold w-48 md:w-64 mx-auto my-6" />
            <motion.p
              variants={fadeInUp}
              className="font-serif text-lg md:text-xl text-foreground/70 italic max-w-2xl mx-auto"
            >
              The first chapters of every book — free. Read them here. When you need to know what happens next, the full story waits on Amazon.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== BOOKS GRID ===== */}
      <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
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
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                Start Reading
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Choose Your Descent
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            {/* Available Now */}
            {freeReadBooks.filter(b => !b.comingSoon).length > 0 && (
              <motion.div variants={fadeInUp} className="text-center mb-8">
                <p className="text-blood-light text-xs uppercase tracking-wider mb-1">Available Now</p>
              </motion.div>
            )}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {freeReadBooks.filter(b => !b.comingSoon).map((book) => (
                <motion.div key={book.slug} variants={fadeInUp} className="flex">
                  <Link href={`/free-reads/${book.slug}`} className="block group w-full">
                    <article className="card-dark rounded-xl overflow-hidden flex flex-col h-full hover:border-blood/30 hover:shadow-[0_0_25px_rgba(139,0,0,0.15)] transition-all duration-300 group-hover:scale-[1.02]">
                      {/* Cover Image */}
                      <div className="relative w-full aspect-[2/3] max-h-[280px] overflow-hidden">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        {/* Chapter count badge */}
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-blood/80 text-white border-blood/50 text-xs uppercase tracking-wider">
                            {book.chapters.length} Free {book.chapters.length === 1 ? "Chapter" : "Chapters"}
                          </Badge>
                        </div>
                        {/* KU badge */}
                        {book.kindleUnlimited && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gold/80 text-black border-gold/50 text-[9px] uppercase tracking-wider font-bold">
                              KU
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        <span className="text-blood-light text-xs uppercase tracking-wider mb-2">
                          {book.genre}
                        </span>
                        <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-snug">
                          {book.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3 italic">
                          &ldquo;{book.hook}&rdquo;
                        </p>
                        <div className="flex items-center gap-2 text-blood-light text-sm font-medium group-hover:gap-3 transition-all duration-300">
                          <BookOpen className="h-4 w-4" />
                          Read Free Chapters
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Coming Soon */}
            {freeReadBooks.filter(b => b.comingSoon).length > 0 && (
              <>
                <motion.div variants={fadeInUp} className="text-center mb-8">
                  <p className="text-gold/60 text-xs uppercase tracking-wider mb-1">Coming Soon</p>
                </motion.div>
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {freeReadBooks.filter(b => b.comingSoon).map((book) => (
                    <motion.div key={book.slug} variants={fadeInUp} className="flex">
                      <article className="card-dark rounded-xl overflow-hidden flex flex-col h-full opacity-60 hover:opacity-80 transition-all duration-300">
                        {/* Cover Image */}
                        <div className="relative w-full aspect-[2/3] max-h-[280px] overflow-hidden">
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-full object-cover grayscale-[30%]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          {/* Coming Soon badge */}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-gold/60 text-black border-gold/40 text-xs uppercase tracking-wider">
                              <Clock className="h-3 w-3 mr-1" />
                              Coming Soon
                            </Badge>
                          </div>
                          {book.kindleUnlimited && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-gold/80 text-black border-gold/50 text-[9px] uppercase tracking-wider font-bold">
                                KU
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                          <span className="text-blood-light/60 text-xs uppercase tracking-wider mb-2">
                            {book.genre}
                          </span>
                          <h3 className="font-serif text-lg text-foreground/80 mb-2 line-clamp-2 leading-snug">
                            {book.title}
                          </h3>
                          <p className="text-muted-foreground/60 text-sm leading-relaxed mb-4 flex-grow line-clamp-3 italic">
                            &ldquo;{book.hook}&rdquo;
                          </p>
                          <div className="flex items-center gap-2 text-gold/50 text-sm font-medium">
                            <Clock className="h-4 w-4" />
                            Free chapters coming soon
                          </div>
                        </div>
                      </article>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 md:py-20 bg-section-alt relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gold/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
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
              All Books on Amazon
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg mx-auto"
            >
              Every book enrolled in Kindle Unlimited. Read free with your subscription, or purchase to own forever.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.amazon.com/stores/Kartix-Vale/author/B0GV2M2Q3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="blood" className="font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Browse on Amazon
                </Button>
              </a>
              <Link href="/books">
                <Button
                  variant="gold"
                  className="transition-all duration-300"
                >
                  View Book Details
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
