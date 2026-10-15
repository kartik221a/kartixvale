#!/usr/bin/env node
/**
 * Seed script for the blogs table in Turso database.
 *
 * Usage:
 *   bun run seed:blogs
 *
 * Modes:
 *   (default)       Insert new posts, skip existing slugs.
 *   --reset         DROP all existing rows and re-insert from blog-data.json.
 *   --upsert        UPSERT — insert or update existing posts by slug.
 *
 * Environment:
 *   TURSO_DATABASE_URL  Required.
 *   TURSO_AUTH_TOKEN     Required (if your Turso DB needs auth).
 */

import { createClient } from '@libsql/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RESET = process.argv.includes('--reset');
const UPSERT = process.argv.includes('--upsert');

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

async function resetTable() {
  console.log('⚠ Reset mode: deleting all existing blog rows...');
  await turso.execute('DELETE FROM blogs');
  console.log('✓ All rows deleted');
}

async function seedBlogs() {
  const dataPath = join(__dirname, 'blog-data.json');
  const posts = JSON.parse(readFileSync(dataPath, 'utf-8'));

  console.log(`Found ${posts.length} blog post(s) to seed`);

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const post of posts) {
    if (UPSERT) {
      // UPSERT by slug
      await turso.execute({
        sql: `INSERT INTO blogs (id, slug, title, excerpt, date, publish_date, read_time, category, category_color, meta_description, keywords, content, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
              ON CONFLICT(slug) DO UPDATE SET
                title=excluded.title,
                excerpt=excluded.excerpt,
                date=excluded.date,
                publish_date=excluded.publish_date,
                read_time=excluded.read_time,
                category=excluded.category,
                category_color=excluded.category_color,
                meta_description=excluded.meta_description,
                keywords=excluded.keywords,
                content=excluded.content,
                updated_at=datetime('now')`,
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
      console.log(`  ↻ Upserted "${post.slug}"`);
      updated++;
      continue;
    }

    const existing = await turso.execute({
      sql: 'SELECT id FROM blogs WHERE slug = ?',
      args: [post.slug],
    });

    if (existing.rows.length > 0) {
      console.log(`  ⏭  Skipping "${post.slug}" (already exists)`);
      skipped++;
      continue;
    }

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

  console.log(
    `\nSeeding complete: ${inserted} inserted, ${updated} upserted, ${skipped} skipped`
  );
}

async function main() {
  try {
    if (!process.env.TURSO_DATABASE_URL && !process.env.DATABASE_URL) {
      console.error('Error: TURSO_DATABASE_URL environment variable is required');
      console.error('Usage: TURSO_DATABASE_URL=libsql://... bun run seed:blogs');
      process.exit(1);
    }

    await createTable();
    if (RESET) await resetTable();
    await seedBlogs();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

main();
