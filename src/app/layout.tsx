import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AnalyticsTracker } from "@/components/layout/analytics-tracker";
import { ThemeProvider } from "@/components/layout/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://kartixvale.com";

export const metadata: Metadata = {
  title: "Kartix Vale — Dark Romance Author | Love Was Never Meant to Be Safe",
  description:
    "Official website of Kartix Vale, dark romance author. Explore dark fae romance, paranormal romance, gothic romance, and fantasy romance novels. Love was never meant to be safe.",
  keywords: [
    "dark romance",
    "dark fae romance",
    "paranormal romance",
    "gothic romance",
    "fantasy romance",
    "slow burn romance",
    "Kartix Vale",
    "dark romance books",
    "fae romance novels",
    "demons and fae romance",
    "mystery thriller romance",
  ],
  authors: [{ name: "Kartix Vale" }],
  creator: "Kartix Vale",
  publisher: "Kartix Vale",
  icons: {
    icon: "/favicon-source.png",
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Kartix Vale — Dark Romance Author",
    description:
      "Explore dark fae romance, paranormal romance, gothic romance, and fantasy romance novels by Kartix Vale. Love was never meant to be safe.",
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
      "Explore dark fae romance, paranormal romance, gothic romance, and fantasy romance novels. Love was never meant to be safe.",
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
      "Kartix Vale writes dark romance that lives in the space between love and obsession, safety and ruin. Drawing from the shadows of fae courts, gothic manors, and the monsters we love.",
    sameAs: [siteUrl],
  };

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Thorns of the Fae Thorne: A Slow Burn Dark Fae Romance",
    author: {
      "@type": "Person",
      name: "Kartix Vale",
    },
    genre: ["Dark Fae Romance", "Paranormal Romance", "Mystery/Thriller Romance"],
    url: "https://www.amazon.com/dp/B0H1BTKZ4M",
    image: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
    isbn: "B0H1BTKZ4M",
    bookFormat: "EBook",
    offers: {
      "@type": "Offer",
      price: "2.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.amazon.com/dp/B0H1BTKZ4M",
    },
    description:
      "THREE HUNDRED YEARS AGO, SOMETHING BROKE THE WORLD. THE FAE COURT HAS BEEN LYING ABOUT IT EVER SINCE. The Thornwall is consuming everything. Ancient cities swallowed whole.",
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
          text: "Dark romance, including dark fae romance, paranormal romance, gothic romance, fantasy romance, and mystery/thriller romance. Every story explores the shadowy edges of love.",
        },
      },
      {
        "@type": "Question",
        name: "Are the books suitable for all readers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kartix Vale's books are intended for mature readers (18+). They explore dark themes, complex relationships, and intense emotional experiences.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I buy the books?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All books are available on Amazon in both ebook and paperback formats.",
        },
      },
      {
        "@type": "Question",
        name: "How often are new books released?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kartix publishes regularly. Subscribe to the newsletter to be the first to know about new releases.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get a free preview?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Subscribe to the newsletter and receive an exclusive free chapter from the latest release.",
        },
      },
      {
        "@type": "Question",
        name: "Does Kartix Vale have social media?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stay connected through the newsletter for now. Social media links coming soon!",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
