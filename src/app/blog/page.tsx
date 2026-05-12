"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import Particles from "@/components/reactbits/Particles";
import GlitchText from "@/components/reactbits/GlitchText";
import { Button } from "@/components/ui/button";
import { getPublishedPosts } from "@/lib/blog-data";
import { BookOpen, Clock, ArrowRight, Calendar } from "lucide-react";

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

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/books-page-bg.png"
            alt="Dark atmospheric library"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <Particles
            particleCount={50}
            particleSpread={8}
            speed={0.05}
            particleColors={["#8B0000", "#C9A84C", "#4a0000"]}
            moveParticlesOnHover
            particleHoverFactor={0.2}
            alphaParticles
            particleBaseSize={40}
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

            <motion.div variants={fadeInUp} className="w-full overflow-visible">
              <GlitchText
                speed={0.5}
                enableShadows
                enableOnHover
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase"
                style={{ letterSpacing: '0.15em', background: 'linear-gradient(135deg, #C9A84C 0%, #D4AF37 40%, #B8860B 60%, #C9A84C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 12px rgba(201, 168, 76, 0.3))' }}
              >
                The Dark Library
              </GlitchText>
            </motion.div>

            <motion.div variants={fadeInUp} className="divider-gold w-48 md:w-64 mx-auto my-6" />

            <motion.p
              variants={fadeInUp}
              className="font-serif text-xl md:text-2xl text-foreground/70 italic"
            >
              Stories, guides, and deep dives into the shadows of dark romance
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== BLOG POST GRID ===== */}
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
                From the Shadows
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Latest Articles
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {getPublishedPosts().map((post) => (
                <motion.div key={post.slug} variants={fadeInUp} className="flex">
                  <Link href={`/blog/${post.slug}`} className="block group w-full">
                    <article className="card-dark rounded-xl p-6 flex flex-col hover:border-blood/30 hover:shadow-[0_0_25px_rgba(139,0,0,0.15)] transition-all duration-300 group-hover:scale-[1.02] h-full">
                      {/* Category Badge */}
                      <div className="mb-4 min-h-[28px] flex items-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${post.categoryColor}`}>
                          {post.category}
                        </span>
                      </div>

                      {/* Title — fixed height for 2 lines */}
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                        {post.title}
                      </h3>

                      {/* Excerpt — fixed height for 3 lines */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3 min-h-[4.5rem]">
                        {post.excerpt}
                      </p>

                      {/* Meta: Date + Read Time */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground/70 pt-4 border-t border-border/50 min-h-[32px]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Read More Arrow */}
                      <div className="mt-3 flex items-center gap-2 text-blood-light text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-h-[20px]">
                        Read article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
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
              Start Reading
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg mx-auto"
            >
              Ready to step into the shadows? Explore Kartix Vale&apos;s complete collection of dark romance novels.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/books">
                <Button variant="blood" className="font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105">
                  Browse the Collection
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
