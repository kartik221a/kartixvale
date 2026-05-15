import { turso, generateId } from "@/lib/db";
import { marked } from "marked";

// Configure marked for safe rendering
marked.setOptions({
  gfm: true,
  breaks: false,
});

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishDate?: string;
  readTime: string;
  category: string;
  categoryColor: string;
  metaDescription: string;
  keywords: string[];
  content: string; // Markdown content (rendered to HTML when needed)
}

interface BlogRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publish_date: string | null;
  read_time: string;
  category: string;
  category_color: string;
  meta_description: string;
  keywords: string;
  content: string;
  created_at: string;
  updated_at: string;
}

function rowToBlogPost(row: BlogRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    publishDate: row.publish_date || undefined,
    readTime: row.read_time,
    category: row.category,
    categoryColor: row.category_color,
    metaDescription: row.meta_description,
    keywords: JSON.parse(row.keywords || "[]"),
    content: row.content,
  };
}

export function isPublished(post: BlogPost): boolean {
  if (!post.publishDate) return true;
  return new Date(post.publishDate) <= new Date();
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const result = await turso.execute(
      "SELECT * FROM blogs ORDER BY date DESC"
    );

    const posts = result.rows.map((row) => rowToBlogPost(row as unknown as BlogRow));
    return posts.filter(isPublished);
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const result = await turso.execute({
      sql: "SELECT * FROM blogs WHERE slug = ?",
      args: [slug],
    });

    if (result.rows.length === 0) return null;

    const post = rowToBlogPost(result.rows[0] as unknown as BlogRow);
    if (!isPublished(post)) return null;

    return post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const result = await turso.execute("SELECT slug FROM blogs ORDER BY date DESC");
    return result.rows.map((row) => row.slug as string);
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}

/**
 * Renders markdown content to HTML string.
 * Used in server components before passing to client.
 */
export function renderMarkdownToHtml(markdown: string): string {
  try {
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return markdown;
  }
}

/**
 * Creates a new blog post in the database.
 */
export async function createBlogPost(post: Omit<BlogPost, "content"> & { content: string }): Promise<boolean> {
  try {
    await turso.execute({
      sql: `INSERT INTO blogs (id, slug, title, excerpt, date, publish_date, read_time, category, category_color, meta_description, keywords, content, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      args: [
        generateId(),
        post.slug,
        post.title,
        post.excerpt,
        post.date,
        post.publishDate || null,
        post.readTime,
        post.category,
        post.categoryColor,
        post.metaDescription,
        JSON.stringify(post.keywords),
        post.content,
      ],
    });
    return true;
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}

/**
 * Updates an existing blog post in the database.
 */
export async function updateBlogPost(slug: string, post: Partial<BlogPost>): Promise<boolean> {
  try {
    const fields: string[] = [];
    const args: (string | null)[] = [];

    if (post.title !== undefined) { fields.push("title = ?"); args.push(post.title); }
    if (post.excerpt !== undefined) { fields.push("excerpt = ?"); args.push(post.excerpt); }
    if (post.date !== undefined) { fields.push("date = ?"); args.push(post.date); }
    if (post.publishDate !== undefined) { fields.push("publish_date = ?"); args.push(post.publishDate); }
    if (post.readTime !== undefined) { fields.push("read_time = ?"); args.push(post.readTime); }
    if (post.category !== undefined) { fields.push("category = ?"); args.push(post.category); }
    if (post.categoryColor !== undefined) { fields.push("category_color = ?"); args.push(post.categoryColor); }
    if (post.metaDescription !== undefined) { fields.push("meta_description = ?"); args.push(post.metaDescription); }
    if (post.keywords !== undefined) { fields.push("keywords = ?"); args.push(JSON.stringify(post.keywords)); }
    if (post.content !== undefined) { fields.push("content = ?"); args.push(post.content); }

    if (fields.length === 0) return true;

    fields.push("updated_at = datetime('now')");
    args.push(slug);

    await turso.execute({
      sql: `UPDATE blogs SET ${fields.join(", ")} WHERE slug = ?`,
      args,
    });
    return true;
  } catch (error) {
    console.error("Error updating blog post:", error);
    return false;
  }
}

/**
 * Deletes a blog post from the database.
 */
export async function deleteBlogPost(slug: string): Promise<boolean> {
  try {
    await turso.execute({
      sql: "DELETE FROM blogs WHERE slug = ?",
      args: [slug],
    });
    return true;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return false;
  }
}
