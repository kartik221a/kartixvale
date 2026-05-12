"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/blog-data";
import { ArrowLeft, BookOpen, Calendar, Clock } from "lucide-react";

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

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
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
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== READ NEXT CTA ===== */}
      <section className="py-16 md:py-20 bg-section-alt relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blood/5 rounded-full blur-3xl" />
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
              Read Next
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg mx-auto"
            >
              Step from words into worlds. Explore Kartix Vale&apos;s complete collection of dark romance novels.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/books">
                <Button className="bg-blood-light hover:bg-blood text-white font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105">
                  Browse the Collection
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
                >
                  More Articles
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
