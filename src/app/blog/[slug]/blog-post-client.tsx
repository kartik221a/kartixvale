"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { blogPosts, BlogPost } from "@/lib/blog-data";
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

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  // Get related posts (excluding current, max 3)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

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
                <Button className="bg-blood-light hover:bg-blood text-white font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105">
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
