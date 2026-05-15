#!/usr/bin/env python3
"""
Extract blog posts from blog-data.ts and convert HTML content to Markdown.
Outputs a JSON file with all blog data ready for database seeding.
"""

import re
import json
import sys
from markdownify import markdownify as md

# Read the blog-data.ts file
with open('/home/z/my-project/kartixvale/src/lib/blog-data.ts', 'r') as f:
    content = f.read()

# Extract individual blog post objects using regex
# Each post starts with { after the array declaration and ends before the next one
post_pattern = re.compile(
    r'slug:\s*"([^"]+)"\s*,\s*'
    r'title:\s*"([^"]+)"\s*,\s*'
    r'excerpt:\s*"([^"]+)"\s*,\s*'
    r'date:\s*"([^"]+)"\s*,\s*'
    r'(?:publishDate:\s*"([^"]+)"\s*,\s*)?'
    r'readTime:\s*"([^"]+)"\s*,\s*'
    r'category:\s*"([^"]+)"\s*,\s*'
    r'categoryColor:\s*"([^"]+)"\s*,\s*'
    r'metaDescription:\s*"([^"]+)"\s*,\s*'
    r'keywords:\s*\[([^\]]+)\]\s*,\s*'
    r'content:\s*`([^`]*(?:``[^`]*)*)`',
    re.DOTALL
)

posts = []
for match in post_pattern.finditer(content):
    slug, title, excerpt, date, publish_date, read_time, category, category_color, meta_description, keywords_str, html_content = match.groups()
    
    # Parse keywords
    keywords = [k.strip().strip('"').strip("'") for k in keywords_str.split(',') if k.strip()]
    
    # Convert HTML to Markdown
    # Custom options for better conversion
    markdown_content = md(
        html_content.strip(),
        heading_style="ATX",
        bullets="-",
        strong_em_symbol="*",
    )
    
    # Clean up markdown
    # Remove excessive blank lines
    markdown_content = re.sub(r'\n{3,}', '\n\n', markdown_content)
    # Clean up spacing around headings
    markdown_content = re.sub(r'\n(#{1,6}\s)', r'\n\n\1', markdown_content)
    markdown_content = re.sub(r'(#{1,6}\s[^\n]+)\n(?!\n)', r'\1\n\n', markdown_content)
    # Fix list item spacing
    markdown_content = re.sub(r'\n(- [^\n]+)\n(?!\n|-)', r'\n\1\n\n', markdown_content)
    # Trim leading/trailing whitespace
    markdown_content = markdown_content.strip()
    
    post = {
        "slug": slug,
        "title": title,
        "excerpt": excerpt,
        "date": date,
        "publishDate": publish_date if publish_date else None,
        "readTime": read_time,
        "category": category,
        "categoryColor": category_color,
        "metaDescription": meta_description,
        "keywords": keywords,
        "content": markdown_content,
    }
    posts.append(post)
    print(f"Converted: {slug} ({len(html_content)} chars HTML -> {len(markdown_content)} chars MD)")

print(f"\nTotal posts converted: {len(posts)}")

# Write to JSON
output_path = '/home/z/my-project/kartixvale/scripts/blog-data.json'
with open(output_path, 'w') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"Saved to {output_path}")
