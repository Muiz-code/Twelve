"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Post, getPublishedPosts, getAllCategories } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import ContentHero from "@/app/(contentNav)/_components/ContentHero";
import SectionIndicator from "@/app/(contentNav)/_components/SectionIndicator";
import Loader from "@/app/_components/Loader";
import { images } from "@/images/images";

const PAGE_SIZE = 6;

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  const { projectBg } = images();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const fetchPosts = useCallback(async () => {
    setFetching(true);
    try {
      const { posts, total } = await getPublishedPosts({
        category: category || undefined,
        search: search || undefined,
        page,
        pageSize: PAGE_SIZE,
      });
      setPosts(posts);
      setTotal(total);
    } finally {
      setFetching(false);
    }
  }, [category, search, page]);

  useEffect(() => {
    if (!isLoading) fetchPosts();
  }, [fetchPosts, isLoading]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleCategory = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="bg-[#0a1419] min-h-screen">
      {/* Hero */}
      <ContentHero
        breadcrumb={{ home: "Home", current: "Blog" }}
        mainHeading="THE"
        headingLine2Highlight="BLOG"
        backgroundImage={projectBg}
        sectionNumber="01"
        sectionLabel="BLOG"
      />

      <div className="px-4 md:px-25 py-10 md:py-20">
        {/* Section indicator */}
        <SectionIndicator sectionNumber="02" sectionLabel="ARTICLES" />

        {/* Title */}
        <motion.div
          className="mt-10 md:mt-16 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-[70px] font-semibold leading-tight text-[#FFF7EB]">
            LATEST{" "}
            <span
              style={{ WebkitTextStroke: "2px #FFF7EB", color: "transparent" }}
            >
              ARTICLES
            </span>
          </h2>
        </motion.div>

        {/* Search + filter */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => handleCategory("")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                category === ""
                  ? "bg-[#4AA8C4] text-[#0a1419] border-[#4AA8C4]"
                  : "border-[#2a3a40] text-[#FFF7EB] hover:border-[#4AA8C4]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  category === cat
                    ? "bg-[#4AA8C4] text-[#0a1419] border-[#4AA8C4]"
                    : "border-[#2a3a40] text-[#FFF7EB] hover:border-[#4AA8C4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-96">
            <input
              type="text"
              placeholder="Search articles…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent border border-[#2a3a40] rounded-xl px-4 py-2.5 text-sm text-[#FFF7EB] placeholder-[#666] focus:outline-none focus:border-[#4AA8C4] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#4AA8C4] text-[#0a1419] px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Grid */}
        {fetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-[#0d1e2d] rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-[#666]">
            <p className="text-lg">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-[#2a3a40] text-sm font-medium text-[#FFF7EB] disabled:opacity-30 hover:border-[#4AA8C4] transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-sm font-medium border transition-colors ${
                  page === i + 1
                    ? "bg-[#4AA8C4] text-[#0a1419] border-[#4AA8C4]"
                    : "border-[#2a3a40] text-[#FFF7EB] hover:border-[#4AA8C4]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-[#2a3a40] text-sm font-medium text-[#FFF7EB] disabled:opacity-30 hover:border-[#4AA8C4] transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
