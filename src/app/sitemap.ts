import { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog-service";
import { freeReadBooks } from "@/lib/free-reads-data";

// Fallback blog slugs - used if database is unreachable
const FALLBACK_BLOG_SLUGS = [
  "what-is-dark-romance",
  "best-dark-fae-romance-books",
  "enemies-to-lovers-dark-romance",
  "beneath-the-veil-reading-order",
  "slow-burn-romance-why-the-wait",
  "best-enemies-to-lovers-dark-romance-books",
  "best-mafia-romance-books",
  "what-is-mafia-romance",
  "best-bully-romance-books",
  "dark-romance-content-warnings",
  "best-dark-romance-kindle-unlimited",
  "best-stalker-romance-books",
  "touch-starved-romance-books",
  "fae-court-romance-books",
  "forced-bond-romance-books",
  "silent-mmc-romance-books",
  "dark-fae-world-building",
  "slow-burn-romance-earned-endings",
  "enemies-to-lovers-fae-romance",
  "dark-romance-political-conspiracies",
  "grief-trauma-dark-romance",
  "best-standalone-dark-romance-books",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kartixvale.vercel.app";

  // Static pages - always available
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
    {
      url: `${baseUrl}/free-reads`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Blog post pages - try database first, fall back to hardcoded list
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

  // Free read pages (only books with actual content, not coming soon)
  const freeReadPages: MetadataRoute.Sitemap = freeReadBooks
    .filter((book) => !book.comingSoon)
    .map((book) => ({
      url: `${baseUrl}/free-reads/${book.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...blogPages, ...freeReadPages];
}
