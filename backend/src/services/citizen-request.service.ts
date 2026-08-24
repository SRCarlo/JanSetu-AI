import { prisma } from "../lib/prisma.js";

import {
  analyzeCitizenRequest,
} from "./citizen-ai.service.js";

interface CreateCitizenRequestInput {
  message: string;
  district: string;
  state: string;
  inputMethod?: string;
}

export async function createCitizenRequest(
  input: CreateCitizenRequestInput
) {
  const {
    message,
    district,
    state,
    inputMethod = "TEXT",
  } = input;

  const ai =
    await analyzeCitizenRequest(message);

  const location =
    `${district}, ${state}`;

  const request =
    await prisma.citizenRequest.create({
      data: {
        message,

        language:
          ai.language,

        inputMethod,

        category:
          ai.category,

        urgency:
          ai.urgency,

        problem:
          ai.problem,

        affectedGroups:
          ai.affectedGroups,

        location,

        summary:
          ai.summary,

        confidence:
          ai.confidence,
      },
    });

  return {
    request,
    ai,
  };
}