import { groq } from "../lib/groq.js";

export interface PolicyRecommendationInput {
  district: string;
  category: string;

  requestCount: number;
  highUrgencyRequests: number;

  demandScore: number;
  averageUrgency: number;

  infrastructureGap: number;
  populationImpact: number;
  vulnerability: number;

  priorityScore: number;
  priorityLevel: string;
}

export interface PolicyRecommendation {
  district: string;
  category: string;

  priorityScore: number;
  priorityLevel: string;

  recommendedAction: string;
  reason: string;
  expectedImpact: string;

  implementationFocus: string[];
}

export async function generatePolicyRecommendation(
  input: PolicyRecommendationInput,
): Promise<PolicyRecommendation> {
  const prompt = `
You are JanSetu AI, an AI system designed
to help Indian policymakers prioritize
public infrastructure development.

Analyze the following citizen demand
and infrastructure data.

District:
${input.district}

Category:
${input.category}

Citizen Requests:
${input.requestCount}

High/Critical Urgency Requests:
${input.highUrgencyRequests}

Citizen Demand Score:
${input.demandScore}

Average Urgency:
${input.averageUrgency}

Infrastructure Gap:
${input.infrastructureGap}

Population Impact:
${input.populationImpact}

Vulnerability:
${input.vulnerability}

Priority Score:
${input.priorityScore}

Priority Level:
${input.priorityLevel}

Generate an evidence-based policy recommendation.

Rules:

1. Do not invent statistics.
2. Use only the provided data.
3. Keep the recommendation practical.
4. Focus on public infrastructure.
5. Explain why the district/category is important.
6. Mention expected citizen impact without inventing
   exact numbers.
7. Suggest 2-4 implementation priorities.

Return ONLY valid JSON.

Required format:

{
  "recommendedAction": "string",
  "reason": "string",
  "expectedImpact": "string",
  "implementationFocus": [
    "string",
    "string"
  ]
}
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "system",
        content:
          "You are a responsible public-policy AI assistant. Return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.2,

    response_format: {
      type: "json_object",
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Groq returned an empty policy recommendation");
  }

  const result = JSON.parse(content);

  return {
    district: input.district,
    category: input.category,

    priorityScore: input.priorityScore,

    priorityLevel: input.priorityLevel,

    recommendedAction: result.recommendedAction,

    reason: result.reason,

    expectedImpact: result.expectedImpact,

    implementationFocus: Array.isArray(result.implementationFocus)
      ? result.implementationFocus
      : [],
  };
}
