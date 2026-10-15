import { NextResponse } from "next/server";
import { getPublishedPosts, type BlogPost } from "@/lib/blog-service";

export const revalidate = 3600; // Cache for 1 hour

/**
 * GET /api/search-blogs
 * Returns all published blog posts for client-side search.
 * Returns only search-relevant fields (no full content) to keep the payload small.
 */
export async function GET() {
  try {
    const posts: BlogPost[] = await getPublishedPosts();
    const lightweightPosts = posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      categoryColor: p.categoryColor,
      readTime: p.readTime,
      date: p.date,
    }));
    return NextResponse.json({ posts: lightweightPosts });
  } catch (error) {
    console.error("Error in /api/search-blogs:", error);
    return NextResponse.json({ posts: [], error: "Failed to load posts" }, { status: 500 });
  }
}
