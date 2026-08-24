import { Request, Response } from "express";

import { createCitizenRequest } from "../services/citizen-request.service.js";

export async function submitCitizenRequest(req: Request, res: Response) {
  try {
    const { message, district, state, inputMethod } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "message is required",
      });
    }

    if (typeof district !== "string" || !district.trim()) {
      return res.status(400).json({
        success: false,
        message: "district is required",
      });
    }

    if (typeof state !== "string" || !state.trim()) {
      return res.status(400).json({
        success: false,
        message: "state is required",
      });
    }

    const result = await createCitizenRequest({
      message: message.trim(),

      district: district.trim(),

      state: state.trim(),

      inputMethod: inputMethod || "TEXT",
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Citizen request error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process citizen request",
    });
  }
}
