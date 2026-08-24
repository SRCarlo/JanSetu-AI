import {
  groq,
  GROQ_MODEL,
} from "../lib/groq.js";

interface RecommendationInput {
  district: string;
  category: string;
  priority: number;
  citizenDemand: number;
  urgency: number;
  infrastructureGap: number;
  populationImpact: number;
  vulnerability: number;
}

export async function generateRecommendation(
  input: RecommendationInput
) {
  const completion =
    await groq.chat.completions.create({
      model: GROQ_MODEL,

      temperature: 0.2,

      messages: [
        {
          role: "system",

          content: `
You are JanSetu AI, a public infrastructure
decision-support assistant for India.

Based on citizen demand and infrastructure
indicators, generate a concise development
recommendation for policymakers.

Do not invent statistics.

Return ONLY JSON.

Format:

{
  "priorityLevel": "HIGH",
  "recommendedAction": "...",
  "reason": "...",
  "citizenImpact": "...",
  "implementationFocus": "..."
}

priorityLevel must be:

LOW
MEDIUM
HIGH
CRITICAL
`,
        },

        {
          role: "user",

          content: JSON.stringify(input),
        },
      ],
    });

  const content =
    completion.choices[0]
      ?.message?.content;

  if (!content) {
    throw new Error(
      "Groq returned empty recommendation"
    );
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error(
      "Groq returned invalid recommendation JSON"
    );
  }
}