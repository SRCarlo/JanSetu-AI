import Groq from "groq-sdk";
import { env } from "../config/env.js";

const groq = new Groq({
  apiKey: env.groqApiKey,
});

export async function analyzeCitizenRequest(
  message: string,
  language: string,
  location: string
) {
  const systemPrompt = `
You are JanSetu AI.

Analyze citizen development requests in India.

Return ONLY valid JSON.

Schema:

{
  "language": "string",
  "category": "string",
  "urgency": "Low | Medium | High | Critical",
  "problem": "string",
  "affected_groups": ["string"],
  "location": "string",
  "summary": "string",
  "confidence": 0.0
}

Allowed categories:

Road Infrastructure
Water Supply
Healthcare
Education
Electricity
Sanitation
Public Transport
Internet Connectivity
Agriculture
Flood Management
Other

Rules:

- Detect the actual language.
- Do not invent a location.
- If location is unavailable, use "Unknown".
- confidence must be between 0 and 1.
- Return JSON only.
`;

  const userPrompt = `
Citizen message:
${message}

User language:
${language}

User location:
${location}
`;

  const completion =
    await groq.chat.completions.create({
      model: env.groqModel,

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],

      temperature: 0.2,
    });

  const content =
    completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error(
      "Groq returned an empty response"
    );
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error(
      "Groq returned invalid JSON"
    );
  }
}