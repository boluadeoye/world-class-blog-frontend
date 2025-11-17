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
          credentials: "include"
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch post (${res.status})`);
        }

        const data = await res.json();
        // Ensure content is a string for PostForm / RichTextEditor
        setPost({
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content || ""
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
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: updated.title,
          slug: updated.slug,
          content: updated.content
        })
      });

      if (!res.ok) {
        const data = await res.text();
        let msg = data;
        try {
          msg = JSON.parse(data)?.error || JSON.parse(data)?.message || data;
        } catch {}
        throw new Error(msg || `Failed to update post (${res.status})`);
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