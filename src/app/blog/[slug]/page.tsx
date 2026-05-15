import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, getPublishedPosts, renderMarkdownToHtml } from "@/lib/blog-service";
import BlogPostClient from "./blog-post-client";

export const revalidate = 3600; // Revalidate every hour

const baseUrl = "https://kartixvale.vercel.app";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Kartix Vale`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: "Kartix Vale" }],
    creator: "Kartix Vale",
    publisher: "Kartix Vale",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      siteName: "Kartix Vale",
      type: "article",
      publishedTime: post.date,
      authors: ["Kartix Vale"],
      tags: post.keywords,
      locale: "en_US",
      images: [
        {
          url: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: ["https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const url = `${baseUrl}/blog/${post.slug}`;

  // Render markdown content to HTML
  const htmlContent = renderMarkdownToHtml(post.content);

  // JSON-LD structured data for Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    url,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Kartix Vale",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Kartix Vale",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.keywords.join(", "),
    genre: "Dark Romance",
    wordCount: htmlContent.replace(/<[^>]*>/g, "").split(/\s+/).length,
  };

  // BreadcrumbList structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  // Pass the post with HTML content (rendered from markdown) to the client component
  const postWithHtml = { ...post, content: htmlContent };

  // Get related posts (excluding current, limit 3)
  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostClient post={postWithHtml} relatedPosts={relatedPosts} />
    </>
  );
}
