import { Metadata } from "next";

const baseUrl = "https://kartixvale.vercel.app";

export const metadata: Metadata = {
  title: "About — The Author | Kartix Vale",
  description:
    "Kartix Vale is a 22-year-old dark romance author who writes stories that live in the space between love and obsession. Discover the mind behind Beneath the Veil, Thorns of the Fae Thorne, and more.",
  keywords: [
    "Kartix Vale author",
    "dark romance author",
    "about Kartix Vale",
    "who is Kartix Vale",
    "dark romance writer",
  ],
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About — Kartix Vale",
    description:
      "The mind behind the darkness. Kartix Vale writes dark romance that lives in the space between love and obsession, safety and ruin.",
    url: `${baseUrl}/about`,
    siteName: "Kartix Vale",
    type: "profile",
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
    title: "About — Kartix Vale",
    description:
      "The mind behind the darkness. Dark romance author. Love was never meant to be safe.",
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
