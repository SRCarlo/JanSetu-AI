import { Router } from "express";

import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/database", async (_req, res) => {
  try {
    const result = await prisma.$queryRaw<
      { result: number }[]
    >`SELECT 1 as result`;

    res.json({
      success: true,
      message: "PostgreSQL connected successfully",
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default router;
