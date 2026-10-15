import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ReadingListPanel } from "@/components/reading-list/reading-list-panel";
import { BackToTop } from "@/components/layout/back-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://kartixvale.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Kartix Vale — Dark Romance Author | Love Was Never Meant to Be Safe",
    template: "%s | Kartix Vale",
  },
  description:
    "Official website of Kartix Vale, dark romance author. Seventeen novels across three series and ten standalones — dark fae, gothic, paranormal, and dark fantasy romance. Love was never meant to be safe.",
  keywords: [
    "dark romance",
    "dark romance author",
    "Kartix Vale",
    "dark fae romance",
    "paranormal romance",
    "gothic romance",
    "dark fantasy romance",
    "wolf shifter romance",
    "fated mates",
    "dark romantasy",
    "Beneath the Veil series",
    "Crimson Shifters",
    "Starving Gods",
    "dark romance books",
    "Kindle Unlimited dark romance",
    "morally grey romance",
    "enemies to lovers",
    "slow burn romance",
  ],
  authors: [{ name: "Kartix Vale" }],
  creator: "Kartix Vale",
  publisher: "Kartix Vale",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(siteUrl),
  verification: {
    google: "8_AvBXfoYigKNYt5tLT2mivRQlwKfCP992a7xUgsD6Y",
  },
  openGraph: {
    title: "Kartix Vale — Dark Romance Author",
    description:
      "Seventeen novels across three series and ten standalones — dark fae, gothic, paranormal, and dark fantasy romance by Kartix Vale. Love was never meant to be safe.",
    url: siteUrl,
    siteName: "Kartix Vale",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
        width: 1200,
        height: 630,
        alt: "Kartix Vale — Dark Romance Author",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartix Vale — Dark Romance Author",
    description:
      "Seventeen novels. Three series. Ten standalones. Dark romance, gothic, paranormal, and dark fantasy. Love was never meant to be safe.",
    images: ["https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function JsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kartix Vale",
    url: siteUrl,
    description:
      "Official website of Kartix Vale, dark romance author. Love was never meant to be safe.",
    author: {
      "@type": "Person",
      name: "Kartix Vale",
      description:
        "Kartix Vale writes dark romance that lives in the space between love and obsession, safety and ruin.",
      genre: "Dark Romance",
    },
  };

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kartix Vale",
    jobTitle: "Author",
    genre: "Dark Romance",
    description:
      "Kartix Vale writes emotionally intense novels filled with dangerous chemistry, morally grey characters, slow-burning desire, and cinematic worlds that linger long after the last page.",
    url: siteUrl,
    sameAs: [
      siteUrl,
      "https://www.amazon.com/author/kartixvale",
      "https://www.amazon.com.au/Kartix-Vale/e/B0H1Y3GVK1",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What genre does Kartix Vale write?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dark romance, gothic romance, paranormal romance, dark fantasy romance, and dark romantasy. Every story explores the shadowy edges of love under pressure.",
        },
      },
      {
        "@type": "Question",
        name: "How many books has Kartix Vale published?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Seventeen novels across three series — Beneath the Veil (4 books), Crimson Shifters (2 books), Starving Gods (1 book) — and ten standalone novels.",
        },
      },
      {
        "@type": "Question",
        name: "Are the books suitable for all readers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kartix Vale's books are intended for mature readers (18+). They explore dark themes, complex relationships, and intense emotional experiences. Each book includes a content warning.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I buy the books?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All books are available on Amazon in both ebook and paperback formats, and most are enrolled in Kindle Unlimited.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Beneath the Veil series reading order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Beneath the Veil is best read in order: Book 1 — A Bargain in Shadows, Book 2 — The Unholy Reverie, Book 3 — A Crown of Ashes, Book 4 — Behind the Veil.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-gold/50 focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <BackToTop />
        <ReadingListPanel />
        <Toaster />
      </body>
    </html>
  );
}
