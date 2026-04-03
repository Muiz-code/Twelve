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
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative w-full h-[60vh] min-h-[400px] bg-gray-900">
        {post.cover_image && (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-3xl mx-auto">
          {post.category && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-300 mb-3">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-xs">
              {(post.author ?? "T").charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-700">{post.author ?? "Twelve"}</span>
            <span>·</span>
            <span>{formatDate(post.created_at)}</span>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>

          {/* Share buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 mr-1">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full border border-gray-300 text-xs hover:border-gray-900 transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full border border-gray-300 text-xs hover:border-gray-900 transition-colors"
            >
              LinkedIn
            </a>
            <CopyLinkButton url={shareUrl} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {post.excerpt && (
          <p className="text-xl text-gray-500 leading-relaxed mb-8 font-light border-l-4 border-gray-900 pl-5">
            {post.excerpt}
          </p>
        )}

        <div
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-gray-900 prose-a:underline
            prose-blockquote:border-gray-900 prose-blockquote:not-italic
            prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}

