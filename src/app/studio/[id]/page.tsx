import StudioIDE from "@/components/StudioIDE";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

async function getSession(id: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`SELECT * FROM shannon_history WHERE id = ${id}`;
  return data[0] || null;
}

export default async function StudioSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sessionData = await getSession(id);

  if (!sessionData) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-white font-mono text-sm">
        404 // SESSION_NOT_FOUND
      </div>
    );
  }

  const session = {
    id: sessionData.id,
    title: sessionData.title,
    systemPrompt: sessionData.system_prompt,
    messages: sessionData.messages || [],
  };

  return (
    <main className="h-[100dvh] w-full overflow-hidden bg-[#000000]">
      <StudioIDE initialSession={session} />
    </main>
  );
}
