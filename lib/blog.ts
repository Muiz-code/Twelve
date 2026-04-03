import { supabase, Post } from "./supabase";
export type { Post } from "./supabase";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function calcReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getPublishedPosts(options?: {
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ posts: Post[]; total: number }> {
  const { category, search, page = 1, pageSize = 9 } = options ?? {};
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category) query = query.eq("category", category);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data, count, error } = await query;
  if (error) throw error;
  return { posts: (data as Post[]) ?? [], total: count ?? 0 };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) return null;
  return data as Post;
}

export async function getRelatedPosts(
  category: string | null,
  excludeId: string,
  limit = 3
): Promise<Post[]> {
  if (!category) return [];
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .neq("id", excludeId)
    .limit(limit);
  return (data as Post[]) ?? [];
}

export async function getAllCategories(): Promise<string[]> {
  const { data } = await supabase
    .from("posts")
    .select("category")
    .eq("published", true)
    .not("category", "is", null);
  const unique = [...new Set((data ?? []).map((r: { category: string }) => r.category))];
  return unique.filter((tag): tag is string => Boolean(tag));
}

// Admin helpers
export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Post[]) ?? [];
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Post;
}

export async function upsertPost(
  post: Partial<Post> & { title: string; slug: string }
): Promise<Post> {
  const now = new Date().toISOString();
  const payload = { ...post, updated_at: now };
  const { data, error } = await supabase
    .from("posts")
    .upsert(payload)
    .select()
    .single();
  if (error) throw error;
  return data as Post;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

export async function togglePublished(id: string, published: boolean): Promise<void> {
  const { error } = await supabase
    .from("posts")
    .update({ published, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function uploadCoverImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const name = `${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from("blog-images")
    .upload(name, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("blog-images").getPublicUrl(name);
  return data.publicUrl;
}
