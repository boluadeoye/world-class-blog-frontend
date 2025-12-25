"use client";
import { useEffect, useState } from "react";
import { Trash2, Star, StarOff, Eye, EyeOff, Save, Plus } from "lucide-react";

export default function FeaturedVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newVideo, setNewVideo] = useState({ title: "", youtubeUrl: "" });

  // Fetch Videos
  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/proxy/videos");
      const data = await res.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Create Video
  const handleCreate = async (e) => {
    e.preventDefault();
    await fetch("/api/proxy/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVideo),
    });
    setNewVideo({ title: "", youtubeUrl: "" });
    fetchVideos();
  };

  // Delete Video
  const handleDelete = async (id) => {
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/proxy/videos/${id}`, { method: "DELETE" });
    fetchVideos();
  };

  // Toggle Publish
  const togglePublish = async (video) => {
    await fetch(`/api/proxy/videos/${video.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !video.is_published }),
    });
    fetchVideos();
  };

  // Toggle Feature
  const toggleFeature = async (video) => {
    await fetch(`/api/proxy/videos/${video.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_featured: !video.is_featured }),
    });
    fetchVideos();
  };

  if (loading) return <div className="p-8 text-slate-500">Loading videos...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-white">Featured Videos</h1>
        <p className="text-slate-400 text-sm">Manage your "On Air" content.</p>
      </header>

      {/* Add Form */}
      <form onSubmit={handleCreate} className="bg-slate-900 p-6 rounded-xl border border-white/10 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
          <input 
            className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white"
            value={newVideo.title}
            onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">YouTube URL</label>
          <input 
            className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white"
            value={newVideo.youtubeUrl}
            onChange={(e) => setNewVideo({...newVideo, youtubeUrl: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={18} /> Add
        </button>
      </form>

      {/* Video List */}
      <div className="grid gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-slate-900 p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">{video.title}</h3>
              <a href={video.youtube_url} target="_blank" className="text-xs text-indigo-400 hover:underline">{video.youtube_url}</a>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleFeature(video)} className={`p-2 rounded-lg ${video.is_featured ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                {video.is_featured ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
              </button>
              <button onClick={() => togglePublish(video)} className={`p-2 rounded-lg ${video.is_published ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                {video.is_published ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <button onClick={() => handleDelete(video.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
