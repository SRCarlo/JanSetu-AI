import { Request, Response } from "express";

import { citizenRequestSchema } from "../schemas/request.schema.js";

import {
  analyzeCitizenRequest,
} from "../services/groq.service.js";

import { prisma } from "../config/prisma.js";

export async function analyzeRequest(
  req: Request,
  res: Response
) {
  try {
    const parsed =
      citizenRequestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
        errors: parsed.error.flatten(),
      });
    }

const {
  message,
  language,
  location,
  inputMethod,
} = parsed.data;

    // 1. Analyze request using Groq
    const analysis =
      await analyzeCitizenRequest(
        message,
        language,
        location
      );

    // 2. Save AI analysis to PostgreSQL
    const savedRequest =
      await prisma.citizenRequest.create({
        data: {
          message,

          language:
            analysis.language,

          inputMethod,

          category:
            analysis.category,

          urgency:
            analysis.urgency,

          problem:
            analysis.problem,

          affectedGroups:
            analysis.affected_groups,

          location:
            analysis.location,

          summary:
            analysis.summary,

          confidence:
            analysis.confidence,
        },
      });

    // 3. Return saved request
    return res.status(201).json({
      success: true,

      message:
        "Citizen development request analyzed and saved successfully",

      data: savedRequest,
    });

  } catch (error) {
    console.error(
      "Citizen request error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to process citizen request",
    });
  }
}