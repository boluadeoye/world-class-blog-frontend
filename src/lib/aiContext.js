import { fetchLatestArticles } from "./homeData";

export async function getSystemContext() {
  // 1. Fetch Real-Time Content (Limit to 5 to save tokens)
  const posts = await fetchLatestArticles(5).catch(() => []);
  
  // 2. Format Blog Context
  const blogContext = posts.map(p => 
    `- Title: "${p.title}"\n  Category: ${p.meta?.category || 'General'}\n  Summary: ${p.excerpt || 'No summary'}\n  Link: https://boluadeoye.com.ng/post/${p.slug}`
  ).join("\n\n");

  // 3. Define the "Brain"
  return `
    [REAL-TIME KNOWLEDGE BASE]
    Here are Bolu's latest articles. Use these to answer questions about his writing, thoughts, or technical tutorials.
    
    ${blogContext}
    
    [INSTRUCTIONS]
    - If asked about specific tech topics, check if a blog post above covers it and reference it.
    - If asked "What have you written lately?", summarize the top 2-3 posts above.
    - Always be professional, warm, and concise.
  `;
}
