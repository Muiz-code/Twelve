"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { slugify, getPostById, upsertPost, uploadCoverImage } from "@/lib/blog";
import AdminLayout from "@/components/AdminLayout";
import PostEditor from "@/components/PostEditor";
import toast from "react-hot-toast";
import Image from "next/image";

const CATEGORIES = [
  "Branding",
  "Web Design",
  "Development",
  "Marketing",
  "Strategy",
  "Case Study",
  "News",
];

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    author: "",
    category: "",
    tags: [] as string[],
    published: false,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/admin/login");
    });
    loadPost();
  }, [id, router]);

  const loadPost = async () => {
    const post = await getPostById(id);
    if (!post) {
      toast.error("Post not found");
      router.push("/admin");
      return;
    }
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      cover_image: post.cover_image ?? "",
      author: post.author ?? "",
      category: post.category ?? "",
      tags: post.tags ?? [],
      published: post.published,
    });
    setLoading(false);
  };

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (title: string) => {
    set("title", title);
    set("slug", slugify(title));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadCoverImage(file);
      set("cover_image", url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      set("tags", [...form.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    set("tags", form.tags.filter((t) => t !== tag));

  const handleSave = async (published: boolean) => {
    if (!form.title) return toast.error("Title is required");
    setSaving(true);
    try {
      await upsertPost({ ...form, published });
      toast.success(published ? "Published!" : "Saved as draft");
      router.push("/admin");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
          <div className="flex gap-3">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Publish"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          {/* Cover image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            <div className="flex gap-3 items-start">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700">
                {uploading ? "Uploading…" : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
              {form.cover_image && (
                <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src={form.cover_image}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            <input
              type="text"
              value={form.cover_image}
              onChange={(e) => set("cover_image", e.target.value)}
              placeholder="Or paste image URL"
              className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          {/* Category + Author */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                placeholder="Author name"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-gray-400 hover:text-gray-700 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add a tag and press Enter"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900 transition-colors"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2.5 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={3}
              placeholder="Short description shown in post cards"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
            />
          </div>

          {/* Content editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <PostEditor
              value={form.content}
              onChange={(html) => set("content", html)}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
