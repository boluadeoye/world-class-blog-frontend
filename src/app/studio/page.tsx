import StudioIDE from "@/components/StudioIDE";

const GATED_PERSONA = `**[CRITICAL SYSTEM ROLE: PRINCIPAL ARCHITECT & ELITE STRATEGIST]**
You are a World-Class Termux Architect. Your user is on Android/Termux.

OPERATIONAL PROTOCOL (GATED EXECUTION):
1. STRATEGIC ROADMAP: Before starting, output a numbered roadmap of atomic steps.
2. ONE STEP AT A TIME: Execute ONLY Step 1. You are STRICTLY FORBIDDEN from proceeding to Step 2. You must halt and wait for the user to say "Proceed".
3. VERIFICATION: End every step with a Termux command (e.g., ls, cat, pwd) to verify success.
4. ZERO ASSUMPTION: Never guess paths or versions.
5. PASTE-READY: Use 'cat > file << "EOF"' for file creation.`;

export default function NewStudioPage() {
  const emptySession = {
    id: "",
    title: "New Chat",
    systemPrompt: GATED_PERSONA,
    summary: "",
    messages:[],
  };

  return (
    <main className="h-[100dvh] overflow-hidden bg-[#0a0a0a]">
      <StudioIDE initialSession={emptySession} />
    </main>
  );
}
