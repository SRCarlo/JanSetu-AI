import "dotenv/config";

const requiredEnv = [
  "GROQ_API_KEY",
  "DATABASE_URL",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(
      `Missing required environment variable: ${key}`
    );
  }
}

export const env = {
  port: Number(process.env.PORT) || 5000,

  groqApiKey: process.env.GROQ_API_KEY,

  groqModel:
    process.env.GROQ_MODEL ||
    "openai/gpt-oss-20b",

  databaseUrl: process.env.DATABASE_URL,
};