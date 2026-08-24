import { Router } from "express";

import { getRequestPriority } from "../controllers/priority.controller.js";

const router = Router();

router.get("/:requestId", getRequestPriority);

export default router;
