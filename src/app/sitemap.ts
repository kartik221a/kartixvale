import { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog-service";
import { getAllBookSlugs, bookSeries } from "@/lib/books-data";

// Fallback blog slugs - used if database is unreachable
const FALLBACK_BLOG_SLUGS = [
  "what-is-dark-romance",
  "enemies-to-lovers-dark-romance",
  "dark-romance-content-warnings",
  "morally-grey-characters-dark-romance",
  "fated-mates-dark-romance",
  "slow-burn-dark-romance",
  "dark-romance-vs-gothic-romance",
  "marriage-of-convenience-dark-romance",
  "forbidden-love-dark-romance",
];

function seriesToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kartixvale.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/books`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  // Series landing pages
  const seriesPages: MetadataRoute.Sitemap = bookSeries.map((s) => ({
    url: `${baseUrl}/books/series/${seriesToSlug(s.name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Book detail pages
  const bookPages: MetadataRoute.Sitemap = getAllBookSlugs().map((slug) => ({
    url: `${baseUrl}/books/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog post pages
  let blogSlugs: string[];
  try {
    blogSlugs = await getAllBlogSlugs();
    if (!blogSlugs || blogSlugs.length === 0) {
      blogSlugs = FALLBACK_BLOG_SLUGS;
    }
  } catch {
    blogSlugs = FALLBACK_BLOG_SLUGS;
  }

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...seriesPages, ...bookPages, ...blogPages];
}
