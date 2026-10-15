# Publishing Guide

How to add a new book or publish a new blog article on the Kartix Vale website.

---

## Adding a New Book

All books live in **`src/lib/books-data.ts`**. The file is the single source
of truth for the catalogue — every page (homepage, books page, blog article
recommendations, schema data) reads from it.

### Step-by-step

1. **Open** `src/lib/books-data.ts`.
2. **Add a new entry** to the `booksData` array. Use this template:

   ```ts
   {
     title: "Your Book Title",
     subtitle: "A Short Subtitle", // optional
     coverUrl: "https://m.media-amazon.com/images/I/XXXXXXXX._SL1500_.jpg",
     genre: "Dark Romance",        // primary genre label
     price: "$5.99",                // Kindle ebook price
     amazonUrl: "https://www.amazon.com/dp/ASINXXXXXXX",
     kindleUnlimited: true,         // false if not in KU
     series: "Standalone",          // OR series name e.g. "Beneath the Veil"
     seriesNumber: 1,               // optional — 0 for prequel, 1+ for numbered
     pageCount: 528,                // optional — Amazon print length
     hook: "One evocative line that captures the book.",
     description: [
       "Paragraph 1 of the blurb.",
       "Paragraph 2 of the blurb.",
       // ...
     ],
     whatToExpect: [
       "Trope / theme bullet 1",
       "Trope / theme bullet 2",
       // ...
     ],
     contentWarning: "Themes of X, Y, Z. 18+",
   },
   ```

3. **If the book belongs to a series**, also add the series to the `bookSeries`
   array (if it's a new series) — or it will be picked up automatically if the
   series already exists.

4. **Optional — feature the book on the homepage**: add it to the `featuredBooks`
   array (top 6 slots).

5. **Save the file.** The dev server picks up changes automatically. The
   production build will include the new book in:
   - The Books page (`/books`)
   - The "Complete Library" overview grid
   - Search and filter results
   - Series groupings (if applicable)
   - The article's "Explore dark romance" recommendations (if featured)

### Where to get the cover URL

Open the book's Amazon product page. Right-click the cover image →
"Copy image address". Use the URL that starts with
`https://m.media-amazon.com/images/I/`. Prefer the highest-resolution
variant (URLs ending in `_SL1500_` or `_SY425_`).

### Where to get the ASIN

The ASIN is the 10-character code in the Amazon product URL:
`https://www.amazon.com/dp/B0XXXXXXXX`. Use the Kindle ebook ASIN if
available — it's the primary link target.

---

## Publishing a New Blog Article

Articles are stored in the Turso database as Markdown. The seed script reads
from `scripts/blog-data.json`.

### Step-by-step (recommended workflow)

1. **Write the article as Markdown** with YAML frontmatter. Save it to:
   ```
   content/blog/your-article-slug.md
   ```

   Use this frontmatter template:

   ```markdown
   ---
   slug: your-article-slug
   title: "Your Article Title"
   excerpt: "A one-sentence summary used in cards and previews."
   date: "2026-02-15"
   publishDate: "2026-02-15"
   readTime: "10 min read"
   category: "Genre Guide"
   categoryColor: "#7A1818"
   metaDescription: "SEO meta description — 150-160 chars."
   keywords:
     - dark romance
     - keyword 2
     - keyword 3
   ---

   Your article body in Markdown starts here...
   ```

2. **Convert the Markdown to the seed JSON format**. Run:

   ```bash
   bun run scripts/build-blog-data.mjs
   ```

   This script reads all `content/blog/*.md` files and writes a fresh
   `scripts/blog-data.json` containing all of them.

   *(If the script doesn't exist yet, see "Manual alternative" below.)*

3. **Push the new article to the database**. Run:

   ```bash
   # Upsert: insert new articles, update existing ones
   bun run seed:blogs -- --upsert

   # OR full reset: drop all rows and re-seed from blog-data.json
   bun run seed:blogs -- --reset
   ```

   The seed script needs `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`
   environment variables (already in `.env` locally).

4. **Verify locally** at http://localhost:3001/blog.

5. **Deploy** — Vercel auto-deploys on push to `main`.

### Manual alternative (no build script)

If you don't want to use the build script, you can add the article directly
to `scripts/blog-data.json` as a single object inside the array:

```json
[
  {
    "slug": "your-article-slug",
    "title": "Your Article Title",
    "excerpt": "...",
    "date": "2026-02-15",
    "publishDate": "2026-02-15",
    "readTime": "10 min read",
    "category": "Genre Guide",
    "categoryColor": "#7A1818",
    "metaDescription": "...",
    "keywords": ["dark romance", "..."],
    "content": "Markdown body here...\n\n## Section\n\nMore text..."
  }
]
```

Then run `bun run seed:blogs -- --upsert`.

### Categories & colors

Choose a `category` and `categoryColor` that match the article's topic.
Suggested categories:

| Category          | Color     |
| ----------------- | --------- |
| Genre Guide       | `#7A1818` |
| Trope Breakdown   | `#5C0A0A` |
| Reading Order     | `#B8924A` |
| Book Recommendations | `#4A1D2E` |
| Author Notes      | `#1F1B17` |
| Reader Resources  | `#8B6F30` |

### Content guidelines

- **Original prose only.** Do not copy from other websites.
- **No fabricated quotes** attributed to real people.
- **No fabricated statistics** or fake citations.
- **Content warnings** where the article discusses sensitive themes.
- **Internal links** to relevant Kartix Vale books where they genuinely fit.
- **Heading hierarchy**: use `##` for major sections, `###` for subsections.
- **Include a TOC** for articles longer than ~1500 words.

---

## Local Development

```bash
# Start the dev server (port 3001 to avoid conflict with sandbox main project)
bun run dev

# Lint
bun run lint

# Push schema to Turso DB (if schema changes)
bun run db:push

# Seed blogs (default — skip existing)
bun run seed:blogs

# Seed blogs (upsert — insert or update)
bun run seed:blogs -- --upsert

# Seed blogs (reset — drop and re-insert)
bun run seed:blogs -- --reset
```

## Production Build

The site is deployed automatically on Vercel when you push to `main`.
The build uses `output: "standalone"` for Vercel optimization.

```bash
bun run build
```

---

## Architecture summary

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York)
- **Fonts**: Playfair Display (serif), Cinzel (display), EB Garamond (body),
  Geist Sans (UI)
- **Database**: Turso (SQLite) — for blog content only
- **Markdown rendering**: `marked` library, server-side
- **Book catalogue**: Static TypeScript data in `src/lib/books-data.ts`
- **Images**: Served from `m.media-amazon.com` (Next.js Image optimization)
- **Theme**: Dark mode default, light mode available, persisted via next-themes
