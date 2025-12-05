import { fetchLatestArticles } from "../lib/homeData";

export default async function sitemap() {
  const baseUrl = "https://boluadeoye.com.ng";
  
  // 1. Static Routes
  const routes = ["", "/about", "/projects", "/articles", "/media", "/chat"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Dynamic Blog Posts
  const posts = await fetchLatestArticles(100).catch(() => []);
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...postRoutes];
}
