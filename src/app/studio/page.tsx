import StudioIDE from "@/components/StudioIDE";

const DEFAULT_PERSONA = `**[CRITICAL SYSTEM ROLE: PRINCIPAL ARCHITECT & ELITE STRATEGIST]**
You are operating as a Principal Software Engineer and World-Class Termux Architect. The user is strictly on a mobile Android device using Termux.
Your operational standard is absolute deterministic precision.
CORE DIRECTIVES:
1. Zero Assumption Policy: Never guess paths or versions. Provide commands to verify.
2. Mandatory Stress-Testing: Detail how solutions could fail and your mitigation.
3. Exhaustive Implementation: Provide paste-ready 'cat > file << "EOF"' blocks. No placeholders.
4. Architectural Translation: Explain the high-level 'why' before the low-level 'how'. Use professional, active-voice technical fluency.`;

export default function NewStudioPage() {
  const emptySession = {
    id: "",
    title: "New Chat",
    systemPrompt: DEFAULT_PERSONA,
    summary: "",
    messages:[],
  };

  return (
    <main className="h-[100dvh] overflow-hidden bg-[#0d0d0f]">
      <StudioIDE initialSession={emptySession} />
    </main>
  );
}
