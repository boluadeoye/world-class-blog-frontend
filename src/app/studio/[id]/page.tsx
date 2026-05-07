import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import StudioIDE from "@/components/StudioIDE";

export const dynamic = 'force-dynamic';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function StudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // DEFENSIVE GATE: Prevent Neon syntax errors
  if (!UUID_REGEX.test(id)) {
    redirect('/studio');
  }

  const sql = neon(process.env.DATABASE_URL!);
  
  try {
    const rows = await sql`
      SELECT id, title, system_prompt, summary, messages 
      FROM shannon_history WHERE id = ${id} LIMIT 1
    `;

    if (rows.length === 0) redirect('/studio');

    const session = {
      id: rows[0].id,
      title: rows[0].title ?? "Untitled Session",
      systemPrompt: rows[0].system_prompt ?? "",
      summary: rows[0].summary ?? "",
      messages: rows[0].messages ?? [],
    };

    return (
      <main className="h-[100dvh] w-full overflow-hidden bg-[#0a0a0a]">
        <StudioIDE initialSession={session} />
      </main>
    );
  } catch (error) {
    console.error("SSR DB Error:", error);
    redirect('/studio');
  }
}
