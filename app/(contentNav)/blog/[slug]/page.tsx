export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts, calcReadTime, formatDate } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import CopyLinkButton from "@/components/CopyLinkButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const readTime = calcReadTime(post.content ?? "");
  const related = await getRelatedPosts(post.category, post.id);
  const shareUrl = `https://twelve.agency/blog/${post.slug}`;

  return (
    <div className="bg-[#0a1419] min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover opacity-40"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#0d1e2d]" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,20,25,0.6), rgba(10,20,25,1))",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-25 pb-10">
          <p className="text-xs text-[#4AA8C4] tracking-wider mb-3">
            Home / Blog{post.category ? ` / ${post.category}` : ""}
          </p>
          {post.category && (
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0a1419] bg-[#4AA8C4] px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-6xl font-semibold text-[#FFF7EB] leading-tight max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-[#2a3a40]">
        <div className="px-4 md:px-25 py-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#999]">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#4AA8C4] text-[#0a1419] flex items-center justify-center font-bold text-xs">
              {(post.author ?? "T").charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-[#FFF7EB]">{post.author ?? "Twelve"}</span>
            <span>·</span>
            <span>{formatDate(post.created_at)}</span>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#666] mr-1">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full border border-[#2a3a40] text-xs text-[#FFF7EB] hover:border-[#4AA8C4] transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full border border-[#2a3a40] text-xs text-[#FFF7EB] hover:border-[#4AA8C4] transition-colors"
            >
              LinkedIn
            </a>
            <CopyLinkButton url={shareUrl} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {post.excerpt && (
          <p className="text-xl text-[#999] leading-relaxed mb-10 font-light border-l-4 border-[#4AA8C4] pl-5">
            {post.excerpt}
          </p>
        )}

        <div
          className="prose prose-lg max-w-none
            prose-invert
            prose-headings:font-semibold prose-headings:text-[#FFF7EB] prose-headings:tracking-tight
            prose-p:text-[#aaa] prose-p:leading-relaxed
            prose-a:text-[#4AA8C4] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#FFF7EB]
            prose-blockquote:border-[#4AA8C4] prose-blockquote:text-[#999] prose-blockquote:not-italic
            prose-code:bg-[#0d1e2d] prose-code:text-[#4AA8C4] prose-code:px-1.5 prose-code:rounded
            prose-pre:bg-[#0d1e2d] prose-pre:border prose-pre:border-[#2a3a40]
            prose-hr:border-[#2a3a40]"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#2a3a40]">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 border border-[#2a3a40] text-[#999] text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="border-t border-[#2a3a40] px-4 md:px-25 py-16">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#FFF7EB] mb-8">
            RELATED{" "}
            <span style={{ WebkitTextStroke: "2px #FFF7EB", color: "transparent" }}>
              ARTICLES
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="px-4 md:px-25 pb-12">
        <Link
          href="/blog"
          className="text-sm text-[#4AA8C4] hover:opacity-70 transition-opacity"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
