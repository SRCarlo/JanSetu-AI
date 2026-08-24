import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export async function getCitizenRequests(
  _req: Request,
  res: Response
) {
  try {
    const requests =
      await prisma.citizenRequest.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error(
      "Failed to fetch requests:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch citizen requests",
    });
  }
}