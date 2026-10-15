#!/usr/bin/env node
/**
 * build-blog-data.mjs
 * ===================
 * Reads all Markdown files from content/blog/*.md (with YAML frontmatter),
 * converts them to the blog-data.json format expected by seed-blogs.mjs,
 * and writes scripts/blog-data.json.
 *
 * Usage:
 *   bun run scripts/build-blog-data.mjs
 *
 * After running this, run:
 *   bun run seed:blogs -- --upsert
 * to push the new content to the Turso database.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BLOG_DIR = join(__dirname, '..', 'content', 'blog');
const OUTPUT_PATH = join(__dirname, 'blog-data.json');

/**
 * Minimal YAML frontmatter parser — handles the keys we use.
 * For richer YAML, swap to a real YAML library (js-yaml).
 */
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Missing YAML frontmatter. Expected --- at the top of the file.');
  }
  const yamlBlock = match[1];
  const body = match[2].trim();

  const frontmatter = {};
  let currentListKey = null;

  for (const line of yamlBlock.split('\n')) {
    // Skip blank lines and comments
    if (!line.trim() || line.trim().startsWith('#')) continue;

    // List item under current key
    if (line.startsWith('  - ')) {
      if (!currentListKey) continue;
      const value = line.slice(4).trim().replace(/^["']|["']$/g, '');
      if (!Array.isArray(frontmatter[currentListKey])) {
        frontmatter[currentListKey] = [];
      }
      frontmatter[currentListKey].push(value);
      continue;
    }

    // Top-level key: value
    const kvMatch = line.match(/^([\w-]+)\s*:\s*(.*)$/);
    if (!kvMatch) continue;
    const [, key, rawValue] = kvMatch;
    currentListKey = null;

    let value = rawValue.trim();
    if (value === '') {
      // Empty value — could be a list start
      frontmatter[key] = [];
      currentListKey = key;
      continue;
    }
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function buildPost(filePath) {
  const fileContent = readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(fileContent);

  // Required fields validation
  const required = ['slug', 'title', 'excerpt', 'date', 'readTime', 'category', 'categoryColor', 'metaDescription'];
  for (const key of required) {
    if (!frontmatter[key]) {
      throw new Error(`Missing required frontmatter field "${key}" in ${filePath}`);
    }
  }

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    date: frontmatter.date,
    publishDate: frontmatter.publishDate || null,
    readTime: frontmatter.readTime,
    category: frontmatter.category,
    categoryColor: frontmatter.categoryColor,
    metaDescription: frontmatter.metaDescription,
    keywords: Array.isArray(frontmatter.keywords) ? frontmatter.keywords : [],
    content: body,
  };
}

function main() {
  if (!existsSync(BLOG_DIR)) {
    console.error(`Error: blog content directory not found at ${BLOG_DIR}`);
    process.exit(1);
  }

  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  if (files.length === 0) {
    console.warn(`Warning: no Markdown files found in ${BLOG_DIR}`);
  }

  console.log(`Found ${files.length} Markdown file(s) in content/blog/`);

  const posts = files.map(file => {
    const filePath = join(BLOG_DIR, file);
    const post = buildPost(filePath);
    console.log(`  ✓ Parsed "${post.slug}" (${post.content.split(/\s+/).length} words)`);
    return post;
  });

  // Sort by date descending (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2));
  console.log(`\n✓ Wrote ${posts.length} post(s) to ${OUTPUT_PATH}`);
  console.log(`\nNext step: bun run seed:blogs -- --upsert`);
}

main();
