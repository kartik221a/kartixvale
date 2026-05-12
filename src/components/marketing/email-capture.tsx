"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, Check, Sparkles } from "lucide-react";

interface EmailCaptureProps {
  source?: string;
  variant?: "inline" | "card" | "hero";
  className?: string;
}

export function EmailCapture({
  source = "website",
  variant = "card",
  className = "",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
      setEmail("");

      // Track signup
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "email_signup",
          page: window.location.pathname,
          metadata: { source },
        }),
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 text-gold">
          <Check className="h-5 w-5" />
          <span className="font-serif text-lg">Welcome to the dark side.</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Check your inbox for something special.
        </p>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-black/50 border-border text-foreground placeholder:text-muted-foreground focus:border-blood-light focus:ring-blood-light/30 h-11 flex-1"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-blood-light hover:bg-blood text-white font-semibold px-6 h-11 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Get Chapter"
          )}
        </Button>
      </form>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-black/50 border-border text-foreground placeholder:text-muted-foreground focus:border-blood-light focus:ring-blood-light/30 h-11"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-blood-light hover:bg-blood text-white font-semibold px-6 h-11 whitespace-nowrap transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]"
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

  // Default card variant
  return (
    <div
      className={`card-dark rounded-xl p-6 md:p-8 text-center ${className}`}
    >
      <div className="flex items-center justify-center mb-3">
        <Mail className="h-8 w-8 text-blood-light" />
      </div>
      <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
        Enter the Dark
      </h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
        Join the inner circle. Get exclusive chapter previews, early access to
        new releases, and behind-the-scenes content delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-black/50 border-border text-foreground placeholder:text-muted-foreground focus:border-blood-light focus:ring-blood-light/30 h-11"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-blood-light hover:bg-blood text-white font-semibold px-6 h-11 whitespace-nowrap transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
      {error && (
        <p className="text-blood-light text-sm mt-2">{error}</p>
      )}
      <p className="text-xs text-muted-foreground/60 mt-3">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
