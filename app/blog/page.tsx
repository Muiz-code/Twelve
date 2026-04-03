"use client";

import { useEffect, useState, useCallback } from "react";
import { Post, getPublishedPosts, getAllCategories } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

const PAGE_SIZE = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
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
      setLoading(false);
    }
  }, [category, search, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero header */}
      <header className="bg-gray-900 text-white py-24 px-6 text-center h-[50vh] flex flex-col justify-center items-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-4">
          Journal
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          The Blog
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto">
          Insights on branding, design, digital marketing, and creative strategy.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Search + filter */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Category pills — scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => handleCategory("")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                category === ""
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-300 text-gray-600 hover:border-gray-900"
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
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 text-gray-600 hover:border-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search — full width on mobile */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto md:self-end">
            <input
              type="text"
              placeholder="Search posts…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Grid — 1 col mobile, 2 col desktop */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-40 hover:border-gray-900 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-sm font-medium border transition-colors ${
                  page === i + 1
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 text-gray-600 hover:border-gray-900"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium disabled:opacity-40 hover:border-gray-900 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
