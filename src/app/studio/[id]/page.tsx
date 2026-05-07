import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import StudioIDE from "@/components/StudioIDE";

export const dynamic = 'force-dynamic';

export default async function StudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sql = neon(process.env.DATABASE_URL!);

  const rows = await sql`
    SELECT id, title, system_prompt, summary, messages 
    FROM shannon_history WHERE id = ${id} LIMIT 1
  `;

  if (rows.length === 0) notFound();

  const session = {
    id: rows[0].id,
    title: rows[0].title ?? "Untitled Session",
    systemPrompt: rows[0].system_prompt ?? "",
    summary: rows[0].summary ?? "",
    messages: rows[0].messages ??[],
  };

  return (
    <main className="h-[100dvh] w-full overflow-hidden bg-[#0a0a0a]">
      <StudioIDE initialSession={session} />
    </main>
  );
}
