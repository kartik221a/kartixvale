#!/usr/bin/env node
/**
 * Seed script for new blog posts (batch 1-3, 15 posts total).
 * 
 * Usage:
 *   TURSO_DATABASE_URL=libsql://your-db.turso.io TURSO_AUTH_TOKEN=your-token node scripts/seed-new-blogs.mjs
 *
 * This script:
 * 1. Creates the `blogs` table if it doesn't exist
 * 2. Reads blog data from all-new-blogs.json
 * 3. Inserts each blog post into the database (skips if slug already exists)
 */

import { createClient } from '@libsql/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Turso client
const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function createTable() {
  console.log('Creating blogs table...');
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      date TEXT NOT NULL,
      publish_date TEXT,
      read_time TEXT NOT NULL,
      category TEXT NOT NULL,
      category_color TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      keywords TEXT NOT NULL DEFAULT '[]',
      content TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
  console.log('✓ blogs table created/verified');
}

async function seedBlogs() {
  // Read blog data from combined JSON file
  const dataPath = join(__dirname, 'all-new-blogs.json');
  const posts = JSON.parse(readFileSync(dataPath, 'utf-8'));

  console.log(`Found ${posts.length} blog posts to seed`);

  let inserted = 0;
  let skipped = 0;

  for (const post of posts) {
    // Check if post already exists
    const existing = await turso.execute({
      sql: 'SELECT id FROM blogs WHERE slug = ?',
      args: [post.slug],
    });

    if (existing.rows.length > 0) {
      console.log(`  ⏭  Skipping "${post.slug}" (already exists)`);
      skipped++;
      continue;
    }

    // Insert the post
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

    console.log(`  ✓ Inserted "${post.slug}"`);
    inserted++;
  }

  console.log(`\nSeeding complete: ${inserted} inserted, ${skipped} skipped`);
}

async function main() {
  try {
    if (!process.env.TURSO_DATABASE_URL && !process.env.DATABASE_URL) {
      console.error('Error: TURSO_DATABASE_URL environment variable is required');
      console.error('Usage: TURSO_DATABASE_URL=libsql://your-db.turso.io TURSO_AUTH_TOKEN=your-token node scripts/seed-new-blogs.mjs');
      process.exit(1);
    }

    await createTable();
    await seedBlogs();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

main();
