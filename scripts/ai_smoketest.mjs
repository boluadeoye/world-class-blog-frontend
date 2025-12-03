import fs from 'fs';
try {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  envFile.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v && !process.env[k.trim()]) process.env[k.trim()] = v.trim();
  });
} catch (e) {}

const KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash";

if (!KEY) {
  console.error("❌ No GEMINI_API_KEY found.");
  process.exit(1);
}

console.log(`🔎 Testing Model: ${MODEL} (v1beta)...`);
const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
const payload = {
  contents: [{ role: "user", parts: [{ text: "Hi" }] }]
};

try {
  const r = await fetch(url, { method: "POST", body: JSON.stringify(payload) });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`Status ${r.status}: ${txt}`);
  }
  const data = await r.json();
  console.log("✅ Success! Response:", data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim());
} catch (e) {
  console.error("❌ Failed:", e.message);
  process.exit(1);
}
