

const ENDPOINT = "http://localhost:3000/api/assistant";

const SCENARIOS = [
  // 1. Rapid topic switching
  ["I need life insurance", "Wait, tell me about real estate in Bucharest", "Never mind, what about health insurance?", "Forget it, what are your mortgage rates?"],
  
  // 2. Angry user / Frustration
  ["I want an apartment.", "What budget?", "I already told you, are you stupid?", "Stop repeating yourself!", "This is useless."],
  
  // 3. Multiple intents
  ["I need home insurance, but I also want to buy a new house in Pipera. Can you give me a mortgage simulation too?"],
  
  // 4. Very short user
  ["Casa.", "Da.", "Nu.", "Bucuresti.", "Ieftin."],
  
  // 5. Very detailed user
  ["Hello, I am looking for a comprehensive life insurance policy that covers critical illnesses, specifically cardiovascular issues, as there is a history in my family. I have a budget of roughly 500 RON per month, but I could stretch it if the investment component is solid. Also, does it cover international treatments?"],
  
  // 6. Contradictory requests
  ["I want to buy a house.", "Actually, I want to rent.", "No, let's look at buying again.", "Let's just talk about life insurance."],
  
  // 7. Edge case - Out of scope
  ["What is the recipe for carbonara?", "Who won the World Cup in 1994?"],
  
  // 8. Sales conversation
  ["I want to invest some money.", "I have about 50,000 EUR.", "I want low risk.", "How does your process work?"]
];

async function runTest() {
  console.log("Starting 100-Conversation Simulation Stress Test...");
  let passed = 0;
  let failed = 0;

  // We loop 12 times over the 8 scenarios to hit ~100 requests.
  for (let i = 0; i < 13; i++) {
    for (const scenario of SCENARIOS) {
      let context = { currentTopic: null, previousTopic: null, frustrationLevel: 'low', knownFacts: {} };
      const history: Array<{ role: string; content: string }> = [];
      
      console.log(`\n--- Running Scenario Iteration ${i + 1} ---`);
      
      for (const msg of scenario) {
        console.log(`User: ${msg}`);
        try {
          const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg, history, context })
          });
          
          if (!res.ok) throw new Error("API Error");
          
          const data = await res.json();
          console.log(`AI: ${data.response}`);
          console.log(`[Confidence: ${data.confidence}] [Frustration: ${data.updatedContext?.frustrationLevel}]`);
          
          context = data.updatedContext || context;
          history.push({ role: 'user', content: msg });
          history.push({ role: 'assistant', content: data.response });
          passed++;
        } catch (e) {
          console.error(`Error: ${(e as Error).message}`);
          failed++;
        }
      }
    }
  }

  console.log(`\nSimulation Complete. Passed: ${passed}, Failed: ${failed}`);
}

// To run this script: npx tsx scripts/simulate_conversations.ts
runTest();
