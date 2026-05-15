import { Metadata } from "next";
import BlogListClient from "./blog-list-client";
import { getPublishedPosts } from "@/lib/blog-service";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "The Dark Library — Blog | Kartix Vale",
  description:
    "Stories, guides, and deep dives into the shadows of dark romance. Explore trope breakdowns, book recommendations, and series guides by Kartix Vale.",
  keywords: [
    "dark romance blog",
    "dark romance guides",
    "dark romance book lists",
    "enemies to lovers",
    "slow burn romance",
    "dark fae romance",
    "Kartix Vale blog",
  ],
  openGraph: {
    title: "The Dark Library — Blog | Kartix Vale",
    description:
      "Stories, guides, and deep dives into the shadows of dark romance.",
    url: "https://kartixvale.vercel.app/blog",
    siteName: "Kartix Vale",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dark Library — Blog | Kartix Vale",
    description:
      "Stories, guides, and deep dives into the shadows of dark romance.",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <BlogListClient posts={posts} />;
}
