"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookOpen, ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative flex-1 flex items-center justify-center py-20 md:py-32 overflow-hidden bg-gradient-ink">
        {/* Atmospheric background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(160,24,24,0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 70% 80%, rgba(184,146,74,0.10) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(12,9,7,0.6) 100%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 404 — large display */}
          <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-6">
            Error · 404
          </p>

          <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl text-foreground leading-none mb-6 text-glow-soft">
            4<span className="italic text-gold">0</span>4
          </h1>

          <div className="divider-ornament w-64 mx-auto my-8" />

          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-tight">
            This page has fallen through the Veil.
          </h2>

          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            The page you were looking for doesn&apos;t exist — or has been moved
            somewhere darker. Return to the catalogue, or search for what you
            were looking for.
          </p>

          {/* CTAs — plain links styled as buttons (avoid Button component which uses event handlers) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm tracking-wider uppercase font-semibold rounded-md transition-all duration-300 hover:shadow-[0_0_24px_rgba(160,24,24,0.4)] focus-ring"
              style={{ backgroundColor: "#5c0a0a", color: "#f6efe4" }}
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm tracking-wider uppercase font-semibold rounded-md border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 focus-ring"
            >
              <BookOpen className="h-4 w-4" />
              Browse Books
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Hint to search */}
          <p className="mt-10 text-xs text-muted-foreground">
            <Search className="inline h-3 w-3 mr-1.5 text-gold/60" />
            Tip: press{" "}
            <kbd className="inline-flex items-center px-1.5 py-0.5 rounded-sm border border-border bg-muted/50 text-[10px] font-display tracking-[0.15em] uppercase text-muted-foreground">
              Ctrl + K
            </kbd>{" "}
            anywhere to search
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
