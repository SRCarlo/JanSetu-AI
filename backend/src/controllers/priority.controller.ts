import { Request, Response } from "express";

import { calculateRequestPriority } from "../services/intelligence.service.js";

export async function getRequestPriority(req: Request, res: Response) {
  try {
    const requestId =
      typeof req.params.requestId === "string"
        ? req.params.requestId
        : req.params.requestId[0];

    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "requestId is required",
      });
    }

    const result = await calculateRequestPriority(requestId);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Priority calculation error:", error);

    if (
      error instanceof Error &&
      error.message === "Citizen request not found"
    ) {
      return res.status(404).json({
        success: false,
        message: "Citizen request not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to calculate request priority",
    });
  }
}
