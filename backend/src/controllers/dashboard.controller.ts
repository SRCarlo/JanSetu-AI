import { Request, Response } from "express";

import { getDemandHotspots } from "../services/dashboard.service.js";

export async function getHotspots(_req: Request, res: Response) {
  try {
    const data = await getDemandHotspots();

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Dashboard hotspot error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate demand hotspots",
    });
  }
}
