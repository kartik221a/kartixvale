"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, Check, Sparkles, ArrowRight } from "lucide-react";

interface EmailCaptureProps {
  source?: string;
  variant?: "inline" | "card" | "hero" | "editorial";
  className?: string;
}

/**
 * Newsletter signup component.
 * Backend: POST /api/subscribe → Turso Subscriber table.
 * Variants:
 *   - "hero": compact horizontal (input + button)
 *   - "inline": horizontal form
 *   - "card": centered card with copy
 *   - "editorial": premium dark romance styled section for homepage
 */
export function EmailCapture({
  source = "website",
  variant = "card",
  className = "",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSuccess(true);
      setAlreadySubscribed(Boolean(data.alreadySubscribed));
      // Store email so future features can auto-unlock without re-entry
      try {
        localStorage.setItem("kv_email", email.trim().toLowerCase());
      } catch {
        // localStorage might be disabled — fail silently
      }
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Success state — shared across all variants
  // ============================================================
  if (success) {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 text-gold mb-3">
          <Check className="h-5 w-5" />
          <span className="font-serif text-lg md:text-xl">
            {alreadySubscribed
              ? "Welcome back to the dark."
              : "Welcome to the dark side."}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
          {alreadySubscribed
            ? "You're already on the list — watch your inbox for the next dispatch."
            : "Watch your inbox for the next dispatch from the dark library."}
        </p>
      </div>
    );
  }

  // ============================================================
  // Hero variant — compact horizontal
  // ============================================================
  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-gold/30 h-11 flex-1"
          aria-label="Email address"
        />
        <Button
          type="submit"
          disabled={loading}
          variant="oxblood"
          className="font-semibold px-6 h-11 transition-all duration-300"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </Button>
      </form>
    );
  }

  // ============================================================
  // Inline variant — horizontal form
  // ============================================================
  if (variant === "inline") {
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-2 ${className}`}
      >
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-gold/30 h-11"
          aria-label="Email address"
        />
        <Button
          type="submit"
          disabled={loading}
          variant="oxblood"
          className="font-semibold px-6 h-11 whitespace-nowrap transition-all duration-300 hover:shadow-[0_0_24px_rgba(160,24,24,0.4)]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-1" />
              Subscribe
            </>
          )}
        </Button>
      </form>
    );
  }

  // ============================================================
  // Editorial variant — premium homepage section
  // ============================================================
  if (variant === "editorial") {
    return (
      <div className={className}>
        <div className="card-dark rounded-md p-8 md:p-12 lg:p-14 relative overflow-hidden">
          {/* Atmospheric background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 60% at 30% 30%, rgba(160,24,24,0.15) 0%, transparent 55%), radial-gradient(ellipse 60% 60% at 70% 70%, rgba(184,146,74,0.10) 0%, transparent 55%)",
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto text-center">
            {/* Icon */}
            <div className="flex items-center justify-center mb-5">
              <div className="w-12 h-12 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center">
                <Mail className="h-5 w-5 text-gold" />
              </div>
            </div>

            {/* Eyebrow */}
            <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
              The Inner Circle
            </p>

            {/* Heading */}
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight mb-4">
              Stay in the dark.
            </h3>

            <div className="divider-gold w-16 mx-auto mb-5" />

            {/* Copy */}
            <p className="font-body text-base md:text-lg text-foreground/75 leading-relaxed mb-8 max-w-lg mx-auto">
              New articles, new books, and the occasional dispatch from the writing
              room. No spam, no noise — only the work, and the shadows it lives in.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-gold/30 h-12 flex-1"
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={loading}
                variant="oxblood"
                className="font-semibold px-7 h-12 whitespace-nowrap transition-all duration-300 hover:shadow-[0_0_24px_rgba(160,24,24,0.4)]"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {error && (
              <p className="text-blood-light text-sm mt-3">{error}</p>
            )}

            <p className="text-[11px] font-display tracking-[0.15em] uppercase text-muted-foreground/60 mt-5">
              No spam · Unsubscribe anytime
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // Default card variant
  // ============================================================
  return (
    <div className={`card-dark rounded-md p-6 md:p-8 text-center ${className}`}>
      <div className="flex items-center justify-center mb-3">
        <Mail className="h-8 w-8 text-gold" />
      </div>
      <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
        Enter the Dark
      </h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
        Join the inner circle. Get exclusive chapter previews, early access to
        new releases, and behind-the-scenes content delivered to your inbox.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
      >
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-gold/30 h-11"
          aria-label="Email address"
        />
        <Button
          type="submit"
          disabled={loading}
          variant="oxblood"
          className="font-semibold px-6 h-11 whitespace-nowrap transition-all duration-300 hover:shadow-[0_0_24px_rgba(160,24,24,0.4)]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </Button>
      </form>
      {error && <p className="text-blood-light text-sm mt-2">{error}</p>}
      <p className="text-xs text-muted-foreground/60 mt-3">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
