import { Request, Response } from "express";

import { calculateCitizenDemand } from "../services/demand.service.js";

export async function getDemand(req: Request, res: Response) {
  try {
    const { location, category } = req.query;

    if (typeof location !== "string" || typeof category !== "string") {
      return res.status(400).json({
        success: false,
        message: "location and category are required",
      });
    }

    const demand = await calculateCitizenDemand(location, category);

    return res.json({
      success: true,

      data: {
        location,
        category,
        demandScore: demand,
      },
    });
  } catch (error) {
    console.error("Demand calculation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate demand",
    });
  }
}
