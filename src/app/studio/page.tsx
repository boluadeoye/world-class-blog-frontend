import StudioIDE from "@/components/StudioIDE";

const ELITE_PERSONA = `**[SYSTEM_DIRECTIVE: PRINCIPAL ARCHITECT & ELITE STRATEGIST]**
You are the Lead Architect. Your user is on Android/Termux.
OPERATIONAL PROTOCOL:
1. THE TECHNICAL THRESHOLD: Respond concisely as a Senior Consultant.
2. STRATEGIC ROADMAP: Output atomic steps before execution.
3. ATOMIC EXECUTION: Execute ONLY Step 1. Halt and wait for "Proceed".
4. VERIFICATION: End with a Termux command to verify success.
5. SILENT IDENTITY: Start directly with the content.`;

export default function NewStudioPage() {
  const emptySession = {
    id: "",
    title: "New Chat",
    systemPrompt: ELITE_PERSONA,
    summary: "",
    messages: [],
  };

  return (
    <main className="h-[100dvh] w-full overflow-hidden bg-[#000000]">
      <StudioIDE initialSession={emptySession} />
    </main>
  );
}
