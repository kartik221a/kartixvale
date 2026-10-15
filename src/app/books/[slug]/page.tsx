import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllBookSlugs,
  getBookBySlug,
  getRelatedBooks,
  getNextInSeries,
  getPreviousInSeries,
  bookToSlug,
} from "@/lib/books-data";
import BookDetailClient from "./book-detail-client";

const baseUrl = "https://kartixvale.vercel.app";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  const url = `${baseUrl}/books/${slug}`;
  const description =
    book.hook ||
    book.description[0]?.slice(0, 155) ||
    `${book.title} by Kartix Vale — ${book.genre}.`;

  return {
    title: `${book.title} — ${book.genre} by Kartix Vale`,
    description,
    keywords: [
      book.title,
      "Kartix Vale",
      book.genre,
      ...(book.series && book.series !== "Standalone" ? [book.series] : []),
      "dark romance",
      "dark romance novel",
      "Amazon",
      "Kindle Unlimited",
    ],
    authors: [{ name: "Kartix Vale" }],
    creator: "Kartix Vale",
    publisher: "Kartix Vale",
    alternates: { canonical: url },
    openGraph: {
      title: `${book.title} — ${book.genre}`,
      description,
      url,
      siteName: "Kartix Vale",
      type: "book",
      locale: "en_US",
      images: [
        {
          url: book.coverUrl,
          width: 1200,
          height: 630,
          alt: `Cover of ${book.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} — Kartix Vale`,
      description,
      images: [book.coverUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const url = `${baseUrl}/books/${slug}`;
  const relatedBooks = getRelatedBooks(book, 4);
  const nextBook = getNextInSeries(book);
  const previousBook = getPreviousInSeries(book);

  // Book schema structured data
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: "Kartix Vale",
      url: baseUrl,
    },
    genre: book.genre,
    url,
    image: book.coverUrl,
    bookFormat: "EBook",
    description: book.description.join(" "),
    ...(book.subtitle ? { alternativeHeadline: book.subtitle } : {}),
    ...(book.series && book.series !== "Standalone"
      ? {
          isPartOf: {
            "@type": "BookSeries",
            name: book.series,
            position: book.seriesNumber,
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
  };

  // BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Books", item: `${baseUrl}/books` },
      {
        "@type": "ListItem",
        position: 3,
        name: book.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BookDetailClient
        book={book}
        relatedBooks={relatedBooks}
        nextBook={nextBook}
        previousBook={previousBook}
      />
    </>
  );
}
