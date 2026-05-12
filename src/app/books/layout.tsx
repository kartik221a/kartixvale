import { Metadata } from "next";

const baseUrl = "https://kartixvale.vercel.app";

export const metadata: Metadata = {
  title: "Books — The Collection | Kartix Vale",
  description:
    "Explore Kartix Vale's complete collection of dark romance novels. The Beneath the Veil series (4 books) and standalone novels including Thorns of the Fae Thorne and Gotham Reaper's Bride. Available on Amazon.",
  keywords: [
    "Kartix Vale books",
    "dark romance books",
    "Beneath the Veil series",
    "dark fae romance",
    "gothic romance novels",
    "paranormal romance",
    "slow burn dark romance",
    "enemies to lovers books",
  ],
  alternates: {
    canonical: `${baseUrl}/books`,
  },
  openGraph: {
    title: "Books — Kartix Vale",
    description:
      "7 dark romance novels. The Beneath the Veil series + standalone worlds. Available on Amazon and Kindle Unlimited.",
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
      "7 dark romance novels. The Beneath the Veil series + standalone worlds.",
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

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
