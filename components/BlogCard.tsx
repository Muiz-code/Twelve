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
      <article className="h-full flex flex-col bg-[#0d1e2d] border border-[#2a3a40] rounded-3xl overflow-hidden hover:border-[#4AA8C4] transition-colors duration-300">
        {/* Cover image */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-[#0a1419]">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[#0a1419]" />
          )}
          {post.category && (
            <span className="absolute top-4 left-4 bg-[#4AA8C4] text-[#0a1419] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {post.category}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-6 md:p-7 gap-4">
          <h2 className="text-xl md:text-2xl font-semibold leading-snug text-[#FFF7EB] group-hover:text-[#4AA8C4] transition-colors line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-sm md:text-base text-[#999] leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#666] pt-4 border-t border-[#2a3a40]">
            <span className="font-semibold text-[#FFF7EB]">{post.author ?? "Twelve"}</span>
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
