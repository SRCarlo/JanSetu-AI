import {
  groq,
  GROQ_MODEL,
} from "../lib/groq.js";

export interface CitizenAIResult {
  language: string;

  category:
    | "WATER"
    | "ROAD"
    | "HEALTHCARE"
    | "IRRIGATION"
    | "PUBLIC_TRANSPORT"
    | "ELECTRICITY"
    | "OTHER";

  urgency:
    | "LOW"
    | "MEDIUM"
    | "HIGH";

  problem: string;

  affectedGroups: string[];

  summary: string;

  confidence: number;
}

export async function analyzeCitizenRequest(
  message: string
): Promise<CitizenAIResult> {

  const completion =
    await groq.chat.completions.create({
      model: GROQ_MODEL,

      temperature: 0.1,

      messages: [
        {
          role: "system",

          content: `
You are JanSetu AI, an Indian
citizen-development intelligence system.

Your job is to analyse citizen complaints
and development requests written in any
Indian language.

Supported languages include:

- Marathi
- Hindi
- English
- Bengali
- Gujarati
- Tamil
- Telugu
- Kannada
- Malayalam
- Punjabi
- Urdu

Identify the following:

1. language
2. category
3. urgency
4. problem
5. affectedGroups
6. summary
7. confidence

Allowed categories:

WATER
ROAD
HEALTHCARE
IRRIGATION
PUBLIC_TRANSPORT
ELECTRICITY
OTHER

Allowed urgency:

LOW
MEDIUM
HIGH

Return ONLY valid JSON.

Do not use markdown.

JSON format:

{
  "language": "Marathi",
  "category": "WATER",
  "urgency": "HIGH",
  "problem": "Short description",
  "affectedGroups": [
    "Residents",
    "Women",
    "Children"
  ],
  "summary": "Short summary",
  "confidence": 0.95
}

Confidence must be between
0 and 1.
          `,
        },

        {
          role: "user",

          content: message,
        },
      ],
    });

  const content =
    completion.choices[0]
      ?.message?.content;

  if (!content) {
    throw new Error(
      "Groq returned an empty response"
    );
  }

  let parsed: CitizenAIResult;

  try {
    parsed =
      JSON.parse(content);
  } catch {
    throw new Error(
      "Groq returned invalid JSON"
    );
  }

  return parsed;
}