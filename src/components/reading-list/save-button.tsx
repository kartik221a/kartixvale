"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck, Check } from "lucide-react";
import { useReadingList } from "@/hooks/use-reading-list";
import { cn } from "@/lib/utils";

interface SaveButtonProps {
  kind: "book" | "article";
  slug: string;
  title: string;
  href: string;
  variant?: "default" | "compact";
  className?: string;
}

/**
 * Save-to-reading-list button.
 * Shows bookmark icon, toggles saved state, shows confirmation toast.
 */
export function SaveButton({
  kind,
  slug,
  title,
  href,
  variant = "default",
  className,
}: SaveButtonProps) {
  const { isSaved, toggleItem, mounted } = useReadingList();
  const [justAdded, setJustAdded] = useState(false);

  // Wait for mount to avoid hydration mismatch (localStorage not avail on server)
  if (!mounted) {
    return variant === "compact" ? (
      <div
        className={cn(
          "h-7 w-7 flex items-center justify-center rounded-sm border border-border text-muted-foreground/50",
          className
        )}
        aria-hidden="true"
      >
        <Bookmark className="h-3 w-3" />
      </div>
    ) : (
      <div
        className={cn(
          "h-10 px-4 inline-flex items-center gap-2 rounded-md border border-border text-muted-foreground/50",
          className
        )}
        aria-hidden="true"
      >
        <Bookmark className="h-4 w-4" />
        <span className="text-xs font-display tracking-[0.15em] uppercase">Save</span>
      </div>
    );
  }

  const saved = isSaved(kind, slug);

  const handleToggle = () => {
    const wasAdded = toggleItem({ kind, slug, title, href });
    if (wasAdded) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "relative h-7 w-7 flex items-center justify-center rounded-sm border transition-all duration-300 focus-ring",
          saved
            ? "border-gold/50 text-gold bg-gold/10"
            : "border-border text-muted-foreground hover:text-gold hover:border-gold/40",
          className
        )}
        aria-label={
          saved ? `Remove ${title} from reading list` : `Save ${title} to reading list`
        }
        title={saved ? "Saved to reading list" : "Save for later"}
      >
        {saved ? (
          <BookmarkCheck className="h-3 w-3" />
        ) : (
          <Bookmark className="h-3 w-3" />
        )}
        <AnimatePresence>
          {justAdded && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: -16 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-sm bg-gold text-ink text-[9px] font-display tracking-[0.15em] uppercase whitespace-nowrap pointer-events-none"
            >
              <Check className="h-2.5 w-2.5 inline mr-0.5" />
              Saved
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "relative h-10 px-4 inline-flex items-center gap-2 rounded-md border transition-all duration-300 focus-ring",
        saved
          ? "border-gold/50 text-gold bg-gold/10"
          : "border-border text-muted-foreground hover:text-gold hover:border-gold/40",
        className
      )}
      aria-label={
        saved ? `Remove ${title} from reading list` : `Save ${title} to reading list`
      }
      title={saved ? "Saved to reading list" : "Save for later"}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      <span className="text-xs font-display tracking-[0.15em] uppercase">
        {saved ? "Saved" : "Save"}
      </span>
      <AnimatePresence>
        {justAdded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-sm bg-gold text-ink text-[10px] font-display tracking-[0.15em] uppercase whitespace-nowrap pointer-events-none shadow-lg"
          >
            <Check className="h-3 w-3 inline mr-1" />
            Saved
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
