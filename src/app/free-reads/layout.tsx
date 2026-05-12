import { Metadata } from "next";

const baseUrl = "https://kartixvale.vercel.app";

export const metadata: Metadata = {
  title: "Free Reads — Read Dark Romance Free | Kartix Vale",
  description:
    "Read free chapters from Kartix Vale's dark romance novels. Start Thorns of the Fae Thorne, Beneath the Veil, and more — no signup required. Full books available on Amazon and Kindle Unlimited.",
  keywords: [
    "free dark romance reads",
    "free dark romance chapters",
    "read dark romance free",
    "Kartix Vale free reads",
    "dark fae romance free",
    "free kindle unlimited romance",
    "dark romance preview",
    "free paranormal romance",
  ],
  alternates: {
    canonical: `${baseUrl}/free-reads`,
  },
  openGraph: {
    title: "Free Reads — Kartix Vale",
    description:
      "Start reading dark romance for free. First chapters of every Kartix Vale novel — no signup, no cost. Continue on Amazon or Kindle Unlimited.",
    url: `${baseUrl}/free-reads`,
    siteName: "Kartix Vale",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
        width: 1200,
        height: 630,
        alt: "Free Dark Romance Reads — Kartix Vale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Reads — Kartix Vale",
    description:
      "Start reading dark romance for free. First chapters of every novel — no signup required.",
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

export default function FreeReadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
