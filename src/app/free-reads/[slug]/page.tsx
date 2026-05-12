import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFreeReadBook, getAllFreeReadSlugs } from "@/lib/free-reads-data";
import FreeReadClient from "./free-read-client";

const baseUrl = "https://kartixvale.vercel.app";

interface FreeReadPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllFreeReadSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FreeReadPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getFreeReadBook(slug);

  if (!book) {
    return { title: "Book Not Found" };
  }

  const url = `${baseUrl}/free-reads/${book.slug}`;
  const chapterInfo = `Read the first ${book.chapters.length} ${book.chapters.length === 1 ? "chapter" : "chapters"} free`;

  return {
    title: `${book.title} — Free Chapters | Kartix Vale`,
    description: `${chapterInfo} of "${book.title}" by Kartix Vale. ${book.hook} ${book.genre}. Available on Amazon and Kindle Unlimited.`,
    keywords: [
      book.title,
      "free chapters",
      "read free online",
      book.genre,
      "Kartix Vale",
      "dark romance free read",
      "free dark romance books",
    ],
    authors: [{ name: "Kartix Vale" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${book.title} — Read Free`,
      description: `${chapterInfo} of "${book.title}" by Kartix Vale. ${book.hook}`,
      url,
      siteName: "Kartix Vale",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: book.coverUrl,
          width: 1200,
          height: 630,
          alt: book.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} — Read Free`,
      description: `${chapterInfo} of "${book.title}" by Kartix Vale.`,
      images: [book.coverUrl],
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
}

export default async function FreeReadPage({ params }: FreeReadPageProps) {
  const { slug } = await params;
  const book = getFreeReadBook(slug);

  if (!book) {
    notFound();
  }

  const url = `${baseUrl}/free-reads/${book.slug}`;

  // JSON-LD for Book + ReadAction
  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: "Kartix Vale",
      url: baseUrl,
    },
    genre: book.genre,
    description: book.hook,
    url,
    image: book.coverUrl,
    bookFormat: "EBook",
    offers: book.amazonUrl ? {
      "@type": "Offer",
      price: book.price?.replace("$", ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: book.amazonUrl,
    } : undefined,
    workExample: {
      "@type": "Book",
      bookFormat: "EBook",
      numberOfPages: book.chapters.length,
      description: `Free preview containing ${book.chapters.length} ${book.chapters.length === 1 ? "chapter" : "chapters"}`,
    },
  };

  // BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Free Reads", item: `${baseUrl}/free-reads` },
      { "@type": "ListItem", position: 3, name: book.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FreeReadClient book={book} />
    </>
  );
}
