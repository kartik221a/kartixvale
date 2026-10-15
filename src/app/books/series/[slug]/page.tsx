import { Metadata } from "next";
import { notFound } from "next/navigation";
import { bookSeries, type BookSeries } from "@/lib/books-data";
import SeriesClient from "./series-client";

const baseUrl = "https://kartixvale.vercel.app";

interface SeriesPageProps {
  params: Promise<{ slug: string }>;
}

function seriesToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateStaticParams() {
  return bookSeries.map((s) => ({ slug: seriesToSlug(s.name) }));
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = bookSeries.find((s) => seriesToSlug(s.name) === slug);

  if (!series) {
    return { title: "Series Not Found" };
  }

  const url = `${baseUrl}/books/series/${slug}`;
  const bookCount = series.books.length;
  const description = `${series.name} — a ${bookCount}-book ${series.complete ? "complete" : "ongoing"} dark romance series by Kartix Vale. ${series.description.slice(0, 120)}...`;

  return {
    title: `${series.name} — Series Guide | Kartix Vale`,
    description,
    keywords: [
      series.name,
      "Kartix Vale",
      "dark romance series",
      "reading order",
      ...series.books.map((b) => b.title),
    ],
    authors: [{ name: "Kartix Vale" }],
    creator: "Kartix Vale",
    alternates: { canonical: url },
    openGraph: {
      title: `${series.name} — Series Guide`,
      description,
      url,
      siteName: "Kartix Vale",
      type: "book",
      locale: "en_US",
      images: [
        {
          url: series.books[0]?.coverUrl || "",
          width: 1200,
          height: 630,
          alt: `${series.name} series by Kartix Vale`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${series.name} — Kartix Vale`,
      description,
      images: [series.books[0]?.coverUrl || ""],
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

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = bookSeries.find((s) => seriesToSlug(s.name) === slug);

  if (!series) {
    notFound();
  }

  const url = `${baseUrl}/books/series/${slug}`;

  // BookSeries + ItemList structured data
  const seriesSchema = {
    "@context": "https://schema.org",
    "@type": "BookSeries",
    name: series.name,
    description: series.description,
    author: { "@type": "Person", name: "Kartix Vale", url: baseUrl },
    hasPart: series.books.map((b, i) => ({
      "@type": "Book",
      name: b.title,
      position: i + 1,
      url: `${baseUrl}/books/${b.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")}`,
      image: b.coverUrl,
      bookFormat: "EBook",
      offers: {
        "@type": "Offer",
        price: b.price?.replace("$", "") || "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: b.amazonUrl,
      },
    })),
  };

  // BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Books", item: `${baseUrl}/books` },
      { "@type": "ListItem", position: 3, name: series.name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SeriesClient series={series} />
    </>
  );
}
