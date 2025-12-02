"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostForm from "../../../../components/admin/PostForm";

/**
 * Edit Post page
 * - URL: /admin/editor/[id]
 */
export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const API_BASE = "https://project-blog-backend-beta.vercel.app/api";

  // Load post data
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/posts/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch post (${res.status})`);
        }

        const data = await res.json();
        const meta = data?.meta || {};
        // Ensure content is a string for PostForm / RichTextEditor
        setPost({
          id: data.id,
          title: data.title || "",
          slug: data.slug || "",
          content: data.content || "",
          category: meta.category || data.category || "Other",
          cover: meta.cover || "",
          tags: Array.isArray(data.tags) ? data.tags : [],
          published: typeof data.published === "boolean" ? data.published : true,
          type: data.type || "article",
        });
      } catch (err) {
        setLoadError(String(err?.message || err));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [API_BASE, id]);

  const handleSave = async (updated) => {
    if (!id) return;
    setSaving(true);
    setSaveError("");

    try {
      const body = {
        title: (updated?.title ?? post.title) || "",
        slug: (updated?.slug ?? post.slug) || "",
        content: String(updated?.content ?? post.content ?? ""),
        type: (updated?.type ?? post.type ?? "article"),
        tags: Array.isArray(updated?.tags) ? updated.tags : post.tags || [],
        meta: {
          ...(updated?.category || post.category ? { category: updated?.category ?? post.category } : {}),
          ...(updated?.cover || post.cover ? { cover: updated?.cover ?? post.cover } : {}),
        },
        published: typeof updated?.published === "boolean" ? updated.published : post.published ?? true,
      };

      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.error || data?.message || `Failed to update post (${res.status})`;
        throw new Error(msg);
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setSaveError(String(err?.message || err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (loadError) return <p className="text-red-600">Error: {loadError}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm
        initialPost={post}
        onSave={handleSave}
        saving={saving}
        error={saveError}
      />
    </div>
  );
}
