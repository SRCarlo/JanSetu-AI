import { z } from "zod";

export const citizenRequestSchema =
  z.object({
    message: z
      .string()
      .min(
        5,
        "Message must contain at least 5 characters"
      )
      .max(
        5000,
        "Message is too long"
      ),

    language: z
      .string()
      .optional()
      .default("auto"),

    location: z
      .string()
      .optional()
      .default("Unknown"),

    inputMethod: z
      .enum([
        "TEXT",
        "VOICE",
        "WHATSAPP",
      ])
      .optional()
      .default("TEXT"),
  });

export type CitizenRequest =
  z.infer<
    typeof citizenRequestSchema
  >;