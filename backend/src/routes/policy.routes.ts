import { Router } from "express";

import { getPolicyRecommendations } from "../controllers/policy.controller.js";

const router = Router();

router.get("/recommendations", getPolicyRecommendations);

export default router;
