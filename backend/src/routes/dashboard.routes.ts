import { Router } from "express";

import { getHotspots } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/hotspots", getHotspots);

export default router;
