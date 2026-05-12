"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, BookOpen } from "lucide-react";

interface BookCardProps {
  title: string;
  coverUrl: string;
  genre: string;
  price?: string;
  amazonUrl?: string;
  comingSoon?: boolean;
  featured?: boolean;
  description?: string;
  freeReadSlug?: string;
  onBookClick?: () => void;
}

export function BookCard({
  title,
  coverUrl,
  genre,
  price,
  amazonUrl,
  comingSoon = false,
  featured = false,
  description,
  freeReadSlug,
  onBookClick,
}: BookCardProps) {
  if (featured) {
    return (
      <article className="card-dark rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8">
          {/* Book Cover - clickable */}
          <div
            className="flex-shrink-0 flex justify-center cursor-pointer"
            onClick={onBookClick}
          >
            <div className="relative w-48 md:w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl shadow-black/50 group">
              <Image
                src={coverUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 192px, 256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Book Details */}
          <div className="flex-1 flex flex-col justify-center">
            <Badge className="bg-blood/20 text-blood-light border-blood/30 w-fit mb-3 text-xs tracking-wider uppercase">
              {genre}
            </Badge>
            <h3
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 leading-tight cursor-pointer hover:text-gold transition-colors duration-200"
              onClick={onBookClick}
            >
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 line-clamp-4">
                {description}
              </p>
            )}
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 text-gold-dim/40"
                />
              ))}
              <span className="text-xs text-muted-foreground ml-2">
                Be the first to review
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {comingSoon ? (
                <Button
                  disabled
                  className="bg-muted text-muted-foreground cursor-not-allowed"
                >
                  Coming Soon
                </Button>
              ) : (
                <a
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="buy-amazon-featured"
                >
                  <Button variant="blood" className="font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.4)] hover:scale-105">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read Now — {price}
                  </Button>
                </a>
              )}
              {freeReadSlug && (
                <Link href={`/free-reads/${freeReadSlug}`}>
                  <Button
                    variant="gold"
                    className="transition-all duration-300 h-12"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Free Chapters
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard card - vertical grid card
  return (
    <article className="card-dark rounded-xl overflow-hidden group transition-all duration-300 hover:border-blood/30 hover:shadow-[0_0_30px_rgba(139,0,0,0.15)]">
      {/* Book Cover - clickable */}
      <div
        className="relative aspect-[2/3] overflow-hidden cursor-pointer"
        onClick={comingSoon ? undefined : onBookClick}
      >
        <Image
          src={coverUrl}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${comingSoon ? "grayscale opacity-60" : ""}`}
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
        {comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="font-serif text-lg md:text-xl text-gold tracking-wider uppercase">
              Coming Soon
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className="absolute top-2 left-2 bg-blood/80 text-white border-none text-[10px] md:text-xs tracking-wider uppercase">
          {genre}
        </Badge>
        {/* Hover hint - only for non-coming-soon */}
        {!comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
            <span className="text-white/80 text-xs font-medium tracking-wider uppercase bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
              View Details
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-2.5 md:p-4">
        <h3
          className={`font-serif text-xs md:text-base text-foreground mb-2 leading-tight line-clamp-2 ${!comingSoon ? "cursor-pointer hover:text-gold transition-colors duration-200" : ""}`}
          onClick={comingSoon ? undefined : onBookClick}
        >
          {title}
        </h3>
        {comingSoon ? (
          <Button
            disabled
            className="w-full bg-muted text-muted-foreground cursor-not-allowed text-xs md:text-sm"
          >
            Coming Soon
          </Button>
        ) : (
          <div className="flex flex-col gap-1.5">
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`buy-amazon-${title.slice(0, 20)}`}
              className="block"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="blood" className="w-full font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,20,60,0.3)] text-xs md:text-sm">
                <ExternalLink className="h-3 w-3 mr-1" />
                Buy — {price}
              </Button>
            </a>
            {freeReadSlug && (
              <Link
                href={`/free-reads/${freeReadSlug}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  className="w-full text-gold/70 hover:text-gold hover:bg-gold/10 text-[10px] md:text-xs h-7 md:h-8"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Read Free
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
