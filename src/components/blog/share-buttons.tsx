"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Facebook, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  variant?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Article share buttons.
 * Supports Twitter/X, Facebook, and copy-link.
 * Uses native window.open for social shares (no external scripts).
 */
export function ShareButtons({
  url,
  title,
  description = "",
  variant = "horizontal",
  className = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  // Build full URL on client (avoids SSR mismatch)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const absolute = url.startsWith("http")
        ? url
        : `${window.location.origin}${url}`;
      setFullUrl(absolute);
    }
  }, [url]);

  const handleTwitter = () => {
    const text = encodeURIComponent(title);
    const urlParam = encodeURIComponent(fullUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${urlParam}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
  };

  const handleFacebook = () => {
    const urlParam = encodeURIComponent(fullUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${urlParam}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Give up silently
      }
      document.body.removeChild(textArea);
    }
  };

  const buttonClass =
    "w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 focus-ring";

  const containerClass =
    variant === "horizontal"
      ? `flex items-center gap-2 ${className}`
      : `flex flex-col gap-2 ${className}`;

  return (
    <div className={containerClass}>
      {/* Label */}
      <span className="font-display text-[10px] tracking-[0.3em] uppercase text-gold/60 mr-1 hidden sm:inline">
        Share
      </span>

      {/* Twitter / X */}
      <button
        onClick={handleTwitter}
        className={`${buttonClass} border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40`}
        aria-label="Share on Twitter / X"
        title="Share on X"
      >
        <Twitter className="h-3.5 w-3.5" />
      </button>

      {/* Facebook */}
      <button
        onClick={handleFacebook}
        className={`${buttonClass} border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40`}
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook className="h-3.5 w-3.5" />
      </button>

      {/* Copy link */}
      <button
        onClick={handleCopyLink}
        className={`${buttonClass} relative ${
          copied
            ? "border-gold/60 text-gold bg-gold/10"
            : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40"
        }`}
        aria-label="Copy link"
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: -22 }}
              exit={{ opacity: 0, scale: 0.5, y: -22 }}
              transition={{ duration: 0.25 }}
              className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-sm bg-gold text-ink text-[9px] font-display tracking-[0.15em] uppercase whitespace-nowrap pointer-events-none shadow-lg"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
