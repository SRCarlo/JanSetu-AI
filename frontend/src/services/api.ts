const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export type InputMethod =
  | "TEXT"
  | "VOICE"
  | "WHATSAPP";

export interface CitizenRequestInput {
  message: string;
  language: string;
  location: string;
  inputMethod: InputMethod;
}

export interface CitizenRequest {
  id: string;
  message: string;
  language: string;
  category: string;
  urgency: string;
  problem: string;
  affectedGroups: string[];
  location: string;
  summary: string;
  confidence: number;
  createdAt: string;
}

export async function analyzeCitizenRequest(
  payload: CitizenRequestInput
): Promise<CitizenRequest> {
  const response = await fetch(
    `${API_URL}/ai/analyze-request`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to analyze citizen request"
    );
  }

  return result.data;
}