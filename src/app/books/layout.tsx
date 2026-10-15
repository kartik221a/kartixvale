import { Metadata } from "next";

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

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
