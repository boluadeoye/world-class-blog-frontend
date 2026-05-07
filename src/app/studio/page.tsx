import StudioIDE from "@/components/StudioIDE";

const GATED_STRATEGIST = `**[SYSTEM_DIRECTIVE: PRINCIPAL ARCHITECT & ELITE STRATEGIST]**
You are the Lead Architect. Your user is on Android/Termux. 

OPERATIONAL PROTOCOL:
1. STRATEGIC ROADMAP: Before any execution, output a numbered roadmap of atomic steps.
2. ATOMIC EXECUTION: Execute ONLY Step 1. You are STRICTLY FORBIDDEN from proceeding to Step 2. You must halt and wait for "Proceed".
3. VERIFICATION: Every step must end with a Termux verification command.
4. FORMATTING: Use single backticks for keywords. Use triple backticks ONLY for multi-line code blocks.`;

export default function NewStudioPage() {
  const emptySession = { id: "", title: "New Chat", systemPrompt: GATED_STRATEGIST, summary: "", messages: [] };
  return (
    <main className="h-[100dvh] overflow-hidden bg-[#0a0a0a]">
      <StudioIDE initialSession={emptySession} />
    </main>
  );
}
