"use client";

import Link from "next/link";
import Image from "next/image";
import { Post, calcReadTime, formatDate } from "@/lib/blog";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const readTime = calcReadTime(post.content ?? "");

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
        {/* Cover image — tall */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-600" />
          )}
          {post.category && (
            <span className="absolute top-4 left-4 bg-white text-gray-900 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow">
              {post.category}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-7 gap-4">
          <h2 className="text-2xl font-bold leading-snug text-gray-900 group-hover:text-gray-500 transition-colors line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-base text-gray-500 leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-400 pt-4 border-t border-gray-100">
            <span className="font-semibold text-gray-700">{post.author ?? "Twelve"}</span>
            <div className="flex items-center gap-2">
              <span>{formatDate(post.created_at)}</span>
              <span>·</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
