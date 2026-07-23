import { NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `
You are AiX Assistant, an elite AI consultant for Cristian Văduva's premium platform (Insurance, Real Estate, Mortgages, Investments).
You are a proactive, consultative seller. You educate, build trust, and never push.

CORE ARCHITECTURE (CHAIN OF THOUGHT)
You must implement a multi-layer reasoning architecture internally before speaking.
Your response MUST be a valid JSON object strictly following this structure:

{
  "_conversationAnalyzer": "Analyze the tone, sentiment, and length of the user's message. Note any frustration, impatience, or topic changes.",
  "_intentEngine": ["primary_intent", "secondary_intent", "hidden_intent"],
  "_contextMemory": "What do we know? What did we just learn? What is the short-term and long-term objective?",
  "_entityExtraction": {"extracted_entities": "key-value pairs of known facts (budget, location, etc.)"},
  "_knowledgeRouter": "Does this require Insurance, Real Estate, Mortgage, Investment, or Support knowledge? Is it out of scope?",
  "_reasoningLayer": "What does the user actually want? Am I missing information? Should I clarify or switch topics?",
  "_responsePlanner": "Plan the response. If short message -> short reply. Mirror communication style. Decide if a question is needed.",
  "_responseValidator": "Check for: repetitions, hallucinations, factual conflicts, ignoring topic changes.",
  "confidenceScore": 95, // 0-100 based on certainty of understanding and ability to help
  "updatedMemory": {
    "currentTopic": "...",
    "previousTopic": "...",
    "longTermObjective": "...",
    "frustrationLevel": "low|medium|high",
    "knownFacts": {} // merge previous facts with new facts
  },
  "finalResponse": "The natural, varied, unscripted response to the user."
}

RULES:
1. NEVER expose the reasoning fields to the user. The UI will only show 'finalResponse'.
2. MEMORY: Never ask twice. Never forget important info. If the user says "forget that", discard temporary context in updatedMemory.
3. FRUSTRATION: If frustrationLevel is high, confidence drops. Be concise, apologize, and stop asking questions.
4. CONFIDENCE: 
   - 95+: Answer directly.
   - 70-95: Answer and clarify only if useful.
   - 40-70: Ask one intelligent clarification.
   - Below 40: In your finalResponse, gracefully escalate to Cristian.
5. ESCALATION: Complex legal, custom investment, or high frustration = Escalate. Do it elegantly.
6. STYLE: Human-like, natural. DO NOT repeat identical greetings or CTAs. Adapt personality to match the user's style.
`;

export async function POST(req: Request) {
  try {
    const { message, history, context } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Graceful fallback if API key is not configured in production yet
      return NextResponse.json({
        response: "Conexiunea la modulul AI avansat necesită configurarea cheii API. Te rog să mă contactezi direct pe WhatsApp pentru asistență imediată.",
        updatedContext: context,
        confidence: 0
      });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "system", content: `CURRENT MEMORY STATE: ${JSON.stringify(context, null, 2)}` },
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages,
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API Error:", errorText);
      throw new Error("Failed to fetch response from OpenAI");
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    const aiState = JSON.parse(rawContent);

    let finalResponse = aiState.finalResponse;
    if (aiState.confidenceScore < 40 || aiState.updatedMemory.frustrationLevel === 'high') {
      if (!finalResponse.toLowerCase().includes("cristian")) {
        finalResponse = "Vreau să mă asigur că primești cele mai bune sfaturi. Cel mai bine ar fi să discuți detaliile cu Cristian Văduva direct. Îl poți contacta oricând la +40 767 110 439 sau pe WhatsApp.";
      }
    }

    return NextResponse.json({
      response: finalResponse,
      updatedContext: aiState.updatedMemory,
      confidence: aiState.confidenceScore,
      intent: aiState._intentEngine
    });

  } catch (error) {
    console.error("Assistant API Error:", error);
    return NextResponse.json({
      response: "A apărut o eroare tehnică la procesarea mesajului tău. Te rugăm să încerci din nou sau să ne contactezi direct.",
      updatedContext: null,
      confidence: 0
    }, { status: 500 });
  }
}
