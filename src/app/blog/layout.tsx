import { Metadata } from "next";

const baseUrl = "https://kartixvale.vercel.app";

export const metadata: Metadata = {
  title: "Blog — The Dark Library | Kartix Vale",
  description:
    "Stories, guides, and deep dives into the shadows of dark romance. Explore trope breakdowns, book lists, reading orders, and genre guides by Kartix Vale.",
  keywords: [
    "dark romance blog",
    "dark romance books",
    "dark fae romance guide",
    "enemies to lovers",
    "slow burn romance",
    "dark romance tropes",
    "best dark romance books",
    "Kartix Vale blog",
  ],
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "The Dark Library — Kartix Vale Blog",
    description:
      "Stories, guides, and deep dives into the shadows of dark romance. Explore trope breakdowns, book lists, and reading guides.",
    url: `${baseUrl}/blog`,
    siteName: "Kartix Vale",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
        width: 1200,
        height: 630,
        alt: "The Dark Library — Kartix Vale Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dark Library — Kartix Vale Blog",
    description:
      "Stories, guides, and deep dives into the shadows of dark romance.",
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
