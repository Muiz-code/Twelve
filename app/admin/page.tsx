"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Post, getAllPosts, deletePost, togglePublished } from "@/lib/blog";
import AdminLayout from "@/components/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  useAdminAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAllPosts();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (post: Post) => {
    try {
      await togglePublished(post.id, !post.published);
      toast.success(post.published ? "Moved to drafts" : "Published!");
      fetchPosts();
    } catch {
      toast.error("Failed to update post");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePost(deleteId);
      toast.success("Post deleted");
      setDeleteId(null);
      fetchPosts();
    } catch {
      toast.error("Failed to delete post");
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">All Posts</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {posts.length} total · {posts.filter((p) => p.published).length} published
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            + New Post
          </Link>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>No posts yet.</p>
            <Link
              href="/admin/posts/new"
              className="mt-4 inline-block text-gray-900 font-medium underline"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Title</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Category</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Author</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900 line-clamp-1">{post.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{post.slug}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{post.category ?? "—"}</td>
                      <td className="px-5 py-4 text-gray-500">{post.author ?? "—"}</td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleToggle(post)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                            post.published
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-green-500" : "bg-gray-400"}`} />
                          {post.published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/posts/${post.id}`} className="text-gray-500 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100">Edit</Link>
                          <button onClick={() => setDeleteId(post.id)} className="text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 line-clamp-2">{post.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{post.category ?? "No category"} · {post.author ?? "No author"}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(post)}
                      className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-green-500" : "bg-gray-400"}`} />
                      {post.published ? "Published" : "Draft"}
                    </button>
                  </div>
                  <div className="flex gap-3 pt-3 border-t border-gray-100">
                    <Link href={`/admin/posts/${post.id}`} className="flex-1 text-center py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
                      Edit
                    </Link>
                    <button onClick={() => setDeleteId(post.id)} className="flex-1 py-1.5 rounded-lg bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete post?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
