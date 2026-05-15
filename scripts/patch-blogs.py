#!/usr/bin/env python3
"""Patch new-blogs.json to fix SEO issues: missing keywords, long meta descriptions, etc."""

import json
import re

with open('/home/z/my-project/kartixvale/scripts/new-blogs.json', 'r') as f:
    posts = json.load(f)

def ensure_keyword_in_first_100(content, keyword):
    """Insert keyword naturally into first 100 words if missing."""
    words = content.split()
    first_100 = ' '.join(words[:100]).lower()
    if keyword.lower() in first_100:
        return content
    # Find a good insertion point - after the first paragraph break
    # Insert naturally at the end of the first paragraph
    first_para_end = content.find('\n\n')
    if first_para_end == -1:
        first_para_end = content.find('\n')
    if first_para_end == -1:
        return content
    
    first_para = content[:first_para_end]
    # Add the keyword naturally to the first paragraph
    # Try to find a sentence ending to insert after
    sentences = first_para.split('. ')
    if len(sentences) > 1:
        # Insert a new sentence with the keyword after the first sentence
        insertion = f". {keyword.capitalize()} — and the books that deliver it — demands a specific kind of reader"
        modified = sentences[0] + insertion + '. ' + '. '.join(sentences[1:])
        return modified + content[first_para_end:]
    return content

def add_keyword_to_content(content, keyword, min_count=1):
    """Add keyword to content if it appears fewer than min_count times."""
    count = content.lower().count(keyword.lower())
    if count >= min_count:
        return content
    
    # Find a natural place to insert - look for a paragraph about related topics
    # Insert as part of a list or descriptive passage
    additions_needed = min_count - count
    
    # Common insertion patterns
    insertions = [
        f"— perfect for readers searching for {keyword} —",
        f"For anyone exploring {keyword}, this is essential reading.",
        f"If you're looking for {keyword}, you'll find it here.",
        f"Readers of {keyword} will find much to love.",
    ]
    
    for i in range(additions_needed):
        # Find a section break (##) to insert after
        section_breaks = [m.start() for m in re.finditer(r'\n## ', content)]
        if len(section_breaks) > (i + 1):
            # Insert after the (i+1)th section heading, in its first paragraph
            pos = section_breaks[i + 1]
            next_newline = content.find('\n\n', pos)
            if next_newline != -1:
                insertion = f"\n\n{insertions[i % len(insertions)]}"
                content = content[:next_newline] + insertion + content[next_newline:]
    
    return content

# Fix each post
for i, post in enumerate(posts):
    content = post['content']
    primary_kw = post['keywords'][0]
    
    # Fix meta descriptions that are too long
    if len(post['metaDescription']) > 160:
        post['metaDescription'] = post['metaDescription'][:157] + '...'
    
    # Ensure primary keyword in first 100 words
    words = content.split()
    first_100_text = ' '.join(words[:100]).lower()
    if primary_kw.lower() not in first_100_text:
        # We need to add the primary keyword to the first 100 words
        # Let's modify the opening paragraphs
        # Strategy: add the keyword naturally into the first paragraph
        
        kw_variants = {
            'touch-starved romance': 'touch-starved romance',
            'fae court romance': 'fae court romance',
            'forced bond romance': 'forced bond romance',
            'silent male character romance': 'silent MMC romance',
            'dark fae worldbuilding': 'dark fae world-building',
            'slow burn earned ending': 'slow burn with an earned ending',
            'enemies to lovers fae': 'enemies to lovers fae romance',
            'dark romance conspiracy': 'dark romance with a political conspiracy',
            'trauma in dark romance': 'trauma in dark romance',
            'standalone dark romance': 'standalone dark romance',
        }
        
        kw_natural = kw_variants.get(primary_kw, primary_kw)
        
        # Find the first paragraph and add the keyword
        first_para_end = content.find('\n\n')
        if first_para_end != -1:
            first_para = content[:first_para_end]
            last_sentence_end = first_para.rfind('.')
            if last_sentence_end > len(first_para) - 100:
                insertion = f" In the world of {kw_natural}, these are the books that define the genre."
                content = first_para[:last_sentence_end + 1] + insertion + first_para[last_sentence_end + 1:] + content[first_para_end:]
    
    # Ensure primary keyword appears at least 3 times
    primary_count = content.lower().count(primary_kw.lower())
    if primary_count < 3:
        # Add mentions in natural places
        for _ in range(3 - primary_count):
            # Find ## headers to add after
            section_positions = [m.start() for m in re.finditer(r'\n## ', content)]
            if len(section_positions) > 2:
                pos = section_positions[min(primary_count + 1, len(section_positions) - 1)]
                next_para = content.find('\n\n', pos)
                if next_para != -1:
                    insert_text = f"\n\nThis is what the best {primary_kw} delivers — not just intensity, but meaning."
                    content = content[:next_para] + insert_text + content[next_para:]
                    primary_count += 1
    
    # Add secondary keywords that are missing
    for kw in post['keywords'][1:]:
        kw_count = content.lower().count(kw.lower())
        if kw_count == 0:
            # Add the keyword naturally
            kw_additions = [
                f" For fans of {kw}, this book delivers.",
                f" — a must-read for anyone interested in {kw}.",
                f" If {kw} is what you're after, look no further.",
            ]
            # Find a good place to insert
            section_positions = [m.start() for m in re.finditer(r'\n## ', content)]
            if section_positions:
                pos = section_positions[len(section_positions) // 2]
                next_para = content.find('\n\n', pos)
                if next_para != -1:
                    next_para_end = content.find('\n\n', next_para + 2)
                    if next_para_end != -1:
                        insert = kw_additions[hash(kw) % len(kw_additions)]
                        content = content[:next_para_end] + insert + content[next_para_end:]
    
    post['content'] = content

# Write back
with open('/home/z/my-project/kartixvale/scripts/new-blogs.json', 'w') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print("Patched all posts. Re-validating...")

# Re-validate
for i, post in enumerate(posts, 1):
    content = post['content']
    words = content.split()
    word_count = len(words)
    first_100 = ' '.join(words[:100]).lower()
    primary_kw = post['keywords'][0].lower()
    primary_in_first_100 = primary_kw in first_100
    primary_count = content.lower().count(primary_kw)
    meta_len = len(post['metaDescription'])
    
    status = "✓" if (primary_in_first_100 and primary_count >= 3 and meta_len <= 160) else "✗"
    print(f"  {status} Post {i}: '{post['slug'][:40]}...' | Words: {word_count} | Primary in 1st 100: {primary_in_first_100} | Primary count: {primary_count} | Meta: {meta_len}")
