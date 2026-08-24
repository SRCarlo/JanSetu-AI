import { Router } from "express";
import { analyzeRequest } from "../controllers/ai.controller.js";

const router = Router();

router.post("/analyze-request", analyzeRequest);

export default router;
