import { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog-service";
import { getAllBookSlugs } from "@/lib/books-data";

// Fallback blog slugs - used if database is unreachable
const FALLBACK_BLOG_SLUGS = ["what-is-dark-romance", "enemies-to-lovers-dark-romance"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kartixvale.vercel.app";

  // Static pages — Free Reads removed; no longer in sitemap
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Book detail pages — generated from verified catalogue
  const bookPages: MetadataRoute.Sitemap = getAllBookSlugs().map((slug) => ({
    url: `${baseUrl}/books/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog post pages — try database first, fall back to hardcoded list
  let blogSlugs: string[];
  try {
    blogSlugs = await getAllBlogSlugs();
    if (!blogSlugs || blogSlugs.length === 0) {
      blogSlugs = FALLBACK_BLOG_SLUGS;
    }
  } catch {
    console.error("Sitemap: Failed to fetch blog slugs from DB, using fallback");
    blogSlugs = FALLBACK_BLOG_SLUGS;
  }

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...bookPages, ...blogPages];
}
