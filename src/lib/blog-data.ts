/**
 * Blog data module - now powered by database (Turso).
 * 
 * This file re-exports types and async functions from blog-service.ts.
 * All blog content is stored in the `blogs` table as Markdown.
 * 
 * To seed the database with blog posts, run:
 *   TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node scripts/seed-blogs.mjs
 */

export type { BlogPost } from "./blog-service";
export {
  getPublishedPosts,
  getBlogPost,
  getAllBlogSlugs,
  isPublished,
  renderMarkdownToHtml,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "./blog-service";
