// Simple, free knowledge base + matcher (no external services)

export const suggestions = [
  "Full‑stack development",
  "Technical writing",
  "Video & demos",
  "Pricing",
  "Timeline",
  "Maintenance",
  "Portfolio",
  "How do we start?"
];

const KB = [
  {
    intent: "fullstack",
    keywords: ["website","web app","full stack","full‑stack","next","react","node","api","database","backend","frontend","deploy","performance"],
    answer: `I build fast, reliable web apps:
• Stack: Next.js, React, Node, Neon (Postgres)
• What you get: clean UI, auth, database, analytics, deployment
• Process: discovery → design → build → launch → support
If you can share your goals, features, and timeline, I’ll suggest a plan.`
  },
  {
    intent: "writing",
    keywords: ["write","writer","writing","documentation","docs","tutorial","article","blog","guide"],
    answer: `Technical writing I do:
• Docs that teach (concepts + examples)
• Tutorials with screenshots and short clips
• Editing & developer experience reviews
Tell me the topic, audience, and deadline. I’ll propose an outline.`
  },
  {
    intent: "video",
    keywords: ["video","demo","walkthrough","screencast","record","showcase"],
    answer: `Video & demos:
• Product walkthroughs under 2–5 minutes
• Clean scripts, captions, and music (optional)
Share the product and one key outcome; I’ll map a crisp flow.`
  },
  {
    intent: "pricing",
    keywords: ["price","pricing","cost","budget","rate"],
    answer: `Pricing depends on scope and timelines. Typical ranges:
• Pages/sites: small MVPs from low four figures
• Docs: per article/guide or per project
• Videos: per deliverable
If you tell me budget and deadline, I’ll suggest a scoped plan.`
  },
  {
    intent: "timeline",
    keywords: ["timeline","how long","duration","weeks","days","delivery","when"],
    answer: `Timelines:
• Small site/docs: 1–2 weeks
• Medium project: 3–6 weeks
• Video: 3–7 days per deliverable
We’ll confirm milestones after a quick discovery call.`
  },
  {
    intent: "maintenance",
    keywords: ["maintenance","support","update","fix","retainer","ongoing"],
    answer: `Maintenance:
• Bug fixes, small features, docs updates
• Monthly retainer or on‑demand
Start with your backlog and we’ll plan cadence.`
  },
  {
    intent: "portfolio",
    keywords: ["portfolio","work","case study","examples","past"],
    answer: `You can explore recent posts, projects, and videos on the site.
If you share what you're building, I’ll send you the most relevant examples.`
  },
  {
    intent: "start",
    keywords: ["start","begin","kickoff","engage","hire","quote"],
    answer: `To start, tell me:
1) What are we building/writing?
2) Must‑have features or outcomes
3) Deadline and budget range
I’ll reply with a plan and a quick quote.`
  }
];

function score(text, keywords) {
  const t = text.toLowerCase();
  return keywords.reduce((s, k) => s + (t.includes(k) ? 1 : 0), 0);
}

export function answerFor(input) {
  const txt = String(input || "").toLowerCase();
  let best = { score: -1, answer: null };
  for (const item of KB) {
    const sc = score(txt, item.keywords);
    if (sc > best.score) best = { score: sc, answer: item.answer };
  }
  if (best.score >= 1) return best.answer;

  return `Got it. I can help with full‑stack development, technical writing, and concise product videos.
Share a bit more (goals, deadline, budget range), and I’ll outline next steps.`;
}
