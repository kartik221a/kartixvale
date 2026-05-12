"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, X, BookOpen } from "lucide-react";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    title: string;
    subtitle?: string;
    coverUrl: string;
    genre: string;
    price?: string;
    amazonUrl?: string;
    hook?: string;
    description: string[];
    whatToExpect: string[];
    contentWarning?: string;
    series?: string;
    kindleUnlimited?: boolean;
  } | null;
}

export function BookModal({ isOpen, onClose, book }: BookModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/20 bg-surface shadow-2xl shadow-black/60"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white hover:bg-blood/60 hover:border-blood/40 transition-all duration-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Top: Cover + Quick Info */}
            <div className="flex flex-col sm:flex-row gap-5 p-6 pb-4">
              {/* Book Cover */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="relative w-36 sm:w-44 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-gold/10">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="176px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                <Badge className="bg-blood/20 text-blood-light border-blood/30 w-fit mb-2 text-xs tracking-wider uppercase mx-auto sm:mx-0">
                  {book.genre}
                </Badge>
                <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-tight mb-1">
                  {book.title}
                </h2>
                {book.subtitle && (
                  <p className="text-sm text-gold/70 italic mb-2">{book.subtitle}</p>
                )}
                {book.hook && (
                  <p className="text-blood-light font-serif italic text-base mb-3">
                    &ldquo;{book.hook}&rdquo;
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 mb-3 justify-center sm:justify-start">
                  {book.kindleUnlimited && (
                    <Badge className="bg-gold/15 text-gold border-gold/30 text-[10px] tracking-wider uppercase">
                      Kindle Unlimited
                    </Badge>
                  )}
                  {book.series && (
                    <Badge className="bg-muted/50 text-muted-foreground border-border text-[10px] tracking-wider uppercase">
                      {book.series}
                    </Badge>
                  )}
                </div>
                {book.price && book.amazonUrl && (
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="blood" className="font-semibold px-6 h-11 text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.4)] hover:scale-105 w-full sm:w-auto">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Now — {book.price}
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="px-6">
              <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            </div>

            {/* Description */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-gold/60" />
                <h3 className="text-sm uppercase tracking-[0.2em] text-gold/60 font-medium">
                  About This Book
                </h3>
              </div>
              <div className="space-y-3">
                {book.description.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`text-sm leading-relaxed ${
                      paragraph.length < 60
                        ? "text-blood-light font-serif italic text-base"
                        : "text-foreground/80"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* What to Expect */}
            {book.whatToExpect.length > 0 && (
              <div className="px-6 pt-4 pb-2">
                <h3 className="text-sm uppercase tracking-[0.2em] text-gold/60 font-medium mb-2">
                  What to Expect
                </h3>
                <ul className="space-y-1">
                  {book.whatToExpect.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-blood-light mt-0.5 text-xs">&#9670;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content Warning */}
            {book.contentWarning && (
              <div className="px-6 pt-4 pb-2">
                <h3 className="text-sm uppercase tracking-[0.2em] text-gold/60 font-medium mb-2">
                  Content Warning
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {book.contentWarning}
                </p>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="p-6 pt-4">
              <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-4" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground italic text-center sm:text-left">
                  Available on Amazon{book.kindleUnlimited ? " and Kindle Unlimited" : ""}
                </p>
                {book.amazonUrl && (
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="blood" className="font-semibold px-6 h-10 text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.4)] hover:scale-105">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get It on Amazon
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
