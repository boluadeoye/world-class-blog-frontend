"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PostsSection from "./PostsSection";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export default function ArticlesClient() {
  const [posts, setPosts] = useState(null);
  const params = useSearchParams();
  const topicParam = params.get("topic");
  const initialSelectedTopic = topicParam
    ? topicParam[0].toUpperCase() + topicParam.slice(1).toLowerCase()
    : "All";

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/posts`, { credentials: "include" });
        const data = await res.json();
        if (mounted) setPosts(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setPosts([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return <PostsSection posts={posts} initialSelectedTopic={initialSelectedTopic} />;
}