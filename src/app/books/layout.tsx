import { Metadata } from "next";
import { booksData, bookSeries } from "@/lib/books-data";

const baseUrl = "https://kartixvale.vercel.app";

export const metadata: Metadata = {
  title: "Books — The Complete Catalogue | Kartix Vale",
  description:
    "Explore all 17 Kartix Vale novels — the Beneath the Veil series (4 books), Crimson Shifters, Starving Gods, and 10 standalone dark romance, gothic, and dark fantasy novels. Available on Amazon and Kindle Unlimited.",
  keywords: [
    "Kartix Vale books",
    "dark romance novels",
    "Beneath the Veil series",
    "Crimson Shifters",
    "Starving Gods",
    "dark fae romance",
    "gothic romance novels",
    "paranormal romance",
    "wolf shifter romance",
    "dark romantasy",
    "dark fantasy romance",
    "enemies to lovers books",
    "slow burn dark romance",
    "Kindle Unlimited dark romance",
  ],
  alternates: {
    canonical: `${baseUrl}/books`,
  },
  openGraph: {
    title: "Books — The Complete Catalogue | Kartix Vale",
    description:
      "17 novels across 3 series and 10 standalones. Dark romance, gothic, paranormal, and dark fantasy. Available on Amazon and Kindle Unlimited.",
    url: `${baseUrl}/books`,
    siteName: "Kartix Vale",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
        width: 1200,
        height: 630,
        alt: "Kartix Vale — Book Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Books — Kartix Vale",
    description:
      "17 novels across 3 series and 10 standalones — dark romance, gothic, paranormal, and dark fantasy.",
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

/**
 * ItemList structured data — represents the entire Kartix Vale catalogue.
 * Each book entry also has its own Book schema on /books/[slug] pages.
 */
function CatalogueJsonLd() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kartix Vale — Complete Book Catalogue",
    description:
      "All 17 published novels by dark romance author Kartix Vale, organized by series and standalones.",
    itemListElement: booksData.map((book, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Book",
        name: book.title,
        author: { "@type": "Person", name: "Kartix Vale", url: baseUrl },
        genre: book.genre,
        url: `${baseUrl}/books/${book.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")}`,
        image: book.coverUrl,
        bookFormat: "EBook",
        ...(book.series && book.series !== "Standalone"
          ? {
              isPartOf: {
                "@type": "BookSeries",
                name: book.series,
              },
            }
          : {}),
        offers: {
          "@type": "Offer",
          price: book.price?.replace("$", "") || "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: book.amazonUrl,
        },
      },
    })),
  };

  // Series as BookSeries schema
  const seriesSchemas = bookSeries.map((series) => ({
    "@context": "https://schema.org",
    "@type": "BookSeries",
    name: series.name,
    author: { "@type": "Person", name: "Kartix Vale", url: baseUrl },
    description: series.description,
    hasPart: series.books.map((b) => ({
      "@type": "Book",
      name: b.title,
      position: b.seriesNumber,
      url: `${baseUrl}/books/${b.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")}`,
    })),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {seriesSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CatalogueJsonLd />
      {children}
    </>
  );
}
